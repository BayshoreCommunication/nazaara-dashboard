"use client";
import Loader from "@/components/loader";
import {
  useCreateSaleMutation,
  useDeleteSaleMutation,
  useGetSalesQuery,
  useGetSlugsQuery,
  useUpdateSaleMutation,
} from "@/services/navSaleApi";
import dynamic from "next/dynamic";
import { FC, useState, ChangeEvent, FormEvent, useRef } from "react";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { TbEdit } from "react-icons/tb";
import Swal from "sweetalert2";

const Select = dynamic(() => import("react-select"), {
  ssr: false,
});

const customStyles = {
  control: (provided: any) => ({
    ...provided,
    "& input": {
      height: "auto",
    },
  }),
};

const NavSale: FC = () => {
  //redux api
  const { data: salesData, isLoading: salesLoading } = useGetSalesQuery();
  const [createSale, { isLoading: createSaleLoading }] =
    useCreateSaleMutation();
  const [updateSale, { isLoading: updateSaleLoading }] =
    useUpdateSaleMutation();
  const [deleteSale, { isLoading: deleteSaleLoading }] =
    useDeleteSaleMutation();

  const { data: slugsData, isLoading: slugsLoading } = useGetSlugsQuery();
  const options =
    slugsData?.slugs.map((slug) => ({
      value: slug.slug, // Use the slug as the value
      label: slug.slug, // Use the slug as the label
    })) || [];

  // console.log("sales data", salesData?.saleData);

  interface ISale {
    _id?: string;
    saleTitle: string;
    navCategoryTitle: string;
    productSlug: string[];
    status: string;
  }

  const [saleFormData, setSaleFormData] = useState<ISale>({
    saleTitle: "",
    navCategoryTitle: "",
    productSlug: [],
    status: "",
  });

  //crate category start
  // const [formData, setFormData] = useState<IFormData>({
  //   name: "",
  //   status: "",
  // });

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    // Perform any form validation or data processing here
    const data = await createSale(saleFormData);
    console.log("sale form data from handleSubmit", saleFormData);

    // refetch();
    if (data) {
      toast.success("New Category Created", { duration: 3000 });
      // Reset form fields
      setSaleFormData({
        saleTitle: "",
        navCategoryTitle: "",
        productSlug: [],
        status: "",
      });
    }
  };
  //crate category end

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    console.log("event", event);

    setSaleFormData({
      ...saleFormData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSelectionChange = (option: any | null) => {
    if (option) {
      setSaleFormData({
        ...saleFormData,
        ["productSlug"]: option.map((elem: any) => elem.value),
      });
    }
  };
  const handleSelectionUpdate = (option: any | null) => {
    if (option) {
      setFilteredData({
        ...filteredData,
        ["productSlug"]: option.map((elem: any) => elem.value),
      });
    }
  };

  console.log("sale form data on change", saleFormData);

  //handle delete
  // const [deleteCategory] = useDeleteCategoryMutation();
  const handleDeleteCategory = async (id: string) => {
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
        const saleDel = await deleteSale(id);
        console.log("sale delete message", saleDel);

        if (saleDel) {
          Swal.fire("Deleted!", "Your sale has been deleted.", "success");
        }
      }
    });
  };

  //edit modal
  // const [filteredData, setFilteredData] = useState([
  //   { _id: "", name: "", status: "Publish" },
  // ]);
  // const [filteredData, setFilteredData] = useState({
  //   saleTitle: "",
  //   navCategoryTitle: "",
  //   productSlug: [""],
  //   status: "",
  // });
  const [filteredData, setFilteredData] = useState<ISale>({
    _id: "", // Initialize _id with an empty string or null
    saleTitle: "",
    navCategoryTitle: "",
    productSlug: [""],
    status: "",
  });

  const [selectedValue, setSelectedValue] = useState<string>("");

  // const handleEditSale = (id: string) => {
  //   const filtered: ISale | undefined = salesData?.saleData?.find(
  //     (item: ISale) => item?._id === id
  //   );

  //   if (filtered) {
  //     setFilteredData(filtered);
  //     setSelectedValue(filtered.status);
  //     setIsOpen(true);
  //   }
  // };
  const handleEditSale = (id: string) => {
    const filtered: ISale | undefined = salesData?.saleData?.find(
      (item: ISale) => item?._id === id
    );

    if (filtered) {
      setFilteredData({ ...filtered, _id: id }); // Set _id here
      setSelectedValue(filtered.status);
      setIsOpen(true);
    }
  };

  console.log("filteredData data from handle edit", filteredData);

  const [isOpen, setIsOpen] = useState(true);

  //update start
  const handleUpdateCategorySubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (filteredData && filteredData._id) {
        const updatedSale = await updateSale({
          id: filteredData._id,
          payload: filteredData,
        }).unwrap();

        if (updatedSale) {
          toast.success("NavBar Sale updated!", { duration: 3000 });
          setIsOpen(false);
        }
      } else {
        // Handle the case when _id is not defined in filteredData
        console.error("Error: _id is not defined in filteredData");
        // You can display an error message or handle this case as needed
      }
    } catch (error) {
      console.error("Error updating sale:", error);
      toast.error("Failed to update sale.");
    }
  };

  if (salesLoading) return <Loader height="h-[90vh]" />;

  return (
    <div className="flex gap-10 container">
      {/* show all category  */}
      <div className="flex-[6] overflow-x-auto">
        <h1 className="text-lg font-semibold mb-2">All Nav Sales</h1>
        {!salesData && salesLoading ? (
          <Loader height="h-[90vh]" />
        ) : (
          <table className="table bg-basic">
            <thead>
              <tr>
                <th>SL</th>
                <th>Sale Title</th>
                <th>Nav Title</th>
                <th>Product Slug</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {salesData?.saleData?.map((data, index) => (
                <tr key={data._id}>
                  <td>{index + 1}</td>
                  <td>{data.saleTitle}</td>
                  <td>{data.navCategoryTitle}</td>

                  <td>
                    {data.productSlug.slice(0, 3).map((slug) => (
                      <span
                        key={slug}
                        className="bg-gray-200 mr-1 rounded px-1"
                      >
                        {slug}
                      </span>
                    ))}
                    {/* {data.productSlug.length > 3 && <span>...</span>} */}
                    {data.productSlug.length > 3 && (
                      <span>+{data.productSlug.length - 3} more</span>
                    )}
                  </td>
                  <td
                    className={`font-medium ${
                      data.status === "draft"
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                  >
                    {data.status}
                  </td>
                  <td>
                    <div className="flex">
                      <label
                        onClick={() => data._id && handleEditSale(data._id)}
                        className="cursor-pointer"
                        htmlFor="modal-handle"
                      >
                        <TbEdit color="green" size={20} />
                      </label>
                      <button
                        onClick={() =>
                          data._id && handleDeleteCategory(data._id)
                        }
                      >
                        <MdDelete color="red" size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* add new category  */}
      <div className="flex-[3]">
        <h1 className="text-lg font-semibold mb-2">Add New Sale</h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-3 flex flex-col gap-y-3 rounded-xl"
        >
          <div>
            <label className="font-medium" htmlFor="name">
              Sale Title:
            </label>
            <input
              className="block w-full p-2 border border-gray-400 focus:outline-none text-gray-500 mt-1"
              id="saleTitle"
              type="text"
              name="saleTitle"
              value={saleFormData.saleTitle}
              onChange={handleChange}
              required
              placeholder="Enter Sale Title"
            />
          </div>
          <div>
            <label className="font-medium" htmlFor="name">
              Nav Category Title:
            </label>
            <input
              className="block w-full p-2 border border-gray-400 focus:outline-none text-gray-500 mt-1"
              id="navCategoryTitle"
              type="text"
              name="navCategoryTitle"
              value={saleFormData.navCategoryTitle}
              onChange={handleChange}
              required
              placeholder="Enter Nav Category Title"
            />
          </div>
          <div>
            <label className="font-medium" htmlFor="name">
              Product Slug:
            </label>
            <Select
              // defaultValue={defaultValueOptions}
              onChange={handleSelectionChange}
              placeholder="Choose Slug"
              id="productSlug"
              // type="text"
              name="productSlug"
              styles={customStyles}
              theme={(theme) => ({
                ...theme,
                borderRadius: 3,
                colors: {
                  ...theme.colors,
                  primary25: "#e6e6e6",
                  primary: "rgb(156 163 175/1)",
                },
              })}
              options={options}
              isMulti={true}
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
              value={saleFormData.status}
              onChange={handleChange}
              required
            >
              <option disabled value="">
                Choose Status
              </option>
              <option value="published">Publish</option>
              <option value="draft">Draft</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-secondary py-1 px-4 rounded-md text-white w-full"
          >
            Upload
          </button>
        </form>
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
                  <h1 className="text-lg font-semibold mb-2 ml-3">
                    Update NavBar Sale
                  </h1>
                  <form
                    onSubmit={handleUpdateCategorySubmit}
                    className="bg-white p-3 flex flex-col gap-y-3 rounded-xl"
                  >
                    <div>
                      <label className="font-medium" htmlFor="name">
                        Sale Title:
                      </label>
                      <input
                        className="block w-full p-2 border border-gray-400 focus:outline-none text-gray-500 mt-1"
                        type="text"
                        value={filteredData.saleTitle} // Use value instead of defaultValue
                        onChange={(e) =>
                          setFilteredData({
                            ...filteredData,
                            saleTitle: e.target.value,
                          })
                        }
                        required
                        placeholder="Enter Sale Title"
                      />
                    </div>
                    <div>
                      <label className="font-medium" htmlFor="name">
                        Nav Category Title:
                      </label>
                      <input
                        className="block w-full p-2 border border-gray-400 focus:outline-none text-gray-500 mt-1"
                        type="text"
                        value={filteredData.navCategoryTitle} // Use value instead of defaultValue
                        onChange={(e) =>
                          setFilteredData({
                            ...filteredData,
                            navCategoryTitle: e.target.value,
                          })
                        }
                        required
                        placeholder="Enter Nav Category Title"
                      />
                    </div>
                    <div>
                      <label className="font-medium" htmlFor="name">
                        Product Slug:
                      </label>
                      <Select
                        value={filteredData.productSlug.map((el) => ({
                          value: el,
                          label: el,
                        }))} // Use value instead of defaultValue
                        onChange={handleSelectionUpdate}
                        placeholder="Choose Slug"
                        styles={customStyles}
                        theme={(theme) => ({
                          ...theme,
                          borderRadius: 3,
                          colors: {
                            ...theme.colors,
                            primary25: "#e6e6e6",
                            primary: "rgb(156 163 175/1)",
                          },
                        })}
                        options={options}
                        isMulti={true}
                      />
                    </div>
                    <div className="mb-2">
                      <label className="font-medium" htmlFor="status">
                        Status:
                      </label>
                      <select
                        className="w-full border border-gray-400 rounded-sm p-2 focus:outline-none text-gray-500"
                        value={filteredData.status} // Use value instead of defaultValue
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
                        <option value="published">Publish</option>
                        <option value="draft">Draft</option>
                      </select>
                    </div>
                    <button
                      type="submit"
                      className="bg-secondary py-1 px-4 rounded-md text-white w-full"
                    >
                      Update
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

export default NavSale;
