import { SaleTagForm, SaleTagList } from "@/components/saleTag";
import React from "react";

const SaleTag = () => {
  return (
    <>
      <div className="flex gap-10 container">
        <div className="flex-[6] overflow-x-auto">
          <h1 className="text-lg font-semibold mb-2">Sale Tags</h1>
          <SaleTagList />
        </div>
        <div className="flex-[3]">
          <h1 className="text-lg font-semibold mb-2">Add New Sale Tag</h1>
          <SaleTagForm />
        </div>
      </div>
    </>
  );
};

export default SaleTag;
