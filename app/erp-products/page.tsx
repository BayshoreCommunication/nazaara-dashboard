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
      erpData.results.map((elem) => elem.Color)
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
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {erpData?.results.map((elem, index) => (
                <tr key={index}>
                  <td>
                    <Image
                      src="/images/container.png"
                      alt="nazara main logo"
                      width={248}
                      height={248}
                      className="w-[70px] h-[70px]"
                    />
                  </td>
                  <td>{elem.title}</td>
                  <td>{elem.Deatils.map((el) => el.main_category)}</td>
                  <td>{elem.selling_price}</td>
                  <td>{elem.quantity}</td>
                  <td></td>
                  <td>
                    <div>
                      <Link
                        href={{
                          pathname: "/erp-products/image-upload",
                          query: { id: `${elem.id}` },
                        }}
                        className="text-[#5B94FC]"
                      >
                        Image
                      </Link>
                      <span className="text-[#3b7ffd]"> | </span>
                      <Link
                        href={{
                          pathname: "/products/update-product",
                          query: { id: `${elem.id}` },
                        }}
                        className="text-[#5B94FC]"
                      >
                        Edit
                      </Link>
                    </div>
                    <button className="text-[#5B94FC]">Quick View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ErpProducts;
