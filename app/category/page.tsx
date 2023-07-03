"use client";
import CategoryForm from "@/components/Category/CategoryFrom";
import CategoryList from "@/components/Category/CategoryList";
import Loader from "@/components/loader";
import {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
} from "@/services/categoryApi";
import React, { useState, ChangeEvent, FormEvent, useRef } from "react";
import toast from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";
import Swal from "sweetalert2";

const Category: React.FC = () => {
  const { data: CategoriesData, isLoading, refetch } = useGetCategoriesQuery();

  const [createCategory] = useCreateCategoryMutation();

  //handle form for creating new category
  interface IFormData {
    _id?: string;
    name: string;
    status: string;
  }

  interface Category {
    _id: string;
    name: string;
    status: string;
  }

  //crate category start
  const [formData, setFormData] = useState<IFormData>({
    name: "",
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
        name: "",
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
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
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

  //edit modal
  const [filteredData, setFilteredData] = useState([
    { _id: "", name: "", status: "Publish" },
  ]);

  const [selectedValue, setSelectedValue] = useState<string>("");
  const handleEditCategory = (id: string) => {
    const filtered: any = CategoriesData?.data?.filter(
      (item) => item._id === id
    );

    setFilteredData(filtered);
    setSelectedValue(filtered[0].status);
    setIsOpen(true);
  };

  const [isOpen, setIsOpen] = useState(true);

  //update category start
  const [updateCategory] = useUpdateCategoryMutation();
  const nameRef = useRef<HTMLInputElement>(null);
  const statusRef = useRef<HTMLSelectElement>(null);

  const handleUpdateCategorySubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (nameRef.current && statusRef.current) {
      const formData: any = {
        name: nameRef.current.value,
        status: statusRef.current.value,
      };

      const { name, status } = formData;

      try {
        const updatedData = { name, status };
        const updatedCategory = await updateCategory({
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

  if (isLoading) return <Loader height="h-[90vh]" />;

  return (
    <div className="flex gap-10 container">
      {/* show all category  */}
      <div className="flex-[6] overflow-x-auto">
        <h1 className="text-lg font-semibold mb-2">All Categories</h1>
        {CategoriesData ? (
          <CategoryList
            categories={CategoriesData.data as Category[]} // Convert ICategory[] to Category[]
            handleEditCategory={handleEditCategory}
            handleDeleteCategory={handleDeleteCategory}
          />
        ) : (
          <Loader height="h-[90vh]" />
        )}
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
                        ref={nameRef}
                        required
                        defaultValue={filteredData[0].name}
                      />
                    </div>
                    <div className="mb-2">
                      <label className="font-medium" htmlFor="status">
                        Status:
                      </label>
                      <select
                        className="w-full border border-gray-400 rounded-sm p-2 focus:outline-none text-gray-500"
                        ref={statusRef}
                        required
                        value={selectedValue}
                        onChange={(e) => setSelectedValue(e.target.value)}
                      >
                        <option value="Publish">Publish</option>
                        <option value="Draft">Draft</option>
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
