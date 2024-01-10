export function formatDate(createdAt: string) {
  const formattedDate = new Date(createdAt).toLocaleString("en-US", {
    timeZone: "UTC", // Make sure to set the correct time zone
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
  return formattedDate;
}
