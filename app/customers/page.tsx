"use client";
import CustomerViewProfileDrawer from "@/components/CustomerViewProfileDrawer";
import { useGetUserByIdQuery, useGetUsersQuery } from "@/services/userApi";
import { useState } from "react";

const Customers = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  const { data: allCustomersData, isLoading: allCustomersLoading } =
    useGetUsersQuery();
  const { data: singleCustomersData, isLoading: singleCustomersLoading } =
    useGetUserByIdQuery("6472e4d19eb4c3638c5f7e3f");

  allCustomersData && console.log("getsingleData", allCustomersData);
  singleCustomersData && console.log("getAllData", singleCustomersData);

  return (
    <div className="container">
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
            {/* row 1 */}
            <tr>
              <td>Nj Milon</td>
              <td>01303746940</td>
              <td>njmilon1@gmail.com</td>
              <td>
                <button onClick={toggleDrawer} className="text-[#5B94FC]">
                  View Profile
                </button>
              </td>
            </tr>
            <tr>
              <td>Frelancer Nasim</td>
              <td>01303746940</td>
              <td>frelancer@gmail.com</td>
              <td>
                <button onClick={toggleDrawer} className="text-[#5B94FC]">
                  View Profile
                </button>
              </td>
            </tr>
            <tr>
              <td>Nj Milon</td>
              <td>01303746940</td>
              <td>njmilon1@gmail.com</td>
              <td>
                <button onClick={toggleDrawer} className="text-[#5B94FC]">
                  View Profile
                </button>
              </td>
            </tr>
            <tr>
              <td>Frelancer Nasim</td>
              <td>01303746940</td>
              <td>frelancer@gmail.com</td>
              <td>
                <button onClick={toggleDrawer} className="text-[#5B94FC]">
                  View Profile
                </button>
              </td>
            </tr>
            <tr>
              <td>Nj Milon</td>
              <td>01303746940</td>
              <td>njmilon1@gmail.com</td>
              <td>
                <button onClick={toggleDrawer} className="text-[#5B94FC]">
                  View Profile
                </button>
              </td>
            </tr>
            <tr>
              <td>Frelancer Nasim</td>
              <td>01303746940</td>
              <td>frelancer@gmail.com</td>
              <td>
                <button onClick={toggleDrawer} className="text-[#5B94FC]">
                  View Profile
                </button>
              </td>
            </tr>
            <tr>
              <td>Nj Milon</td>
              <td>01303746940</td>
              <td>njmilon1@gmail.com</td>
              <td>
                <button onClick={toggleDrawer} className="text-[#5B94FC]">
                  View Profile
                </button>
              </td>
            </tr>
            <tr>
              <td>Esha Mia</td>
              <td>01303746940</td>
              <td>sha@gmail.com</td>
              <td>
                <button onClick={toggleDrawer} className="text-[#5B94FC]">
                  View Profile
                </button>
              </td>
            </tr>
            <tr>
              <td>Nj Milon</td>
              <td>01303746940</td>
              <td>njmilon1@gmail.com</td>
              <td>
                <button onClick={toggleDrawer} className="text-[#5B94FC]">
                  View Profile
                </button>
              </td>
            </tr>
            <tr>
              <td>Head of Design</td>
              <td>01303746940</td>
              <td>head@gmail.com</td>
              <td>
                <button className="text-[#5B94FC]">View Profile</button>
              </td>
            </tr>
            <tr>
              <td>Esha Mia</td>
              <td>01303746940</td>
              <td>sha@gmail.com</td>
              <td>
                <button className="text-[#5B94FC]">View Profile</button>
              </td>
            </tr>
            <tr>
              <td>Nj Milon</td>
              <td>01303746940</td>
              <td>njmilon1@gmail.com</td>
              <td>
                <button className="text-[#5B94FC]">View Profile</button>
              </td>
            </tr>
            <tr>
              <td>Head of Design</td>
              <td>01303746940</td>
              <td>head@gmail.com</td>
              <td>
                <button className="text-[#5B94FC]">View Profile</button>
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
    </div>
  );
};

export default Customers;
