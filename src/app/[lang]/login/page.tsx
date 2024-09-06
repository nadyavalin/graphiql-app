"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useAuthState } from "react-firebase-hooks/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import styles from "./styles.module.css";
import { Box, TextField } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { auth } from "@config/firebaseConfig";
import { RootState } from "@shared/store";
import { Dictionary, Languages } from "@shared/types";
import { useDictionary } from "@shared/providers/DictionaryProvider";
import { useDispatch } from "react-redux";
import { setLanguage } from "@src/components/shared/store/slices/languageSlice";

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
  const router = useRouter();
  const dispatch = useDispatch();
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
    if (user && !loading) {
      dispatch(setLanguage(currentLanguage));
      router.push(`/${currentLanguage}`);
    }
  }, [user, loading, router, currentLanguage, dispatch]);

  if (loading) {
    return null; // TODO добавить Loader
  }
  if (user) {
    dispatch(setLanguage(currentLanguage));
    router.push(`/${currentLanguage}`);
  }

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      toast.success(`${dictionary.LoginFrom.success}`);
      dispatch(setLanguage(currentLanguage));
      router.push(`/${currentLanguage}`);
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
