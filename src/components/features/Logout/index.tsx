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
import { useDictionary } from "@shared/providers/DictionaryProvider";

export const Logout = () => {
  const router = useRouter();
  const dictionary = useDictionary();
  const currentLanguage: Languages = useSelector((state: RootState) => state.language.lang);

  const logout = async () => {
    try {
      await signOut(auth);
      toast.success(dictionary.logout.success);

      router.push(`/${currentLanguage}`);
    } catch (error) {
      if (error instanceof FirebaseError) {
        toast.error(`${dictionary.logout.failed}`);
      }
    }
  };

  return (
    <>
      <IconButton title={dictionary.titles.sendRequest}>
        <LogoutIcon onClick={logout} />
      </IconButton>
    </>
  );
};
