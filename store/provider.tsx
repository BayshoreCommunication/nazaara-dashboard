"use client";
import { ReactNode } from "react";
import { setupStore } from "../store/store";
import { Provider } from "react-redux";
import { checkIsLoggedIn } from "@/helpers";
import dynamic from "next/dynamic";

const store = setupStore();

const Providers = ({ children }: { children: ReactNode }) => {
  checkIsLoggedIn();

  return <Provider store={store}>{children}</Provider>;
};
// use dynamic import to avoid server side rendering
export default dynamic(() => Promise.resolve(Providers), { ssr: false });
