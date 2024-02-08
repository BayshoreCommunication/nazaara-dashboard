import { formatYearMonthDay } from "@/helpers/formatYearMonthDay";
import { useGetCategoriesQuery } from "@/services/categoryApi";
import { useDeleteAPromotionMutation } from "@/services/promotionApi";
import { useGetSubCategoriesQuery } from "@/services/subcategory";
import { IPromotions } from "@/types/promotionTypes";
import { FC } from "react";
import { MdDelete } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import Swal from "sweetalert2";

interface promotionProps {
  promotions: IPromotions;
  handleEditPromotion: (id: string) => void;
}

const PromotionList: FC<promotionProps> = ({
  promotions,
  handleEditPromotion,
}) => {
  const { data: categoryData } = useGetCategoriesQuery();
  const { data: subCategoryData } = useGetSubCategoriesQuery();
  const [deletePromotion] = useDeleteAPromotionMutation();

  const handleDeletePromotion = async (id: string) => {
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
        const couponDel = await deletePromotion(id);
        if (couponDel) {
          Swal.fire("Deleted!", "Your coupon has been deleted.", "success");
        }
      }
    });
  };

  const getCategoryTitles = (categoryIds: string[] | undefined) => {
    if (!categoryIds || categoryIds.length === 0) {
      return [];
    }

    return categoryIds.map((categoryId) => {
      const category = categoryData?.data.find(
        (data) => data._id === categoryId
      );
      return (
        (
          <span
            key={categoryId}
            className="bg-slate-200 w-max px-1 rounded text-xs font-medium py-[2px]"
          >
            {category?.title}
          </span>
        ) || ""
      );
    });
  };

  const getSubCategoryTitles = (subCategoryIds: string[] | undefined) => {
    if (!subCategoryIds || subCategoryIds.length === 0) {
      return [];
    }

    return subCategoryIds.map((subCategoryId) => {
      const category = subCategoryData?.data.find(
        (data) => data._id === subCategoryId
      );
      return (
        (
          <div
            key={subCategoryId}
            className="bg-slate-200 w-max px-1 rounded text-xs font-medium py-[2px]"
          >
            {category?.title}
          </div>
        ) || ""
      );
    });
  };

  return (
    <table className="table bg-basic">
      <thead>
        <tr>
          <th>SL</th>
          <th>Promotion Title</th>
          <th>Promotion On</th>
          <th>Cateogory</th>
          <th>SubCategory</th>
          <th>Start Date</th>
          <th>Expire Date</th>
          <th>Free Shipping</th>
          <th>Discount Type</th>
          <th>Discount Off</th>
          <th>Status</th>
          <th>Validity</th>
          <th>Actions</th>
        </tr>
      </thead>
      {promotions.success && promotions.data.length > 0 && (
        <tbody>
          {promotions.data.map((data, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{data.title}</td>
                <td>{data.promotionOn}</td>
                <td>
                  <div className="flex gap-1 flex-wrap">
                    {getCategoryTitles(data.categoryId)}
                  </div>
                </td>
                <td>
                  <div className="flex gap-1 flex-wrap">
                    {getSubCategoryTitles(data.subCategoryId)}
                  </div>
                </td>
                <td>{formatYearMonthDay(data.startDate)}</td>
                <td>{formatYearMonthDay(data.expireDate)}</td>
                <td
                  className={`font-medium ${
                    data.freeShipping ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {data.freeShipping ? "true" : "false"}
                </td>
                <td>{data.discountType}</td>
                <td>
                  {data.discountOff}
                  {data.discountType === "percentage" ? "%" : "/-"}
                </td>
                <td
                  className={`font-medium ${
                    data.status === "published"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {data.status}
                </td>
                <td
                  className={`font-medium ${
                    data.validPromotion ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {data.validPromotion ? "valid" : "invalid"}
                </td>
                <td>
                  <div className="flex">
                    <label
                      onClick={() => handleEditPromotion(data._id as string)}
                      className="cursor-pointer"
                      htmlFor="modal-handle"
                    >
                      <TbEdit color="green" size={20} />
                    </label>
                    <button
                      onClick={() => handleDeletePromotion(data._id as string)}
                    >
                      <MdDelete color="red" size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      )}
    </table>
  );
};

export default PromotionList;
