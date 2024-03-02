import {
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";

import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import PersonIcon from "@mui/icons-material/Person";
import menuIconTwo from "@/assets/images/superadmin-dashboard-icon/icon-2.svg";
import menuIconSaven from "@/assets/images/superadmin-dashboard-icon/icon-7.svg";
import mobileBarIcon from "../../assets/images/mobileBar.svg";
import backIcon from "../../assets/images/ep-back.svg";
import { useState } from "react";

export const items = [
  {
    title: "Message",
    path: "/super-admin/message",
  },
  {
    title: "Courses",
    path: "/super-admin/courses",
  },
  {
    title: "Students",
    path: "/super-admin/student",
  },
  {
    title: "Instructors",
    path: "/super-admin/instructor",
  },
  {
    title: "Ambassadors",
    path: "/super-admin/ambassadors",
  },
  {
    title: "Reviews",
    path: "/super-admin/reviews",
  },
  {
    title: "My Accounts",
    path: "/super-admin/my-accounts",
  },
  {
    title: "Certificates",
    path: "/super-admin/certificates",
  },
  {
    title: "CV",
    path: "/super-admin/cv",
  },
];

const Navbar = ({ handleShow }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.superAdminUser);

  const currentItem = items?.find((e) => {
    return location.pathname === e.path;
  });

  let pageTitle = currentItem ? currentItem.title : "";

  // Check if the current path is a subpath
  if (location.pathname?.split("instructor/")?.[1]) {
    pageTitle = "Instructor Profile";
  }

  const [navbarshow, setnavBarshow] = useState("closebutton");

  return (
    <div>
      <div className="dashboardHead">
        <div className="leftBlock">
          <div
            className={`navMobileBar ${navbarshow}`}
            onClick={() => handleShow()}
          >
            <img src={mobileBarIcon} alt="" />
          </div>
          {location.pathname == "/super-admin/dashboard" && (
            <h4>
              Hello, <strong> Admin</strong> 😄
            </h4>
          )}

          <div className="subPageTitleWithShort">
            <div className="titleBlock">
              <h4>{pageTitle}</h4>
              {pageTitle == "Instructor Profile" && (
                <button className="primaryOutlineBtn"
                  onClick={() => {
                    navigate(-1);
                  }}
                >
                  <img src={backIcon} 
                  width={18}
                  style={{marginLeft: '0px', marginRight: '5px', }}/> Back
                </button>
              )}
            </div>
            <div className="dateRangeBlock"></div>
          </div>
        </div>
        <div className="rightBlock">
          <List>
            <ListItem>
              <ListItemAvatar>
                <Avatar src={user?.profilePicture}>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={user?.fullName} secondary="Super Admin" />
            </ListItem>
          </List>
          <IconButton aria-label="delete">
            <img src={menuIconTwo} alt="" />
          </IconButton>
          <IconButton aria-label="delete">
            <img src={menuIconSaven} alt="" />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
