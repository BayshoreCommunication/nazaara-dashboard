"use client";
import SubCategoryForm from "@/components/subCategory/SubCategoryForm";
import SubCategoryList from "@/components/subCategory/SubCategoryList";
import { cloudinaryImageUpload } from "@/helpers";
import { cloudinaryImageDelete } from "@/helpers/cloudinaryImageDelete";
import { useGetCategoriesQuery } from "@/services/categoryApi";
import {
  useDeleteSubCategoryMutation,
  useGetSubCategoriesQuery,
  useUpdateSubCategoryMutation,
} from "@/services/subcategory";
import { TSubCategoryData, TSubCategoryFrom } from "@/types/categoryTypes";
import Image from "next/image";
import { FC, useState, FormEvent, ChangeEvent } from "react";
import toast from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";
import Swal from "sweetalert2";

const SubCategory: FC = () => {
  const { data: categories, isLoading: categoriesLoading } =
    useGetCategoriesQuery();
  const {
    data: subcategories,
    isLoading,
    refetch,
  } = useGetSubCategoriesQuery();

  //crate category start
  const [formData, setFormData] = useState<TSubCategoryFrom>({
    title: "",
    status: "",
    category: "",
    featuredImage: "",
    featuredImagePublicId: "",
  });

  const [imageUploadLoading, setImageUploadLoading] = useState(false);

  //handle delete
  const [deleteSubCategory] = useDeleteSubCategoryMutation();
  const handleDeleteCategory = async (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const categoryDel = await deleteSubCategory(id);

        const categoryDelData = (categoryDel as { data?: any })?.data;
        const featuredImagePublicId =
          categoryDelData?.data?.featuredImagePublicId;

        await cloudinaryImageDelete(featuredImagePublicId);

        // await cloudinaryImageDelete(
        //   categoryDel?.data?.data?.featuredImagePublicId
        // );
        Swal.fire("Deleted!", "Your category has been deleted.", "success");
        if (categoryDel) {
          refetch(); // Refetch the user list after deleting a user
        }
      }
    });
  };

  //edit modal
  const [filteredData, setFilteredData] = useState([
    {
      _id: "",
      title: "",
      category: "",
      featuredImage: "",
      featuredImagePublicId: "",
      status: "published",
    },
  ]);

  const [selectedValue, setSelectedValue] = useState<string>("");
  const handleEditCategory = (id: string) => {
    const filtered: any = subcategories?.data?.filter(
      (item: any) => item._id === id
    );

    // console.log("filterererere", filtered);

    setFilteredData(filtered);
    setSelectedValue(filtered[0].status);
    setIsOpen(true);
  };

  const [isOpen, setIsOpen] = useState(true);

  //update category start
  const [updateSubCategory] = useUpdateSubCategoryMutation();

  const handleUpdateCategorySubmit = async (event: FormEvent) => {
    event.preventDefault();

    const formData: any = {
      title: filteredData[0]?.title,
      category: filteredData[0]?.category,
      status: selectedValue,
      featuredImage: filteredData[0]?.featuredImage,
    };

    const { title, status, category, featuredImage } = formData;

    try {
      const updatedData = { title, status, category, featuredImage };
      const updatedSubCategory = await updateSubCategory({
        id: filteredData[0]?._id,
        payload: updatedData,
      }).unwrap();

      // console.log("updated category", updatedSubCategory);

      if (updatedSubCategory) {
        toast.success("Category updated!", { duration: 3000 });
        refetch(); // Refetch the categories list after updating
        setIsOpen(false);
      }
    } catch (error) {
      console.error("Error updating category:", error);
      toast.error("Failed to update category.");
    }
  };

  const handleChangeFormData = (event: any) => {
    setFilteredData([
      {
        ...filteredData[0],
        [event.target.name]: event.target.value,
      },
    ]);
  };

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setImageUploadLoading(true);
    const file = e.target.files?.[0];
    if (file) {
      try {
        const previousImage = filteredData[0]?.featuredImagePublicId;
        if (previousImage) {
          await cloudinaryImageDelete(filteredData[0].featuredImagePublicId);
        }
        const { secureUrl, publicId } = await cloudinaryImageUpload(file);
        if (secureUrl && publicId) {
          setImageUploadLoading(false);
          toast.success("new image added successfully");
        }

        setFilteredData([
          {
            ...filteredData[0],
            featuredImage: secureUrl,
            featuredImagePublicId: publicId,
          },
        ]);
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error("Error uploading image");
      }
    }
  };

  return (
    <div className="flex gap-10 container">
      {/* show all category  */}
      <div className="flex-[6] overflow-x-auto">
        <h1 className="text-lg font-semibold mb-2">All Sub Categories</h1>
        <p className="text-sm mb-2">Recommended image size: ( 335 x 384 )</p>
        <SubCategoryList
          subCategories={subcategories?.data as TSubCategoryData[]} // convert data to TCategoryData type array
          handleEditCategory={handleEditCategory}
          handleDeleteCategory={handleDeleteCategory}
        />
      </div>

      {/* add new category  */}
      <div className="flex-[3]">
        <h1 className="text-lg font-semibold mb-2">Add New SubCategory</h1>
        <SubCategoryForm formData={formData} setFormData={setFormData} />
      </div>

      {isOpen && (
        <>
          {/* modal code start  */}
          <input type="checkbox" id="modal-handle" className="modal-toggle" />

          {filteredData.length > 0 && (
            <div className="modal">
              <div className="modal-box relative">
                <label
                  className="absolute top-3 right-3 text-xl font-semibold cursor-pointer"
                  htmlFor="modal-handle"
                >
                  <RxCross2 />
                </label>
                <div className="flex-[3]">
                  <h1 className="text-lg font-semibold mb-2 ml-3">
                    Update SubCategory
                  </h1>
                  <div className="mb-4 text-red-500 text-xs font-medium">
                    <p className="mb-1">
                      * Choosing any image upload automatically in the server
                      and destroy previous image
                    </p>
                    <p className="">
                      {`* So after changing any image if you don't update the data
            then the previous image will not found.`}
                    </p>
                  </div>
                  <form
                    onSubmit={handleUpdateCategorySubmit}
                    className="bg-white p-3 flex flex-col gap-y-3 rounded-xl"
                  >
                    <div>
                      <label className="font-medium" htmlFor="name">
                        SubCategory Name:
                      </label>
                      <input
                        className="block w-full p-2 border border-gray-400 focus:outline-none text-gray-500 mt-1"
                        type="text"
                        name="title"
                        required
                        onChange={handleChangeFormData}
                        defaultValue={filteredData[0].title}
                      />
                    </div>
                    <div className="mb-2">
                      <label className="font-medium" htmlFor="name">
                        Select Category:
                      </label>
                      <select
                        className="w-full border border-gray-400 rounded-sm p-2 focus:outline-none text-gray-500"
                        required
                        name="category"
                        defaultValue={filteredData[0].category}
                        onChange={handleChangeFormData}
                      >
                        <option value="">Choose Category</option>
                        {categories?.data?.map((category: any) => (
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
                        required
                        value={selectedValue}
                        name="status"
                        onChange={(e) => setSelectedValue(e.target.value)}
                      >
                        <option value="published">Publish</option>
                        <option value="draft">Draft</option>
                      </select>
                    </div>
                    <div className="mb-2">
                      <label className="font-medium" htmlFor="status">
                        Feature Image:
                      </label>
                      <Image
                        src={filteredData[0].featuredImage}
                        alt="featuredImage"
                        width={100}
                        height={80}
                        className="mb-2 mt-1"
                      />
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
                      Update
                    </button>
                  </form>
                </div>
              </div>
              <label className="modal-backdrop" htmlFor="modal-handle">
                Close
              </label>
            </div>
          )}
          {/* modal code end  */}
        </>
      )}
    </div>
  );
};

export default SubCategory;
