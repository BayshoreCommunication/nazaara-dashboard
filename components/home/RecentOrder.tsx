import React from "react";
import SecondaryButton from "../SecondaryButton";
import PrimaryButton from "../PrimaryButton";
import Link from "next/link";
import { Order } from "@/types/orderType";

const RecentOrder = ({
  orderData,
}: {
  orderData: Order;
}): React.ReactElement => {
  console.log("orderfdfdf", orderData);

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
          <tr>
            <td>Anarkoli Dress</td>
            <td>1</td>
            <td>May, 29 2023</td>
            <td className="flex gap-2">
              <Link href="/orders/aswfasda">
                <SecondaryButton name="Edit" />
              </Link>
              <PrimaryButton name="Delete" />
            </td>
          </tr>
        </tbody>
      </table>
      {/* <CustomerViewProfileDrawer
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          toggleDrawer={toggleDrawer}
        /> */}
    </div>
  );
};

export default RecentOrder;
