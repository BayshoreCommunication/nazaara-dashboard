import React from "react";
import SecondaryButton from "../SecondaryButton";
import Link from "next/link";
import { Order } from "@/types/orderType";
import { formatDate } from "@/helpers/formatDate";
interface RecentOrderProps {
  orderData: Order[];
}
const RecentOrder = ({ orderData }: RecentOrderProps): React.ReactElement => {
  return (
    <div className="overflow-x-auto">
      <table className="table bg-basic">
        {/* head */}
        <thead className="">
          <tr>
            <th>Sku</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {/* row need to map order data*/}
          {orderData.map((data) => (
            <tr key={data._id}>
              <td className="flex gap-2 flex-wrap">
                {data.product.map((product) => (
                  <span className="border bg-gray-300 px-1" key={product._id}>
                    {product.sku}
                  </span>
                ))}
              </td>
              <td>
                {data.product.reduce((sum, item) => sum + item.quantity, 0)}
              </td>
              <td>
                <span className="text-xl">৳</span>
                {` ${data.totalAmount}/-`}
              </td>
              <td>{formatDate(data.createdAt)}</td>
              <td>
                <Link href={`/orders/${data._id}`}>
                  <SecondaryButton name="Details" />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentOrder;
