import { z } from "zod";

export const loginValidate = z.object({
  password: z.string().nonempty("Password is required"),

  email: z
    .string()
    .email({ message: "Email format is not correct" })
    .nonempty({ message: "Email is required" }),
});

export const forgotPassword = z.object({
  email: z
    .string()
    .email({ message: "Email format is not correct" })
    .nonempty({ message: "Email is required" }),
});

export const resetPassword = z
  .object({
    password: z
      .string()
      .nonempty({ message: "Password is required" })
      .min(8, "Password must be at least 8 characters long")
      .max(30, "Password is too long (max 30 characters)")
      .regex(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)\S+$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one special character and one number"
      ),
    confirmPassword: z.string().nonempty({ message: "Password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const resetPasswordTwo = z.object({
  password: z.string().nonempty({ message: "Password is required" }),
  confirmPassword: z.string().nonempty({ message: "Password is required" }),
});
