// CategoryList.tsx
import { parseHtmlToString, truncateDescription } from "@/helpers";
import { IHiringData } from "@/services/hiringApi";
import React from "react";
import { MdDelete } from "react-icons/md";
import { TbEdit } from "react-icons/tb";

// export interface Category {
//   _id: string;
//   title: string;
//   description: string;
//   status: string;
// }

interface CategoryListProps {
  hirings: IHiringData[];
  handleEditCategory: (id: string) => void;
  handleDeleteCategory: (id: string) => void;
}

const HiringList: React.FC<CategoryListProps> = ({
  hirings,
  handleEditCategory,
  handleDeleteCategory,
}) => {
  return (
    <table className="table bg-basic">
      <thead>
        <tr>
          <th>SL</th>
          <th>Job Title</th>
          <th>Description</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {hirings && (
          <>
            {hirings.map((data, index) => {
              const description = parseHtmlToString(data.description);
              return (
                <tr key={data._id}>
                  <td>{index + 1}</td>
                  <td>{data.title}</td>
                  <td>{truncateDescription(description, 200)}</td>
                  <td
                    className={`font-medium ${
                      data.status === "published"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {data.status}
                  </td>
                  <td>
                    <div className="flex">
                      <label
                        onClick={() => handleEditCategory(data._id as string)}
                        className="cursor-pointer"
                        htmlFor="modal-handle"
                      >
                        <TbEdit color="green" size={20} />
                      </label>
                      <button
                        onClick={() => handleDeleteCategory(data._id as string)}
                      >
                        <MdDelete color="red" size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </>
        )}
      </tbody>
    </table>
  );
};

export default HiringList;
