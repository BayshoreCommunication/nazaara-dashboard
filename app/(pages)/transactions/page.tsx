import CancelStatus from "@/components/CancelStatus";
import CompleteStatus from "@/components/CompleteStatus";
import ProcessingStatus from "@/components/ProcessingStatus";
import UtilityBtn from "@/components/UtilityBtn";
import React from "react";
import { AiOutlineDownload, AiOutlineShoppingCart } from "react-icons/ai";

const Transactions = () => {
  return (
    <div>
      <div className="dynamic-container">
        <div className="flex items-center justify-between mb-3">
          <div className="flex gap-2 items-center">
            <AiOutlineShoppingCart size={18} color="gray" />
            <span className="font-medium text-lg">Transactions</span>
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
                <th>User ID</th>
                <th>Product ID</th>
                <th>Price</th>
                <th>Payment Type</th>
                <th>Discount Code</th>
                <th>Quantity</th>
                <th>Delivery Status</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              <tr>
                <td>1009701</td>
                <td>1009701</td>
                <td>1200 BDT</td>
                <td>Bkash</td>
                <td>1009701</td>
                <td>2</td>
                <td>
                  <ProcessingStatus />
                </td>
              </tr>
              <tr>
                <td>1009701</td>
                <td>1009701</td>
                <td>1200 BDT</td>
                <td>Bkash</td>
                <td>1009701</td>
                <td>2</td>
                <td>
                  <ProcessingStatus />
                </td>
              </tr>
              <tr>
                <td>1009701</td>
                <td>1009701</td>
                <td>1200 BDT</td>
                <td>Bkash</td>
                <td>1009701</td>
                <td>2</td>
                <td>
                  <ProcessingStatus />
                </td>
              </tr>
              <tr>
                <td>1009701</td>
                <td>1009701</td>
                <td>1200 BDT</td>
                <td>Bkash</td>
                <td>1009701</td>
                <td>2</td>
                <td>
                  <ProcessingStatus />
                </td>
              </tr>
              <tr>
                <td>1009701</td>
                <td>1009701</td>
                <td>1200 BDT</td>
                <td>Bkash</td>
                <td>1009701</td>
                <td>2</td>
                <td>
                  <ProcessingStatus />
                </td>
              </tr>
              <tr>
                <td>1009701</td>
                <td>1009701</td>
                <td>1200 BDT</td>
                <td>Bkash</td>
                <td>1009701</td>
                <td>2</td>
                <td>
                  <ProcessingStatus />
                </td>
              </tr>
              <tr>
                <td>1009701</td>
                <td>1009701</td>
                <td>1200 BDT</td>
                <td>Bkash</td>
                <td>1009701</td>
                <td>2</td>
                <td>
                  <ProcessingStatus />
                </td>
              </tr>
              <tr>
                <td>1009701</td>
                <td>1009701</td>
                <td>1200 BDT</td>
                <td>Bkash</td>
                <td>1009701</td>
                <td>2</td>
                <td>
                  <ProcessingStatus />
                </td>
              </tr>
              <tr>
                <td>1009701</td>
                <td>1009701</td>
                <td>1200 BDT</td>
                <td>Bkash</td>
                <td>1009701</td>
                <td>2</td>
                <td>
                  <ProcessingStatus />
                </td>
              </tr>
            </tbody>
          </table>
          {/* <CustomerViewProfileDrawer
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          toggleDrawer={toggleDrawer}
        /> */}
        </div>
      </div>
    </div>
  );
};

export default Transactions;
