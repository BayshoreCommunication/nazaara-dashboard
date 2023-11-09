"use client";
import { ReactNode } from "react";
import { setupStore } from "../store/store";
import { Provider } from "react-redux";
import { checkIsLoggedIn } from "@/helpers";

const store = setupStore();

const Providers = ({ children }: { children: ReactNode }) => {
  checkIsLoggedIn();

  return <Provider store={store}>{children}</Provider>;
};

export default Providers;
