"use client";
import React, { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { auth } from "@config/firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [user] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/en");
    }
  }, [user, router]);

  return <>{user ? children : null}</>;
};

export default ProtectedRoute;
