"use client";
import CancelStatus from "@/components/CancelStatus";
import { useState } from "react";
import CompleteStatus from "@/components/CompleteStatus";
import OrderMeasurement from "@/components/OrderMeasurement";
import ProcessingStatus from "@/components/ProcessingStatus";
import UtilityBtn from "@/components/UtilityBtn";
import { AiOutlineDownload, AiOutlineShoppingCart } from "react-icons/ai";
import Link from "next/link";

const Orders = () => {
  const [openModal, setOpenModal] = useState(false);

  const handleChange = (): void => {
    setOpenModal(true);
  };
  console.log(openModal);

  return (
    <>
      <div className="container">
        <div className="flex items-center justify-between mb-3">
          <div className="flex gap-2 items-center">
            <AiOutlineShoppingCart size={18} color="gray" />
            <span className="font-medium text-lg">Orders</span>
          </div>
          <UtilityBtn
            name="Export"
            icon={<AiOutlineDownload color="white" />}
          />
        </div>
        <div className="overflow-x-auto">
          <table className="table bg-basic">
            {/* head */}
            <thead className="">
              <tr>
                <th>Invoice No</th>
                <th>Order No</th>
                <th>Contact</th>
                <th>Price</th>
                <th>Delivery Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              <tr>
                <td>1009701</td>
                <td>1009701</td>
                <td>Hamid Hasan</td>
                <td>1200 BDT</td>
                <td>
                  <ProcessingStatus />
                </td>
                <td>
                  <div>
                    <Link href="/orders/qeqweqw">
                      <button className="text-[#5B94FC]">Update</button>
                    </Link>
                    <span className="text-[#3b7ffd]"> | </span>
                    <button className="text-[#5B94FC]">View</button>
                  </div>
                  <label
                    htmlFor="my-modal-3"
                    onClick={() => handleChange()}
                    className="text-[#5B94FC] cursor-pointer"
                  >
                    Measurement
                  </label>
                </td>
              </tr>
              <tr>
                <td>1009701</td>
                <td>1009701</td>
                <td>Hamid Hasan</td>
                <td>1200 BDT</td>
                <td>
                  <ProcessingStatus />
                </td>
                <td>
                  <div>
                    <Link href="/orders/qeqweqw">
                      <button className="text-[#5B94FC]">Update</button>
                    </Link>
                    <span className="text-[#3b7ffd]"> | </span>
                    <button className="text-[#5B94FC]">View</button>
                  </div>
                  <button className="text-[#5B94FC]">Measurement</button>
                </td>
              </tr>
              <tr>
                <td>1009701</td>
                <td>1009701</td>
                <td>Hamid Hasan</td>
                <td>1200 BDT</td>
                <td>
                  <ProcessingStatus />
                </td>
                <td>
                  <div>
                    <Link href="/orders/qeqweqw">
                      <button className="text-[#5B94FC]">Update</button>
                    </Link>
                    <span className="text-[#3b7ffd]"> | </span>
                    <button className="text-[#5B94FC]">View</button>
                  </div>
                  <button className="text-[#5B94FC]">Measurement</button>
                </td>
              </tr>
              <tr>
                <td>1009701</td>
                <td>1009701</td>
                <td>Hamid Hasan</td>
                <td>1200 BDT</td>
                <td>
                  <ProcessingStatus />
                </td>
                <td>
                  <div>
                    <Link href="/orders/qeqweqw">
                      <button className="text-[#5B94FC]">Update</button>
                    </Link>
                    <span className="text-[#3b7ffd]"> | </span>
                    <button className="text-[#5B94FC]">View</button>
                  </div>
                  <button className="text-[#5B94FC]">Measurement</button>
                </td>
              </tr>
              <tr>
                <td>1009701</td>
                <td>1009701</td>
                <td>Hamid Hasan</td>
                <td>1200 BDT</td>
                <td>
                  <ProcessingStatus />
                </td>
                <td>
                  <div>
                    <button className="text-[#5B94FC]">Update</button>
                    <span className="text-[#3b7ffd]"> | </span>
                    <button className="text-[#5B94FC]">View</button>
                  </div>
                  <button className="text-[#5B94FC]">Measurement</button>
                </td>
              </tr>
              <tr>
                <td>1009701</td>
                <td>1009701</td>
                <td>Hamid Hasan</td>
                <td>1200 BDT</td>
                <td>
                  <ProcessingStatus />
                </td>
                <td>
                  <div>
                    <button className="text-[#5B94FC]">Update</button>
                    <span className="text-[#3b7ffd]"> | </span>
                    <button className="text-[#5B94FC]">View</button>
                  </div>
                  <button className="text-[#5B94FC]">Measurement</button>
                </td>
              </tr>
              <tr>
                <td>1009701</td>
                <td>1009701</td>
                <td>Hamid Hasan</td>
                <td>1200 BDT</td>
                <td>
                  <CompleteStatus />
                </td>
                <td>
                  <div>
                    <button className="text-[#5B94FC]">Update</button>
                    <span className="text-[#3b7ffd]"> | </span>
                    <button className="text-[#5B94FC]">View</button>
                  </div>
                  <button className="text-[#5B94FC]">Measurement</button>
                </td>
              </tr>
              <tr>
                <td>1009701</td>
                <td>1009701</td>
                <td>Hamid Hasan</td>
                <td>1200 BDT</td>
                <td>
                  <ProcessingStatus />
                </td>
                <td>
                  <div>
                    <button className="text-[#5B94FC]">Update</button>
                    <span className="text-[#3b7ffd]"> | </span>
                    <button className="text-[#5B94FC]">View</button>
                  </div>
                  <button className="text-[#5B94FC]">Measurement</button>
                </td>
              </tr>
              <tr>
                <td>1009701</td>
                <td>1009701</td>
                <td>Hamid Hasan</td>
                <td>1200 BDT</td>
                <td>
                  <ProcessingStatus />
                </td>
                <td>
                  <div>
                    <button className="text-[#5B94FC]">Update</button>
                    <span className="text-[#3b7ffd]"> | </span>
                    <button className="text-[#5B94FC]">View</button>
                  </div>
                  <button className="text-[#5B94FC]">Measurement</button>
                </td>
              </tr>
              <tr>
                <td>1009701</td>
                <td>1009701</td>
                <td>Hamid Hasan</td>
                <td>1200 BDT</td>
                <td>
                  <CancelStatus />
                </td>
                <td>
                  <div>
                    <button className="text-[#5B94FC]">Update</button>
                    <span className="text-[#3b7ffd]"> | </span>
                    <button className="text-[#5B94FC]">View</button>
                  </div>
                  <button className="text-[#5B94FC]">Measurement</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <OrderMeasurement openModal={openModal} />
    </>
  );
};

export default Orders;
