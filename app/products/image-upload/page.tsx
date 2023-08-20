"use client";
import { FC, useState, FormEvent } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from "@/services/productApi";
import ImageUploading from "react-images-uploading";
import { SlCloudUpload } from "react-icons/sl";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import Image from "next/image";
import toast from "react-hot-toast";
import Loader from "@/components/loader";
import { TImageUrl, TProduct } from "@/types/types";
import axios from "axios";

const ImageUpload: FC = () => {
  const [variant, setVariant] = useState([
    {
      imageUrl: [],
    },
  ]);
  const routerSearch = useSearchParams();
  const router = useRouter();
  const maxNumber = 10;

  const productId: any = routerSearch.get("id");
  if (productId === "" || productId === null) {
    router.back();
  }

  const { data: product, isLoading: productIsLoading } =
    useGetProductByIdQuery(productId);

  // update image
  const [updateProduct] = useUpdateProductMutation();
  // const handleUpdateCategorySubmit = async (event: FormEvent) => {
  //   event.preventDefault();
  // };

  const onChangeHandle = (imageList: any, variantIndex: number) => {
    // data for submit
    const updateImageUrl = imageList.map((elem: any) => elem);

    setVariant((prevVariants) => {
      // Create a new array to avoid mutating the previous state directly
      const newVariants = [...prevVariants];

      // Update the specific variant at the given index with the new image URLs
      newVariants[variantIndex] = {
        ...newVariants[variantIndex],
        imageUrl: updateImageUrl,
      };
      return newVariants;
    });
  };

  const handleUpdateOnClick = async (event: any) => {
    event.preventDefault();
    const postOnCloudinary = variant?.map((elem) =>
      elem.imageUrl.map((el: TImageUrl) => el)
    );

    const updatedVariants: any = await Promise.all(
      postOnCloudinary.map(async (elem: any, variantIndex: number) => {
        const getResponseUrl = await Promise.all(
          elem.map(async (imageFile: any) => {
            const formData = new FormData();
            formData.append("file", imageFile.file);
            formData.append(
              "upload_preset",
              process.env.UPLOAD_PRESET as string
            );
            const response = await axios.post(
              process.env.API_BASE_URL as string,
              formData
            );
            return response.data.secure_url;
          })
        );
        return {
          color: product?.data.variant[variantIndex].color, // Associate the color with the variant
          imageUrl: getResponseUrl.map((el: any) => el),
        };
      })
    );

    try {
      const mutationData: any = await updateProduct({
        id: productId,
        payload: { variant: updatedVariants },
      });
      if (mutationData.data.status === "success") {
        toast.success("Image updated successfully.", { duration: 3000 });
        router.push("/products");
      } else {
        toast.error("Something went wrong!", { duration: 3000 });
      }
    } catch (err) {
      console.error(err);
      toast.error("Upload failed!", { duration: 3000 });
    }
  };

  return productIsLoading ? (
    <Loader height="h-[85vh]" />
  ) : (
    <div className="container">
      <h1 className="text-2xl font-bold mb-3">Add Image</h1>
      <div className="flex flex-col gap-y-5">
        {product?.data.variant.map((elem: any, variantIndex: number) => (
          <div
            key={variantIndex}
            className="bg-basic rounded-lg px-6 py-3 flex flex-col gap-y-4"
          >
            <h4 className="text-lg font-bold">{elem.color}</h4>
            <ImageUploading
              multiple
              value={variant[variantIndex]?.imageUrl || []}
              onChange={(e) => onChangeHandle(e, variantIndex)}
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
        ))}
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
    </div>
  );
};

export default ImageUpload;
