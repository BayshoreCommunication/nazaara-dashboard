"use client";
import UtilityBtn from "@/components/UtilityBtn";
import Loader from "@/components/loader";
import { useGetProductsQuery } from "@/services/productApi";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsPlus } from "react-icons/bs";

const Products = () => {
  const { data: productsData, isLoading: productsLoading } =
    useGetProductsQuery();
  return productsLoading ? (
    <Loader height="h-[85vh]" />
  ) : (
    <div className="container">
      <div className="flex items-center justify-between mb-3">
        <div className="flex gap-2 items-center">
          <AiOutlineShoppingCart size={18} color="gray" />
          <span className="font-medium text-lg">Products</span>
        </div>
        <Link href="/products/add-product">
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
              <th>Sub Category</th>
              <th>Sale Price</th>
              <th>Stock</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {productsData?.product.map((elem, index) => (
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
                <td>{elem.stock}</td>
                <td>
                  <div>
                    <Link
                      href={{
                        pathname: "/products/image-upload",
                        query: { id: `${elem._id}` },
                      }}
                      className="text-[#5B94FC]"
                    >
                      Image
                    </Link>
                    <span className="text-[#3b7ffd]"> | </span>
                    <Link
                      href={{
                        pathname: "/products/update-product",
                        query: { id: `${elem._id}` },
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
  );
};

export default Products;
