import { apiSlice } from "../configure";

export const authApi = apiSlice.injectEndpoints({
  // overrideExisting: true,
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (body) => ({
        url: "auth/signup/instructor",
        method: "POST",
        body: body,
        // credentials: 'include',
      }),
    }),
    cvform: builder.mutation({
      query: (body) => ({
        url: "auth/instructor/steptwo",
        method: "POST",
        body: body,
        // credentials: 'include',
      }),
    }),
    cvdelete: builder.mutation({
      query: (body) => ({
        url: `uuser/instructor/cv/remove/${body.uid}`,
        method: "DELETE",
        body: body,
        // credentials: 'include',
      }),
    }),
    govtidform: builder.mutation({
      query: (body) => ({
        url: "auth/instructor/stepthree",
        method: "POST",
        body: body,
        // credentials: 'include',
      }),
    }),
    summaryform: builder.mutation({
      query: (body) => ({
        url: "auth/instructor/stepfour",
        method: "POST",
        body: body,
        // credentials: 'include',
      }),
    }),
    loginInstructor: builder.mutation({
      query: (body) => ({
        url: "auth/signin/instructor",
        method: "POST",
        body: body,
        // credentials: 'include',
      }),
    }),

    forgotPaswwordInstructor: builder.mutation({
      query: (body) => ({
        url: "auth/requestpasswordreset",
        method: "POST",
        body: body,
        // credentials: 'include',
      }),
    }),

    otpVerifyInstructor: builder.mutation({
      query: (body) => ({
        url: "auth/validateotpforpasswordreset",
        method: "POST",
        body: body,
        // credentials: 'include',
      }),
    }),
    resendOtpVerifyInstructor: builder.mutation({
      query: (body) => ({
        url: "uuser/resendotp",
        method: "POST",
        body: body,
        // credentials: 'include',
      }),
    }),
    resetPasswordInstructor: builder.mutation({
      query: (body) => ({
        url: "auth/resetpassword",
        method: "POST",
        body: body,
        // credentials: 'include',
      }),
    }),
    changePasswordInstructor: builder.mutation({
      query: (body) => ({
        url: "uuser/manage/password",
        method: "PUT",
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
    meInstructor: builder.mutation({
      query: (body) => ({
        url: "auth/meapi",
        method: "GET",
        body: body,
        // credentials: 'include',
      }),
    }),
    getCvForm: builder.mutation({
      query: (body) => ({
        url: "auth/instructor/stepdata",
        method: "GET",
        body: body,
        // credentials: 'include',
      }),
    }),
    editProfile: builder.mutation({
      query: (body) => ({
        url: "uuser/instructor/profile/update",
        method: "PUT",
        body: body,
        // credentials: 'include',
      }),
    }),
    facebookLoginInstructor: builder.mutation({
      query: (body) => ({
        url: "auth/signinfacebook/instructor",
        method: "POST",
        body: body,
        // credentials: 'include',
      }),
    }),

    googleLoginInstructor: builder.mutation({
      query: (body) => ({
        url: "auth/signingoogle/instructor",
        method: "POST",
        body: body,
        // credentials: 'include',
      }),
    }),
    linkedinLoginInstructor: builder.mutation({
      query: (body) => ({
        url: "auth/signinlinkedin/instructor",
        method: "POST",
        body: body,
        // credentials: 'include',
      }),
    }),
    getInstructorStatistics: builder.mutation({
      query: (body) => ({
        url: "uuser/instructor/dashboard/topcount",
        method: "GET",
        body: body,
        // credentials: 'include',
      }),
    }),
    getAccountInfo: builder.mutation({
      query: (body) => ({
        url: "uuser/instructor/dashboard/balancesheet",
        method: "GET",
        body: body,
        // credentials: 'include',
      }),
    }),
    getAllStatus: builder.mutation({
      query: (body) => ({
        url: "uuser/instructor/dashboard/stats",
        method: "GET",
        body: body,
        // credentials: 'include',
      }),
    }),
    getMyProfile: builder.mutation({
      query: (body) => ({
        url: "uuser/instructor/profile",
        method: "GET",
        body: body,
        // credentials: 'include',
      }),
    }),
    updateNotification: builder.mutation({
      query: (body) => ({
        url: "uuser/instructor/notification/update",
        method: "PUT",
        body: body,
        // credentials: 'include',
      }),
    }),
    addCertificate: builder.mutation({
      query: (body) => ({
        url: "uuser/instructor/certificate",
        method: "POST",
        body: body,
        // credentials: 'include',
      }),
    }),
    updateCertificate: builder.mutation({
      query: (body) => ({
        url: `uuser/instructor/certificate/${body.id}/`,
        method: "PUT",
        body: body,
        // credentials: 'include',
      }),
    }),
    changeNotification: builder.mutation({
      query: (body) => ({
        url: `uuser/instructor/notification/update`,
        method: "PUT",
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
    checkPasswordFordisable: builder.mutation({
      query: (body) => ({
        url: `uuser/profile/disable`,
        method: "POST",
        body: body,
        // credentials: 'include',
      }),
    }),
    usernameChange: builder.mutation({
      query: (body) => ({
        url: `uuser/update/username`,
        method: "PUT",
        body: body,
        // credentials: 'include',
      }),
    }),
    emailChange: builder.mutation({
      query: (body) => ({
        url: `auth/update/useremail`,
        method: "PUT",
        body: body,
        // credentials: 'include',
      }),
    }),
    getSpecialization: builder.mutation({
      query: (body) => ({
        url: `common/specializations`,
        method: "GET",
        body: body,
        // credentials: 'include',
      }),
    }),
    editCv: builder.mutation({
      query: (body) => ({
        url: `uuser/instructor/cv/update`,
        method: "PUT",
        body: body,
        // credentials: 'include',
      }),
    }),
    getCountry: builder.mutation({
      query: (body) => ({
        url: `common/country`,
        method: "GET",
        body: body,
        // credentials: 'include',
      }),
    }),
    getTimeZone: builder.mutation({
      query: (body) => ({
        url: `common/timezone`,
        method: "GET",
        body: body,
        // credentials: 'include',
      }),
    }),
  }),
});

export const {
  useSignupMutation,
  useCvformMutation,
  useCvdeleteMutation,
  useGovtidformMutation,
  useSummaryformMutation,
  useLoginInstructorMutation,
  useForgotPaswwordInstructorMutation,
  useOtpVerifyInstructorMutation,
  useResendOtpVerifyInstructorMutation,
  useResetPasswordInstructorMutation,
  useChangePasswordInstructorMutation,
  useOtpVerifyPasswordMutation,
  useMeInstructorMutation,
  useGetCvFormMutation,
  useEditProfileMutation,
  useFacebookLoginInstructorMutation,
  useGoogleLoginInstructorMutation,
  useLinkedinLoginInstructorMutation,
  useGetInstructorStatisticsMutation,
  useGetAccountInfoMutation,
  useGetAllStatusMutation,
  useGetMyProfileMutation,
  useUpdateNotificationMutation,
  useAddCertificateMutation,
  useUpdateCertificateMutation,
  useChangeNotificationMutation,
  useDisableAccountMutation,
  useCheckPasswordFordisableMutation,
  useUsernameChangeMutation,
  useGetSpecializationMutation,
  useEditCvMutation,
  useGetCountryMutation,
  useGetTimeZoneMutation,
  useEmailChangeMutation,
} = authApi;
