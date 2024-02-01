"use client";
import { SaleTagForm } from "@/components/saleTag";
import { cloudinaryImageDeleteWithUrl } from "@/helpers/cloudinaryImageDeleteWithUrl";
import {
  useDeleteSaleMutation,
  useGetSalesQuery,
  useUpdateSaleMutation,
} from "@/services/salesApi";
import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { TbEdit } from "react-icons/tb";
import Swal from "sweetalert2";
import dynamic from "next/dynamic";
import { useGetProductsQuery } from "@/services/productApi";
import { cloudinaryImageUpload } from "@/helpers";
const Select = dynamic(() => import("react-select"), {
  ssr: false,
});

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

const SaleTag = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const [filteredData, setFilteredData] = useState({
    _id: "",
    title: "",
    products: [],
    status: "published",
    featuredImage: "",
  });

  useEffect(() => {
    setImageUrl(filteredData.featuredImage);
  }, [filteredData.featuredImage]);

  const { data: productsData } = useGetProductsQuery({});

  const options = productsData?.product?.map((elem) => ({
    value: elem._id,
    label: elem.sku,
  }));

  console.log("sale filteredData", filteredData);

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
    console.log("filterererere", filtered);
    setFilteredData({
      _id: filtered._id,
      title: filtered.title,
      products: filtered.products.map((product: any) => ({
        value: product._id,
        label: product.sku,
      })),
      status: filtered.status,
      featuredImage: filtered.featuredImage,
    });
    // setFilteredData(filtered);

    setIsOpen(true);
  };

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      try {
        await cloudinaryImageDeleteWithUrl(imageUrl);

        const { secureUrl } = await cloudinaryImageUpload(file);

        if (secureUrl) {
          toast.success("New image added successfully");
        }

        setFilteredData({
          ...filteredData,
          featuredImage: secureUrl,
        });
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error("Error uploading image");
      }
    }
  };

  const defaultValueOptions = filteredData.products.map((elem: any) => ({
    value: elem.value,
    label: elem.label,
  }));

  const handleSelectionChange = (option: any | null) => {
    if (option) {
      setFilteredData({
        ...filteredData,
        products: option.map((elem: any) => ({
          value: elem.value,
          label: elem.label,
        })),
      });
    }
  };

  const [updateSale] = useUpdateSaleMutation();

  const handleUpdateSale = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const updatedData = {
        title: filteredData.title,
        featuredImage: filteredData.featuredImage,
        products: filteredData.products.map((product: any) => product.value),
        status: filteredData.status,
      };
      console.log("updated data", updatedData);

      const updatedCategory = await updateSale({
        id: filteredData?._id,
        payload: updatedData,
      }).unwrap();

      if (updatedCategory) {
        toast.success("Sale updated!", { duration: 3000 });
        setIsOpen(false);
      }
    } catch (error) {
      console.error("Error updating category:", error);
      toast.error("Failed to update category.");
    }
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
                <th>Feature Image</th>
                <th>Title</th>
                <th>Products SKU</th>
                <th>status</th>
                <th>Action</th>
              </tr>
            </thead>
            {salesData?.data?.map((elem, index) => (
              <tr key={elem._id}>
                <td>{index + 1}</td>
                <td>
                  <Image
                    src={elem.featuredImage}
                    alt="Sale Feature Image"
                    width={80}
                    height={60}
                    className="rounded-md"
                  />
                </td>
                <td>{elem.title}</td>
                <td>
                  <span className="flex flex-wrap gap-2">
                    {elem.products.map((data) => (
                      <Link
                        href={`/products/update-product/${data._id}`}
                        className="bg-gray-200 px-1"
                        key={data._id}
                      >
                        {data.sku}
                      </Link>
                    ))}
                  </span>
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
                    Update Sale
                  </h1>

                  <div className="mb-4 text-red-500 text-xs font-medium">
                    <p className="mb-1">
                      * Choosing any image upload automatically in the server
                      and destroy previous image
                    </p>
                    <p className="">
                      {`* So after changing any image if you don't update the data
            then the previous image will not found.`}
                    </p>
                  </div>

                  <form
                    onSubmit={handleUpdateSale}
                    className="bg-white p-3 flex flex-col gap-y-3 rounded-xl"
                  >
                    <div>
                      <label className="font-medium" htmlFor="name">
                        Sale Title:
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
                    <div>
                      <label className="font-medium" htmlFor="name">
                        Sku:
                      </label>
                      <Select
                        value={defaultValueOptions}
                        onChange={handleSelectionChange}
                        className="w-full rounded-md focus:outline-none text-gray-500"
                        placeholder="Choose One"
                        name="products"
                        styles={customStyles}
                        required
                        // make outline on focus none
                        theme={(theme) => ({
                          ...theme,
                          borderRadius: 5,
                          outline: "none",
                          colors: {
                            ...theme.colors,
                            primary25: "#ccc",
                            primary: "#ccc",
                          },
                        })}
                        options={options}
                        isMulti={true}
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
                    <div className="mb-4">
                      <label
                        className="text-sm font-semibold mb-2 block"
                        htmlFor="status"
                      >
                        Featured Image:
                      </label>
                      <Image
                        src={filteredData.featuredImage}
                        alt="Feature Image"
                        width={80}
                        height={80}
                        className="my-2"
                      />
                      <input
                        type="file"
                        id="imageUpload"
                        name="imageUpload"
                        onChange={handleImageChange}
                      ></input>
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
