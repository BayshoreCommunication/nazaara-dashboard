"use client";
import Editor from "@/components/Editor";
import { FC, ChangeEvent, useState, FormEvent, useEffect } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useCreateProductMutation } from "@/services/productApi";
import dynamic from "next/dynamic";
import { ErpIdProps, TProduct, TResult } from "@/types/types";
import Loader from "@/components/Loader";
import { useGetErpDataByIdQuery } from "@/services/erpApi";
import { toCapitalize } from "@/helpers";
import { useGetCategoriesQuery } from "@/services/categoryApi";
import { useGetSubCategoriesQuery } from "@/services/subcategory";
import { useGetSalesQuery } from "@/services/salesApi";
import axios from "axios";
import { ISaleTag } from "@/types/saleTypes";
import { IFestival } from "@/types/festivalTypes";
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
  const [saleData, setSaleData] = useState<{ data: ISaleTag[] }>();
  const [festivalData, setFestivalData] = useState<{ data: IFestival[] }>();

  const optionsForSale = saleData?.data?.map((data) => ({
    value: data._id,
    label: data.title,
  }));
  const optionsForFestival = festivalData?.data?.map((data) => ({
    value: data._id,
    label: data.title,
  }));

  console.log("opert", optionsForSale);

  //fetch sale data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.API_URL}/api/v1/sale/published`
        );
        setSaleData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData();

    const fetchFestivalData = async () => {
      try {
        const response = await axios.get(
          `${process.env.API_URL}/api/v1/festival/published`
        );
        setFestivalData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchFestivalData();
  }, []);

  const { data: categories } = useGetCategoriesQuery();
  const { data: subCategories } = useGetSubCategoriesQuery();
  // const { data: sales } = useGetSalesQuery();
  const singleProductId = params.productID as number;
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
    saleIds: [],
    festivalIds: [],
    description: "",
    erpCategory: "",
    erpSubCategory: "",
    category: "",
    subCategory: "",
    stock: 0,
    preOrder: false,
    status: "draft",
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
          productsData.color && {
            color: toCapitalize(productsData.color),
            imageUrl: [],
          },
        ],
        size: [productsData.size ? productsData.size : ""],
        description: "",
        erpCategory: productsData.Deatils
          ? productsData?.Deatils.map((el: any) => el.main_category)[0]
          : "",
        erpSubCategory: productsData ? productsData.category : "",
        category: "",
        subCategory: "",
        stock: productsData.ProductDetails
          ? Number(productsData?.ProductDetails.quantity)
          : 0,
        preOrder: false,
        status: "draft",
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
      [name]: toCapitalize(value), // Update the specific field of the variant object
    };
    updatedVariants[index] = updatedVariant; // Update the variant object in the array

    setFormData((prevFormData: TProduct) => ({
      ...prevFormData,
      variant: updatedVariants,
    }));
  };

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

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const submitData = {
      erpId: formData.erpId,
      sku: formData.sku,
      productName: event.target.productName.value,
      purchasePrice: formData.purchasePrice,
      regularPrice: event.target.regularPrice.value,
      salePrice: event.target.salePrice.value,
      variant: formData.variant,
      size: formData.size,
      description: formData.description,
      erpCategory: formData.erpCategory,
      erpSubCategory: formData.erpSubCategory,
      category: event.target.category.value,
      subCategory: event.target.subCategory.value,
      stock: formData.stock,
      preOrder: event.target.preOrder.value === "yes" ? true : false,
      status: event.target.status.value,
    };

    // color should be toCapitalize before sending to backend

    try {
      // each variant color should to toCapitalize before sending to backend
      const response: any = await createProduct(submitData);
      // refetch();

      if (response?.data?.success === true) {
        router.push("/products");
        toast.success("New Product Created Successfully!");
        // Reset form fields
        setFormData({
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
          status: "draft",
        });
      } else {
        toast.error(`Failed to create new product!`);
      }
    } catch (error) {
      console.error("Failed to create new product!", error);
      toast.error(`Something went wrong ${error}`);
    }
  };

  const defaultValueOptions = formData.size.map((el) => ({
    value: el,
    label: el,
  }));

  const defaultValueOptionsForSale = formData?.saleIds?.map((el) => ({
    value: el,
    label: el,
  }));

  const defaultValueOptionsForFestival = formData?.festivalIds?.map((el) => ({
    value: el,
    label: el,
  }));

  return (
    <div className="container">
      <h1 className="text-2xl font-bold mb-3">Add Product</h1>
      <div className="flex flex-col gap-y-5">
        {productsLoading ? (
          <Loader height="h-[85vh]" />
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="bg-basic rounded-md px-6 py-3 flex flex-col gap-y-4">
              <h4 className="text-lg font-bold">Product Information</h4>
              <div className="flex justify-between">
                <p>
                  <b>Erp ID:</b> {formData?.erpId}
                </p>
                <p>
                  <b>Erp Category:</b> {formData?.erpCategory}
                </p>
                <p>
                  <b>Erp SubCategory:</b> {formData?.erpSubCategory}
                </p>
              </div>
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
                        <select
                          className="w-full h-[42px] mt-1 border border-gray-400 rounded-md p-2 focus:outline-none text-gray-500"
                          required
                          name="category"
                          value={formData.category}
                          onChange={handleChange}
                        >
                          <option value="" disabled>
                            Choose Category
                          </option>
                          {categories?.data?.map((category: any, index) => (
                            <option key={index} value={category._id}>
                              {category.title}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="font-medium" htmlFor="subCategory">
                          Subcategory
                        </label>
                        <select
                          className="w-full h-[42px] mt-1 border border-gray-400 rounded-md p-2 focus:outline-none text-gray-500"
                          name="subCategory"
                          required
                          disabled={formData.category === ""}
                        >
                          <option value="" disabled>
                            Choose Subcategory
                          </option>
                          {/* filter subCategories based on category, only show the subCategories which are under the selected categories */}
                          {subCategories?.data?.map(
                            (subCategory: any, index) => {
                              if (
                                subCategory.category._id === formData.category
                              ) {
                                return (
                                  <option key={index} value={subCategory._id}>
                                    {subCategory.title}
                                  </option>
                                );
                              }
                            }
                          )}
                        </select>
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
                    </div>
                    <div className="bg-gray-100 py-3 flex flex-col gap-y-3 rounded-md">
                      <div>
                        <label className="font-medium" htmlFor="regular_price">
                          Purchase Price
                        </label>
                        <div className="flex items-center">
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
                        <label className="font-medium" htmlFor="pre-order">
                          Pre-Order
                        </label>
                        <div className="flex items-center">
                          <select
                            className="w-full h-[42px] mt-1 border rounded-md border-gray-400 p-2 focus:outline-none text-gray-500"
                            name="preOrder"
                            required
                          >
                            <option value="" disabled>
                              Choose One
                            </option>
                            <option value="no">No</option>
                            <option value="yes">Yes</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="font-medium" htmlFor="status">
                          Status
                        </label>
                        <div className="flex items-center">
                          <select
                            className="w-full h-[42px] mt-1 border rounded-md border-gray-400 p-2 focus:outline-none text-gray-500"
                            name="status"
                            required
                          >
                            <option value="" disabled>
                              Choose One
                            </option>
                            <option value="draft">Draft</option>
                            <option value="published">Published</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-100 py-3 flex flex-col gap-y-3 rounded-md">
                      <div>
                        <label className="font-medium" htmlFor="category">
                          Sale
                        </label>
                        {/* <select
                          className="w-full h-[42px] mt-1 border border-gray-400 rounded-md p-2 focus:outline-none text-gray-500"
                          required
                          name="saleIds"
                          value={formData.saleIds}
                          onChange={handleChange}
                        >
                          <option value="" disabled>
                            Choose Sale
                          </option>
                          {saleData?.data?.map((sale) => (
                            <option key={sale._id} value={sale._id}>
                              {sale.title}
                            </option>
                          ))}
                        </select> */}
                        <Select
                          // className="w-full rounded-md focus:outline-none text-gray-500"
                          onChange={handleSelectionChange}
                          defaultValue={defaultValueOptionsForSale}
                          placeholder="Choose Sale"
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
                          options={optionsForSale}
                          isMulti={true}
                        />
                      </div>
                      <div>
                        <label className="font-medium" htmlFor="category">
                          Festival
                        </label>
                        {/* <select
                          className="w-full h-[42px] mt-1 border border-gray-400 rounded-md p-2 focus:outline-none text-gray-500"
                          required
                          name="festivalIds"
                          value={formData.festivalIds}
                          onChange={handleChange}
                        >
                          <option value="" disabled>
                            Choose Sale
                          </option>
                          {festivalData?.data?.map((festival) => (
                            <option key={festival._id} value={festival._id}>
                              {festival.title}
                            </option>
                          ))}
                        </select> */}
                        <Select
                          // className="w-full rounded-md focus:outline-none text-gray-500"
                          onChange={handleSelectionChange}
                          defaultValue={defaultValueOptionsForSale}
                          placeholder="Choose Festival"
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
                          options={optionsForFestival}
                          isMulti={true}
                        />
                      </div>

                      <div>
                        <label className="font-medium" htmlFor="status">
                          Stock
                        </label>
                        <div className="flex items-center">
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
                      <div className="">
                        <label className="font-medium" htmlFor="promotion">
                          Color Variants
                        </label>
                        {formData.variant.map((variant, variantIndex) => (
                          <div
                            className="flex gap-2 items-center mt-1"
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
                                  value={variant?.color}
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
                              <></>
                            )}
                          </div>
                        ))}
                      </div>

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
        )}
      </div>
    </div>
  );
};

export default AddProduct;
