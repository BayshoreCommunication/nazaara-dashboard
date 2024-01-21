export function formatYearMonthDay(date: Date) {
  const startDate = new Date(date);
  const day = startDate.getDate().toString().padStart(2, "0");
  const month = (startDate.getMonth() + 1).toString().padStart(2, "0");
  const year = startDate.getFullYear();
  const formattedDate = `${day}/${month}/${year}`;
  return formattedDate;
}
