import {
  Link,
  createBrowserRouter,
  RouterProvider,
  // Navigate,
} from "react-router-dom";

import SplashScreen from "@/components/common/splash-screen";
import Mainlayout from "../layout/main/layout";
import SuperAdminRoutes from "./superAdmin";
import StudentRoutes from "./student";
import InstructorRoutes from "./instructor";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Mainlayout />,

    children: [
      // {
      //   index: true,
      //   element: <Navigate to={"/"} />,
      // },
      {
        index: true,
        path: "/",
        lazy: () => import("../pages/main/home"),
      },
      {
        path: "privacy-policy",
        // element: <Mainlayout />,
        lazy: () => import("../pages/main/privacy"),
      },
      {
        path: "terms-condition",
        // element: <Mainlayout />,
        lazy: () => import("../pages/main/terms"),
      },

      {
        path: "instructors",
        lazy: () => import("../pages/main/instructor"),
      },
      {
        path: "blog",
        lazy: () => import("../pages/main/blog"),
      },
      {
        path: "about",
        lazy: () => import("../pages/main/about"),
      },
      {
        path: "price",
        lazy: () => import("../pages/main/price"),
      },
      {
        path: "categories",
        lazy: () => import("../pages/main/categories"),
      },
      {
        path: "categories/:category",
        lazy: () => import("../pages/main/categories"),
      },
      {
        path: "course/:id",
        lazy: () => import("../pages/main/categories/details"),
      },
      {
        path: "login",
        lazy: () => import("../pages/main/login"),
      },
      {
        path: "signup",
        lazy: () => import("../pages/main/signup"),
      },
    ],
  },

  {
    path: "verification",
    lazy: () => import("../pages/verification"),
  },
  {
    path: "changeemail",
    lazy: () => import("../pages/verification/emailVerification"),
  },
  {
    path: "coming-soon",
    lazy: () => import("../pages/main/ComingSoon"),
  },
  ...SuperAdminRoutes,
  ...StudentRoutes,
  ...InstructorRoutes,
  {
    path: "*",
    element: <NoMatch />,
  },
]);

export default function Routes() {
  return <RouterProvider router={router} fallbackElement={<SplashScreen />} />;
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>{/* <Link to="/">Go to the home page</Link> */}</p>
    </div>
  );
}
