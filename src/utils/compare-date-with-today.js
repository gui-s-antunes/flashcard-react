export function compareDateWithToday(date) {
  const studyDate = new Date(new Date(`${date}T00:00:00`));
  const today = new Date().setHours(0, 0, 0, 0); // timestamp
  return studyDate.getTime() <= today;
}
