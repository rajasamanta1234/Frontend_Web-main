/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ScrollRestoration } from "react-router-dom";
import { ZodError } from "zod";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/super-admin/sidebar-with-auth";
import Navbar from "../../components/super-admin/navbar-with-auth";

import { useMeAdminMutation } from "../../redux/api/super-admin/auth";
import { setAuthUserState } from "../../redux/slice/superAdmin/user";
import Spashscreen from "../../components/common/splash-screen";
import { AuthGuard } from "../../guards/super-admin/auth-guard";

const Layout = () => {
  // const navigate = useNavigate();
  const router = useNavigate();
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);
  const [drawershow, setDrawershow] = useState("");
  const { isAuthenticated } = useSelector((state) => state.superAdminUser);
  const [getMe, { isSuccess, data, isLoading }] = useMeAdminMutation();

  const getData = async () => {
    try {
      const res = await getMe().unwrap();

      if (res.data.role === "ADMIN") {
        dispatch(
          setAuthUserState({
            isAuthenticated: "authenticated",
            isInitialized: true,
            user: res?.data,
          })
        );
      } else {
        router("/super-admin/login");
      }
    } catch (error) {
      router("/super-admin/login");
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
      <ScrollRestoration />
      <section className="mainLayout">
      <div className={`customOverlay ${drawershow}`}></div>
        <div className="dashboardMain">
          <Sidebar
            drawershow={drawershow}
            handleShow={() => setDrawershow("")}
          />
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
        </div>
      </section>
    </AuthGuard>
  );
};

export default Layout;
