"use client";

import axios from "axios";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import toast from "react-hot-toast";
import { BeatLoader } from "react-spinners";

interface LoginSubmitProps {
  email: string;
  password: string;
}

const LoginForm: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const loginSubmit = async (loginData: LoginSubmitProps) => {
    setIsLoading(true);
    await axios
      .post(`${process.env.API_URL}/api/v1/auth/login`, loginData)
      .then((response) => {
        // console.log("login response", response);
        setCookie("token", response.data.token, {
          maxAge: 1 * 20 * 60 * 60 * 1000,
        });
        setCookie("adminCredential", JSON.stringify(response.data.user), {
          maxAge: 1 * 20 * 60 * 60 * 1000,
        });
        setIsLoading(false);
        toast.success("Login Successful");
        router.push("/");
      })
      .catch((error) => {
        // console.log("error", error);
        if (error?.response?.status === 429) {
          toast.error(error.response.data);
        } else {
          toast.error(error.response.data.message);
        }
      });
  };

  const handleLogin = async (e: any) => {
    e.preventDefault();

    const formData = {
      email: e ? e.target.email.value : "",
      password: e ? e.target.password.value : "",
    };
    // console.log("event", formData);
    loginSubmit(formData);
  };

  return (
    <div>
      <form onSubmit={handleLogin} className="space-y-4 md:space-y-6">
        <div>
          <label htmlFor="email" className="block mb-2 text-sm font-medium">
            Your email
          </label>
          <input
            type="email"
            required
            name="email"
            className="bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:outline-none focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            placeholder="name@company.com"
          />
        </div>
        <div>
          <label htmlFor="password" className="block mb-2 text-sm font-medium">
            Password
          </label>
          <input
            type="password"
            required
            name="password"
            placeholder="••••••••"
            className="bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:outline-none focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
          />
        </div>
        <button
          type="submit"
          className=" w-full text-white bg-secondary transition-colors ease-in-out duration-500 hover:bg-[#5c0505] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex items-center gap-1 justify-center"
        >
          {isLoading ? <BeatLoader color="#fff" size={10} /> : "Sign In"}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
