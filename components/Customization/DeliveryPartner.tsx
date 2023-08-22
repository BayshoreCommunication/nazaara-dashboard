import {
  useGetCustomizationByIdQuery,
  useUpdateCustomizationMutation,
} from "@/services/customizationApi";
import { ICustomization, IData } from "@/types/uiCustomization";
import axios from "axios";
import { url } from "inspector";
import Image from "next/image";
import React, { MouseEvent, useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { SlCloudUpload } from "react-icons/sl";
import ImageUploading from "react-images-uploading";

const DeliveryPartner = () => {
  const { data: image, isLoading } = useGetCustomizationByIdQuery(
    "64d9fb77f3a7ce9915b44b6f"
  );

  const [updateCustomization] = useUpdateCustomizationMutation();

  const imageUrl = image?.data.deliveryPartnerImages;

  const [images, setImages] = useState<{ data_url: string }[]>([]);
  const maxNumber = 20;

  // useMemo

  const onChangeHandle = (imageList: any) => {
    // data for submit
    // console.log("first", imageList);
    // console.log("first2", images);
    setImages(imageList);
  };

  useEffect(() => {
    if (imageUrl) {
      const updateImageState = imageUrl.map((url: string) => ({
        data_url: url, // Returning an object with the correct property name
      }));
      setImages(updateImageState);
    }
  }, [imageUrl]);

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

    try {
      const updatedDeliveryPartner: any = await updateCustomization({
        id: "64d9fb77f3a7ce9915b44b6f",
        payload: { deliveryPartnerImages: imagesUpload },
      });
      if (updatedDeliveryPartner) {
        // Show a success toast message here
        toast.success("Delivery updated successfully!", { duration: 3000 });
      }
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  const handleImageUpdate = (index: number, updatedImage: any) => {
    const updatedImages = [...images];
    updatedImages[index] = updatedImage;
    setImages(updatedImages);
  };

  const handleImageRemove = (index: number) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  return (
    <div className="mt-4">
      {!isLoading && (
        <div className="flex flex-col gap-y-5">
          <div className="bg-basic rounded-lg px-6 py-3 flex flex-col gap-y-4">
            <ImageUploading
              multiple
              value={images || []}
              onChange={onChangeHandle}
              maxNumber={maxNumber}
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
                // write your building UI
                <div className="upload__image-wrapper flex gap-5">
                  <div className="pr-10 border-r-[1px] border-gray-300">
                    <button
                      style={isDragging ? { color: "red" } : undefined}
                      onClick={onImageUpload}
                      {...dragProps}
                      className="upload-image-background"
                    >
                      +
                    </button>
                    <br />
                    <button
                      onClick={onImageRemoveAll}
                      className="w-[100px] py-1 mt-2 bg-secondary text-white font-normal rounded-md"
                    >
                      Remove All
                    </button>
                  </div>
                  {imageList.map((image: any, index: any) => (
                    <div key={index} className="image-item">
                      <Image
                        src={image["data_url"]}
                        alt="product_image"
                        width={100}
                        height={100}
                      />
                      <div className="mt-1 flex justify-end gap-2">
                        <button onClick={() => onImageUpdate(index)}>
                          <SlCloudUpload size={20} />
                        </button>
                        <button onClick={() => onImageRemove(index)}>
                          <IoIosRemoveCircleOutline size={20} />
                        </button>
                      </div>
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
              Update Product Image
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeliveryPartner;
