import Image from "next/image";
import React from "react";
// import { Product } from "@/types/productTypes";
import Link from "next/link";
import SecondaryButton from "./SecondaryButton";
import { fetchServerSideData } from "./ServerSideDataFetching";
import { Product as ProductType } from "@/types/productTypes";
import placeHolderImg from "@/public/images/placeholder.png";

const Product = async () => {
  const url = `${process.env.API_URL}/api/v1/product?limit=10`;
  const productData: { product: ProductType[] } = await fetchServerSideData(
    url
  );
  console.log("product", productData.product[0].variant);

  return (
    <>
      {productData && productData?.product?.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table bg-basic">
            {/* head */}
            <thead>
              <tr>
                <th>Image</th>
                <th>Sku</th>
                <th>Web Category</th>
                <th>Web Sub-Category</th>
                <th>Regular Price</th>
                <th>Sale Price</th>
                <th>Stock</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* row */}
              {productData?.product?.map((product: any) => (
                <tr key={product._id}>
                  <td>
                    {product?.variant[0]?.imageUrl[0]?.image ? (
                      <Image
                        // src={product.variant[0].imageUrl[0]}
                        src={
                          product.variant
                            .flatMap((v: any) => v?.imageUrl)
                            .find((image: any) => image?.isFeatured)?.image ||
                          product?.variant[0]?.imageUrl[0]?.image
                        }
                        alt="product image"
                        width={248}
                        height={248}
                        className="w-[64px] h-[80px] rounded-lg"
                      />
                    ) : (
                      <Image
                        src={placeHolderImg}
                        alt="product image"
                        className="w-[64px] h-[80px] rounded-lg"
                      />
                    )}
                  </td>
                  <td>{product.sku}</td>
                  <td>{product.category}</td>
                  <td>{product.subCategory}</td>
                  <td>{product.regularPrice}</td>
                  <td>{product.salePrice}</td>
                  <td>{product.stock}</td>
                  <td
                    className={`${
                      product.status === "published"
                        ? "text-green-700"
                        : "text-secondary"
                    } font-semibold`}
                  >
                    {product.status}
                  </td>
                  <td>
                    <Link href={`/products/${product._id}`}>
                      <SecondaryButton name="Details" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="flex items-center justify-center w-full h-full">
          No Recent Products Found!
        </p>
      )}
    </>
  );
};

export default Product;
