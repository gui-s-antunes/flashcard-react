export function addDaysToDate(date, daysToAdd) {
  const ms = date.getTime() + 86400000 * daysToAdd;
  console.log('new date: ', new Date(ms));
  return new Date(ms);
}
