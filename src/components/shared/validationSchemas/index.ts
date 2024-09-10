import * as yup from "yup";
import { Dictionary } from "@shared/types";

export const emailFormatSchema = (dictionary: Dictionary) => {
  return yup
    .string()
    .email(`${dictionary.yup.emailInvalidFormat}`)
    .required(`${dictionary.yup.required}`);
};

export const passwordSchema = (dictionary: Dictionary) => {
  return yup
    .string()
    .required(`${dictionary.yup.required}`)
    .min(8, `${dictionary.yup.passwordLength}`)
    .matches(/(?=.*[0-9])/, `${dictionary.yup.passwordOneNumber}`)
    .matches(/(?=.*[A-Za-z])/, `${dictionary.yup.passwordOneLetter}`)
    .matches(/(?=.*[!@#$%^&*])/, `${dictionary.yup.passwordOneSpecChar}`);
};

export const passwordMatchSchema = (dictionary: Dictionary) => {
  return yup
    .string()
    .required(`${dictionary.yup.passwordConfirmRequired}`)
    .oneOf([yup.ref("password")], `${dictionary.yup.passwordMatch}`);
};
