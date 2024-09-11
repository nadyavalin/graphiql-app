"use client";

import { createContext, useContext, ReactNode } from "react";
import { Dictionary } from "@shared/types";

const DictionaryContext = createContext<Dictionary | null>(null);

export default function DictionaryProvider({
  dictionary,
  children,
}: {
  dictionary: Dictionary;
  children: ReactNode;
}) {
  return <DictionaryContext.Provider value={dictionary}>{children}</DictionaryContext.Provider>;
}

export const useDictionary = (): Dictionary => {
  const dictionary = useContext(DictionaryContext);
  if (dictionary === null) {
    throw new Error("useDictionary hook must be used within DictionaryProvider");
  }

  return dictionary;
};
