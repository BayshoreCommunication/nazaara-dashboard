import PrimaryButton from "@/components/PrimaryButton";
import SecondaryButton from "@/components/SecondaryButton";
import { BiSearchAlt2 } from "react-icons/bi";

const AddProduct: React.FC = () => {
  return (
    <div className="container">
      <h1 className="text-2xl font-semibold mb-3">Add Discount</h1>
      <div className="flex flex-col gap-y-5">
        <div className="bg-basic rounded-lg px-6 py-3 flex gap-4 ">
          <div className="flex flex-1 flex-col gap-y-4">
            <h4 className="font-semibold">Create new discount offer</h4>
            <div>
              <label className="font-medium" htmlFor="name">
                Offer type
              </label>
              <input
                className="block rounded-lg w-96 p-2 border border-gray-400 focus:outline-none text-gray-500 mt-1"
                id="name"
                type="text"
                placeholder="Input Here"
              />
            </div>
            <div>
              <label className="font-medium" htmlFor="category">
                Promo Code
              </label>
              <div className="relative w-96">
                <input
                  className="block rounded-lg w-full p-2 border border-gray-400 focus:outline-none text-gray-500 mt-1"
                  id="category"
                  type="text"
                  placeholder="Input Here"
                />
                <BiSearchAlt2
                  color="gray"
                  size={18}
                  className="absolute top-[50%] right-2 -translate-y-1/2"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-1 items-center justify-center">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-64 h-52 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  aria-hidden="true"
                  className="w-10 h-10 mb-3 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  ></path>
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
              <input id="dropzone-file" type="file" className="hidden" />
            </label>
          </div>
        </div>
        <div className="bg-basic rounded-lg px-6 py-3 flex flex-col gap-y-4">
          <div className="flex gap-10 w-full">
            <div className="w-full">
              <label className="font-medium" htmlFor="name">
                Free Shipping
              </label>
              <input
                className="block rounded-lg w-full p-2 border border-gray-400 focus:outline-none text-gray-500 mt-1"
                id="name"
                type="text"
                placeholder="Input Here"
              />
            </div>
            <div className="w-full">
              <label className="font-medium" htmlFor="name">
                Amount Off
              </label>
              <input
                className="block rounded-lg p-2 border w-full border-gray-400 focus:outline-none text-gray-500 mt-1"
                id="name"
                type="text"
                placeholder="Input Here"
              />
            </div>
          </div>
          <div className="flex gap-10 w-full">
            <div className="w-full">
              <label className="font-medium" htmlFor="name">
                Offer Expire
              </label>
              <input
                className="block rounded-lg w-full p-2 border border-gray-400 focus:outline-none text-gray-500 mt-1"
                id="name"
                type="text"
                placeholder="Input Here"
              />
            </div>
            <div className="w-full">
              <label className="font-medium" htmlFor="name">
                Min Purchase Amount
              </label>
              <input
                className="block rounded-lg p-2 border w-full border-gray-400 focus:outline-none text-gray-500 mt-1"
                id="name"
                type="text"
                placeholder="Input Here"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-x-3">
          <PrimaryButton name="Create" />
          <PrimaryButton name="Draft" />
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
