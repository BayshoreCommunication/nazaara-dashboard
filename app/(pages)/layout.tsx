import { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import "../globals.css";
import Sidebar from "@/components/Sidebar";
import { Toaster } from "react-hot-toast";
import Providers from "@/store/provider";

const PageLayout = ({ children }: { children: ReactNode }) => {
  // use fetch post request isLoggedIn to check if user is logged in or not so that server side rendering can be done
  // don't use useRouter() hook here as it will not work on server side rendering

  return (
    <div>
      <Providers>
        <Toaster position="top-center" reverseOrder={false} />
        <Navbar />
        <div className="flex bg-white">
          <Sidebar />
          <main className="w-full bg-primary">{children}</main>
        </div>
      </Providers>
    </div>
  );
};

export default PageLayout;
