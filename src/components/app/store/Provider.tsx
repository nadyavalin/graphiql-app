"use client";

import { Provider } from "react-redux";
import { FC, ReactNode } from "react";
import { setupStore } from "./store";

export type ChildrenType = {
  children: ReactNode;
};

export const store = setupStore();

const Providers: FC<ChildrenType> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default Providers;
