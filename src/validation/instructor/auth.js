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

export const signupValidate = z.object({
  firstname: z.string()
    .regex(/^[A-Za-z !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/, { message: "First name must contain only alphabet and special characters" })
    .min(2, { message: "First name must be at least 2 characters long" }),
  lastname: z.string()
    .regex(/^[A-Za-z !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/, { message: "Last name must contain only alphabet and special characters" })
    .min(2, { message: "Last name must be at least 2 characters long" }),
  password: z
    .string()
    // .nonempty({message:'Password is required'})
    .min(8, "Password must be at least 8 characters long")
    .max(30, "Password is too long (max 30 characters)")
    .regex(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)\S+$/,
      "Password must contain at least one uppercase letter, one lowercase letter,  one number and one special character"
    ),

  email: z.string().email({ message: "Email format is not correct" }),
});
export const signupValidateTwo = z.object({
  firstname: z.string().trim().nonempty({ message: "First name is required" }),
  lastname: z.string().trim().nonempty({ message: "Last name is required" }),
  password: z.string().nonempty({ message: "Password is required" }),
  email: z
    .string()
    .email({ message: "Email format is not correct" })
    .nonempty({ message: "Email is required" }),
});
export const emailValidate = z.object({
  email: z
    .string()
    .email({ message: "Email format is not correct" })
    .nonempty({ message: "Email is required" }),
});
export const usernameValidate = z.object({
  username: z.string().nonempty({ message: "Username is required" }),
});
export const certificateFormValidate = z.array(
  z.object({
    title: z.string().trim().nonempty({ message: "Title is required" }),
    date: z.string().trim().nonempty({ message: "Date is required" }),
    category: z.string().trim().nonempty({ message: "Category is required" }),
    issuer: z.string().trim().nonempty({ message: "Issuer is required" }),
    certificateNo: z
      .string()
      .trim()
      .nonempty({ message: "Certificate no is required" }),
  })
);

export const certificateFormValidateUpdate = z.object({
  title: z.string().trim().nonempty({ message: "Title is required" }),
  date: z.string().trim().nonempty({ message: "Date is required" }),
  category: z.string().trim().nonempty({ message: "Category is required" }),
  issuer: z.string().trim().nonempty({ message: "Issuer is required" }),
  certificateNo: z
    .string()
    .trim()
    .nonempty({ message: "Certificate no is required" }),
  certificateLink: z
    .string()
    .trim()
    .nonempty({ message: "Certificate  is required" }),
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

export const cvformvalidate = z.object({
  cvfile: z.string().nonempty({ message: "cvfile is required" }),
  certificate: z.string().array().nonempty({
    message: "certificate Can't be empty!",
  }),
});

export const govtidformvalidate = z.object({
  identityType: z.string().nonempty({ message: "ID type is required" }),
  identityNumber: z.string().nonempty({ message: "ID number is required" }),
  // identificationFileLinks: z.string().array().nonempty({
  //   message: "certificate Can't be empty!",
  // })
});
export const checkpasswordValidation = z.object({
  oldPassword: z.string().nonempty({ message: "Old Password is required" }),
});
export const cvEditformValidate = z.object({
  reason: z.string().nonempty({ message: "Reason for change required" }),
});
export const summaryformvalidate = z.object({
  specialization: z
    .string()
    .nonempty({ message: "Specialization is required" }),
  profilePicture: z
    .string()
    .nonempty({ message: "Profile Picture is required" }),
  summary: z.string().nonempty({ message: "Summary is required" }),
  // certificate: z.string().array().nonempty({
  //   message: "certificate Can't be empty!",
  // })
});
export const editProfileValidate = z.object({
  firstname: z.string().superRefine((val, ctx) => {
    if (val.trim() == "") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "First name is required",
        fatal: true,
      });

      return z.NEVER;
    }
    const nameRegex = /^[A-Za-z ]+$/;
    if (!nameRegex.test(val)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "First name must contain only alphabet characters",
      });
    }
  }),
  lastname: z.string().superRefine((val, ctx) => {
    if (val.trim() == "") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Last name is required",
        fatal: true,
      });

      return z.NEVER;
    }
    const nameRegex = /^[A-Za-z ]+$/;
    if (!nameRegex.test(val)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Last name must contain only alphabet characters",
      });
    }
  }),
  profilePicture: z
    .string()
    .nonempty({ message: "Profile Picture is required" }),
  website: z.string().superRefine((val, ctx) => {
    if (val.trim() == "") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Website is required",
        fatal: true,
      });

      return z.NEVER;
    }
    const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    if (!urlRegex.test(val)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Invalid website URL format",
      });
    }
  }),
  phoneno: z.string().nonempty({ message: "Phone number is required" }),
  gender: z.string().nonempty({ message: "Gender is required" }),
  address: z.string().nonempty({ message: "Address is required" }),
  city: z.string().superRefine((val, ctx) => {
    if (val.trim() == "") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "City is required",
        fatal: true,
      });

      return z.NEVER;
    }
    const nameRegex = /^[A-Za-z ]+$/;
    if (!nameRegex.test(val)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "City must contain only alphabet characters",
      });
    }
  }),
  state: z.string().superRefine((val, ctx) => {
    if (val.trim() == "") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "State is required",
        fatal: true,
      });

      return z.NEVER;
    }
    const nameRegex = /^[A-Za-z ]+$/;
    if (!nameRegex.test(val)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "State must contain only alphabet characters",
      });
    }
  }),
  zipcode: z.string().nonempty({ message: "Zip Code is required" }),
  country: z.string().superRefine((val, ctx) => {
    if (val.trim() == "") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Country is required",
        fatal: true,
      });

      return z.NEVER;
    }
    const nameRegex = /^[A-Za-z ]+$/;
    if (!nameRegex.test(val)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Country must contain only alphabet characters",
      });
    }
  }),
  timezone: z.string().nonempty({ message: "Time Zone is required" }),
  specialization: z
    .string()
    .nonempty({ message: "Specialization is required" }),

  about: z.string().nonempty({ message: "About is required" }),
});
export const changePasswordValidate = z
  .object({
    password: z.string().superRefine((val, ctx) => {
      if (val.trim() == "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Password is required",
          fatal: true,
        });

        return z.NEVER;
      }

      if (val < 8) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Password must be at least 8 characters long",
        });
      }
      if (val > 30) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Password is too long (max 30 characters)",
        });
      }

      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
      if (!passwordRegex.test(val)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message:
            "Password must contain at least one uppercase letter, one lowercase letter, one special character, and one number, and be at least 8 characters long",
        });
      }
    }),
    oldpassword: z
      .string()
      .nonempty({ message: "Current Password is required" }),
    confirmPassword: z
      .string()
      .nonempty({ message: "Confirm password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
