"use client";
// import UtilityBtn from "@/components/UtilityBtn";
import Loader from "@/components/Loader";
// import { useGetAllErpDataQuery } from "@/services/erpApi";
import { useGetProductErpIdQuery } from "@/services/productApi";
import { TErpData } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import axios from "axios";

const ErpProducts = () => {
  const { data: productsErpId } = useGetProductErpIdQuery();
  const [erpData, setErpData] = useState<TErpData>();
  const [keyWord, setKeyWord] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  //pagination
  const pageSize = 20;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const url = `https://erp.anzaralifestyle.com/api/product/Details/?format=json&page=${currentPage}&page_size=${pageSize}&keyward=${keyWord}`;
  // const url = `https://erp.anzaralifestyle.com/api/product/Details/?format=json&page=${currentPage}&page_size=${pageSize}&keyward=${keyWord}&quantity=${quantity}`;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Token ${process.env.AUTH_TOKEN}`,
          },
        });

        const filteredData = response.data.results.filter(
          (data: any) => data.quantity > 0
        );

        setErpData({
          ...response.data,
          results: filteredData,
        });
      } catch (err) {
        console.error("Error fetching erp product data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url, keyWord]);

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
      // getData();
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const ellipsis = (
      <button
        key="ellipsis"
        className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 border border-gray-300"
      >
        ...
      </button>
    );

    const maxButtonsToShow = 4; // Number of buttons to show at a time
    const halfMaxButtons = Math.floor(maxButtonsToShow / 2);

    let startPage = Math.max(1, currentPage - halfMaxButtons);
    let endPage = Math.min(totalPages, startPage + maxButtonsToShow - 1);

    if (endPage - startPage < maxButtonsToShow - 1) {
      startPage = Math.max(1, endPage - maxButtonsToShow + 1);
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
        if (startPage > 3) {
          pageNumbers.push(ellipsis);
        }
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
        if (endPage < totalPages - 2) {
          pageNumbers.push(ellipsis);
        }
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

  return (
    <div>
      <div className="dynamic-container">
        <div className="flex items-center justify-between mb-3">
          <div className="flex gap-2 items-center">
            <AiOutlineShoppingCart size={18} color="gray" />
            <span className="font-medium text-lg">ERP Products</span>
          </div>
          <div className="flex items-center gap-2">
            {/* <input
              type="number"
              placeholder="quantity"
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="border border-gray-400 rounded-lg px-2 py-0.5"
            /> */}
            <input
              type="text"
              placeholder="slug"
              onChange={(e) => setKeyWord(e.target.value)}
              className="border border-gray-400 rounded-lg px-2 py-0.5"
            />
          </div>
        </div>
        {isLoading ? (
          <div className="w-[86vw] flex justify-center">
            <Loader height="h-[80vh]" />
          </div>
        ) : (
          <>
            {/* product component  */}
            <div className="overflow-x-auto">
              <table className="table bg-basic">
                {/* head */}
                <thead className="text-gray-700">
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
                  {!erpData ? ( // if erpData is not available
                    <tr>
                      <td colSpan={8}>
                        <div className="flex justify-center items-center">
                          <Loader height="h-[60vh]" />
                        </div>
                      </td>
                    </tr>
                  ) : erpData?.results?.length >= 0 ? ( // if erpData is available but no data
                    erpData?.results?.map((elem, index) => {
                      const checkdata = productsErpId?.result.filter(
                        (el: any) => el.erpId === elem.id
                      )[0];
                      return (
                        <tr
                          key={index}
                          // className={`${checkdata != undefined && "bg-gray-300"}`}
                        >
                          <td>
                            <Image
                              src={elem?.ProductImage[0]?.photo}
                              alt="nazaara main logo"
                              width={248}
                              height={248}
                              placeholder="blur"
                              blurDataURL={"/images/placeholder.png"}
                              className="w-[66px] h-[80px] rounded-md"
                            />
                          </td>
                          <td>{elem.id}</td>
                          <td>{elem.title}</td>
                          <td>{elem.Deatils.map((el) => el.main_category)}</td>
                          <td>
                            <span className="text-xl">৳</span>
                            {Math.floor(Number(elem.selling_price))}
                          </td>
                          <td>{elem?.ProductDetails?.quantity}</td>
                          {checkdata != undefined ? (
                            <td className="text-green-500 font-medium">
                              Stored
                            </td>
                          ) : (
                            <td className="text-red-500 font-medium">
                              Not stored
                            </td>
                          )}
                          <td>
                            {checkdata === undefined ? (
                              <Link
                                href={`/erp-products/${elem.id}`}
                                className="text-sm bg-secondary px-3 py-1 text-white rounded-lg"
                              >
                                Upload Product
                              </Link>
                            ) : (
                              <p className="text-sm bg-gray-500 px-3 py-1 text-white rounded-lg w-max cursor-not-allowed">
                                Already Added
                              </p>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={8}>
                        <div className="flex justify-center items-center h-[20vh]">
                          <span className="text-lg font-medium text-gray-500">
                            No products found
                          </span>
                        </div>
                      </td>
                    </tr>
                  )}
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
          </>
        )}
      </div>
    </div>
  );
};

export default ErpProducts;
