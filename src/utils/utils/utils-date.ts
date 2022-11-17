// 两个日期之间的日差
const daysBetween = (date1: number, date2: number) =>
  Math.ceil(Math.abs(date1 - date2) / (1000 * 60 * 60 * 24))

export default {
  daysBetween
}
