"use client";

import SubCategoryForm from "@/components/subCategory/SubCategoryForm";
import SubCategoryList from "@/components/subCategory/SubCategoryList";
import { useGetCategoriesQuery } from "@/services/categoryApi";
import {
  useCreateSubCategoryMutation,
  useDeleteSubCategoryMutation,
  useGetSubCategoriesQuery,
  useUpdateSubCategoryMutation,
} from "@/services/subcategory";
import { TSubCategoryData, TSubCategoryFrom } from "@/types/categoryTypes";
import { FC, useState, ChangeEvent, FormEvent, useRef } from "react";
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

  const [createSubCategory] = useCreateSubCategoryMutation();

  //handle form for creating new category

  //crate category start
  const [formData, setFormData] = useState<TSubCategoryFrom>({
    title: "",
    status: "",
    category: "",
  });

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    // Perform any form validation or data processing here
    const data = await createSubCategory(formData);
    refetch();
    if (data) {
      toast.success("New SubCategory Created", { duration: 3000 });
      // Reset form fields
      setFormData({
        title: "",
        status: "",
        category: "",
      });
    }
  };
  //crate category end

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

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
        Swal.fire("Deleted!", "Your category has been deleted.", "success");
        const categoryDel = await deleteSubCategory(id);
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
      category: { _id: "", title: "" },
      status: "published",
    },
  ]);

  const [selectedValue, setSelectedValue] = useState<string>("");
  const handleEditCategory = (id: string) => {
    const filtered: any = subcategories?.data?.filter(
      (item: any) => item._id === id
    );

    setFilteredData(filtered);
    setSelectedValue(filtered[0].status);
    setIsOpen(true);
  };

  const [isOpen, setIsOpen] = useState(true);

  //update category start
  const [updateSubCategory] = useUpdateSubCategoryMutation();

  const handleUpdateCategorySubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (
      filteredData[0] &&
      filteredData[0]?.title &&
      filteredData[0]?.category?._id &&
      filteredData[0]?.status
    ) {
      const formData: any = {
        title: filteredData[0]?.title,
        category: filteredData[0]?.category?._id,
        status: selectedValue,
      };

      const { title, status, category } = formData;

      try {
        const updatedData = { title, status, category };
        const updatedCategory = await updateSubCategory({
          id: filteredData[0]?._id,
          payload: updatedData,
        }).unwrap();

        if (updatedCategory) {
          toast.success("Category updated!", { duration: 3000 });
          refetch(); // Refetch the categories list after updating
          setIsOpen(false);
        }
      } catch (error) {
        console.error("Error updating category:", error);
        toast.error("Failed to update category.");
      }
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

  return (
    <div className="flex gap-10 container">
      {/* show all category  */}
      <div className="flex-[6] overflow-x-auto">
        <h1 className="text-lg font-semibold mb-2">All Sub Categories</h1>
        <SubCategoryList
          subCategories={subcategories?.data as TSubCategoryData[]} // convert data to TCategoryData type array
          handleEditCategory={handleEditCategory}
          handleDeleteCategory={handleDeleteCategory}
        />
      </div>

      {/* add new category  */}
      <div className="flex-[3]">
        <h1 className="text-lg font-semibold mb-2">Add New SubCategory</h1>
        <SubCategoryForm
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          formData={formData}
        />
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
                        onChange={handleChangeFormData}
                        value={filteredData[0].category._id}
                      >
                        <option disabled value="">
                          Choose Category
                        </option>
                        {categories?.data?.map(
                          (category: any, index: number) => (
                            <option key={index} value={category._id}>
                              {category.title}
                            </option>
                          )
                        )}
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
                        onChange={(e) => setSelectedValue(e.target.value)}
                      >
                        <option value="published">Publish</option>
                        <option value="draft">Draft</option>
                      </select>
                    </div>
                    <button
                      type="submit"
                      className="bg-secondary py-1 px-4 rounded-md text-white w-full"
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
