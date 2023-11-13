"use client";
import { RxDashboard } from "react-icons/rx";
import { FaUserAlt, FaWarehouse } from "react-icons/fa";
import { SiGoogleanalytics } from "react-icons/si";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { IoTicketOutline } from "react-icons/io5";
import { usePathname } from "next/navigation";
import {
  BsFillBoxFill,
  BsChatLeftText,
  BsChatRightText,
  BsFillFileEarmarkSpreadsheetFill,
} from "react-icons/bs";
import {
  MdCategory,
  MdDiscount,
  MdOutlineDashboardCustomize,
  MdUnsubscribe,
} from "react-icons/md";
import { TbSpeakerphone } from "react-icons/tb";
import Link from "next/link";
import { useEffect, useState } from "react";

const Sidebar = () => {
  const datas = [
    {
      _id: "100",
      title: "Dashboard",
      link: "/",
      icon: <RxDashboard size={18} />,
    },
    {
      _id: "101",
      title: "Customer",
      link: "/customers",
      icon: <FaUserAlt size={18} />,
    },
    {
      _id: "102",
      title: "Analytics",
      link: "/analytics",
      icon: <SiGoogleanalytics size={18} />,
    },
    {
      _id: "103",
      title: "Orders",
      link: "/orders",
      icon: <AiOutlineShoppingCart size={18} />,
    },
    {
      _id: "105",
      title: "Transactions",
      link: "/transactions",
      icon: <BsFillFileEarmarkSpreadsheetFill size={18} />,
    },
    {
      _id: "104",
      title: "ERP Products",
      link: "/erp-products",
      icon: <BsFillBoxFill size={18} />,
    },
    {
      _id: "104",
      title: "Products",
      link: "/products",
      icon: <BsFillBoxFill size={18} />,
    },
    {
      _id: "107",
      title: "Discounts",
      link: "/discounts",
      icon: <MdDiscount size={18} />,
    },
    {
      _id: "108",
      title: "Contacts",
      link: "/contacts",
      icon: <BsChatLeftText size={18} />,
    },
    {
      _id: "207",
      title: "Warehouse",
      link: "/warehouses",
      icon: <FaWarehouse size={18} />,
    },
    {
      _id: "106",
      title: "Promotions",
      link: "/promotions",
      icon: <TbSpeakerphone size={18} />,
    },
    {
      _id: "203",
      title: "Category",
      link: "/category",
      icon: <MdCategory size={18} />,
    },
    {
      _id: "204",
      title: "SubCategory",
      link: "/subcategory",
      icon: <MdCategory size={18} />,
    },
    {
      _id: "109",
      title: "Subscriber",
      link: "/subscribers",
      icon: <MdUnsubscribe size={18} />,
    },
    {
      _id: "110",
      title: "Basic Customization",
      link: "/customization",
      icon: <MdOutlineDashboardCustomize size={18} />,
    },
    {
      _id: "110",
      title: "NavBar Sale Customization",
      link: "/nav-sale",
      icon: <MdOutlineDashboardCustomize size={18} />,
    },
  ];

  const path = usePathname();

  const [click, setClick] = useState(path);

  useEffect(() => {
    setClick(path);
  }, [path]);

  const isActiveLink = (link: string) => {
    if (link === "/") {
      return path === "/";
    }
    return path.startsWith(link);
  };
  return (
    <div className="flex-1 h-[100vh] sticky top-0 overflow-auto bg-primary">
      <div className="p-3 flex flex-col gap-2">
        {datas.map((data, index) => (
          <div key={index}>
            <Link
              href={data?.link}
              className={`flex gap-4 items-center pl-3 py-2 rounded-lg ${
                isActiveLink(data?.link)
                  ? "bg-secondary text-basic"
                  : "bg-basic"
              }`}
            >
              <p
                className={`${
                  isActiveLink(data?.link) ? "text-white" : "text-black"
                }`}
              >
                {data?.icon}
              </p>
              <p className="font-medium">{data?.title}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;

{
  /* <div className="flex-1 h-[93.5vh] fixed top-0 overflow-auto">
      <div className="pl-6 pt-6 flex flex-col gap-2">
        {datas.map((data, index) => (
          <div key={index}>
            <Link
              href={data?.link}
              className={`flex gap-4 items-center pl-3 py-2 rounded-lg ${
                isActiveLink(data?.link)
                  ? "bg-secondary text-basic"
                  : "bg-basic"
              }`}
            >
              <p
                className={`${
                  isActiveLink(data?.link) ? "text-white" : "text-black"
                }`}
              >
                {data?.icon}
              </p>
              <p className="font-medium">{data?.title}</p>
            </Link>
          </div>
        ))}
      </div>
    </div> */
}
