/* eslint-disable @typescript-eslint/no-inferrable-types */
import React from 'react';

type StateType = {
  value: boolean;
};

interface Props extends React.PropsWithRef<{}> {
  value: boolean;
  label: string;
  id?: any;
  onChange?: any;
}

export class ToggleButton extends React.Component<Props> {
  public state: StateType = {
    value: false,
  };

  value: boolean = false;
  label: string = '';

  constructor(props: any) {
    super(props);
    this.value = props.value;
    this.label = props.label;
    this.state.value = props.value;
  }

  render() {
    return (
      <div className="mb-3">
        <div className={'os-toggler-w ' + (this.value ? 'on' : '')} onClick={this.onChange}>
          <div className="os-toggler-i">
            <div className="os-toggler-pill"></div>
          </div>
        </div>

        <span className="os-toggler-label">{this.label}</span>
      </div>
    );
  }

  onChange = () => {
    this.toggleValue();

    if (typeof this.props.onChange === 'function') {
      this.props.onChange();
    }
  };

  click = () => {
    this.toggleValue();
  };

  setValue = (value: any) => {
    this.setState({ value: value });
    this.value = value;
  };

  private toggleValue = () => {
    const toggle = !this.state.value;
    this.setState({ value: toggle });
    this.value = toggle;
  };
}
