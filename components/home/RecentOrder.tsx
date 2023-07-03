import React from "react";
import SecondaryButton from "../SecondaryButton";
import PrimaryButton from "../PrimaryButton";
import Link from "next/link";

const RecentOrder = () => {
  return (
    <div className="overflow-x-auto">
      <table className="table bg-basic">
        {/* head */}
        <thead className="">
          <tr>
            <th>Item</th>
            <th>Quantity</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
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
