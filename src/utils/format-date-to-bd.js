// unused due to diff of GTM bugs the date that sequelize applies into BD
export function formatDateToBd(date) {
  return `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, '0')}-${date.getDate()}`;
}
