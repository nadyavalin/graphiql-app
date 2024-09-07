"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { useAuthState } from "react-firebase-hooks/auth";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import styles from "../formStyles.module.css";
import { Box, TextField } from "@mui/material";
import { auth } from "@config/firebaseConfig";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDictionary } from "@shared/providers/DictionaryProvider";
import { Dictionary, Languages } from "@shared/types";
import { Loader } from "@features/Loader";
import { RootState } from "@shared/store";
import { setLanguage } from "@shared/store/slices/languageSlice";

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

const RegistrationPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const dictionary = useDictionary();
  const schema = createValidationRegFormSchema(dictionary);
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
    return <Loader />;
  }

  if (user) {
    dispatch(setLanguage(currentLanguage));
    router.push(`/${currentLanguage}`);
  }

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      toast.success(`${dictionary.registrationForm.success}`);
      dispatch(setLanguage(currentLanguage));
      router.push(`/${currentLanguage}`);
    } catch (error) {
      let errorMessage = `${dictionary.registrationForm.failed}`;
      if (error instanceof FirebaseError) {
        if (error.code === "auth/email-already-in-use") {
          errorMessage = `${dictionary.registrationForm.emailUsed}`;
        }
      }
      toast.error(errorMessage);
    }
  };

  return (
    <main>
      <h1>{dictionary.titles.signUp}</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <Box className={styles.field}>
          <TextField
            label={dictionary.registrationForm.emailEnter}
            {...register("email")}
            className={styles.input}
          />
          {errors.email && <p className={styles.validationMessage}>{errors.email.message}</p>}
        </Box>
        <Box className={styles.field}>
          <TextField
            label={dictionary.registrationForm.passwordEnter}
            {...register("password")}
            type="password"
            className={styles.input}
          />
          {errors.password && <p className={styles.validationMessage}>{errors.password.message}</p>}
        </Box>
        <Box className={styles.field}>
          <TextField
            label={dictionary.registrationForm.passwordConfirm}
            {...register("confPassword")}
            type="password"
            className={styles.input}
          />
          {errors.confPassword && (
            <p className={styles.validationMessage}>{errors.confPassword.message}</p>
          )}
        </Box>
        <button
          type="submit"
          disabled={!isValid || isSubmitting}
          className={!isValid || isSubmitting ? styles.disabled : styles.sendBtn}
        >
          {dictionary.registrationForm.submit}
        </button>
      </form>
    </main>
  );
};

export default RegistrationPage;
