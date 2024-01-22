"use client";
import { TbEdit } from "react-icons/tb";
import Loader from "@/components/Loader";
import { AiOutlineDownload, AiOutlineShoppingCart } from "react-icons/ai";
import UtilityBtn from "@/components/UtilityBtn";
import { BiMailSend } from "react-icons/bi";
import { useGetSubscriberQuery } from "@/services/subscriberApi";
import { useEffect, useState } from "react";
import axios from "axios";
import { formatDate } from "@/helpers/formatDate";
export interface ISubscriber {
  status: string;
  data: IData[];
}

export interface IData {
  _id: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const Subscriber = () => {
  // const { data: subscribeData, isLoading } = useGetSubscriberQuery();
  const [data, setData] = useState<ISubscriber>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Make a GET request when the component mounts
    axios
      .get(`${process.env.API_URL}/api/v1/subscriber`)
      .then((response) => {
        setData(response.data); // Assuming the response is JSON data
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  }, []);

  return isLoading ? (
    <Loader height="h-[85vh]" />
  ) : (
    <div className="container">
      <div className="flex items-center justify-between mb-3">
        <div className="flex gap-2 items-center">
          <AiOutlineShoppingCart size={18} color="gray" />
          <span className="font-medium text-lg">All Subscriber</span>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="table bg-basic">
          <thead>
            <tr>
              <th>SL</th>
              <th>Email</th>
              <th>Subscribe At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.map((data: any, index: number) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{data?.email}</td>
                <td>{formatDate(data?.createdAt)}</td>
                <td>
                  <div className="flex">
                    {/* <label className="cursor-pointer" htmlFor="modal-handle">
                      <TbEdit color="green" size={20} />
                    </label> */}
                    <a href={`mailto:${data?.email}`}>
                      <BiMailSend size={20} color="#820000" />
                    </a>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Subscriber;
