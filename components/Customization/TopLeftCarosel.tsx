import { useEffect, useState } from "react";
import {
  useGetCustomizationByIdQuery,
  useUpdateCustomizationMutation,
} from "@/services/customizationApi";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
import Image from "next/image";
import { SlCloudUpload } from "react-icons/sl";
import axios from "axios";
import ImageUploading from "react-images-uploading";

const TopLeftCarosel = () => {
  const { data, isLoading } = useGetCustomizationByIdQuery(
    "64d9fb77f3a7ce9915b44b6f"
  );

  const [updateCustomization] = useUpdateCustomizationMutation();

  const customizeData = data?.data?.heroLeftSlider;

  const [images, setImages] = useState<
    {
      image: string;
      bottomHeading: string;
      mainHeading: string;
      topHeading: string;
      file?: any;
    }[]
  >([]);

  // A function to handle the input or textarea change
  const handleChange = (index: number, key: string, value: string) => {
    // Make a copy of the formData array
    const newImages = [...images];
    // Update the object at the given index with the new value
    newImages[index] = { ...newImages[index], [key]: value };
    // Set the state with the updated array
    setImages(newImages);
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
        const newImages = images.filter((_, index) => index !== indexToRemove);
        setImages(newImages);
      }
    });
  };

  const handleAddNewField = () => {
    const newField: any = {
      topHeading: "",
      mainHeading: "",
      image: "",
      bottomHeading: "",
    };
    setImages([...images, newField]);
  };

  useEffect(() => {
    if (customizeData) {
      const updateImageState = customizeData.map((url: any) => ({
        image: url.image,
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
      image: imageList[0].image, // Use the image property
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
    const imagesAndDataUpload = await Promise.all(
      images?.map(async (image: any, index: number) => {
        if (image.file) {
          const formData = new FormData();
          formData.append("file", image.file);
          formData.append("upload_preset", process.env.OTHER_PRESET as string);
          const response = await axios.post(
            process.env.API_BASE_URL as string,
            formData
          );
          return {
            image: response.data.secure_url, // Use the image property
            bottomHeading: images[index].bottomHeading, // Preserve other properties
            mainHeading: images[index].mainHeading,
            topHeading: images[index].topHeading,
          };
        } else {
          return {
            image: images[index].image, // Use the image property
            bottomHeading: images[index].bottomHeading, // Preserve other properties
            mainHeading: images[index].mainHeading,
            topHeading: images[index].topHeading,
          };
        }
      })
    );
    console.log("Allah Vorosa", imagesAndDataUpload);
    try {
      const updatedTopLeftCarosel: any = await updateCustomization({
        id: "64d9fb77f3a7ce9915b44b6f",
        payload: { heroLeftSlider: imagesAndDataUpload },
      });

      if (updatedTopLeftCarosel.data.success) {
        // Show a success toast message here
        toast.success("Top Left Carosel Updated Successfully!", {
          duration: 3000,
        });
      }
    } catch (error) {
      toast.error("Error occured! Please fill all the field correctly.", {
        duration: 3000,
      });
      console.error(error);
    }
  };

  return (
    <div className="mt-4">
      <div>
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
                      handleChange(index, "topHeading", e.target.value)
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
                    value={data.mainHeading}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Write a question"
                    required
                    // Use the handleChange function to update the state when the input value changes
                    onChange={(e) =>
                      handleChange(index, "mainHeading", e.target.value)
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
                      handleChange(index, "bottomHeading", e.target.value)
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
                    dataURLKey="image"
                  >
                    {({ imageList, onImageUpdate }) => (
                      <div className="upload__image-wrapper">
                        {imageList.map((image: any, index: number) => (
                          <div
                            key={index}
                            className="image-item flex flex-col items-end w-max"
                          >
                            <Image
                              src={image["image"]}
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
      </div>
    </div>
  );
};

export default TopLeftCarosel;
