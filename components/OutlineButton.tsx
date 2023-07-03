import React from "react";
interface IName {
  name: string;
}
const OutlineButton = ({ name }: IName) => {
  return (
    <button className="border border-secondary text-secondary px-3 py-1 rounded-lg font-semibold">
      {name}
    </button>
  );
};

export default OutlineButton;
