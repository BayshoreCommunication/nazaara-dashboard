"use client";
import Editor from "@/components/Editor";
import PrimaryButton from "@/components/PrimaryButton";
import SecondaryButton from "@/components/SecondaryButton";
import { ChangeEvent, useCallback, useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import { useCreateProductMutation } from "@/services/productApi";
import Select from "react-select";

//id to handle multiple variant
interface DivField {
  id: number;
}

//form Data type for creating new product
interface IFormData {
  _id?: string;
  productName: string;
  regularPrice: number;
  salePrice: number;
  size: string[];
  variant: [IVariant];
  description: string;
  category: string;
  subCategory: string;
  promotion: string;
  warehouse: string;
  status: string;
}

interface IVariant {
  color: string;
  stock: number;
}

const options = [
  { value: "XS", label: "XS" },
  { value: "S", label: "S" },
  { value: "M", label: "M" },
  { value: "L", label: "L" },
  { value: "XL", label: "XL" },
  { value: "XXL", label: "XXL" },
];

const AddProduct: React.FC = () => {
  const [divFields, setDivFields] = useState<DivField[]>([
    { id: Date.now() }, // Display one content by default
  ]);

  let selectedOption;
  const addDivField = () => {
    const newDivField: DivField = {
      id: Date.now(), // Generate a unique ID for each div field
    };
    setDivFields((prevFields) => [...prevFields, newDivField]);
  };

  const removeDivField = (id: number) => {
    setDivFields((prevFields) => prevFields.filter((field) => field.id !== id));
  };

  const [createProduct] = useCreateProductMutation();

  //crate category start
  const [formData, setFormData] = useState<IFormData>({
    productName: "",
    regularPrice: 0,
    salePrice: 0,
    size: [],
    variant: [
      {
        color: "",
        stock: 0,
      },
    ],
    description: "",
    category: "",
    subCategory: "",
    promotion: "",
    warehouse: "",
    status: "",
  });

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  const handleSelectionChange = (option: any | null) => {
    if (option) {
      setFormData({
        ...formData,
        ["size"]: option.map((elem: any) => elem.value),
      });
    }
  };

  const handleVariant = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    index: number
  ) => {
    const { name, value } = event.target;
    const updatedVariants = [...formData.variant]; // Create a copy of the variant array
    const updatedVariant = {
      ...updatedVariants[index], // Get the variant object at the specified index
      [name]: value, // Update the specific field of the variant object
    };
    updatedVariants[index] = updatedVariant; // Update the variant object in the array

    setFormData((formData: any) => ({
      ...formData,
      variant: updatedVariants, // Update the variant array in the formData
    }));
  };

  return (
    <div className="container">
      <h1 className="text-2xl font-bold mb-3">Add Product</h1>
      <div className="flex flex-col gap-y-5">
        <div className="bg-basic rounded-lg px-6 py-3 flex flex-col gap-y-4">
          <h4 className="text-lg font-bold">Product Information</h4>
          <div className="flex gap-4 items-start">
            <div className="flex-[2] bg-gray-100 py-3 px-5 flex flex-col gap-y-3 rounded-lg">
              <div>
                <label className="font-medium" htmlFor="name">
                  Product Name
                </label>
                <input
                  className="block w-full rounded-lg p-2 border border-gray-400 focus:outline-none text-gray-500 mt-1"
                  name="productName"
                  type="text"
                  placeholder="Enter product name."
                  onChange={(event) => {
                    handleChange(event);
                  }}
                />
              </div>
              <div className="grid grid-cols-2 gap-4 items-start">
                <div className="bg-gray-100 py-3 flex flex-col gap-y-3 rounded-lg">
                  <div>
                    <label className="font-medium" htmlFor="category">
                      Product Category
                    </label>
                    <div className="relative">
                      <input
                        className="block rounded-lg w-full p-2 border border-gray-400 focus:outline-none text-gray-500 mt-1"
                        name="category"
                        type="text"
                        placeholder="Choose category."
                        onChange={(event) => {
                          handleChange(event);
                        }}
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
                        name="subcategory"
                        type="text"
                        placeholder="Choose subcategory."
                        onChange={(event) => {
                          handleChange(event);
                        }}
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
                        name="promotion"
                        type="text"
                        placeholder="Choose promotion."
                        onChange={(event) => {
                          handleChange(event);
                        }}
                      />
                      <BiSearchAlt2
                        color="gray"
                        size={18}
                        className="absolute top-[50%] right-2 -translate-y-1/2"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="font-medium" htmlFor="size">
                      Size
                    </label>
                    <Select
                      defaultValue={selectedOption}
                      onChange={handleSelectionChange}
                      placeholder="Choose One"
                      theme={(theme) => ({
                        ...theme,
                        borderRadius: 3,
                        colors: {
                          ...theme.colors,
                          primary25: "#e6e6e6",
                          primary: "rgb(156 163 175/1)",
                        },
                      })}
                      options={options}
                      isMulti={true}
                    />
                  </div>
                </div>
                <div className="bg-gray-100 py-3 flex flex-col gap-y-3 rounded-lg">
                  <div>
                    <label className="font-medium" htmlFor="Warehouse">
                      Warehouse
                    </label>
                    <div className="relative">
                      <input
                        className="block rounded-lg w-full p-2 border border-gray-400 focus:outline-none text-gray-500 mt-1"
                        name="warehouse"
                        type="text"
                        placeholder="Choose warehouse."
                        onChange={(event) => {
                          handleChange(event);
                        }}
                      />
                      <BiSearchAlt2
                        color="gray"
                        size={18}
                        className="absolute top-[50%] right-2 -translate-y-1/2"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="font-medium" htmlFor="regular_price">
                      Regular Price
                    </label>
                    <div className="flex items-center mt-1">
                      <div className="border border-gray-400 bg-gray-100 rounded-sm p-[10px] text-sm text-gray-500 font-medium">
                        BDT
                      </div>
                      <input
                        className="rounded-e-lg p-2 border border-gray-400 focus:outline-none text-gray-500 w-full"
                        name="regularPrice"
                        type="number"
                        min={0}
                        placeholder="Enter regular Price"
                        onChange={(event) => {
                          handleChange(event);
                        }}
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
                        name="salePrice"
                        type="number"
                        min={0}
                        placeholder="Enter selling Price"
                        onChange={(event) => {
                          handleChange(event);
                        }}
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
                        name="status"
                        onChange={(event) => {
                          handleChange(event);
                        }}
                      >
                        <option value="" disabled>
                          Choose one
                        </option>
                        <option value="publish">Publish</option>
                        <option value="draft">Draft</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1 bg-gray-100 rounded-lg py-3 px-5">
              <h1 className="font-semibold mb-2">Product Details</h1>
              <div className="text-gray-500 ">
                {divFields.map((field, index) => (
                  <div className="flex gap-2 items-center" key={index}>
                    <div className="flex gap-4 mb-2 bg-slate-200 w-full p-3 rounded-lg">
                      <div className="w-full flex items-center mt-1">
                        <div className="border border-gray-400 bg-gray-100 rounded-sm p-[10px] text-sm text-gray-500 font-medium">
                          Color
                        </div>
                        <input
                          className="rounded-e-lg p-2 border border-gray-400 focus:outline-none text-gray-500 w-full"
                          name="color"
                          type="text"
                          placeholder="Red*"
                          onChange={(event) => handleVariant(event, index)}
                        />
                      </div>
                      <div className="w-full flex items-center mt-1">
                        <div className="border border-gray-400 bg-gray-100 rounded-sm p-[10px] text-sm text-gray-500 font-medium">
                          Stock
                        </div>
                        <input
                          className="rounded-e-lg p-2 border border-gray-400 focus:outline-none text-gray-500 w-full"
                          name="stock"
                          type="number"
                          min={0}
                          step={1}
                          placeholder="1"
                          onChange={(event) => handleVariant(event, index)}
                        />
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
          <h4 className="text-lg font-bold">Product Description</h4>
          <Editor setFormData={setFormData} formData={formData} />
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
