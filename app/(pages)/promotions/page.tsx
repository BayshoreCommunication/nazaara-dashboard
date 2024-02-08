"use client";
import Loader from "@/components/Loader";
import PromotionForm from "@/components/promotion/PromotionForm";
import PromotionList from "@/components/promotion/PromotionList";
import { customStyles } from "@/components/ReactSelectCustomStyle";
import { useGetCategoriesQuery } from "@/services/categoryApi";
import {
  useGetAllPromotionsQuery,
  useUpdateAPromotionMutation,
} from "@/services/promotionApi";
import { useGetSubCategoriesQuery } from "@/services/subcategory";
import { IPromotion } from "@/types/promotionTypes";
import dynamic from "next/dynamic";
import { FC, useState, FormEvent, ChangeEvent } from "react";
import toast from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";
const Select = dynamic(() => import("react-select"), {
  ssr: false,
});

const Discount: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: promotions, isLoading } = useGetAllPromotionsQuery();
  const { data: categoryData } = useGetCategoriesQuery();
  const { data: subCategoryData } = useGetSubCategoriesQuery();

  //edit modal
  const [filteredData, setFilteredData] = useState<IPromotion>({
    _id: "",
    title: "",
    promotionOn: "category",
    categoryId: [],
    subCategoryId: [],
    startDate: new Date(),
    expireDate: new Date(),
    freeShipping: false,
    discountType: "",
    discountOff: 0,
    status: "",
  });

  // console.log("filtered state data", filteredData);

  const handleEditPromotion = (id: string) => {
    const filtered = promotions?.data?.find(
      (item: IPromotion) => item._id === id
    );

    // console.log("filtered", filtered);

    const editDefaultData = {
      _id: filtered?._id,
      title: filtered?.title,
      promotionOn: filtered?.promotionOn,
      categoryId: (filtered?.categoryId || []).map((data) => ({
        value: data,
        label:
          categoryData?.data.find((item) => item._id === data)?.title || "",
      })),
      subCategoryId: (filtered?.subCategoryId || []).map((data) => ({
        value: data,
        label:
          subCategoryData?.data.find((item) => item._id === data)?.title || "",
      })),
      startDate: filtered?.startDate,
      expireDate: filtered?.expireDate,
      freeShipping: filtered?.freeShipping,
      discountType: filtered?.discountType,
      discountOff: filtered?.discountOff,
      status: filtered?.status,
    };

    setFilteredData(editDefaultData as any);
    setIsOpen(true);
  };

  //update category start
  const [updatePromotion] = useUpdateAPromotionMutation();

  const options = categoryData?.data.map((elem) => ({
    value: elem._id,
    label: elem.title,
  }));

  const defaultValueOptionsforCategory = filteredData?.categoryId?.map(
    (elem: any) => ({
      value: elem.value,
      label: elem.label,
    })
  );

  const handleCategoryIdSelectionChange = (options: any | null) => {
    if (options) {
      setFilteredData({
        ...filteredData,
        categoryId: options.map((option: any) => ({
          value: option.value,
          label: option.label,
        })),
      });
    }
  };

  const defaultValueOptionsforSubCategory = filteredData?.subCategoryId?.map(
    (elem: any) => ({
      value: elem.value,
      label: elem.label,
    })
  );

  const handleSubCategoryIdSelectionChange = (options: any | null) => {
    if (options) {
      setFilteredData({
        ...filteredData,
        subCategoryId: options.map((option: any) => ({
          value: option.value,
          label: option.label,
        })),
      });
    }
  };

  const subCategoryOptions = subCategoryData?.data.map((elem) => ({
    value: elem._id,
    label: elem.title,
  }));

  const handleStartDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newStartDate = new Date(e.target.value);
    setFilteredData({
      ...filteredData,
      startDate: newStartDate,
    });
  };

  const handleExpireDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newExpireDate = new Date(e.target.value);
    setFilteredData({
      ...filteredData,
      expireDate: newExpireDate,
    });
  };

  const handleUpdatePromotionSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const updateData = {
      title: filteredData?.title,
      promotionOn: filteredData?.promotionOn,
      categoryId: (filteredData?.categoryId || []).map(
        (data: any) => data.value
      ),
      subCategoryId: (filteredData?.subCategoryId || []).map(
        (data: any) => data.value
      ),
      startDate: filteredData?.startDate,
      expireDate: filteredData?.expireDate,
      freeShipping: filteredData?.freeShipping,
      discountType: filteredData?.discountType,
      discountOff: filteredData?.discountOff,
      status: filteredData?.status,
    };

    // console.log("updated data", updateData);

    try {
      const mutationData = await updatePromotion({
        id: filteredData._id as string,
        payload: updateData,
      });
      // refetch();
      if (mutationData) {
        toast.success("Promotion updated successfully!", { duration: 3000 });
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
    <div className="flex items-start gap-6 dynamic-container">
      {/* show all category  */}
      <div className="flex-[7] overflow-x-auto">
        <h1 className="text-lg font-semibold mb-2">All Promotions</h1>
        {promotions ? (
          <PromotionList
            promotions={promotions}
            handleEditPromotion={handleEditPromotion}
          />
        ) : (
          <Loader height="h-[90vh]" />
        )}
      </div>

      {/* add new coupon  */}
      <div className="flex-[2]">
        <h1 className="text-lg font-semibold mb-2">Add Promotion</h1>
        <PromotionForm />
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
                    Update Promotion
                  </h2>
                  <form
                    onSubmit={handleUpdatePromotionSubmit}
                    className="bg-white p-3 flex flex-col gap-y-3 rounded-xl"
                  >
                    <div>
                      <label className="font-medium" htmlFor="name">
                        Promotion Title<span className="text-red-600">*</span>
                      </label>
                      <input
                        className="block w-full p-2 border border-gray-400 focus:outline-none text-gray-500 mt-1"
                        type="text"
                        value={filteredData.title}
                        onChange={(e) =>
                          setFilteredData({
                            ...filteredData,
                            title: e.target.value,
                          })
                        }
                        required
                        placeholder="Enter Promotion Title"
                      />
                    </div>
                    <div className="mb-2">
                      <label className="font-medium" htmlFor="name">
                        Promotion On<span className="text-red-600">*</span>
                      </label>
                      <select
                        className="w-full border border-gray-400 rounded-sm p-2 focus:outline-none text-gray-500"
                        id="discountType"
                        name="discountType"
                        value={filteredData.promotionOn}
                        onChange={(e) =>
                          setFilteredData({
                            ...filteredData,
                            promotionOn: e.target.value,
                          })
                        }
                        required
                      >
                        <option value="category">Category</option>
                        <option value="subCategory">Sub-Category</option>
                      </select>
                    </div>
                    <div className="mb-2">
                      <label className="font-medium" htmlFor="status">
                        Select Category<span className="text-red-600">*</span>
                      </label>
                      <Select
                        value={defaultValueOptionsforCategory}
                        onChange={handleCategoryIdSelectionChange}
                        className="w-full rounded-md focus:outline-none text-gray-500"
                        placeholder="Choose Category"
                        name="products"
                        isDisabled={filteredData.promotionOn === "subCategory"}
                        styles={customStyles}
                        required
                        theme={(theme) => ({
                          ...theme,
                          borderRadius: 5,
                          outline: "none",
                          colors: {
                            ...theme.colors,
                            primary25: "#ccc",
                            primary: "#ccc",
                          },
                        })}
                        options={options}
                        isMulti={true}
                      />
                    </div>
                    <div className="mb-2">
                      <label className="font-medium" htmlFor="status">
                        Select SubCategory
                        <span className="text-red-600">*</span>
                      </label>
                      <Select
                        value={defaultValueOptionsforSubCategory}
                        onChange={handleSubCategoryIdSelectionChange}
                        className="w-full rounded-md focus:outline-none text-gray-500"
                        placeholder="Choose SubCategory"
                        styles={customStyles}
                        required
                        isDisabled={filteredData.promotionOn === "category"}
                        theme={(theme) => ({
                          ...theme,
                          borderRadius: 5,
                          outline: "none",
                          colors: {
                            ...theme.colors,
                            primary25: "#ccc",
                            primary: "#ccc",
                          },
                        })}
                        options={subCategoryOptions}
                        isMulti={true}
                      />
                    </div>
                    <div className="mb-2">
                      <label className="font-medium" htmlFor="name">
                        Start Date:
                      </label>
                      <input
                        className="block w-full p-2 border border-gray-400 focus:outline-none text-gray-500 mt-1"
                        id="expires"
                        type="date"
                        name="expires"
                        value={
                          new Date(filteredData.startDate)
                            .toISOString()
                            .split("T")[0] as any
                        }
                        onChange={handleStartDateChange}
                        required
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
                          new Date(filteredData.expireDate)
                            .toISOString()
                            .split("T")[0] as any
                        }
                        onChange={handleExpireDateChange}
                        required
                      />
                    </div>
                    <div className="mb-2">
                      <label className="font-medium" htmlFor="status">
                        Discount Type:
                      </label>
                      <select
                        className="w-full border border-gray-400 rounded-sm p-2 focus:outline-none text-gray-500"
                        id="status"
                        name="status"
                        value={filteredData.discountType}
                        onChange={(e) =>
                          setFilteredData({
                            ...filteredData,
                            discountType: e.target.value,
                          })
                        }
                        required
                      >
                        <option disabled value="">
                          Choose Discount Type
                        </option>
                        <option value="amount">Amount</option>
                        <option value="percentage">Percentage</option>
                      </select>
                    </div>
                    <div className="mb-2">
                      <label className="font-medium" htmlFor="status">
                        Discount Off:
                      </label>
                      <input
                        className="block w-full p-2 border border-gray-400 focus:outline-none text-gray-500 mt-1"
                        type="text"
                        value={filteredData.discountOff}
                        onChange={(e) =>
                          setFilteredData({
                            ...filteredData,
                            discountOff: parseInt(e.target.value),
                          })
                        }
                        required
                        placeholder="Enter Promotion Title"
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
                        onChange={(e) =>
                          setFilteredData({
                            ...filteredData,
                            status: e.target.value,
                          })
                        }
                        required
                      >
                        <option disabled value="">
                          Choose Status
                        </option>
                        <option value="draft">Draft</option>
                        <option value="published">Publish</option>
                      </select>
                    </div>
                    <div className="mb-2">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          name="freeShipping"
                          className="sr-only peer"
                          checked={filteredData.freeShipping}
                          onChange={() =>
                            setFilteredData((prevData) => ({
                              ...prevData,
                              freeShipping: !prevData.freeShipping,
                            }))
                          }
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-transparent rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-900"></div>
                        <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                          Free Shipping
                        </span>
                      </label>
                    </div>
                    <button
                      type="submit"
                      className="bg-secondary py-1 px-4 rounded-md text-white w-full"
                    >
                      Update Promotion
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
