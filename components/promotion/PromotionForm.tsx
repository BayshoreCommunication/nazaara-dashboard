import { IPromotion } from "@/types/promotionTypes";
import dynamic from "next/dynamic";
import { ChangeEvent, FormEvent, FC, useState } from "react";
import { customStyles } from "../ReactSelectCustomStyle";
import { useGetCategoriesQuery } from "@/services/categoryApi";
import { useGetSubCategoriesQuery } from "@/services/subcategory";
import { useCreateAPromotionMutation } from "@/services/promotionApi";
import toast from "react-hot-toast";
const Select = dynamic(() => import("react-select"), {
  ssr: false,
});

const PromotionForm = () => {
  const [promotionData, setPromotionData] = useState<IPromotion>({
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

  // console.log("promotion state data", promotionData);

  const { data: categoryData } = useGetCategoriesQuery();
  const { data: subCategoryData } = useGetSubCategoriesQuery();
  const [createPromotion] = useCreateAPromotionMutation();

  const options = categoryData?.data.map((elem) => ({
    value: elem._id,
    label: elem.title,
  }));

  const subCategoryOptions = subCategoryData?.data.map((elem) => ({
    value: elem._id,
    label: elem.title,
  }));

  const handleStartDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newStartDate = new Date(e.target.value);
    setPromotionData({
      ...promotionData,
      startDate: newStartDate,
    });
  };

  const handleExpireDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newExpireDate = new Date(e.target.value);
    setPromotionData({
      ...promotionData,
      expireDate: newExpireDate,
    });
  };

  const handleCategoryIdSelectionChange = (options: any | null) => {
    if (options) {
      setPromotionData({
        ...promotionData,
        categoryId: options.map((option: any) => option.value), // Use option.value
      });
    }
  };

  const handleSubCategoryIdSelectionChange = (options: any | null) => {
    if (options) {
      setPromotionData({
        ...promotionData,
        subCategoryId: options.map((option: any) => option.value), // Use option.value
      });
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    // Validate start date and expire date
    if (promotionData.startDate > promotionData.expireDate) {
      toast.error("Expiration date must be after the start date.");
      return;
    }
    try {
      const createData = {
        title: promotionData.title,
        promotionOn: promotionData.promotionOn,
        categoryId: promotionData.categoryId,
        subCategoryId: promotionData.subCategoryId,
        startDate: promotionData.startDate,
        expireDate: promotionData.expireDate,
        freeshipping: promotionData.freeShipping,
        discountType: promotionData.discountType,
        discountOff: Number(promotionData.discountOff),
        status: promotionData.status,
      };
      const promotion = await createPromotion(createData);
      // console.log("create promoton data", promotion);

      if ((promotion as any)?.data?.success) {
        toast.success("Promotion created successfully", { duration: 3000 });
        setPromotionData({
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
      } else {
        toast.error("something went wrong!please try again.");
      }
    } catch (error) {
      console.error("Error creating promotion:", error);
      toast.error("Failed to create promotion.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-3 flex flex-col gap-y-3 rounded-xl"
    >
      <div>
        <label className="font-medium" htmlFor="name">
          Promotion Title<span className="text-red-600">*</span>
        </label>
        <input
          className="block w-full p-2 border border-gray-400 focus:outline-none text-gray-500 mt-1"
          type="text"
          value={promotionData.title}
          onChange={(e) =>
            setPromotionData({
              ...promotionData,
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
          value={promotionData.promotionOn}
          onChange={(e) =>
            setPromotionData({
              ...promotionData,
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
          // value={defaultValueOptions}
          onChange={handleCategoryIdSelectionChange}
          className="w-full rounded-md focus:outline-none text-gray-500"
          placeholder="Choose Category"
          name="products"
          isDisabled={promotionData.promotionOn === "subCategory"}
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
          Select SubCategory<span className="text-red-600">*</span>
        </label>
        <Select
          // value={defaultValueOptions}
          onChange={handleSubCategoryIdSelectionChange}
          className="w-full rounded-md focus:outline-none text-gray-500"
          placeholder="Choose SubCategory"
          styles={customStyles}
          required
          isDisabled={promotionData.promotionOn === "category"}
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
            new Date(promotionData.startDate).toISOString().split("T")[0] as any
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
            new Date(promotionData.expireDate)
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
          value={promotionData.discountType}
          onChange={(e) =>
            setPromotionData({
              ...promotionData,
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
          value={promotionData.discountOff}
          onChange={(e) =>
            setPromotionData({
              ...promotionData,
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
          value={promotionData.status}
          onChange={(e) =>
            setPromotionData({
              ...promotionData,
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
            checked={promotionData.freeShipping}
            onChange={() =>
              setPromotionData((prevData) => ({
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
        Upload Promotion
      </button>
    </form>
  );
};

export default PromotionForm;
