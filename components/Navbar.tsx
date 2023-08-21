import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AiOutlineBell } from "react-icons/ai";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { deleteCookie } from "cookies-next";

const Navbar = () => {
  const routerForPush = useRouter();

  const handleLogOut = async (event: any) => {
    deleteCookie("token");
    deleteCookie("adminCredential");
    routerForPush.push("/nazaara-admin");
  };

  return (
    <div className="">
      <div className="flex items-center bg-basic py-3 pr-9 border-b">
        <div className="flex-1 flex justify-center">
          <Link href="/">
            <Image
              src="/images/nazara-logo.png"
              alt="nazara main logo"
              width={248}
              height={49}
              className="w-[150px] h-[30px]"
            />
          </Link>
        </div>
        <div className="flex flex-[6] gap-x-6 items-center justify-end">
          <AiOutlineBell color="gray" size={26} />
          <div>
            <Image
              src="https://res.cloudinary.com/nazaara/image/upload/v1692621035/users/login_c43wh2.png"
              alt="nazara main logo"
              width={600}
              height={600}
              className="w-[36px] h-[36px] rounded-full"
            />
          </div>
          <div className="group relative">
            <div className="text-gray-500 flex items-center">
              <div>
                <p className="text-[#11142D] text-sm">Ahad Islam</p>
                <p className="text-xs">ahadislam@email.com</p>
              </div>
              <FaAngleDown
                size={20}
                color="gray"
                className="block group-hover:hidden"
              />
              <FaAngleUp
                size={20}
                color="gray"
                className="hidden group-hover:block"
              />
            </div>
            <div className="w-32 h-3 absolute"></div>
            <div className="w-32 bg-basic hidden group-hover:block absolute right-2 top-12 z-10 text-center">
              {/* <p className="w-full hover:bg-secondary border py-1">setting</p> */}
              <button
                onClick={handleLogOut}
                className="w-full hover:bg-secondary hover:text-white border py-1 rounded-sm"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
