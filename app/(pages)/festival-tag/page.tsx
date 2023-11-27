import { FestivalTagForm, FestivalTagList } from "@/components/festivalTag";

const FestivalTag = () => {
  return (
    <>
      <div className="flex gap-10 container">
        <div className="flex-[6] overflow-x-auto">
          <h1 className="text-lg font-semibold mb-2">Festival Tags</h1>
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
            <FestivalTagList />
          </table>
        </div>
        <div className="flex-[3]">
          <h1 className="text-lg font-semibold mb-2">Add New Festival Tag</h1>
          <FestivalTagForm />
        </div>
      </div>
    </>
  );
};

export default FestivalTag;
