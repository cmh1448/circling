import { DateTime } from "luxon";

export const parseLocalDateTime = (dateString: string) => {
  return DateTime.fromFormat(dateString, "yyyy-MM-dd HH:mm");
};

export const parseLocalDate = (dateString: string) => {
  return DateTime.fromFormat(dateString, "yyyy-MM-dd");
};
