"use client";
import { useState } from "react";
import ImageUploading from "react-images-uploading";
import { SlCloudUpload } from "react-icons/sl";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import Image from "next/image";

const ImageUpload: React.FC = () => {
  const [images, setImages] = useState([]);
  const maxNumber = 10;

  const onChangeHandle = (imageList: any, addUpdateIndex: any) => {
    // data for submit
    setImages(imageList);
  };

  return (
    <div className="container">
      <h1 className="text-2xl font-bold mb-3">Add Image</h1>
      <div className="flex flex-col gap-y-5">
        <div className="bg-basic rounded-lg px-6 py-3 flex flex-col gap-y-4">
          <h4 className="text-lg font-bold">Cover Photo</h4>
          <ImageUploading
            multiple
            value={images}
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
                      alt="_image"
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
      </div>
    </div>
  );
};

export default ImageUpload;
