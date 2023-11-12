"use client";
import CustomerViewProfileDrawer from "@/components/CustomerViewProfileDrawer";
import UtilityBtn from "@/components/UtilityBtn";
import Loader from "@/components/Loader";
import { useGetUserByIdQuery, useGetUsersQuery } from "@/services/userApi";
import { useState } from "react";
import { AiOutlineDownload, AiOutlineShoppingCart } from "react-icons/ai";

const Customers = () => {
  const [selectedCustomerId, setSelectedCustomerId] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = (id: string) => {
    setIsOpen((prevState) => !prevState);
    setSelectedCustomerId(id);
  };

  const { data: customersData, isLoading } = useGetUsersQuery();

  return isLoading ? (
    <Loader height="h-[85vh]" />
  ) : (
    <div className="container">
      <div className="flex items-center justify-between mb-3">
        <div className="flex gap-2 items-center">
          <AiOutlineShoppingCart size={18} color="gray" />
          <span className="font-medium text-lg">All Customer</span>
        </div>
        <UtilityBtn name="Export" icon={<AiOutlineDownload color="white" />} />
      </div>
      <div className="overflow-x-auto">
        <table className="table bg-basic">
          {/* head */}
          <thead className="">
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {customersData?.data.map((cus, index) => {
              if (cus.userType === "user") {
                return (
                  <tr key={index}>
                    <td>{cus.fullName}</td>
                    <td>{cus.phone === "" ? "None" : cus.phone}</td>
                    <td>{cus.email}</td>
                    <td>
                      <button
                        onClick={() => toggleDrawer(cus._id)}
                        className="bg-secondary p-2 text-white rounded-md shadow-md"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
        <CustomerViewProfileDrawer
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          toggleDrawer={toggleDrawer}
          selectedCustomerId={selectedCustomerId}
        />
      </div>
    </div>
  );
};

export default Customers;
