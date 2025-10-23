export const fetchServerSideData = async <T = any>(
  url: string
): Promise<T | null> => {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Nazaara@Token ${process.env.API_SECURE_KEY || ""}`,
      },
      next: { revalidate: 360 },
    });

    if (!response.ok) {
      console.error(`Fetch error: ${response.status} ${response.statusText}`);
      return null;
    }

    const data: T = await response.json();
    return data;
  } catch (error: any) {
    console.error("Data fetching error:", error.message || error);
    return null;
  }
};
