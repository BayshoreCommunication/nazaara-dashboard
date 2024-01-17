"use client";
import { SaleTagForm } from "@/components/saleTag";
import { cloudinaryImageDeleteWithUrl } from "@/helpers/cloudinaryImageDeleteWithUrl";
import { useDeleteSaleMutation, useGetSalesQuery } from "@/services/salesApi";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { TbEdit } from "react-icons/tb";
import Swal from "sweetalert2";

const SaleTag = () => {
  const [isOpen, setIsOpen] = useState(false);

  console.log("is Open ", isOpen);

  const [filteredData, setFilteredData] = useState({
    // _id: "",
    title: "",
    products: [],
    status: "published",
    featuredImage: "",
  });

  console.log("filteredData");

  const { data: salesData, isLoading, isError } = useGetSalesQuery();
  const [deleteSale] = useDeleteSaleMutation();
  const handleDeleteCategory = async (id: string, image: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const deletedData = await deleteSale(id);
        if (deletedData) {
          // console.log("image", image);
          await cloudinaryImageDeleteWithUrl(image);
          Swal.fire("Deleted!", "Your category has been deleted.", "success");
        } else {
          toast.error("something went wrong! please try again..");
        }
      }
    });
  };

  const handleEditSale = (id: string) => {
    const filtered: any = salesData?.data?.find((item: any) => item._id === id);
    // console.log("filterererere", filtered);
    setFilteredData(filtered);
    setIsOpen(true);
  };

  return (
    <div>
      <div className="flex gap-10 container">
        <div className="flex-[6] overflow-x-auto">
          <h1 className="text-lg font-semibold mb-2">Sale Tags</h1>
          <table className="overflow-auto table bg-basic">
            <thead>
              <tr>
                <th>SL</th>
                <th>Title</th>
                <th>Products SKU</th>
                <th>status</th>
                <th>Action</th>
              </tr>
            </thead>
            {salesData?.data?.map((elem, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <Image
                    src={elem.featuredImage}
                    alt="Sale Feature Image"
                    width={80}
                    height={60}
                  />
                </td>
                <td>{elem.title}</td>
                <td className="flex flex-wrap gap-2">
                  {elem.products.map((data) => (
                    <Link
                      href={`/products/update-product/${data._id}`}
                      className="bg-gray-200 px-1"
                      key={data._id}
                    >
                      {data.sku}
                    </Link>
                  ))}
                </td>
                {/* <td>{showLastNLeters(elem.products, 7)}</td> */}
                <td
                  className={`font-semibold ${
                    elem.status === "draft" ? "text-red-500" : "text-green-500"
                  }`}
                >
                  {elem.status}
                </td>
                <td>
                  <span className="flex">
                    <label
                      htmlFor="modal-handle-sale"
                      onClick={() => handleEditSale(elem._id as string)}
                      className="cursor-pointer"
                    >
                      <TbEdit color="green" size={20} />
                    </label>
                    <button
                      onClick={() =>
                        handleDeleteCategory(
                          elem._id as string,
                          elem.featuredImage as string
                        )
                      }
                    >
                      <MdDelete color="red" size={20} />
                    </button>
                  </span>
                </td>
              </tr>
            ))}
          </table>
        </div>
        <div className="flex-[3]">
          <h1 className="text-lg font-semibold mb-2">Add New Sale Tag</h1>
          <SaleTagForm />
        </div>
        {isOpen && (
          <>
            {/* modal code start  */}
            <input
              type="checkbox"
              id="modal-handle-sale"
              className="modal-toggle"
            />

            <div className="modal">
              <div className="modal-box relative">
                <label
                  className="absolute top-3 right-3 text-xl font-semibold cursor-pointer"
                  htmlFor="modal-handle-sale"
                >
                  <RxCross2 />
                </label>
                <div className="flex-[3]">
                  <h1 className="text-lg font-semibold mb-2 ml-3">
                    Update Category
                  </h1>

                  <form className="bg-white p-3 flex flex-col gap-y-3 rounded-xl">
                    <div>
                      <label className="font-medium" htmlFor="name">
                        Category Name:
                      </label>
                      <input
                        className="block w-full p-2 border border-gray-400 focus:outline-none text-gray-500 mt-1"
                        type="text"
                        required
                        value={filteredData.title}
                        onChange={(e) =>
                          setFilteredData({
                            ...filteredData,
                            title: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="mb-2">
                      <label className="font-medium" htmlFor="status">
                        Status:
                      </label>
                      <select
                        className="w-full border border-gray-400 rounded-sm p-2 focus:outline-none text-gray-500"
                        required
                        value={filteredData.status}
                        onChange={(e) =>
                          setFilteredData({
                            ...filteredData,
                            status: e.target.value,
                          })
                        }
                      >
                        <option value="published">Publish</option>
                        <option value="draft">Draft</option>
                      </select>
                    </div>
                    <button
                      type="submit"
                      className="bg-secondary py-1 px-4 rounded-md text-white w-full"
                    >
                      Update
                    </button>
                  </form>
                </div>
              </div>
              <label className="modal-backdrop" htmlFor="modal-handle-sale">
                Close
              </label>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SaleTag;
