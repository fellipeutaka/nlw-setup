import dayjs from "dayjs";
import localeData from "dayjs/plugin/localeData";

export function getWeekDays() {
  dayjs.extend(localeData);
  return dayjs.weekdays();
}
