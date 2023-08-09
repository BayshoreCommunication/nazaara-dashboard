"use client";
import UtilityBtn from "@/components/UtilityBtn";
import Loader from "@/components/loader";
import { useGetProductsQuery } from "@/services/productApi";
import { TErpData } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsPlus } from "react-icons/bs";

const ErpProducts = () => {
  const { data: productsData, isLoading: productsLoading } =
    useGetProductsQuery();

  const countstok = (variants: any[]) => {
    // Initialize the total stock count for the current product variant to 0
    let totalStock = 0;

    // Loop through each variant
    for (const variant of variants) {
      // Loop through each warehouse for the current variant and add the stock value to the totalStock
      for (const warehouse of variant.warehouse) {
        totalStock += warehouse.stock;
      }
    }
    return totalStock;
  };

  const [erpData, setErpData] = useState<TErpData>();
  const getData = async () => {
    try {
      const response = await fetch(
        "https://erp.anzaralifestyle.com/api/product/Details/?format=json&page=10&page_size=10"
      );
      const data = await response.json();
      setErpData(data);
    } catch (err) {
      console.log("error", err);
    }
  };

  const memoizedGetData = useMemo(() => getData, []);

  useEffect(() => {
    memoizedGetData();
  }, [memoizedGetData]);

  erpData &&
    console.log(
      "first",
      erpData.results.map((elem) => elem)
    );

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
                <th>Title</th>
                <th>Category</th>
                <th>Selling Price</th>
                <th>Stock</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {erpData?.results.map((elem, index) => (
                <tr key={index}>
                  <td>
                    <Image
                      src={elem.ProductImage[0].photo}
                      alt="nazara main logo"
                      width={248}
                      height={248}
                      className="w-[70px] h-[70px]"
                    />
                  </td>
                  <td>{elem.title}</td>
                  <td>{elem.Deatils.map((el) => el.main_category)}</td>
                  <td>
                    <span className="text-xl">৳</span>
                    {Math.floor(Number(elem.selling_price))}
                  </td>
                  <td>{elem.quantity}</td>
                  <td>
                    <Link
                      // href="/products/add-product"
                      href={`/products/add-product?data=${elem.id}`}
                      className="text-sm bg-secondary px-3 py-1 text-white rounded-lg"
                    >
                      Add Product
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ul className="flex -space-x-px text-sm justify-center mt-4">
          <li>
            <Link
              href="#"
              className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-200 bg-secondary border border-gray-100 rounded-l-lg hover:bg-secondary-hover hover:text-gray-100"
            >
              Previous
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
            >
              1
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
            >
              2
            </Link>
          </li>
          <li>
            <Link
              href="#"
              // aria-current="page"
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
            >
              3
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
            >
              4
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
            >
              5
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-200 bg-secondary border border-gray-100 rounded-e-lg hover:bg-secondary-hover hover:text-gray-100"
            >
              Next
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ErpProducts;
