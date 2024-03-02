import { apiSlice } from "../configure";

export const authApi = apiSlice.injectEndpoints({
  // overrideExisting: true,
  endpoints: (builder) => ({
    getStudentProfileData: builder.mutation({
      query: (body) => ({
        url: "uuser/student/profile",
        method: "GET",
        body: body,
        // credentials: 'include',
      }),
    }),

    updateStudentProfile: builder.mutation({
      query: (body) => ({
        url: "uuser/student/profile",
        method: "PUT",
        body: body,
        // credentials: 'include',
      }),
    }),

    updateStudentPassword: builder.mutation({
      query: (body) => ({
        url: "uuser/manage/password",
        method: "PUT",
        body: body,
        // credentials: 'include',
      }),
    }),

    updateStudentUsername: builder.mutation({
      query: (body) => ({
        url: "uuser/update/username",
        method: "PUT",
        body: body,
        // credentials: 'include',
      }),
    }),

    updateStudentTimezone: builder.mutation({
      query: (body) => ({
        url: "uuser/student/timezone/update",
        method: "PUT",
        body: body,
        // credentials: 'include',
      }),
    }),

    updateStudentLanguage: builder.mutation({
      query: (body) => ({
        url: "uuser/student/language/update",
        method: "PUT",
        body: body,
        // credentials: 'include',
      }),
    }),
    deactiveStudentAccount: builder.mutation({
      query: (body) => ({
        url: "uuser/profile/disable",
        method: "PUT",
        body: body,
        // credentials: 'include',
      }),
    }),

    updateStudentNotification: builder.mutation({
      query: (body) => ({
        url: "uuser/student/notification/update",
        method: "PUT",
        body: body,
        // credentials: 'include',
      }),
    }),

    getTimezoneStudent: builder.mutation({
      query: () => ({
        url: "common/timezone",
        method: "GET",
        //   body: body,
        // credentials: 'include',
      }),
    }),

    updateStudentEmail: builder.mutation({
      query: (body) => ({
        url: "auth/update/useremail",
        method: "PUT",
        body: body,
        // credentials: 'include',
      }),
    }),

    getLanguageStudent: builder.mutation({
      query: () => ({
        url: "common/language",
        method: "GET",
        //   body: body,
        // credentials: 'include',
      }),
    }),
    getStudentStats: builder.mutation({
      query: () => ({
        url: "uuser/student/stats",
        method: "GET",
        //   body: body,
        // credentials: 'include',
      }),
    }),
    getStudentCertificate: builder.mutation({
      query: () => ({
        url: "certificates/my",
        method: "GET",
        //   body: body,
        // credentials: 'include',
      }),
    }),
    getLocation: builder.mutation({
      query: () => ({
        url: "common/country",
        method: "GET",
        //   body: body,
        // credentials: 'include',
      }),
    }),
  }),
});

export const {
  useGetStudentProfileDataMutation,
  useUpdateStudentProfileMutation,
  useUpdateStudentPasswordMutation,
  useUpdateStudentLanguageMutation,
  useUpdateStudentUsernameMutation,
  useUpdateStudentTimezoneMutation,
  useDeactiveStudentAccountMutation,
  useUpdateStudentNotificationMutation,
  useGetLanguageStudentMutation,
  useGetTimezoneStudentMutation,
  useGetStudentCertificateMutation,
  useGetStudentStatsMutation,
  useGetLocationMutation,
  useUpdateStudentEmailMutation,
} = authApi;
