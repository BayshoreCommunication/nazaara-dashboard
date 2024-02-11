// CategoryList.tsx
import { fetchServerSideData } from "@/components/ServerSideDataFetching";
import Return from "@/components/order-return/Return";
import React from "react";
const CategoryList = async () => {
  const returnData = await fetchServerSideData(
    `${process.env.API_URL}/api/v1/return-exchange`
  );

  return (
    <main className="mx-4">
      <div className="mt-4 flex justify-between">
        <h1 className="font-semibold text-lg">Order Return</h1>
      </div>
      <p className="text-xs text-red-600 font-semibold text-center mb-2">
        *Please reload to see changes
      </p>
      <Return returnData={returnData} />
    </main>
  );
};

export default CategoryList;
