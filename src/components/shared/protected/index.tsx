"use client";
import React, { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader } from "@features/Loader";
import useFirebaseAuth from "@shared/hooks/useFirebaseAuth";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useFirebaseAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/en");
    }
  }, [user, loading, router]);

  if (loading) {
    return <Loader />;
  }

  return <>{user ? children : null}</>;
};

export default ProtectedRoute;
