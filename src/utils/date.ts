import dayjs from 'dayjs';

export const createDateDayList = (start: string | number, end: string | number) => {
  const result = [];
  let startDate = dayjs(start);
  const endDate = dayjs(end);
  while (startDate.isBefore(endDate.add(1, 'day'))) {
    result.push(dayjs(startDate).format('YYYY-MM-DD'))
    startDate = startDate.add(1, 'day');
  }
  return result;
}
