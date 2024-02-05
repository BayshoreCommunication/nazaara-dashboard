"use client";
import { ReactNode } from "react";
import { setupStore } from "../store/store";
import { Provider } from "react-redux";
import dynamic from "next/dynamic";
import { CheckIsLoggedIn } from "@/helpers/checkIsLoggedIn";

const store = setupStore();

const Providers = ({ children }: { children: ReactNode }) => {
  CheckIsLoggedIn();

  return <Provider store={store}>{children}</Provider>;
};
// use dynamic import to avoid server side rendering
export default dynamic(() => Promise.resolve(Providers), { ssr: false });
