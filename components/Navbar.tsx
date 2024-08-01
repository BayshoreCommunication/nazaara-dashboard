"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { deleteCookie } from "cookies-next";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";

const Navbar = () => {
  const routerForPush = useRouter();
  const [userCredential, setUserCredential] = useState({
    email: "",
    fullName: "",
    imageUrl: "",
  });

  const jsonStr = getCookie("adminCredential");

  useEffect(() => {
    if (jsonStr != null) {
      const obj = JSON.parse(jsonStr);
      // console.log("obj", obj);
      setUserCredential({
        email: obj.email,
        fullName: obj.fullName,
        imageUrl: obj.imageUrl,
      });
    }
  }, [jsonStr]);

  const handleLogOut = async (event: any) => {
    deleteCookie("token");
    deleteCookie("adminCredential");
    routerForPush.push("/nazaara-admin");
  };

  // console.log("userCredential", userCredential);

  return (
    <div className="">
      <div className="flex items-center justify-between bg-basic py-3 border-b px-6">
        <div className="flex justify-center">
          <Link href="/">
            <Image
              src="/images/nazaara-logo.png"
              alt="nazaara main logo"
              width={248}
              height={49}
              className="w-[150px] h-[30px]"
              priority
            />
          </Link>
        </div>
        <div className="flex gap-x-2 items-center justify-end">
          {/* <AiOutlineBell color="gray" size={26} /> */}
          {userCredential.imageUrl && (
            <div>
              <Image
                src={userCredential.imageUrl}
                alt="nazaara main logo"
                width={600}
                height={600}
                className="w-[36px] h-[36px] rounded-full"
              />
            </div>
          )}

          <div className="group relative">
            <div className="text-gray-500 flex items-center">
              <div>
                <p className="text-[#11142D] text-sm font-medium">
                  {userCredential.fullName}
                </p>
                <p className="text-xs font-medium">{userCredential.email}</p>
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
            <div className="w-full h-3 absolute"></div>
            <div className="w-full bg-basic hidden group-hover:block absolute right-2 top-12 z-10 text-center">
              {/* <p className="w-full hover:bg-secondary border py-1">setting</p> */}
              <button
                onClick={handleLogOut}
                className="w-full hover:bg-secondary text-gray-600 hover:text-white border py-2 rounded-sm font-medium text-xs"
              >
                LOG OUT
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
