"use client";
import React, { useState } from "react";
import CustomerViewProfileDrawer from "../CustomerViewProfileDrawer";

const RecentCustomer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => {
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
        <tbody>
          <tr>
            <td>Anarkoli Dress</td>
            <td>01393933939</td>
            <td className="flex gap-2">
              <button onClick={toggleDrawer} className="text-[#5B94FC]">
                View Profile
              </button>
            </td>
          </tr>
          <tr>
            <td>Anarkoli Dress</td>
            <td>01393933939</td>
            <td className="flex gap-2">
              <button onClick={toggleDrawer} className="text-[#5B94FC]">
                View Profile
              </button>
            </td>
          </tr>
          <tr>
            <td>Anarkoli Dress</td>
            <td>01393933939</td>
            <td className="flex gap-2">
              <button onClick={toggleDrawer} className="text-[#5B94FC]">
                View Profile
              </button>
            </td>
          </tr>
          <tr>
            <td>Anarkoli Dress</td>
            <td>01393933939</td>
            <td className="flex gap-2">
              <button onClick={toggleDrawer} className="text-[#5B94FC]">
                View Profile
              </button>
            </td>
          </tr>
          <tr>
            <td>Anarkoli Dress</td>
            <td>01393933939</td>
            <td className="flex gap-2">
              <button className="text-blue-500">View Profile</button>
            </td>
          </tr>
        </tbody>
      </table>
      <CustomerViewProfileDrawer
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        toggleDrawer={toggleDrawer}
      />
    </div>
  );
};

export default RecentCustomer;
