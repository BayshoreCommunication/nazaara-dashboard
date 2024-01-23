import { useState } from "react";
import Editor from "./Editor";
import OutlineButton from "./OutlineButton";
import PrimaryButton from "./PrimaryButton";

interface OrderMeasurementProps {
  openModal: boolean;
  sizeChartId: string;
}

const OrderMeasurement: React.FC<OrderMeasurementProps> = ({
  sizeChartId,
  openModal,
}) => {
  const [formData, setFormData] = useState({
    _id: "",
    topType: "",
    bottomType: "",
    note: "",
    tops: {
      chest: null,
      waist: null,
      hip: null,
      end: null,
      shoulder: null,
      armHole: null,
      sleeveLength: null,
      muscle: null,
      handOpening: null,
      length: null,
      slit: null,
      neckDeepf: null,
      neckDeepb: null,
      halfBody: null,
    },
    bottom: {
      length: null,
      waist: null,
      hip: null,
      thigh: null,
      knee: null,
      legOpening: null,
    },
  });

  console.log("size chart id", sizeChartId);

  const handleInputChange = (
    category: string,
    field: string,
    value: string | null
  ) => {
    setFormData((prevData: any) => ({
      ...prevData,
      [category]: {
        ...prevData[category],
        [field]: value,
      },
    }));
  };

  console.log("form data", formData);

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
  };

  return (
    <>
      {openModal && (
        <>
          <input type="checkbox" id="my-modal-3" className="modal-toggle" />
          <div className="modal overflow-y-scroll lg:overflow-auto">
            <div className="modal-box bg-white max-h-min min-w-max mt-[29rem] lg:mt-0">
              <div className="bg-gray-200 py-2 flex justify-between px-4">
                <h3 className="text-lg font-bold ">Measurement Details</h3>
                <label htmlFor="my-modal-3" className="btn btn-sm btn-circle">
                  ✕
                </label>
              </div>
              <form onSubmit={handleFormSubmit}>
                <div className="flex flex-col lg:flex-row p-4 lg:border border-gray-300">
                  <div>
                    <div className="lg:border-r-2 lg:pr-6 lg:mr-6">
                      {/* {{-- title  --}} */}
                      <h1 className="text-xl font-medium mt-2">TOPS</h1>
                      {/* {{-- checkbox  --}} */}
                      <div className="flex gap-x-2 my-4">
                        <label className="cursor-pointer flex items-center gap-x-1">
                          <input
                            type="radio"
                            name="top-radio"
                            value="blouse"
                            className="radio radio-xs"
                            checked={formData.topType === "blouse"}
                            onChange={() =>
                              setFormData((prevData) => ({
                                ...prevData,
                                topType: "blouse",
                              }))
                            }
                          />
                          <span className="label-text">Blouse</span>
                        </label>
                        <label className="cursor-pointer flex items-center gap-x-1">
                          <input
                            type="radio"
                            name="top-radio"
                            value="kameez"
                            className="radio radio-xs"
                            checked={formData.topType === "kameez"}
                            onChange={() =>
                              setFormData((prevData) => ({
                                ...prevData,
                                topType: "kameez",
                              }))
                            }
                          />
                          <span className="label-text">Kameez</span>
                        </label>
                        <label className="cursor-pointer flex items-center gap-x-1">
                          <input
                            type="radio"
                            name="top-radio"
                            value="gown"
                            className="radio radio-xs"
                            checked={formData.topType === "gown"}
                            onChange={() =>
                              setFormData((prevData) => ({
                                ...prevData,
                                topType: "gown",
                              }))
                            }
                          />
                          <span className="label-text">Gown</span>
                        </label>
                      </div>
                      {/* {{-- input  --}} */}
                      <div className="flex">
                        <div className="flex flex-col gap-y-3">
                          <div className="w-40 flex justify-between">
                            <label htmlFor="chest">
                              <span className="label-text">Chest:</span>
                            </label>
                            <input
                              id="chest"
                              type="text"
                              className="input border border-gray-300 w-20 h-8 rounded-none"
                              value={formData.tops.chest || ""}
                              onChange={(e) =>
                                handleInputChange(
                                  "tops",
                                  "chest",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          <div className="w-40 flex justify-between">
                            <label htmlFor="waist">
                              <span className="label-text">Waist:</span>
                            </label>
                            <input
                              id="waist"
                              type="text"
                              className="input border border-gray-300 w-20 h-8 rounded-none"
                              value={formData.tops.waist || ""}
                              onChange={(e) =>
                                handleInputChange(
                                  "tops",
                                  "waist",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          <div className="w-40 flex justify-between">
                            <label htmlFor="hip">
                              <span className="label-text">Hip:</span>
                            </label>
                            <input
                              id="hip"
                              type="text"
                              className="input border border-gray-300 w-20 h-8 rounded-none"
                              value={formData.tops.hip || ""}
                              onChange={(e) =>
                                handleInputChange("tops", "hip", e.target.value)
                              }
                            />
                          </div>
                          <div className="w-40 flex justify-between">
                            <label htmlFor="end">
                              <span className="label-text">End:</span>
                            </label>
                            <input
                              id="end"
                              type="text"
                              className="input border border-gray-300 w-20 h-8 rounded-none"
                              value={formData.tops.end || ""}
                              onChange={(e) =>
                                handleInputChange("tops", "end", e.target.value)
                              }
                            />
                          </div>
                          <div className="w-40 flex justify-between">
                            <label htmlFor="shoulder">
                              <span className="label-text">Shoulder:</span>
                            </label>
                            <input
                              id="shoulder"
                              type="text"
                              className="input border border-gray-300 w-20 h-8 rounded-none"
                              value={formData.tops.shoulder || ""}
                              onChange={(e) =>
                                handleInputChange(
                                  "tops",
                                  "shoulder",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          <div className="w-40 flex justify-between">
                            <label htmlFor="armHole">
                              <span className="label-text">Arm Hole:</span>
                            </label>
                            <input
                              id="armHole"
                              type="text"
                              className="input border border-gray-300 w-20 h-8 rounded-none"
                              value={formData.tops.armHole || ""}
                              onChange={(e) =>
                                handleInputChange(
                                  "tops",
                                  "armHole",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          <div className="w-40 flex justify-between">
                            <label htmlFor="sleeveL">
                              <span className="label-text">Sleeve L:</span>
                            </label>
                            <input
                              id="sleeveL"
                              type="text"
                              className="input border border-gray-300 w-20 h-8 rounded-none"
                              value={formData.tops.sleeveLength || ""}
                              onChange={(e) =>
                                handleInputChange(
                                  "tops",
                                  "sleeveLength",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          <div className="w-40 flex justify-between">
                            <label htmlFor="muscle">
                              <span className="label-text">Muscle:</span>
                            </label>
                            <input
                              id="muscle"
                              type="text"
                              className="input border border-gray-300 w-20 h-8 rounded-none"
                              value={formData.tops.muscle || ""}
                              onChange={(e) =>
                                handleInputChange(
                                  "tops",
                                  "muscle",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                        </div>
                        <div className="ml-6 flex flex-col gap-y-3">
                          <div className="w-44 flex justify-between">
                            <label htmlFor="handOpening">
                              <span className="label-text">Hand Opening:</span>
                            </label>
                            <input
                              id="handOpening"
                              type="text"
                              className="input border border-gray-300 w-20 h-8 rounded-none"
                              value={formData.tops.handOpening || ""}
                              onChange={(e) =>
                                handleInputChange(
                                  "tops",
                                  "handOpening",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          <div className="w-44 flex justify-between">
                            <label htmlFor="length">
                              <span className="label-text">Length:</span>
                            </label>
                            <input
                              id="length"
                              type="text"
                              className="input border border-gray-300 w-20 h-8 rounded-none"
                              value={formData.tops.length || ""}
                              onChange={(e) =>
                                handleInputChange(
                                  "tops",
                                  "length",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          <div className="w-44 flex justify-between">
                            <label htmlFor="slit">
                              <span className="label-text">Slit:</span>
                            </label>
                            <input
                              id="slit"
                              type="text"
                              className="input border border-gray-300 w-20 h-8 rounded-none"
                              value={formData.tops.slit || ""}
                              onChange={(e) =>
                                handleInputChange(
                                  "tops",
                                  "slit",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          <div className="w-44 flex justify-between">
                            <label htmlFor="neckDeepF">
                              <span className="label-text">Neck Deep (f):</span>
                            </label>
                            <input
                              id="neckDeepF"
                              type="text"
                              className="input border border-gray-300 w-20 h-8 rounded-none"
                              value={formData.tops.neckDeepf || ""}
                              onChange={(e) =>
                                handleInputChange(
                                  "tops",
                                  "neckDeepf",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          <div className="w-44 flex justify-between">
                            <label htmlFor="neckDeepB">
                              <span className="label-text">Neck Deep (b):</span>
                            </label>
                            <input
                              id="neckDeepB"
                              type="text"
                              className="input border border-gray-300 w-20 h-8 rounded-none"
                              value={formData.tops.neckDeepb || ""}
                              onChange={(e) =>
                                handleInputChange(
                                  "tops",
                                  "neckDeepb",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          <div className="w-44 flex justify-between">
                            <label htmlFor="halfBody">
                              <span className="label-text">Half Body:</span>
                            </label>
                            <input
                              id="halfBody"
                              type="text"
                              className="input border border-gray-300 w-20 h-8 rounded-none"
                              value={formData.tops.halfBody || ""}
                              onChange={(e) =>
                                handleInputChange(
                                  "tops",
                                  "halfBody",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="lg:border-r-2 lg:pr-6 lg:mr-6">
                    <div className="flex flex-col w-full">
                      {/* {{-- title  --}} */}
                      <h1 className="text-xl font-medium mt-2">BOTTOM</h1>
                      {/* {{-- checkbox  --}} */}
                      <div className="flex gap-x-2 my-4">
                        <label className="cursor-pointer flex items-center gap-x-1">
                          <input
                            type="radio"
                            name="bottom-radio"
                            value="skirt"
                            className="radio radio-xs"
                            checked={formData.bottomType === "skirt"}
                            onChange={() =>
                              setFormData((prevData) => ({
                                ...prevData,
                                bottomType: "skirt",
                              }))
                            }
                          />
                          <span className="label-text">Skirt</span>
                        </label>
                        <label className="cursor-pointer flex items-center gap-x-1">
                          <input
                            type="radio"
                            name="bottom-radio"
                            value="palazzo"
                            className="radio radio-xs"
                            checked={formData.bottomType === "palazzo"}
                            onChange={() =>
                              setFormData((prevData) => ({
                                ...prevData,
                                bottomType: "palazzo",
                              }))
                            }
                          />
                          <span className="label-text">Palazzo</span>
                        </label>
                        <label className="cursor-pointer flex items-center gap-x-1">
                          <input
                            type="radio"
                            name="bottom-radio"
                            value="pant"
                            className="radio radio-xs"
                            checked={formData.bottomType === "pant"}
                            onChange={() =>
                              setFormData((prevData) => ({
                                ...prevData,
                                bottomType: "pant",
                              }))
                            }
                          />
                          <span className="label-text">Pant</span>
                        </label>
                        <label className="cursor-pointer flex items-center gap-x-1">
                          <input
                            type="radio"
                            name="bottom-radio"
                            value="gharara"
                            className="radio radio-xs"
                            checked={formData.bottomType === "gharara"}
                            onChange={() =>
                              setFormData((prevData) => ({
                                ...prevData,
                                bottomType: "gharara",
                              }))
                            }
                          />
                          <span className="label-text">Gharara</span>
                        </label>
                      </div>
                      {/* {{-- input  --}} */}
                      <div className="flex flex-col gap-3">
                        <div className="flex justify-between">
                          <label htmlFor="length2">
                            <span className="label-text">Length:</span>
                          </label>
                          <input
                            id="length2"
                            type="text"
                            className="input border border-gray-300 w-40 h-8 rounded-none"
                            value={formData.bottom.length || ""}
                            onChange={(e) =>
                              handleInputChange(
                                "bottom",
                                "length",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div className="flex justify-between">
                          <label htmlFor="waist2">
                            <span className="label-text">Waist:</span>
                          </label>
                          <input
                            id="waist2"
                            type="text"
                            className="input border border-gray-300 w-40 h-8 rounded-none"
                            value={formData.bottom.waist || ""}
                            onChange={(e) =>
                              handleInputChange(
                                "bottom",
                                "waist",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div className="flex justify-between">
                          <label htmlFor="hip2">
                            <span className="label-text">Hip:</span>
                          </label>
                          <input
                            id="hip2"
                            type="text"
                            className="input border border-gray-300 w-40 h-8 rounded-none"
                            value={formData.bottom.hip || ""}
                            onChange={(e) =>
                              handleInputChange("bottom", "hip", e.target.value)
                            }
                          />
                        </div>
                        <div className="flex justify-between">
                          <label htmlFor="thigh2">
                            <span className="label-text">Thigh:</span>
                          </label>
                          <input
                            id="thigh2"
                            type="text"
                            className="input border border-gray-300 w-40 h-8 rounded-none"
                            value={formData.bottom.thigh || ""}
                            onChange={(e) =>
                              handleInputChange(
                                "bottom",
                                "thigh",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div className="flex justify-between">
                          <label htmlFor="knee2">
                            <span className="label-text">Knee:</span>
                          </label>
                          <input
                            id="knee2"
                            type="text"
                            className="input border border-gray-300 w-40 h-8 rounded-none"
                            value={formData.bottom.knee || ""}
                            onChange={(e) =>
                              handleInputChange(
                                "bottom",
                                "knee",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div className="flex justify-between">
                          <label htmlFor="legOpenning2">
                            <span className="label-text">Leg Openning:</span>
                          </label>
                          <input
                            id="legOpenning2"
                            type="text"
                            className="input border border-gray-300 w-40 h-8 rounded-none"
                            value={formData.bottom.legOpening || ""}
                            onChange={(e) =>
                              handleInputChange(
                                "bottom",
                                "legOpening",
                                e.target.value
                              )
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="h-full">
                    {/* {{-- title  --}} */}
                    <h1 className="text-xl font-medium mb-4">Extra Note</h1>
                    {/* {{-- text field  --}} */}
                    {/* <Editor /> */}
                    <div className="w-full rounded-lg h-full">
                      <textarea
                        name="note"
                        className="border w-full min-h-[20rem] p-2 box-border outline-none"
                        placeholder="Type your note here"
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div className="modal-action">
                  <label className="flex gap-2" htmlFor="my-modal-3">
                    <PrimaryButton name="Update" />
                  </label>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default OrderMeasurement;
