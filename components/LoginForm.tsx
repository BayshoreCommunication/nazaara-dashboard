"use client";

import axios from "axios";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { FC } from "react";
import toast from "react-hot-toast";

interface LoginSubmitProps {
  email: string;
  password: string;
}

const LoginForm: FC = () => {
  const router = useRouter();

  const loginSubmit = async (loginData: LoginSubmitProps) => {
    await axios
      .post(`${process.env.API_URL}/api/v1/auth/login`, loginData)
      .then((response) => {
        setCookie("token", response.data.token, {
          maxAge: 1 * 20 * 60 * 60 * 1000,
        });
        setCookie("adminCredential", JSON.stringify(response.data.user), {
          maxAge: 1 * 20 * 60 * 60 * 1000,
        });
        toast.success("Login Successful");
        router.push("/");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
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
            className="bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:outline-none focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
            className="bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:outline-none focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className=" w-full text-white bg-secondary transition-colors ease-in-out duration-500 hover:bg-[#5c0505] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
