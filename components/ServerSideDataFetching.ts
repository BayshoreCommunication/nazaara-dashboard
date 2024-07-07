//server side data fetching
export const fetchServerSideData = async (url: string) => {
  const res = await fetch(url, {
    headers: {
      authorization: `Nazaara@Token ${process.env.API_SECURE_KEY}`,
    },
    next: { revalidate: 0 },
  });
  // if (!res.ok) {
  //   throw new Error("Failed to fetch data");
  // }
  return await res.json();
};
