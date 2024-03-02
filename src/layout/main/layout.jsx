import { Outlet } from "react-router-dom";
import Navbar from "../../components/main/navbar";
import Footer from "../../components/main/footer";
import { ScrollRestoration } from "react-router-dom";
const Layout = () => {
  return (
    <>
      <ScrollRestoration />
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
