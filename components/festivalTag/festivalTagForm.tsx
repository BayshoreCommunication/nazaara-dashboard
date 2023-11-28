"use client";
import dynamic from "next/dynamic";
const Select = dynamic(() => import("react-select"), {
  ssr: false,
});
import { useGetProductsQuery } from "@/services/productApi";
import { useCreateFestivalMutation } from "@/services/festivalsApi";
import { useState } from "react";
import { TOptionSelect } from "@/types/types";
import toast from "react-hot-toast";
import axios from "axios";
import { cloudinaryImageUpload } from "@/helpers";

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
  const { data: productsData } = useGetProductsQuery({});
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
  const handleSubmit = async (event: any) => {
    // formData.append("products", JSON.stringify(selectedOption));
    event.preventDefault();

    const featuredImage = await cloudinaryImageUpload(
      event.target.featuredImage.files[0],
      "upload"
    );

    // wait for featured image to be uploaded to cloudinary and then create festival
    if (featuredImage) {
      const festival = await createFestival({
        title: event.target.title.value,
        products: selectedOption,
        featuredImage: featuredImage,
        status: event.target.status.value,
      }).unwrap();

      if (festival) {
        toast.success("Festival Tag Created Successfully");
      } else {
        toast.error("Something went wrong");
      }
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
