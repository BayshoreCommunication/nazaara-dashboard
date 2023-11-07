"use client";
import { useCallback, useEffect, ReactNode } from "react";
import Navbar from "@/components/Navbar";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import { setupStore } from "../store/store";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import { useRouter, usePathname } from "next/navigation";
import { getCookie } from "cookies-next";
import axios from "axios";
const store = setupStore();

export default function RootLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const routerPath = usePathname();

  // eslint-disable-next-line react-hooks/exhaustive-deps

  const isLoggedIn = useCallback(async () => {
    const checkCookie = getCookie("token");
    if (checkCookie) {
      await axios
        .post(`${process.env.API_URL}/api/v1/user/isLoggedIn`, {
          token: checkCookie,
        })
        .then((response) => {
          if (response.data.status != "success") {
            router.push("/nazaara-admin");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      router.push("/nazaara-admin");
    }
  }, [router]);

  useEffect(() => {
    isLoggedIn();
  }, [isLoggedIn]);

  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <Toaster position="top-center" reverseOrder={false} />
          <>
            {routerPath === "/nazaara-admin" ? (
              children
            ) : (
              <>
                <Navbar />
                <div className="flex bg-white">
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
