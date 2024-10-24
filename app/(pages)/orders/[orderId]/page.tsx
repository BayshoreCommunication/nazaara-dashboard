"use client";
import Loader from "@/components/Loader";
import Image from "next/image";
import OrderMeasurement from "@/components/OrderMeasurement";
import { formatDate } from "@/helpers/formatDate";
import { formatYearMonthDay } from "@/helpers/formatYearMonthDay";
import { getAuthenticateUserInfo } from "@/helpers/getAuthenticateUser";
import {
  useGetOrderByIdQuery,
  useUpdateOrderMutation,
} from "@/services/orderApi";
import { useReactToPrint } from "react-to-print";

import { useEffect, useRef, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaFileInvoice, FaInstagram, FaRulerHorizontal } from "react-icons/fa";
import Swal from "sweetalert2";
import invoiceImg from "@/public/images/nazaara-invoice-croped-logo.png";
import { IoMdPrint } from "react-icons/io";
import { RiFacebookCircleLine } from "react-icons/ri";
import {
  IoLocationOutline,
  IoLocationSharp,
  IoMailOutline,
} from "react-icons/io5";
import { TbWorldWww } from "react-icons/tb";

const OrderUpdate = ({ params }: any) => {
  const [openSizeChartModal, setOpenSizeChartModal] = useState(false);
  const [sizeChartId, setSizeChartId] = useState("");
  const [uniqId, setUniqId] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [shippingAddressData, setShippingAddressData] = useState({
    paymentMethod: "",
    shippingMethod: "",
    subTotal: 0,
    vatIncluded: 0,
    shippingCharge: 0,
    totalAmount: 0,
    discountAmount: 0,
    totalPay: 0,
    due: 0,
    paymentStatus: "",
    deliveryStatus: "",
    shippingAddress: {
      fullName: "",
      phone: "",
      city: "",
      country: "",
      street: "",
      postalCode: "",
      details: "",
    },
    remark: "",
    updateHistory: [
      {
        updatedBy: "",
        updatedAt: new Date(),
      },
    ],
  });

  const invoiceRef = useRef<HTMLDivElement>(null);
  const invoicePrintFn = useReactToPrint({ contentRef: invoiceRef });

  const { data: orderData, isLoading } = useGetOrderByIdQuery(params.orderId);

  const [updateOrder] = useUpdateOrderMutation();

  useEffect(() => {
    if (orderData && orderData.data) {
      setShippingAddressData({
        paymentMethod: orderData.data.paymentMethod,
        shippingMethod: orderData.data.shippingMethod,
        subTotal: orderData.data.subTotal,
        vatIncluded: orderData.data.vatIncluded,
        shippingCharge: orderData.data.shippingCharge,
        totalAmount: orderData.data.totalAmount,
        discountAmount: orderData.data.discountAmount,
        totalPay: orderData.data.totalPay,
        due: orderData.data.due,
        paymentStatus: orderData.data.paymentStatus,
        deliveryStatus: orderData.data.deliveryStatus,
        shippingAddress: {
          fullName: orderData.data.shippingAddress.fullName || "",
          phone: orderData.data.shippingAddress.phone || "",
          city: orderData.data.shippingAddress.city || "",
          country: orderData.data.shippingAddress.country || "",
          street: orderData.data.shippingAddress.street || "",
          postalCode: orderData.data.shippingAddress.postalCode || "",
          details: orderData.data.shippingAddress.details || "",
        },
        remark: orderData.data.remark || "",
        updateHistory:
          orderData?.data?.updateHistory?.map((history: any) => ({
            updatedBy: history.updatedBy,
            updatedAt: history.updatedAt,
          })) || [],
      });
    }
  }, [orderData]);

  // console.log("order data bal", orderData);

  if (isLoading) {
    return <Loader height="h-[50vh]" />;
  }

  const handleSizeChart = (id: string, uniqId: string) => {
    setOpenSizeChartModal(true);
    setSizeChartId(id);
    setUniqId(uniqId);
  };

  // console.log("order data 44", orderData);

  // console.log("shipping address data from state", shippingAddressData);

  const authenticateUserInfo = getAuthenticateUserInfo();
  // console.log("authenticate user info", authenticateUserInfo);

  const handleShippingUpdate = async (e: any) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const updatedShippingResponse = await updateOrder({
            id: params.orderId,
            payload: {
              paymentMethod: shippingAddressData.paymentMethod,
              shippingMethod: shippingAddressData.shippingMethod,
              subTotal: shippingAddressData.subTotal,
              vatIncluded: shippingAddressData.vatIncluded,
              shippingCharge: shippingAddressData.shippingCharge,
              totalAmount: shippingAddressData.totalAmount,
              discountAmount: shippingAddressData.discountAmount,
              totalPay: shippingAddressData.totalPay,
              due: shippingAddressData.due,
              paymentStatus: shippingAddressData.paymentStatus,
              deliveryStatus: shippingAddressData.deliveryStatus,
              shippingAddress: {
                fullName: shippingAddressData.shippingAddress.fullName,
                phone: shippingAddressData.shippingAddress.phone,
                city: shippingAddressData.shippingAddress.city,
                country: shippingAddressData.shippingAddress.country,
                street: shippingAddressData.shippingAddress.street,
                postalCode: shippingAddressData.shippingAddress.postalCode,
                details: shippingAddressData.shippingAddress.details,
              },
              remark: shippingAddressData.remark,
              updateHistory: [
                ...shippingAddressData.updateHistory,
                {
                  updatedAt: new Date(),
                  updatedBy: authenticateUserInfo._id,
                },
              ],
            },
          }).unwrap();

          // console.log("updated Shipping Response", updatedShippingResponse);

          if (updatedShippingResponse?.success) {
            Swal.fire(
              "Updated!",
              "Shipping address has been updated.",
              "success"
            );
          } else {
            throw new Error("Shipping address update failed.");
          }
        } catch (error) {
          Swal.fire(
            "Error!",
            "Failed to update shipping address.Please recheck and try again..",
            "error"
          );
        }
      }
    });
  };

  const visibleHistory = showAll
    ? orderData?.data?.updateHistory
    : orderData?.data?.updateHistory?.slice(0, 5);

  console.log("orderData?.data", orderData?.data);

  return (
    <div className="dynamic-container">
      {orderData && (
        <>
          <div className="flex items-center justify-between mb-3">
            <div className="flex gap-2 items-center">
              <AiOutlineShoppingCart size={18} color="gray" />
              <span className="font-medium text-lg">Orders</span>
            </div>
            <label
              htmlFor="invoice-model"
              // onClick={() => handleSizeChart(el?.sizeChart?._id, el._id)}
              className="text-[#5B94FC] cursor-pointer flex items-center gap-[2px] text-sm font-semibold"
            >
              <FaFileInvoice size={14} className="mt-[2px]" /> Invoice
            </label>
          </div>
          <div className="bg-basic rounded-lg px-6 py-3 flex flex-col gap-y-4">
            <div>
              <p className="py-2 bg-gray-200 w-full pl-2 font-semibold">
                Update Order
              </p>
              <div className="w-full mt-3 border p-2">
                <div className="flex flex-wrap gap-4 justify-between border mb-3 p-2">
                  <div className="">
                    <p className="font-semibold mb-1">Order Id</p>
                    <p className="text-sm text-gray-600 font-medium">
                      {orderData.data.transactionId}
                    </p>
                  </div>
                  <div className="">
                    <p className="font-semibold mb-1">Issue Date</p>
                    <p className="text-sm text-gray-600 font-medium">
                      {formatDate(orderData.data.createdAt as Date)}
                    </p>
                  </div>
                  <div className="">
                    <p className="font-semibold mb-1">Payment Method</p>
                    <p className="text-sm text-gray-600 font-medium">
                      {orderData.data.paymentMethod}
                    </p>
                  </div>
                  <div className="">
                    <p className="font-semibold mb-1">Payment Status</p>
                    <p className="text-sm text-gray-600 font-medium">
                      {orderData.data.paymentStatus}
                    </p>
                  </div>
                  <div className="">
                    <p className="font-semibold mb-1">Shipping Method</p>
                    <p className="text-sm text-gray-600 font-medium">
                      {orderData.data.shippingMethod}
                    </p>
                  </div>
                  <div className="">
                    <p className="font-semibold mb-1">Sub-Total</p>
                    <p className="text-sm text-gray-600 font-medium">
                      {orderData.data.subTotal}/-
                    </p>
                  </div>
                  <div className="">
                    <p className="font-semibold mb-1">Vat Included</p>
                    <p className="text-sm text-gray-600 font-medium">
                      {orderData.data.vatIncluded}/-
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-4 justify-between border p-2">
                  <div className="">
                    <p className="font-medium mb-1">Shipping Charge</p>
                    <p className="text-sm text-gray-600 font-medium">
                      {orderData.data.shippingCharge}/-
                    </p>
                  </div>
                  <div className="">
                    <p className="font-medium mb-1">Total Bill</p>
                    <p className="text-sm text-gray-600 font-medium">
                      {orderData.data.totalAmount}/-
                    </p>
                  </div>
                  <div className="">
                    <p className="font-medium mb-1">Total Pay</p>
                    <p className="text-sm text-gray-600 font-medium">
                      {orderData.data.totalPay}/-
                    </p>
                  </div>
                  <div className="">
                    <p className="font-medium mb-1">Due</p>
                    <p className="text-sm text-gray-600 font-medium">
                      {orderData.data.due}/-
                    </p>
                  </div>
                  <div className="">
                    <p className="font-medium mb-1">Discount</p>
                    <p className="text-sm text-gray-600 font-medium">
                      {orderData.data.discountAmount}/-
                    </p>
                  </div>
                  {orderData.data.coupon && (
                    <div className="">
                      <p className="font-medium mb-1">Coupon Code</p>
                      <p className="text-sm text-gray-600 font-medium">
                        {orderData.data?.coupon?.couponCode}/-
                      </p>
                    </div>
                  )}
                  <div className="">
                    <p className="font-medium mb-1">Delivery Status</p>
                    <p className="text-sm text-gray-600 font-medium">
                      {orderData.data.deliveryStatus}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <form onSubmit={(e) => handleShippingUpdate(e)} className="border">
              <div className="flex gap-4">
                <div className="px-6 mt-2">
                  <h3 className="font-semibold mb-2 text-lg text-gray-600">
                    Order Details:
                  </h3>

                  <div className="border p-3 flex gap-6">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center">
                        <label
                          className="w-56 font-medium text-gray-500"
                          htmlFor="name"
                        >
                          Shipping Method:
                        </label>
                        <select
                          className="w-full border border-gray-400 rounded-sm px-2 py-1 focus:outline-none text-gray-500"
                          required
                          value={shippingAddressData.shippingMethod}
                          onChange={(e) =>
                            setShippingAddressData({
                              ...shippingAddressData,
                              shippingMethod: e.target.value,
                            })
                          }
                        >
                          <option value="inside-dhaka">Inside Dhaka</option>
                          <option value="outside-dhaka">Outside Dhaka</option>
                          <option value="shop-pickup">Shop Pickup</option>
                        </select>
                      </div>

                      <div className="flex items-center">
                        <label
                          className="w-56 font-medium text-gray-500"
                          htmlFor="name"
                        >
                          Payment Method:
                        </label>
                        <select
                          className="w-full border border-gray-400 rounded-sm px-2 py-1 focus:outline-none text-gray-500"
                          required
                          value={shippingAddressData.paymentMethod}
                          onChange={(e) =>
                            setShippingAddressData({
                              ...shippingAddressData,
                              paymentMethod: e.target.value,
                            })
                          }
                        >
                          <option value="partial-payment">
                            Partial Payment
                          </option>
                          <option value="full-payment">Full Payment</option>
                        </select>
                      </div>

                      <div className="flex items-center">
                        <label
                          className="w-56 font-medium text-gray-500"
                          htmlFor="name"
                        >
                          Payment Status:
                        </label>
                        <select
                          className="w-full border border-gray-400 rounded-sm px-2 py-1 focus:outline-none text-gray-500"
                          required
                          value={shippingAddressData.paymentStatus}
                          onChange={(e) =>
                            setShippingAddressData({
                              ...shippingAddressData,
                              paymentStatus: e.target.value,
                            })
                          }
                        >
                          <option value="pending">Pending</option>
                          <option value="partial request">
                            Partial Request
                          </option>
                          <option value="full request">Full Request</option>
                          <option value="partial successful">
                            Partial Successful
                          </option>
                          <option value="full successful">
                            Full Successful
                          </option>
                        </select>
                      </div>
                      <div className="flex items-center">
                        <label
                          className="w-56 font-medium text-gray-500"
                          htmlFor="name"
                        >
                          Delivery Status:
                        </label>
                        <select
                          className="w-full border border-gray-400 rounded-sm px-2 py-1 focus:outline-none text-gray-500"
                          required
                          value={shippingAddressData.deliveryStatus}
                          onChange={(e) =>
                            setShippingAddressData({
                              ...shippingAddressData,
                              deliveryStatus: e.target.value,
                            })
                          }
                        >
                          <option value="pending">Pending</option>
                          <option value="order received">Order Received</option>
                          <option value="on process">On Process</option>
                          <option value="ready to deliver">
                            Ready To Deliver
                          </option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                        </select>
                      </div>

                      <div className="flex items-center">
                        <label
                          className="w-56 font-medium text-gray-500"
                          htmlFor="phone"
                        >
                          Shipping Charge:
                        </label>
                        <input
                          className="block rounded-sm w-full px-2 py-1 border border-gray-400 focus:outline-none text-gray-500"
                          type="number"
                          placeholder="Enter Shipping Charge"
                          required
                          value={shippingAddressData.shippingCharge}
                          onChange={(e) =>
                            setShippingAddressData({
                              ...shippingAddressData,
                              shippingCharge: Number(e.target.value),
                            })
                          }
                        />
                      </div>
                      <div className="flex items-center">
                        <label className="w-56 font-medium text-gray-500">
                          Sub Total:
                        </label>
                        <input
                          className="block rounded-sm w-full px-2 py-1 border border-gray-400 focus:outline-none text-gray-500"
                          type="number"
                          placeholder="Enter Sub Total"
                          required
                          value={shippingAddressData.subTotal}
                          onChange={(e) =>
                            setShippingAddressData({
                              ...shippingAddressData,
                              subTotal: Number(e.target.value),
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center">
                        <label className="w-56 font-medium text-gray-500">
                          Vat Included:
                        </label>
                        <input
                          className="block rounded-sm w-full px-2 py-1 border border-gray-400 focus:outline-none text-gray-500"
                          type="number"
                          placeholder="Enter Vat"
                          required
                          value={shippingAddressData.vatIncluded}
                          onChange={(e) =>
                            setShippingAddressData({
                              ...shippingAddressData,
                              vatIncluded: Number(e.target.value),
                            })
                          }
                        />
                      </div>

                      <div className="flex items-center">
                        <label className="w-56 font-medium text-gray-500">
                          Discount Amount:
                        </label>
                        <input
                          className="block rounded-sm w-full px-2 py-1 border border-gray-400 focus:outline-none text-gray-500"
                          type="number"
                          required
                          placeholder="Enter Discount Amount"
                          value={shippingAddressData.discountAmount}
                          onChange={(e) =>
                            setShippingAddressData({
                              ...shippingAddressData,
                              discountAmount: Number(e.target.value),
                            })
                          }
                        />
                      </div>

                      <div className="flex items-center">
                        <label className="w-56 font-medium text-gray-500">
                          Total Amount:
                        </label>
                        <input
                          className="block rounded-sm w-full px-2 py-1 border border-gray-400 focus:outline-none text-gray-500"
                          type="number"
                          placeholder="Enter Total Amount"
                          value={shippingAddressData.totalAmount}
                          onChange={(e) =>
                            setShippingAddressData({
                              ...shippingAddressData,
                              totalAmount: Number(e.target.value),
                            })
                          }
                        />
                      </div>

                      <div className="flex items-center">
                        <label className="w-56 font-medium text-gray-500">
                          Total Pay:
                        </label>
                        <input
                          className="block rounded-sm w-full px-2 py-1 border border-gray-400 focus:outline-none text-gray-500"
                          type="number"
                          placeholder="Enter Total Pay"
                          value={shippingAddressData.totalPay}
                          onChange={(e) =>
                            setShippingAddressData({
                              ...shippingAddressData,
                              totalPay: Number(e.target.value),
                            })
                          }
                        />
                      </div>
                      <div className="flex items-center">
                        <label className="w-56 font-medium text-gray-500">
                          Due:
                        </label>
                        <input
                          className="block rounded-sm w-full px-2 py-1 border border-gray-400 focus:outline-none text-gray-500"
                          type="number"
                          placeholder="Enter Due"
                          value={shippingAddressData.due}
                          onChange={(e) =>
                            setShippingAddressData({
                              ...shippingAddressData,
                              due: Number(e.target.value),
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-6 mt-2">
                  <h3 className="font-semibold mb-2 text-lg text-gray-600">
                    Shipping Address:
                  </h3>

                  <div className="border p-3">
                    <div className="flex items-center">
                      <label
                        className="w-56 font-medium text-gray-500"
                        htmlFor="name"
                      >
                        Name:
                      </label>
                      <input
                        className="block rounded-sm w-full px-2 py-1 border border-gray-400 focus:outline-none text-gray-500 mt-1"
                        type="text"
                        id="name"
                        required
                        placeholder="Enter Name"
                        value={shippingAddressData.shippingAddress.fullName}
                        onChange={(e) =>
                          setShippingAddressData({
                            ...shippingAddressData,
                            shippingAddress: {
                              ...shippingAddressData.shippingAddress,
                              fullName: e.target.value,
                            },
                          })
                        }
                      />
                    </div>

                    <div className="flex items-center">
                      <label
                        className="w-56 font-medium text-gray-500"
                        htmlFor="phone"
                      >
                        Phone number:
                      </label>
                      <input
                        className="block rounded-sm w-full px-2 py-1 border border-gray-400 focus:outline-none text-gray-500 mt-1"
                        id="phone"
                        type="number"
                        placeholder="Enter Phone"
                        required
                        value={shippingAddressData.shippingAddress.phone}
                        onChange={(e) =>
                          setShippingAddressData({
                            ...shippingAddressData,
                            shippingAddress: {
                              ...shippingAddressData.shippingAddress,
                              phone: e.target.value,
                            },
                          })
                        }
                      />
                    </div>

                    <div className="flex items-center">
                      <label
                        className="w-56 font-medium text-gray-500"
                        htmlFor="street"
                      >
                        Street:
                      </label>
                      <input
                        className="block rounded-sm w-full px-2 py-1 border border-gray-400 focus:outline-none text-gray-500 mt-1"
                        id="street"
                        type="text"
                        placeholder="Input Here"
                        required
                        value={shippingAddressData.shippingAddress.street}
                        onChange={(e) =>
                          setShippingAddressData({
                            ...shippingAddressData,
                            shippingAddress: {
                              ...shippingAddressData.shippingAddress,
                              street: e.target.value,
                            },
                          })
                        }
                      />
                    </div>

                    <div className="flex items-center">
                      <label
                        className="w-56 font-medium text-gray-500"
                        htmlFor="city"
                      >
                        City:
                      </label>
                      <input
                        className="block rounded-sm w-full px-2 py-1 border border-gray-400 focus:outline-none text-gray-500 mt-1"
                        type="text"
                        id="city"
                        placeholder="Enter City"
                        required
                        value={shippingAddressData.shippingAddress.city}
                        onChange={(e) =>
                          setShippingAddressData({
                            ...shippingAddressData,
                            shippingAddress: {
                              ...shippingAddressData.shippingAddress,
                              city: e.target.value,
                            },
                          })
                        }
                      />
                    </div>

                    <div className="flex items-center">
                      <label
                        className="w-56 font-medium text-gray-500"
                        htmlFor="country"
                      >
                        Country:
                      </label>
                      <input
                        className="block rounded-sm w-full px-2 py-1 border border-gray-400 focus:outline-none text-gray-500 mt-1"
                        type="text"
                        id="country"
                        required
                        placeholder="Enter Country"
                        value={shippingAddressData.shippingAddress.country}
                        onChange={(e) =>
                          setShippingAddressData({
                            ...shippingAddressData,
                            shippingAddress: {
                              ...shippingAddressData.shippingAddress,
                              country: e.target.value,
                            },
                          })
                        }
                      />
                    </div>

                    <div className="flex items-center">
                      <label
                        className="w-56 font-medium text-gray-500"
                        htmlFor="postalCode"
                      >
                        Postal Code:
                      </label>
                      <input
                        className="block rounded-sm w-full px-2 py-1 border border-gray-400 focus:outline-none text-gray-500 mt-1"
                        id="postalCode"
                        type="text"
                        placeholder="Enter Postal Code"
                        value={shippingAddressData.shippingAddress.postalCode}
                        onChange={(e) =>
                          setShippingAddressData({
                            ...shippingAddressData,
                            shippingAddress: {
                              ...shippingAddressData.shippingAddress,
                              postalCode: e.target.value,
                            },
                          })
                        }
                      />
                    </div>

                    <div className="flex items-center">
                      <label
                        className="w-56 font-medium text-gray-500"
                        htmlFor="details"
                      >
                        Details:
                      </label>
                      <input
                        className="block rounded-sm w-full px-2 py-1 border border-gray-400 focus:outline-none text-gray-500 mt-1"
                        type="text"
                        id="details"
                        placeholder="Enter Any Info"
                        value={shippingAddressData.shippingAddress.details}
                        onChange={(e) =>
                          setShippingAddressData({
                            ...shippingAddressData,
                            shippingAddress: {
                              ...shippingAddressData.shippingAddress,
                              details: e.target.value,
                            },
                          })
                        }
                      />
                    </div>

                    <div className="flex items-center">
                      <label
                        className="w-56 font-medium text-gray-500"
                        htmlFor="remark"
                      >
                        Remark:
                      </label>

                      <textarea
                        name="note"
                        className="block rounded-sm w-full px-2 py-1 border border-gray-400 focus:outline-none text-gray-500 mt-1 box-border outline-none"
                        id="remark"
                        placeholder="Enter Remarks"
                        value={shippingAddressData.remark}
                        onChange={(e) =>
                          setShippingAddressData({
                            ...shippingAddressData,
                            remark: e.target.value,
                          })
                        }
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="bg-secondary py-1 px-4 rounded-md text-white translate-x-6 -translate-y-6"
              >
                Update Details
              </button>
            </form>

            <div className="grid grid-cols-3 gap-6">
              <div>
                <h2 className="font-semibold mb-2 text-lg text-gray-600">
                  Payment Details:{" "}
                </h2>
                <div className="flex flex-col gap-y-2 border p-3">
                  <div className="flex items-center">
                    <label className="w-48 font-semibold">
                      Bank Transaction Id:
                    </label>
                    <p className="text-gray-500 font-medium">
                      {orderData.data.transactionDetails?.bankTranId}
                    </p>
                  </div>

                  <div className="flex items-center">
                    <label className="w-48 font-semibold">Card Type:</label>
                    <p className="text-gray-500 font-medium">
                      {orderData.data.transactionDetails?.cardType}
                    </p>
                  </div>

                  <div className="flex items-center">
                    <label className="w-48 font-semibold">Card No:</label>
                    <p className="text-gray-500 font-medium">
                      {orderData.data.transactionDetails?.cardNo}
                    </p>
                  </div>

                  <div className="flex items-center">
                    <label className="w-48 font-semibold">Card Issuer:</label>
                    <p className="text-gray-500 font-medium">
                      {orderData.data.transactionDetails?.cardIssuer}
                    </p>
                  </div>

                  <div className="flex items-center">
                    <label className="w-48 font-semibold">Card Brand:</label>
                    <p className="text-gray-500 font-medium">
                      {orderData.data.transactionDetails?.cardBrand}
                    </p>
                  </div>

                  <div className="flex items-center">
                    <label className="w-48 font-semibold">Card Category:</label>
                    <p className="text-gray-500 font-medium">
                      {orderData.data.transactionDetails?.cardCategory}
                    </p>
                  </div>

                  <div className="flex items-center">
                    <label className="w-48 font-semibold">
                      Card Issuer Country:
                    </label>
                    <p className="text-gray-500 font-medium">
                      {orderData.data.transactionDetails?.cardIssuerCountry}
                    </p>
                  </div>

                  <div className="flex items-center">
                    <label className="w-48 font-semibold">
                      Card Issuer Country Code:
                    </label>
                    <p className="text-gray-500 font-medium">
                      {orderData.data.transactionDetails?.cardIssuerCountryCode}
                    </p>
                  </div>

                  <div className="flex items-center">
                    <label className="w-48 font-semibold">Currency Type:</label>
                    <p className="text-gray-500 font-medium">
                      {orderData.data.transactionDetails?.currencyType}
                    </p>
                  </div>

                  <div className="flex items-center">
                    <label className="w-48 font-semibold">
                      Transaction Time:
                    </label>
                    <p className="text-gray-500 font-medium">
                      {formatDate(
                        orderData.data.transactionDetails?.tranDate as string
                      )}
                    </p>
                  </div>
                </div>
              </div>
              <div className="px-6">
                <p className="font-semibold mb-2 text-lg text-gray-600">
                  History:
                </p>
                <div className="border p-4">
                  {(visibleHistory as any)?.length > 0 ? (
                    <>
                      <ol className="relative border-l border-gray-200 ml-2">
                        {visibleHistory?.map((history: any) => (
                          <li key={history._id} className="mb-8 ml-6 text-sm">
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
                            <div className="flex items-center gap-1 mb-1">
                              <Image
                                alt="user image"
                                src={history.updatedBy.imageUrl}
                                width={50}
                                height={50}
                                className="rounded-full w-6 h-6"
                              />
                              <h3 className="text-sm font-semibold text-gray-900">
                                {history.updatedBy.fullName}
                              </h3>
                            </div>

                            <time className="block mb-2 text-sm font-normal leading-none">
                              <span className="text-gray-600 font-semibold">
                                Updated at:{" "}
                              </span>
                              <span className="text-gray-400">
                                {formatDate(history.updatedAt)}
                              </span>
                            </time>
                          </li>
                        ))}
                      </ol>
                    </>
                  ) : (
                    <p className="text-gray-600 font-medium">
                      No history available
                    </p>
                  )}
                  {(orderData as any)?.data?.updateHistory?.length > 5 &&
                  !showAll ? (
                    <div className="flex justify-center">
                      <button
                        onClick={() => setShowAll(true)}
                        className="text-secondary font-semibold cursor-pointer text-xs"
                      >
                        SHOW MORE
                      </button>
                    </div>
                  ) : (
                    <div className="flex justify-center">
                      <button
                        onClick={() => setShowAll(false)}
                        className="text-secondary font-semibold cursor-pointer text-xs"
                      >
                        SHOW LESS
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="">
              <h3 className="font-semibold mb-2 text-xl ">Products:</h3>
              {(orderData as any).data.product.map((el: any, i: number) => (
                <div
                  className="flex items-center mb-6 justify-between border p-4 rounded-md"
                  key={el._id}
                >
                  <div className="flex gap-3 items-center">
                    <Image
                      src={el.imgUrl}
                      alt={el.slug}
                      width={80}
                      height={60}
                      className="rounded-md"
                    />
                    <div className="text-gray-600 flex flex-col gap-1">
                      <p className="text-base font-semibold">{el.title}</p>
                      <p className="text-sm">
                        <span className="font-medium">Sku:</span> {el.sku}
                      </p>
                    </div>
                  </div>
                  <div className="text-gray-600 flex flex-col gap-1">
                    <p className="text-sm">
                      <span className="font-medium">Color:</span> {el.color}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Size:</span> {el.size}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Quantity:</span>{" "}
                      {el.quantity}
                    </p>
                  </div>
                  <label
                    htmlFor="my-modal-3"
                    onClick={() => handleSizeChart(el?.sizeChart?._id, el._id)}
                    className="text-[#5B94FC] cursor-pointer flex items-center gap-1 text-sm"
                  >
                    <FaRulerHorizontal size={18} className="mt-[2px]" /> Size
                    Chart
                  </label>
                </div>
              ))}
            </div>
          </div>
          <OrderMeasurement
            orderData={orderData}
            sizeChartId={sizeChartId}
            uniqId={uniqId}
            openModal={openSizeChartModal}
          />
        </>
      )}

      {/* invoice model  */}
      <div className="uppercase">
        <input type="checkbox" id="invoice-model" className="modal-toggle" />
        <div className="modal overflow-y-scroll">
          <div
            // ref={invoiceContentRef}
            className="modal-box bg-white max-h-min min-w-max m-0 p-0"
          >
            <div className="flex justify-end -translate-x-4 translate-y-4">
              <label htmlFor="invoice-model" className="btn btn-sm btn-circle">
                ✕
              </label>
            </div>

            <div ref={invoiceRef}>
              <div className="flex flex-col gap-y-2 px-6 pb-4 pt-6">
                <div className="flex items-end border-b border-gray-400 gap-12 pb-4">
                  <p className="text-gray-700 font-medium flex-1 min-w-max">
                    Invoice No:{" "}
                    <input className="w-16" defaultValue={"334425"} />
                  </p>
                  <div className="flex-[2] flex justify-center">
                    <Image
                      alt="Nazaara logo"
                      src={invoiceImg}
                      width={500}
                      height={500}
                      className="invert w-56 h-auto"
                    />
                  </div>
                  <p className="text-gray-700 font-medium flex-1 min-w-max">
                    Order No: {orderData?.data?.transactionId}
                  </p>
                </div>
                {/* <div className="flex items-center justify-between border-b border-gray-300 pb-1 text-gray-600 font-medium">
                <p>Order ID: {orderData?.data?.transactionId}</p>
                <p>
                  Order Date:{" "}
                  {formatYearMonthDay(orderData?.data?.createdAt as Date)}
                </p>
              </div> */}
                <div className="flex flex-col gap-1 text-gray-700 font-medium text-sm mt-2">
                  <div className="flex items-center justify-between">
                    <p>
                      Client Name:{" "}
                      {orderData?.data?.shippingAddress?.fullName
                        ? orderData?.data?.shippingAddress?.fullName
                        : orderData?.data?.user?.fullName}
                    </p>
                    {orderData?.data?.shippingAddress?.phone && (
                      <p>Phone: {orderData?.data?.shippingAddress?.phone}</p>
                    )}
                  </div>
                  <p className="flex items-center gap-1">
                    Address:{" "}
                    <input
                      className="w-full"
                      defaultValue={`${orderData?.data?.shippingAddress?.street},${orderData?.data?.shippingAddress?.city},${orderData?.data?.shippingAddress?.country}`}
                    />
                  </p>
                </div>
                <div>
                  <table className="table bg-basic border border-gray-400">
                    {/* head */}
                    <thead className="border border-gray-400">
                      <tr className="font-bold text-gray-700 border border-gray-400">
                        <th className="border border-gray-400">SL</th>
                        <th className="border border-gray-400">PRODUCT</th>
                        <th className="border border-gray-400">RATE</th>
                        <th className="border border-gray-400">QUANTITY</th>
                        <th className="border border-gray-400">AMOUNT</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orderData?.data.product.map(
                        (product: any, index: number) => {
                          return (
                            <tr
                              key={product._id}
                              className="text-gray-700 font-medium border border-gray-400"
                            >
                              <td className="py-1 border border-gray-400">
                                {index + 1}
                              </td>
                              <td className="py-1 border border-gray-400">
                                {product.sku}
                              </td>
                              {product?.offeredPrice ? (
                                <td className="py-1 border border-gray-400">
                                  {product?.offeredPrice}/-
                                </td>
                              ) : (
                                <td className="py-1 border border-gray-400">
                                  {product?.salePrice}/-
                                </td>
                              )}
                              <td className="py-1 border border-gray-400">
                                {product.quantity}
                              </td>
                              {product?.offeredPrice ? (
                                <td className="py-1 border border-gray-400">
                                  {product?.offeredPrice * product.quantity}/-
                                </td>
                              ) : (
                                <td className="py-1 border border-gray-400">
                                  {product?.salePrice * product.quantity}/-
                                </td>
                              )}
                            </tr>
                          );
                        }
                      )}
                    </tbody>
                  </table>
                  <div className="flex justify-between text-gray-600 text-xs font-medium">
                    <div>
                      <p className="font-semibold text-gray-700 mt-4">
                        Payment Method
                      </p>
                      <div className="flex items-center gap-1">
                        <div className="form-control">
                          <label className="label cursor-pointer">
                            <span className="label-text text-xs font-semibold text-gray-800">
                              Cash
                            </span>
                            <input
                              type="checkbox"
                              className="checkbox checkbox-xs rounded ml-1"
                            />
                          </label>
                        </div>
                        <div className="form-control">
                          <label className="label cursor-pointer">
                            <span className="label-text text-xs font-semibold text-gray-800">
                              Card
                            </span>
                            <input
                              type="checkbox"
                              className="checkbox checkbox-xs rounded ml-1"
                            />
                          </label>
                        </div>
                        <div className="form-control">
                          <label className="label cursor-pointer">
                            <span className="label-text text-xs font-semibold text-gray-800">
                              Mobile Banking
                            </span>
                            <input
                              type="checkbox"
                              className="checkbox checkbox-xs rounded ml-1"
                            />
                          </label>
                        </div>
                        <div className="form-control">
                          <label className="label cursor-pointer">
                            <span className="label-text text-xs font-semibold text-gray-800">
                              Others
                            </span>
                            <input
                              type="checkbox"
                              className="checkbox checkbox-xs rounded ml-1"
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1 p-1">
                      <p className="border p-1 border-gray-500 text-gray-700 text-end">
                        Sub Total:{" "}
                        <span className="font-bold">
                          {orderData?.data?.subTotal}/-
                        </span>
                      </p>
                      <p className="border p-1 border-gray-500 text-gray-700 text-end">
                        Shipping Charge:{" "}
                        <span className="font-bold">
                          {orderData?.data?.shippingCharge}/-
                        </span>
                      </p>
                      <p className="border p-1 border-gray-500 text-gray-700 text-end">
                        Total Amount:{" "}
                        <span className="font-bold">
                          {orderData?.data?.totalAmount}/-
                        </span>
                      </p>
                      <p className="border p-1 border-gray-500 text-gray-700 text-end">
                        Total Pay:{" "}
                        <span className="font-bold">
                          {orderData?.data?.totalPay}/-
                        </span>
                      </p>
                      <p className="border p-1 border-gray-500 text-gray-700 text-end">
                        Due Amount:{" "}
                        <span className="font-bold">
                          {orderData?.data?.due}/-
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <hr className="mx-6 border-gray-400" />
              <div className="px-6 pt-2 pb-4">
                {/* <div className="flex items-center justify-between text-gray-700 font-medium mb-2">
                  <p>For Order Update: +880 1316400566</p>
                  <div className="flex items-center gap-1">
                    <p>Delivery Date:</p>{" "}
                    <input
                      type="text"
                      className="w-32 border-2 border-gray-400 rounded focus:outline-gray-400 px-2 text-gray-700 py-0.5"
                    />{" "}
                  </div>
                </div> */}

                {/* <hr /> */}

                <div className="flex flex-row justify-between mt-2 gap-6">
                  <div className="flex flex-col justify-between gap-4">
                    <div className="flex flex-col gap-4 flex-1">
                      <div className="flex flex-col gap-2 text-gray-700 font-medium mb-2">
                        <p>For Order Update: +880 1316400566</p>
                        <div className="flex items-center gap-1">
                          <p>Delivery Date:</p>{" "}
                          <input
                            type="text"
                            className="w-32 border-2 border-gray-400 rounded focus:outline-gray-400 px-2 text-gray-700 py-0.5"
                          />{" "}
                        </div>
                      </div>
                      <div className="text-sm font-medium flex flex-col gap-2 lowercase">
                        <div className="flex items-center">
                          <div className="flex">
                            <RiFacebookCircleLine size={14} />
                            <FaInstagram size={14} className="-translate-x-1" />
                          </div>
                          <p className="">/nazaara.official</p>
                        </div>
                        <div className="flex items-start gap-1 uppercase">
                          <IoLocationOutline size={18} />
                          <p className="text-xs">
                            House 56 (5th Floor), Road 01, Block A,
                            <br /> Aftabnagar (behind Model Clinic),
                            <br />
                            Dhaka 1212
                          </p>
                        </div>
                        <div className="flex items-center gap-1">
                          <IoMailOutline size={16} />
                          <p>anzaralifestyleltd@gmail.com </p>
                        </div>
                        <div className="flex items-center gap-1">
                          <TbWorldWww size={16} />
                          <p>www.nazaaralifestyle.com</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-start">
                      <div className="border-t border-gray-500 w-44 text-center font-medium mt-10">
                        <p className="text-sm pt-1">Authorized Signature</p>
                        <p className="text-xs">(With Date)</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-sm max-w-[30rem]">
                    <p className="font-bold mb-1">Terms & Conditions</p>
                    <ol className="font-xs list-decimal list-inside list space-y-1">
                      <li>
                        No money refund, money can be adjusted with another
                        purchase(within 7 days).
                      </li>
                      <li>Delivered products can not be exchanged.</li>
                      <li>
                        Dress can be booked for maximum 2 months (60 days) with
                        50% booking money.
                      </li>
                      <li>
                        Dress can be booked for maximum 2 months (60 days) with
                        50% booking money. After 2 months the order will be
                        cancelled and booking money will be non-refundable and
                        non-adjustable.
                      </li>
                      <li>
                        Booking money can not be cancelled but exchange
                        possible(within 60 days maximum).
                      </li>
                      <li>
                        Total value of the bill has to be met while exchange
                        booked product.(Not just the booking amount).
                      </li>
                    </ol>
                    <div className="form-control">
                      <label className="label cursor-pointer flex items-center gap-1.5">
                        <input
                          type="checkbox"
                          className="checkbox checkbox-xs rounded -translate-y-1"
                          defaultChecked
                        />
                        <span className="label-text text-xs font-semibold text-gray-800 capitalize">
                          I have read all the mentioned terms & conditions
                          above, and I agree with them.
                        </span>
                      </label>
                    </div>
                    <div className="flex justify-end">
                      <div className="border-t border-gray-500 w-40 text-center font-medium mt-12">
                        <p className="text-sm">Client Signature</p>
                        <p className="text-xs">(With Date)</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={() => invoicePrintFn()}
              className="bg-secondary rounded px-3 py-1 text-sm text-white ml-6 mb-6 uppercase flex items-center gap-1"
            >
              <IoMdPrint size={18} /> print
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderUpdate;
