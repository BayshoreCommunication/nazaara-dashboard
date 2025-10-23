import React, { useEffect, useState } from "react";
import {
  useGetCustomizationByIdQuery,
  useUpdateCustomizationMutation,
} from "@/services/customizationApi";
import { IFaq } from "@/types/uiCustomization";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";

const Faq = () => {
  const { data, isLoading } = useGetCustomizationByIdQuery(
    "64d9fb77f3a7ce9915b44b6f"
  );

  const [updateCustomization] = useUpdateCustomizationMutation();

  const customizeData: IFaq[] | undefined = data?.data?.faq;

  // Use a state variable to store the form data
  const [formData, setFormData] = useState<IFaq[]>([]);

  // Update the state when the data is loaded
  useEffect(() => {
    if (customizeData) {
      setFormData(customizeData);
    }
  }, [customizeData]);

  const handleFormSubmit = async (e: any) => {
    try {
      e.preventDefault();
      const updatedCategory: any = await updateCustomization({
        id: "64d9fb77f3a7ce9915b44b6f",
        payload: { faq: formData },
      });

      if (updatedCategory.data.success) {
        // Show a success toast message here
        toast.success("Faq updated successfully!", { duration: 3000 });
      }
      // console.log("updatedcategory", updatedCategory);
    } catch (error) {
      toast.error("Error occured!", { duration: 3000 });
      console.error(error);
    }

    // console.log("update processed");
    // Here you can access the formData and send it to the database
    // console.log("frontend formDAta", formData);
  };

  // A function to handle the input or textarea change
  const handleChange = (index: number, key: string, value: string) => {
    // Make a copy of the formData array
    const newFormData = [...formData];
    // Update the object at the given index with the new value
    newFormData[index] = { ...newFormData[index], [key]: value };
    // Set the state with the updated array
    setFormData(newFormData);
  };

  const handleRemoveField = (indexToRemove: number) => {
    Swal.fire({
      title: "Are you sure you want to remove?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      customClass: {
        confirmButton: "swal2-confirm !bg-blue-600 !text-white",
        cancelButton: "swal2-cancel !bg-red-600 !text-white",
      },
      confirmButtonText: "Yes, remove it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire(
          "Deleted!",
          "Your faq has been deleted. Make sure you update the customization",
          "success"
        );
        const newFormData = formData.filter(
          (_, index) => index !== indexToRemove
        );
        setFormData(newFormData);
      }
    });
  };

  const handleAddNewField = () => {
    const newField: IFaq = { title: "", answer: "" };
    setFormData([...formData, newField]);
  };

  return (
    <div className="mt-4">
      <form onSubmit={handleFormSubmit}>
        {!isLoading &&
          formData.map((data, index) => (
            <div
              key={index}
              className="p-4 bg-white rounded-xl flex flex-col gap-2 mb-4"
            >
              <div>
                <div className="flex justify-between">
                  <label
                    htmlFor={`first_name_${index}`}
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Query: {index + 1}
                  </label>
                  <button
                    type="button"
                    onClick={() => handleRemoveField(index)}
                    className="bg-secondary rounded-md text-white px-3 pt-0.5 pb-1 text-sm mb-1"
                  >
                    x
                  </button>
                </div>
                <input
                  type="text"
                  id={`first_name_${index}`}
                  value={data.title}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Write a question"
                  required
                  // Use the handleChange function to update the state when the input value changes
                  onChange={(e) => handleChange(index, "title", e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor={`message_${index}`}
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Solution
                </label>
                <textarea
                  id={`message_${index}`}
                  // rows={4}
                  value={data.answer}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Write your answer here..."
                  // Use the handleChange function to update the state when the textarea value changes
                  onChange={(e) =>
                    handleChange(index, "answer", e.target.value)
                  }
                ></textarea>
              </div>
            </div>
          ))}
        {/* <PrimaryButton type="submit" label="Update" /> */}
        <div className="flex justify-end gap-2 items-center">
          <small className="text-red-500">
            *After removing any field please hit the update button to update the
            faq
          </small>
          <button
            type="submit"
            className="bg-secondary rounded-lg text-white px-4 py-1"
          >
            Update
          </button>
          <button
            type="button"
            onClick={handleAddNewField}
            className="bg-secondary rounded-lg text-white px-4 py-1"
          >
            Add New Field
          </button>
        </div>
      </form>
    </div>
  );
};

export default Faq;
