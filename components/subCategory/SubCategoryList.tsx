// CategoryList.tsx
import { TSubCategoryData } from "@/types/categoryTypes";
import React, { FC } from "react";
import { MdDelete } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import Loader from "../Loader";

interface CategoryListProps {
  subCategories: TSubCategoryData[];
  handleEditCategory: (id: string) => void;
  handleDeleteCategory: (id: string) => void;
}

const SubCategoryList: FC<CategoryListProps> = ({
  subCategories,
  handleEditCategory,
  handleDeleteCategory,
}) => {
  return (
    <table className="table bg-basic">
      <thead>
        <tr>
          <th>SL</th>
          <th>Sub Category Name</th>
          <th>Slug</th>
          <th>Category</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {/* if subCategory.length === 0 show no data found */}
        {subCategories?.length === 0 && (
          <tr>
            <td colSpan={6}>
              <div className="flex justify-center items-center">
                <span className="font-medium text-lg">No Data Found</span>
              </div>
            </td>
          </tr>
        )}
        {/* add loader here */}
        {subCategories?.length > 0 ? (
          // if categories is available then show data here
          subCategories?.map((data, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{data.title}</td>
              <td>{data.slug}</td>
              <td>{data.category.title}</td>
              <td
                className={`font-medium ${
                  data.status === "draft" ? "text-red-600" : "text-green-600"
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
          ))
        ) : (
          <tr>
            <td colSpan={6}>
              <div className="flex justify-center items-center">
                <Loader height="h-[30vh]" />
              </div>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default SubCategoryList;
