import { SubmitHandler, useForm } from "react-hook-form";
import styles from "./styles.module.css";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

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
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<FormData> = (data: FormData) => {
    console.log(data);
  };

  return (
    <>
      <main>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <h1>Sign UP</h1>
          <label>Enter your email</label>
          <input {...register("email")} />
          {errors.email && <p>{errors.email.message}</p>}

          <label>Enter password</label>
          <input {...register("password")} type="password" />
          {errors.password && <p>{errors.password.message}</p>}

          <label>Confirm password</label>
          <input {...register("confPassword")} type="password" />
          {errors.confPassword && <p>{errors.confPassword.message}</p>}

          <button
            type="submit"
            disabled={!isValid || isSubmitting}
            className={
              !isValid || isSubmitting ? `${styles["send-btn"]} disabled}` : styles["send-btn"]
            }
          >
            Submit
          </button>
        </form>
      </main>
    </>
  );
};

export default RegistrationPage;
