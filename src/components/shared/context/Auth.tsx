"use client";
import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { auth } from "../../../../firebaseConfig";

interface User {
  uid: string;
  email: string | null;
}

interface AuthContextProps {
  user: User | null;
  loading: boolean;
}

const defaultContextValue: AuthContextProps = {
  user: null,
  loading: true,
};

const AuthContext = createContext<AuthContextProps>(defaultContextValue);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser({
          uid: user.uid,
          email: user.email,
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return <AuthContext.Provider value={{ user, loading }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
