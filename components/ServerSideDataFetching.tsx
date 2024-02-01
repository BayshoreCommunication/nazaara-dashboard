//server side data fetching
const FetchServerSideData = async (url: string) => {
  const res = await fetch(url, { next: { revalidate: 300 } });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return await res.json();
};

export default FetchServerSideData;
