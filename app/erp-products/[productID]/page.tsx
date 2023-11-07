"use client";
import Editor from "@/components/Editor";
import { FC, ChangeEvent, useState, FormEvent, useEffect } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useCreateProductMutation } from "@/services/productApi";
import dynamic from "next/dynamic";
import { ErpIdProps, TProduct, TResult } from "@/types/types";
import Loader from "@/components/loader";
import { useGetAllPromotionsQuery } from "@/services/promotionApi";
import { useGetErpDataByIdQuery } from "@/services/erpApi";
const Select = dynamic(() => import("react-select"), {
  ssr: false,
});

//for react select
const customStyles = {
  control: (provided: any, state: any) => ({
    ...provided,
    "& input": {
      height: "auto",
    },
    borderColor: "gray",
    padding: 3,
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

const AddProduct: FC<ErpIdProps> = ({ params }) => {
  const singleProductId = params.productID as number;
  const [erpData, setErpData] = useState<TResult>();
  const router = useRouter();
  const [createProduct] = useCreateProductMutation();
  const [formData, setFormData] = useState<TProduct>({
    erpId: 0,
    sku: "",
    productName: "",
    purchasePrice: 0,
    regularPrice: 0,
    salePrice: 0,
    variant: [],
    size: [],
    description: "",
    erpCategory: "",
    erpSubCategory: "",
    category: "",
    subCategory: "",
    stock: 0,
    preOrder: false,
  });

  const { data: productsData, isLoading: productsLoading } =
    useGetErpDataByIdQuery({
      singleProductId,
    });

  useEffect(() => {
    if (productsData) {
      setFormData({
        erpId: productsData.id ? productsData.id : 0,
        sku: productsData.title ? productsData.title : "",
        productName: "",
        purchasePrice: productsData.purchase_price
          ? Number(productsData.purchase_price)
          : 0,
        regularPrice: productsData.selling_price
          ? Number(productsData.selling_price)
          : 0,
        salePrice: productsData.selling_price
          ? Number(productsData.selling_price)
          : 0,
        variant: [
          productsData.color && { color: productsData.color, imageUrl: [] },
        ],
        size: [productsData.size ? productsData.size : ""],
        description: "",
        erpCategory: productsData.Deatils
          ? productsData?.Deatils.map((el: any) => el.main_category)[0]
          : "",
        erpSubCategory: productsData ? productsData.category : "",
        category: "",
        subCategory: "",
        stock: 0,
        preOrder: false,
      });
    }
  }, [productsData, formData.status]);

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

    setFormData((prevFormData: TProduct) => ({
      ...prevFormData,
      variant: updatedVariants,
    }));
  };

  // const addDivField = () => {
  //   setFormData((prevFormData: any) => ({
  //     ...prevFormData,
  //     variant: [
  //       ...prevFormData.variant,
  //       {
  //         color: "", // Set the color to an empty string for the new variant
  //         imageUrl: [],
  //       },
  //     ],
  //   }));
  // };
  const addDivField = () => {
    setFormData((prevFormData: TProduct) => ({
      ...prevFormData,
      variant: [
        ...prevFormData.variant,
        {
          color: "", // Set the color to an empty string for the new variant
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

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      console.log("first", formData);
      const data: any = await createProduct(formData);
      // refetch();
      if (data.data.status === "success") {
        router.push("/products");
        toast.success("New Product Created", { duration: 3000 });
        // Reset form fields
        // setFormData({
        //   erpId: 0,
        //   productName: "",
        //   purchasePrice: 0,
        //   regularPrice: 0,
        //   salePrice: 0,
        //   size: [],
        //   variant: [],
        //   stock: 0,
        //   description: "",
        //   category: "",
        //   subCategory: "",
        //   promotion: "",
        //   status: "",
        // });
      } else {
        toast.error("Failed to create new product!", { duration: 3000 });
      }
    } catch {
      toast.error("Something went wrong!", { duration: 3000 });
    }
  };
  const defaultValueOptions = formData.size.map((el) => ({
    value: el,
    label: el,
  }));

  const { data: promotionData } = useGetAllPromotionsQuery();

  return !productsData ? (
    <Loader height="h-[85vh]" />
  ) : (
    <div className="container">
      <h1 className="text-2xl font-bold mb-3">Add Product</h1>
      <div className="flex flex-col gap-y-5">
        <form onSubmit={handleSubmit}>
          <div className="bg-basic rounded-md px-6 py-3 flex flex-col gap-y-4">
            <h4 className="text-lg font-bold">Product Information</h4>
            <p>
              <b>Erp ID:</b> {formData.erpId}
            </p>
            <div className="flex flex-col gap-4 items-start">
              <div className="w-full bg-gray-100 py-3 px-5 flex flex-col gap-y-3 rounded-md">
                <div className="grid grid-cols-3 gap-4 items-start">
                  <div className="bg-gray-100 py-2 flex flex-col gap-y-3 rounded-md">
                    <div>
                      <label className="font-medium" htmlFor="name">
                        Product Name
                      </label>
                      <input
                        className="block w-full rounded-md p-2 border border-gray-400 focus:outline-none text-gray-500 mt-1"
                        name="productName"
                        type="text"
                        placeholder="Enter Product Name"
                        required
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label className="font-medium" htmlFor="name">
                        Product SKU
                      </label>
                      <input
                        className="block w-full rounded-md p-2 border border-gray-400 focus:outline-none text-gray-500 mt-1 cursor-not-allowed"
                        value={formData.sku}
                        name="sku"
                        type="text"
                        placeholder="Enter Product SKU"
                        required
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="font-medium" htmlFor="category">
                        Category
                      </label>
                      <input
                        className="block w-full rounded-md p-2 border border-gray-400 focus:outline-none text-gray-500 mt-1"
                        value={formData.category}
                        name="category"
                        type="text"
                        required
                        placeholder="Enter Category Name"
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label className="font-medium" htmlFor="subCategory">
                        Subcategory
                      </label>
                      <input
                        className="block w-full rounded-md p-2 border border-gray-400 focus:outline-none text-gray-500 mt-1"
                        value={formData.subCategory}
                        name="subCategory"
                        type="text"
                        required
                        placeholder="Enter SubCategory Name"
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label className="font-medium" htmlFor="size">
                        Size
                      </label>
                      <Select
                        // className="w-full rounded-md focus:outline-none text-gray-500"
                        onChange={handleSelectionChange}
                        defaultValue={defaultValueOptions}
                        placeholder="Choose One"
                        styles={customStyles}
                        required
                        theme={(theme) => ({
                          ...theme,
                          borderRadius: 5,
                          // padding: 3,
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
                    <div>
                      <label className="font-medium" htmlFor="status">
                        Stock
                      </label>
                      <div className="flex items-center mt-1">
                        <input
                          className="rounded-md p-2 border border-gray-400 focus:outline-none text-gray-500 w-full cursor-not-allowed"
                          name="stock"
                          type="number"
                          value={formData.stock}
                          required
                          readOnly
                          min={0}
                          placeholder="Enter Product Stock"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-100 py-3 flex flex-col gap-y-3 rounded-md">
                    {/* <div>
                      <label className="font-medium" htmlFor="promotion">
                        Promotion
                      </label>
                      <select
                        className="w-full border border-gray-400 rounded-md p-2 focus:outline-none text-gray-500"
                        name="promotion"
                        placeholder="Enter Product Promotion"
                        value={formData.promotion}
                        required
                        onChange={handleChange}
                      >
                        <option value="none">No Promotion</option>
                        {promotionData &&
                          promotionData.data.map((data, i) => (
                            <option value={data.name} key={i}>
                              {data.name}
                            </option>
                          ))}
                      </select>
                    </div> */}
                    <div>
                      <label className="font-medium" htmlFor="regular_price">
                        Purchase Price
                      </label>
                      <div className="flex items-center mt-1">
                        <div className="border border-gray-400 bg-gray-100 rounded-sm p-[10px] text-sm text-gray-500 font-medium">
                          BDT
                        </div>
                        <input
                          className="rounded-e-lg p-2 border border-gray-400 focus:outline-none text-gray-500 w-full cursor-not-allowed"
                          name="purchasePrice"
                          type="number"
                          required
                          readOnly
                          value={formData.purchasePrice}
                          min={0}
                          placeholder="Enter Purchase Price"
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
                          className="rounded-e-lg p-2 border border-gray-400 focus:outline-none text-gray-500 w-full cursor-not-allowed"
                          name="regularPrice"
                          type="number"
                          required
                          readOnly
                          value={formData.regularPrice}
                          min={0}
                          placeholder="Enter regular Price"
                          onChange={handleChange}
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
                          required
                          value={formData.salePrice}
                          min={0}
                          placeholder="Enter Selling Price"
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="font-medium" htmlFor="status">
                        Pre-Order
                      </label>
                      <div className="flex items-center mt-1">
                        <select
                          className="w-full border rounded-md border-gray-400 p-2 focus:outline-none text-gray-500"
                          name="preOrder"
                          required
                          onChange={handleChange}
                        >
                          <option value={"yes"}>Yes</option>
                          <option value={"no"}>No</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="font-medium" htmlFor="status">
                        Status
                      </label>
                      <div className="flex items-center mt-1">
                        <select
                          className="w-full border border-gray-400 rounded-md p-2 focus:outline-none text-gray-500"
                          name="status"
                          value={formData.status}
                          required
                          onChange={handleChange}
                        >
                          <option value="draft">Draft</option>
                          <option value="publish">Publish</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-100 py-3 flex flex-col gap-y-3 rounded-md">
                    <label className="font-medium" htmlFor="promotion">
                      Color Variants
                    </label>
                    {formData.variant.map((variant, variantIndex) => (
                      <div
                        className="flex gap-2 items-center"
                        key={variantIndex}
                      >
                        <div className="w-full rounded-md">
                          <div className="flex items-center">
                            <div className="border border-gray-400 bg-gray-100 rounded-sm p-[10px] text-sm text-gray-500 font-medium">
                              Color
                            </div>
                            <input
                              className="rounded-e-lg p-2 border border-gray-400 focus:outline-none text-gray-500 w-full"
                              name="color"
                              type="text"
                              required
                              placeholder="Enter Color Name"
                              value={formData.variant[variantIndex].color}
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
          <div className="bg-basic rounded-md px-6 py-3 flex flex-col gap-y-4">
            <h4 className="text-lg font-bold">Product Description</h4>
            <Editor setFormData={setFormData} formData={formData} />
          </div>
          <div className="flex justify-end gap-x-3">
            <button
              className="bg-secondary py-1 px-4 rounded-md text-white mt-3"
              type="submit"
            >
              Add New Product
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

export default AddProduct;
