import { SaleTagForm, SaleTagList } from "@/components/saleTag";

const SaleTag = () => {
  return (
    <>
      <div className="flex gap-10 container">
        <div className="flex-[6] overflow-x-auto">
          <h1 className="text-lg font-semibold mb-2">Sale Tags</h1>
          <table className="overflow-auto table bg-basic">
            <thead>
              <tr>
                <th>SL</th>
                <th>Title</th>
                <th>Slug</th>
                <th>Products</th>
                <th>status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <SaleTagList />
          </table>
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
