import { format } from "date-fns";

export function formatDate(date) {
  return format(date, "D/MM/YYYY");
}

export function generateUniqueId() {
  return Math.random()
    .toString(36)
    .substr(2, 9);
}
