import React from "react";
import FetchServerSideData from "../ServerSideDataFetching";

//call the component in server component

const Faq = async () => {
  const url =
    "http://localhost:8000/api/v1/customization/64d9fb77f3a7ce9915b44b6f";
  const allData = await FetchServerSideData(url);
  console.log("testdataaaa", allData);

  return (
    <div className="mt-4">
      <form>
        <div className="p-4 bg-white rounded-xl flex flex-col gap-2">
          <div>
            <label
              htmlFor="first_name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Question
            </label>
            <input
              type="text"
              id="first_name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Write a question"
              required
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Answer
            </label>
            <textarea
              id="message"
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Write your answer here..."
            ></textarea>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Faq;
