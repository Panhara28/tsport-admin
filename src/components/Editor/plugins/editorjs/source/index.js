/*eslint-disable */

/**
 * SourceTool for Editor.js
 *
 * @author Rathpanha
 * @copyright Rathpanha
 * @license MIT
 * @version 2.0.0
 */

/* global PasteEvent */

/**
 * Source Tool for the Editor.js allows to include the source in your articles.
 */
class SourceTool {

  /**
   * Render plugin`s main Element and fill it with saved data
   *
   * @param {SourceData} data — previously saved plugin source
   * @param {Object} config - user config for Tool
   * @param {Object} api - Editor.js API
   */
  constructor({data, config, api}) {
    this.data = {
      sourceName: data.sourceName === undefined ? "" : data.sourceName,
      sourceLink: data.sourceLink === undefined ? "" : data.sourceLink
    }

    this.config = config;
    this.api = api;
    this.state = null;
  }

  /**
   * Get Tool toolbox settings
   * icon - Tool icon's SVG
   * title - title to show in toolbox
   *
   * @returns {{icon: string, title: string}}
   */
  static get toolbox() {
    return {
      title: "Source",
      icon: '<svg width="17" height="15" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="plug" class="svg-inline--fa fa-plug fa-w-12" role="img" viewBox="0 0 384 512"><path fill="currentColor" d="M256 144V32c0-17.673 14.327-32 32-32s32 14.327 32 32v112h-64zm112 16H16c-8.837 0-16 7.163-16 16v32c0 8.837 7.163 16 16 16h16v32c0 77.406 54.969 141.971 128 156.796V512h64v-99.204c73.031-14.825 128-79.39 128-156.796v-32h16c8.837 0 16-7.163 16-16v-32c0-8.837-7.163-16-16-16zm-240-16V32c0-17.673-14.327-32-32-32S64 14.327 64 32v112h64z"/></svg>'
    }
  }

  /**
   * Allow to press Enter inside the LinkTool input
   * @returns {boolean}
   * @public
   */
  static get enableLineBreaks() {
    return true;
  }


  /**
   * Return Tool's input or view
   *
   * @returns {HTMLDivElement} this.container - Source's input or view
   * @public
   */
  render = () => {
    this.container = document.createElement('div');
    this.container.classList.add("cdx-block");
    this.container.classList.add("source-tool");
    this.api.listeners.on(this.container, "click", (e) => {
      if(this.state === "rendered" && e.target.tagName !== "BUTTON") {
        this.__createInput();
        this.inputSourceName.focus();
      }
    });

    if(this.data.sourceName !== "" && this.data.sourceLink !== "") {
      this.__createSource();
    } else {
      this.__createInput();
    }

    return this.container;
  }


  /**
   * Extract Tool's data from the view
   *
   * @returns {SourceData} - saved plugin source
   * @public
   */
  save = () => {
    return this.data;
  }


  /**
   * Render Tool's input
   */
  __createInput = () => {
    //Remove normal text and replace with input, button
    this.container.innerHTML = ""; 

    //Create source name input
    this.inputSourceName = document.createElement('input');
    this.inputSourceName.value = this.data.sourceName;
    this.inputSourceName.setAttribute("placeholder", "Source Name");
    this.inputSourceName.classList.add(...["cdx-input", "source-tool__input"]);
    this.api.listeners.on(this.inputSourceName, 'keydown', (e) => {
      if(e.keyCode === 13) {
        this.__saveData();
        if(this.__validateSource()) {
          this.__createSource();
        }
      }
    });

    this.api.listeners.on(this.inputSourceName, 'keyup', (e) => {
      //Need to find a way to disable editor open toolbox when click tab
      if(e.keyCode === 9) {
        this.inputSourceLink.focus();
      }
    });

    //Create source link input
    this.inputSourceLink = document.createElement('input');
    this.inputSourceLink.value = this.data.sourceLink;
    this.inputSourceLink.type = "url";
    this.inputSourceLink.setAttribute("placeholder", "Source Link");
    this.inputSourceLink.classList.add(...["cdx-input", "source-tool__input"]);
    this.api.listeners.on(this.inputSourceLink, 'keydown', (e) => {
      if(e.keyCode === 13) {
        this.__saveData();
        if(this.__validateSource()) {
          this.__createSource();
        }
      } 
    });

    //Create button
    this.button = document.createElement('button');
    this.button.innerHTML = "Add Source";
    this.button.classList.add(...["cdx-button", "source-tool__button", "btn-primary", "m-0"]);
    this.api.listeners.on(this.button, 'click', () => {
      this.__saveData();
      if(this.__validateSource()) {
        this.__createSource();
      }
    });

    this.container.appendChild(this.inputSourceName);
    this.container.appendChild(this.inputSourceLink);
    this.container.appendChild(this.button);
    this.state = "inputing";
  }

  /**
   * Render Tool's view
   */
  __createSource = () => {
    //Get region text
    let regionText = "ប្រភព៖";
    if(this.config.region === "myanmar") regionText = "သတင်းအရင်းအမြစ်";
    if(this.config.region === "vietnam") regionText = "Nguồn thông tin";

    //Remove input, button and replace with normal text
    this.container.innerHTML = "<b>" + regionText + "</b>​ <span class='source-tool__link'>" + this.data.sourceName + "</span>";
    this.state = "rendered";
  }

  /**
   * Save Tool's data
   */
  __saveData = () => {
    this.data.sourceName = this.inputSourceName.value;
    this.data.sourceLink = this.inputSourceLink.value;
  }

  /**
   * Validate Source Link
   */
  __validateSource = () => {
    const urlPattern = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;

    if(this.data.sourceName === "") {
      this.__notifiError("Please input source name.");  
      return false;
    }

    if(this.data.sourceLink === "") {
      this.__notifiError("Please input source link.");
      return false;  
    } else if(!urlPattern.test(this.data.sourceLink)){
      this.__notifiError("Invalid source link!");  
      return false;
    }

    return true;
  }

  /**
   * Notify the error
   */
  __notifiError = (errorMessage) => {
    this.api.notifier.show({
      message: errorMessage,
      style: 'error'
    });
  }
}

export default SourceTool;