import {
  // BaseQueryApi,
  // BaseQueryFn,
  createApi,
  // FetchArgs,
  fetchBaseQuery,
  // FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
// import { logout } from "../features-slice/user-slice";

// interface RefreshProps {
//   data: {
//     data: {
//       accessToken: string;
//       refreshToken: string;
//     };
//   };
// }

const baseQuery = fetchBaseQuery({
  // TODO: move to dev and prod env localhost for dev and prod url for prod
  baseUrl: `${import.meta.env.VITE_API_URL}`,
  /* @ts-ignore */
  // import.meta.env.MODE === 'production'
  // 	? /* @ts-ignore */
  // 	  `${import.meta.env.VITE_API_URL_PROD}`
  // 	: /* @ts-ignore */
  // 	  `${import.meta.env.VITE_API_URL_DEV}`,
  // credentials: 'include',
  // credentials: "include",
  // baseUrl: "https://jsonplaceholder.typicode.com/",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");
    // const statictoken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmdWxsTmFtZSI6IlRlc3QgaW5zdHJ1Y3RvciIsInVzZXJVbmlxdWVJZCI6IjA2YmFmOWZjLWFhMjAtNDkzNS05OTM2LTkwODI4MDZiMDIzMiIsImVtYWlsIjoiZHVtbXlpbnN0cnVjdG9yMjJAeW9wbWFpbC5jb20iLCJyb2xlIjoiSU5TVFJVQ1RPUiIsImlhdCI6MTcwNDk2OTg4NCwiZXhwIjoxNzA1MDU2Mjg0fQ.G2_u4P8gpJFIlsYDANUezuIoK-TkOGnzYNTMMt0W7n4"
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    // headers.set("Access-Control-Allow-Origin", "*");
    // headers.set("mode", "cors");
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    // try to get a new token
    const refreshResult = await baseQuery("/refreshToken", api, extraOptions);
    if (refreshResult.data) {
      // store the new token
      // api.dispatch(tokenReceived(refreshResult.data))
      // retry the initial query
      result = await baseQuery(args, api, extraOptions);
    } else {
      localStorage.removeItem("token");
      // api.dispatch(logout());
    }
  }
  return result;
};

// export const apiSlice = createApi({
//   baseQuery: baseQueryWithReauth,

//   endpoints: () => ({}),
// });

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  // tagTypes: ["DriverList"],
  endpoints: () => ({}),
});

baseQueryWithReauth;
