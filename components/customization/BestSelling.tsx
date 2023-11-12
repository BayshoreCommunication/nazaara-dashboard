"use client";
import { useGetSlugsQuery } from "@/services/navSaleApi";
import dynamic from "next/dynamic";
import React, { FormEvent, useEffect, useState } from "react";
import PrimaryButton from "../PrimaryButton";
import {
  useGetBestSellingQuery,
  useUpdateBestSellingMutation,
} from "@/services/bestSellingApi";
import Loader from "../Loader";
import toast from "react-hot-toast";

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

interface SellingData {
  slug: string[]; // Define the type of the slug property as string[]
}

const BestSelling = () => {
  const [sellingData, setSellingData] = useState<SellingData>({
    slug: [],
  });
  const { data: slugsData, isLoading: slugsLoading } = useGetSlugsQuery(); //get all the slugs data

  const { data: bestSellingData, isLoading: bestSellingLoading } =
    useGetBestSellingQuery(); //get all the best selling data

  useEffect(() => {
    if (
      bestSellingData &&
      bestSellingData.bestSellingData &&
      bestSellingData.bestSellingData[0] &&
      bestSellingData.bestSellingData[0].slug
    ) {
      const slugData = bestSellingData.bestSellingData[0].slug;
      setSellingData((prevData) => ({
        ...prevData,
        slug: slugData,
      }));
    }
  }, [bestSellingData]);

  const [updateBestSelling] = useUpdateBestSellingMutation(); //best selling update

  const options =
    slugsData?.slugs.map((slug) => ({
      value: slug.slug, // Use the slug as the value
      label: slug.slug, // Use the slug as the label
    })) || [];

  const handleSelectionChange = (option: any | null) => {
    if (option) {
      //   setSellingData((prevData) => ({
      //     ...prevData,
      //     slug: option.map((elem: any) => elem.value),
      //   }
      setSellingData({
        ...sellingData,
        ["slug"]: option.map((elem: any) => elem.value),
      });
    }
  };

  const handleSubmitSelling = async (event: FormEvent) => {
    event.preventDefault();
    try {
      if (bestSellingData?.bestSellingData[0]._id) {
        const data = await updateBestSelling({
          id: bestSellingData?.bestSellingData[0]._id,
          payload: sellingData,
        });
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
              Product Slug:
            </label>
            <Select
              value={
                bestSellingData &&
                sellingData.slug.map((slug) => ({
                  value: slug, // Use the slug as the value
                  label: slug, // Use the slug as the label
                }))
              }
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
            <PrimaryButton name="Update Slug" />
          </div>
        </form>
      )}
    </div>
  );
};

export default BestSelling;
