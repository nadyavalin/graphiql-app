"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { signInWithEmailAndPassword } from "firebase/auth";
import * as yup from "yup";
import styles from "../formStyles.module.css";
import { Box, IconButton, InputAdornment, Link, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { yupResolver } from "@hookform/resolvers/yup";
import { auth } from "@config/firebaseConfig";
import { RootState } from "@shared/store";
import { Dictionary, Languages } from "@shared/types";
import { useDictionary } from "@shared/providers/DictionaryProvider";
import { emailFormatSchema, passwordSchema } from "@shared/validationSchemas";
import { setDateToken, setUserName } from "@shared/store/slices/userSlice";
import { useFirebaseAuth } from "@shared/hooks/useFirebaseAuth";
import { Loader } from "@features/Loader";

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

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const dictionary = useDictionary();
  const schema = createValidationLoginFormSchema(dictionary);
  const currentLanguage: Languages = useSelector((state: RootState) => state.language.lang);
  const { user, loading } = useFirebaseAuth();
  const [showPassword, setShowPassword] = useState(false);

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
      await signInWithEmailAndPassword(auth, data.email, data.password);
      dispatch(setDateToken(new Date().toString()));
      dispatch(setUserName(data.email));
      toast.success(`${dictionary.LoginFrom.success}`);
      router.push(`/${currentLanguage}`);
    } catch (error) {
      toast.error(`${dictionary.LoginFrom.failed}`);
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
            type={showPassword ? "text" : "password"}
            className={styles.input}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword((prev) => !prev)}
                      onMouseDown={(event) => event.preventDefault()}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
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
      <Box className={styles.link}>
        {dictionary.LoginFrom.linkToRegistration}
        <Link href={`/${currentLanguage}/registration`}>{dictionary.buttons.registration}</Link>
      </Box>
    </main>
  );
};

export default Login;
