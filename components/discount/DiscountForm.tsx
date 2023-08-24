import { ChangeEvent, FormEvent, FC } from "react";

interface CategoryFormProps {
  handleSubmit: (event: FormEvent) => void;
  handleChange: (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  discountData: {
    name: string;
    expires?: Date;
    freeShipping: Boolean;
    discountType: string;
    discountOff: number;
    minimumPurchaseAmount: number;
    image: string;
    status: string;
  };
}

const DiscountForm: FC<CategoryFormProps> = ({
  handleSubmit,
  handleChange,
  discountData,
}) => {
  return (
    <form
      onSubmit={handleSubmit}
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
          value={discountData.name}
          onChange={handleChange}
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
          value={discountData.expires as any}
          onChange={handleChange}
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
          value={discountData.discountType}
          onChange={handleChange}
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
          value={discountData.discountOff}
          min={0}
          onChange={handleChange}
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
          value={discountData.minimumPurchaseAmount}
          min={0}
          onChange={handleChange}
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
          value={discountData.status}
          onChange={handleChange}
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
        <label className="font-medium" htmlFor="name">
          Minimum Purchase Amount:
        </label>
        <input
          className="block w-full p-2 border border-gray-400 focus:outline-none text-gray-500 mt-1"
          id="minimumPurchaseAmount"
          type="file"
          name="minimumPurchaseAmount"
          required
          placeholder="Enter minimum purchase amount"
        />
      </div>
      <button
        type="submit"
        className="bg-secondary py-1 px-4 rounded-md text-white w-full"
      >
        Upload
      </button>
    </form>
  );
};

export default DiscountForm;
