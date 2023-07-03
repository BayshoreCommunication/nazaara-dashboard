// CategoryForm.tsx
import React, { ChangeEvent, FormEvent } from "react";

interface CategoryFormProps {
  handleSubmit: (event: FormEvent) => void;
  handleChange: (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  formData: {
    name: string;
    status: string;
  };
}

const SubCategoryForm: React.FC<CategoryFormProps> = ({
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
        <label className="font-medium" htmlFor="name">
          Category Name:
        </label>
        <input
          className="block w-full p-2 border border-gray-400 focus:outline-none text-gray-500 mt-1"
          id="name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Enter Category Name"
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
