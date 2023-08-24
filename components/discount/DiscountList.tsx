import { FC } from "react";
import { MdDelete } from "react-icons/md";
import { TbEdit } from "react-icons/tb";

export interface Category {
  _id: string;
  name: string;
  status: string;
}

interface CategoryListProps {
  categories: Category[];
  handleEditCategory: (id: string) => void;
  handleDeleteCategory: (id: string) => void;
}

const DiscountList: FC<CategoryListProps> = ({
  categories,
  handleEditCategory,
  handleDeleteCategory,
}) => {
  return (
    <table className="table bg-basic">
      <thead>
        <tr>
          <th>SL</th>
          <th>Category Name</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {categories.map((data, index) => (
          <tr key={data._id}>
            <td>{index + 1}</td>
            <td>{data.name}</td>
            <td
              className={`font-medium ${
                data.status === "Draft" ? "text-red-600" : "text-green-600"
              }`}
            >
              {data.status}
            </td>
            <td>
              <div className="flex">
                <label
                  onClick={() => handleEditCategory(data._id)}
                  className="cursor-pointer"
                  htmlFor="modal-handle"
                >
                  <TbEdit color="green" size={20} />
                </label>
                <button onClick={() => handleDeleteCategory(data._id)}>
                  <MdDelete color="red" size={20} />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DiscountList;
