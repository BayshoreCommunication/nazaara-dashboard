import { useSortable } from "@dnd-kit/sortable";
import Image from "next/image";
import React from "react";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { SlCloudUpload } from "react-icons/sl";
import { CSS } from "@dnd-kit/utilities";

const DraggableContent = ({
  image,
  index,
  onImageRemove,
  onImageUpdate,
  id,
}: any) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };
  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="image-item"
    >
      <Image
        src={image.data_url}
        alt="product_image"
        width={100}
        height={100}
      />
      <div className="mt-1 flex justify-end gap-2">
        <button onClick={() => onImageUpdate(index)}>
          <SlCloudUpload size={20} />
        </button>
        <button onClick={() => onImageRemove(index)}>
          <IoIosRemoveCircleOutline size={20} />
        </button>
      </div>
    </div>
  );
};

export default DraggableContent;
