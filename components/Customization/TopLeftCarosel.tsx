import { useEffect, useState } from "react";
import {
  useGetCustomizationByIdQuery,
  useUpdateCustomizationMutation,
} from "@/services/customizationApi";
import { IFaq, IHeroLeftSlider } from "@/types/uiCustomization";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
import Image from "next/image";
import { SlCloudUpload } from "react-icons/sl";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import axios from "axios";
import ImageUploading from "react-images-uploading";

const TopLeftCarosel = () => {
  const { data, isLoading } = useGetCustomizationByIdQuery(
    "64d9fb77f3a7ce9915b44b6f"
  );

  const [updateCustomization] = useUpdateCustomizationMutation();

  const customizeData = data?.data?.heroLeftSlider;

  // Use a state variable to store the form data
  const [formData, setFormData] = useState<IHeroLeftSlider[]>([]);

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
        payload: { heroLeftSlider: formData },
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
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
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
    const newField: IHeroLeftSlider = {
      topHeading: "",
      mainHeading: "",
      image: "",
      bottomHeading: "",
      _id: "",
    };
    setFormData([...formData, newField]);
  };

  const [images, setImages] = useState<
    {
      data_url: string;
      bottomHeading: string;
      mainHeading: string;
      topHeading: string;
      file?: any;
    }[]
  >([]); // Changed the type to array

  useEffect(() => {
    if (customizeData) {
      const updateImageState = customizeData.map((url: any) => ({
        data_url: url.image,
        bottomHeading: url.bottomHeading,
        mainHeading: url.mainHeading,
        topHeading: url.topHeading,
      }));
      setImages(updateImageState);
    }
  }, [customizeData]);

  const onChangeHandle = (imageList: any, index: number) => {
    // Create a copy of the existing images array
    const updatedImages = [...images];

    // Update the element at the specified index with new data
    updatedImages[index] = {
      data_url: imageList[0].data_url, // Use the data_url property
      file: imageList[0].file, // Use the file property
      bottomHeading: updatedImages[index].bottomHeading, // Preserve other properties
      mainHeading: updatedImages[index].mainHeading,
      topHeading: updatedImages[index].topHeading,
    };

    // Set the updated images array back to the state
    setImages(updatedImages);
  };

  const handleUpdateOnClick = async (event: any) => {
    event.preventDefault();
    // images upload on cloudinary

    const imagesUpload = await Promise.all(
      images?.map(async (image: any) => {
        if (image.file) {
          const formData = new FormData();
          formData.append("file", image.file);
          formData.append("upload_preset", process.env.OTHER_PRESET as string);
          const response = await axios.post(
            process.env.API_BASE_URL as string,
            formData
          );
          return response.data.secure_url;
        } else {
          return image.data_url;
        }
      })
    );
    console.log("test", imagesUpload);
    // try {
    //   const updatedDeliveryPartner: any = await updateCustomization({
    //     id: "64d9fb77f3a7ce9915b44b6f",
    //     payload: { deliveryPartnerImages: imagesUpload },
    //   });
    //   if (updatedDeliveryPartner) {
    //     // Show a success toast message here
    //     toast.success("Delivery updated successfully!", { duration: 3000 });
    //   }
    // } catch (error) {
    //   console.error("Update failed", error);
    // }
  };

  console.log("Images", images);
  return (
    <div className="mt-4">
      <form onSubmit={handleFormSubmit}>
        {!isLoading &&
          images.map((data, index) => (
            <div
              key={index}
              className="p-4 bg-white rounded-xl flex flex-col gap-2 mb-4"
            >
              <div className="flex flex-col gap-3">
                <div className="flex justify-between">
                  <label className="block mb-2 text-md font-semibold border-b text-gray-900 dark:text-white">
                    Carosel No: {index + 1}
                  </label>
                  <button
                    type="button"
                    onClick={() => handleRemoveField(index)}
                    className="bg-secondary rounded-md text-white px-3 pt-0.5 pb-1 text-sm mb-1"
                  >
                    x
                  </button>
                </div>
                <div>
                  <label
                    htmlFor={`topHeading_${index}`}
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Top Heading
                  </label>
                  <input
                    type="text"
                    id={`topHeading_${index}`}
                    value={data.topHeading}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Write a question"
                    required
                    // Use the handleChange function to update the state when the input value changes
                    onChange={(e) =>
                      handleChange(index, "title", e.target.value)
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                      }
                    }}
                  />
                </div>
                <div>
                  <label
                    htmlFor={`mainHeading_${index}`}
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Main Heading
                  </label>
                  <input
                    type="text"
                    id={`mainHeading_${index}`}
                    value={data.topHeading}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Write a question"
                    required
                    // Use the handleChange function to update the state when the input value changes
                    onChange={(e) =>
                      handleChange(index, "title", e.target.value)
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                      }
                    }}
                  />
                </div>
                <div>
                  <label
                    htmlFor={`bottomHeading_${index}`}
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Bottom Heading
                  </label>
                  <input
                    type="text"
                    id={`bottomHeading_${index}`}
                    value={data.bottomHeading}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Write a question"
                    required
                    // Use the handleChange function to update the state when the input value changes
                    onChange={(e) =>
                      handleChange(index, "title", e.target.value)
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                      }
                    }}
                  />
                </div>
                {/* image  */}
                <div className="bg-basic rounded-lg px-6 py-3 flex flex-col gap-y-4">
                  <ImageUploading
                    value={[images[index]]}
                    onChange={(e) => onChangeHandle(e, index)}
                    dataURLKey="data_url"
                  >
                    {({
                      imageList,
                      onImageUpload,
                      onImageRemoveAll,
                      onImageUpdate,
                      onImageRemove,
                      isDragging,
                      dragProps,
                    }) => (
                      <div className="upload__image-wrapper">
                        {imageList.map((image: any, index: number) => (
                          <div
                            key={index}
                            className="image-item flex flex-col items-end w-max"
                          >
                            <Image
                              src={image["data_url"]}
                              alt="product_image"
                              width={300}
                              height={200}
                            />
                            <button
                              className="mt-1"
                              onClick={() => onImageUpdate(index)}
                            >
                              <SlCloudUpload size={20} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </ImageUploading>
                </div>
              </div>
            </div>
          ))}
        {/* <PrimaryButton type="submit" label="Update" /> */}
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={handleAddNewField}
            className="bg-secondary rounded-lg text-white px-4 py-1"
          >
            Add New Field
          </button>
          <button
            onClick={handleUpdateOnClick}
            type="submit"
            className="bg-secondary rounded-lg text-white px-4 py-1"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default TopLeftCarosel;
