"use client";
import React, { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import TopRightCarosel from "./TopRightCarosel";
import Banner from "./Banner";
import DeliveryPartner from "./DeliveryPartner";
import Faq from "./Faq";
import AboutUs from "./AboutUs";
import TopLeftCarosel from "./TopLeftCarosel";

const buttonList = [
  { _id: "100", title: "TopLeftCarosel", component: TopLeftCarosel },
  { _id: "101", title: "TopRightCarosel", component: TopRightCarosel },
  { _id: "102", title: "BannerSection", component: Banner },
  { _id: "103", title: "DeliveryPartner", component: DeliveryPartner },
  { _id: "104", title: "Faq", component: Faq },
  { _id: "105", title: "AboutUs", component: AboutUs },
];

const ButtonToggle = () => {
  const [activeItemId, setActiveItemId] = useState(buttonList[0]._id);

  const activateItem = (itemId: string) => {
    setActiveItemId(itemId);
  };

  const ActiveComponent = buttonList.find(
    (data) => data._id === activeItemId
  )?.component;

  return (
    <>
      <div className="flex gap-3 items-center flex-wrap">
        {buttonList?.map((data, index) => (
          <div key={index}>
            <div>
              <button
                className="flex items-center gap-2 bg-secondary text-white py-1.5 px-6 rounded-lg"
                onClick={() => activateItem(data._id)}
              >
                <span>{data?.title}</span>
                {activeItemId === data._id ? (
                  <FaMinus size={15} />
                ) : (
                  <FaPlus size={15} />
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
      <div>{ActiveComponent && <ActiveComponent />}</div>
    </>
  );
};

export default ButtonToggle;
