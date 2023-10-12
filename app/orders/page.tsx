"use client";
import CancelStatus from "@/components/CancelStatus";
import { useState } from "react";
import CompleteStatus from "@/components/CompleteStatus";
import OrderMeasurement from "@/components/OrderMeasurement";
import ProcessingStatus from "@/components/ProcessingStatus";
import UtilityBtn from "@/components/UtilityBtn";
import { AiOutlineDownload, AiOutlineShoppingCart } from "react-icons/ai";
import Link from "next/link";
import { useGetOrdersQuery } from "@/services/orderApi";
import Loader from "@/components/loader";
import { BiSolidEditAlt } from "react-icons/bi";
import { BsFillEyeFill } from "react-icons/bs";
import { FaRulerHorizontal } from "react-icons/fa";

function formatDate(inputDate: any) {
  const date = new Date(inputDate);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based, so add 1
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

const Orders = () => {
  const { data, isLoading } = useGetOrdersQuery();
  const [openModal, setOpenModal] = useState(false);

  const handleChange = (): void => {
    setOpenModal(true);
  };
  if (isLoading) return <Loader height="h-[85vh]" />;
  console.log("data", data);
  return (
    <>
      <div className="container">
        <div className="flex items-center justify-between mb-3">
          <div className="flex gap-2 items-center">
            <AiOutlineShoppingCart size={18} color="gray" />
            <span className="font-medium text-lg">Orders</span>
          </div>
          <UtilityBtn
            name="Export"
            icon={<AiOutlineDownload color="white" />}
          />
        </div>
        <div className="overflow-x-auto">
          <table className="table bg-basic">
            {/* head */}
            <thead className="">
              <tr>
                <th>Order date</th>
                <th>Customer</th>
                {/* <th>Product Quantity</th> */}
                <th>Price</th>
                <th>Delivery Status</th>
                <th>Payment Method</th>
                <th>Payment Status</th>

                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data?.data.map((el: any, i: number) => (
                <tr key={i}>
                  <td>{formatDate(el.createdAt)}</td>
                  <td>{el.user?.fullName || "nai"}</td>
                  {/* <td>{el.quantity}</td> */}

                  <td>{el.totalCost} BDT</td>
                  <td>
                    {/* <ProcessingStatus /> */}
                    <span className="bg-[#4d7c4d] text-white px-2 py-1 rounded-md">
                      {el.deliveryStatus}
                    </span>
                  </td>
                  <td>{el.paymentMethod}</td>
                  <td>
                    <span className="bg-[#32d632] text-white px-2 py-1 rounded-md">
                      {el.paymentStatus}
                    </span>
                  </td>

                  {/* <td>
                    <div>
                      <Link href="/orders/qeqweqw">
                        <button className="text-[#5B94FC]">Update</button>
                      </Link>
                      <span className="text-[#3b7ffd]"> | </span>
                      <button className="text-[#5B94FC]">View</button>
                    </div>
                    <label
                      htmlFor="my-modal-3"
                      onClick={() => handleChange()}
                      className="text-[#5B94FC] cursor-pointer"
                    >
                      Measurement
                    </label>
                  </td> */}

                  <td>
                    <div>
                      <Link href={`/orders/${el._id}`}>
                        <button className="text-[#5B94FC]">
                          <BiSolidEditAlt size={18} />
                        </button>
                      </Link>
                      <span className="text-[#3b7ffd]"> | </span>
                      <button className="text-[#5B94FC]">
                        <BsFillEyeFill size={18} />
                      </button>
                    </div>
                    <label
                      htmlFor="my-modal-3"
                      onClick={() => handleChange()}
                      className="text-[#5B94FC] cursor-pointer"
                    >
                      <FaRulerHorizontal size={18} />
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <OrderMeasurement openModal={openModal} />
    </>
  );
};

export default Orders;
