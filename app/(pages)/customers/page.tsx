"use client";
import CustomerViewProfileDrawer from "@/components/CustomerViewProfileDrawer";
import Loader from "@/components/Loader";
import { useGetUsersQuery } from "@/services/userApi";
import { useEffect, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Image from "next/image";
import Fuse from "fuse.js";
// import fuse from "fuse.js";

const fuseOptions = {
  // isCaseSensitive: false,
  // includeScore: false,
  // shouldSort: true,
  // includeMatches: false,
  // findAllMatches: false,
  // minMatchCharLength: 1,
  // location: 0,
  threshold: 0.1,
  // distance: 100,
  // useExtendedSearch: false,
  // ignoreLocation: false,
  // ignoreFieldNorm: false,
  // fieldNormWeight: 1,
  keys: ["email", "phone", "fullName", "userType"],
};

const Customers = () => {
  const [selectedCustomerId, setSelectedCustomerId] = useState("");
  const [searchText, setSearchText] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [itemsPerPage, setItemsPerPage] = useState(2);

  const toggleDrawer = (id: string) => {
    setIsOpen((prevState) => !prevState);
    setSelectedCustomerId(id);
  };

  const { data: customersData, isLoading } = useGetUsersQuery();

  // console.log("customers data", customersData);

  useEffect(() => {
    const fuse = new Fuse(customersData?.data as any, fuseOptions);
    if (searchText) {
      const currentSearchData = fuse.search(searchText);
      setSearchData(currentSearchData as any);
    }
  }, [customersData?.data, searchText]);

  return isLoading ? (
    <Loader height="h-[85vh]" />
  ) : (
    <div className="container">
      <div className="flex items-center justify-between mb-3">
        <div className="flex gap-2 items-center">
          <AiOutlineShoppingCart size={18} color="gray" />
          <span className="font-medium text-lg">All Customer</span>
        </div>
        <small className="text-gray-600 font-medium">
          *search through email, phone, fullName, userType*
        </small>
        {/* search user  */}
        <div>
          <label
            htmlFor="search"
            className="text-sm text-gray-600 font-semibold"
          >
            Search:{" "}
          </label>
          <input
            type="text"
            id="search"
            onChange={(e) => setSearchText(e.target.value)}
            className="border border-gray-300 outline-none hover:outline-none px-2 py-1 rounded-md text-gray-600 text-sm"
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="table bg-basic">
          {/* head */}
          <thead className="">
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Gender</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Type</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {searchData && searchText ? (
              <>
                {searchData.map((cus: any, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        {cus.item.imageUrl ? (
                          <Image
                            src={cus.item.imageUrl}
                            alt="User-Image"
                            width={40}
                            height={40}
                            className="rounded-full"
                          />
                        ) : (
                          <Image
                            src={"/images/no-image.jpg"}
                            alt="User-Image"
                            width={40}
                            height={40}
                            className="rounded-full"
                          />
                        )}
                      </td>
                      <td>{cus.item.fullName}</td>
                      <td>
                        {cus.item.gender === "" ? "N/A" : cus.item.gender}
                      </td>
                      <td>{cus.item.phone === "" ? "N/A" : cus.item.phone}</td>
                      <td>{cus.item.email}</td>
                      <td>{cus.item.userType}</td>
                      <td>
                        <button
                          onClick={() => toggleDrawer(cus.item._id)}
                          className="bg-secondary p-2 text-white rounded-md shadow-md"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </>
            ) : (
              <>
                {customersData?.data.map((cus, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        {cus.imageUrl ? (
                          <Image
                            src={cus.imageUrl}
                            alt="User-Image"
                            width={40}
                            height={40}
                            className="rounded-full"
                          />
                        ) : (
                          <Image
                            src={"/images/no-image.jpg"}
                            alt="User-Image"
                            width={40}
                            height={40}
                            className="rounded-full"
                          />
                        )}
                      </td>
                      <td>{cus.fullName}</td>
                      <td>{cus.gender === "" ? "N/A" : cus.gender}</td>
                      <td>{cus.phone === "" ? "N/A" : cus.phone}</td>
                      <td>{cus.email}</td>
                      <td>{cus.userType}</td>
                      <td>
                        <button
                          onClick={() => toggleDrawer(cus._id)}
                          className="bg-secondary p-2 text-white rounded-md shadow-md"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </>
            )}
          </tbody>
        </table>
        <CustomerViewProfileDrawer
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          toggleDrawer={toggleDrawer}
          selectedCustomerId={selectedCustomerId}
        />
      </div>
    </div>
  );
};

export default Customers;
