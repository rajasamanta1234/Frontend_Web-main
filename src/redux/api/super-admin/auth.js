import { apiSlice } from "../configure";

export const authApi = apiSlice.injectEndpoints({
  // overrideExisting: true,
  endpoints: (builder) => ({
    loginAdmin: builder.mutation({
      query: (body) => ({
        url: "auth/adminlogin",
        method: "POST",
        body: body,
        // credentials: 'include',
      }),
    }),

    forgotPaswwordAdmin: builder.mutation({
      query: (body) => ({
        url: "auth/requestpasswordreset",
        method: "POST",
        body: body,
        // credentials: 'include',
      }),
    }),

    otpVerifyAdmin: builder.mutation({
      query: (body) => ({
        url: "auth/validateotpforpasswordreset",
        method: "POST",
        body: body,
        // credentials: 'include',
      }),
    }),
    resetPasswordAdmin: builder.mutation({
      query: (body) => ({
        url: "auth/resetpassword",
        method: "POST",
        body: body,
        // credentials: 'include',
      }),
    }),

    meAdmin: builder.mutation({
      query: (body) => ({
        url: "auth/meapi",
        method: "GET",
        body: body,
        // credentials: 'include',
      }),
    }),
  }),
});

export const {
  useLoginAdminMutation,
  useForgotPaswwordAdminMutation,
  useMeAdminMutation,
  useOtpVerifyAdminMutation,
  useResetPasswordAdminMutation,
} = authApi;
