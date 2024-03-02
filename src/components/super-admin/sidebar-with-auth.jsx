import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { logout } from "@/redux/slice/superAdmin/user";

import {
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
import infowhiteIcon from "@/assets/images/info-white.svg";
import CloseIcon from "@mui/icons-material/Close";
import closeIcon from "../../assets/images/close.svg";

export const items = [
  {
    title: "Dashboard",
    path: "/super-admin/dashboard",
    icon: menuIconOne,
  },
  {
    title: "Message",
    path: "#",
    icon: menuIconTwo,
  },
  {
    title: "Courses",
    path: "/super-admin/courses",
    icon: menuIconThree,
  },
  {
    title: "Certificates",
    path: "/super-admin/certificates",
    icon: menuIconThree,
  },
  {
    title: "CV",
    path: "/super-admin/cv",
    icon: menuIconThree,
  },
  {
    title: "Students",
    path: "/super-admin/student",
    icon: menuIconFour,
  },
  {
    title: "Instructors",
    path: "/super-admin/instructor",
    icon: menuIconFour,
  },
  {
    title: "Ambassadors",
    path: "#",
    icon: menuIconFour,
  },
  {
    title: "Reviews",
    path: "#",
    icon: menuIconFive,
  },
  {
    title: "My Accounts",
    path: "#",
    icon: menuIconFour,
  },
];

const Sidebar = ({ drawershow, handleShow }) => {
  const location = useLocation();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
                <Link to={e.path} onClick={() => handleShow()}>
                  <img src={e.icon} alt="" /> {e.title}
                </Link>
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
        <ul className="bottomUl">
          <li>
            <button
              onClick={() => {
                handleClickOpen();
              }}
            >
              <img src={menuIconSix} alt="" /> Logout
            </button>
          </li>
        </ul>
      </div>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        className="logoutModal"
      >
        <DialogTitle>
          <Button onClick={handleClose}>
            <CloseIcon />
          </Button>
        </DialogTitle>
        <DialogContent>
          <div className="imgBlock">
            <img src={infowhiteIcon} />
          </div>
          <div className="contentBlock">
            <p className="subTextTwo">Are you sure you want to logout?</p>
          </div>
        </DialogContent>
        <DialogActions>
          <button
            className="redBtn fullWidth"
            onClick={() => {
              dispatch(logout()), handleClose();
            }}
          >
            Yes
          </button>
          <button className="greyBtn fullWidth" onClick={handleClose}>
            Cancel
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Sidebar;
