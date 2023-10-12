"use client";
import OutlineButton from "@/components/OutlineButton";
import PrimaryButton from "@/components/PrimaryButton";
import UtilityBtn from "@/components/UtilityBtn";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  AiOutlineDownload,
  AiOutlineShoppingCart,
  AiTwotoneDelete,
} from "react-icons/ai";

const OrderUpdate = ({ params }: any) => {
  const [orderData, setOrderData] = useState<any>();
  const fetchOrderData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/order/${params.orderId}`
      );
      setOrderData(response.data.data);
    } catch (error) {
      console.error("Request error:", error);
    }
  };

  useEffect(() => {
    fetchOrderData(); // Call the fetchOrderData function
  }, [params.orderId]);

  console.log("order data", orderData?.quantity);
  return (
    <div className="container">
      {orderData && (
        <>
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
          <div className="bg-basic rounded-lg px-6 py-3 flex flex-col gap-y-4">
            <div>
              <p className="py-2 bg-gray-200 w-full pl-2">Update Invoice</p>
              <div className="flex gap-x-4 w-full mt-3 border p-2">
                <div className="w-full">
                  <p className="font-medium mb-1">Invoice No</p>
                  <p className="text-sm">{orderData.paymentId}</p>
                </div>
                <div className="w-full">
                  <p className="font-medium mb-1">Issue Date</p>
                  <p className="text-sm">June 6, 2023</p>
                </div>
                <div className="w-full">
                  <p className="font-medium mb-1">Quantity</p>
                  <p className="text-sm">{orderData.quantity}</p>
                </div>
                <div className="w-full">
                  <p className="font-medium mb-1">Total Bill</p>
                  <p className="text-sm">{orderData.totalCost}</p>
                </div>
                <div className="w-full">
                  <p className="font-medium mb-1">Payment</p>
                  <p className="text-sm">10,000</p>
                </div>
                <div className="w-full">
                  <p className="font-medium mb-1">Due</p>
                  <p className="text-sm">8,000</p>
                </div>
                <div className="w-full">
                  <p className="font-medium mb-1">Discount</p>
                  <p className="text-sm">2,000</p>
                </div>
                <div className="w-full">
                  <p className="font-medium mb-1">VAT</p>
                  <p className="text-sm">2,000</p>
                </div>
                <div className="w-full">
                  <p className="font-medium mb-1">Coupon</p>
                  <p className="text-sm">PEIEHF</p>
                </div>
              </div>
            </div>
            {/* middel three section  */}
            <div className="grid grid-cols-3 gap-6">
              {/* start part  */}
              <div className="flex flex-col gap-y-4">
                <div className="flex items-center">
                  <label className="w-56" htmlFor="status">
                    *status:{" "}
                  </label>
                  <select
                    className="w-full border border-gray-400 rounded-sm p-1"
                    name="status"
                    id="status"
                  >
                    <option value="red">Factory Received</option>
                    <option value="red">On the delivery</option>
                    <option value="red">Factory Received</option>
                  </select>
                </div>
                <div className="flex">
                  <label className="w-56" htmlFor="status">
                    *status:{" "}
                  </label>
                  <p className="w-full">10%</p>
                </div>

                <div className="flex items-center">
                  <label className="w-56" htmlFor="status">
                    New Payment:
                  </label>
                  <input
                    className="block rounded-sm w-full px-2 py-1 border border-gray-400 focus:outline-none text-gray-500 mt-1"
                    id="name"
                    type="text"
                    placeholder="Input Here"
                  />
                </div>
                <div className="flex items-center">
                  <label className="w-56" htmlFor="payment">
                    Payment Method:
                  </label>
                  <select
                    className="w-full border border-gray-400 rounded-sm p-1 text-gray-500"
                    name="payment"
                    id="payment"
                  >
                    <option value="red">Cash</option>
                    <option value="red">Online</option>
                    <option value="red">Crypto</option>
                  </select>
                </div>

                <div className="flex items-center">
                  <label className="w-56" htmlFor="courier">
                    Courier:
                  </label>
                  <select
                    className="w-full border border-gray-400 rounded-sm p-1 text-gray-500"
                    name="courier"
                    id="courier"
                  >
                    <option value="red">Cash</option>
                    <option value="red">Online</option>
                    <option value="red">Crypto</option>
                  </select>
                </div>

                <div className="flex items-center">
                  <label className="w-56" htmlFor="deliveryCharge">
                    *Delivery Charge:
                  </label>
                  <input
                    className="block rounded-sm w-full px-2 py-1 border border-gray-400 focus:outline-none text-gray-500 mt-1"
                    id="deliveryCharge"
                    type="text"
                    placeholder="Input Here"
                  />
                </div>
                <div className="flex items-center">
                  <label className="w-56" htmlFor="deliveryCost">
                    *Delivery Cost:
                  </label>
                  <input
                    className="block rounded-sm w-full px-2 py-1 border border-gray-400 focus:outline-none text-gray-500 mt-1"
                    id="deliveryCost"
                    type="text"
                    placeholder="Input Here"
                  />
                </div>
                <div className="flex items-center">
                  <label className="w-56" htmlFor="deliveryDate">
                    *Delivery Date:
                  </label>
                  <input
                    className="block rounded-sm w-full px-2 py-1 border border-gray-400 focus:outline-none text-gray-500 mt-1"
                    id="deliveryDate"
                    type="date"
                    placeholder="Input Here"
                  />
                </div>

                <div className="flex items-center">
                  <label className="w-56" htmlFor="shippingAddress">
                    Shipping Address:
                  </label>
                  <input
                    className="block rounded-sm w-full px-2 py-1 border border-gray-400 focus:outline-none text-gray-500 mt-1"
                    id="shippingAddress"
                    type="text"
                    placeholder="Input Here"
                  />
                </div>
                <div className="flex items-center">
                  <label className="w-56" htmlFor="shippingAddress">
                    Remarks:
                  </label>
                  <textarea
                    className="block rounded-sm w-full px-2 py-1 border border-gray-400 focus:outline-none text-gray-500 mt-1"
                    id="shippingAddress"
                    placeholder="Input Here"
                  />
                </div>
              </div>
              {/* middle part  */}
              {/* <div className="bg-gray-200 px-5 py-3 rounded-lg flex flex-col gap-y-4">
            <div>
              <p className="text-lg font-medium">
                Enter barcode or product code to add new product
              </p>
              <input
                className="block rounded-sm w-full px-2 py-[3px] border border-gray-400 focus:outline-none text-gray-500 mt-1"
                type="text"
                placeholder="Input search text"
              />
            </div>
            <div>
              <div className="flex gap-2">
                <p className="flex-[6] font-medium">Product Details</p>
                <p className="flex-[3] font-medium">Quantity</p>
                <p className="flex-[3] font-medium">Price</p>
              </div>
              <div className="flex items-center gap-2 text-gray-500">
                <p className="flex-[6] text-sm">1. CT- MR/EEREUID21</p>
                <input
                  className="block rounded-sm w-full px-2 py-1 border border-gray-400 focus:outline-none text-gray-500 mt-1 flex-[3]"
                  type="text"
                  value={1}
                />
                <div className="flex flex-[3] gap-2 items-center">
                  <p>20000</p>
                  <AiTwotoneDelete color="red" />
                </div>
              </div>
            </div>
            <div>
              <div className="flex gap-2">
                <p className="flex-[6] font-medium">Service Details</p>
                <p className="flex-[3] font-medium">Quantity</p>
                <p className="flex-[3] font-medium">Price</p>
              </div>
              <div className="flex items-center gap-2 text-gray-500">
                <p className="flex-[6] text-sm">Free Stiching</p>
                <input
                  className="block rounded-sm w-full px-2 py-1 border border-gray-400 focus:outline-none text-gray-500 mt-1 flex-[3]"
                  type="text"
                  value={1}
                />
                <div className="flex flex-[3] gap-2 items-center">
                  <p>20000</p>
                  <AiTwotoneDelete color="red" />
                </div>
              </div>
            </div>
          </div> */}
              {/* end part  */}
              <div className="px-6">
                <p className="text-lg font-medium mb-4">History</p>
                <ol className="relative border-l border-gray-200 ml-2">
                  <li className="mb-10 ml-6 text-sm">
                    <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                      <svg
                        aria-hidden="true"
                        className="w-3 h-3 text-blue-800"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </span>
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-gray-900">
                        Updated by Md. Rasel
                      </h3>
                      <time className="block mb-2 text-sm font-normal leading-none text-gray-400">
                        2023-06-06 5.26 PM
                      </time>
                    </div>

                    <div className="flex justify-between">
                      <div className="flex gap-x-2">
                        <p className="text-sm font-normal text-gray-500">Tax</p>
                        <p>125.40</p>
                      </div>
                      <p>125.43252563452352</p>
                    </div>
                  </li>
                  <li className="mb-10 ml-6 text-sm">
                    <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                      <svg
                        aria-hidden="true"
                        className="w-3 h-3 text-blue-800"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </span>
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-gray-900">
                        Updated by Md. Rasel
                      </h3>
                      <time className="block mb-2 text-sm font-normal leading-none text-gray-400">
                        2023-06-06 5.26 PM
                      </time>
                    </div>

                    <div className="flex justify-between">
                      <div className="flex gap-x-2">
                        <p className="text-sm font-normal text-gray-500">Tax</p>
                        <p>125.40</p>
                      </div>
                      <p>125.43252563452352</p>
                    </div>
                  </li>
                  <li className="mb-10 ml-6 text-sm">
                    <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                      <svg
                        aria-hidden="true"
                        className="w-3 h-3 text-blue-800"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </span>
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-gray-900">
                        Updated by Md. Rasel
                      </h3>
                      <time className="block mb-2 text-sm font-normal leading-none text-gray-400">
                        2023-06-06 5.26 PM
                      </time>
                    </div>

                    <div className="flex justify-between">
                      <div className="flex gap-x-2">
                        <p className="text-sm font-normal text-gray-500">Tax</p>
                        <p>125.40</p>
                      </div>
                      <p>125.43252563452352</p>
                    </div>
                  </li>
                </ol>
              </div>
            </div>
            <div className="flex gap-x-2">
              <PrimaryButton name="Update" />
              <OutlineButton name="Cancel" />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default OrderUpdate;
