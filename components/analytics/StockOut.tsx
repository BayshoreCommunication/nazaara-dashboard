"use client";
import Link from "next/link";
import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useGetStockOutQuery } from "@/services/productApi";
import Image from "next/image";
import Loader from "../Loader";

const StockOut = () => {
  const { data: productsData, isLoading: productLoading } =
    useGetStockOutQuery();
  console.log(productsData);
  return productLoading ? (
    <Loader height="h-[85vh]" />
  ) : (
    <div className="container">
      <div className="flex items-center justify-between mb-3">
        <div className="flex gap-2 items-center">
          <AiOutlineShoppingCart size={18} color="gray" />
          <span className="font-medium text-md">Stock Out Product</span>
        </div>
      </div>
      {/* product component  */}
      <div className="overflow-x-auto">
        <table className="table bg-basic">
          {/* head */}
          <thead className="">
            <tr>
              <th>Image</th>
              <th>Product Name</th>
              <th>Category</th>
              <th>Sub Category</th>
              <th>Sale Price</th>
              <th>Regular Price</th>
              <th>Stock</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {productsData?.product.map((elem, index) => (
              <tr key={index}>
                <td>
                  <Image
                    src={elem.variant[0].imageUrl[0]}
                    alt=""
                    width={60}
                    height={60}
                  />
                </td>
                <td>{elem.productName.substr(0, 15)}</td>
                <td>{elem.erpCategory}</td>
                <td>{elem.erpSubCategory}</td>
                <td>{elem.salePrice}</td>
                <td>{elem.regularPrice}</td>
                <td>{elem.stock}</td>
                <td>
                  <div>
                    <span className="text-[#3b7ffd]"> </span>
                    <Link
                      href={`/products/update-product/${elem._id}`}
                      className="text-[#5B94FC]"
                    >
                      Edit
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StockOut;
