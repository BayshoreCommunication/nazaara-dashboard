"use client";
import Product from "@/components/Product";
import UtilityBtn from "@/components/UtilityBtn";
import {
  useGetProductByIdQuery,
  useGetProductsQuery,
} from "@/services/productApi";
import Link from "next/link";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsPlus } from "react-icons/bs";

const Products = () => {
  const { data: allProductsData, isLoading: allProductsLoading } =
    useGetProductsQuery();
  const { data: singleProductData, isLoading: singleProductLoading } =
    useGetProductByIdQuery("649145ae57ee24fc54bb6f99");

  !allProductsLoading && console.log("getAllProductdata", allProductsData);
  !singleProductLoading &&
    console.log("getsingleProductdata", singleProductData);

  return (
    <div>
      <div className="container">
        <div className="flex items-center justify-between mb-3">
          <div className="flex gap-2 items-center">
            <AiOutlineShoppingCart size={18} color="gray" />
            <span className="font-medium text-lg">Products</span>
          </div>
          <Link href="products/add-product">
            <UtilityBtn name="Add Product" icon={<BsPlus color="white" />} />
          </Link>
        </div>
        {/* product component  */}
        <Product />
      </div>
    </div>
  );
};

export default Products;
