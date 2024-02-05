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
  const bannerData = data?.data?.bannerSection as any;
  const [formData, setFormData] = useState({
    topText: "",
    mainHeading: "",
    btnText: "",
    btnLink: "",
  });

  useEffect(() => {
    if (bannerData) {
      setFormData({
        topText: bannerData.topText,
        mainHeading: bannerData.mainHeading,
        btnText: bannerData.btnText,
        btnLink: bannerData.btnLink,
      });
      if (bannerData.imageUrl) {
        setImages([{ data_url: bannerData.imageUrl }]); // Set image as an array
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
        formData.append(
          "upload_preset",
          process.env.CLOUDINARY_PRESET_UPLOAD as string
        );
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
            imageUrl: await imagesUpload(),
            topText: formData.topText,
            mainHeading: formData.mainHeading,
            btnText: formData.btnText,
            btnLink: formData.btnLink,
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
            htmlFor="sub-heading"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Sub Heading
          </label>
        </div>
        <input
          type="text"
          id="sub-heading"
          value={formData.topText}
          onChange={(e) =>
            setFormData({
              ...formData,
              topText: e.target.value,
            })
          }
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Enter Sub Heading"
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
          value={formData.mainHeading}
          onChange={(e) =>
            setFormData({
              ...formData,
              mainHeading: e.target.value,
            })
          }
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Enter Main Heading"
          required
        />
      </div>
      <div>
        <div className="flex justify-between">
          <label
            htmlFor="btn-text"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Button Text
          </label>
        </div>
        <input
          type="text"
          id="btn-text"
          value={formData.btnText}
          onChange={(e) =>
            setFormData({
              ...formData,
              btnText: e.target.value,
            })
          }
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Enter Button Text"
          required
        />
      </div>
      <div>
        <div className="flex justify-between">
          <label
            htmlFor="button-text"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Button Link
          </label>
        </div>
        <input
          type="text"
          id="button-text"
          value={formData.btnLink}
          onChange={(e) =>
            setFormData({
              ...formData,
              btnLink: e.target.value,
            })
          }
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Button Link"
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
                        width={500}
                        height={300}
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
            <p className="text-sm mb-2">
              Recommended image size: ( 1900 x 582 )
            </p>
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
