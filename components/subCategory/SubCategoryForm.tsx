import { useGetCategoriesQuery } from "@/services/categoryApi";
import React, { ChangeEvent, FC, FormEvent } from "react";

interface CategoryFormProps {
  handleSubmit: (event: FormEvent) => void;
  handleChange: (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  formData: {
    title: string;
    category: string;
    status: string;
  };
}

const SubCategoryForm: FC<CategoryFormProps> = ({
  handleSubmit,
  handleChange,
  formData,
}) => {
  const { data: categories, isLoading } = useGetCategoriesQuery();

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-3 flex flex-col gap-y-3 rounded-xl"
    >
      <div>
        <label className="font-medium" htmlFor="name">
          Sub Category Title:
        </label>
        <input
          className="w-full border border-gray-400 rounded-sm p-2 focus:outline-none text-gray-500"
          type="text"
          id="title"
          name="title"
          placeholder="Enter Sub Category Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-2">
        <label className="font-medium" htmlFor="name">
          Select Category:
        </label>
        <select
          className="w-full border border-gray-400 rounded-sm p-2 focus:outline-none text-gray-500"
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option disabled value="">
            Choose Category
          </option>
          {categories?.data?.map((category: any, index: number) => (
            <option key={index} value={category._id}>
              {category.title}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-2">
        <label className="font-medium" htmlFor="status">
          Status:
        </label>
        <select
          className="w-full border border-gray-400 rounded-sm p-2 focus:outline-none text-gray-500"
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          required
        >
          <option disabled value="">
            Choose Status
          </option>
          <option value="Publish">Publish</option>
          <option value="Draft">Draft</option>
        </select>
      </div>
      <button
        type="submit"
        className="bg-secondary py-1 px-4 rounded-md text-white w-full"
      >
        Upload
      </button>
    </form>
  );
};

export default SubCategoryForm;
