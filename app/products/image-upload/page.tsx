"use client";
import Editor from "@/components/Editor";
import PrimaryButton from "@/components/PrimaryButton";
import SecondaryButton from "@/components/SecondaryButton";
import Image from "next/image";
import { SetStateAction, useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import ImageUploading from "react-images-uploading";

interface DivField {
  id: number;
}

const ImageUpload: React.FC = () => {
  const [divFields, setDivFields] = useState<DivField[]>([
    { id: Date.now() }, // Display one content by default
  ]);

  const [images, setImages] = useState([]);
  const maxNumber = 10;

  const onChangeHandle = (e: any) => {
    // data for submit
    console.log(
      "e",
      e.map((item: any) => item.data_url)
    );
    setImages(e.map((item: any) => item.data_url));
  };

  const addDivField = () => {
    const newDivField: DivField = {
      id: Date.now(), // Generate a unique ID for each div field
    };
    setDivFields((prevFields) => [...prevFields, newDivField]);
  };

  const removeDivField = (id: number) => {
    setDivFields((prevFields) => prevFields.filter((field) => field.id !== id));
  };

  const [product, setProduct] = useState({
    productName: "",
    regularPrice: 0,
    salePrice: 0,
    variant: [],
    size: [],
    description: "",
    category: "",
    subCategory: "",
    promotion: "",
    imageUrl: [],
    status: "",
  });

  return (
    <div className="container">
      <h1 className="text-2xl font-bold mb-3">Add Image</h1>
      <div className="flex flex-col gap-y-5">
        <div className="bg-basic rounded-lg px-6 py-3 flex flex-col gap-y-4">
          <h4 className="text-lg font-bold">Product Information</h4>
          <div className="bg-gray-100 py-3 px-5 flex flex-col gap-y-3 rounded-lg max-w-[30%]">
            <div>
              <label className="font-medium" htmlFor="name">
                Product Name
              </label>
              <input
                className="block w-full rounded-lg p-2 border border-gray-400 focus:outline-none text-gray-500 mt-1"
                id="name"
                type="text"
                placeholder="Enter product name."
                onChange={(event) => {}}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
