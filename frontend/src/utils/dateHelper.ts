import moment from 'moment-timezone';

const tz = 'Asia/Manila';

export const dateFormat = (date: string, format: string) => {
  return moment(date).tz(tz).format(format);
};
