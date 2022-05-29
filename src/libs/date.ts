import moment from 'moment-timezone';

export class HelperDate {
  static timezone: any = process.env.NEXT_PUBLIC_TIMEZONE;
}

export const getDateByFormat = (date: any, format: string) => {
  return moment(date).format(format);
};
export const getNowDateByFormat = (format: string) => {
  return moment()
    .tz(HelperDate.timezone)
    .format(format);
};
export const getNowDate = () => {
  return moment()
    .tz(HelperDate.timezone)
    .format('YYYY-MM-DD');
};
export const getNowDateTime = () => {
  return moment()
    .tz(HelperDate.timezone)
    .format('YYYY-MM-DD HH:mm:ss');
};
export const isDateBetween = (date: any, from: any, to: any) => {
  return moment(date).isBetween(from, to, null, '[]');
};
// eslint-disable-next-line @typescript-eslint/no-inferrable-types
export const formatDefaultDate = (date: string, showHour: boolean = true) => {
  if (showHour) {
    return moment(date).format('DD-MMM-YYYY') + ' at ' + moment(date).format('hh:mma');
  } else {
    return moment(date).format('DD-MMM-YYYY');
  }
};
