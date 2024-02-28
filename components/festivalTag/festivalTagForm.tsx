"use client";
import dynamic from "next/dynamic";
const Select = dynamic(() => import("react-select"), {
  ssr: false,
});
import { useGetProductsQuery } from "@/services/productApi";
import { ChangeEvent, FormEvent, useState } from "react";
import { TOptionSelect } from "@/types/types";
import { cloudinaryImageUpload } from "@/helpers";
import toast from "react-hot-toast";
import Image from "next/image";
import { useCreateFestivalMutation } from "@/services/festivalsApi";
import { ScaleLoader } from "react-spinners";

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
  const [formData, setFormData] = useState({
    // _id: "",
    title: "",
    products: [],
    status: "",
    featuredImage: "",
  });

  const [imageUploadLoading, setImageUploadLoading] = useState(false);
  const { data: productsData, isLoading } = useGetProductsQuery({});
  const [createSale] = useCreateFestivalMutation();

  const handleSelectChange = (option: any) => {
    // setSelectedOption(option.map((elem: TOptionSelect) => elem.value));
    setFormData({
      ...formData,
      products: option.map((elem: TOptionSelect) => elem.value),
    });
  };

  // console.log("formData option", formData);

  const options = productsData?.product?.map((elem) => ({
    value: elem._id,
    label: elem.sku,
  }));

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setImageUploadLoading(true);
    const file = e.target.files?.[0];
    if (file) {
      try {
        // const secure_url = await cloudinaryImageUpload(file);
        const { secureUrl } = await cloudinaryImageUpload(file);
        if (secureUrl) {
          setImageUploadLoading(false);
        }
        setFormData({
          ...formData,
          featuredImage: secureUrl,
        });
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error("Error uploading image");
      }
    }
  };

  // use a proper type for the event argument here instead of any
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const createData = await createSale(formData);
    if (createData) {
      toast.success("new sale created successfully");
      setFormData({
        title: "",
        products: [],
        status: "",
        featuredImage: "",
      });
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
            value={formData.title}
            onChange={(e) =>
              setFormData({
                ...formData,
                title: e.target.value,
              })
            }
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
            id="status"
            value={formData.status}
            onChange={(e) =>
              setFormData({
                ...formData,
                status: e.target.value,
              })
            }
            required
          >
            <option value="" disabled>
              Select Status
            </option>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="text-sm font-semibold mb-2 block" htmlFor="status">
            Featured Image:
          </label>
          <input
            type="file"
            id="imageUpload"
            name="imageUpload"
            onChange={handleImageChange}
          ></input>
          {imageUploadLoading ? (
            <div className="flex items-center gap-2 my-2">
              <span>uploading </span>
              <ScaleLoader
                color="#820000"
                margin={3}
                speedMultiplier={1.5}
                height={15}
                width={3}
              />
            </div>
          ) : (
            <>
              {formData.featuredImage && (
                <Image
                  src={formData.featuredImage}
                  alt="Feature Image"
                  width={100}
                  height={100}
                  className="mt-2"
                />
              )}
            </>
          )}
        </div>
        <button
          className={`${
            imageUploadLoading && "cursor-not-allowed"
          } bg-secondary text-white py-2 rounded w-full hover:bg-secondary-hover transition duration-300 ease-in-out`}
          type="submit"
          disabled={imageUploadLoading}
        >
          Add Festival
        </button>
      </form>
    </>
  );
};

export { FestivalTagForm };
