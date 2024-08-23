"use client";

import React, { createContext, useContext, ReactNode } from "react";

interface Dictionary {
  buttons: {
    login: string;
    registration: string;
    welcome: string;
  };
}

interface DictionaryContextProps {
  dictionary: Dictionary;
}

interface DictionaryProviderProps {
  value: DictionaryContextProps;
  children: ReactNode;
}

const DictionaryContext = createContext<DictionaryContextProps | undefined>(undefined);

export const useDictionary = (): DictionaryContextProps => {
  const context = useContext(DictionaryContext);
  if (!context) {
    throw new Error("useDictionary must be used within a DictionaryProvider");
  }
  return context;
};

export const DictionaryProvider = ({ value, children }: DictionaryProviderProps) => {
  return <DictionaryContext.Provider value={value}>{children}</DictionaryContext.Provider>;
};
