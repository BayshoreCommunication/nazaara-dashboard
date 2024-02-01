"use client";
import React from "react";
import { useGetFestivalsQuery } from "@/services/festivalsApi";
import Loader from "../Loader";
import { MdDelete } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import { showLastNLeters } from "@/helpers";

const FestivalTagList = () => {
  const { data: festivalData, isLoading, isError } = useGetFestivalsQuery();

  const dataLoadingAndErroeHandler = () => {
    if (isError) {
      return (
        <tr>
          <td colSpan={6} className="text-center">
            Error
          </td>
        </tr>
      );
    }
    if (isLoading) {
      return (
        <tr>
          <td colSpan={6} className="text-center">
            <Loader height="h-[40vh]" />
          </td>
        </tr>
      );
    }

    if (festivalData?.data?.length === 0) {
      return (
        <tr>
          <td colSpan={6} className="text-center">
            No Data Found
          </td>
        </tr>
      );
    } else {
      return festivalData?.data?.map((elem, index) => (
        <tr key={elem._id}>
          <td>{index + 1}</td>
          <td>{elem.title}</td>
          <td>{elem.slug}</td>
          <td>{showLastNLeters(elem.products, 7)}</td>
          <td
            className={`${
              elem.status === "draft" ? "text-red-500" : "text-green-500"
            }`}
          >
            {elem.status}
          </td>
          <td className="flex">
            <button
            // onClick={() => handleEditCategory(data._id as string)}
            >
              <TbEdit color="green" size={20} />
            </button>
            <button
            // onClick={() => handleDeleteCategory(data._id as string)}
            >
              <MdDelete color="red" size={20} />
            </button>
          </td>
        </tr>
      ));
    }
  };

  return <tbody>{dataLoadingAndErroeHandler()}</tbody>;
};

export { FestivalTagList };
