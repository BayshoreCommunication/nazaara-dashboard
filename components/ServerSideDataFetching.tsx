//server side data fetching
const FetchServerSideData = async (url: string) => {
  const res = await fetch(url);
  return await res.json();
};

export default FetchServerSideData;
