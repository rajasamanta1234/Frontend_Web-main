import { Outlet } from "react-router-dom";
import Navbar from "../../components/instructor/navbar-without-auth";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default Layout;
