import { AiOutlineShoppingCart } from "react-icons/ai";
import { BiCategory } from "react-icons/bi";
import { BsChatSquareTextFill, BsFillBoxFill } from "react-icons/bs";
import AreaChart from "@/components/AreaChart";
import PieChart from "@/components/PieChart";
import RecentOrder from "@/components/home/RecentOrder";
import RecentCustomer from "@/components/home/RecentCustomer";
import Product from "@/components/Product";
import { fetchServerSideData } from "@/components/ServerSideDataFetching";

interface CardDataItem {
  icon: JSX.Element;
  text: string;
  bgColor: string;
  value: number;
  newValue: number;
}

const HomePage = async () => {
  const orderApiUrl = `${process.env.API_URL}/api/v1/order/recent-five`;
  const countDataUrl = `${process.env.API_URL}/api/v1/product/home-page-count`;
  const orderData = await fetchServerSideData(orderApiUrl);
  const countData = await fetchServerSideData(countDataUrl);

  const cardData: CardDataItem[] = [
    {
      icon: <BiCategory size={24} />,
      text: "Categories",
      bgColor: "bg-[#FC8D68]",
      value: countData.data[0].category.totalData,
      newValue: countData.data[0].category.newData,
    },
    {
      icon: <BiCategory size={24} />,
      text: "SubCategories",
      bgColor: "bg-warning",
      value: countData.data[0].subCategory.totalData,
      newValue: countData.data[0].subCategory.newData,
    },
    {
      icon: <BsFillBoxFill size={24} />,
      text: "Products",
      bgColor: "bg-[#77CFBB]",
      value: countData.data[0].products.totalData,
      newValue: countData.data[0].products.newData,
    },
    {
      icon: <AiOutlineShoppingCart size={24} />,
      text: "Orders",
      bgColor: "bg-secondary",
      value: countData.data[0].orders.totalData,
      newValue: countData.data[0].orders.newData,
    },
    // {
    //   icon: <TbTruckDelivery size={24} />,
    //   text: "Ready to Deliver",
    //   bgColor: "bg-warning",
    //   value: countData.data[0].category.totalData,
    //   newValue: countData.data[0].category.newData,
    // },
    {
      icon: <BsChatSquareTextFill size={24} />,
      text: "Contacts",
      bgColor: "bg-[#766EDA]",
      value: countData.data[0].contacts.totalData,
      newValue: countData.data[0].contacts.newData,
    },
  ];

  return (
    <div className="dynamic-container">
      {/* cart  */}
      <div className="grid grid-cols-5 gap-x-10">
        {cardData.map((data) => (
          <div className="relative" key={data.text}>
            {data.newValue > 0 && (
              <span className="absolute -top-2 -right-2 w-6 p-2 h-6 bg-red-600 text-white flex justify-center items-center rounded-full text-sm">
                {data.newValue}
              </span>
            )}
            <div
              className={`${data.bgColor} rounded-lg flex items-center justify-between p-6 text-white`}
            >
              <div>
                <div>{data.icon}</div>
                <p className="mt-3 font-medium">{data.text}</p>
              </div>
              <p className="text-3xl font-semibold">{data.value}</p>
            </div>
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
          <h2 className="font-semibold text-md mb-3 ml-3">Recent Orders</h2>
          {orderData.success && orderData.data.length > 0 ? (
            <RecentOrder orderData={orderData.data} />
          ) : (
            <p className="flex items-center justify-center w-full h-full">
              No Recent Order Found!
            </p>
          )}
        </div>
        <div className="w-full bg-basic p-4 rounded-lg">
          {/* <div className="flex items-center justify-between"> */}
          <h2 className="font-semibold text-md mb-3 ml-3">Recent Customers</h2>
          {/* <Link href={"/customers"}>
              <SecondaryButton name="All Customers" />
            </Link> */}
          {/* </div> */}
          <RecentCustomer />
        </div>
      </div>
      <div className="mt-6">
        <h2 className="font-semibold text-md mb-3 ml-3">Recent Products</h2>
        <Product />
      </div>
    </div>
  );
};

export default HomePage;
