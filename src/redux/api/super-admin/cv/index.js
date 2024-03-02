import { apiSlice } from "../../configure";

export const authApi = apiSlice.injectEndpoints({
  // overrideExisting: true,
  endpoints: (builder) => ({
    cvList: builder.mutation({
      query: (body) => ({
        url: `uuser/instructor/cv?page=${body.page}&limit=${body.limit}&status=${body.status}&fromDate=&toDate=&searchBy=${body.searchBy}`,
        method: "GET",
        // body: body,
        // credentials: 'include',
      }),
    }),
    changeCurrentStatus: builder.mutation({
      query: (body) => ({
        url: `uuser/instructor/cv/action`,
        method: "PUT",
        body: body,
        // credentials: 'include',
      }),
    }),
  }),
});

export const { useCvListMutation, useChangeCurrentStatusMutation } = authApi;
