import { createElement } from "react";
import { Navigate } from "react-router-dom";

import StudentWithoutAuth from "../layout/student/layout";
import StudentWithAuth from "../layout/student/layout-auth";

const StudentRoutes = [
  {
    path: "student/",
    element: createElement(StudentWithoutAuth),
    children: [
      {
        index: true,
        element: createElement(Navigate, { to: "login" }),
      },

      {
        path: "login",
        lazy: () => import("../pages/student/login"),
      },
      {
        path: "forgot-password",
        lazy: () => import("../pages/student/forgot-password"),
      },
      {
        path: "reset-password",
        lazy: () => import("../pages/student/reset-password"),
      },
      {
        path: "otp-verify",
        lazy: () => import("../pages/student/otp-verify"),
      },
      {
        path: "reset-password-success",
        lazy: () => import("../pages/student/reset-password-success"),
      },
      {
        path: "signup",
        lazy: () => import("../pages/student/signup"),
      },
    ],
  },
  {
    path: "student/",
    element: createElement(StudentWithAuth),
    children: [
      {
        index: true,
        element: createElement(Navigate, { to: "dashboard" }),
      },
      {
        path: "dashboard",
        lazy: () => import("../pages/student/dashboard"),
      },
      {
        path: "profile",
        lazy: () => import("../pages/student/profile"),
      },
      {
        path: "edit-profile",
        lazy: () => import("../pages/student/edit-profile"),
      },
      {
        path: "dashboard-first",
        lazy: () => import("../pages/student/dashboard-first-page"),
      },
      {
        path: "edit-setting",
        lazy: () => import("../pages/student/setting"),
      },
      {
        path: "notification-setting",
        lazy: () => import("../pages/student/notification-setting"),
      },
      {
        path: "plan",
        lazy: () => import("../pages/student/plan"),
      },
      {
        path: "helpdesk",
        lazy: () => import("../pages/student/helpdesk"),
      },
      {
        path: "linked-accounts",
        lazy: () => import("../pages/student/linked-accounts"),
      },
      {
        path: "my-course",
        lazy: () => import("../pages/student/my-course"),
      },
      {
        path: "search-course",
        lazy: () => import("../pages/student/search-page"),
      },
    ],
  },
];

export default StudentRoutes;
