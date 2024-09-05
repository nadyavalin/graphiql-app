"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import styles from "./styles.module.css";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "../../../../firebaseConfig";
import { Box, TextField } from "@mui/material";
import useSnackbar from "@shared/hooks/useSnackBar";
import CustomSnackbar from "@features/CustomSnackBar";
import { FirebaseError } from "firebase/app";

interface FormData {
  email: string;
  password: string;
  confPassword: string;
}

export const schema = yup.object({
  email: yup.string().email("*** Invalid email format").required("*** Field required"),
  password: yup
    .string()
    .min(8, "*** The password must be at least 8 characters long")
    .required("*** Field required")
    .matches(/(?=.*[0-9])/, "*** Password must contain at least one number")
    .matches(/(?=.*[A-Za-z])/, "*** Password must contain at least one letter")
    .matches(/(?=.*[!@#$%^&*])/, "*** Password must contain at least one special character"),
  confPassword: yup
    .string()
    .oneOf([yup.ref("password")], "*** Passwords must match")
    .required("*** Password confirmation is required"),
});

const RegistrationPage = () => {
  const { snackbarOpen, snackbarMessage, snackbarSeverity, showSnackbar, handleSnackbarClose } =
    useSnackbar();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      showSnackbar("Registration successful!", "success");
      setTimeout(() => router.push("/en"), 1000);
    } catch (error) {
      console.error("Error during registration:", error);
      let errorMessage = "Registration failed. Please try again.";

      if (error instanceof FirebaseError) {
        if (error.code === "auth/email-already-in-use") {
          errorMessage = "The email address is already in use.";
        }
      }

      showSnackbar(errorMessage, "error");
    }
  };

  return (
    <main>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <Box className={styles["field-block"]}>
          <TextField label="Enter your email" {...register("email")} className={styles.input} />
          {errors.email && <p>{errors.email.message}</p>}{" "}
        </Box>
        <Box className={styles["field-block"]}>
          <TextField
            label="Enter password"
            {...register("password")}
            type="password"
            className={styles.input}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </Box>
        <Box className={styles["field-block"]}>
          <TextField
            label="Confirm password"
            {...register("confPassword")}
            type="password"
            className={styles.input}
          />
          {errors.confPassword && <p>{errors.confPassword.message}</p>}
        </Box>
        <button
          type="submit"
          disabled={!isValid || isSubmitting}
          className={!isValid || isSubmitting ? styles["disabled"] : styles["send-btn"]}
        >
          Submit
        </button>
      </form>
      <CustomSnackbar
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        severity={snackbarSeverity}
      />
    </main>
  );
};

export default RegistrationPage;
