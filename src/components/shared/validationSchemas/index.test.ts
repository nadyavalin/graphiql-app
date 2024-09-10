import { describe, it, expect } from "vitest";
import { Dictionary } from "@shared/types";
import { emailFormatSchema, passwordMatchSchema, passwordSchema } from ".";

const dictionary: Dictionary = {
  yup: {
    emailInvalidFormat: "*** Invalid email format",
    required: "*** Field required",
    passwordLength: "*** The password must be at least 8 characters long",
    passwordOneNumber: "*** Password must contain at least one number",
    passwordOneLetter: "*** Password must contain at least one letter",
    passwordOneSpecChar: "*** Password must contain at least one special character",
    passwordMatch: "*** Passwords must match",
    passwordConfirmRequired: "*** Password confirmation is required",
  },
};

describe("Validation Schemas", () => {
  describe("emailFormatSchema", () => {
    const schema = emailFormatSchema(dictionary);

    it("should validate a correct email", async () => {
      await expect(schema.isValid("test@example.com")).resolves.toBe(true);
    });

    it("should return an error for an invalid email", async () => {
      await expect(schema.validate("not_an_email")).rejects.toThrow(
        dictionary.yup.emailInvalidFormat,
      );
    });

    it("should return an error for a missing email", async () => {
      await expect(schema.validate("")).rejects.toThrow(dictionary.yup.required);
    });
  });

  describe("passwordSchema", () => {
    const schema = passwordSchema(dictionary);

    it("should validate a correct password", async () => {
      await expect(schema.isValid("Password1!")).resolves.toBe(true);
    });

    it("should return an error for a password that is too short", async () => {
      await expect(schema.validate("Short1")).rejects.toThrow(dictionary.yup.passwordLength);
    });

    it("should return an error for a password without a number", async () => {
      await expect(schema.validate("Password!")).rejects.toThrow(dictionary.yup.passwordOneNumber);
    });

    it("should return an error for a password without a letter", async () => {
      await expect(schema.validate("12345678!")).rejects.toThrow(dictionary.yup.passwordOneLetter);
    });

    it("should return an error for a password without a special character", async () => {
      await expect(schema.validate("Password1")).rejects.toThrow(
        dictionary.yup.passwordOneSpecChar,
      );
    });

    it("should return an error for a missing password", async () => {
      await expect(schema.validate("")).rejects.toThrow(dictionary.yup.required);
    });
  });

  describe("passwordMatchSchema", () => {
    const schema = passwordMatchSchema(dictionary);

    it("should return an error if passwords do not match", async () => {
      const context = { password: "Password1!" };
      await expect(schema.validate("DifferentPassword", { context })).rejects.toThrow(
        dictionary.yup.passwordMatch,
      );
    });
  });
});
