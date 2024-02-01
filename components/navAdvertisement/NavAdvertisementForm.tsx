import { cloudinaryImageUpload } from "@/helpers";
import { useGetCategoriesQuery } from "@/services/categoryApi";
import { useCreateNavAdvertisementMutation } from "@/services/navAdvertisementApi";
import { useCreateSubCategoryMutation } from "@/services/subcategory";
import React, { ChangeEvent, FC, FormEvent, useState } from "react";
import toast from "react-hot-toast";

interface CategoryFormProps {
  formData: any;
  setFormData: any;
}

const NavAdvertisementForm: FC<CategoryFormProps> = ({
  setFormData,
  formData,
}) => {
  const { data: categories } = useGetCategoriesQuery();
  const [createNavAdvertisement] = useCreateNavAdvertisementMutation();
  const [imageUploadLoading, setImageUploadLoading] = useState(false);
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
          imageUrl: secureUrl,
        });
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error("Error uploading image");
      }
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const data = await createNavAdvertisement(formData);

      console.log("data", data);

      if (data) {
        toast.success("New SubCategory Created", { duration: 3000 });
        setFormData({
          link: "",
          imageUrl: "",
          category: "",
          status: "",
        });
      }
    } catch (error) {
      console.error("Error creating subcategory:", error);
      toast.error("Error creating subcategory");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-3 flex flex-col gap-y-3 rounded-xl"
    >
      <div>
        <label className="font-medium" htmlFor="link">
          Link:
        </label>
        <input
          className="w-full border border-gray-400 rounded-sm p-2 focus:outline-none text-gray-500"
          type="text"
          id="link"
          name="link"
          placeholder="Enter Link"
          value={formData.link}
          onChange={(e) =>
            setFormData({
              ...formData,
              link: e.target.value,
            })
          }
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
          onChange={(e) =>
            setFormData({
              ...formData,
              category: e.target.value,
            })
          }
          required
        >
          <option disabled value="">
            Choose Category
          </option>
          {categories?.data?.map((category: any, index: number) => (
            <option key={category._id} value={category._id}>
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
          onChange={(e) =>
            setFormData({
              ...formData,
              status: e.target.value,
            })
          }
          required
        >
          <option disabled value="">
            Choose Status
          </option>
          <option value="published">Publish</option>
          <option value="draft">Draft</option>
        </select>
      </div>
      <div className="mb-2">
        <label className="font-medium block" htmlFor="imageUpload">
          Image:
        </label>
        <input
          type="file"
          id="imageUpload"
          name="imageUpload"
          onChange={handleImageChange}
        ></input>
      </div>
      <button
        className={`${
          imageUploadLoading && "cursor-not-allowed"
        } bg-secondary py-1 px-4 rounded-md text-white w-full`}
        type="submit"
        disabled={imageUploadLoading}
      >
        Upload
      </button>
    </form>
  );
};

export default NavAdvertisementForm;
