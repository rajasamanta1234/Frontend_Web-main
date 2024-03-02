import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  // DialogContentText,
  DialogTitle,
  Slide,
} from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

import Logo from "@/assets/images/logo.svg";
import menuIconOne from "@/assets/images/superadmin-dashboard-icon/icon-1.svg";
import menuIconTwo from "@/assets/images/superadmin-dashboard-icon/icon-2.svg";
import menuIconThree from "@/assets/images/superadmin-dashboard-icon/icon-3.svg";
import menuIconFour from "@/assets/images/superadmin-dashboard-icon/icon-4.svg";
import menuIconFive from "@/assets/images/superadmin-dashboard-icon/icon-5.svg";
import menuIconSix from "@/assets/images/superadmin-dashboard-icon/icon-6.svg";
import dasLightIcon from "@/assets/images/dash-light.svg";
import bookIcon from "@/assets/images/book.svg";
import sparklesIcon from "@/assets/images/sparkles.svg";
import useroctagonIcon from "@/assets/images/user-octagon.svg";
import messageIcon from "@/assets/images/message.svg";
import settingIcon from "@/assets/images/setting-4.svg";
import infowhiteIcon from "@/assets/images/info-white.svg";
import closeIcon from "../../assets/images/close.svg";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export const items = [
  {
    title: "Home",
    path: "/student/dashboard",
    icon: dasLightIcon,
  },
  {
    title: "Courses",
    path: "#",
    icon: bookIcon,
    dropdown: true,
    subitems: ["Test 1", "Test 2", "Test 3"],
  },
  {
    title: "AI Companion",
    path: "#",
    icon: sparklesIcon,
    dropdown: true,
    subitems: ["Test 1", "Test 2", "Test 3"],
  },
  {
    title: "Mentors",
    path: "#",
    icon: useroctagonIcon,
  },
  {
    title: "Message",
    path: "#",
    icon: messageIcon,
  },
  {
    title: "Account",
    path: "/student/profile",
    icon: settingIcon,
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
              <li className={isActive ? "active" : ""} key={index}>
                {e.dropdown ? (
                  <Accordion elevation={0}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1-content"
                      id="panel1-header"
                    >
                      <img src={e.icon} alt="" /> {e?.title}
                    </AccordionSummary>
                    <AccordionDetails>
                      <ul>
                        {e.subitems?.map((items, index) => {
                          return (
                            <li key={indexedDB} onClick={() => handleShow()}>
                              <Link to="#">{items}</Link>
                            </li>
                          );
                        })}
                      </ul>
                    </AccordionDetails>
                  </Accordion>
                ) : (
                  <Link to={e.path} onClick={() => handleShow()}>
                    <img src={e.icon} alt="" /> {e.title}
                  </Link>
                )}
              </li>
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
        {/* <ul className="bottomUl">
          <li>
            <button
              onClick={() => {
                handleClickOpen();
              }}
            >
              <img src={menuIconSix} alt="" /> Logout
            </button>
          </li>
        </ul> */}
        <div className="upgradePro">
          <h4>
            Upgrade to <span className="color-primary">Pro</span>
          </h4>
          <p className="subTextTwo">Get 1 Month Free!</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
