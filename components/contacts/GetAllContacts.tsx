"use client";
import React from "react";
import {
  useDeleteContactMutation,
  useGetContactsQuery,
} from "@/services/contactApi";
import Loader from "@/components/Loader";
import { BiMailSend } from "react-icons/bi";
import { formatDate } from "@/helpers/formatDate";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";

export const GetAllContacts = () => {
  const { data: contactData, isLoading } = useGetContactsQuery();
  const [deleteContact] = useDeleteContactMutation();

  const handleDeleteContact = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      customClass: {
        confirmButton: "swal2-confirm !bg-blue-600 !text-white",
        cancelButton: "swal2-cancel !bg-red-600 !text-white",
      },
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const categoryDel = await deleteContact(id);
        if (categoryDel) {
          Swal.fire("Deleted!", "Contact Deleted Successfully.", "success");
        }
      }
    });
  };

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
          <tr key={data._id}>
            <td>{index + 1}</td>
            <td>{data?.name}</td>
            <td>{data?.email}</td>
            <td>{data?.message}</td>
            <td>{data?.subject}</td>
            <td>{formatDate(data?.createdAt)}</td>
            <td>
              <span className="flex items-center justify-center">
                <a target="_blank" href={`mailto:${data?.email}`}>
                  <BiMailSend size={20} color="#820000" />
                </a>
                <button onClick={() => handleDeleteContact(data._id)}>
                  <MdDelete size={20} color="red" />
                </button>
              </span>
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
