"use client";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import { store } from "../store/store";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = usePathname();
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <Toaster position="top-center" reverseOrder={false} />
          {router === "/login" ? (
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
