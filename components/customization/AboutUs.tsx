import { useEffect, useState } from "react";
import {
  useGetCustomizationByIdQuery,
  useUpdateCustomizationMutation,
} from "@/services/customizationApi";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
import Image from "next/image";
import { cloudinaryImageUpload } from "@/helpers";
import { cloudinaryImageDeleteWithUrl } from "@/helpers/cloudinaryImageDeleteWithUrl";

// Define TypeScript interfaces for the data structure
interface ICeoData {
  image: string;
  userName: string;
  designation: string;
}

interface IAboutUsData {
  ceoData: ICeoData;
  topHeading: string;
  secondText: string;
  thirdText: string;
  otherEmployeesData: {
    image: string;
    userName: string;
    designation: string;
    _id?: string;
    file?: File;
  }[];
}

const AboutUsComponent = () => {
  const [formData, setFormData] = useState({
    topHeading: "",
    secondText: "",
    thirdText: "",
    ceoData: {
      image: "",
      userName: "",
      designation: "",
    },
    otherEmployeesData: [
      {
        _id: "",
        image: "",
        userName: "",
        designation: "",
      },
    ],
  });

  const { data, isLoading } = useGetCustomizationByIdQuery(
    "64d9fb77f3a7ce9915b44b6f"
  );
  const customizeData = data?.data?.aboutUs;

  // console.log("customize about us data", customizeData);
  // console.log("form data", formData);

  useEffect(() => {
    if (customizeData) {
      setFormData({
        topHeading: customizeData?.topHeading,
        secondText: customizeData?.secondText,
        thirdText: customizeData?.thirdText,
        ceoData: {
          image: customizeData.ceoData.image,
          userName: customizeData.ceoData.userName,
          designation: customizeData.ceoData.designation,
        },
        otherEmployeesData: customizeData.otherEmployeesData.map((data) => ({
          _id: data._id,
          image: data.image,
          userName: data.userName,
          designation: data.designation,
        })),
      });
    }
  }, [customizeData]);

  const [updateCustomization] = useUpdateCustomizationMutation();

  const handleRemoveField = (indexToRemove: number) => {
    Swal.fire({
      title: "Are you sure you want to remove?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your employee has been removed.", "success");

        // Create a copy of the current state and remove the field at the specified index
        const updatedOtherEmployeesData = [...formData.otherEmployeesData];
        updatedOtherEmployeesData.splice(indexToRemove, 1);

        // Update the state with the new array
        setFormData({
          ...formData,
          otherEmployeesData: updatedOtherEmployeesData,
        });
      }
    });
  };

  const handleAddNewField = () => {
    const newField = {
      image: "",
      userName: "",
      designation: "",
      _id: "",
    };

    // Create a copy of the current state and push the new field
    const updatedOtherEmployeesData = [
      ...formData.otherEmployeesData,
      newField,
    ];

    // Update the state with the new array
    setFormData({
      ...formData,
      otherEmployeesData: updatedOtherEmployeesData,
    });
  };

  const handleUpdateOnClick = async (event: any) => {
    Swal.fire({
      title: "Are you sure you want to update?",
      icon: "success",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Update it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const updatedAboutUsCustomization: any = await updateCustomization({
            id: "64d9fb77f3a7ce9915b44b6f",
            payload: {
              aboutUs: {
                topHeading: formData?.topHeading,
                secondText: formData?.secondText,
                thirdText: formData?.thirdText,
                ceoData: {
                  image: formData.ceoData.image,
                  userName: formData.ceoData.userName,
                  designation: formData.ceoData.designation,
                },
                otherEmployeesData: formData.otherEmployeesData.map((data) => ({
                  image: data.image,
                  userName: data.userName,
                  designation: data.designation,
                })),
              },
            },
          });

          if (updatedAboutUsCustomization.data.success) {
            toast.success("About Us Section Updated Successfully!", {
              duration: 3000,
            });
          } else {
            toast.error("something went wrong. try again. ");
          }
        } catch (error) {
          toast.error("Error occurred! Please fill all the fields correctly.", {
            duration: 3000,
          });
          console.error(error);
        }
      }
    });
  };

  const handleCeoUploadImage = async (e: any, imageUrl: string) => {
    await cloudinaryImageDeleteWithUrl(imageUrl);
    const { secureUrl } = await cloudinaryImageUpload(e.target.files?.[0]);

    setFormData({
      ...formData,
      ceoData: {
        ...formData.ceoData,
        image: secureUrl,
      },
    });
  };
  const handleUploadImage = async (e: any, index: number, imageUrl: string) => {
    await cloudinaryImageDeleteWithUrl(imageUrl);
    const { secureUrl } = await cloudinaryImageUpload(e.target.files?.[0]);

    const updatedOtherEmployeesData = [...formData.otherEmployeesData];
    updatedOtherEmployeesData[index].image = secureUrl;
    setFormData({
      ...formData,
      otherEmployeesData: updatedOtherEmployeesData,
    });
  };

  return (
    <div className="mt-4">
      {customizeData && (
        <>
          <div>
            <div className="mb-4 text-red-500 text-xs font-medium">
              <p className="mb-1">
                * When choose any image it will automatically upload in the
                server and destroy previous image
              </p>
              <p className="mb-1">
                {`* So after changing any image if you don't update the data
            then the previous image will not found.`}
              </p>
              <p>* Recommended image size: ( 260 x 296 )</p>
            </div>
            <div>
              <label
                htmlFor={`topHeading`}
                className="block mt-2 mb-1 text-sm font-medium text-gray-900"
              >
                Top Heading
              </label>
              <input
                type="text"
                id="topHeading"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
                placeholder="Write Top Heading"
                required
                value={formData.topHeading}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    topHeading: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label
                htmlFor={`middleText`}
                className="block mt-2 mb-1 text-sm font-medium text-gray-900"
              >
                Middle Text
              </label>
              <input
                type="text"
                id="middleText"
                value={formData.secondText}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    secondText: e.target.value,
                  })
                }
                name="middleText"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Write Middle Text"
                required
              />
            </div>
            <div>
              <label
                htmlFor={`lastText`}
                className="block mt-2 mb-1 text-sm font-medium text-gray-900"
              >
                Last Text
              </label>
              <input
                type="text"
                id="lastText"
                value={formData.thirdText}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    thirdText: e.target.value,
                  })
                }
                name="LastText"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Write Last Text"
                required
              />
            </div>
          </div>

          <div className="mt-2">
            <div className="px-4 py-2 bg-white rounded-xl flex flex-col gap-2 mb-4">
              <div className="flex flex-col gap-3">
                <div className="flex justify-between">
                  <label className="block mb-2 text-md font-semibold border-b text-gray-900">
                    CEO Data:
                  </label>
                </div>
                <div>
                  <label
                    htmlFor={`userName`}
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Employee Name:
                  </label>
                  <input
                    type="text"
                    id={`userName`}
                    value={formData.ceoData.userName}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        ceoData: {
                          ...formData.ceoData,
                          userName: e.target.value,
                        },
                      })
                    }
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Write Employee Name"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor={`designation`}
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Designation
                  </label>
                  <input
                    type="text"
                    id={`designation`}
                    value={formData.ceoData.designation}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        ceoData: {
                          ...formData.ceoData,
                          designation: e.target.value,
                        },
                      })
                    }
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Write Employee Designation"
                    required
                  />
                </div>
                {/* image  */}
                <div className="">
                  <label
                    htmlFor={`ceo-image`}
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Image
                  </label>
                  {formData.ceoData.image && (
                    <Image
                      alt="employee image"
                      src={formData.ceoData.image}
                      width={120}
                      height={80}
                      className="mb-1"
                    />
                  )}
                  <input
                    type="file"
                    onChange={(e) =>
                      handleCeoUploadImage(e, formData.ceoData.image)
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <div>
        {!isLoading && (
          <>
            {formData.otherEmployeesData.map((data, index) => (
              <div
                key={data._id}
                className="p-4 bg-white rounded-xl flex flex-col gap-2 mb-4"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between">
                    <label className="block mb-2 text-md font-semibold border-b text-gray-900">
                      Employee No: {index + 1}
                    </label>
                    <button
                      type="button"
                      onClick={() => handleRemoveField(index)}
                      className="bg-secondary rounded-md text-white px-3 pt-0.5 pb-1 text-sm mb-1"
                    >
                      x
                    </button>
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                      Employee Name:
                    </label>
                    <input
                      type="text"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      placeholder="Write Employee Name"
                      required
                      value={data.userName}
                      onChange={(e) => {
                        const updatedOtherEmployeesData = [
                          ...formData.otherEmployeesData,
                        ];
                        updatedOtherEmployeesData[index].userName =
                          e.target.value;
                        setFormData({
                          ...formData,
                          otherEmployeesData: updatedOtherEmployeesData,
                        });
                      }}
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                      Designation:
                    </label>
                    <input
                      type="text"
                      value={data.designation}
                      onChange={(e) => {
                        const updatedOtherEmployeesData = [
                          ...formData.otherEmployeesData,
                        ];
                        updatedOtherEmployeesData[index].designation =
                          e.target.value;
                        setFormData({
                          ...formData,
                          otherEmployeesData: updatedOtherEmployeesData,
                        });
                      }}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      placeholder="Write Employee Designation"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                      Image:
                    </label>
                    {data.image && (
                      <Image
                        alt="employee image"
                        src={data.image}
                        width={120}
                        height={80}
                        className="mb-1"
                      />
                    )}
                    <input
                      type="file"
                      onChange={(e) => handleUploadImage(e, index, data.image)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
        {/* <PrimaryButton type="submit" label="Update" /> */}
        <div className="flex justify-end gap-2 items-center">
          <small className="text-red-500">
            *After removing any field please hit the update button to update the
            about-us
          </small>
          <button
            onClick={handleUpdateOnClick}
            type="submit"
            className="bg-secondary rounded-lg text-white px-4 py-1"
          >
            Update
          </button>
          <button
            type="button"
            onClick={handleAddNewField}
            className="bg-secondary rounded-lg text-white px-4 py-1"
          >
            Add New Field
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutUsComponent;
