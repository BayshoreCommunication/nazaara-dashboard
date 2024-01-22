"use client";
import Link from "next/link";
import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useGetTopOrdersProductQuery } from "@/services/orderApi";
import Image from "next/image";
import Loader from "../Loader";

const TopSellingProduct = () => {
  const { data: ordersData, isLoading: orderLoading } =
    useGetTopOrdersProductQuery();

  return orderLoading ? (
    <Loader height="h-[85vh]" />
  ) : (
    <div className="container">
      <div className="flex items-center justify-between mb-3">
        <div className="flex gap-2 items-center">
          <AiOutlineShoppingCart size={18} color="gray" />
          <span className="font-medium text-md">Top Selling Products</span>
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
              <th>Total Order</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {ordersData?.data.map((elem, i) => (
              <tr key={i}>
                <td>
                  <Image
                    src={elem.product[0].imgUrl}
                    alt=""
                    width={60}
                    height={60}
                    className="rounded-md"
                  />
                </td>
                <td>{`${elem.product[0].title.slice(0, 25)}...`}</td>
                <td>{elem.product.length}</td>
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

export default TopSellingProduct;
