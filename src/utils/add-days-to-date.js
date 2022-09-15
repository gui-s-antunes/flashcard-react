export function addDaysToDate(date, daysToAdd) {
  const ms = date.getTime() + 86400000 * daysToAdd;
  return new Date(ms);
}
