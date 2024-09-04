"use client";

import { ReactNode } from "react";
import { Provider } from "react-redux";
import store from "@shared/store";

interface ClientProviderProps {
  children: ReactNode;
}

export function ClientProvider({ children }: ClientProviderProps) {
  return <Provider store={store}>{children}</Provider>;
}
