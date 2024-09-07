"use client";

import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { IconButton } from "@mui/material";
import { FirebaseError } from "firebase/app";
import { signOut } from "firebase/auth";
import { auth } from "@config/firebaseConfig";
import LogoutIcon from "@mui/icons-material/Logout";
import { Languages } from "@shared/types";
import { RootState } from "@shared/store";

export const Logout = () => {
  const router = useRouter();

  const currentLanguage: Languages = useSelector((state: RootState) => state.language.lang);

  const logout = async () => {
    try {
      await signOut(auth);
      toast.success("You have logged out!");

      router.push(`/${currentLanguage}`);
    } catch (error) {
      if (error instanceof FirebaseError) {
        toast.error("Logout error");
      }
    }
  };

  return (
    <>
      <IconButton title="Send request">
        <LogoutIcon onClick={logout} />
      </IconButton>
    </>
  );
};
