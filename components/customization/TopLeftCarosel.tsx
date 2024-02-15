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
import { cloudinaryImageDeleteWithUrl } from "@/helpers/cloudinaryImageDeleteWithUrl";
import { cloudinaryImageUpload } from "@/helpers";

const TopLeftCarosel = () => {
  const [formData, setFormData] = useState([
    {
      imageUrl: "",
      link: "",
    },
  ]);
  const { data, isLoading } = useGetCustomizationByIdQuery(
    "64d9fb77f3a7ce9915b44b6f"
  );

  const [updateCustomization] = useUpdateCustomizationMutation();

  const customizeData = data?.data?.homeCarosel;

  // console.log("home carosel data", customizeData);
  // console.log("formData", formData);

  useEffect(() => {
    if (customizeData) {
      setFormData(
        customizeData.map((data: any) => ({
          imageUrl: data.imageUrl,
          link: data.link,
        }))
      );
    }
  }, [customizeData]);

  const [images, setImages] = useState<
    {
      image: string;
      bottomHeading: string;
      mainHeading: string;
      topHeading: string;
      file?: any;
    }[]
  >([]);

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
        Swal.fire("Deleted!", "Your carosel data has been removed.", "success");
        const updatedCaroselData = [...formData];
        updatedCaroselData.splice(indexToRemove, 1);
        setFormData(updatedCaroselData);
      }
    });
  };

  const handleAddNewField = () => {
    const newField = {
      link: "",
      imageUrl: "",
    };
    setFormData([...formData, newField]);
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

  // const handleUpdateOnClick = async (event: any) => {
  //   event.preventDefault();
  //   // images upload on cloudinary
  //   const imagesAndDataUpload = await Promise.all(
  //     images?.map(async (image: any, index: number) => {
  //       if (image.file) {
  //         const formData = new FormData();
  //         formData.append("file", image.file);
  //         formData.append("upload_preset", process.env.OTHER_PRESET as string);
  //         const response = await axios.post(
  //           process.env.CLOUDINARY_URL as string,
  //           formData
  //         );
  //         return {
  //           image: response.data.secure_url, // Use the image property
  //           bottomHeading: images[index].bottomHeading, // Preserve other properties
  //           mainHeading: images[index].mainHeading,
  //           topHeading: images[index].topHeading,
  //         };
  //       } else {
  //         return {
  //           image: images[index].image, // Use the image property
  //           bottomHeading: images[index].bottomHeading, // Preserve other properties
  //           mainHeading: images[index].mainHeading,
  //           topHeading: images[index].topHeading,
  //         };
  //       }
  //     })
  //   );
  //   try {
  //     const updatedTopLeftCarosel: any = await updateCustomization({
  //       id: "64d9fb77f3a7ce9915b44b6f",
  //       payload: { heroLeftSlider: imagesAndDataUpload },
  //     });

  //     if (updatedTopLeftCarosel.data.success) {
  //       // Show a success toast message here
  //       toast.success("Top Left Carosel Updated Successfully!", {
  //         duration: 3000,
  //       });
  //     }
  //   } catch (error) {
  //     toast.error("Error occured! Please fill all the field correctly.", {
  //       duration: 3000,
  //     });
  //     console.error(error);
  //   }
  // };

  const handleUpdateOnClick = async (event: any) => {
    Swal.fire({
      title: "Are you sure you want to update?",
      icon: "success",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Update it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const updatedCaroselCustomization: any = await updateCustomization({
            id: "64d9fb77f3a7ce9915b44b6f",
            payload: {
              homeCarosel: formData,
            },
          });

          if (updatedCaroselCustomization.data.success) {
            toast.success("Carosel Updated Successfully!", {
              duration: 3000,
            });
          } else {
            toast.error("something went wrong. try again. ");
          }
        } catch (error) {
          toast.error("Error occurred! Please fill all the fields correctly.", {
            duration: 3000,
          });
          console.error(error);
        }
      }
    });
  };

  const handleUploadImage = async (e: any, index: number, imageUrl: string) => {
    await cloudinaryImageDeleteWithUrl(imageUrl);
    const { secureUrl } = await cloudinaryImageUpload(e.target.files?.[0]);
    const caroselData = [...formData];
    caroselData[index].imageUrl = secureUrl;
    setFormData(caroselData);
  };

  return (
    <div className="mt-4">
      <div className="p-4 bg-white rounded-xl mb-4">
        <div className="mb-4 text-red-500 text-xs font-medium">
          <p className="mb-1">
            * When choose any image it will automatically upload in the server
            and destroy previous image
          </p>
          <p className="">
            {`* So after changing any image if you don't update the carosel data
            then the previous image will not found.`}
          </p>
          <p className="mt-1">{`* Recommended image size: ( 1903 x 762 )`}</p>
        </div>
        {!isLoading &&
          formData.map((data, index) => (
            <div key={index} className="rounded-xl flex flex-col gap-2 mb-4">
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
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Link
                  </label>
                  <input
                    type="text"
                    value={data.link}
                    onChange={(e) => {
                      const caroselData = [...formData];
                      caroselData[index].link = e.target.value;
                      setFormData(caroselData);
                    }}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Write Link"
                    required
                  />
                </div>
                {/* image  */}
                <div className="">
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Image
                  </label>
                  {data.imageUrl && (
                    <Image
                      alt="carosel image"
                      src={data.imageUrl}
                      width={380}
                      height={180}
                      className="mb-1"
                    />
                  )}
                  <input
                    type="file"
                    onChange={(e) => handleUploadImage(e, index, data.imageUrl)}
                  />
                </div>
              </div>
            </div>
          ))}
        {/* <PrimaryButton type="submit" label="Update" /> */}
        <div className="flex justify-end items-center gap-2">
          <small className="text-red-500">
            *After removing any field please hit the update button to update the
            carosel
          </small>
          <button
            onClick={handleUpdateOnClick}
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
      </div>
    </div>
  );
};

export default TopLeftCarosel;
