import { apiSlice } from "../configure";

export const authApi = apiSlice.injectEndpoints({
  // overrideExisting: true,
  endpoints: (builder) => ({
    getLearning: builder.mutation({
      query: (body) => ({
        url: "course/topic",
        method: "GET",
        body: body,
        // credentials: 'include',
      }),
    }),
    learningUpdate: builder.mutation({
      query: (body) => ({
        url: "course/topic",
        method: "PUT",
        body: body,
        // credentials: 'include',
      }),
    }),

    getMyTopic: builder.mutation({
      query: (body) => ({
        url: "course/topic/my",
        method: "GET",
        body: body,
        // credentials: 'include',
      }),
    }),

    getPopularCoaches: builder.mutation({
      query: (body) => ({
        url: "course/top/instructor",
        method: "GET",
        body: body,
        // credentials: 'include',
      }),
    }),

    getRecommendation: builder.mutation({
      query: (body) => ({
        url: "course/recommended",
        method: "GET",
        body: body,
        // credentials: 'include',
      }),
    }),
    getonGoingCourse: builder.mutation({
      query: (body) => ({
        url: "course/ongoing",
        method: "GET",
        body: body,
        // credentials: 'include',
      }),
    }),
    getCompleteCourse: builder.mutation({
      query: (body) => ({
        url: "course/completed",
        method: "GET",
        body: body,
        // credentials: 'include',
      }),
    }),
    getSearchCourse: builder.mutation({
      query: (body) => ({
        url: `course/search?page=${body.page}&limit=${body.pagelimit}&speciallization=${body.specialization}&priceRange[min]=&priceRange[max]=&duration[min]=&duration[max]=&searchBy=${body.searchkey}&skillLevel=${body.skillLable}&sort=${body.shortBy}`,
        method: "GET",
        // body: body,
        // credentials: 'include',
      }),
    }),
  }),
});

export const {
  useGetLearningMutation,
  useLearningUpdateMutation,
  useGetMyTopicMutation,
  useGetPopularCoachesMutation,
  useGetRecommendationMutation,
  useGetonGoingCourseMutation,
  useGetCompleteCourseMutation,
  useGetSearchCourseMutation,
} = authApi;
