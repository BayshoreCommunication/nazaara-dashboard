// CategoryForm.tsx
import React, { ChangeEvent, FormEvent } from "react";
import Editor from "../Editor";

interface CategoryFormProps {
  handleSubmit: (event: FormEvent) => void;
  handleChange: (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  formData: {
    title: string;
    description: string;
    status: string;
  };
}

const HiringForm: React.FC<any> = ({
  handleSubmit,
  handleChange,
  formData,
  setFormData,
}) => {
  console.log("formData", formData);

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-3 flex flex-col gap-y-3 rounded-xl"
    >
      <div>
        <label className="font-medium" htmlFor="name">
          Job Title:
        </label>
        <input
          className="block w-full p-2 border border-gray-400 focus:outline-none text-gray-500 mt-1"
          id="name"
          type="text"
          name="title" // Changed to "title"
          value={formData.title}
          onChange={handleChange}
          required
          placeholder="Enter Job Title"
        />
      </div>
      <div>
        <label className="font-medium" htmlFor="desc">
          Job Description:
        </label>
        <Editor setFormData={setFormData} formData={formData} />
      </div>
      <div className="mb-2">
        <label className="font-medium" htmlFor="status">
          Status:
        </label>
        <select
          className="w-full border border-gray-400 rounded-sm p-2 focus:outline-none text-gray-500"
          id="status"
          name="status" // Changed to "status"
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

export default HiringForm;
