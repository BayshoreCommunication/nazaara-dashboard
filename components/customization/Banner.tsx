import {
  useGetCustomizationByIdQuery,
  useUpdateCustomizationMutation,
} from "@/services/customizationApi";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { SlCloudUpload } from "react-icons/sl";
import ImageUploading from "react-images-uploading";

const Banner = () => {
  const [images, setImages] = useState<any[]>([]); // Changed the type to array
  const { data, isLoading } = useGetCustomizationByIdQuery(
    "64d9fb77f3a7ce9915b44b6f"
  );
  const [updateCustomization] = useUpdateCustomizationMutation();
  const bannerData = data?.data?.bannerSection;
  const [topHeading, setTopHeading] = useState("");
  const [mainHeading, setMainHeading] = useState("");

  useEffect(() => {
    if (bannerData) {
      setTopHeading(bannerData.topHeading || "");
      setMainHeading(bannerData.mainHeading || "");
      if (bannerData.image) {
        setImages([{ data_url: bannerData.image }]); // Set image as an array
      }
    }
  }, [bannerData]);

  const onChangeHandle = (imageList: any) => {
    setImages(imageList);
  };

  const handleUpdateOnClick = async (event: React.FormEvent) => {
    event.preventDefault();

    const imagesUpload = async () => {
      if (images.length > 0 && images[0].file) {
        const formData = new FormData();
        formData.append("file", images[0].file); // Upload only the first image
        formData.append("upload_preset", process.env.OTHER_PRESET as string);
        const response = await axios.post(
          process.env.CLOUDINARY_URL as string,
          formData
        );
        return response.data.secure_url;
      } else {
        return bannerData?.image;
      }
    };

    try {
      const updatedBannerSection: any = await updateCustomization({
        id: "64d9fb77f3a7ce9915b44b6f",
        payload: {
          bannerSection: {
            image: await imagesUpload(),
            topHeading,
            mainHeading,
          },
        },
      });
      if (updatedBannerSection) {
        // Show a success toast message here
        toast.success("Banner updated successfully!", { duration: 3000 });
      }
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  return (
    <div className="mt-4 flex flex-col gap-3">
      <div>
        <div className="flex justify-between">
          <label
            htmlFor="first_name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Top Heading
          </label>
        </div>
        <input
          type="text"
          id="first_name"
          value={topHeading}
          onChange={(e) => setTopHeading(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Top Heading"
          required
        />
      </div>
      <div>
        <div className="flex justify-between">
          <label
            htmlFor="main-heading"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Main Heading
          </label>
        </div>
        <input
          type="text"
          id="main-heading"
          value={mainHeading}
          onChange={(e) => setMainHeading(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Main Heading"
          required
        />
      </div>
      <div>
        <div className="flex flex-col gap-y-5">
          <div className="bg-basic rounded-lg px-6 py-3 flex flex-col gap-y-4">
            <ImageUploading
              value={images}
              onChange={onChangeHandle}
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
          <div className="flex justify-end">
            <button
              className="bg-secondary py-1 px-4 rounded-md text-white"
              onClick={handleUpdateOnClick}
              type="submit"
            >
              Update Banner
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
