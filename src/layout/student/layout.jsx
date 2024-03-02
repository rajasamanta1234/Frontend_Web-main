import { Outlet } from "react-router-dom";
import Navbar from "../../components/student/navbar-without-auth";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default Layout;
