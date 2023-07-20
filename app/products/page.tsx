"use client";
import UtilityBtn from "@/components/UtilityBtn";
import { useGetProductsQuery } from "@/services/productApi";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsPlus } from "react-icons/bs";

const Products = () => {
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
        <div className="overflow-x-auto">
          <table className="table bg-basic">
            {/* head */}
            <thead className="">
              <tr>
                <th>Image</th>
                <th>Product Name</th>
                <th>Category</th>
                <th>Product Code</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {productsData?.data.map((elem, index) => (
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
                  <td>{elem.productName}</td>
                  <td>{elem.category}</td>
                  <td>{elem.subCategory}</td>
                  <td>{elem.salePrice}</td>
                  <td>{countstok(elem.variant)}</td>
                  <td>
                    <div>
                      <button className="text-[#5B94FC]">Image</button>
                      <span className="text-[#3b7ffd]"> | </span>
                      <button className="text-[#5B94FC]">Edit</button>
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

export default Products;
