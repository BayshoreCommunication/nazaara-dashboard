"use client";
import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import { store } from "../store/store";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import { useRouter, redirect } from "next/navigation";
import axios from "axios";
import Login from "./nazara-admin/page";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = usePathname();
  const routerForPush = useRouter();
  const [isAuth, setIsAuth] = useState(false);
  const [isloading, setIsLoading] = useState(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps

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
    const isLoggedIn = async () => {
      axios
        .get("http://localhost:8000/api/v1/user/isLoggedIn", {
          withCredentials: true,
        })
        .then((data) => {
          if (data.status === 200) {
            setIsAuth(true);
            setIsLoading(false);
          }
        })
        .catch(function (error) {
          routerForPush.replace("/nazara-admin");
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log("error", error.response.data);
            console.log("error", error.response.status);
            console.log("error", error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
          }
          console.log(error.config);
        });
    };
    isLoggedIn();
  }, [routerForPush]);

  console.log(isAuth);

  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <Toaster position="top-center" reverseOrder={false} />
          <>
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
          </>
        </Provider>
      </body>
    </html>
  );
}
