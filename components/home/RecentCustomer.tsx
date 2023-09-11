"use client";
import React, { useState } from "react";
import CustomerViewProfileDrawer from "../CustomerViewProfileDrawer";

const RecentCustomer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = (id: string) => {
    setIsOpen((prevState) => !prevState);
  };
  return (
    <div className="overflow-x-auto">
      <table className="table bg-basic">
        {/* head */}
        <thead className="">
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>
        {/* <tbody>
          <tr>
            <td>Anarkoli Dress</td>
            <td>01393933939</td>
            <td className="flex gap-2">
              <button onClick={toggleDrawer} className="text-[#5B94FC]">
                View Profile
              </button>
            </td>
          </tr>
        </tbody> */}
      </table>
      {/* <CustomerViewProfileDrawer
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        toggleDrawer={toggleDrawer}
        selectedCustomerId={selectedCustomerId}
      /> */}
    </div>
  );
};

export default RecentCustomer;
