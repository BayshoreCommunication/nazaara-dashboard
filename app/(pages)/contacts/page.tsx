import { AiOutlineDownload, AiOutlineShoppingCart } from "react-icons/ai";
import UtilityBtn from "@/components/UtilityBtn";
import { GetAllContacts } from "@/components/contacts";
import { GrContact } from "react-icons/gr";

const Contacts = () => {
  return (
    <div className="container">
      <div className="flex items-center justify-between mb-3">
        <div className="flex gap-1 items-center">
          <GrContact size={18} color="gray" />
          <span className="font-medium text-lg">All Contacts</span>
        </div>
        {/* <UtilityBtn name="Export" icon={<AiOutlineDownload color="white" />} /> */}
      </div>
      <table className="table bg-basic overflow-auto">
        <thead>
          <tr>
            <th>Sl</th>
            <th>Name</th>
            <th>Email</th>
            <th>Message</th>
            <th>Subject</th>
            <th>Contact Time</th>
            <th>Action</th>
          </tr>
        </thead>
        <GetAllContacts />
      </table>
    </div>
  );
};

export default Contacts;
