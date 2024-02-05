"use client";
import { RxDashboard } from "react-icons/rx";
import { FaUserAlt } from "react-icons/fa";
import { SiGoogleanalytics } from "react-icons/si";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsFillBoxFill, BsChatLeftText } from "react-icons/bs";
import {
  MdCategory,
  MdDiscount,
  MdOutlineDashboardCustomize,
  MdUnsubscribe,
} from "react-icons/md";
import { TbSpeakerphone } from "react-icons/tb";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { RiAdvertisementFill } from "react-icons/ri";

const Sidebar = () => {
  const datas = [
    {
      _id: "100",
      title: "Dashboard",
      link: "/",
      icon: <RxDashboard size={18} />,
    },
    {
      _id: "102",
      title: "Analytics",
      link: "/analytics",
      icon: <SiGoogleanalytics size={18} />,
    },
    {
      _id: "101",
      title: "Customer",
      link: "/customers",
      icon: <FaUserAlt size={18} />,
    },
    {
      _id: "103",
      title: "Orders",
      link: "/orders",
      icon: <AiOutlineShoppingCart size={18} />,
    },
    // {
    //   _id: "105",
    //   title: "Transactions",
    //   link: "/transactions",
    //   icon: <BsFillFileEarmarkSpreadsheetFill size={18} />,
    // },
    {
      _id: "104",
      title: "ERP Products",
      link: "/erp-products",
      icon: <BsFillBoxFill size={18} />,
    },
    {
      _id: "144",
      title: "Products",
      link: "/products",
      icon: <BsFillBoxFill size={18} />,
    },
    {
      _id: "107",
      title: "Coupon",
      link: "/coupon",
      icon: <MdDiscount size={18} />,
    },
    {
      _id: "110",
      title: "Promotions",
      link: "/promotions",
      icon: <TbSpeakerphone size={18} />,
    },
    {
      _id: "108",
      title: "User Contacts",
      link: "/contacts",
      icon: <BsChatLeftText size={18} />,
    },
    {
      _id: "111",
      title: "Category",
      link: "/category",
      icon: <MdCategory size={18} />,
    },
    {
      _id: "112",
      title: "SubCategory",
      link: "/subcategory",
      icon: <MdCategory size={18} />,
    },
    {
      _id: "113",
      title: "Sale Tag",
      link: "/sale-tag",
      icon: <MdCategory size={18} />,
    },
    {
      _id: "114",
      title: "Fastival Tag",
      link: "/festival-tag",
      icon: <MdCategory size={18} />,
    },
    {
      _id: "115",
      title: "Subscriber",
      link: "/subscribers",
      icon: <MdUnsubscribe size={18} />,
    },
    {
      _id: "120",
      title: "Nav Advertisement",
      link: "/nav-advertisement",
      icon: <RiAdvertisementFill />,
    },
    {
      _id: "116",
      title: "Basic Customization",
      link: "/customization",
      icon: <MdOutlineDashboardCustomize size={18} />,
    },
  ];

  const path = usePathname();

  const isActiveLink = (link: string) => {
    if (link === "/") {
      return path === "/";
    }
    return path.startsWith(link);
  };
  return (
    <div className="h-[100vh] sticky top-0 bg-primary w-full overflow-auto">
      <div className="p-4 flex flex-col gap-2 w-full">
        {datas.map((data) => (
          <div className="w-full" key={data._id}>
            <Link
              href={data?.link}
              className={`w-full flex gap-4 items-center px-4 py-2 rounded-lg ${
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
              <p className="font-medium w-full">{data?.title}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
