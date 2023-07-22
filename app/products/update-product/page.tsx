"use client";
import Editor from "@/components/Editor";
import { FC, ChangeEvent, useState, FormEvent } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useCreateProductMutation } from "@/services/productApi";
import { useGetCategoriesQuery } from "@/services/categoryApi";
import { useGetSubCategoriesQuery } from "@/services/subcategory";
import { useGetPromotionsQuery } from "@/services/promotionApi";
import { useGetwarehousesQuery } from "@/services/warehouseApi";
import dynamic from "next/dynamic";
const Select = dynamic(() => import("react-select"), {
  ssr: false,
});

const customStyles = {
  control: (provided: any) => ({
    ...provided,
    "& input": {
      height: "auto",
    },
  }),
};

//id to handle multiple variant

//form Data type for creating new product
interface IFormData {
  productName: string;
  regularPrice: number;
  salePrice: number;
  size: string[];
  variant: [IVariant];
  description: string;
  category: string;
  subCategory: string;
  promotion: string;
  status: string;
}

interface IVariant {
  color: string;
  imageUrl: string[];
  warehouse: [IWarehouse];
}
interface IWarehouse {
  warehouseName: string;
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

const UpdateProduct: FC = () => {
  let selectedOption;
  const router = useRouter();

  const { data: categoriesData, isLoading: categoriesLoading } =
    useGetCategoriesQuery();
  const { data: subCategoriesData, isLoading: subCategoriesLoading } =
    useGetSubCategoriesQuery();
  const { data: promotionsData, isLoading: promotionsLoading } =
    useGetPromotionsQuery();
  const { data: warehousesData, isLoading: warehousesLoading } =
    useGetwarehousesQuery();

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
        imageUrl: [],
        warehouse: [
          {
            warehouseName: "",
            stock: 0,
          },
        ],
      },
    ],
    description: "",
    category: "",
    subCategory: "",
    promotion: "",
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

  const handleWarehouse = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    variantIndex: number,
    warehouseIndex: number
  ) => {
    const { name, value } = event.target;
    const updatedVariants = [...formData.variant];
    const variant = updatedVariants[variantIndex];
    const updatedWarehouse = {
      ...variant.warehouse[warehouseIndex],
      [name]: value,
    };
    variant.warehouse[warehouseIndex] = updatedWarehouse;
    updatedVariants[variantIndex] = variant;

    setFormData((prevFormData: any) => ({
      ...prevFormData,
      variant: updatedVariants,
    }));
  };

  const addDivField = () => {
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      variant: [
        ...prevFormData.variant,
        {
          color: "",
          imageUrl: [],
          warehouse: [
            {
              warehouseName: "",
              stock: 0,
            },
          ],
        },
      ],
    }));
  };

  const removeDivField = (index: number) => {
    setFormData((prevFormData: any) => {
      const updatedVariants = prevFormData.variant.filter(
        (_: any, i: number) => i !== index
      );
      return {
        ...prevFormData,
        variant: updatedVariants,
      };
    });
  };

  const addDivField2 = (variantIndex: number) => {
    setFormData((prevFormData: any) => {
      const updatedVariants = [...prevFormData.variant];
      const variant = updatedVariants[variantIndex];
      variant.warehouse.push({
        warehouseName: "",
        stock: 0,
      });
      updatedVariants[variantIndex] = variant;

      return {
        ...prevFormData,
        variant: updatedVariants,
      };
    });
  };

  const removeDivField2 = (variantIndex: number, warehouseIndex: number) => {
    setFormData((prevFormData: any) => {
      const updatedVariants = [...prevFormData.variant];
      const variant = updatedVariants[variantIndex];
      variant.warehouse = variant.warehouse.filter(
        (_: any, i: number) => i !== warehouseIndex
      );
      updatedVariants[variantIndex] = variant;

      return {
        ...prevFormData,
        variant: updatedVariants,
      };
    });
  };

  // const handleClear = () => {
  //   setFormData({
  //     productName: "",
  //     regularPrice: 0,
  //     salePrice: 0,
  //     size: [],
  //     variant: [
  //       {
  //         color: "",
  //         imageUrl: [],
  //         warehouse: [
  //           {
  //             warehouseName: "",
  //             stock: 0,
  //           },
  //         ],
  //       },
  //     ],
  //     description: "",
  //     category: "",
  //     subCategory: "",
  //     promotion: "",
  //     status: "",
  //   });
  // };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    // Perform any form validation or data processing here
    const data: any = await createProduct(formData);
    // refetch();
    if (data.data.status === "success") {
      router.push("/products");
      toast.success("New Product Created", { duration: 3000 });
      // Reset form fields
      setFormData({
        productName: "",
        regularPrice: 0,
        salePrice: 0,
        size: [],
        variant: [
          {
            color: "",
            imageUrl: [],
            warehouse: [
              {
                warehouseName: "",
                stock: 0,
              },
            ],
          },
        ],
        description: "",
        category: "",
        subCategory: "",
        promotion: "",
        status: "",
      });
    } else {
      toast.error("Something went wrong!", { duration: 3000 });
    }
  };
  return (
    <div className="container">
      <h1 className="text-2xl font-bold mb-3">Add Product</h1>
      <div className="flex flex-col gap-y-5">
        <form onSubmit={handleSubmit}>
          <div className="bg-basic rounded-lg px-6 py-3 flex flex-col gap-y-4">
            <h4 className="text-lg font-bold">Product Information</h4>
            <div className="flex flex-col gap-4 items-start">
              <div className="w-full bg-gray-100 py-3 px-5 flex flex-col gap-y-3 rounded-lg">
                <div className="grid grid-cols-2 gap-4 items-start">
                  <div className="bg-gray-100 py-3 flex flex-col gap-y-3 rounded-lg">
                    <div>
                      <label className="font-medium" htmlFor="name">
                        Product Name
                      </label>
                      <input
                        className="block w-full rounded-lg p-2 border border-gray-400 focus:outline-none text-gray-500 mt-1"
                        value={formData.productName}
                        name="productName"
                        type="text"
                        placeholder="Enter product name."
                        onChange={(event) => {
                          handleChange(event);
                        }}
                      />
                    </div>
                    <div>
                      <label className="font-medium" htmlFor="category">
                        Category
                      </label>
                      <div className="flex items-center mt-1">
                        <select
                          className="w-full border border-gray-400 rounded-sm p-2 focus:outline-none text-gray-500"
                          name="category"
                          onChange={(event) => {
                            handleChange(event);
                          }}
                        >
                          <option value="">Choose one</option>
                          {categoriesData?.data.map(
                            (elem, index) =>
                              elem.status === "publish" && (
                                <option value={`${elem.name}`} key={index}>
                                  {elem.name}
                                </option>
                              )
                          )}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="font-medium" htmlFor="subCategory">
                        Subcategory
                      </label>
                      <div className="flex items-center mt-1">
                        <select
                          className="w-full border border-gray-400 rounded-sm p-2 focus:outline-none text-gray-500"
                          name="subCategory"
                          onChange={(event) => {
                            handleChange(event);
                          }}
                        >
                          <option value="">Choose one</option>
                          {subCategoriesData?.data.map(
                            (elem, index) =>
                              elem.status === "publish" && (
                                <option value={`${elem.name}`} key={index}>
                                  {elem.name}
                                </option>
                              )
                          )}
                        </select>
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
                        styles={customStyles}
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
                      <label className="font-medium" htmlFor="promotion">
                        Promotion
                      </label>
                      <div className="flex items-center mt-1">
                        <select
                          className="w-full border border-gray-400 rounded-sm p-2 focus:outline-none text-gray-500"
                          name="promotion"
                          onChange={(event) => {
                            handleChange(event);
                          }}
                        >
                          <option value="">Choose one</option>
                          {promotionsData?.data.map(
                            (elem, index) =>
                              elem.status === "publish" && (
                                <option value={`${elem.name}`} key={index}>
                                  {elem.name}
                                </option>
                              )
                          )}
                        </select>
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
                          <option value="">Choose one</option>
                          <option value="publish">Publish</option>
                          <option value="draft">Draft</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full bg-gray-100 rounded-lg py-3 px-5">
                <h1 className="font-semibold mb-2">Stock Distribution</h1>
                <div className="text-gray-500 ">
                  {formData.variant.map((variant, variantIndex) => (
                    <div
                      className="flex  gap-2 items-center border-b-[1px] border-gray-300"
                      key={variantIndex}
                    >
                      <div className="flex flex-wrap gap-4 mb-2 w-full rounded-lg">
                        <div className="w-[20%] flex items-center mt-2">
                          <div className="border border-gray-400 bg-gray-100 rounded-sm p-[10px] text-sm text-gray-500 font-medium">
                            Color
                          </div>
                          <input
                            className="rounded-e-lg p-2 border border-gray-400 focus:outline-none text-gray-500 w-full"
                            name="color"
                            type="text"
                            placeholder="Enter color"
                            onChange={(event) =>
                              handleVariant(event, variantIndex)
                            }
                          />
                        </div>
                        {variant.warehouse.map((warehouse, warehouseIndex) => (
                          <div
                            key={warehouseIndex}
                            className="flex w-1/4 gap-1"
                          >
                            <div className="flex mt-2">
                              <select
                                className="p-2 border border-gray-400 focus:outline-none text-gray-500 max-w-[140px]"
                                name="warehouseName"
                                onChange={(event) =>
                                  handleWarehouse(
                                    event,
                                    variantIndex,
                                    warehouseIndex
                                  )
                                }
                              >
                                <option value="">Choose one</option>
                                {warehousesData?.data.map(
                                  (elem, index) =>
                                    elem.status === "publish" && (
                                      <option
                                        value={`${elem.name}`}
                                        key={index}
                                      >
                                        {elem.name}
                                      </option>
                                    )
                                )}
                              </select>
                              <input
                                className="rounded-e-lg p-2 border border-gray-400 focus:outline-none text-gray-500 w-full"
                                name="stock"
                                type="number"
                                min={0}
                                step={1}
                                onChange={(event) =>
                                  handleWarehouse(
                                    event,
                                    variantIndex,
                                    warehouseIndex
                                  )
                                }
                                placeholder="Enter stock"
                              />
                            </div>
                            <div className="grid place-items-end">
                              {warehouseIndex ===
                                variant.warehouse.length - 1 && (
                                <>
                                  <button
                                    onClick={() => addDivField2(variantIndex)}
                                    className="w-5 h-5 rounded-full border border-gray-400 hover:bg-green-300 flex justify-center items-center hover:text-white hover:border-none focus:animate-ping"
                                  >
                                    +
                                  </button>
                                  {warehouseIndex != 0 ? (
                                    <button
                                      onClick={() =>
                                        removeDivField2(
                                          variantIndex,
                                          warehouseIndex
                                        )
                                      }
                                      className="w-5 h-5 rounded-full border border-gray-400 flex hover:bg-secondary justify-center items-center hover:text-white hover:border-none focus:animate-ping"
                                    >
                                      -
                                    </button>
                                  ) : (
                                    <button className="w-5 h-5 flex"></button>
                                  )}
                                </>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                      {variantIndex !== 0 ? (
                        <div className="w-5 mb-2">
                          <button
                            onClick={() => removeDivField(variantIndex)}
                            className="w-5 h-5 rounded-full border border-sky-400 text-sky-400 flex justify-center items-center"
                          >
                            -
                          </button>
                        </div>
                      ) : (
                        <div className="w-5 mb-2">
                          <button className="w-5 h-5" />
                        </div>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addDivField}
                    className="py-1 w-full border border-dashed border-sky-400 text-sky-400 mt-2"
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
            <button
              className="bg-secondary py-1 px-4 rounded-md text-white mt-3"
              type="submit"
            >
              Update Product
            </button>
            {/* <button
            className="bg-warning py-1 px-4 rounded-md text-white"
            onClick={handleClear}
          >
            Clear All
          </button> */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;
