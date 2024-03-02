import { combineReducers } from "@reduxjs/toolkit";

import instructorUser from "../slice/instructor/user";
import studetnUser from "../slice/student/user";
import superAdminUser from "../slice/superAdmin/user";
import { apiSlice } from "../api/configure";

export const rootReducer = combineReducers({
  // auth: authReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
  instructorUser: instructorUser,
  studetnUser: studetnUser,
  superAdminUser: superAdminUser,
  // chat: chatReducer,
  // kanban: kanbanReducer,
  // mail: mailReducer
});
