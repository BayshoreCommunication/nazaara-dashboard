"use client";
import { MdDelete } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import { useGetContactsQuery } from "@/services/contactApi";
import Loader from "@/components/loader";
import { AiOutlineDownload, AiOutlineShoppingCart } from "react-icons/ai";
import UtilityBtn from "@/components/UtilityBtn";
import { BiMailSend } from "react-icons/bi";

const Contacts = () => {
  const { data: contactData, isLoading, refetch } = useGetContactsQuery();
  return isLoading ? (
    <Loader height="h-[85vh]" />
  ) : (
    <div className="container">
      <div className="flex items-center justify-between mb-3">
        <div className="flex gap-2 items-center">
          <AiOutlineShoppingCart size={18} color="gray" />
          <span className="font-medium text-lg">All Contacts</span>
        </div>
        <UtilityBtn name="Export" icon={<AiOutlineDownload color="white" />} />
      </div>
      <div className="overflow-x-auto">
        <table className="table bg-basic">
          <thead>
            <tr>
              <th>SL</th>
              <th>Email</th>
              <th>Message</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contactData?.data.map((data, index) => {
              if (data.status === "pending") {
                return (
                  <tr key={data._id}>
                    <td>{index + 1}</td>
                    <td>{data?.user?.email}</td>
                    <td>{data.message}</td>
                    <td
                      className={`${
                        data.status === "pending"
                          ? "text-yellow-500"
                          : "text-green-500"
                      }`}
                    >
                      {data.status}
                    </td>
                    <td>
                      <div className="flex">
                        <label
                          className="cursor-pointer"
                          htmlFor="modal-handle"
                        >
                          <TbEdit color="green" size={20} />
                        </label>
                        <a href={`mailto:${data?.user?.email}`}>
                          <BiMailSend size={20} color="#820000" />
                        </a>
                      </div>
                    </td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Contacts;
