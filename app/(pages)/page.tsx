"use client";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BiCategory } from "react-icons/bi";
import { BsChatSquareTextFill, BsFillBoxFill } from "react-icons/bs";
import { TbTruckDelivery } from "react-icons/tb";
import AreaChart from "@/components/AreaChart";
import PieChart from "@/components/PieChart";
import RecentOrder from "@/components/home/RecentOrder";
import RecentCustomer from "@/components/home/RecentCustomer";
import Product from "@/components/Product";
import {
  useGetContactByIDQuery,
  useGetContactsQuery,
} from "@/services/contactApi";
import { useGetOrdersQuery } from "@/services/orderApi";
import {
  useGetProductsCategoriesQuery,
  useGetProductsQuery,
} from "@/services/productApi";

interface CardDataItem {
  icon: JSX.Element;
  text: string;
  bgColor: string;
  value: number;
}

const Home = (): JSX.Element => {
  const { data: totalCategory, isError } = useGetProductsCategoriesQuery();

  const { data: availableProduct } = useGetProductsQuery({
    page: 1,
    limit: 10,
  });

  const { data: getOrders } = useGetOrdersQuery();

  const { data: allContacts } = useGetContactsQuery();

  const pendingMsg = allContacts?.data.filter((el) => el.status === "pending");

  const pendingorder = getOrders?.data.filter(
    (el) => el.deliveryStatus === "pending"
  );

  const readyToDeliver = getOrders?.data.filter(
    (el) => el.deliveryStatus === "ready to deliver"
  );

  const cardData: CardDataItem[] = [
    {
      icon: <BiCategory size={24} />,
      text: "Total Category",
      bgColor: "bg-[#FC8D68]",
      value: totalCategory ? totalCategory.length : 0,
    },
    {
      icon: <AiOutlineShoppingCart size={24} />,
      text: "New Order",
      bgColor: "bg-secondary",
      value: pendingorder ? pendingorder.length : 0,
    },
    {
      icon: <TbTruckDelivery size={24} />,
      text: "Ready to Deliver",
      bgColor: "bg-warning",
      value: readyToDeliver ? readyToDeliver.length : 0,
    },
    {
      icon: <BsFillBoxFill size={24} />,
      text: "Available Product",
      bgColor: "bg-[#77CFBB]",
      value: availableProduct ? availableProduct.total : 0,
    },
    {
      icon: <BsChatSquareTextFill size={24} />,
      text: "Contacts",
      bgColor: "bg-[#766EDA]",
      value: pendingMsg ? pendingMsg.length : 0,
    },
  ];

  // const {
  //   data: datas,
  //   error,
  //   isLoading,
  //   isFetching,
  //   isSuccess,
  //   isUninitialized,
  // } = useGetContactByIDQuery("64731c5526d071ac04063cfc");

  // datas != undefined && console.log("data", datas);

  return (
    <div className="container">
      {/* cart  */}
      <div className="grid grid-cols-5 gap-x-10">
        {cardData.map((data) => (
          <div
            key={data.text}
            className={`${data.bgColor} rounded-lg flex items-center justify-between p-6 text-white`}
          >
            <div>
              <div>{data.icon}</div>
              <p className="mt-3 font-medium">{data.text}</p>
            </div>
            <p className="text-3xl font-semibold">{data.value}</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-6 mt-6">
        <div className="w-full bg-basic p-4 rounded-lg">
          <AreaChart />
        </div>
        <div className="w-full bg-basic p-4 rounded-lg">
          <PieChart />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mt-6">
        <div className="w-full bg-basic p-4 rounded-lg">
          <h1 className="font-semibold text-md mb-3 ml-3">Recent Orders</h1>
          <RecentOrder />
        </div>
        <div className="w-full bg-basic p-4 rounded-lg">
          <h1 className="font-semibold text-md mb-3 ml-3">Recent Customers</h1>
          <RecentCustomer />
        </div>
      </div>
      <div className="mt-6">
        <h1 className="font-semibold text-md mb-3 ml-3">Recent Products</h1>
        <Product />
      </div>
    </div>
  );
};

export default Home;
