import { apiSlice } from "../configure";

export const authApi = apiSlice.injectEndpoints({
  // overrideExisting: true,
  endpoints: (builder) => ({
    getAllCourse: builder.mutation({
      query: (body) => ({
        url: `course/all?page=${body.page}&limit=${body.limit}&status=${body.status}&dateFrom=&dateTo&searchBy=${body.searchkey}`,
        method: "GET",
        // body: body,
        // credentials: 'include',
      }),
    }),
    getSingleCourse: builder.mutation({
      query: (body) => ({
        url: `course/all/${body.courseId}`,
        method: "GET",
        // body: body,
        // credentials: 'include',
      }),
    }),
    statusChangeAdmin: builder.mutation({
      query: (body) => ({
        url: `course/all/action`,
        method: "PATCH",
        body: body,
        // credentials: 'include',
      }),
    }),
  }),
});

export const {
  useGetAllCourseMutation,
  useGetSingleCourseMutation,
  useStatusChangeAdminMutation,
} = authApi;
