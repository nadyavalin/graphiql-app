"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import styles from "./styles.module.css";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../../firebaseConfig";
import { Box, TextField } from "@mui/material";
import { toast } from "react-hot-toast";
import { useAuthState } from "react-firebase-hooks/auth";

interface FormData {
  email: string;
  password: string;
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
});

const LoginPage = () => {
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

  if (loading) {
    return;
  }
  if (user) {
    router.push("/en");
  }

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      toast.success("Successful login!");
      router.push("/en");
    } catch (error) {
      toast.error("Login failed. Please try again.");
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

export default LoginPage;
