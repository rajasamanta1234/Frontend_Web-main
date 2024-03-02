import { apiSlice } from "../configure";

export const coursesApi = apiSlice.injectEndpoints({
  // overrideExisting: true,
  endpoints: (builder) => ({
    addCourse: builder.mutation({
      query: (body) => ({
        url: "course",
        method: "POST",
        body: body,
      }),
    }),

    coursesList: builder.mutation({
      query: (body) => ({
        url: `course/my?page=${body?.page}&limit=${body?.limit ?? 10}&sortField=&sortBy=${body?.sortBy}&searchBy=&timeSort`,

        method: "GET",
      }),
    }),

    courseDetails: builder.mutation({
      query: (body) => ({
        url: `course/my/${body.courseId}`,
        method: "GET",
      }),
    }),

    updateCourse: builder.mutation({
      query: (body) => ({
        url: `course/${body.courseUniqueId}`,
        method: "PUT",
        body: body,
      }),
    }),

    getTopic: builder.mutation({
      query: (body) => ({
        url: "course/topic",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useAddCourseMutation,
  useCoursesListMutation,
  useCourseDetailsMutation,
  useUpdateCourseMutation,
  useGetTopicMutation,
} = coursesApi;
