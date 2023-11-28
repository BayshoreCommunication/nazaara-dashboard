"use client";
import DiscountForm from "@/components/discount/DiscountForm";
import DiscountList from "@/components/discount/DiscountList";
import Loader from "@/components/Loader";
import {
  useGetCouponsQuery,
  useDeleteCouponMutation,
  useUpdateCouponMutation,
  useCreateCouponMutation,
} from "@/services/couponApi";
import { TCoupon } from "@/types/types";
import axios from "axios";
import { FC, useState, FormEvent, useRef } from "react";
import toast from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";
import Swal from "sweetalert2";

const Discount: FC = () => {
  const { data: couponData, isLoading, refetch } = useGetCouponsQuery();
  const [createCoupon] = useCreateCouponMutation();

  //handle form for creating new category

  //crate category start
  const [discountData, setDiscountData] = useState<TCoupon>({
    name: "",
    freeShipping: false,
    discountType: "",
    expires: new Date(),
    discountOff: 0,
    minimumPurchaseAmount: 0,
    image: "",
    status: "",
  });

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    // Perform any form validation or data processing here
    const formData = new FormData();
    formData.append("file", discountData.image);
    formData.append("upload_preset", process.env.OTHER_PRESET as string);
    const response = await axios.post(
      process.env.CLOUDINARY_URL as string,
      formData
    );

    const data = await createCoupon({
      name: discountData.name,
      freeShipping: discountData.freeShipping,
      discountType: discountData.discountType,
      expires: discountData.expires,
      discountOff: discountData.discountOff,
      minimumPurchaseAmount: discountData.minimumPurchaseAmount,
      image: response.data.secure_url,
      status: discountData.status,
    });
    // refetch();
    if (data) {
      toast.success("New Coupon Created", { duration: 3000 });
      // Reset form fields
      setDiscountData({
        name: "",
        freeShipping: false,
        expires: new Date(),
        discountType: "",
        discountOff: 0,
        minimumPurchaseAmount: 0,
        image: "",
        status: "",
      });
    }
  };
  //crate category end

  const handleChange = (event: any) => {
    setDiscountData({
      ...discountData,
      [event.target.name]:
        event.target.name === "image"
          ? event.target.files[0]
          : event.target.name === "freeShipping"
          ? event.target.checked
          : event.target.value,
    });
  };

  //

  //handle delete
  const [deleteCategory] = useDeleteCouponMutation();
  const handleDeleteCoupon = async (id: string) => {
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
        Swal.fire("Deleted!", "Your coupon has been deleted.", "success");
        const couponDel = await deleteCategory(id);
        if (couponDel) {
          refetch(); // Refetch the user list after deleting a user
        }
      }
    });
  };

  //edit modal
  const [filteredData, setFilteredData] = useState<TCoupon>({
    name: "",
    freeShipping: false,
    discountType: "",
    expires: new Date(),
    discountOff: 0,
    minimumPurchaseAmount: 0,
    image: "",
    status: "",
  });

  const handleEditCoupon = (id: string) => {
    const filtered: any = couponData?.data?.filter(
      (item) => item._id === id
    )[0];
    setFilteredData(filtered);
    setIsOpen(true);
  };

  const [isOpen, setIsOpen] = useState(true);

  //update category start
  const [updateCoupon] = useUpdateCouponMutation();

  const filteredDataHandleChange = (event: any) => {
    setFilteredData({
      ...filteredData,
      [event.target.name]:
        event.target.name === "image"
          ? event.target.files[0]
          : event.target.name === "freeShipping"
          ? event.target.checked
          : event.target.value,
    });
  };

  const handleUpdateCategorySubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const mutationData: any = await updateCoupon({
        id: filteredData._id as string,
        payload: filteredData,
      });
      refetch();
      if (mutationData) {
        toast.success("Coupon updated!", { duration: 3000 });
        refetch(); // Refetch the categories list after updating
        setIsOpen(false);
      }
    } catch (error) {
      console.error("Error updating category:", error);
      toast.error("Failed to update category.");
    }
  };

  return isLoading ? (
    <Loader height="h-[85vh]" />
  ) : (
    <div className="flex gap-10 container">
      {/* show all category  */}
      <div className="flex-[6] overflow-x-auto">
        <h1 className="text-lg font-semibold mb-2">All Coupon</h1>
        {couponData ? (
          <DiscountList
            coupons={couponData.data as TCoupon[]}
            handleEditCoupon={handleEditCoupon}
            handleDeleteCoupon={handleDeleteCoupon}
          />
        ) : (
          <Loader height="h-[90vh]" />
        )}
      </div>

      {/* add new coupon  */}
      <div className="flex-[3]">
        <h1 className="text-lg font-semibold mb-2">Add Coupon</h1>
        <DiscountForm
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          discountData={discountData}
        />
      </div>

      {isOpen && (
        <>
          {/* modal code start  */}
          <input type="checkbox" id="modal-handle" className="modal-toggle" />

          {filteredData && (
            <div className="modal">
              <div className="modal-box relative">
                <label
                  className="absolute top-3 right-3 text-xl font-semibold cursor-pointer"
                  htmlFor="modal-handle"
                >
                  <RxCross2 />
                </label>
                <div className="flex-[3]">
                  <h2 className="text-lg font-semibold mb-2 ml-3">
                    Update Coupon
                  </h2>
                  <form
                    onSubmit={handleUpdateCategorySubmit}
                    className="bg-white p-3 flex flex-col gap-y-3 rounded-xl"
                  >
                    <div>
                      <label className="font-medium" htmlFor="name">
                        Coupon Name:
                      </label>
                      <input
                        className="block w-full p-2 border border-gray-400 focus:outline-none text-gray-500 mt-1"
                        id="name"
                        type="text"
                        name="name"
                        value={filteredData.name}
                        onChange={filteredDataHandleChange}
                        required
                        placeholder="Enter Category Name"
                      />
                    </div>
                    <div className="mb-2">
                      <label className="font-medium" htmlFor="name">
                        Expire Date:
                      </label>
                      <input
                        className="block w-full p-2 border border-gray-400 focus:outline-none text-gray-500 mt-1"
                        id="expires"
                        type="date"
                        name="expires"
                        value={
                          new Date(filteredData.expires)
                            .toISOString()
                            .split("T")[0] as any
                        }
                        onChange={filteredDataHandleChange}
                        required
                      />
                    </div>
                    <div className="mb-2">
                      <label className="font-medium" htmlFor="status">
                        Discount Type:
                      </label>
                      <select
                        className="w-full border border-gray-400 rounded-sm p-2 focus:outline-none text-gray-500"
                        id="discountType"
                        name="discountType"
                        value={filteredData.discountType}
                        onChange={filteredDataHandleChange}
                        required
                      >
                        <option disabled value="">
                          Choose one
                        </option>
                        <option value="percentage">Percentage</option>
                        <option value="amount">Amount</option>
                      </select>
                    </div>
                    <div className="mb-2">
                      <label className="font-medium" htmlFor="name">
                        Discount amount to Off:
                      </label>
                      <input
                        className="block w-full p-2 border border-gray-400 focus:outline-none text-gray-500 mt-1"
                        id="discountOff"
                        type="number"
                        name="discountOff"
                        min={0}
                        value={filteredData.discountOff}
                        onChange={filteredDataHandleChange}
                        required
                        placeholder="Enter discount off"
                      />
                    </div>
                    <div className="mb-2">
                      <label className="font-medium" htmlFor="name">
                        Minimum Purchase Amount:
                      </label>
                      <input
                        className="block w-full p-2 border border-gray-400 focus:outline-none text-gray-500 mt-1"
                        id="minimumPurchaseAmount"
                        type="number"
                        name="minimumPurchaseAmount"
                        min={0}
                        value={filteredData.minimumPurchaseAmount}
                        onChange={filteredDataHandleChange}
                        required
                        placeholder="Enter minimum purchase amount"
                      />
                    </div>
                    <div className="mb-2">
                      <label className="font-medium" htmlFor="status">
                        Status:
                      </label>
                      <select
                        className="w-full border border-gray-400 rounded-sm p-2 focus:outline-none text-gray-500"
                        id="status"
                        name="status"
                        value={filteredData.status}
                        onChange={filteredDataHandleChange}
                        required
                      >
                        <option disabled value="">
                          Choose Status
                        </option>
                        <option value="draft">Draft</option>
                        <option value="published">Publish</option>
                      </select>
                    </div>
                    {/* <div className="mb-2">
                    <label className="font-medium" htmlFor="name">
                      Image:
                    </label>
                    <input
                      className="block w-full p-2 border border-gray-400 focus:outline-none text-gray-500 mt-1"
                      id="image"
                      type="file"
                      name="image"
                      onChange={filteredDataHandleChange}
                      required
                      placeholder="Enter minimum purchase amount"
                    />
                  </div> */}
                    <div className="mb-2">
                      <label
                        className="relative inline-flex items-center cursor-pointer"
                        // htmlFor="freeShipping"
                      >
                        <input
                          type="checkbox"
                          name="freeShipping"
                          className="sr-only peer"
                          defaultChecked={filteredData.freeShipping}
                          onClick={handleChange}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-transparent dark:peer-focus:bg-secondary rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-red-900"></div>
                        <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                          Free Shipping
                        </span>
                      </label>
                    </div>
                    <button
                      type="submit"
                      className="bg-secondary py-1 px-4 rounded-md text-white w-full"
                    >
                      Upload
                    </button>
                  </form>
                </div>
              </div>
              <label className="modal-backdrop" htmlFor="modal-handle">
                Close
              </label>
            </div>
          )}
          {/* modal code end  */}
        </>
      )}
    </div>
  );
};

export default Discount;
