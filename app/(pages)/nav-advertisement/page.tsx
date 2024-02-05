"use client";
import NavAdvertisementForm from "@/components/navAdvertisement/NavAdvertisementForm";
import NavAdvertisementList from "@/components/navAdvertisement/NavAdvertisementList";
import { cloudinaryImageUpload } from "@/helpers";
import { cloudinaryImageDeleteWithUrl } from "@/helpers/cloudinaryImageDeleteWithUrl";
import { useGetCategoriesQuery } from "@/services/categoryApi";
import {
  useDeleteNavAdvertisementMutation,
  useGetNavAdvertisementsQuery,
  useUpdateNavAdvertisementMutation,
} from "@/services/navAdvertisementApi";
import { TNavAdvertisement } from "@/types/navAdvertisementTypes";
import Image from "next/image";
import { FC, useState, FormEvent, ChangeEvent } from "react";
import toast from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";
import Swal from "sweetalert2";

const SubCategory: FC = () => {
  const { data: categories } = useGetCategoriesQuery();
  const { data: navAdvertisementData, isLoading } =
    useGetNavAdvertisementsQuery();

  //crate category start
  const [formData, setFormData] = useState<TNavAdvertisement>({
    imageUrl: "",
    link: "",
    category: "",
    status: "",
  });

  const [imageUploadLoading, setImageUploadLoading] = useState(false);

  //handle delete
  const [deleteNavAdvertisement] = useDeleteNavAdvertisementMutation();
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
        const categoryDel = await deleteNavAdvertisement(id);

        // console.log("delelte dataaaa", categoryDel);

        // const categoryDelData = (categoryDel as { data?: any })?.data;
        // const featuredImagePublicId =
        //   categoryDelData?.data?.featuredImagePublicId;

        await cloudinaryImageDeleteWithUrl(
          (categoryDel as any)?.data?.data?.imageUrl
        );
        Swal.fire("Deleted!", "Your category has been deleted.", "success");
        if (categoryDel) {
          //   refetch(); // Refetch the user list after deleting a user
        }
      }
    });
  };

  //edit modal
  const [filteredData, setFilteredData] = useState([
    {
      _id: "",
      imageUrl: "",
      link: "",
      category: "",
      status: "",
    },
  ]);

  // console.log("filtered data", filteredData);

  const [selectedValue, setSelectedValue] = useState<string>("");
  const handleEditCategory = (id: string) => {
    const filtered: any = navAdvertisementData?.data?.find(
      (item: any) => item._id === id
    );

    // console.log("filterererere", filtered);

    setFilteredData([
      {
        _id: filtered._id,
        imageUrl: filtered.imageUrl,
        link: filtered.link,
        category: filtered.category._id,
        status: filtered.status,
      },
    ]);
    setSelectedValue(filtered.status);
    setIsOpen(true);
  };

  const [isOpen, setIsOpen] = useState(true);

  //update category start
  const [updateNavAdvertisement] = useUpdateNavAdvertisementMutation();

  const handleUpdateNavAdvertisementSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const formData: any = {
      link: filteredData[0]?.link,
      imageUrl: filteredData[0]?.imageUrl,
      category: filteredData[0]?.category,
      status: selectedValue,
    };

    const { link, status, category, imageUrl } = formData;

    try {
      const updatedData = { imageUrl, status, category, link };
      const updatedNavAdvertisementData = await updateNavAdvertisement({
        id: filteredData[0]?._id,
        payload: updatedData,
      }).unwrap();

      // console.log("updated category", updatedSubCategory);

      if (updatedNavAdvertisementData) {
        toast.success("Nav-Advertisement Updated!", { duration: 3000 });
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
        const previousImage = filteredData[0]?.imageUrl;
        if (previousImage) {
          await cloudinaryImageDeleteWithUrl(previousImage);
        }
        const { secureUrl } = await cloudinaryImageUpload(file);
        if (secureUrl) {
          setImageUploadLoading(false);
          toast.success("new image added successfully");
        }

        setFilteredData([
          {
            ...filteredData[0],
            imageUrl: secureUrl,
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
        <h1 className="text-lg font-semibold mb-2">All Nav-Advertisements</h1>
        <NavAdvertisementList
          navAdvertisementData={
            navAdvertisementData?.data as TNavAdvertisement[]
          }
          handleEditAdvertisement={handleEditCategory}
          handleDeleteAdvertisement={handleDeleteCategory}
        />
      </div>

      {/* add new category  */}
      <div className="flex-[3]">
        <h1 className="text-lg font-semibold mb-2">
          Add New Nav-Advertisement
        </h1>
        <NavAdvertisementForm formData={formData} setFormData={setFormData} />
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
                    Update Nav-Advertisement
                  </h1>
                  <div className="text-red-500 text-xs font-medium">
                    <p className="mb-1">
                      * choosing any image automatically upload the image and
                      destroy previous image
                    </p>
                    <p className="">
                      {`* So after changing any image if you don't update the data
            then the previous image will not found.`}
                    </p>
                  </div>
                  <form
                    onSubmit={handleUpdateNavAdvertisementSubmit}
                    className="bg-white p-3 flex flex-col gap-y-3 rounded-xl"
                  >
                    <div>
                      <label className="font-medium" htmlFor="link">
                        Link:
                      </label>
                      <input
                        className="block w-full p-2 border border-gray-400 focus:outline-none text-gray-500 mt-1"
                        type="text"
                        name="link"
                        required
                        value={filteredData[0].link}
                        onChange={handleChangeFormData}
                      />
                    </div>
                    <div className="mb-2">
                      <label className="font-medium" htmlFor="category">
                        Select Category:
                      </label>
                      {categories?.data && filteredData[0].category && (
                        <select
                          className="w-full border border-gray-400 rounded-sm p-2 focus:outline-none text-gray-500"
                          required
                          name="category"
                          value={filteredData[0].category}
                          onChange={handleChangeFormData}
                        >
                          {categories?.data?.map(
                            (category: any, index: number) => (
                              <option key={category._id} value={category._id}>
                                {category.title}
                              </option>
                            )
                          )}
                        </select>
                      )}
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
                        Image:
                      </label>
                      {filteredData[0].imageUrl && (
                        <Image
                          src={filteredData[0].imageUrl}
                          alt="advertisement image"
                          width={100}
                          height={80}
                          className="mb-2 mt-1"
                        />
                      )}
                      <input
                        type="file"
                        id="imageUpload"
                        name="imageUrl"
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
