"use client";
import UtilityBtn from "@/components/UtilityBtn";
import Loader from "@/components/Loader";
import {
  useGetProductsQuery,
  useDeleteProductMutation,
} from "@/services/productApi";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import Swal from "sweetalert2";
import { useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";

const Products: any = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const {
    data: productsData,
    isLoading: productsLoading,
    refetch,
    error: productsError,
  } = useGetProductsQuery({ page: currentPage, limit: 10 });

  const totalPages = productsData?.totalPages;

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages!) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePageClick = (page: number) => {
    if (page >= 1 && page <= totalPages!) {
      setCurrentPage(page);
      // getData();
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const ellipsis = (
      <button className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 border border-gray-300">
        ...
      </button>
    );

    const maxButtonsToShow = 5; // Number of buttons to show at a time
    const halfMaxButtons = Math.floor(maxButtonsToShow / 2);

    let startPage = currentPage - halfMaxButtons;
    let endPage = currentPage + halfMaxButtons;

    if (startPage < 1) {
      startPage = 1;
      endPage = Math.min(totalPages!, maxButtonsToShow);
    }

    if (endPage > totalPages!) {
      endPage = totalPages!;
      startPage = Math.max(1, totalPages! - maxButtonsToShow + 1);
    }

    if (startPage > 1) {
      pageNumbers.push(
        <button
          key={1}
          className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 border border-gray-300"
          onClick={() => handlePageClick(1)}
        >
          1
        </button>
      );
      if (startPage > 2) {
        pageNumbers.push(ellipsis);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 border border-gray-300 ${
            currentPage === i ? "bg-secondary text-white" : ""
          }`}
          onClick={() => handlePageClick(i)}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages!) {
      if (endPage < totalPages! - 1) {
        pageNumbers.push(ellipsis);
      }
      pageNumbers.push(
        <button
          key={totalPages}
          className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 border border-gray-300"
          onClick={() => handlePageClick(totalPages!)}
        >
          {totalPages}
        </button>
      );
    }

    return pageNumbers;
  };

  const syncErpDataHandler = async () => {
    try {
      const response = await axios.get(
        "https://erp.anzaralifestyle.com/api/product/Details/?format=json",
        {
          headers: {
            Authorization: `Token ${process.env.AUTH_TOKEN}`,
          },
        }
      );
      console.log("Fetched data:", response.data);
    } catch (error) {
      console.error("Request error:", error);
    }
  };

  const [deleteProduct] = useDeleteProductMutation();

  const handleDelete = (id: string) => {
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
        Swal.fire("Deleted!", "Your product has been deleted.", "success");
        const productDel = await deleteProduct(id);
        if (productDel) {
          refetch(); // Refetch the Product list after deleting a Product
        }
      }
    });
  };

  const tableComponent = () => {
    if (productsLoading) {
      return (
        <tr>
          <td colSpan={9}>
            <div className="flex justify-center items-center">
              <Loader height="h-[60vh]" />
            </div>
          </td>
        </tr>
      );
    } else if (productsData?.product?.length === 0) {
      return (
        <tr>
          <td colSpan={9}>
            <div className="flex justify-center items-center h-48">
              <p className="text-gray-500 font-semibold">No data found!</p>
            </div>
          </td>
        </tr>
      );
    } else if (!productsLoading) {
      return productsData?.product?.map((elem, index) => (
        <tr key={index}>
          <td>
            {elem.variant[0].imageUrl[0] ? (
              <Image
                src={elem.variant[0].imageUrl[0]}
                alt="nazaara main logo"
                width={248}
                height={248}
                className="w-[70px] h-[70px]"
              />
            ) : (
              <Image
                src="/images/no-image.jpg"
                alt="nazaara main logo"
                width={248}
                height={248}
                className="w-[70px] h-[70px]"
              />
            )}
          </td>
          <td>{elem.erpId}</td>
          <td>{elem.productName}</td>
          <td>{elem.category}</td>
          <td>{elem.subCategory}</td>
          <td>
            <span className="text-xl">৳</span>
            {elem.salePrice}
          </td>
          <td>{elem.stock}</td>
          <td
            className={`font-medium ${
              elem.status === "published" ? "text-green-500" : "text-red-500"
            }`}
          >
            {elem.status}
          </td>
          <td>
            <div className="flex gap-2">
              <Link
                href={{
                  pathname: "/products/image-upload",
                  query: { id: `${elem._id}` },
                }}
                className="text-white bg-red-800 py-2 px-3 rounded-md shadow-md"
              >
                Edit Image
              </Link>
              <Link
                href={{
                  pathname: "/products/update-product",
                  query: { id: `${elem._id}` },
                }}
                className="text-white bg-red-800 py-2 px-3 rounded-md shadow-md"
              >
                Edit Details
              </Link>
              <button
                onClick={() => handleDelete(elem._id as string)}
                className="text-white bg-red-800 py-2 px-3 rounded-md shadow-md"
              >
                Delete
              </button>
            </div>
          </td>
        </tr>
      ));
    } else if (productsError) {
      return (
        <tr>
          <td colSpan={9}>
            <div className="flex justify-center items-center h-48">
              <p className="text-red-500 font-semibold">
                Something went wrong!
              </p>
            </div>
          </td>
        </tr>
      );
    }
  };

  return (
    <div className="container">
      <div className="flex gap-2 items-center mb-2">
        <AiOutlineShoppingCart size={18} color="gray" />
        <span className="font-medium text-lg">Products</span>
      </div>
      <div className="flex justify-end py-4">
        <button
          className="text-white bg-red-800 py-2 px-3 rounded-md shadow-md"
          onClick={syncErpDataHandler}
        >
          Sync with erp data
        </button>
      </div>
      {/* product component  */}
      <div className="overflow-x-auto">
        <table className="table bg-basic">
          {/* head */}
          <thead className="">
            <tr>
              <th>Image</th>
              <th>Erp ID</th>
              <th>Product Name</th>
              <th>Category</th>
              <th>Sub Category</th>
              <th>Sale Price</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{tableComponent()}</tbody>
        </table>
      </div>
      <ul className="flex -space-x-px text-sm justify-center mt-4">
        <li>
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className={`flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-200 border border-gray-100 rounded-l-lg hover:text-gray-100 ${
              currentPage === 1 ? "bg-secondary-hover" : "bg-secondary"
            }`}
          >
            Previous
          </button>
        </li>

        <li className="flex">{renderPageNumbers()}</li>
        <li>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-200 border border-gray-100 rounded-e-lg hover:text-gray-100 ${
              currentPage === totalPages ? "bg-secondary-hover" : "bg-secondary"
            }`}
          >
            Next
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Products;
