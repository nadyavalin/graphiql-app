"use client";

import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import styles from "./styles.module.css";
import { Box, TextField } from "@mui/material";
import { auth } from "@config/firebaseConfig";
import { Locale } from "@config/i18n-config";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDictionary } from "@shared/providers/DictionaryProvider";
import { Dictionary } from "@shared/types/types";

interface FormData {
  email: string;
  password: string;
  confPassword: string;
}

export const createValidationRegFormSchema = (dictionary: Dictionary) => {
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
    confPassword: yup
      .string()
      .oneOf([yup.ref("password")], `${dictionary.yup.passwordMatch}`)
      .required(`${dictionary.yup.passwordConfirmRequired}`),
  });
};

const RegistrationPage = (lang: Locale) => {
  const dictionary = useDictionary();
  const schema = createValidationRegFormSchema(dictionary);
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
      toast.success(`${dictionary.registartionForm.success}`);
      router.push(`/${lang}`);
    } catch (error) {
      let errorMessage = `${dictionary.registartionForm.faild}`;
      if (error instanceof FirebaseError) {
        if (error.code === "auth/email-already-in-use") {
          errorMessage = `${dictionary.registartionForm.emailUsed}`;
        }
      }
      toast.error(errorMessage);
    }
  };

  return (
    <main>
      <h1>{dictionary.titles.signUp}</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <Box className={styles["field-block"]}>
          <TextField
            label={dictionary.registartionForm.emailEnter}
            {...register("email")}
            className={styles.input}
          />
          {errors.email && <p>{errors.email.message}</p>}{" "}
        </Box>
        <Box className={styles["field-block"]}>
          <TextField
            label={dictionary.registartionForm.passwordEnter}
            {...register("password")}
            type="password"
            className={styles.input}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </Box>
        <Box className={styles["field-block"]}>
          <TextField
            label={dictionary.registartionForm.passwordConfirm}
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
          {dictionary.registartionForm.submit}
        </button>
      </form>
    </main>
  );
};

export default RegistrationPage;
