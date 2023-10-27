import { DateTime } from "luxon";

export const parseLocalDateTime = (dateString: string | undefined) => {
  if (!dateString) return undefined;
  return DateTime.fromFormat(dateString, "yyyy-MM-dd HH:mm");
};

export const parseLocalDate = (dateString: string | undefined) => {
  if (!dateString) return undefined;
  return DateTime.fromFormat(dateString, "yyyy-MM-dd");
};

export const elapsedStringOf = (date: DateTime | undefined): string => {
  if (!date) return "시간 없음";

  const now = new Date();
  const elapsedMilliseconds = now.getTime() - date.toJSDate().getTime();

  const millisecondsPerMinute = 60 * 1000;
  const millisecondsPerHour = 60 * millisecondsPerMinute;
  const millisecondsPerDay = 24 * millisecondsPerHour;
  const millisecondsPerMonth = 30 * millisecondsPerDay;
  const millisecondsPerYear = 365 * millisecondsPerDay;

  if (elapsedMilliseconds < millisecondsPerMinute) {
    const seconds = Math.floor(elapsedMilliseconds / 1000);
    return `${seconds}초 전`;
  } else if (elapsedMilliseconds < millisecondsPerHour) {
    const minutes = Math.floor(elapsedMilliseconds / millisecondsPerMinute);
    return `${minutes}분 전`;
  } else if (elapsedMilliseconds < millisecondsPerDay) {
    const hours = Math.floor(elapsedMilliseconds / millisecondsPerHour);
    return `${hours}시간 전`;
  } else if (elapsedMilliseconds < millisecondsPerMonth) {
    const days = Math.floor(elapsedMilliseconds / millisecondsPerDay);
    return `${days}일 전`;
  } else if (elapsedMilliseconds < millisecondsPerYear) {
    const months = Math.floor(elapsedMilliseconds / millisecondsPerMonth);
    return `${months}달 전`;
  } else {
    const years = Math.floor(elapsedMilliseconds / millisecondsPerYear);
    return `${years}년 전`;
  }
};
