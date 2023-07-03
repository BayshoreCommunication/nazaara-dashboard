import React, { useRef, useState } from "react";
import { MdDelete } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import {
  IPromotion,
  IPromotions,
  useDeletePromotionMutation,
  useUpdatePromotionMutation,
} from "../../services/promotionApi";
import Swal from "sweetalert2";
import { toast } from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";

const PromotionList: React.FC<IPromotions> = ({
  data: promotions,
  refetch,
}) => {
  //handle delete
  const [deletePromotion] = useDeletePromotionMutation();
  const handleDeletePromotion = async (id: string) => {
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
        Swal.fire("Deleted!", "Your Promotion has been deleted.", "success");
        const promotionDeleted = await deletePromotion(id);
        if (promotionDeleted) {
          refetch(); // Refetch the user list after deleting a user
        }
      }
    });
  };

  //edit modal
  const [filteredData, setFilteredData] = useState([
    { _id: "", name: "", status: "Publish" },
  ]);

  const [selectedValue, setSelectedValue] = useState<string>("");
  const handlePromotionEdit = (id: string) => {
    const filtered = promotions?.filter((item) => item._id === id);

    setFilteredData(filtered);
    setSelectedValue(filtered[0].status);
    setIsOpen(true);
  };

  const [isOpen, setIsOpen] = useState(true);

  //update category start
  const [updateCategory] = useUpdatePromotionMutation();
  const nameRef = useRef<HTMLInputElement>(null);
  const statusRef = useRef<HTMLSelectElement>(null);

  const handleUpdatePromotionSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (nameRef.current && statusRef.current) {
      const formData: any = {
        name: nameRef.current.value,
        status: statusRef.current.value,
      };

      const { name, status } = formData;

      try {
        const updatedData = { name, status };
        const updatedCategory = await updateCategory({
          id: filteredData[0]?._id,
          payload: updatedData,
        }).unwrap();

        if (updatedCategory) {
          toast.success("Category updated!", { duration: 3000 });
          refetch(); // Refetch the categories list after updating
          setIsOpen(false);
        }
      } catch (error) {
        console.error("Error updating category:", error);
        toast.error("Failed to update category.");
      }
    }
  };

  return (
    <>
      <div className="flex-[6] overflow-x-auto">
        <h1 className="text-lg font-semibold mb-2">All Promotions</h1>
        <table className="table bg-basic">
          <thead>
            <tr>
              <th>SL</th>
              <th>Promotion Name</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {promotions.map((promotion: IPromotion, index: number) => (
              <tr key={promotion._id}>
                <td>{index + 1}</td>
                <td>{promotion.name}</td>
                <td
                  className={`font-medium ${
                    promotion.status === "Draft"
                      ? "text-red-600"
                      : "text-green-600"
                  }`}
                >
                  {promotion.status}
                </td>
                <td>
                  <div className="flex">
                    <label
                      onClick={() => handlePromotionEdit(promotion._id)}
                      className="cursor-pointer"
                      htmlFor="modal-handle"
                    >
                      <TbEdit color="green" size={20} />
                    </label>
                    <button
                      onClick={() => handleDeletePromotion(promotion._id)}
                    >
                      <MdDelete color="red" size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isOpen && (
        <>
          {/* modal code start  */}
          <input type="checkbox" id="modal-handle" className="modal-toggle" />

          {filteredData.length > 0 && (
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
                    Update Promotion
                  </h1>

                  <form
                    onSubmit={handleUpdatePromotionSubmit}
                    className="bg-white p-3 flex flex-col gap-y-3 rounded-xl"
                  >
                    <div>
                      <label className="font-medium" htmlFor="name">
                        Promotion Name:
                      </label>
                      <input
                        className="block w-full p-2 border border-gray-400 focus:outline-none text-gray-500 mt-1"
                        type="text"
                        ref={nameRef}
                        required
                        defaultValue={filteredData[0].name}
                      />
                    </div>
                    <div className="mb-2">
                      <label className="font-medium" htmlFor="status">
                        Status:
                      </label>
                      <select
                        className="w-full border border-gray-400 rounded-sm p-2 focus:outline-none text-gray-500"
                        ref={statusRef}
                        required
                        value={selectedValue}
                        onChange={(e) => setSelectedValue(e.target.value)}
                      >
                        <option value="Publish">Publish</option>
                        <option value="Draft">Draft</option>
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
    </>
  );
};

export default PromotionList;
