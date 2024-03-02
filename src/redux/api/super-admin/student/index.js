import { apiSlice } from "../../configure";

export const authApi = apiSlice.injectEndpoints({
  // overrideExisting: true,
  endpoints: (builder) => ({
    studentList: builder.mutation({
      query: (body) => ({
        url: `uuser/students?page=${body.page}&limit=${body.limit}`,
        method: "GET",
        // body: body,
        // credentials: 'include',
      }),
    }),
  }),
});

export const { useStudentListMutation } = authApi;
