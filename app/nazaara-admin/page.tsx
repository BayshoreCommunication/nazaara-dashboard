"use client";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const router = useRouter();

  const handleLogin = async (e: any) => {
    e.preventDefault();

    const formData = {
      email: e ? e.target.email.value : "",
      password: e ? e.target.password.value : "",
    };

    await axios
      .post(`${process.env.API_URL}/api/v1/user/login`, formData)
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
        toast.error("Login Failed, Please try again.");
      });
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <section className="bg-gradient-to-r from-[#bd5757]  to-[#e0cd8d]">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 text-black">
          <div className="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 bg-basic">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <div className="flex justify-center">
                <Image
                  src="/images/nazaara-logo.png"
                  alt="nazaara main logo"
                  width={248}
                  height={248}
                  className="w-[160px]"
                />
              </div>
              <h1 className="text-lg font-semibold leading-tight tracking-tight md:text-2xl text-center">
                Sign in to your account
              </h1>
              <form onSubmit={handleLogin} className="space-y-4 md:space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium"
                  >
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
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium"
                  >
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
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
