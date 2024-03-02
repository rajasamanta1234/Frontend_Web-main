import { z } from "zod";

export const withdrawMoneyValidate = z.object({
  amount: z.string().superRefine((val, ctx) => {
    if (val.trim() == "") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Amount is required",
        fatal: true,
      });

      return z.NEVER;
    }

    if (Number(val) < 1) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Amount should be more than 0",
      });
    }
  }),
  cardHolderName: z
    .string()
    .nonempty({ message: "Car Holder Name is required" }),
  cardNumber: z
    .string()

    .superRefine((val, ctx) => {
      if (val.trim() == "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Card Number is required",
          fatal: true,
        });

        return z.NEVER;
      }

      if (Number(val) < 1) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Card Number should be more than 0",
        });
      }
    }),
  paymentMethod: z
    .string()
    .nonempty({ message: "Please select the payment method" }),
});

export const creditCardAddValidation = z.object({
  cardHolderName: z
    .string()
    .nonempty({ message: "Car Holder Name is required" }),
  cardNumber: z
    .string()

    .superRefine((val, ctx) => {
      if (val.trim() == "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Card Number is required",
          fatal: true,
        });

        return z.NEVER;
      }

      if (Number(val) < 1) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Card Number should be more than 0",
        });
      }
    }),
  //   expiryDate: z.string().nonempty({ message: "Expiry Date is required" }),
  cvv: z.string().superRefine((val, ctx) => {
    if (val.trim() == "") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "CVC/CVV is required",
        fatal: true,
      });

      return z.NEVER;
    }

    if (val.length !== 3) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "CVC/CVV should be 3 character",
      });
    }
  }),
});

export const paypalEmailValidation = z.object({
  email: z
    .string()
    .email({ message: "Email format is not correct" })
    .nonempty({ message: "Email is required" }),
});

export const stripeValidation = z.object({
  stripApiKey: z.string().nonempty({ message: "Api Key is required" }),
});

export const bankAccountValidation = z.object({
  accountNumber: z
    .string()

    .superRefine((val, ctx) => {
      if (val.trim() == "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Account Number is required",
          fatal: true,
        });

        return z.NEVER;
      }

      if (Number(val) < 1) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Account Number should be more than 0",
        });
      }
    }),
  sortCode: z.string().nonempty({ message: "Sort Code is required" }),
});

export const editProfileValidation = z.object({
  fullName: z.string().superRefine((val, ctx) => {
    if (val.trim() == "") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Full name is required",
        fatal: true,
      });

      return z.NEVER;
    }
    const nameRegex = /^[A-Za-z !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;
    if (!nameRegex.test(val)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Full name must contain only alphabet and special characters",
      });
    }
  }),
  profilePicture: z
    .string()
    .nonempty({ message: "Profile picture is required" }),
  bio: z.string().nonempty({ message: "Bio is required" }),
  phoneno: z.string().nonempty({ message: "Phone number is required" }),
  // .length(10, "Phone number must be 10 characters long"),
  timezone: z.string().nonempty({ message: "Timezone is required" }),
  countryCode: z.string().nonempty({ message: "Country  is required" }),
  // location: z.string().nonempty({ message: "Location is required" }),
  dob: z.string().nonempty({ message: "Date of birth is required" }),
});

export const changepasswordValidation = z
  .object({
    // password: z
    //   .string()
    //   .nonempty({ message: "Password is required" })
    //   .min(8, "Password must be at least 8 characters long")
    //   .max(30, "Password is too long (max 30 characters)")
    //   .regex(
    //     /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)\S+$/,
    //     "Password must contain at least one uppercase letter, one lowercase letter, one special character and one number"
    //   ),
    password: z.string().superRefine((val, ctx) => {
      if (val.trim() == "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Password is required",
          fatal: true,
        });

        return z.NEVER;
      }

      if (val.trim()?.length < 8 && val?.trim()?.length < 30) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Password must be at least 8 characters long",
          fatal: true,
        });

        return z.NEVER;
      }
      if (val?.trim()?.length > 30) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Password is too long (max 30 characters)",
          fatal: true,
        });

        return z.NEVER;
      }

      const nameRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)\S+$/;
      if (!nameRegex.test(val)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message:
            "Password must contain at least one uppercase letter, one lowercase letter, one special character and one number",
        });
      }
    }),
    confirmPassword: z
      .string()
      .nonempty({ message: "Confirm password is required" }),
    oldPassword: z
      .string()
      .nonempty({ message: "Current password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const changeUsernameValidate = z.object({
  userName: z.string().nonempty({ message: "Username is required" }),
});

export const changeTimezoneValidate = z.object({
  timezone: z.string().nonempty({ message: "Timezone is required" }),
});

export const changeLanguageValidate = z.object({
  language: z.string().nonempty({ message: "Language is required" }),
});

export const changeEmailValidate = z.object({
  email: z
    .string()
    .email({ message: "Email format is not correct" })
    .nonempty({ message: "Email is required" }),
});
