"use client";

import { ReactNode } from "react";
import { Provider } from "react-redux";
import store from "@shared/store";

interface ClientProvidersProps {
  children: ReactNode;
}

export default function ClientProviders({ children }: ClientProvidersProps) {
  return <Provider store={store}>{children}</Provider>;
}
