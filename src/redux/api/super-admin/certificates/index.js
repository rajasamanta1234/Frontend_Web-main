import { apiSlice } from "../../configure";

export const authApi = apiSlice.injectEndpoints({
  // overrideExisting: true,
  endpoints: (builder) => ({
    certificateList: builder.mutation({
      query: (body) => ({
        url: `certificates/instructor/filter?page=${body.page}&limit=${body.limit}&status=${body.status}&fromDate=&toDate=&searchBy=${body.searchBy}`,
        method: "GET",
        // body: body,
        // credentials: 'include',
      }),
    }),
    changeCurrentStatus: builder.mutation({
      query: (body) => ({
        url: `certificates/instructor/status`,
        method: "PATCH",
        body: body,
        // credentials: 'include',
      }),
    }),
  }),
});

export const { useCertificateListMutation, useChangeCurrentStatusMutation } =
  authApi;
