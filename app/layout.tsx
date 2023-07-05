"use client";
import { useCallback, useEffect } from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import { store } from "../store/store";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = usePathname();
  const routerForPush = useRouter();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const isLoggedIn = async () => {
    const response = await axios.get(`http://localhost:8000/api/v1/user`, {
      withCredentials: true,
    });
    // setLoggedIn(true);
    console.log("data", response);
  };

  // const isLoggedIn = useCallback(async () => {
  //   try {
  //     // const response = await axios.get(`${URL}/api/v1/admin/isLoggedIn`, {
  //     //   withCredentials: true,
  //     // });
  //     // const data = await fetch("http://localhost:8000/api/v1/user/isLoggedIn");
  //     // // setLoggedIn(true);
  //     // console.log("data for response", data);
  //   } catch (error) {
  //     routerForPush.push("/nazara-admin");
  //     console.error(error);
  //   }

  //   // setIsLoading(false);
  // }, [routerForPush]);

  useEffect(() => {
    isLoggedIn();
  }, [isLoggedIn]);

  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <Toaster position="top-center" reverseOrder={false} />
          {router === "/nazara-admin" ? (
            children
          ) : (
            <>
              <Navbar />
              <div className="flex gap-x-6">
                <Sidebar />
                <main className="flex-[6] bg-primary">{children}</main>
              </div>
            </>
          )}
        </Provider>
      </body>
    </html>
  );
}
