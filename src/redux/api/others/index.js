import { apiSlice } from "../configure";

export const authApi = apiSlice.injectEndpoints({
  // overrideExisting: true,
  endpoints: (builder) => ({
    verification: builder.mutation({
      query: (body) => ({
        url: "auth/verifyemail",
        method: "POST",
        body: body,
        // credentials: 'include',
      }),
    }),
    verificationMail: builder.mutation({
      query: (body) => ({
        url: "auth/verify/useremail",
        method: "POST",
        body: body,
        // credentials: 'include',
      }),
    }),
    resendVerification: builder.mutation({
      query: (body) => ({
        url: "auth/resendvericationlink",
        method: "POST",
        body: body,
        // credentials: 'include',
      }),
    }),
  }),
});

export const {
  useVerificationMutation,
  useResendVerificationMutation,
  useVerificationMailMutation,
} = authApi;
