import dayjs from "dayjs";

export const today = dayjs().startOf("day").toDate();
