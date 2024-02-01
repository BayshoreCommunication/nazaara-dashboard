//server side data fetching
export const fetchServerSideData = async (url: string) => {
  const res = await fetch(url, { next: { revalidate: 300 } });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return await res.json();
};
