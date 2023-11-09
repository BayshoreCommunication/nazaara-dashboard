"use client";
import React from "react";
import { useGetContactsQuery } from "@/services/contactApi";
import Loader from "@/components/loader";
import { TbEdit } from "react-icons/tb";
import { BiMailSend } from "react-icons/bi";
import Loading from "@/app/loading";

export const GetAllContacts = () => {
  const { data: contactData, isLoading } = useGetContactsQuery();

  return (
    <tbody>
      {isLoading ? (
        <tr>
          <td colSpan={6}>
            <Loader height="h-[20vh]" />
          </td>
        </tr>
      ) : contactData?.data.length && contactData?.data.length > 0 ? (
        contactData?.data.map((data, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{data?.email}</td>
            <td>{data?.message}</td>
            <td>{data?.subject}</td>
            <td
              className={`${
                data?.status === "pending"
                  ? "text-yellow-500"
                  : "text-green-500"
              }`}
            >
              {data?.status}
            </td>
            <td className="flex">
              <label className="cursor-pointer" htmlFor="modal-handle">
                <TbEdit color="green" size={20} />
              </label>
              <a href={`mailto:${data?.email}`}>
                <BiMailSend size={20} color="#820000" />
              </a>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={6}>
            <div className="flex justify-center items-center h-[20vh]">
              <span className="text-lg font-medium text-gray-500">
                No contacts found
              </span>
            </div>
          </td>
        </tr>
      )}
    </tbody>
  );
};

// (
//   <tr key={index}>
//     <td>{index + 1}</td>
//     <td>{data?.email}</td>
//     <td>{data?.message}</td>
//     <td
//       className={`${
//         data?.status === "pending"
//           ? "text-yellow-500"
//           : "text-green-500"
//       }`}
//     >
//       {data?.status}
//     </td>
//     <td className="flex">
//       <label className="cursor-pointer" htmlFor="modal-handle">
//         <TbEdit color="green" size={20} />
//       </label>
//       <a href={`mailto:${data?.email}`}>
//         <BiMailSend size={20} color="#820000" />
//       </a>
//     </td>
//   </tr>
// );
