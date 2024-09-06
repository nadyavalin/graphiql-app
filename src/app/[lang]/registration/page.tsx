"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import styles from "./styles.module.css";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "../../../../firebaseConfig";
import { Box, TextField } from "@mui/material";
import { FirebaseError } from "firebase/app";
import toast from "react-hot-toast";
import { useAuthState } from "react-firebase-hooks/auth";
import { Locale } from "@config/i18n-config";

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

const RegistrationPage = (lang: Locale) => {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  if (loading) return;
  if (user) {
    router.push("/en");
  }

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      toast.success("Registration successful!");
      router.push(`/${lang}`);
    } catch (error) {
      let errorMessage = "Registration failed. Please try again.";
      if (error instanceof FirebaseError) {
        if (error.code === "auth/email-already-in-use") {
          errorMessage = "The email address is already in use.";
        }
      }

      toast.error(errorMessage);
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
    </main>
  );
};

export default RegistrationPage;
