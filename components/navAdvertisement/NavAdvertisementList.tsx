import React, { FC } from "react";
import { MdDelete } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import Loader from "../Loader";
import Image from "next/image";
import { TNavAdvertisement } from "@/types/navAdvertisementTypes";

interface CategoryListProps {
  navAdvertisementData: TNavAdvertisement[];
  handleEditAdvertisement: (id: string) => void;
  handleDeleteAdvertisement: (id: string) => void;
}

const NavAdvertisementList: FC<CategoryListProps> = ({
  navAdvertisementData,
  handleEditAdvertisement,
  handleDeleteAdvertisement,
}) => {
  return (
    <table className="table bg-basic">
      <thead>
        <tr>
          <th>SL</th>
          <th>Image</th>
          <th>Category</th>
          <th>Link</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {/* if subCategory.length === 0 show no data found */}
        {navAdvertisementData?.length === 0 && (
          <tr>
            <td colSpan={6}>
              <div className="flex justify-center items-center">
                <span className="font-medium text-lg">No Data Found</span>
              </div>
            </td>
          </tr>
        )}
        {/* add loader here */}
        {navAdvertisementData?.length > 0 ? (
          // if categories is available then show data here
          navAdvertisementData?.map((data, index) => (
            <tr key={data._id}>
              <td>{index + 1}</td>
              <td>
                <Image
                  src={data.imageUrl}
                  alt="Advertisement Image"
                  width={200}
                  height={120}
                  className="rounded-sm"
                />
              </td>
              <td>{data.category.title}</td>
              <td>{data.link}</td>
              <td
                className={`font-medium ${
                  data.status === "draft" ? "text-red-600" : "text-green-600"
                }`}
              >
                {data.status}
              </td>
              <td>
                <div className="flex">
                  <label
                    onClick={() => handleEditAdvertisement(data._id as string)}
                    className="cursor-pointer"
                    htmlFor="modal-handle"
                  >
                    <TbEdit color="green" size={20} />
                  </label>
                  <button
                    onClick={() =>
                      handleDeleteAdvertisement(data._id as string)
                    }
                  >
                    <MdDelete color="red" size={20} />
                  </button>
                </div>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={6}>
              <div className="flex justify-center items-center">
                <Loader height="h-[30vh]" />
              </div>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default NavAdvertisementList;
