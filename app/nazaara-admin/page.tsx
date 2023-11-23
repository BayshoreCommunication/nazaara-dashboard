import LoginForm from "@/components/LoginForm";
import Image from "next/image";
import { Toaster } from "react-hot-toast";

const Login = () => {
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
                  priority
                />
              </div>
              <h1 className="text-lg font-semibold leading-tight tracking-tight md:text-2xl text-center">
                Sign in to your account
              </h1>
              <LoginForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
