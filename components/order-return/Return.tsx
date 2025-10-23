"use client";
import React, { useState } from "react";
import Loader from "../Loader";
import { MdDelete } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import { formatDate } from "@/helpers/formatDate";
import Swal from "sweetalert2";
import axios from "axios";
import { RxCross2 } from "react-icons/rx";
import toast from "react-hot-toast";
import { fetchServerSideData } from "@/action/fetchServerSideData";

const Return = ({ returnData }: any) => {
  const [returnSingleData, setReturnSingleData] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    approval: "pending",
  });
  // console.log("api url ff", process.env.API_URL);
  const handleEditReturn = async (id: string) => {
    try {
      setModalOpen(true);

      const url = `${process.env.API_URL}/api/v1/return-exchange/${id}`;
      const response = await fetchServerSideData(url);

      const data = response?.data;
      if (!data) {
        console.error("No return-exchange data found");
        return;
      }

      setFormData({
        approval: data.approval,
      });
      setReturnSingleData(data);
    } catch (error) {
      console.error("Error fetching return-exchange data:", error);
    }
  };

  // console.log("returnData", returnData);

  const handleDeleteReturn = async (id: any) => {
    // console.log("id", id);

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await axios.delete(
          `${process.env.API_URL}/api/v1/return-exchange/${id}`,
          {
            headers: {
              authorization: `Nazaara@Token ${process.env.API_SECURE_KEY}`,
            },
          }
        );
        if (response.data) {
          Swal.fire(
            "Deleted!",
            "Your return data has been deleted.",
            "success"
          );
        }
        // console.log("response for delete", response.data);
      }
    });
  };
  const handleUpdateReturnSubmit = async (e: any, id: any) => {
    e.preventDefault();
    const response = await axios.patch(
      `${process.env.API_URL}/api/v1/return-exchange/${id}`,
      formData,
      {
        headers: {
          authorization: `Nazaara@Token ${process.env.API_SECURE_KEY}`,
        },
      }
    );
    if (response) {
      toast.success("Return data updated successfully");
    }
    setModalOpen(false);
  };
  return (
    <>
      <table className="table bg-basic">
        <thead>
          <tr>
            <th>SL</th>
            <th>User Name</th>
            <th>User Email</th>
            <th>User Phone</th>
            <th>Order ID</th>
            <th>Issue</th>
            <th>Approval</th>
            <th>Return Request Time</th>
          </tr>
        </thead>
        <tbody>
          {/* if subCategory.length === 0 show no data found */}
          {returnData?.data?.length === 0 && (
            <tr>
              <td colSpan={5}>
                <div className="flex justify-center items-center">
                  <span className="font-medium text-lg">No Data Found</span>
                </div>
              </td>
            </tr>
          )}
          {/* add loader here */}
          {returnData &&
            returnData?.data?.length > 0 &&
            returnData?.data?.map((data: any, index: number) => (
              <tr key={data._id}>
                <td>{index + 1}</td>
                <td>{data?.user_id?.fullName}</td>
                <td>{data?.user_id?.email}</td>
                <td>{data?.user_id?.phone}</td>
                <td>{data?.order?.transactionId}</td>
                <td>{data?.issue}</td>
                <td>{data?.approval}</td>
                <td>{formatDate(data?.createdAt)}</td>
                <td>
                  <div className="flex">
                    <label
                      onClick={() => handleEditReturn(data?._id)}
                      className="cursor-pointer"
                      htmlFor="return-handle"
                    >
                      <TbEdit color="green" size={20} />
                    </label>
                    <button onClick={() => handleDeleteReturn(data?._id)}>
                      <MdDelete color="red" size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {modalOpen && (
        <>
          {/* modal code start  */}
          <input type="checkbox" id="return-handle" className="modal-toggle" />

          {returnSingleData && (
            <div className="modal">
              <div className="modal-box relative">
                <label
                  className="absolute top-3 right-3 text-xl font-semibold cursor-pointer"
                  htmlFor="return-handle"
                >
                  <RxCross2 />
                </label>
                <div className="flex-[3]">
                  <h1 className="text-lg font-semibold mb-2 ml-3">
                    Update Return
                  </h1>

                  <form
                    onSubmit={(e) =>
                      handleUpdateReturnSubmit(e, (returnSingleData as any)._id)
                    }
                    className="bg-white p-3 flex flex-col gap-y-3 rounded-xl"
                  >
                    <div>
                      <label className="font-medium" htmlFor="name">
                        User Name:
                      </label>
                      <input
                        className="block w-full p-2 border border-gray-400 focus:outline-none text-gray-500 mt-1"
                        type="text"
                        required
                        value={(returnSingleData as any)?.user_id?.fullName}
                      />
                    </div>
                    <div className="mb-2">
                      <label className="font-medium" htmlFor="status">
                        Approval:
                      </label>
                      <select
                        className="w-full border border-gray-400 rounded-sm p-2 focus:outline-none text-gray-500"
                        required
                        value={formData.approval}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            approval: e.target.value,
                          })
                        }
                      >
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Reject</option>
                      </select>
                    </div>
                    <button
                      type="submit"
                      className="bg-secondary py-1 px-4 rounded-md text-white w-full"
                    >
                      Update
                    </button>
                  </form>
                </div>
              </div>
              <label className="modal-backdrop" htmlFor="return-handle">
                Close
              </label>
            </div>
          )}
          {/* modal code end  */}
        </>
      )}
    </>
  );
};

export default Return;
