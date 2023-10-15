import { useCreateWarehouseMutation } from "@/services/warehouseApi";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-hot-toast";

const CreateWarehouse = ({ refetch }: any) => {
  const [createWarehouse] = useCreateWarehouseMutation();
  //crate Promotion start
  const [formData, setFormData] = useState({
    name: "",
    status: "",
  });

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    // Perform any form validation or data processing here
    try {
      const data = await createWarehouse(formData);
      if (data) {
        toast.success("New Warehouse Created", { duration: 3000 });
        // Reset form fields
        refetch();
        setFormData({
          name: "",
          status: "",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-3 flex flex-col gap-y-3 rounded-xl"
    >
      <div>
        <label className="font-medium" htmlFor="name">
          Warehouse Name:
        </label>
        <input
          className="block w-full p-2 border border-gray-400 focus:outline-none text-gray-500 mt-1"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Enter Warehouse Name"
        />
      </div>
      <div className="mb-2">
        <label className="font-medium" htmlFor="status">
          Status:
        </label>
        <select
          className="w-full border border-gray-400 rounded-sm p-2 focus:outline-none text-gray-500"
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

export default CreateWarehouse;
