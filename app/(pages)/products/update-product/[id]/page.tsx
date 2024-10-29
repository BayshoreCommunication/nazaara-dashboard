"use client";
import Editor from "@/components/Editor";
import { FC, ChangeEvent, useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Barcode from "react-barcode";
import {
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from "@/services/productApi";
import dynamic from "next/dynamic";
import { TProduct } from "@/types/types";
import Loader from "@/components/Loader";
// import { useGetErpDataByIdQuery } from "@/services/erpApi";
import { toCapitalize } from "@/helpers";
import { useGetCategoriesQuery } from "@/services/categoryApi";
import { useGetSubCategoriesQuery } from "@/services/subcategory";
// import { useGetSalesQuery } from "@/services/salesApi";
import axios from "axios";
import { ISaleTag } from "@/types/saleTypes";
import { IFestival } from "@/types/festivalTypes";
// import useToggle from "@/hooks/useToogle";
import ColorVariant from "@/components/ColorPicker";
import { useReactToPrint } from "react-to-print";
import { IoMdPrint } from "react-icons/io";
import { FaFileInvoice } from "react-icons/fa";
import Image from "next/image";
import barcodeLogo from "@/public/images/barcode.png";
import barcode from "@/public/images/logo.png";
import nazaara from "@/public/images/nazaara-logo.png";
import { TbSlash } from "react-icons/tb";
import { RxSlash } from "react-icons/rx";
import { BsSlashLg } from "react-icons/bs";
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

interface IProps {
  params: {
    id: string;
  };
}

const UpdateProduct: FC<IProps> = ({ params }) => {
  const [saleData, setSaleData] = useState<{ data: ISaleTag[] }>();
  const [festivalData, setFestivalData] = useState<{ data: IFestival[] }>();

  const [updateProduct] = useUpdateProductMutation();

  const optionsForSale = saleData?.data?.map((data) => ({
    value: data._id,
    label: data.title,
  }));

  const optionsForFestival = festivalData?.data?.map((data) => ({
    value: data._id,
    label: data.title,
  }));

  // console.log("opert", optionsForSale);

  const barcodeRef = useRef<HTMLDivElement>(null);
  const barcodePrintFn = useReactToPrint({ contentRef: barcodeRef });

  //fetch sale data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.API_URL}/api/v1/sale/published`,
          {
            headers: {
              authorization: `Nazaara@Token ${process.env.API_SECURE_KEY}`,
            },
          }
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
          `${process.env.API_URL}/api/v1/festival/published`,
          {
            headers: {
              authorization: `Nazaara@Token ${process.env.API_SECURE_KEY}`,
            },
          }
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

  // console.log("subcategories", subCategories);

  // const { data: sales } = useGetSalesQuery();
  // const singleProductId = params.id as number;
  const router = useRouter();
  // const [createProduct] = useCreateProductMutation();
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
    status: "",
  });
  const {
    data: productsData,
    isLoading: productsLoading,
    refetch,
  } = useGetProductByIdQuery(params.id);

  // console.log("erp data", productsData);

  useEffect(() => {
    if (productsData && productsData.success) {
      setFormData({
        erpId: productsData.data.erpId ? productsData.data.erpId : 0,
        sku: productsData.data.sku ? productsData.data.sku : "",
        productName: productsData.data.productName
          ? productsData.data.productName
          : "",
        purchasePrice: productsData.data.purchasePrice
          ? Number(productsData.data.purchasePrice)
          : 0,
        regularPrice: productsData.data.regularPrice
          ? Number(productsData.data.regularPrice)
          : 0,
        salePrice: productsData.data.salePrice
          ? Number(productsData.data.salePrice)
          : 0,
        variant: productsData.data.variant.map((variant: any) => ({
          color: toCapitalize(variant.color),
          colorCode: variant.colorCode,
          imageUrl: variant.imageUrl.map((image: any) => image),
        })),
        size: productsData.data.size.map((size: any) => size),
        saleIds: productsData.data.saleIds,
        festivalIds: productsData.data.festivalIds,
        description: productsData.data.description,
        erpCategory: productsData.data.erpCategory,
        erpSubCategory: productsData.data.erpSubCategory,
        category: productsData.data.category._id,
        subCategory: productsData.data.subCategory._id,
        stock: Number(productsData.data.stock),
        preOrder: productsData.data.preOrder,
        status: productsData.data.status,
      });
    }
  }, [productsData]);

  // console.log("form data", formData);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  // const handleChange = (
  //   event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  // ) => {
  //   const { name, value, type } = event.target;

  //   setFormData((prevFormData) => ({
  //     ...prevFormData,
  //     [name]: type === "checkbox" ? event.target.checked : value,
  //   }));
  // };

  const handleSelectionChange = (option: any | null) => {
    if (option) {
      setFormData({
        ...formData,
        ["size"]: option.map((elem: any) => elem.value),
      });
    }
  };

  const handleSaleSelectionChange = (option: any | null) => {
    if (option) {
      setFormData({
        ...formData,
        ["saleIds"]: option.map((elem: any) => elem.value),
      });
    }
  };

  const handleFestivalSelectionChange = (option: any | null) => {
    if (option) {
      setFormData({
        ...formData,
        ["festivalIds"]: option.map((elem: any) => elem.value),
      });
    }
  };

  // const handleVariant = (
  //   event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  //   index: number
  // ) => {
  //   const { name, value } = event.target;
  //   const updatedVariants = [...formData.variant]; // Create a copy of the variant array
  //   const updatedVariant = {
  //     ...updatedVariants[index], // Get the variant object at the specified index
  //     [name]: toCapitalize(value), // Update the specific field of the variant object
  //   };
  //   updatedVariants[index] = updatedVariant; // Update the variant object in the array

  //   setFormData((prevFormData: TProduct) => ({
  //     ...prevFormData,
  //     variant: updatedVariants,
  //   }));
  // };

  const addDivField = () => {
    setFormData((prevFormData: TProduct) => ({
      ...prevFormData,
      variant: [
        ...prevFormData.variant,
        {
          color: "", // Set the color to an empty string for the new variant
          colorCode: "",
          imageUrl: [],
        },
      ],
    }));
  };

  // const removeDivField = (index: number) => {
  //   setFormData((prevFormData: any) => {
  //     const updatedVariants = prevFormData.variant.filter(
  //       (_: any, i: number) => i !== index
  //     );
  //     return {
  //       ...prevFormData,
  //       variant: updatedVariants,
  //     };
  //   });
  // };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const submitData = {
      erpId: formData.erpId,
      sku: formData.sku,
      productName: event.target.productName.value,
      purchasePrice: Number(formData.purchasePrice),
      regularPrice: Number(formData.regularPrice),
      salePrice: Number(formData.salePrice),
      variant: formData.variant,
      size: formData.size,
      saleIds: formData.saleIds,
      festivalIds: formData.festivalIds,
      description: formData.description,
      erpCategory: formData.erpCategory,
      erpSubCategory: formData.erpSubCategory,
      category: event.target.category.value,
      subCategory: event.target.subCategory.value,
      stock: formData.stock,
      preOrder: event.target.preOrder.value === "yes" ? true : false,
      status: event.target.status.value,
    };

    // console.log("form data", formData);
    // console.log("submit form", submitData);

    // color should be toCapitalize before sending to backend

    try {
      if (submitData.description === "<p><br></p>") {
        toast.error("Please add description to proceed further");
      } else {
        const mutationData: any = await updateProduct({
          id: params.id,
          payload: submitData,
        });
        refetch();
        if (mutationData?.data?.success) {
          router.push("/products");
          toast.success("Product updated sucessfully.", { duration: 3000 });
        } else {
          toast.error(mutationData?.error?.data?.message, { duration: 3000 });
        }
      }
    } catch {
      toast.error("Something went wrong!", { duration: 3000 });
    }
  };

  const defaultValueOptions = formData.size.map((el) => ({
    value: el,
    label: el,
  }));

  const defaultValueOptionsForSale = formData?.saleIds?.map((saleId) => {
    const sale = optionsForSale?.find((sale) => sale.value === saleId);
    return sale ? { value: sale.value, label: sale.label } : null;
  });

  const defaultValueOptionsForFestival = formData?.festivalIds?.map(
    (festivalId) => {
      const festival = optionsForFestival?.find(
        (festival) => festival.value === festivalId
      );
      return festival ? { value: festival.value, label: festival.label } : null;
    }
  );

  // const {
  //   node,
  //   toggle: showColorPicker,
  //   setToggle: setShowColorPicker,
  // } = useToggle();

  const [color, setColor] = useState("#820000");
  // const [colorCode, setColorCode] = useState<string>(formData.variant?.colorCode || "#000000");

  // const handleColorCode = (variantIndex: number) => {
  //   setColor;
  //   const updatedVariants = [...formData.variant];
  //   const updatedVariant = {
  //     ...updatedVariants[variantIndex], // Get the variant object at the specified index
  //     colorCode: color, // Update the specific field of the variant object
  //   };
  //   updatedVariants[variantIndex] = updatedVariant;
  //   setFormData((prevFormData: TProduct) => ({
  //     ...prevFormData,
  //     variant: updatedVariants,
  //   }));
  // };

  // console.log("color code", color);
  // console.log("formdata", formData);

  const handleRemoveVariant = (variantIndex: number) => {
    const updatedVariants = [...formData.variant].filter(
      (_, i) => i !== variantIndex
    );
    setFormData((prevFormData) => ({
      ...prevFormData,
      variant: updatedVariants,
    }));
  };

  return (
    <div className="dynamic-container">
      <h1 className="text-2xl font-bold mb-3">Update Product</h1>
      <div className="flex flex-col gap-y-5">
        {productsLoading ? (
          <Loader height="h-[85vh]" />
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="bg-basic rounded-md px-6 py-3 flex flex-col gap-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-bold">Product Information</h4>
                <label
                  htmlFor="invoice-model"
                  // onClick={() => handleSizeChart(el?.sizeChart?._id, el._id)}
                  className="text-[#5B94FC] cursor-pointer flex items-center gap-[2px] text-sm font-semibold"
                >
                  <FaFileInvoice size={14} className="mt-[2px]" /> Barcode
                </label>
              </div>
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
                          Product Name<span className="text-red-600">*</span>
                        </label>
                        <input
                          className="block w-full rounded-md p-2 border border-gray-400 focus:outline-none text-gray-500 mt-1"
                          name="productName"
                          value={formData.productName}
                          type="text"
                          placeholder="Enter Product Name"
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div>
                        <label className="font-medium" htmlFor="name">
                          Product SKU<span className="text-red-600">*</span>
                        </label>
                        <input
                          className="block w-full rounded-md p-2 border border-gray-400 focus:outline-none text-gray-500 mt-1"
                          value={formData.sku}
                          name="sku"
                          type="text"
                          placeholder="Enter Product SKU"
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div>
                        <label className="font-medium" htmlFor="category">
                          Web Category<span className="text-red-600">*</span>
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
                          {categories?.data?.map((category: any) => (
                            <option key={category._id} value={category._id}>
                              {category.title}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="font-medium" htmlFor="subCategory">
                          Web Subcategory<span className="text-red-600">*</span>
                        </label>
                        <select
                          className="w-full h-[42px] mt-1 border border-gray-400 rounded-md p-2 focus:outline-none text-gray-500"
                          name="subCategory"
                          value={formData.subCategory}
                          required
                          onChange={handleChange}
                        >
                          <option value="" disabled>
                            Choose Subcategory
                          </option>
                          {/* filter subCategories based on category, only show the subCategories which are under the selected categories */}
                          {subCategories?.data?.map((subCategory: any) => {
                            if (
                              subCategory.category._id === formData.category
                            ) {
                              return (
                                <option
                                  key={subCategory._id}
                                  value={subCategory._id}
                                >
                                  {subCategory.title}
                                </option>
                              );
                            }
                          })}
                        </select>
                      </div>
                      <div>
                        <label className="font-medium" htmlFor="size">
                          Size<span className="text-red-600">*</span>
                        </label>
                        <Select
                          // className="w-full rounded-md focus:outline-none text-gray-500"
                          value={defaultValueOptions}
                          onChange={handleSelectionChange}
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
                          Purchase Price<span className="text-red-600">*</span>
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
                          Regular Price<span className="text-red-600">*</span>
                        </label>
                        <div className="flex items-center mt-1">
                          <div className="border border-gray-400 bg-gray-100 rounded-sm p-[10px] text-sm text-gray-500 font-medium">
                            BDT
                          </div>
                          <input
                            className="rounded-e-lg p-2 border border-gray-400 focus:outline-none text-gray-500 w-full"
                            name="regularPrice"
                            type="number"
                            required
                            value={formData.regularPrice}
                            min={0}
                            placeholder="Enter regular Price"
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="font-medium" htmlFor="selling_price">
                          Selling Price<span className="text-red-600">*</span>
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
                          Pre-Order<span className="text-red-600">*</span>
                        </label>
                        <div className="flex items-center">
                          <select
                            className="w-full h-[42px] mt-1 border rounded-md border-gray-400 p-2 focus:outline-none text-gray-500"
                            name="preOrder"
                            required
                            value={formData.preOrder ? "yes" : "no"}
                            onChange={handleChange}
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
                          Status<span className="text-red-600">*</span>
                        </label>
                        <div className="flex items-center">
                          <select
                            className="w-full h-[42px] mt-1 border rounded-md border-gray-400 p-2 focus:outline-none text-gray-500"
                            name="status"
                            required
                            defaultValue={formData.status}
                            // onChange={(event) => {
                            //   handleChange(event);
                            // }}
                          >
                            <option
                              value="draft"
                              selected={formData.status === "draft"}
                            >
                              Draft
                            </option>
                            <option
                              value="published"
                              selected={formData.status === "published"}
                            >
                              Published
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-100 py-3 flex flex-col gap-y-3 rounded-md">
                      <div>
                        <label className="font-medium" htmlFor="category">
                          Sale
                        </label>
                        <Select
                          // className="w-full rounded-md focus:outline-none text-gray-500"
                          value={defaultValueOptionsForSale}
                          onChange={handleSaleSelectionChange}
                          placeholder="Choose Sale"
                          styles={customStyles}
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
                        <Select
                          value={defaultValueOptionsForFestival}
                          onChange={handleFestivalSelectionChange}
                          placeholder="Choose Festival"
                          styles={customStyles}
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
                          Stock<span className="text-red-600">*</span>
                        </label>
                        <div className="flex items-center">
                          <input
                            className="rounded-md p-2 border border-gray-400 focus:outline-none text-gray-500 w-full"
                            name="stock"
                            type="number"
                            value={formData.stock}
                            onChange={handleChange}
                            required
                            min={0}
                            placeholder="Enter Product Stock"
                          />
                        </div>
                      </div>
                      <div className="">
                        <label className="font-medium" htmlFor="promotion">
                          Color Variants<span className="text-red-600">*</span>
                        </label>
                        {/* {formData.variant.map((variant, variantIndex) => (
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
                              <div className="flex items-center mt-1">
                                <div className="border border-gray-400 bg-gray-100 rounded-sm p-[10px] text-sm text-gray-500 font-medium">
                                  Code
                                </div>
                                <div ref={node} className="inline relative">
                                  <div className="inline-flex items-center gap-3 p-2 rounded-r-md border border-gray-400">
                                    <button
                                      type="button"
                                      className="w-6 h-6 rounded-full"
                                      style={{ backgroundColor: color }}
                                      onClick={() =>
                                        setShowColorPicker(!showColorPicker)
                                      }
                                    ></button>

                                    <HexColorInput
                                      color={color}
                                      onChange={() =>
                                        handleColorCode(variantIndex)
                                      }
                                      //     value={variant?.color}
                                      // onChange={(event) =>
                                      //   handleVariant(event, variantIndex)
                                      // }
                                      prefixed
                                      className="bg-transparent outline-none w-[80px]"
                                    />
                                  </div>
                                  {showColorPicker && (
                                    <div className="absolute mt-3">
                                      <HexColorPicker
                                        color={color}
                                        onChange={setColor}
                                      />
                                    </div>
                                  )}
                                </div>
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
                        ))} */}
                        {formData.variant.map((variant, variantIndex) => (
                          <ColorVariant
                            key={variantIndex}
                            variantIndex={variantIndex}
                            formData={formData}
                            setFormData={setFormData}
                            handleRemoveVariant={handleRemoveVariant}
                          />
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
              <h4 className="text-lg font-bold">
                Product Description<span className="text-red-600">*</span>
              </h4>
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
        )}
      </div>
      {/* invoice model  */}
      <div className="uppercase">
        <input type="checkbox" id="invoice-model" className="modal-toggle" />
        <div className="modal overflow-y-scroll">
          <div
            // ref={invoiceContentRef}
            className="modal-box bg-white max-h-min w-max m-0 p-0"
          >
            <div className="flex justify-end -translate-x-4 translate-y-4">
              <label htmlFor="invoice-model" className="btn btn-sm btn-circle">
                ✕
              </label>
            </div>

            <div
              ref={barcodeRef}
              className="print-area p-4 text-center flex flex-col gap-1 items-center"
            >
              <h4 className="font-medium text-lg mb-2 tracking-wide">
                NAZAARA
              </h4>
              <p className="font-medium text-sm">Sharee</p>
              <Barcode value="1234567865" />
              <p className="font-medium">DW-MX/00018</p>
              <input
                className="py-0.5 focus:outline-gray-300 text-center"
                defaultValue={"RED"}
              />
              <input
                className="py-0.5 focus:outline-gray-300 text-center"
                defaultValue={"44"}
              />
              <div>
                <input
                  className="py-1 focus:outline-gray-300 font-medium text-center"
                  defaultValue={`BDT ${parseFloat(
                    formData.salePrice as any
                  ).toFixed(2)}`}
                />
                <p className="text-xs -translate-y-2 font-medium text-gray-600 capitalize">
                  {"(Vat Inclusive)"}
                </p>
              </div>
              <input
                className="py-1 focus:outline-gray-300 text-gray-600 text-sm text-center"
                defaultValue={"**Dry wash only"}
              />
              <div className="flex items-center mt-2">
                <div>
                  <div className="flex justify-center">
                    <Image
                      alt="logo"
                      style={{ filter: "brightness(0) invert(0)" }}
                      src={barcode}
                      quality={100}
                      className="w-9 h-auto"
                    />
                  </div>
                  <Image
                    alt="logo"
                    src={nazaara}
                    quality={100}
                    className="w-10 h-auto mt-0.5 opacity-70"
                  />
                </div>
                <p className="text-gray-600 text-6xl -translate-y-2 font-[100] -rotate-6 font-sans">
                  /
                </p>
                <div className="flex flex-col text-xs">
                  <p className="text-gray-600 font-thin text-start italic">
                    ANZARA
                  </p>
                  <p className="text-gray-600 font-thin text-start italic -translate-y-1 -translate-x-1">
                    LIFESTYLE LTD.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <button
                onClick={() => barcodePrintFn()}
                className=" bg-secondary rounded px-3 py-1 text-sm text-white ml-6 mb-6 uppercase flex items-center gap-1"
              >
                <IoMdPrint size={18} /> print
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
