"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FirebaseError } from "firebase/app";
import styles from "../formStyles.module.css";
import { Box, Link, TextField } from "@mui/material";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDictionary } from "@shared/providers/DictionaryProvider";
import { Dictionary, Languages } from "@shared/types";
import { RootState } from "@shared/store";
import { emailFormatSchema, passwordMatchSchema, passwordSchema } from "@shared/validationSchemas";
import { auth } from "@config/firebaseConfig";
import { useFirebaseAuth } from "@shared/hooks/useFirebaseAuth";
import { Loader } from "@features/Loader";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDateToken, setUserName } from "@shared/store/slices/userSlice";

interface FormData {
  email: string;
  password: string;
  passwordMatch: string;
}

const createValidationRegFormSchema = (dictionary: Dictionary) => {
  return yup.object({
    email: emailFormatSchema(dictionary),
    password: passwordSchema(dictionary),
    passwordMatch: passwordMatchSchema(dictionary),
  });
};

const RegistrationPage = () => {
  const router = useRouter();
  const dictionary = useDictionary();
  const schema = createValidationRegFormSchema(dictionary);
  const currentLanguage: Languages = useSelector((state: RootState) => state.language.lang);
  const { user, loading } = useFirebaseAuth();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  useEffect(() => {
    if (user) {
      router.push(`/${currentLanguage}`);
    }
  }, [user, router, currentLanguage]);

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      dispatch(setDateToken(new Date().toString()));
      dispatch(setUserName(data.email));
      toast.success(`${dictionary.registrationForm.success}`);
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

  if (loading) {
    return <Loader />;
  }
  if (user) {
    return null;
  }

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
            {...register("passwordMatch")}
            type="password"
            className={styles.input}
          />
          {errors.passwordMatch && (
            <p className={styles.validationMessage}>{errors.passwordMatch.message}</p>
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
      <Box className={styles.link}>
        {dictionary.registrationForm.linkToLogin}
        <Link href={`/${currentLanguage}/login`}>{dictionary.buttons.login}</Link>
      </Box>
    </main>
  );
};

export default RegistrationPage;
