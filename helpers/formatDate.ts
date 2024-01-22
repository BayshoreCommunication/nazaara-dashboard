export function formatDate(createdAt: Date | string) {
  const formattedDate = new Date(createdAt).toLocaleString("en-US", {
    timeZone: "Asia/Dhaka",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
  return formattedDate;
}
