import { createElement } from "react";
import { Navigate } from "react-router-dom";

import InstructorWithoutAuth from "../layout/instructor/layout";
import InstructorWithAuth from "../layout/instructor/layout-auth";

const InstructorRoutes = [
  {
    path: "instructor/",
    element: createElement(InstructorWithoutAuth),
    children: [
      {
        index: true,
        element: createElement(Navigate, { to: "login" }),
      },
      {
        path: "signup",
        lazy: () => import("../pages/instructor/signup"),
      },
      {
        path: "signup-step-two",
        lazy: () => import("../pages/instructor/signup/steptwo"),
      },
      {
        path: "signup-step-three",
        lazy: () => import("../pages/instructor/signup/stepthree"),
      },
      {
        path: "signup-step-four",
        lazy: () => import("../pages/instructor/signup/stepfour"),
      },
      {
        path: "signup-success",
        lazy: () => import("../pages/instructor/signup/signupSuccess"),
      },
      {
        path: "login",
        lazy: () => import("../pages/instructor/login"),
      },
      {
        path: "forgot-password",
        lazy: () => import("../pages/instructor/forgot-password"),
      },
      {
        path: "reset-password",
        lazy: () => import("../pages/instructor/reset-password"),
      },
      {
        path: "otp-verify",
        lazy: () => import("../pages/instructor/otp-verify"),
      },
      {
        path: "reset-password-success",
        lazy: () => import("../pages/instructor/reset-password-success"),
      },
    ],
  },
  {
    path: "instructor/",
    element: createElement(InstructorWithAuth),
    children: [
      {
        index: true,
        element: createElement(Navigate, { to: "dashboard" }),
      },
      {
        path: "dashboard",
        lazy: () => import("../pages/instructor/dashboard"),
      },
      {
        path: "profile",
        lazy: () => import("../pages/instructor/my-profile"),
      },
      {
        path: "profile/edit-profile",
        lazy: () => import("../pages/instructor/edit-profile"),
      },
      {
        path: "profile/payment-setting",
        lazy: () => import("../pages/instructor/payment-setting"),
      },
      {
        path: "course",
        lazy: () => import("../pages/instructor/course"),
      },
      {
        path: "course/new-course",
        lazy: () => import("../pages/instructor/new-course"),
      },
      {
        path: "course/edit-course/:courseUniqueId",
        lazy: () => import("../pages/instructor/edit-course"),
      },
      {
        path: "course/course-details/:courseId",
        lazy: () => import("../pages/instructor/course-details"),
      },
      {
        path: "course/guide",
        lazy: () => import("../pages/instructor/guides"),
      },
      {
        path: "notifiaction",
        lazy: () => import("../pages/instructor/notification"),
      },
      {
        path: "student-list",
        lazy: () => import("../pages/instructor/student-list"),
      },
      {
        path: "teacher-handbook",
        lazy: () => import("../pages/instructor/teacher-handbook"),
      },
    ],
  },
];

export default InstructorRoutes;
