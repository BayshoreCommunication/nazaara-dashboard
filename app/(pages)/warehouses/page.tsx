"use client";
import Loader from "@/components/Loader";
import CreateWarehouse from "@/components/warehouse/CreateWarehouse";
import WarehouseList from "@/components/warehouse/WarehouseList";
import { useGetwarehousesQuery } from "@/services/warehouseApi";
import React from "react";
import { RxCross2 } from "react-icons/rx";

const Warehouses = () => {
  const { data: warehouses, isLoading, refetch } = useGetwarehousesQuery();

  if (isLoading) {
    return <Loader height="h-[90vh]" />;
  }

  return (
    <div className="flex gap-10 dynamic-container">
      {/* show all category  */}
      {warehouses != undefined && (
        <WarehouseList data={warehouses.data} status={""} refetch={refetch} />
      )}

      {/* add new promotion  */}
      <div className="flex-[3]">
        <h1 className="text-lg font-semibold mb-2">Add New Warehouse</h1>
        <CreateWarehouse refetch={refetch} />
      </div>

      {/* modal code start  */}
      <input type="checkbox" id="modal-handle" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            className="absolute top-3 right-3 text-xl font-semibold cursor-pointer"
            htmlFor="modal-handle"
          >
            <RxCross2 />
          </label>
          <div className="flex-[3]">
            <h1 className="text-lg font-semibold mb-2 ml-3">
              Update Warehouse
            </h1>
            <div className="bg-white p-3 flex flex-col gap-y-3 rounded-xl">
              <div>
                <label className="font-medium" htmlFor="name">
                  Warehouse Name:
                </label>
                <input
                  className="block w-full p-2 border border-gray-400 focus:outline-none text-gray-500 mt-1"
                  id="name"
                  type="text"
                  placeholder="Input Here"
                />
              </div>
              <div className="mb-2">
                <label className="font-medium" htmlFor="status">
                  Status:
                </label>
                <select
                  className="w-full border border-gray-400 rounded-sm p-2 focus:outline-none text-gray-500"
                  name="status"
                  id="status"
                >
                  <option selected disabled>
                    Choose Status
                  </option>
                  <option value="draft">Draft</option>
                  <option value="published">Publish</option>
                </select>
              </div>
              <button className="bg-secondary py-1 px-4 rounded-md text-white w-full">
                Update
              </button>
            </div>
          </div>
        </div>
        <label className="modal-backdrop" htmlFor="modal-handle">
          Close
        </label>
      </div>
      {/* modal code end  */}
    </div>
  );
};

export default Warehouses;
