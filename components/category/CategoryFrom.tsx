// CategoryForm.tsx
import React, { ChangeEvent, FC, FormEvent } from "react";

interface CategoryFormProps {
  handleSubmit: (event: FormEvent) => void;
  handleChange: (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  formData: {
    title: string;
    status: string;
  };
}

const CategoryForm: FC<CategoryFormProps> = ({
  handleSubmit,
  handleChange,
  formData,
}) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-3 flex flex-col gap-y-3 rounded-xl"
    >
      <div>
        <label className="font-medium" htmlFor="title">
          Category Name:
        </label>
        <input
          className="block w-full p-2 border border-gray-400 focus:outline-none text-gray-500 mt-1"
          id="title"
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          placeholder="Enter Category Title"
        />
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
          <option value="published">Publish</option>
          <option value="draft">Draft</option>
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

export default CategoryForm;
