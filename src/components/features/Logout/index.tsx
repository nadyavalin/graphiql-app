"use client";
import { IconButton } from "@mui/material";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { FirebaseError } from "firebase/app";
import useSnackbar from "@shared/hooks/useSnackBar";
import CustomSnackbar from "@features/CustomSnackBar";
import { auth } from "../../../../firebaseConfig";
import LogoutIcon from "@mui/icons-material/Logout";

export const Logout = () => {
  const router = useRouter();
  const { snackbarOpen, snackbarMessage, snackbarSeverity, showSnackbar, handleSnackbarClose } =
    useSnackbar();
  const logout = async () => {
    try {
      await signOut(auth);
      showSnackbar("You have logged out!", "success");
      setTimeout(() => router.push("/en"), 3000);
    } catch (error) {
      console.error("Error during registration:", error);
      if (error instanceof FirebaseError) {
        showSnackbar("Logout error", "error");
      }
    }
  };

  return (
    <>
      <IconButton title="Send request">
        <LogoutIcon onClick={logout} />
      </IconButton>
      <CustomSnackbar
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        severity={snackbarSeverity}
      />
    </>
  );
};
