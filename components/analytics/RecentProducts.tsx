"use client";
import { useGetProductsQuery } from "@/services/productApi";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Loader from "../Loader";

const RecentProducts = () => {
  const { data: productsData, isLoading: productsLoading } =
    useGetProductsQuery({ page: 1, limit: 8 });

  return productsLoading ? (
    <Loader height="h-[85vh]" />
  ) : (
    <div className="dynamic-container">
      <div className="flex items-center justify-between mb-3">
        <div className="flex gap-2 items-center">
          <AiOutlineShoppingCart size={18} color="gray" />
          <span className="font-medium text-lg">Recent Products</span>
        </div>
        {/* <Link href="/products/add-product">
      <UtilityBtn name="Add Product" icon={<BsPlus color="white" />} />
    </Link> */}
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
              <tr key={elem._id}>
                <td>
                  <Image
                    src={elem.variant[0].imageUrl[0]}
                    alt=""
                    width={60}
                    height={60}
                  />
                </td>
                <td>{elem.productName.slice(0, 15)}</td>
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentProducts;
