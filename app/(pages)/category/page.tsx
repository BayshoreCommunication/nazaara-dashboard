"use client";
import CategoryForm from "@/components/category/CategoryFrom";
import CategoryList from "@/components/category/CategoryList";
import {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
} from "@/services/categoryApi";
import { TCategoryData } from "@/types/categoryTypes";
import { FC, useState, ChangeEvent, FormEvent, useRef } from "react";
import toast from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";
import Swal from "sweetalert2";

const Category: FC = () => {
  const { data: categoriesData, isLoading, refetch } = useGetCategoriesQuery();
  const [createCategory] = useCreateCategoryMutation();
  //handle form for creating new category

  //crate category start
  const [formData, setFormData] = useState<TCategoryData>({
    title: "",
    slug: "",
    status: "",
  });

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    // Perform any form validation or data processing here
    const data = await createCategory(formData);
    refetch();
    if (data) {
      toast.success("New Category Created", { duration: 3000 });
      // Reset form fields
      setFormData({
        title: "",
        slug: "",
        status: "",
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
  const [deleteCategory] = useDeleteCategoryMutation();
  const handleDeleteCategory = async (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      customClass: {
        confirmButton: "swal2-confirm !bg-blue-600 !text-white",
        cancelButton: "swal2-cancel !bg-red-600 !text-white",
      },
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your category has been deleted.", "success");
        const categoryDel = await deleteCategory(id);
        if (categoryDel) {
          refetch(); // Refetch the user list after deleting a user
        }
      }
    });
  };
  const [isOpen, setIsOpen] = useState(false);

  //edit modal
  const [filteredData, setFilteredData] = useState({
    _id: "",
    title: "",
    status: "",
  });

  const handleEditCategory = (id: string) => {
    const filtered: any = categoriesData?.data?.find(
      (item: any) => item._id === id
    );

    if (filtered) {
      setFilteredData(filtered);
      setIsOpen(true);
    }
  };

  //update category start
  const [updateCategory] = useUpdateCategoryMutation();

  const handleUpdateCategorySubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      // const updatedData = { name, status };
      const updatedCategory = await updateCategory({
        id: filteredData?._id,
        payload: {
          title: filteredData.title,
          status: filteredData.status,
        },
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
  };

  return (
    <div className="flex gap-10 dynamic-container">
      {/* show all category  */}
      <div className="flex-[6] overflow-x-auto">
        <h1 className="text-lg font-semibold mb-2">All Categories</h1>
        <CategoryList
          categories={categoriesData?.data as TCategoryData[]}
          handleEditCategory={handleEditCategory}
          handleDeleteCategory={handleDeleteCategory}
        />
      </div>

      {/* add new category  */}
      <div className="flex-[3]">
        <h1 className="text-lg font-semibold mb-2">Add New Category</h1>
        <CategoryForm
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          formData={formData}
        />
      </div>
      {isOpen && (
        <>
          {/* modal code start  */}
          <input type="checkbox" id="modal-handle" className="modal-toggle" />

          {filteredData && (
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
                    Update Category
                  </h1>

                  <form
                    onSubmit={handleUpdateCategorySubmit}
                    className="bg-white p-3 flex flex-col gap-y-3 rounded-xl"
                  >
                    <div>
                      <label className="font-medium" htmlFor="name">
                        Category Name:
                      </label>
                      <input
                        className="block w-full p-2 border border-gray-400 focus:outline-none text-gray-500 mt-1"
                        type="text"
                        required
                        value={filteredData.title}
                        onChange={(e) =>
                          setFilteredData({
                            ...filteredData,
                            title: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="mb-2">
                      <label className="font-medium" htmlFor="status">
                        Status:
                      </label>
                      <select
                        className="w-full border border-gray-400 rounded-sm p-2 focus:outline-none text-gray-500"
                        required
                        value={filteredData.status}
                        onChange={(e) =>
                          setFilteredData({
                            ...filteredData,
                            status: e.target.value,
                          })
                        }
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

export default Category;
