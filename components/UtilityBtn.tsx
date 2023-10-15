import { ReactNode } from "react";
interface PrimaryButtonProps {
  name: string;
  icon: ReactNode;
}
const UtilityBtn: React.FC<PrimaryButtonProps> = ({ name, icon }) => {
  return (
    <button className="bg-secondary py-1 px-4 rounded-md text-white flex gap-1 items-center text-[14px]">
      {name}
      {icon}
    </button>
  );
};
export default UtilityBtn;
