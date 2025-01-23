"use client";
// import UtilityBtn from "@/components/UtilityBtn";
import Loader from "@/components/Loader";
import {
  useGetProductsQuery,
  useDeleteProductMutation,
} from "@/services/productApi";
// import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import Swal from "sweetalert2";
import { useState } from "react";
import { AiFillProduct, AiOutlineShoppingCart } from "react-icons/ai";
// import Fuse from "fuse.js";
import axios from "axios";
import toast from "react-hot-toast";
import { BeatLoader } from "react-spinners";

const Products: any = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  // const [searchText, setSearchText] = useState(""); // it manipulate search text
  // const [searchData, setSearchData] = useState([]); // it manipulate found searched data
  const [searchedProduct, setSearchedProduct] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);

  // console.log("search text", searchText, "search data", searchData);

  const {
    data: productsData,
    isLoading: productsLoading,
    error: productsError,
  } = useGetProductsQuery({ page: currentPage, limit: 10 });

  // const { data: productSearchData } = useGetProductsQuery({
  //   page: 1,
  //   limit: 0,
  // });

  // console.log("products data", productsData);

  // useEffect(() => {
  //   const fuseOptions = {
  //     // isCaseSensitive: false,
  //     // includeScore: false,
  //     // shouldSort: true,
  //     // includeMatches: false,
  //     // findAllMatches: false,
  //     // minMatchCharLength: 1,
  //     // location: 0,
  //     //threshold: 0.6, // 0.6 means it show similar search item
  //     threshold: 0.1, // 0.1 means it match with exact string
  //     // distance: 100,
  //     // useExtendedSearch: false,
  //     // ignoreLocation: false,
  //     // ignoreFieldNorm: false,
  //     // fieldNormWeight: 1,
  //     keys: ["erpId", "sku", "category", "subCategory", "status"],
  //   };
  //   const fuse = new Fuse(productSearchData?.product as any, fuseOptions);
  //   if (searchText) {
  //     const currentSearchData = fuse.search(searchText);
  //     setSearchData(currentSearchData as any);
  //   }
  // }, [productSearchData?.product, searchText]);

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
        const productDel = await deleteProduct(id);
        if (productDel) {
          Swal.fire("Deleted!", "Your product has been deleted.", "success");
        }
      }
    });
  };

  const tableComponent = () => {
    if (productsData?.product?.length === 0) {
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
      return (
        <>
          {searchedProduct ? (
            <tr>
              <td>
                {searchedProduct.variant[0].imageUrl.length > 0 ? (
                  <Image
                    src={
                      searchedProduct.variant
                        .flatMap((v: any) => v.imageUrl)
                        .find((image: any) => image.isFeatured)?.image ||
                      searchedProduct.variant[0].imageUrl[0].image
                    }
                    alt="nazaara main logo"
                    width={248}
                    height={248}
                    placeholder="blur"
                    blurDataURL={"/images/placeholder.png"}
                    className="min-w-[66px] max-w-[66px] min-h-[80px] rounded-md"
                  />
                ) : (
                  <Image
                    src="/images/no-image.jpg"
                    alt="nazaara main logo"
                    width={248}
                    height={248}
                    placeholder="blur"
                    blurDataURL={"/images/placeholder.png"}
                    className="w-[66px] h-[80px] rounded-md"
                  />
                )}
              </td>
              <td>{searchedProduct.erpId}</td>
              <td>{searchedProduct.sku}</td>
              <td>{searchedProduct.erpCategory}</td>
              <td>{searchedProduct.erpSubCategory}</td>
              <td>{searchedProduct.category.title}</td>
              <td>{searchedProduct.subCategory.title}</td>
              <td>
                <span className="text-xl">৳</span>
                {searchedProduct.regularPrice}
              </td>
              <td>
                <span className="text-xl">৳</span>
                {searchedProduct.salePrice}
              </td>
              <td>{searchedProduct.stock}</td>
              {searchedProduct.preOrder ? (
                <td className="font-semibold text-green-600">Available</td>
              ) : (
                <td className="text-red-600 font-semibold">Unavailable</td>
              )}
              {(searchedProduct.stock === 0 && !searchedProduct.preOrder) ||
              searchedProduct.status === "draft" ? (
                <td>
                  <span className="bg-red-600 font-medium text-white px-3 py-[1px] text-[12px] rounded-full">
                    NO
                  </span>{" "}
                </td>
              ) : (
                <td>
                  <span className="bg-green-600 font-medium text-white px-3 py-[1px] text-[12px] rounded-full">
                    YES
                  </span>
                </td>
              )}

              <td
                className={`font-medium ${
                  searchedProduct.status === "published"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {searchedProduct.status}
              </td>
              <td>
                <div className="flex gap-2">
                  <Link
                    href={{
                      pathname: "/products/image-upload",
                      query: { id: `${searchedProduct._id}` },
                    }}
                    className="text-white bg-red-800 py-1 px-2 rounded-md shadow-md text-xs"
                  >
                    Edit Image
                  </Link>
                  <Link
                    href={`/products/update-product/${searchedProduct._id}`}
                    className="text-white bg-red-800 py-1 px-2 rounded-md shadow-md text-xs"
                  >
                    Edit Details
                  </Link>
                  <button
                    onClick={() => handleDelete(searchedProduct._id as string)}
                    className="text-white bg-red-800 py-1 px-2 rounded-md shadow-md text-xs"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ) : (
            <>
              {productsData?.product?.map((elem: any) => (
                <tr key={elem._id}>
                  <td>
                    {elem.variant[0].imageUrl.length > 0 ? (
                      <Image
                        src={
                          elem.variant
                            .flatMap((v: any) => v.imageUrl)
                            .find((image: any) => image.isFeatured)?.image ||
                          elem.variant[0].imageUrl[0].image
                        }
                        alt="nazaara main logo"
                        width={248}
                        height={248}
                        placeholder="blur"
                        blurDataURL={"/images/placeholder.png"}
                        className="min-w-[66px] max-w-[66px] min-h-[80px] rounded-md"
                      />
                    ) : (
                      <Image
                        src="/images/no-image.jpg"
                        alt="nazaara main logo"
                        width={248}
                        height={248}
                        placeholder="blur"
                        blurDataURL={"/images/placeholder.png"}
                        className="w-[66px] h-[80px] rounded-md"
                      />
                    )}
                  </td>
                  <td>{elem.erpId}</td>
                  <td>{elem.sku}</td>
                  <td>{elem.erpCategory}</td>
                  <td>{elem.erpSubCategory}</td>
                  <td>{elem.category}</td>
                  <td>{elem.subCategory}</td>
                  <td>
                    <span className="text-xl">৳</span>
                    {elem.regularPrice}
                  </td>
                  <td>
                    <span className="text-xl">৳</span>
                    {elem.salePrice}
                  </td>
                  <td>{elem.stock}</td>
                  {elem.preOrder ? (
                    <td className="font-semibold text-green-600">Available</td>
                  ) : (
                    <td className="text-red-600 font-semibold">Unavailable</td>
                  )}
                  {(elem.stock === 0 && !elem.preOrder) ||
                  elem.status === "draft" ? (
                    <td>
                      <span className="bg-red-600 font-medium text-white px-3 py-[1px] text-[12px] rounded-full">
                        NO
                      </span>{" "}
                    </td>
                  ) : (
                    <td>
                      <span className="bg-green-600 font-medium text-white px-3 py-[1px] text-[12px] rounded-full">
                        YES
                      </span>
                    </td>
                  )}

                  <td
                    className={`font-medium ${
                      elem.status === "published"
                        ? "text-green-500"
                        : "text-red-500"
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
                        className="text-white bg-red-800 py-1 px-2 rounded-md shadow-md text-xs"
                      >
                        Edit Image
                      </Link>
                      <Link
                        href={`/products/update-product/${elem._id}`}
                        className="text-white bg-red-800 py-1 px-2 rounded-md shadow-md text-xs"
                      >
                        Edit Details
                      </Link>
                      <button
                        onClick={() => handleDelete(elem._id as string)}
                        className="text-white bg-red-800 py-1 px-2 rounded-md shadow-md text-xs"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </>
          )}
        </>
      );
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

  const handleSearch = async () => {
    setSearchedProduct(null);
    setSearchLoading(true);

    if (!searchQuery.trim()) {
      toast.error("Please enter a product ID or SKU.");
      setSearchLoading(false);
      return;
    }

    try {
      const response = await axios.get(
        `${process.env.API_URL}/api/v1/product/search`,
        {
          params: searchQuery.match(/^[0-9a-fA-F]{24}$/)
            ? { _id: searchQuery }
            : { sku: searchQuery },

          headers: {
            Authorization: `Nazaara@Token ${process.env.API_SECURE_KEY}`,
          },
        }
      );
      // console.log("response", response.data);
      setSearchLoading(false);
      setSearchedProduct(response.data);
    } catch (err: any) {
      setSearchLoading(false);
      toast.error(err.response?.data?.message || "Error fetching product.");
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setSearchedProduct(null);
  };

  return (
    <>
      {productsLoading ? (
        <Loader height="h-[90vh]" />
      ) : (
        <div className="dynamic-container">
          <div className="flex items-center justify-between mb-1">
            <div className="flex gap-2 items-center mb-2">
              <AiOutlineShoppingCart size={18} color="gray" />
              <span className="font-medium text-lg">Products</span>
            </div>
            <small className="text-red-600 font-medium">
              *search through (sku) only
            </small>
            {/* search user  */}
            {/* <div className="flex items-center gap-2">
              <div>
                <label
                  htmlFor="search"
                  className="text-sm text-gray-600 font-semibold"
                >
                  Search:{" "}
                </label>
                <input
                  type="text"
                  id="search"
                  onChange={(e) => setSearchText(e.target.value)}
                  className="border border-gray-300 outline-none hover:outline-none px-2 py-1 rounded-md text-gray-600 text-sm"
                />
              </div>
            </div> */}
            <div className="flex items-center gap-1">
              <div className="flex items-center ">
                <input
                  type="text"
                  className="border border-r-0 border-gray-400 px-2 rounded-l w-44 text-sm py-1 focus:outline-none focus:border-gray-500"
                  placeholder="Search Product SKU"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  onClick={handleSearch}
                  className="bg-secondary text-white w-16 py-[5px] rounded-r text-sm"
                >
                  {searchLoading ? (
                    <BeatLoader color="white" size={8} />
                  ) : (
                    "Search"
                  )}
                </button>
              </div>
              <button
                style={{ backgroundColor: "red" }}
                onClick={handleClearSearch}
                className=" text-white px-3 py-[5px] rounded text-sm font-semibold"
              >
                X
              </button>
            </div>
          </div>
          <button className="bg-secondary py-1 px-4 rounded-md text-white mb-4">
            <Link
              href={"/products/create-product"}
              className="flex items-center gap-2"
            >
              <AiFillProduct size={18} />
              Create New Product
            </Link>
          </button>
          {/* product component  */}
          <div className="overflow-x-auto">
            <table className="table bg-basic">
              {/* head */}
              <thead className="">
                <tr>
                  <th>Image</th>
                  <th>Erp ID</th>
                  <th>Sku</th>
                  <th>Erp-Category</th>
                  <th>Erp-SubCategory</th>
                  <th>Web-Category</th>
                  <th>Web-SubCategory</th>
                  <th>Regular Price</th>
                  <th>Sale Price</th>
                  <th>Stock</th>
                  <th>Pre-Order</th>
                  <th>Web Visibility</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>{tableComponent()}</tbody>
            </table>
          </div>
          {!searchedProduct && (
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
          )}
        </div>
      )}
    </>
  );
};

export default Products;
