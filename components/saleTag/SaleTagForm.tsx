"use client";
import dynamic from "next/dynamic";
const Select = dynamic(() => import("react-select"), {
  ssr: false,
});
import { useGetProductsQuery } from "@/services/productApi";
import { FormEvent, useState } from "react";
import { TOptionSelect } from "@/types/types";

const customStyles = {
  control: (provided: any, state: any) => ({
    ...provided,
    "& input": {
      height: "auto",
    },
    borderColor: "gray",
    padding: 3,
  }),
};

const SaleTagForm = () => {
  const { data: productsData, isLoading } = useGetProductsQuery({});
  const [selectedOption, setSelectedOption] = useState([]);

  const handleSelectChange = (option: any) => {
    setSelectedOption(option.map((elem: TOptionSelect) => elem.value));
  };

  const options = productsData?.product?.map((elem) => ({
    value: elem._id,
    label: elem.slug,
  }));

  // use a proper type for the event argument here instead of any
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const formDataObj = Object.fromEntries(formData);
    const dataSubmit = {
      ...formDataObj,
      products: selectedOption,
    };

    console.log("dataSubmit", dataSubmit);
  };

  return (
    <>
      {/* use proper type for the event argument here instead of any onSubmit */}
      <form className="bg-white rounded-xl p-3" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="text-sm font-semibold mb-2" htmlFor="title">
            Title:
          </label>
          <input
            className="w-full border border-gray-300 p-2 rounded outline-none focus:border-gray-500"
            type="text"
            name="title"
            id="title"
            required
            placeholder="Title"
          />
        </div>
        <div className="mb-4">
          <label className="text-sm font-semibold mb-2" htmlFor="slug">
            Products:
          </label>
          <Select
            onChange={handleSelectChange}
            className="w-full rounded-md focus:outline-none text-gray-500"
            placeholder="Choose One"
            name="products"
            styles={customStyles}
            required
            // make outline on focus none
            theme={(theme) => ({
              ...theme,
              borderRadius: 5,
              outline: "none",
              colors: {
                ...theme.colors,
                primary25: "#ccc",
                primary: "#ccc",
              },
            })}
            options={options}
            isMulti={true}
          />
        </div>
        <div className="mb-4">
          <label className="text-sm font-semibold mb-2" htmlFor="status">
            Status:
          </label>
          <select
            className="w-full border border-gray-300 p-2 rounded outline-none focus:border-gray-500"
            name="status"
            required
            id="status"
          >
            <option value="" disabled>
              Select Status
            </option>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
        <button
          className="bg-secondary text-white py-2 rounded w-full hover:bg-secondary-hover transition duration-300 ease-in-out"
          type="submit"
        >
          Add Sale Tag
        </button>
      </form>
    </>
  );
};

export { SaleTagForm };
