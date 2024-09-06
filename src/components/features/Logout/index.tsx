"use client";
import { IconButton } from "@mui/material";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { FirebaseError } from "firebase/app";
import { auth } from "@config/firebaseConfig";
import LogoutIcon from "@mui/icons-material/Logout";
import toast from "react-hot-toast";

export const Logout = () => {
  const router = useRouter();

  const logout = async () => {
    try {
      await signOut(auth);
      toast.success("You have logged out!");
      router.push("/en");
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
