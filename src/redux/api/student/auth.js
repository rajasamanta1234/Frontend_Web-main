import { apiSlice } from "../configure";

export const authApi = apiSlice.injectEndpoints({
  // overrideExisting: true,
  endpoints: (builder) => ({
    signupStudent: builder.mutation({
      query: (body) => ({
        url: "auth/signup/student",
        method: "POST",
        body: body,
        // credentials: 'include',
      }),
    }),

    loginStudent: builder.mutation({
      query: (body) => ({
        url: "auth/signin/student",
        method: "POST",
        body: body,
        // credentials: 'include',
      }),
    }),

    forgotPaswwordStudent: builder.mutation({
      query: (body) => ({
        url: "auth/requestpasswordreset",
        method: "POST",
        body: body,
        // credentials: 'include',
      }),
    }),

    otpVerifyStudent: builder.mutation({
      query: (body) => ({
        url: "auth/validateotpforpasswordreset",
        method: "POST",
        body: body,
        // credentials: 'include',
      }),
    }),
    resetPasswordStudent: builder.mutation({
      query: (body) => ({
        url: "auth/resetpassword",
        method: "POST",
        body: body,
        // credentials: 'include',
      }),
    }),
    meStudent: builder.mutation({
      query: (body) => ({
        url: "auth/meapi",
        method: "GET",
        body: body,
        // credentials: 'include',
      }),
    }),

    facebookLoginStudent: builder.mutation({
      query: (body) => ({
        url: "auth/signinfacebook/student",
        method: "POST",
        body: body,
        // credentials: 'include',
      }),
    }),
    linkedinLoginStudent: builder.mutation({
      query: (body) => ({
        url: "auth/signinlinkedin/student",
        method: "POST",
        body: body,
        // credentials: 'include',
      }),
    }),
    googleLoginStudent: builder.mutation({
      query: (body) => ({
        url: "auth/signingoogle/student",
        method: "POST",
        body: body,
        // credentials: 'include',
      }),
    }),
    disableAccount: builder.mutation({
      query: (body) => ({
        url: `uuser/profile/disable`,
        method: "POST",
        body: body,
        // credentials: 'include',
      }),
    }),
    getBadge: builder.mutation({
      query: (body) => ({
        url: "badges/my",
        method: "GET",
        body: body,
        // credentials: 'include',
      }),
    }),
    checkPasswordFordisable: builder.mutation({
      query: (body) => ({
        url: `uuser/profile/disable`,
        method: "POST",
        body: body,
        // credentials: 'include',
      }),
    }),
    resendOtpVerifyStudent: builder.mutation({
      query: (body) => ({
        url: "uuser/resendotp",
        method: "POST",
        body: body,
        // credentials: 'include',
      }),
    }),
    otpVerifyPassword: builder.mutation({
      query: (body) => ({
        url: "uuser/verifyotp",
        method: "POST",
        body: body,
        // credentials: 'include',
      }),
    }),
  }),
});

export const {
  useForgotPaswwordStudentMutation,
  useLoginStudentMutation,
  useMeStudentMutation,
  useOtpVerifyStudentMutation,
  useResetPasswordStudentMutation,
  useSignupStudentMutation,
  useFacebookLoginStudentMutation,
  useLinkedinLoginStudentMutation,
  useGoogleLoginStudentMutation,
  useGetBadgeMutation,
  useCheckPasswordFordisableMutation,
  useDisableAccountMutation,
  useResendOtpVerifyStudentMutation,
  useOtpVerifyPasswordMutation,
} = authApi;
