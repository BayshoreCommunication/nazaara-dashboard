import { TCoupon } from "@/types/types";
import { FC } from "react";
import { MdDelete } from "react-icons/md";
import { TbEdit } from "react-icons/tb";

export interface Category {
  _id: string;
  name: string;
  status: string;
}

interface CouponListProps {
  coupons: TCoupon[];
  handleEditCoupon: (id: string) => void;
  handleDeleteCoupon: (id: string) => void;
}

const PromotionList: FC<CouponListProps> = ({
  coupons,
  handleEditCoupon,
  handleDeleteCoupon,
}) => {
  return (
    <table className="table bg-basic">
      <thead>
        <tr>
          <th>SL</th>
          <th>Coupon Name</th>
          <th>Discount</th>
          <th>Expires At</th>
          <th>Free Shipping</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {coupons.map((data, index) => {
          const date = new Date(data.expires);
          const currentDate = new Date();
          console.log("current date", currentDate);

          const isExpired = date < currentDate;
          const day = date.getDate().toString().padStart(2, "0");
          const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-indexed
          const year = date.getFullYear();

          const formattedDate = `${day}/${month}/${year}`;
          const status = isExpired ? "expired" : data.status;
          // const status = isExpired ? true : false;
          console.log("statsusssf", data.freeShipping);

          return (
            <tr key={data._id}>
              <td>{index + 1}</td>
              <td>{data.name}</td>
              <td>
                {data.discountOff}
                {data.discountType === "percentage" ? "%" : "tk"}
              </td>
              <td>{formattedDate}</td>
              <td
                className={`font-medium ${
                  data.freeShipping ? "text-green-500" : "text-red-500"
                }`}
              >
                {data.freeShipping ? "true" : "false"}
              </td>
              <td
                className={`font-medium ${
                  data.status === "draft" || status === "expired"
                    ? "text-red-600"
                    : "text-green-600"
                }`}
              >
                {status}
              </td>
              <td>
                <div className="flex">
                  <label
                    onClick={() => handleEditCoupon(data._id as string)}
                    className="cursor-pointer"
                    htmlFor="modal-handle"
                  >
                    <TbEdit color="green" size={20} />
                  </label>
                  <button
                    onClick={() => handleDeleteCoupon(data._id as string)}
                  >
                    <MdDelete color="red" size={20} />
                  </button>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default PromotionList;
