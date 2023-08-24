"use client";
import UtilityBtn from "@/components/UtilityBtn";
import Loader from "@/components/loader";
import { useGetProductErpIdQuery } from "@/services/productApi";
import { TErpData } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";

const ErpProducts = () => {
  const { data: productsErpId } = useGetProductErpIdQuery();
  //pagination
  const pageSize = 10;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const url = `https://erp.anzaralifestyle.com/api/product/Details/?format=json&page=${currentPage}&page_size=${pageSize}`;

  const [erpData, setErpData] = useState<TErpData>();
  const getData = useCallback(async () => {
    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Token ${process.env.AUTH_TOKEN}`,
        },
      });
      const data = await response.json();
      setErpData(data);
    } catch (err) {
      console.log("error", err);
    }
  }, [url]);

  useEffect(() => {
    getData();
  }, [getData, url]);

  //pagination
  const totalPages = Math.ceil(erpData?.count! / pageSize);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePageClick = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      getData();
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
      endPage = Math.min(totalPages, maxButtonsToShow);
    }

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, totalPages - maxButtonsToShow + 1);
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

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push(ellipsis);
      }
      pageNumbers.push(
        <button
          key={totalPages}
          className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 border border-gray-300"
          onClick={() => handlePageClick(totalPages)}
        >
          {totalPages}
        </button>
      );
    }

    return pageNumbers;
  };

  return !erpData ? (
    <Loader height="h-[85vh]" />
  ) : (
    <div>
      <div className="container">
        <div className="flex items-center justify-between mb-3">
          <div className="flex gap-2 items-center">
            <AiOutlineShoppingCart size={18} color="gray" />
            <span className="font-medium text-lg">ERP Products</span>
          </div>
        </div>
        {/* product component  */}
        <div className="overflow-x-auto">
          <table className="table bg-basic">
            {/* head */}
            <thead className="">
              <tr>
                <th>Image</th>
                <th>ERP ID</th>
                <th>Title</th>
                <th>Category</th>
                <th>Selling Price</th>
                <th>Stock</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {erpData?.results.map((elem, index) => {
                const checkdata = productsErpId?.result.filter(
                  (el: any) => el.erpId === elem.id
                )[0];
                console.log("check data here", checkdata);

                return (
                  <tr
                    key={index}
                    // className={`${checkdata != undefined && "bg-gray-300"}`}
                  >
                    <td>
                      <Image
                        src={elem?.ProductImage[0]?.photo}
                        alt="nazara main logo"
                        width={248}
                        height={248}
                        className="w-[70px] h-[70px]"
                      />
                    </td>
                    <td>{elem.id}</td>
                    <td>{elem.title}</td>
                    <td>{elem.Deatils.map((el) => el.main_category)}</td>
                    <td>
                      <span className="text-xl">৳</span>
                      {Math.floor(Number(elem.selling_price))}
                    </td>
                    <td>{elem.quantity}</td>
                    {checkdata != undefined ? (
                      <td className="text-green-500 font-medium">stored</td>
                    ) : (
                      <td className="text-red-500 font-medium">not stored</td>
                    )}
                    <td>
                      {checkdata === undefined ? (
                        <Link
                          href={`/erp-products/${elem.id}`}
                          className="text-sm bg-secondary px-3 py-1 text-white rounded-lg"
                        >
                          Add Product
                        </Link>
                      ) : (
                        <p className="text-sm bg-gray-500 px-3 py-1 text-white rounded-lg w-max cursor-not-allowed">
                          Already Added
                        </p>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
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
                currentPage === totalPages
                  ? "bg-secondary-hover"
                  : "bg-secondary"
              }`}
            >
              Next
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ErpProducts;
