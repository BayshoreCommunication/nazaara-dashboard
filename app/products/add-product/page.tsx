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

const AddProduct: React.FC = () => {
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
      <h1 className="text-2xl font-bold mb-3">Add Product</h1>
      <div className="flex flex-col gap-y-5">
        <div className="bg-basic rounded-lg px-6 py-3 flex flex-col gap-y-4">
          <h4 className="text-lg font-bold">Product Information</h4>
          <div className="grid grid-cols-3 gap-4 items-start">
            {/* start  */}
            <div className="bg-gray-100 py-3 px-5 flex flex-col gap-y-3 rounded-lg">
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
              <div>
                <label className="font-medium" htmlFor="category">
                  Product Category
                </label>
                <div className="relative">
                  <input
                    className="block rounded-lg w-full p-2 border border-gray-400 focus:outline-none text-gray-500 mt-1"
                    id="category"
                    type="text"
                    placeholder="Choose category."
                  />
                  <BiSearchAlt2
                    color="gray"
                    size={18}
                    className="absolute top-[50%] right-2 -translate-y-1/2"
                  />
                </div>
              </div>
              <div>
                <label className="font-medium" htmlFor="Subcategory">
                  Product Subcategory
                </label>
                <div className="relative">
                  <input
                    className="block rounded-lg w-full p-2 border border-gray-400 focus:outline-none text-gray-500 mt-1"
                    id="subcategory"
                    type="text"
                    placeholder="Choose subcategory."
                  />
                  <BiSearchAlt2
                    color="gray"
                    size={18}
                    className="absolute top-[50%] right-2 -translate-y-1/2"
                  />
                </div>
              </div>
              <div>
                <label className="font-medium" htmlFor="Promotion">
                  Promotion
                </label>
                <div className="relative">
                  <input
                    className="block rounded-lg w-full p-2 border border-gray-400 focus:outline-none text-gray-500 mt-1"
                    id="Promotion"
                    type="text"
                    placeholder="Choose promotion."
                  />
                  <BiSearchAlt2
                    color="gray"
                    size={18}
                    className="absolute top-[50%] right-2 -translate-y-1/2"
                  />
                </div>
              </div>
            </div>
            {/* middle */}
            <div className="bg-gray-100 py-3 px-5 flex flex-col gap-y-3 rounded-lg">
              <div>
                <label className="font-medium" htmlFor="Warehouse">
                  Warehouse
                </label>
                <div className="relative">
                  <input
                    className="block rounded-lg w-full p-2 border border-gray-400 focus:outline-none text-gray-500 mt-1"
                    id="Warehouse"
                    type="text"
                    placeholder="Choose warehouse."
                  />
                  <BiSearchAlt2
                    color="gray"
                    size={18}
                    className="absolute top-[50%] right-2 -translate-y-1/2"
                  />
                </div>
              </div>
              <div>
                <label className="font-medium" htmlFor="selling_price">
                  Regular Price
                </label>
                <div className="flex items-center mt-1">
                  <div className="border border-gray-400 bg-gray-100 rounded-sm p-[10px] text-sm text-gray-500 font-medium">
                    BDT
                  </div>
                  <input
                    className="rounded-e-lg p-2 border border-gray-400 focus:outline-none text-gray-500 w-full"
                    id="selling_price"
                    type="number"
                    min={0}
                    placeholder="Enter regular Price"
                  />
                </div>
              </div>
              <div>
                <label className="font-medium" htmlFor="selling_price">
                  Selling Price
                </label>
                <div className="flex items-center mt-1">
                  <div className="border border-gray-400 bg-gray-100 rounded-sm p-[10px] text-sm text-gray-500 font-medium">
                    BDT
                  </div>
                  <input
                    className="rounded-e-lg p-2 border border-gray-400 focus:outline-none text-gray-500 w-full"
                    id="selling_price"
                    type="number"
                    min={0}
                    placeholder="Enter selling Price"
                  />
                </div>
              </div>
              <div>
                <label className="font-medium" htmlFor="status">
                  Status
                </label>
                <div className="flex items-center mt-1">
                  <select
                    className="w-full border border-gray-400 rounded-sm p-2 focus:outline-none text-gray-500"
                    // ref={statusRef}
                    required
                    // value={selectedValue}
                    // onChange={(e) => setSelectedValue(e.target.value)}
                  >
                    <option value="publish">Publish</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>
            </div>
            {/* end  */}
            <div className="bg-gray-100 rounded-lg py-3 px-5">
              <h1 className="font-semibold mb-2">Product Details</h1>
              <div className="text-gray-500 ">
                {divFields.map((field) => (
                  <div className="flex gap-2 items-center" key={field.id}>
                    <div className="flex flex-col gap-4 mb-2 bg-slate-200 w-full p-3 rounded-lg">
                      <div className="w-full flex gap-2 items-center">
                        <label className="font-medium">*color</label>
                        <div className="relative flex-1">
                          <input
                            className="block rounded-lg w-full p-2 border border-gray-400 focus:outline-none text-gray-500"
                            id="Warehouse"
                            type="text"
                            placeholder="Input Here"
                          />
                          <BiSearchAlt2
                            color="gray"
                            size={18}
                            className="absolute top-[50%] right-2 -translate-y-1/2"
                          />
                        </div>
                      </div>
                      <div className="w-full flex gap-2 items-center">
                        <label className="font-medium mb-2">*Stock</label>
                        <div className="relative flex-1">
                          <input
                            className="block rounded-lg w-full p-2 border border-gray-400 focus:outline-none text-gray-500"
                            id="Warehouse"
                            type="number"
                            min={0}
                            step={1}
                            placeholder="Input Here"
                          />
                        </div>
                      </div>
                    </div>
                    {divFields.length > 1 && (
                      <div className="w-5 mb-2">
                        <button
                          onClick={() => removeDivField(field.id)}
                          disabled={divFields.length === 1} // Disable "-" button when there is only one content
                          className="w-5 h-5 rounded-full border border-gray-400 flex justify-center items-center"
                        >
                          -
                        </button>
                      </div>
                    )}
                  </div>
                ))}
                <button
                  onClick={addDivField}
                  className="py-1 w-full border border-dashed border-sky-400 text-sky-400"
                >
                  + Add Field
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-basic rounded-lg px-6 py-3 flex flex-col gap-y-4">
          <h4 className="text-lg font-bold">Product Image</h4>
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
              <div className="upload__image-wrapper">
                <button
                  style={isDragging ? { color: "red" } : undefined}
                  onClick={onImageUpload}
                  {...dragProps}
                >
                  Click or Drop here
                </button>
                &nbsp;
                <button onClick={onImageRemoveAll}>Remove all images</button>
                {imageList.map((image, index) => (
                  <div key={index} className="image-item">
                    <img
                      src={image["data_url"]}
                      alt=""
                      width={100}
                      height={100}
                    />
                    <div className="image-item__btn-wrapper">
                      <button onClick={() => onImageUpdate(index)}>
                        Update
                      </button>
                      <button onClick={() => onImageRemove(index)}>
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ImageUploading>
        </div>

        <div className="bg-basic rounded-lg px-6 py-3 flex flex-col gap-y-4">
          <h4 className="text-lg font-bold">Product Description</h4>
          <Editor />
        </div>
        <div className="flex justify-end gap-x-3">
          <PrimaryButton name="Add" />
          <SecondaryButton name="Cancel" />
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
