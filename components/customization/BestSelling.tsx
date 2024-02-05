"use client";

import dynamic from "next/dynamic";
import React, { FormEvent, useEffect, useState } from "react";
import PrimaryButton from "../PrimaryButton";
import {
  useGetBestSellingQuery,
  useUpdateBestSellingMutation,
} from "@/services/bestSellingApi";
import Loader from "../Loader";
import toast from "react-hot-toast";
import {
  useGetProductBySlugQuery,
  useGetProductsQuery,
} from "@/services/productApi";

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

const BestSelling = () => {
  const [sellingData, setSellingData] = useState({
    products: [],
  });

  const { data: productsData } = useGetProductsQuery({});

  const options = productsData?.product?.map((elem) => ({
    value: elem._id,
    label: elem.sku,
  }));

  const { data: bestSellingData, isLoading: bestSellingLoading } =
    useGetBestSellingQuery(); //get all the best selling data

  // console.log("best selling data", bestSellingData);

  useEffect(() => {
    if (bestSellingData) {
      setSellingData({
        products: (bestSellingData as any).data[0].products.map(
          (product: any) => ({
            value: product._id,
            label: product.sku,
          })
        ),
      });
    }
  }, [bestSellingData]);

  const defaultValueOptions = sellingData.products.map((elem: any) => ({
    value: elem.value,
    label: elem.label,
  }));

  const [updateBestSelling] = useUpdateBestSellingMutation(); //best selling update

  const handleSelectionChange = (option: any | null) => {
    if (option) {
      setSellingData({
        ...sellingData,
        products: option.map((elem: any) => ({
          value: elem.value,
          label: elem.label,
        })),
      });
    }
  };

  const handleSubmitSelling = async (event: FormEvent) => {
    event.preventDefault();
    try {
      if ((bestSellingData as any)?.data[0]._id) {
        const data = await updateBestSelling({
          id: (bestSellingData as any)?.data[0]?._id,
          payload: {
            products: sellingData.products.map((product: any) => product.value),
          },
        }).unwrap();
        if (data) {
          toast.success("best selling product updated!", { duration: 3000 });
        }
      }
    } catch (error) {
      console.error("Error updating best selling:", error);
      toast.error("Failed to update best selling.");
    }
  };

  //   console.log("sellingData", bestSellingData?.bestSellingData[0]._id);

  return (
    <div className="mt-10">
      {bestSellingLoading ? (
        <Loader height="h-[40vh]" />
      ) : (
        <form>
          <div className="mb-2">
            <label className="font-medium" htmlFor="name">
              Product Sku:
            </label>
            <Select
              value={defaultValueOptions}
              onChange={handleSelectionChange}
              className="w-2/3"
              placeholder="Choose Slug"
              id="productSlug"
              // type="text"
              name="productSlug"
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
          <div onClick={handleSubmitSelling} className="w-max">
            <PrimaryButton name="Update Sku" />
          </div>
        </form>
      )}
    </div>
  );
};

export default BestSelling;
