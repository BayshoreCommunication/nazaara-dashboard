"use client";
import { FC, useState, useEffect } from "react";
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
import Loader from "@/components/Loader";
import { TImageUrl } from "@/types/types";
import axios from "axios";

const ImageUpload: FC = () => {
  const [variant, setVariant] = useState([
    {
      imageUrl: [],
    },
  ]);
  const routerSearch = useSearchParams();
  const router = useRouter();
  const maxNumber = 6;

  const productId: any = routerSearch.get("id");
  if (productId === "" || productId === null) {
    router.back();
  }

  const {
    data: product,
    isLoading: productIsLoading,
    refetch,
  } = useGetProductByIdQuery(productId);

  //update innitial variant state
  useEffect(() => {
    if (product?.data && product.data.variant) {
      const updateVariantState = product.data.variant.map((elem: any) => ({
        imageUrl: elem.imageUrl.map((url: any) => ({
          isFeatured: url.isFeatured,
          image: url.image,
        })),
      }));
      setVariant(updateVariantState);
    }
  }, [product]);

  // console.log("variant state", variant);

  // update image mutation
  const [updateProduct] = useUpdateProductMutation();

  const onChangeHandle = (imageList: any, variantIndex: number) => {
    // console.log("image list", imageList);

    // data for submit
    const updateImageUrl = imageList.map((elem: any) => ({
      isFeatured: elem.isFeatured,
      image: elem.image,
      file: elem.file,
    }));

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

    const hasFeature = variant.some((item) =>
      item.imageUrl.some((image: any) => image.isFeatured)
    );

    if (hasFeature) {
      const postOnCloudinary = variant?.map((elem) =>
        elem.imageUrl.map((el: TImageUrl) => el)
      );

      // console.log("postOnCloudinary", postOnCloudinary);

      const updatedVariants: any = await Promise.all(
        postOnCloudinary.map(async (elem: any, variantIndex: number) => {
          // console.log("elem", elem);
          const getResponseUrl = await Promise.all(
            elem.map(async (imageFile: any) => {
              // console.log("imageFile", imageFile);
              if (imageFile.file) {
                const formData = new FormData();
                formData.append("file", imageFile.file);
                formData.append(
                  "upload_preset",
                  process.env.CLOUDINARY_PRESET_UPLOAD as string
                );
                const response = await axios.post(
                  process.env.CLOUDINARY_URL as string,
                  formData
                );
                return {
                  isFeatured: imageFile.isFeatured || false,
                  image: response.data.secure_url,
                };
              } else {
                return imageFile;
              }
            })
          );

          // console.log("getResponseUrl", getResponseUrl);

          return {
            color: product?.data.variant[variantIndex].color, // Associate the color with the variant
            colorCode: product?.data.variant[variantIndex].colorCode,
            imageUrl: getResponseUrl.map((el: any) => el),
          };
        })
      );

      // console.log("update variants", updatedVariants);

      try {
        const mutationData: any = await updateProduct({
          id: productId,
          payload: { variant: updatedVariants },
        });
        // console.log("mutation data", mutationData);

        refetch();
        if (mutationData?.data?.success) {
          toast.success("Image updated successfully.", { duration: 3000 });
          router.push("/products");
        } else {
          toast.error("Something went wrong! Try again later..", {
            duration: 3000,
          });
        }
      } catch (err) {
        console.error(err);
        toast.error("Upload failed!", { duration: 3000 });
      }
    } else {
      toast.error("please select a feature image to continue..");
    }
  };

  const handleUpdateIsFeature = (variantIndex: number, imageIndex: number) => {
    // Create a copy of the variant state to avoid mutating the state directly
    const updatedVariants = variant.map((v, idx) => {
      // Create a copy of the variant to avoid mutating the state directly
      const updatedVariant = { ...v };

      // Update the isFeatured property of the selected image in the specified variant
      updatedVariant.imageUrl.forEach((image: any, i) => {
        image.isFeatured = idx === variantIndex && i === imageIndex;
      });

      return updatedVariant;
    });

    // Update the state with the modified variants
    setVariant(updatedVariants);
  };

  return productIsLoading ? (
    <Loader height="h-[85vh]" />
  ) : (
    <div className="dynamic-container">
      <h1 className="text-2xl font-bold mb-3">Add Image</h1>
      <div className="flex flex-col gap-y-5">
        <div>
          <div className="text-sm mb-2">
            *Recommended image size: 1280 x 1706 ( Ratio= 3 : 4 )
          </div>
          <span className="text-sm text-red-600 font-semibold">
            *Please select a featured image to be displayed on the website.
          </span>
        </div>
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
              dataURLKey="image"
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
                      {/* <p>{image.isFeatured ? "true" : "false"}</p> */}
                      <input
                        type="radio"
                        name="isFeatured-radio"
                        value="true"
                        required
                        className="radio radio-xs"
                        checked={image.isFeatured}
                        onChange={() =>
                          handleUpdateIsFeature(variantIndex, index)
                        }
                      />
                      <Image
                        src={image.image}
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
          >
            Update Product Image
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
