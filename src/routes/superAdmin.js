import { createElement } from "react";
import { Navigate } from "react-router-dom";

import SuperAdminWithoutAuth from "../layout/super-admin/layout";
import SuperAdminWithAuth from "../layout/super-admin/layout-auth";

const SuperAdminRoutes = [
  {
    path: "super-admin/",
    element: createElement(SuperAdminWithoutAuth),
    children: [
      {
        index: true,
        element: createElement(Navigate, { to: "login" }),
      },
      {
        path: "login",
        lazy: () => import("../pages/super-admin/login"),
      },
      {
        path: "forgot-password",
        lazy: () => import("../pages/super-admin/forgot-password"),
      },
      {
        path: "reset-password",
        lazy: () => import("../pages/super-admin/reset-password"),
      },
      {
        path: "otp-verify",
        lazy: () => import("../pages/super-admin/otp-verify"),
      },
    ],
  },
  {
    path: "super-admin/",
    element: createElement(SuperAdminWithAuth),
    children: [
      {
        index: true,
        element: createElement(Navigate, { to: "dashboard" }),
      },
      {
        path: "dashboard",
        lazy: () => import("../pages/super-admin/dashboard"),
      },
      {
        path: "instructor",
        lazy: () => import("../pages/super-admin/instructor"),
      },
      {
        path: "instructor/:user",
        lazy: () => import("../pages/super-admin/instructor/details"),
      },
      {
        path: "student",
        lazy: () => import("../pages/super-admin/student"),
      },
      {
        path: "courses",
        lazy: () => import("../pages/super-admin/courses"),
      },
      {
        path: "courses-details/:courseId",
        lazy: () => import("../pages/super-admin/courses/details"),
      },
      {
        path: "certificates",
        lazy: () => import("../pages/super-admin/certificate"),
      },
      {
        path: "cv",
        lazy: () => import("../pages/super-admin/cvfile"),
      },
    ],
  },
];

export default SuperAdminRoutes;
