"use client";
import Editor from "@/components/Editor";
import { FC, ChangeEvent, useState, FormEvent, useEffect } from "react";
import toast from "react-hot-toast";
import { useSearchParams, useRouter } from "next/navigation";
import {
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from "@/services/productApi";
import dynamic from "next/dynamic";
import { TProduct } from "@/types/types";
import Loader from "@/components/Loader";
import { useGetAllPromotionsQuery } from "@/services/promotionApi";
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

const options = [
  { value: "customizable", label: "Customizable" },
  { value: "34", label: "34" },
  { value: "36", label: "36" },
  { value: "38", label: "38" },
  { value: "40", label: "40" },
  { value: "42", label: "42" },
  { value: "44", label: "44" },
  { value: "46", label: "46" },
  { value: "XS", label: "XS" },
  { value: "S", label: "S" },
  { value: "M", label: "M" },
  { value: "L", label: "L" },
  { value: "XL", label: "XL" },
  { value: "XXL", label: "XXL" },
];

const UpdateProduct: FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const singleProductId: any = searchParams.get("id");
  if (singleProductId === "" || singleProductId === null) {
    router.back();
  }
  const {
    data: productsData,
    isLoading: productsLoading,
    refetch,
  } = useGetProductByIdQuery(singleProductId);

  const [formData, setFormData] = useState<TProduct>({
    erpId: 0,
    sku: "",
    productName: "",
    purchasePrice: 0,
    regularPrice: 0,
    salePrice: 0,
    preOrder: false,
    size: [],
    variant: [
      {
        color: "",
        imageUrl: [],
      },
    ],
    stock: 0,
    description: "",
    category: "",
    subCategory: "",
    erpCategory: "",
    erpSubCategory: "",
    status: "",
  });

  useEffect(() => {
    if (productsData?.data && productsData.data.variant) {
      const updateVariantState = productsData.data;
      setFormData(updateVariantState);
    }
  }, [productsData]);

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

  const addDivField = () => {
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      variant: [
        ...prevFormData.variant,
        {
          color: "",
          imageUrl: [],
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
  //       },
  //     ],
  //     stock: 0,
  //     description: "",
  //     category: "",
  //     subCategory: "",
  //     promotion: "",
  //     status: "",
  //   });
  // };

  const [updateProduct] = useUpdateProductMutation();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const mutationData: any = await updateProduct({
        id: singleProductId,
        payload: formData,
      });
      refetch();
      if (mutationData.data.status === "success") {
        router.push("/products");
        toast.success("Product updated sucessfully.", { duration: 3000 });
        // Reset form fields
        setFormData({
          erpId: 0,
          sku: "",
          productName: "",
          purchasePrice: 0,
          regularPrice: 0,
          salePrice: 0,
          preOrder: false,
          size: [],
          variant: [
            {
              color: "",
              imageUrl: [],
            },
          ],
          stock: 0,
          description: "",
          category: "",
          subCategory: "",
          erpCategory: "",
          erpSubCategory: "",
          status: "",
        });
      } else {
        toast.error("Failed to updated product!", { duration: 3000 });
      }
    } catch {
      toast.error("Something went wrong!", { duration: 3000 });
    }
  };

  // useEffect(() => {
  //   if (productsData?.data && productsData.data.variant) {
  //     const updateVariantState = productsData.data;
  //     setFormData(updateVariantState);
  //   }
  // }, [productsData]);

  const defaultValueOptions = formData.size.map((el) => ({
    value: el,
    label: el,
  }));

  // console.log("formDatas", formData.promotion);

  const { data: promotionData } = useGetAllPromotionsQuery();

  return productsLoading ? (
    <Loader height="h-[85vh]" />
  ) : (
    <div className="container">
      <h1 className="text-2xl font-bold mb-3">Update Product</h1>
      <div className="flex flex-col gap-y-5">
        <form onSubmit={handleSubmit}>
          <div className="bg-basic rounded-lg px-6 py-3 flex flex-col gap-y-4">
            <h4 className="text-lg font-bold">Product Information</h4>
            <div className="flex flex-col gap-4 items-start">
              <div className="w-full bg-gray-100 py-3 px-5 flex flex-col gap-y-3 rounded-lg">
                <div className="grid grid-cols-3 gap-4 items-start">
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
                      <input
                        className="block w-full rounded-lg p-2 border border-gray-400 focus:outline-none text-gray-500 mt-1"
                        value={formData.category}
                        name="category"
                        type="text"
                        placeholder="Enter product name."
                        onChange={(event) => {
                          handleChange(event);
                        }}
                      />
                    </div>
                    <div>
                      <label className="font-medium" htmlFor="subCategory">
                        Subcategory
                      </label>
                      <input
                        className="block w-full rounded-lg p-2 border border-gray-400 focus:outline-none text-gray-500 mt-1"
                        value={formData.subCategory}
                        name="subCategory"
                        type="text"
                        placeholder="Enter product name."
                        onChange={(event) => {
                          handleChange(event);
                        }}
                      />
                    </div>
                    <div>
                      <label className="font-medium" htmlFor="size">
                        Size
                      </label>
                      <Select
                        defaultValue={defaultValueOptions}
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
                          value={formData.regularPrice}
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
                          value={formData.salePrice}
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
                          value={formData.status}
                          onChange={(event) => {
                            handleChange(event);
                          }}
                        >
                          <option value="draft">Draft</option>
                          <option value="published">Publish</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-100 py-3 flex flex-col gap-y-3 rounded-lg">
                    <label className="font-medium" htmlFor="promotion">
                      Color Variants
                    </label>
                    {formData.variant.map((variant, variantIndex) => (
                      <div
                        className="flex gap-2 items-center"
                        key={variantIndex}
                      >
                        <div className="w-full rounded-lg">
                          <div className="flex items-center">
                            <div className="border border-gray-400 bg-gray-100 rounded-sm p-[10px] text-sm text-gray-500 font-medium">
                              Color
                            </div>
                            <input
                              className="rounded-e-lg p-2 border border-gray-400 focus:outline-none text-gray-500 w-full"
                              name="color"
                              value={formData.variant[variantIndex].color}
                              type="text"
                              placeholder="Enter color"
                              onChange={(event) =>
                                handleVariant(event, variantIndex)
                              }
                            />
                          </div>
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
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;
