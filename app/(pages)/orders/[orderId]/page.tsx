"use client";
import Loader from "@/components/Loader";
import OrderMeasurement from "@/components/OrderMeasurement";
import OutlineButton from "@/components/OutlineButton";
import PrimaryButton from "@/components/PrimaryButton";
import UtilityBtn from "@/components/UtilityBtn";
import { formatDate } from "@/helpers/formatDate";
import { useGetOrderByIdQuery } from "@/services/orderApi";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AiOutlineDownload, AiOutlineShoppingCart } from "react-icons/ai";
import { FaRulerHorizontal } from "react-icons/fa";
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
  // const [orderData, setOrderData] = useState<any>();
  const [openSizeChartModal, setOpenSizeChartModal] = useState(false);
  const [sizeChartId, setSizeChartId] = useState("");
  const [uniqId, setUniqId] = useState("");

  const { data: orderData, isLoading } = useGetOrderByIdQuery(params.orderId);

  console.log("order data bal", orderData);

  // useEffect(() => {
  //   const fetchOrderData = async () => {
  //     try {
  //       const response = await axios.get(
  //         `${process.env.API_URL}/api/v1/order/${params.orderId}`
  //       );
  //       setOrderData(response.data.data);
  //     } catch (error) {
  //       console.error("Request error:", error);
  //     }
  //   };
  //   fetchOrderData(); // Call the fetchOrderData function
  // }, [params.orderId]);

  // console.log("order data", orderData);

  // const totalQuantity =
  //   orderData &&
  //   orderData.product.reduce(
  //     (total: any, item: any) => total + item.quantity,
  //     0
  //   );
  // const totalPrice =
  //   orderData &&
  //   orderData.product.reduce(
  //     (total: any, item: any) => total + item.price,
  //     orderData.deliveryCharge
  //   );

  // console.log("order data from single order", orderData);
  // const [deliveryCharge, setDeliveryCharge] = useState();
  // const [paymentMethod, setPaymentMethod] = useState();
  // const [paymentStatus, setPaymentStatus] = useState<any>(
  //   paymentStatusOptions[0]
  // );
  // const [remark, setRemark] = useState();

  // const [selectedOption, setSelectedOption] = useState<any>(deliveryOptions[0]);
  // const [shippingAddress, setShippingAddress] = useState({
  //   street: "",
  //   city: "",
  //   country: "",
  // });
  // useEffect(() => {
  //   const defaultOption = deliveryOptions.find(
  //     (option) => option.value === orderData?.deliveryStatus
  //   );
  //   if (orderData) {
  //     setDeliveryCharge(orderData.deliveryCharge);
  //     setPaymentMethod(orderData.paymentMethod);
  //     setSelectedOption(defaultOption);
  //     setRemark(orderData.remark);

  //     // Update each field in the shippingAddress object
  //     setShippingAddress({
  //       street: orderData.shippingAddress.street,
  //       city: orderData.shippingAddress.city,
  //       country: orderData.shippingAddress.country,
  //     });
  //   }
  // }, [orderData]);

  if (isLoading) {
    return <Loader height="h-[50vh]" />;
  }

  const handleSizeChart = (id: string, uniqId: string) => {
    setOpenSizeChartModal(true);
    setSizeChartId(id);
    setUniqId(uniqId);
  };

  console.log("order data 44", orderData);

  return (
    <div className="container">
      {orderData && (
        <>
          <div className="flex items-center justify-between mb-3">
            <div className="flex gap-2 items-center">
              <AiOutlineShoppingCart size={18} color="gray" />
              <span className="font-medium text-lg">Orders</span>
            </div>
            {/* <UtilityBtn
              name="Export"
              icon={<AiOutlineDownload color="white" />}
            /> */}
          </div>
          <div className="bg-basic rounded-lg px-6 py-3 flex flex-col gap-y-4">
            <div>
              <p className="py-2 bg-gray-200 w-full pl-2 font-semibold">
                Update Order
              </p>
              <div className="w-full mt-3 border p-2">
                <div className="flex flex-wrap gap-4 justify-between border mb-3 p-2">
                  <div className="">
                    <p className="font-semibold mb-1">Transaction Id</p>
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
                  <div className="">
                    <p className="font-medium mb-1">Delivery Status</p>
                    <p className="text-sm text-gray-600 font-medium">
                      {orderData.data.deliveryStatus}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div>
                <h2 className="font-semibold mb-2">Payment Details: </h2>
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

              {/* <div className="px-6">
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
              </div> */}

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
            <div className="">
              <h3 className="font-semibold mb-2 text-xl ">Products:</h3>
              {(orderData as any).data.product.map((el: any, i: number) => (
                <div
                  className="flex items-center mb-6 justify-between border p-4 rounded-md"
                  key={i}
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
            <div className="flex gap-x-2">
              <PrimaryButton name="Update" />
              <OutlineButton name="Cancel" />
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
    </div>
  );
};

export default OrderUpdate;
