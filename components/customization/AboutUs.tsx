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
import ImageUploading, { ImageListType } from "react-images-uploading";

// Define TypeScript interfaces for the data structure
interface ICeoData {
  image: string;
  userName: string;
  designation: string;
}

interface IAboutUsData {
  ceoData: ICeoData;
  topHeading: string;
  secondText: string;
  thirdText: string;
  otherEmployeesData: {
    image: string;
    userName: string;
    designation: string;
    _id?: string;
    file?: File;
  }[];
}

const AboutUsComponent = () => {
  const { data, isLoading } = useGetCustomizationByIdQuery(
    "64d9fb77f3a7ce9915b44b6f"
  );

  const [updateCustomization] = useUpdateCustomizationMutation();

  const customizeData: IAboutUsData | undefined = data?.data?.aboutUs;

  const [topHeading, setTopHeading] = useState(customizeData?.topHeading || "");
  const [middleText, setMiddleText] = useState(customizeData?.secondText || "");
  const [lastText, setLastText] = useState(customizeData?.thirdText || "");

  const [images, setImages] = useState<
    IAboutUsData["otherEmployeesData"] | null
  >(null);

  // A function to handle the input or textarea change
  const handleChange = (
    index: number,
    key: keyof IAboutUsData["otherEmployeesData"][0],
    value: string
  ) => {
    // Make a copy of the formData array
    const newImages = [...images!];
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
        const newImages = images!.filter((_, index) => index !== indexToRemove);
        setImages(newImages);
      }
    });
  };

  const handleAddNewField = () => {
    const newField: IAboutUsData["otherEmployeesData"][0] = {
      image: "",
      userName: "",
      designation: "",
      _id: "",
    };
    setImages([...(images || []), newField]);
  };

  useEffect(() => {
    if (customizeData) {
      const updateImageState = customizeData.otherEmployeesData.map((item) => ({
        image: item.image,
        userName: item.userName,
        designation: item.designation,
        _id: item._id,
      }));
      setImages(updateImageState);
    }
  }, [customizeData]);

  // const onChangeHandle = (imageList: any, index: number) => {
  //   // Create a copy of the existing images array
  //   const updatedImages = [...images!];
  //   // Update the element at the specified index with new data
  //   updatedImages[index] = {
  //     image: imageList[0].image, // Use the image property
  //     userName: updatedImages[index].userName, // Preserve other properties
  //     designation: updatedImages[index].designation,
  //     _id: updatedImages[index]._id,
  //   };
  //   // Set the updated images array back to the state
  //   setImages(updatedImages);
  // };

  const onChangeHandle = (imageList: any, index: number) => {
    // Create a copy of the existing images array
    const updatedImages = [...images!];

    if (updatedImages[index]) {
      // Update the element at the specified index with new data for an existing field
      updatedImages[index] = {
        image: imageList[0].image, // Use the image property
        userName: updatedImages[index].userName, // Preserve other properties
        designation: updatedImages[index].designation,
        _id: updatedImages[index]._id,
      };
    } else {
      // Create a new field for a newly uploaded image
      updatedImages[index] = {
        image: imageList[0].image,
        userName: "", // You can set this to an initial value
        designation: "", // You can set this to an initial value
        _id: "", // You can set this to an initial value
      };
    }

    // Set the updated images array back to the state
    setImages(updatedImages);
  };

  const handleUpdateOnClick = async (event: any) => {
    event.preventDefault();
    // images upload on cloudinary
    const imagesAndDataUpload = await Promise.all(
      images!.map(async (image, index) => {
        if (image._id) {
          // Existing data, just update
          return image;
        } else {
          // New data, upload image to Cloudinary
          if (image.file) {
            const formData = new FormData();
            formData.append("file", image.file);
            formData.append(
              "upload_preset",
              process.env.OTHER_PRESET as string
            );
            const response = await axios.post(
              process.env.CLOUDINARY_URL as string,
              formData
            );
            return {
              image: response.data.secure_url,
              userName: image.userName,
              designation: image.designation,
            };
          }
        }
      })
    );

    try {
      const updatedTopLeftCarosel: any = await updateCustomization({
        id: "64d9fb77f3a7ce9915b44b6f",
        payload: {
          aboutUs: {
            ceoData: customizeData?.ceoData,
            topHeading: customizeData?.topHeading,
            secondText: customizeData?.secondText,
            thirdText: customizeData?.thirdText,
            otherEmployeesData: imagesAndDataUpload,
          },
        },
      });

      if (updatedTopLeftCarosel.data.success) {
        // Show a success toast message here
        toast.success("About Us Section Updated Successfully!", {
          duration: 3000,
        });
      }
    } catch (error) {
      toast.error("Error occurred! Please fill all the fields correctly.", {
        duration: 3000,
      });
      console.error(error);
    }
  };

  return (
    <div className="mt-4">
      {customizeData && (
        <>
          <div>
            <div>
              <label
                htmlFor={`topHeading`}
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Top Heading
              </label>
              <input
                type="text"
                id={`topHeading`}
                value={customizeData.topHeading}
                name="topHeading"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Write a question"
                required
                // Use the handleChange function to update the state when the input value changes
                onChange={(e) => setTopHeading(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                  }
                }}
              />
            </div>
            <div>
              <label
                htmlFor={`middleText`}
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Middle Text
              </label>
              <input
                type="text"
                id={`middleText`}
                value={customizeData.secondText}
                name="middleText"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Write a question"
                required
                // Use the handleChange function to update the state when the input value changes
                onChange={(e) => setMiddleText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                  }
                }}
              />
            </div>
            <div>
              <label
                htmlFor={`LastText`}
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Last Text
              </label>
              <input
                type="text"
                id={`LastText`}
                value={customizeData.thirdText}
                name="LastText"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Write a question"
                required
                // Use the handleChange function to update the state when the input value changes
                onChange={(e) => setLastText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                  }
                }}
              />
            </div>
          </div>

          <div>
            <div className="p-4 bg-white rounded-xl flex flex-col gap-2 mb-4">
              <div className="flex flex-col gap-3">
                <div className="flex justify-between">
                  <label className="block mb-2 text-md font-semibold border-b text-gray-900 dark:text-white">
                    CEO Data:
                  </label>
                </div>
                <div>
                  <label
                    htmlFor={`userName`}
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    User Name:
                  </label>
                  <input
                    type="text"
                    id={`userName`}
                    value={customizeData.ceoData.userName}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Write a question"
                    required
                    // Use the handleChange function to update the state when the input value changes
                    onChange={(e) =>
                      handleChange(0, "userName", e.target.value)
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
                    htmlFor={`designation`}
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Designation
                  </label>
                  <input
                    type="text"
                    id={`designation`}
                    value={customizeData.ceoData.designation}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Write a question"
                    required
                    // Use the handleChange function to update the state when the input value changes
                    onChange={(e) =>
                      handleChange(1, "designation", e.target.value)
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
                  {/* // Update CEO data separately */}
                  <ImageUploading
                    value={
                      customizeData.ceoData.image ? [customizeData.ceoData] : []
                    }
                    onChange={(imageList) => onChangeHandle(imageList, 0)} // Pass the index as 0 for CEO image
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
          </div>
        </>
      )}
      <div>
        {!isLoading &&
          images &&
          images.map((data, index) => (
            <div
              key={index}
              className="p-4 bg-white rounded-xl flex flex-col gap-2 mb-4"
            >
              <div className="flex flex-col gap-3">
                <div className="flex justify-between">
                  <label className="block mb-2 text-md font-semibold border-b text-gray-900 dark:text-white">
                    Employee No: {index + 1}
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
                    htmlFor={`employeeUserName_${index}`}
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    User Name:
                  </label>
                  <input
                    type="text"
                    id={`employeeUserName_${index}`}
                    value={data.userName}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Write a question"
                    required
                    // Use the handleChange function to update the state when the input value changes
                    onChange={(e) =>
                      handleChange(index, "userName", e.target.value)
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
                    htmlFor={`employeeDesignation_${index}`}
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Designation:
                  </label>
                  <input
                    type="text"
                    id={`employeeDesignation_${index}`}
                    value={data.designation}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Write a question"
                    required
                    // Use the handleChange function to update the state when the input value changes
                    onChange={(e) =>
                      handleChange(index, "designation", e.target.value)
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
                    value={images![index].image ? [images![index]] : []}
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

export default AboutUsComponent;
