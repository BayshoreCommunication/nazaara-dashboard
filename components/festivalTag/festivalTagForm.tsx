"use client";
import dynamic from "next/dynamic";
const Select = dynamic(() => import("react-select"), {
  ssr: false,
});
import { useGetProductsQuery } from "@/services/productApi";
import { useCreateFestivalMutation } from "@/services/festivalsApi";
import { FormEvent, useState } from "react";
import { TOptionSelect } from "@/types/types";
import toast from "react-hot-toast";
import axios from "axios";

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

const FestivalTagForm = () => {
  const { data: productsData, isLoading } = useGetProductsQuery({});
  const [selectedOption, setSelectedOption] = useState([]);
  const [createFestival] = useCreateFestivalMutation();

  const handleSelectChange = (option: any) => {
    setSelectedOption(option.map((elem: TOptionSelect) => elem.value));
  };

  const options = productsData?.product?.map((elem) => ({
    value: elem._id,
    label: elem.slug,
  }));

  // use a proper type for the event argument here instead of any
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget as HTMLFormElement);

    formData.append("products", selectedOption as string[] | any);

    const formDataObj = Object.fromEntries(formData);

    if (formDataObj.featuredImage) {
      const formData = new FormData();
      formData.append("file", formDataObj.featuredImage);
      formData.append("upload_preset", process.env.UPLOAD_PRESET as string);
      const response = await axios.post(
        process.env.API_BASE_URL as string,
        formData
      );
      console.log("response.data.secure_url", response.data.secure_url);
    } else {
      console.log("response.data.secure_url", formDataObj.featuredImage);
    }
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
          <label className="text-sm font-semibold mb-2" htmlFor="featuredImage">
            Featured Image:
          </label>
          <input
            className="w-full border border-gray-300 p-2 rounded outline-none focus:border-gray-500"
            type="file"
            name="featuredImage"
            id="featuredImage"
            required
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

export { FestivalTagForm };
