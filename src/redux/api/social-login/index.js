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
  }),
});

export const { useVerificationMutation, useResendVerificationMutation } =
  authApi;
