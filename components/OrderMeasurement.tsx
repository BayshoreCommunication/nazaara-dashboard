import Editor from "./Editor";
import OutlineButton from "./OutlineButton";
import PrimaryButton from "./PrimaryButton";

interface OrderMeasurementProps {
  openModal: boolean;
}

const OrderMeasurement: React.FC<OrderMeasurementProps> = ({ openModal }) => {
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
              <div className="flex flex-col lg:flex-row p-4 lg:border border-gray-300">
                <div>
                  <div className="lg:border-r-2 lg:pr-6 lg:mr-6">
                    {/* {{-- title  --}} */}
                    <h1 className="text-2xl font-medium mt-2">TOPS</h1>
                    {/* {{-- checkbox  --}} */}
                    <div className="flex gap-x-2 my-4">
                      <label className="cursor-pointer flex items-center gap-x-1">
                        <input
                          type="checkbox"
                          className="checkbox checkbox-sm rounded-sm"
                        />
                        <span className="label-text">Blouse</span>
                      </label>
                      <label className="cursor-pointer flex items-center gap-x-1">
                        <input
                          type="checkbox"
                          className="checkbox checkbox-sm rounded-sm"
                        />
                        <span className="label-text">Kameez</span>
                      </label>
                      <label className="cursor-pointer flex items-center gap-x-1">
                        <input
                          type="checkbox"
                          className="checkbox checkbox-sm rounded-sm"
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
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="lg:border-r-2 lg:pr-6 lg:mr-6">
                  <div className="flex flex-col w-full">
                    {/* {{-- title  --}} */}
                    <h1 className="text-2xl font-medium mt-2">BOTTOM</h1>
                    {/* {{-- checkbox  --}} */}
                    <div className="flex gap-x-2 my-4">
                      <label className="cursor-pointer flex items-center gap-x-1">
                        <input
                          type="checkbox"
                          className="checkbox checkbox-sm rounded-none"
                        />
                        <span className="label-text">Skirt</span>
                      </label>
                      <label className="cursor-pointer flex items-center gap-x-1">
                        <input
                          type="checkbox"
                          className="checkbox checkbox-sm rounded-none"
                        />
                        <span className="label-text">Paladzo</span>
                      </label>
                      <label className="cursor-pointer flex items-center gap-x-1">
                        <input
                          type="checkbox"
                          className="checkbox checkbox-sm rounded-none"
                        />
                        <span className="label-text">Pant</span>
                      </label>
                      <label className="cursor-pointer flex items-center gap-x-1">
                        <input
                          type="checkbox"
                          className="checkbox checkbox-sm rounded-none"
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
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  <div className="">
                    {/* {{-- title  --}} */}
                    <h1 className="text-2xl font-medium mb-4">Extra Note</h1>
                    {/* {{-- text field  --}} */}
                    <Editor />
                  </div>
                </div>
              </div>
              <div className="modal-action">
                <label className="flex gap-2" htmlFor="my-modal-3">
                  <PrimaryButton name="Update" />
                  <OutlineButton name="Cancel" />
                </label>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default OrderMeasurement;
