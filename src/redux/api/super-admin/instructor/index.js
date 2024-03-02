import { apiSlice } from "../../configure";

export const authApi = apiSlice.injectEndpoints({
  // overrideExisting: true,
  endpoints: (builder) => ({
    instructorList: builder.mutation({
      query: (body) => ({
        url: `uuser/instructors?page=${body.page}&limit=${body.limit}`,
        method: "GET",
        // body: body,
        // credentials: 'include',
      }),
    }),

    instructorDetails: builder.mutation({
      query: (body) => ({
        url: `uuser/instructors/details/${body.id}`,
        method: "GET",
        // body: body,
        // credentials: 'include',
      }),
    }),

    instructorApproved: builder.mutation({
      query: (body) => ({
        url: `uuser/instructors/approve`,
        method: "PATCH",
        body: body,
        // credentials: 'include',
      }),
    }),
  }),
});

export const {
  useInstructorListMutation,
  useInstructorDetailsMutation,
  useInstructorApprovedMutation,
} = authApi;
