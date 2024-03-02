import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ZodError } from "zod";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/instructor/sidebar-with-auth";
import Navbar from "../../components/instructor/navbar-with-auth";

import { useMeInstructorMutation } from "../../redux/api/instructor/auth";
import { setAuthUserState } from "../../redux/slice/instructor/user";
import { AuthGuard } from "../../guards/instructor/auth-guard";

const Layout = () => {
  const router = useNavigate();
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);
  const [drawershow, setDrawershow] = useState("");

  const { isAuthenticated } = useSelector((state) => state.instructorUser);
  // eslint-disable-next-line no-unused-vars
  const [getMe, { isSuccess, data, isLoading }] = useMeInstructorMutation();

  const getData = async () => {
    try {
      const res = await getMe().unwrap();
      console.log(res, "res");
      if (res.data.role === "INSTRUCTOR") {
        dispatch(
          setAuthUserState({
            isAuthenticated: "authenticated",
            isInitialized: true,
            user: res?.data,
          })
        );
      } else {
        router("/instructor/login");
      }
    } catch (error) {
      router("/instructor/login");
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
