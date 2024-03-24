"use client";
import Link from "next/link";
import React, { useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useGetStockProductDtlsQuery } from "@/services/productApi";
import Image from "next/image";

const StockOut = () => {
  const [isSlice, setIsSlice] = useState(true);
  const { data: productsData } = useGetStockProductDtlsQuery();

  // console.log("products stock out", productsData);
  const slicedProduct = productsData?.product.slice(0, 10);
  // console.log("slicedProduct", slicedProduct);

  return (
    <div className="dynamic-container">
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
          {(productsData?.product?.length as any) > 0 ? (
            <tbody>
              {!isSlice && productsData && productsData?.product?.length > 0
                ? productsData?.product.map((elem: any) => (
                    <tr key={elem._id}>
                      <td>
                        <Image
                          // src={elem.variant[0].imageUrl[0]}
                          src={
                            elem.variant
                              .flatMap((v: any) => v.imageUrl)
                              .find((image: any) => image.isFeatured)?.image ||
                            elem.variant[0].imageUrl[0].image
                          }
                          alt="product image"
                          width={60}
                          height={60}
                        />
                      </td>
                      <td>{elem.productName.slice(0, 25)}</td>
                      <td>{elem.category}</td>
                      <td>{elem.subCategory}</td>
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
                  ))
                : slicedProduct?.map((elem: any) => (
                    <tr key={elem._id}>
                      <td>
                        <Image
                          // src={elem.variant[0].imageUrl[0]}
                          src={
                            elem.variant
                              .flatMap((v: any) => v.imageUrl)
                              .find((image: any) => image.isFeatured)?.image ||
                            elem.variant[0].imageUrl[0].image
                          }
                          alt=""
                          width={60}
                          height={60}
                        />
                      </td>
                      <td>{elem?.productName?.slice(0, 25)}</td>
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
          ) : (
            <tbody>
              <td>No Product Found!</td>
            </tbody>
          )}
        </table>
      </div>
      {slicedProduct && slicedProduct?.length > 10 && (
        <button
          onClick={() => setIsSlice(!isSlice)}
          className="text-xs font-medium text-secondary ml-4 mt-2"
        >
          {isSlice ? "SHOW ALL" : "SHOW LESS"}
        </button>
      )}
    </div>
  );
};

export default StockOut;
