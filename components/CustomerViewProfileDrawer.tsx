"use client";
// import component 👇
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import Drawer from "react-modern-drawer";

//import styles 👇
import "react-modern-drawer/dist/index.css";
import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";

interface IDrawer {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  toggleDrawer: () => void;
}

const CustomerViewProfileDrawer: React.FC<IDrawer> = ({
  setIsOpen,
  isOpen,
  toggleDrawer,
}) => {
  return (
    <>
      <button onClick={toggleDrawer}>Show</button>
      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction="right"
        className=""
        size={800}
      >
        <div className="p-6">
          <div className="flex justify-end">
            <FaTimes
              className="cursor-pointer"
              size={20}
              onClick={() => setIsOpen(false)}
            />
          </div>
          <p className="font-medium text-lg mb-6">Information</p>
          <div className="flex flex-col gap-y-6">
            <div className="flex flex-col gap-y-3">
              <p className="font-medium">Personal</p>
              <div className="flex flex-col gap-y-2">
                <p>Name: Shanto</p>
                <p>Phone: 0167240442</p>
                <p>Email: shanta54@gmail.com </p>
                <p>Type: Nazara Customer </p>
                <p>Address: Aftabnogor, Dhaka </p>
              </div>
              <p>Remarks:</p>
              <p>Nazara Invoice No: 100055</p>
              <div className="flex gap-2">
                <PrimaryButton name="Delete" />
                <SecondaryButton name="Edit" />
              </div>
            </div>
            <div className="my-3 flex flex-col gap-y-2 items-start">
              <p>Accounts Receivable: 8000</p>
              <p>History:</p>
              <PrimaryButton name="Print out" />
            </div>
            <div>
              <div className="overflow-x-auto">
                <table className="table border">
                  {/* head */}
                  <thead>
                    <tr>
                      <th>SL</th>
                      <th>Date</th>
                      <th>Invoice No</th>
                      <th>Total Qty</th>
                      <th>Total price</th>
                      <th>Paid amount</th>
                      <th>Due amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* row 1 */}
                    <tr>
                      <th>1</th>
                      <td>2023-6-6</td>
                      <td>6565745745</td>
                      <td>2</td>
                      <td>18000</td>
                      <td>10000</td>
                      <td>8000</td>
                    </tr>
                    {/* row 2 */}
                    <tr>
                      <th>Total</th>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>18000</td>
                      <td>10000</td>
                      <td>8000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default CustomerViewProfileDrawer;
