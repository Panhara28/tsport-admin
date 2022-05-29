/* eslint-disable @typescript-eslint/no-inferrable-types */
import React from 'react';
// import { ToggleButton } from '../light/ToggleButton';
import moment from 'moment-timezone';
import { HelperDate } from '../libs/date';

interface Props extends React.PropsWithRef<{}> {
  value?: boolean;
  datetime?: string;
  setCurrent?: boolean;
  onChange?: any;
}

export class ArticleSchedule extends React.Component<Props> {
  // value: boolean = false;
  datetime: string = '';
  inputDatetime: any;
  setCurrent: boolean = false;

  constructor(props: any) {
    super(props);
    // this.value = props.value === undefined ? false : props.value;
    this.datetime = props.datetime === undefined ? '' : props.datetime;
    this.setCurrent = props.setCurrent === undefined ? false : props.setCurrent;
  }

  componentDidMount() {
    if (this.props.setCurrent) {
      this.setCurrentDateTime();
    }

    this.inputDatetime.value = moment(Number(this.datetime)).format('YYYY-MM-DDTHH:mm');
  }

  render() {
    return (
      <div className="form-group">
        {/* <ToggleButton label="Schedule Publish" value={this.value} onChange={this.onChangeSchedule} /> */}

        <div className="date-input">
          <input
            ref={x => (this.inputDatetime = x)}
            type="datetime-local"
            className="form-control mt-1"
            defaultValue={Number(this.datetime)}
            onChange={e => {
              this.onChange(e);
            }}
            // required={this.value}
          />
        </div>
      </div>
    );
  }

  private setDateTimeValue = (value: any) => {
    //Convert to mysql date
    const datetime = moment(value).format('YYYY-MM-DD HH:mm:ss');
    if (datetime !== 'Invalid date') {
      this.datetime = datetime;
    } else {
      this.datetime = '';
    }
  };

  setCurrentDateTime = () => {
    const currentDateTime = moment()
      .tz(HelperDate.timezone)
      .format('YYYY-MM-DDTHH:mm');
    this.inputDatetime.value = currentDateTime;
    this.setDateTimeValue(currentDateTime);
  };

  onChange = (e: any) => {
    this.setDateTimeValue(e.target.value);

    if (typeof this.props.onChange === 'function') {
      this.props.onChange();
    }
  };
}
