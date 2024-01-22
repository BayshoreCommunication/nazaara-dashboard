"use client";
// import component 👇
import { FaTimes } from "react-icons/fa";
import dynamic from "next/dynamic";
const Drawer = dynamic(() => import("react-modern-drawer"), {
  ssr: false,
});
import { useGetUserByIdQuery } from "@/services/userApi";

//import styles 👇
import "react-modern-drawer/dist/index.css";
import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";
import {
  useGetOrderByUserIdQuery,
  useGetOrdersQuery,
} from "@/services/orderApi";
import { formatYearMonthDay } from "@/helpers/formatYearMonthDay";
import { IoEyeSharp } from "react-icons/io5";
import Link from "next/link";

interface IDrawer {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  toggleDrawer: (id: string) => void;
  selectedCustomerId: string;
}

const CustomerViewProfileDrawer: React.FC<IDrawer> = ({
  setIsOpen,
  isOpen,
  toggleDrawer,
  selectedCustomerId,
}) => {
  const { data: singleData } = useGetUserByIdQuery(selectedCustomerId);
  const { data: orderData } = useGetOrderByUserIdQuery(
    singleData?.data._id as string
  );

  console.log("order Data", orderData);

  //generate order book data
  const addressBookData = () => {
    if ((singleData as any)?.data?.addressBook?.length > 0) {
      return singleData?.data?.addressBook?.map((data) => (
        <div
          className="border p-3 w-max rounded-md text-sm flex flex-col gap-1"
          key={data._id}
        >
          <span className="px-2 rounded-sm bg-gray-200 text-green-600 w-max">
            {data.addressType}
          </span>
          <p>{data.fullName}</p>
          <p>{data.phone}</p>
          <p>{data.street}</p>
          <p>
            {data.city},{data.country}
          </p>
        </div>
      ));
    } else {
      return "N/A";
    }
  };

  return (
    <>
      <Drawer
        open={isOpen}
        onClose={() => toggleDrawer(selectedCustomerId)}
        direction="right"
        className="w-full overflow-auto"
        size={1000}
      >
        <div className="p-6">
          <div className="flex justify-end">
            <FaTimes
              className="cursor-pointer"
              size={20}
              onClick={() => setIsOpen(false)}
            />
          </div>
          <p className="font-medium text-lg mb-3">User Info</p>
          <div className="flex flex-col gap-y-6">
            <div className="flex flex-col gap-y-3">
              <div className="flex flex-col gap-y-2">
                <p>Name: {singleData?.data.fullName}</p>
                <p>
                  Gender:{" "}
                  {singleData?.data.gender != ""
                    ? singleData?.data.gender
                    : " N/A"}
                </p>
                <p>
                  Phone:
                  {singleData?.data.phone != ""
                    ? singleData?.data.phone
                    : " N/A"}
                </p>
                <p>Email: {singleData?.data.email}</p>
                <p>User-Type: {singleData?.data.userType}</p>
              </div>
              <p>Refund: {singleData?.data.refund}/-</p>
              <div>
                <p className="font-semibold mb-1">Address Book: </p>
                <div className="flex flex-wrap gap-3">{addressBookData()}</div>
              </div>
              {/* <div className="flex gap-2">
                <PrimaryButton name="Delete" />
                <SecondaryButton name="Edit" />
              </div> */}
            </div>
            {/* <div className="my-3 flex flex-col gap-y-2 items-start">
              <p>Accounts Receivable: 8000</p>
              <p>History:</p>
              <PrimaryButton name="Print out" />
            </div> */}
            <div>
              <h2 className="mb-1 font-semibold">Order History: </h2>
              <div className="overflow-x-auto">
                <table className="table border">
                  {/* head */}
                  <thead>
                    <tr>
                      <th>SL</th>
                      <th>Order-Date</th>
                      <th>Transaction-ID</th>
                      <th>Total-Price</th>
                      <th>Total-Pay</th>
                      <th>Due-Amount</th>
                      <th>Product</th>
                      <th>Delivery</th>
                      <th>Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(orderData as any)?.data?.length > 0 ? (
                      <>
                        {orderData?.data.map((data: any, index) => (
                          <tr key={data._id}>
                            <th>{index + 1}</th>
                            <td>{formatYearMonthDay(data.createdAt)}</td>
                            <td>{data.transactionId}</td>
                            <td>{data.totalAmount}</td>
                            <td>{data.totalPay}</td>
                            <td>{data.due}</td>
                            <td className="flex flex-wrap gap-1">
                              {data.product.map((data: any) => (
                                <span
                                  className="bg-gray-200 px-1 text-xs"
                                  key={data._id}
                                >
                                  {data.sku}
                                </span>
                              ))}
                            </td>
                            <td>{data.deliveryStatus}</td>
                            <td>
                              <Link href={`orders/${data._id}`}>
                                <IoEyeSharp color="blue" size={18} />
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </>
                    ) : (
                      <p className="py-6">No Order Found!</p>
                    )}
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
