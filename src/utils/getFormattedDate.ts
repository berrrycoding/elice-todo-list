import format from "date-fns/format";

export function getFormattedDate(date: Date) {
  return format(date, "yyyy-MM-dd");
}
