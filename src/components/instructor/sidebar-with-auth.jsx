import React, { useState, Fragment } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { logout } from "@/redux/slice/instructor/user";

import { Button, Box, Slide } from "@mui/material";

import Logo from "@/assets/images/logo.svg";
import menuIconOne from "@/assets/images/superadmin-dashboard-icon/icon-1.svg";
import menuIconTwo from "@/assets/images/superadmin-dashboard-icon/icon-2.svg";
import menuIconThree from "@/assets/images/superadmin-dashboard-icon/icon-3.svg";
import menuIconFour from "@/assets/images/superadmin-dashboard-icon/icon-4.svg";
import menuIconFive from "@/assets/images/superadmin-dashboard-icon/icon-5.svg";
import scheduleIcon from "@/assets/images/scheduleIcon.svg";
import statusIcon from "@/assets/images/status.svg";
import shldtickIcon from "@/assets/images/shld-tick.svg";
import closeIcon from "../../assets/images/close.svg";

export const items = [
  {
    title: "Dashboard",
    path: "/instructor/dashboard",
    icon: menuIconOne,
    pro: false,
    show: true,
  },
  {
    title: "My Schedule",
    path: "#",
    icon: scheduleIcon,
    pro: false,
    show: true,
  },
  {
    title: "Message",
    path: "#",
    icon: menuIconTwo,
    pro: false,
    show: true,
  },
  {
    title: "Courses",
    path: "/instructor/course",
    icon: menuIconThree,
    pro: false,
    show: true,
  },
  {
    title: "My Status",
    path: "#",
    icon: statusIcon,
    pro: true,
    show: true,
  },
  {
    title: "Reviews",
    path: "#",
    icon: menuIconFive,
    pro: true,
    show: true,
  },
  {
    title: "My Accounts",
    path: "/instructor/profile",
    icon: menuIconFour,
    pro: false,
    show: true,
  },
  {
    title: "Edit Profile",
    path: "/instructor/profile/edit",
    icon: menuIconFour,
    pro: false,
    show: false,
  },
];

const Sidebar = ({ drawershow, handleShow }) => {
  const location = useLocation();

  return (
    <div className={`sideNav ${drawershow}`}>
      <Button onClick={() => handleShow()}>
        <img src={closeIcon} alt="" />
      </Button>
      <div className="logoBlock">
        <Link to="#">
          <img src={Logo} alt="logo" /> LIGHTFORTH
        </Link>
      </div>
      <div className="navBar">
        <ul>
          {items?.map((e, index) => {
            // const [{ route }] = matchRoutes(routesList, location);
            const isActive = location.pathname.startsWith(e.path);

            return (
              <Fragment key={index}>
                {e?.show && (
                  <li className={isActive ? "active" : ""}>
                    <Link to={e.path} onClick={() => handleShow()}>
                      <img src={e.icon} alt="" /> {e.title}
                      {e.pro && <span>PRO</span>}
                    </Link>
                  </li>
                )}
              </Fragment>
            );
          })}
          {/* <li className="active">
            <Link to="#">
              <img src={menuIconOne} alt="" /> Dashboard
            </Link>
          </li>
          <li>
            <Link to="#">
              <img src={menuIconTwo} alt="" /> Message
            </Link>
          </li>
          <li>
            <Link to="#">
              <img src={menuIconThree} alt="" /> Courses
            </Link>
          </li>
          <li>
            <Link to="#">
              <img src={menuIconFour} alt="" /> Students
            </Link>
          </li>
          <li>
            <Link to="/super-admin/instructor">
              <img src={menuIconFour} alt="" /> Instructors
            </Link>
          </li>
          <li>
            <Link to="#">
              <img src={menuIconFour} alt="" /> Ambassadors
            </Link>
          </li>
          <li>
            <Link to="#">
              <img src={menuIconFive} alt="" /> Reviews
            </Link>
          </li>
          <li>
            <Link to="#">
              <img src={menuIconFour} alt="" /> My Accounts
            </Link>
          </li> */}
        </ul>
        <div className="bottomUl">
          <Box className="upgradeBox">
            <div className="imgBlock">
              <div>
                <img src={shldtickIcon} />
              </div>
            </div>
            <p className="subTextTwo textCenter">Get the Pro Plan.</p>
            <Link to="#" className="lightBtn fullWidth">
              Upgrade Now
            </Link>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
