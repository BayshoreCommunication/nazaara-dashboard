"use client";
import OutlineButton from "@/components/OutlineButton";
import PrimaryButton from "@/components/PrimaryButton";
import UtilityBtn from "@/components/UtilityBtn";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  AiOutlineDownload,
  AiOutlineShoppingCart,
  AiTwotoneDelete,
} from "react-icons/ai";
import Select from "react-select";

const deliveryOptions = [
  { value: "pending", label: "Pending" },
  { value: "order_received", label: "Order Received" },
  { value: "on_process", label: "On Process" },
  { value: "ready_to_deliver", label: "Ready to Deliver" },
  { value: "shipped", label: "Shipped" },
  { value: "delivered", label: "Delivered" },
];

const paymentStatusOptions = [
  { value: "pending", label: "Pending" },
  { value: "partial_request", label: "Partial Request" },
  { value: "full_request", label: "Full Request" },
  { value: "partial_successful", label: "Partial Successful" },
  { value: "full_successful", label: "Full Successful" },
  { value: "cancel", label: "Cancel" },
];
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

  const totalQuantity =
    orderData &&
    orderData.product.reduce(
      (total: any, item: any) => total + item.quantity,
      0
    );
  const totalPrice =
    orderData &&
    orderData.product.reduce(
      (total: any, item: any) => total + item.price,
      orderData.deliveryCharge
    );

  console.log("order data", orderData);
  const [deliveryCharge, setDeliveryCharge] = useState();
  const [paymentMethod, setPaymentMethod] = useState();
  const [paymentStatus, setPaymentStatus] = useState<any>(
    paymentStatusOptions[0]
  );
  const [remark, setRemark] = useState();
  const defaultOption = deliveryOptions.find(
    (option) => option.value === orderData?.deliveryStatus
  );
  const [selectedOption, setSelectedOption] = useState<any>(deliveryOptions[0]);
  const [shippingAddress, setShippingAddress] = useState({
    street: "",
    city: "",
    country: "",
  });
  useEffect(() => {
    if (orderData) {
      setDeliveryCharge(orderData.deliveryCharge);
      setPaymentMethod(orderData.paymentMethod);
      setSelectedOption(defaultOption);
      setRemark(orderData.remark);

      // Update each field in the shippingAddress object
      setShippingAddress({
        street: orderData.shippingAddress.street,
        city: orderData.shippingAddress.city,
        country: orderData.shippingAddress.country,
      });
    }
  }, [orderData]);

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
                  <p className="text-sm">{totalQuantity}</p>
                </div>
                <div className="w-full">
                  <p className="font-medium mb-1">Total Bill</p>
                  <p className="text-sm">{totalPrice}</p>
                </div>
                <div className="w-full">
                  <p className="font-medium mb-1">Payment</p>
                  <p className="text-sm">{orderData.totalPay}</p>
                </div>
                <div className="w-full">
                  <p className="font-medium mb-1">Due</p>
                  <p className="text-sm">{`${(
                    totalPrice - orderData.totalPay
                  ).toFixed(2)}`}</p>
                </div>
                <div className="w-full">
                  <p className="font-medium mb-1">Discount</p>
                  <p className="text-sm">0</p>
                </div>
                {/* <div className="w-full">
                  <p className="font-medium mb-1">VAT</p>
                  <p className="text-sm">2,000</p>
                </div> */}
                {/* <div className="w-full">
                  <p className="font-medium mb-1">Coupon</p>
                  <p className="text-sm">PEIEHF</p>
                </div> */}
              </div>
            </div>
            {/* middel three section  */}
            <div className="grid grid-cols-3 gap-6">
              {/* start part  */}
              <div className="flex flex-col gap-y-4">
                <div className="flex items-center">
                  <label className="w-56" htmlFor="status">
                    *Payment status:{" "}
                  </label>
                  <div className="w-full">
                    <Select
                      defaultValue={paymentStatus}
                      onChange={setPaymentStatus}
                      options={paymentStatusOptions}
                    />
                  </div>
                </div>

                <div className="flex items-center">
                  <label className="w-56" htmlFor="payment">
                    Payment Method:
                  </label>
                  <input
                    className="block rounded-sm w-full px-2 py-1 border border-gray-400 focus:outline-none text-gray-500 mt-1"
                    id="deliveryCharge"
                    type="text"
                    placeholder="Input Here"
                    value={paymentMethod}
                    onChange={(e: any) => setPaymentMethod(e.target.value)}
                  />
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
                    value={deliveryCharge}
                    onChange={(e: any) => setDeliveryCharge(e.target.value)}
                  />
                </div>

                <div className="flex items-center">
                  <label className="w-56" htmlFor="deliveryDate">
                    *Delivery Status:
                  </label>
                  <div className="w-full">
                    <Select
                      defaultValue={selectedOption}
                      onChange={setSelectedOption}
                      options={deliveryOptions}
                    />
                  </div>
                </div>
                {/* <div className="flex items-center">
                  <label className="w-56" htmlFor="shippingAddress">
                    Shipping Address:
                  </label>
                  <input
                    className="block rounded-sm w-full px-2 py-1 border border-gray-400 focus:outline-none text-gray-500 mt-1"
                    id="shippingAddress"
                    type="text"
                    placeholder="Input Here"
                  />
                </div> */}
                <div className="flex items-center">
                  <label className="w-56" htmlFor="shippingAddress">
                    Remarks:
                  </label>
                  <textarea
                    className="block rounded-sm w-full px-2 py-1 border border-gray-400 focus:outline-none text-gray-500 mt-1"
                    id="shippingAddress"
                    placeholder="Input Here"
                    value={remark}
                    onChange={(e: any) => setRemark(e.target.value)}
                  />
                </div>
              </div>

              {/* new part */}
              <div className="px-6">
                <h3 className="font-semibold mb-4 text-xl">Shipping Address</h3>

                <div className="flex items-center mb-4">
                  <label className="w-56" htmlFor="name">
                    Name:
                  </label>
                  <input
                    className="block rounded-sm w-full px-2 py-1 border border-gray-400 focus:outline-none text-gray-500 mt-1"
                    id="name"
                    type="text"
                    placeholder="Input Here"
                    value={orderData.shippingAddress.fullName}
                  />
                </div>

                <div className="flex items-center mb-4">
                  <label className="w-56" htmlFor="phone">
                    Phone number:
                  </label>
                  <input
                    className="block rounded-sm w-full px-2 py-1 border border-gray-400 focus:outline-none text-gray-500 mt-1"
                    id="phone"
                    type="text"
                    placeholder="Input Here"
                    value={orderData.shippingAddress.phone}
                  />
                </div>

                <div className="flex items-center mb-4">
                  <label className="w-56" htmlFor="street">
                    Street:
                  </label>
                  <input
                    className="block rounded-sm w-full px-2 py-1 border border-gray-400 focus:outline-none text-gray-500 mt-1"
                    id="street"
                    type="text"
                    placeholder="Input Here"
                    value={shippingAddress.street}
                    onChange={(e: any) => {
                      setShippingAddress({
                        ...shippingAddress,
                        street: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="flex items-center  mb-4">
                  <label className="w-56" htmlFor="city">
                    City:
                  </label>
                  <input
                    className="block rounded-sm w-full px-2 py-1 border border-gray-400 focus:outline-none text-gray-500 mt-1"
                    id="city"
                    type="text"
                    placeholder="Input Here"
                    value={shippingAddress.city}
                    onChange={(e: any) => {
                      setShippingAddress({
                        ...shippingAddress,
                        city: e.target.value,
                      });
                    }}
                  />
                </div>

                <div className="flex items-center  mb-4">
                  <label className="w-56" htmlFor="country">
                    Country:
                  </label>
                  <input
                    className="block rounded-sm w-full px-2 py-1 border border-gray-400 focus:outline-none text-gray-500 mt-1"
                    id="city"
                    type="text"
                    placeholder="Input Here"
                    value={shippingAddress.country}
                    onChange={(e: any) => {
                      setShippingAddress({
                        ...shippingAddress,
                        country: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>
              {/* new part 2 */}
              <div className="px-6">
                <h3 className="font-semibold mb-6 text-xl ">Product</h3>
                {orderData.product.map((el: any, i: number) => (
                  <div
                    className="flex items-center mb-6 gap-4 xl:gap-8 border-b pb-4"
                    key={i}
                  >
                    <Image
                      src={el.imageUrl}
                      alt={el.slug}
                      width={432}
                      height={558}
                      className="w-12 h-16"
                    />
                    <div>
                      <p className="text-sm">Color: {el.color}</p>
                      <p className="text-sm">Size: {el.size}</p>
                      <p className="text-sm">Quantity: {el.quantity}</p>
                    </div>
                    <div className="font-semibold">Price: {el.price}</div>
                    {el.coupon ? (
                      <div>Coupon: {el.coupon}</div>
                    ) : (
                      <div className="text-red-500">No Coupon applied</div>
                    )}
                  </div>
                ))}
              </div>

              {/* end part  */}
              {/* <div className="px-6">
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
              </div> */}
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
