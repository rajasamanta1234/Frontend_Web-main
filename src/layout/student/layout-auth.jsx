import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/student/sidebar-with-auth";
import Navbar from "../../components/student/navbar-with-auth";
import { Link, useLocation } from "react-router-dom";

import { useMeStudentMutation } from "../../redux/api/student/auth";
import { setAuthUserState } from "../../redux/slice/student/user";
import { AuthGuard } from "../../guards/student/auth-guard";

const Layout = () => {
  const router = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const [checked, setChecked] = useState(false);
  const [drawershow, setDrawershow] = useState("");
  const { isAuthenticated } = useSelector((state) => state.studetnUser);
  // eslint-disable-next-line no-unused-vars
  const [getMe, { isSuccess, data, isLoading }] = useMeStudentMutation();

  const getData = async () => {
    try {
      const res = await getMe().unwrap();
      if (res.data.role === "STUDENT") {
        if (res?.data?.isTopicsAdded && res?.data?.isTopicsAdded) {
          dispatch(
            setAuthUserState({
              isAuthenticated: "authenticated",
              isInitialized: true,
              user: res?.data,
            })
          );
        } else {
          dispatch(
            setAuthUserState({
              isAuthenticated: "authenticated",
              isInitialized: true,
              user: res?.data,
            })
          );
          router("/student/dashboard-first");
        }
      } else {
        router("/student/login");
      }
    } catch (error) {
      router("/student/login");
      console.log(error);
    }
  };
  useEffect(() => {
    // getData();
  }, [isAuthenticated]);
  useEffect(() => {
    // if (isAuthenticated === "disconnected") {
    //   // router("/super-admin/login");
    //   getData();
    //   // getMe();
    // } else {
    //   setChecked(true);
    // }

    getData();
  }, [isAuthenticated]);

  // const [loading, setloading] = useState(false)
  //   useEffect(() => {

  //   }, [isLoading])

  // if (isLoading) {
  //   return <Spashscreen />;
  // }

  // if (!checked) {
  //   return null;
  // }
  return (
    <AuthGuard>
      <section className="mainLayout">
        <div className={`customOverlay ${drawershow}`}></div>
        <div className={
            location.pathname !== "/student/dashboard-first"
              ? "dashboardMain"
              : ""
          }>
          {location.pathname !== "/student/dashboard-first" && (
            <Sidebar
              drawershow={drawershow}
              handleShow={() => setDrawershow("")}
            />
          )}
          {location.pathname !== "/student/dashboard-first" ? (
            <div className="dashboardArea">
              <Navbar
                handleShow={() => {
                  if (drawershow == "") {
                    setDrawershow("show");
                  } else {
                    setDrawershow("");
                  }
                }}
              />

              <Outlet />
            </div>
          ) : (
            <Outlet />
          )}
        </div>
      </section>
    </AuthGuard>
  );
};

export default Layout;
