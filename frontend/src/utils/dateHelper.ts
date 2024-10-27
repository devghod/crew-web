import moment from 'moment-timezone';

const tz = 'Asia/Manila';

export const dateFormat = (date, format) => {
  return moment(date).tz(tz).format(format);
};
