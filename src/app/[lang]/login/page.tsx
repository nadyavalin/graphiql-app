"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useAuthState } from "react-firebase-hooks/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import styles from "../formStyles.module.css";
import { Box, TextField } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { auth } from "@config/firebaseConfig";
import { RootState } from "@shared/store";
import { Dictionary, Languages } from "@shared/types";
import { useDictionary } from "@shared/providers/DictionaryProvider";
import { Loader } from "@features/Loader";
import { emailFormatSchema, passwordSchema } from "@shared/validationSchemas";

interface FormData {
  email: string;
  password: string;
}

const createValidationLoginFormSchema = (dictionary: Dictionary) => {
  return yup.object({
    email: emailFormatSchema(dictionary),
    password: passwordSchema(dictionary),
  });
};

const LoginPage = () => {
  const router = useRouter();
  const dictionary = useDictionary();
  const schema = createValidationLoginFormSchema(dictionary);
  const currentLanguage: Languages = useSelector((state: RootState) => state.language.lang);
  const [user, loading] = useAuthState(auth);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  useEffect(() => {
    if (!loading && user) {
      router.push(`/${currentLanguage}`);
    }
  }, [loading, user, router, currentLanguage]);

  if (loading) {
    return <Loader />;
  }

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      toast.success(`${dictionary.LoginFrom.success}`);
      router.push(`/${currentLanguage}`);
    } catch (error) {
      toast.error(`${dictionary.LoginFrom.failed}`);
    }
  };

  return (
    <main>
      <h1>{dictionary.titles.signIn}</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <Box className={styles.field}>
          <TextField
            label={dictionary.LoginFrom.emailEnter}
            {...register("email")}
            className={styles.input}
          />
          {errors.email && <p className={styles.validationMessage}>{errors.email.message}</p>}
        </Box>
        <Box className={styles.field}>
          <TextField
            label={dictionary.LoginFrom.passwordEnter}
            {...register("password")}
            type="password"
            className={styles.input}
          />
          {errors.password && <p className={styles.validationMessage}>{errors.password.message}</p>}
        </Box>

        <button
          type="submit"
          disabled={!isValid || isSubmitting}
          className={!isValid || isSubmitting ? styles.disabled : styles.sendBtn}
        >
          {dictionary.LoginFrom.submit}
        </button>
      </form>
    </main>
  );
};

export default LoginPage;
