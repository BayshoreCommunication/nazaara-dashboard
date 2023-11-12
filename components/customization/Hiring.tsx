import React, {
  FC,
  useState,
  useEffect,
  ChangeEvent,
  FormEvent,
  useRef,
} from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import Loader from "@/components/Loader";
import {
  IHiringData,
  useCreateHiringCustomizationMutation,
  useDeleteHiringCustomizationMutation,
  useGetAllHiringQuery,
  useUpdateHiringCustomizationMutation,
} from "@/services/hiringApi";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { RxCross2 } from "react-icons/rx";
import HiringList from "../hiring/HiringList";
import HiringForm from "../hiring/HiringForm";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});

const Category: FC = () => {
  const { data: hiringsData, isLoading, refetch } = useGetAllHiringQuery();
  const [createHiringCustomization] = useCreateHiringCustomizationMutation();

  //handle form for creating new category
  // interface IFormData {
  //   _id?: string;
  //   title: string;
  //   description: string;
  //   status: string;
  // }

  const [formData, setFormData] = useState<IHiringData>({
    // _id: "",
    title: "",
    description: "",
    status: "",
  });

  const [text, setText] = useState("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const data = await createHiringCustomization(formData);
    refetch();
    if (data) {
      toast.success("New Hiring Created", { duration: 3000 });
      setFormData({
        // _id: "",
        title: "",
        description: "",
        status: "",
      });
    }
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  //handle delete
  const [deleteHiringCustomization] = useDeleteHiringCustomizationMutation();

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
        const categoryDel = await deleteHiringCustomization(id);
        if (categoryDel) {
          refetch();
        }
      }
    });
  };

  //edit modal
  const [filteredData, setFilteredData] = useState<IHiringData>({
    _id: "",
    title: "",
    description: "",
    status: "",
  });

  const [selectedValue, setSelectedValue] = useState<string>("");

  // const handleEditCategory = (id: string) => {
  //   const filtered = hiringsData?.data?.find((item) => item._id === id);

  //   setFilteredData(filtered);
  //   setSelectedValue(filtered?.status || "");
  //   setIsOpen(true);

  //   // Set the Quill editor content with the description of the selected category
  //   setText(filtered?.description || "");
  // };

  const handleEditCategory = (id: string) => {
    const filtered = hiringsData?.data?.find((item) => item._id === id);

    if (filtered) {
      setFilteredData(filtered);
      setSelectedValue(filtered.status || "");
      setIsOpen(true);

      // Set the Quill editor content with the description of the selected category
      setText(filtered.description || "");
    }
  };

  const [isOpen, setIsOpen] = useState(false);

  //update category start
  const [updateCategory] = useUpdateHiringCustomizationMutation();
  const nameRef = useRef<HTMLInputElement>(null);
  const statusRef = useRef<HTMLSelectElement>(null);

  // const handleUpdateCategorySubmit = async (event: React.FormEvent) => {
  //   event.preventDefault();

  //   if (nameRef.current && statusRef.current) {
  //     const formData: any = {
  //       title: nameRef.current.value,
  //       description: text,
  //       status: statusRef.current.value,
  //     };
  //     const { title, description, status } = formData;

  //     try {
  //       const updatedData = { title, description, status };
  //       const updatedCategory = await updateCategory({
  //         // id: filteredData[0]?._id,
  //         id: filteredData?._id,
  //         payload: updatedData,
  //       }).unwrap();

  //       if (updatedCategory) {
  //         toast.success("Hiring updated!", { duration: 3000 });
  //         refetch();
  //         setIsOpen(false);
  //       }
  //     } catch (error) {
  //       console.error("Error updating hiring:", error);
  //       toast.error("Failed to update hiring.");
  //     }
  //   }
  // };

  const handleUpdateCategorySubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (nameRef.current && statusRef.current) {
      const formData: any = {
        title: nameRef.current.value,
        description: text,
        status: statusRef.current.value,
      };
      const { title, description, status } = formData;

      try {
        const updatedData = { title, description, status };
        const updatedCategory = await updateCategory({
          id: filteredData._id, // Corrected this line
          payload: updatedData,
        }).unwrap();

        if (updatedCategory) {
          toast.success("Hiring updated!", { duration: 3000 });
          refetch();
          setIsOpen(false);
        }
      } catch (error) {
        console.error("Error updating hiring:", error);
        toast.error("Failed to update hiring.");
      }
    }
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      [
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "background",
        "color",
      ],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      [{ align: ["", "center", "right", "justify"] }],
      ["link"], // ["link", "image"],
      ["clean", "code"],
    ],
  };

  const formats = [
    "background",
    "header",
    "bold",
    "color",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "align",
    "link",
    // "image",
    "code",
  ];

  const handleChangeQuill = (value: string) => {
    setText(value);
  };

  useEffect(() => {
    if (filteredData?.description) {
      setText(filteredData?.description);
    }
  }, [filteredData?.description]);

  if (isLoading) return <Loader height="h-[90vh]" />;

  return (
    <div className="flex gap-10 container">
      {/* show all category */}
      <div className="flex-[6] overflow-x-auto">
        <h1 className="text-lg font-semibold mb-2">All Hirings</h1>
        {hiringsData ? (
          <HiringList
            hirings={hiringsData.data} // pass the truncated description to the component
            handleEditCategory={handleEditCategory}
            handleDeleteCategory={handleDeleteCategory}
          />
        ) : (
          <Loader height="h-[90vh]" />
        )}
      </div>

      {/* add new category */}
      <div className="flex-[3]">
        <h1 className="text-lg font-semibold mb-2">Add New Hiring</h1>
        <HiringForm
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          formData={formData}
          setFormData={setFormData}
        />
      </div>

      {isOpen && (
        <>
          {/* modal code start */}
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
                    Update Hiring Info
                  </h1>

                  <form
                    onSubmit={handleUpdateCategorySubmit}
                    className="bg-white p-3 flex flex-col gap-y-3 rounded-xl"
                  >
                    <div>
                      <label className="font-medium" htmlFor="name">
                        Job Title:
                      </label>
                      <input
                        className="block w-full p-2 border border-gray-400 focus:outline-none text-gray-500 mt-1"
                        type="text"
                        ref={nameRef}
                        required
                        defaultValue={filteredData.title}
                      />
                    </div>
                    <div>
                      <label className="font-medium" htmlFor="name">
                        Job Description:
                      </label>
                      <div className="quill-content">
                        <ReactQuill
                          value={text}
                          modules={modules}
                          formats={formats}
                          placeholder="Write something"
                          onChange={handleChangeQuill}
                        />
                      </div>
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
                        <option value="draft">Draft</option>
                        <option value="published">Publish</option>
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
          {/* modal code end */}
        </>
      )}
    </div>
  );
};

export default Category;
