"use client";

import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useAuthState } from "react-firebase-hooks/auth";
import styles from "./styles.module.css";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@config/firebaseConfig";
import { Box, TextField } from "@mui/material";
import { Dictionary } from "@shared/types/types";
import { useDictionary } from "@shared/providers/DictionaryProvider";

interface FormData {
  email: string;
  password: string;
}

export const createValidationLoginFormSchema = (dictionary: Dictionary) => {
  return yup.object({
    email: yup
      .string()
      .email(`${dictionary.yup.emailInvalidFormat}`)
      .required(`${dictionary.yup.required}`),
    password: yup
      .string()
      .min(8, `${dictionary.yup.passwordLength}`)
      .required(`${dictionary.yup.required}`)
      .matches(/(?=.*[0-9])/, `${dictionary.yup.passwordOneNumber}`)
      .matches(/(?=.*[A-Za-z])/, `${dictionary.yup.passwordOneLetter}`)
      .matches(/(?=.*[!@#$%^&*])/, `${dictionary.yup.passwordOneSpecChar}`),
  });
};

const LoginPage = () => {
  const dictionary = useDictionary();
  const schema = createValidationLoginFormSchema(dictionary);
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
      toast.success(`${dictionary.LoginFrom.success}`);
      router.push("/en");
    } catch (error) {
      toast.error(`${dictionary.LoginFrom.faild}`);
    }
  };

  return (
    <main>
      <h1>{dictionary.titles.signIn}</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <Box className={styles["field-block"]}>
          <TextField
            label={dictionary.LoginFrom.emailEnter}
            {...register("email")}
            className={styles.input}
          />
          {errors.email && <p>{errors.email.message}</p>}{" "}
        </Box>
        <Box className={styles["field-block"]}>
          <TextField
            label={dictionary.LoginFrom.passwordEnter}
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
          {dictionary.LoginFrom.submit}
        </button>
      </form>
    </main>
  );
};

export default LoginPage;
