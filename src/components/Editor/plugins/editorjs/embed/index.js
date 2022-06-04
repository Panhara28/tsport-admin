/*eslint-disable */

/**
 * Import services
 */
import SERVICES from './services';

/**
 * EmbedTool for Editor.js
 *
 * @author Rathpanha
 * @copyright Rathpanha
 * @license MIT
 * @version 2.0.0
 */

/* global PasteEvent */

/**
 * Embed Tool for the Editor.js allows to embed video or post from social media in your articles.
 */
class EmbedTool {

  /**
   * Render plugin`s main Element and fill it with saved data
   *
   * @param {CodeData} data — previously saved plugin code
   * @param {Object} config - user config for Tool
   * @param {Object} api - Editor.js API
   */
  constructor({data, config, api}) {
    this.data = {
      service: data.service === undefined ? "" : data.service,
      source: data.source === undefined ? "" : data.source,
      embedUrl: data.embedUrl === undefined ? "" : data.embedUrl,
      html: data.html === undefined ? "" : data.html,
      width: data.width === undefined ? 0 : data.width,
      height: data.height === undefined ? 0 : data.height,
      heightRatio: data.heightRatio === undefined ? 0 : data.heightRatio,
      isDynamicScript: data.isDynamicScript === undefined ? false : data.isDynamicScript,
      dynamicScript: data.dynamicScript === undefined ? null : data.dynamicScript,
      dynamicScriptCallback: data.dynamicScriptCallback,
      caption: data.caption === undefined ? "" : data.caption
    }

    this.editor = document.getElementsByClassName("codex-editor")[0];
    //650px is maximum content width
    this.maxContentWidth = this.editor.offsetWidth > 650 ? 650 : this.editor.offsetWidth;
    this.api = api;
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
      title: "Embed",
      icon: '<svg width="17" height="15" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="code" class="svg-inline--fa fa-code fa-w-20" role="img" viewBox="0 0 640 512"><path fill="currentColor" d="M278.9 511.5l-61-17.7c-6.4-1.8-10-8.5-8.2-14.9L346.2 8.7c1.8-6.4 8.5-10 14.9-8.2l61 17.7c6.4 1.8 10 8.5 8.2 14.9L293.8 503.3c-1.9 6.4-8.5 10.1-14.9 8.2zm-114-112.2l43.5-46.4c4.6-4.9 4.3-12.7-.8-17.2L117 256l90.6-79.7c5.1-4.5 5.5-12.3.8-17.2l-43.5-46.4c-4.5-4.8-12.1-5.1-17-.5L3.8 247.2c-5.1 4.7-5.1 12.8 0 17.5l144.1 135.1c4.9 4.6 12.5 4.4 17-.5zm327.2.6l144.1-135.1c5.1-4.7 5.1-12.8 0-17.5L492.1 112.1c-4.8-4.5-12.4-4.3-17 .5L431.6 159c-4.6 4.9-4.3 12.7.8 17.2L523 256l-90.6 79.7c-5.1 4.5-5.5 12.3-.8 17.2l43.5 46.4c4.5 4.9 12.1 5.1 17 .6z"/></svg>'
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
   * Return Tool's input or embed view
   *
   * @returns {HTMLDivElement} this.container - Source's input or embed view
   * @public
   */
  render = () => {
    //Create container
    this.container = document.createElement('div');
    this.container.classList.add("cdx-block");
    this.container.classList.add("embed-tool");

    //Create caption
    this.caption = document.createElement('div');
    this.caption.contentEditable = true;
    this.caption.dataset.placeholder = 'Enter a caption';
    this.caption.classList.add(...["cdx-input", "embed-tool__caption"]);
    this.caption.innerHTML = this.data.caption || '';

    if(SERVICES[this.data.service] === undefined) {
      this.__createInput();
    } else {
      this.__createIframe();
    }

    return this.container;
  }

  /**
   * Extract Tool's data from the view
   *
   * @returns {SourceData} - saved plugin data
   * @public
   */
  save = () => {
    this.data.caption = this.caption.innerHTML;

    return this.data;
  }

  /**
   * Render Tool's input
   */
  __createInput = () => {
    //Create input
    this.input = document.createElement('input');
    this.input.setAttribute("title", "Facebook, Instagram, TikTok, Twitter, Youtube, DailyMail, BBC Embed link...");
    this.input.setAttribute("placeholder", "Embed Link...");
    this.input.classList.add(...["cdx-input", "embed-tool__input"]);
    this.api.listeners.on(this.input, 'keydown', (e) => {
      if(e.keyCode === 13) {
        this.__embedIframe();
      }
    });

    //Create button
    this.button = document.createElement('button');
    this.button.innerHTML = "Embed";
    this.button.classList.add(...["cdx-button", "embed-tool__button", "btn-primary", "m-0"]);
    this.api.listeners.on(this.button, 'click', () => {
      this.__embedIframe();
    });

    this.container.appendChild(this.input);
    this.container.appendChild(this.button);
  }

  /**
   * Manipulate embed data for embeding
   */
  __embedIframe = () => {
    const service = this.__validateService();
    if(!service) {
      return;
    }

    const url = this.input.value;
    const {regex, embedUrl, html, width, height, showText, id = (ids) => ids.shift(), isDynamicScript, dynamicScript, dynamicScriptCallback} = SERVICES[service];

    let embed = null;
    if(typeof embedUrl !== 'undefined') {
      let result = regex.exec(url).slice(1);
      embed = decodeURIComponent(embedUrl.replace(/<\%\= remote\_id \%\>/g, id(result)));
    }

    //Check if width, height, showText are provided manually by functions
    let parsedWidth = typeof width === 'function' ? width(url) : width;
    let parsedHeight = typeof height === 'function' ? height(url) : height;
    let parsedShowText = typeof showText === 'function' ? showText(url) : showText;
    parsedWidth = typeof parsedWidth === 'undefined' ? null : Number(parsedWidth);
    parsedHeight = typeof parsedHeight === 'undefined' ? null : Number(parsedHeight);
    parsedShowText = typeof parsedShowText === 'undefined' ? false : parsedShowText;

    //Correct source to prevent injection
    let source = null;
    if(typeof html === 'undefined') {
      source = url;
    } else {
      source = html.replace(/<\%\= remote\_source \%\>/g, embed).replace(/<\%\= remote\_width \%\>/g, parsedWidth).replace(/<\%\= remote\_height \%\>/g, parsedHeight).replace(/<\%\= remote\_showText \%\>/g, parsedShowText);
      
      //Correct url query string if have & first
      if(source.indexOf('?') === -1 && source.indexOf('&') > -1) {
        source = source.replace("&", "?");
      }
    }

    this.data = {
      service,
      source: source,
      embedUrl: embed,
      html: typeof html === 'undefined' ? null : html,
      width: parsedWidth,
      height: parsedHeight,
      heightRatio: (typeof parsedWidth === 'undefined' || typeof parsedHeight === 'undefined') ? null : parsedWidth / parsedHeight,
      isDynamicScript,
      dynamicScript: typeof dynamicScript === 'function' ? dynamicScript(url) : dynamicScript,
      dynamicScriptCallback,
      caption: this.caption.innerHTML
    }

    this.__createIframe();
  }

  /**
   * Return embed view
   */
  __createIframe = () => {
    //Remove input, button and replace with iframe
    this.container.innerHTML = "";

    const template = document.createElement('template');
    if(!this.data.isDynamicScript) {
      template.innerHTML = this.data.html;
      template.content.firstChild.setAttribute('src', this.data.embedUrl);
      template.content.childNodes[0].width = this.data.width;
      template.content.childNodes[0].height = this.data.height;

      this.embedFrame = template.content.childNodes[0];
      this.container.appendChild(this.embedFrame);
      this.container.appendChild(this.caption);

      this.currentWidth = this.data.width;
      this.__resizeFrameDemension();
      this.api.listeners.on(window, 'resize', this.__resizeFrameDemension);
    } else {
      template.innerHTML = this.data.source;
      let dynamicScript = document.createElement('script');

      dynamicScript.src = this.data.dynamicScript;
      dynamicScript.async = true;
      dynamicScript.onload = () => {
        if(this.data.dynamicScriptCallback) {
          const callback = new Function(this.data.dynamicScriptCallback.arguments, this.data.dynamicScriptCallback.body);
          callback();
        }
      }

      this.embedFrame = template.content.childNodes[0];
      this.container.appendChild(this.embedFrame);
      this.container.appendChild(dynamicScript);
      this.container.appendChild(this.caption);
    }
  }

  /**
   * Resize embed responsively
   */
  __resizeFrameDemension = () => {
    let resizedWidth = this.embedFrame.offsetWidth;
    
    //Check if it's first initial, 
    //because the iframe offsetWidth will be 0 due to it's not yet append to document
    if(resizedWidth === 0) {
      resizedWidth = this.data.width > this.maxContentWidth ? this.maxContentWidth : this.data.width;
    }

    if(resizedWidth != this.currentWidth) {
      const newHeight = resizedWidth / this.data.heightRatio;
      this.embedFrame.height = newHeight;
      this.currentWidth = resizedWidth;
    }
  }

  /**
   * Validate embed service
   */
  __validateService = () => {
    if(this.input.value !== "") {
      for (let service in SERVICES) {
        let s = this.input.value.match(SERVICES[service].regex);
        if(s) {
          return service;
        }
      }
    }

    this.__notifiError("Invalid embed link!");
    return false;
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

 /**
   * Automatic sanitize config
   */
  static get sanitize() {
    return {
      html: true, // Allow HTML tags
      source: true // Allow HTML tags
    };
  }
}

export default EmbedTool;