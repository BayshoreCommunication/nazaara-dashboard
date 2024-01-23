"use client";
import { useEffect, useState } from "react";
import OrderMeasurement from "@/components/OrderMeasurement";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Link from "next/link";
import { useGetOrdersQuery } from "@/services/orderApi";
import Loader from "@/components/Loader";
import { FaRulerHorizontal } from "react-icons/fa";
import { formatDate } from "@/helpers/formatDate";
import { TiEdit } from "react-icons/ti";
import Fuse from "fuse.js";
import { IOrders } from "@/types/ordersTypes";

const Orders = () => {
  const { data, isLoading } = useGetOrdersQuery();
  const [openModal, setOpenModal] = useState(false);

  const [searchText, setSearchText] = useState("");
  const [searchData, setSearchData] = useState([]);

  const fuseOptions = {
    // isCaseSensitive: false,
    // includeScore: false,
    // shouldSort: true,
    // includeMatches: false,
    // findAllMatches: false,
    // minMatchCharLength: 1,
    // location: 0,
    //threshold: 0.6, // 0.6 means it show similar search item
    threshold: 0.1, // 0.1 means it match with exact string
    // distance: 100,
    // useExtendedSearch: false,
    // ignoreLocation: false,
    // ignoreFieldNorm: false,
    // fieldNormWeight: 1,
    keys: [
      "transactionId",
      "user.fullName",
      "user.phone",
      "user.email",
      "deliveryStatus",
      "paymentStatus",
      "paymentMethod",
    ],
  };

  useEffect(() => {
    const fuse = new Fuse(data?.data as any, fuseOptions);
    if (searchText) {
      const currentSearchData = fuse.search(searchText);
      setSearchData(currentSearchData as any);
    }
  }, [data?.data, searchText]);

  const handleChange = (): void => {
    setOpenModal(true);
  };

  if (isLoading) return <Loader height="h-[85vh]" />;

  // console.log("searched data", searchData);

  return (
    <>
      <div className="container">
        <div className="flex items-center justify-between mb-3">
          <div className="flex gap-2 items-center">
            <AiOutlineShoppingCart size={18} color="gray" />
            <span className="font-medium text-lg">Orders</span>
          </div>
          {/*********** search user input start ************/}
          <div className="flex items-center gap-1">
            <label
              htmlFor="search"
              className="text-sm text-gray-600 font-semibold"
            >
              Search:
            </label>
            <input
              type="text"
              id="search"
              onChange={(e) => setSearchText(e.target.value)}
              className="border border-gray-300 outline-none hover:outline-none px-2 py-1 rounded-md text-gray-600 text-sm"
            />
          </div>
          {/*********** search user input end ************/}
        </div>
        <div className="overflow-x-auto">
          <table className="table bg-basic">
            {/* head */}
            <thead className="">
              <tr>
                <th>Order Date</th>
                <th>Transaction ID</th>
                <th>Customer Name</th>
                <th>Customer Email</th>
                <th>Customer Phone</th>
                <th>Total Price</th>
                <th>Total Pay</th>
                <th>Due</th>
                <th>Payment Method</th>
                <th>Payment Status</th>
                <th>Delivery Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {searchData && searchText ? (
                <>
                  {searchData.map((el: any, i: number) => (
                    <tr key={i}>
                      <td>{formatDate(el.item.createdAt as Date)}</td>
                      <td>{el.item.transactionId}</td>
                      <td>{el.item.user.fullName}</td>
                      <td>{el.item.user.email}</td>
                      <td>{el.item.user.phone}</td>
                      <td>{el.item.totalAmount}/-</td>
                      <td>{el.item.totalPay}/-</td>
                      <td>{el.item.due}/-</td>
                      <td className="p-0">
                        <span
                          className={`${
                            el.item.paymentMethod === "partial-payment"
                              ? "text-red-700"
                              : "text-green-700"
                          } font-semibold px-2 py-1 rounded-md`}
                        >
                          {el.item.paymentMethod}
                        </span>
                      </td>
                      <td className="p-0">
                        <span
                          className={`${
                            el.item.paymentStatus === "partial successful"
                              ? "text-red-700"
                              : "text-green-700"
                          } font-semibold px-2 py-1 rounded-md`}
                        >
                          {el.item.paymentStatus}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`${
                            el.item.deliveryStatus === "pending"
                              ? "text-red-700"
                              : "text-green-700"
                          } font-semibold px-2 py-1 rounded-md`}
                        >
                          {el.item.deliveryStatus}
                        </span>
                      </td>

                      <td>
                        <div className="flex gap-1">
                          <Link href={`/orders/${el.item._id}`}>
                            <button className="text-[#5B94FC]">
                              <TiEdit size={18} />
                            </button>
                          </Link>
                          <label
                            htmlFor="my-modal-3"
                            onClick={() => handleChange()}
                            className="text-[#5B94FC] cursor-pointer"
                          >
                            <FaRulerHorizontal size={18} />
                          </label>
                        </div>
                      </td>
                    </tr>
                  ))}
                </>
              ) : (
                <>
                  {data?.data.map((el, i: number) => (
                    <tr key={i}>
                      <td>{formatDate(el.createdAt as Date)}</td>
                      <td>{el.transactionId}</td>
                      <td>{el.user.fullName}</td>
                      <td>{el.user.email}</td>
                      <td>{el.user.phone}</td>
                      <td>{el.totalAmount}/-</td>
                      <td>{el.totalPay}/-</td>
                      <td>{el.due}/-</td>
                      <td className="p-0">
                        <span
                          className={`${
                            el.paymentMethod === "partial-payment"
                              ? "text-red-700"
                              : "text-green-700"
                          } font-semibold px-2 py-1 rounded-md`}
                        >
                          {el.paymentMethod}
                        </span>
                      </td>
                      <td className="p-0">
                        <span
                          className={`${
                            el.paymentStatus === "partial successful"
                              ? "text-red-700"
                              : "text-green-700"
                          } font-semibold px-2 py-1 rounded-md`}
                        >
                          {el.paymentStatus}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`${
                            el.deliveryStatus === "pending"
                              ? "text-red-700"
                              : "text-green-700"
                          } font-semibold px-2 py-1 rounded-md`}
                        >
                          {el.deliveryStatus}
                        </span>
                      </td>

                      <td>
                        <div className="flex gap-1">
                          <Link href={`/orders/${el._id}`}>
                            <button className="text-[#5B94FC]">
                              <TiEdit size={18} />
                            </button>
                          </Link>
                          {/* <label
                            htmlFor="my-modal-3"
                            onClick={() => handleChange()}
                            className="text-[#5B94FC] cursor-pointer"
                          >
                            <FaRulerHorizontal size={18} />
                          </label> */}
                        </div>
                      </td>
                    </tr>
                  ))}
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* <OrderMeasurement sizeChartId={sizeChartId} openModal={openModal} /> */}
    </>
  );
};

export default Orders;
