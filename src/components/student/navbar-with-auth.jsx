import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  Menu,
  MenuItem,
  Box,
} from "@mui/material";

import { useLocation, useNavigate } from "react-router-dom";

import PersonIcon from "@mui/icons-material/Person";
import menuIconSaven from "@/assets/images/superadmin-dashboard-icon/icon-7.svg";
import searchNormalBlack from "@/assets/images/search-normal-black.svg";
import userSquareIcon from "@/assets/images/user-square.svg";
import settingIcon from "@/assets/images/setting-2.svg";
import notificationIcon from "@/assets/images/notification.svg";
import cardtickIcon from "@/assets/images/card-tick.svg";
import messagequestionIcon from "@/assets/images/message-question.svg";
import infocircleIcon from "@/assets/images/info-circle.svg";
import { logout } from "@/redux/slice/student/user";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import mobileBarIcon from "../../assets/images/mobileBar.svg";
import { Link } from "react-router-dom";

export const items = [
  {
    title: "Message",
    path: "/student/message",
  },
  {
    title: "Courses",
    path: "/student/courses",
  },
  {
    title: "Explore Courses",
    path: "/student/search-course",
  },
  {
    title: "Students",
    path: "/student/students",
  },
  {
    title: "Instructors",
    path: "/student/instructor",
  },
  {
    title: "Ambassadors",
    path: "/student/ambassadors",
  },
  {
    title: "Reviews",
    path: "/student/reviews",
  },
  {
    title: "My Accounts",
    path: "/student/my-accounts",
  },
  {
    title: "Account",
    path: "/student/edit-profile",
  },
  {
    title: "Account",
    path: "/student/profile",
  },
  {
    title: "Account",
    path: "/student/edit-setting",
  },
  {
    title: "Account",
    path: "/student/notification-setting",
  },
  {
    title: "Account",
    path: "/student/linked-accounts",
  },
  {
    title: "Account",
    path: "/student/plan",
  },
  {
    title: "Account",
    path: "/student/helpdesk",
  },
  {
    title: "Explore Courses",
    path: "/student/search-course",
  },
];

const Navbar = ({ handleShow }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.studetnUser);

  const a = items?.find((e) => {
    return location.pathname === e.path;
  });

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [openlogoutModal, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClosemodal = () => {
    setOpen(false);
  };

  const [navbarshow, setnavBarshow] = useState("closebutton");

  const redirect = (url) => {
    navigate(url);
    handleClose();
  };

  return (
    <div>
      <div
        className={`dashboardHead ${
          location.pathname != "/student/dashboard" ? "fullWidth" : ""
        }`}
      >
        <div className="leftBlock">
          <div
            className={`navMobileBar ${navbarshow}`}
            onClick={() => handleShow()}
          >
            <img src={mobileBarIcon} alt="" />
          </div>
          {location.pathname == "/student/dashboard" && (
            <>
              <Box className="userNameBlock">
                <h3>Hi, {user?.fullName}</h3>
                <p className="subTextThree">Let’s learn something new today!</p>
              </Box>
            </>
          )}

          <div className="subPageTitleWithShort">
            <div className="titleBlock">
              <h4>{a?.title}</h4>
            </div>
            {/* <div className="dateRangeBlock"></div> */}
          </div>
        </div>
        <div className="rightBlock">
          <Link to="/student/search-course">
            <IconButton>
              <img src={searchNormalBlack} alt="" />
            </IconButton>
          </Link>
          <IconButton>
            <img src={menuIconSaven} alt="" />
          </IconButton>
          <List disablePadding className="forDesktop">
            <ListItem
              disableGutters
              secondaryAction={
                <IconButton edge="end" sx={{ padding: "0" }}>
                  <Button
                    id="basic-button"
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                    sx={{ padding: "0", minWidth: "20px" }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="37"
                      height="37"
                      viewBox="0 0 37 37"
                      fill="none"
                    >
                      <path
                        d="M8.99902 14L17.9997 23.0007L27.0003 14"
                        stroke="#323232"
                        strokeWidth="1.73098"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Button>
                  <Menu
                    className="menuProfile"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  >
                    <MenuItem
                      onClick={() => {
                        redirect("/student/edit-profile");
                      }}
                    >
                      <img src={userSquareIcon} /> Edit Profile
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        redirect("/student/profile");
                      }}
                    >
                      <img src={settingIcon} /> Account Setting
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        redirect("/student/notification-setting");
                      }}
                    >
                      <img src={notificationIcon} /> Notification
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        redirect("/student/plan");
                      }}
                    >
                      <img src={cardtickIcon} /> Plans
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        redirect("/student/helpdesk");
                      }}
                    >
                      <img src={messagequestionIcon} /> Helpdesk
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        handleClickOpen();
                        handleClose();
                      }}
                    >
                      Logout
                    </MenuItem>
                  </Menu>
                </IconButton>
              }
            >
              <ListItemAvatar>
                <Avatar src={user?.profilePicture}/>
                  {/* <PersonIcon /> */}
                  {/* <img src={user?.profilePicture} /> */}
                
              </ListItemAvatar>
            </ListItem>
          </List>
          <Box className="forMobile">
            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              sx={{ padding: "0", minWidth: "20px" }}
            >
              <Avatar>
                <PersonIcon />
              </Avatar>
            </Button>
            <Menu
              className="menuProfile"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem
                onClick={() => {
                  redirect("/student/edit-profile");
                }}
              >
                <img src={userSquareIcon} /> Edit Profile
              </MenuItem>
              <MenuItem
                onClick={() => {
                  redirect("/student/profile");
                }}
              >
                <img src={settingIcon} /> Account Setting
              </MenuItem>
              <MenuItem
                onClick={() => {
                  redirect("/student/notification-setting");
                }}
              >
                <img src={notificationIcon} /> Notification
              </MenuItem>
              <MenuItem
                onClick={() => {
                  redirect("/student/plan");
                }}
              >
                <img src={cardtickIcon} /> Plans
              </MenuItem>
              <MenuItem
                onClick={() => {
                  redirect("/student/helpdesk");
                }}
              >
                <img src={messagequestionIcon} /> Helpdesk
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleClickOpen();
                  handleClose();
                }}
              >
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </div>
      </div>

      <Dialog
        open={openlogoutModal}
        keepMounted
        onClose={handleClosemodal}
        aria-describedby="alert-dialog-slide-description"
        className="logoutModal"
      >
        {/* <DialogTitle>
          <Button onClick={handleClosemodal}>
            <CloseIcon />
          </Button>
        </DialogTitle> */}
        <DialogContent>
          <div className="imgBlock">
            <img src={infocircleIcon} />
          </div>
          <div className="contentBlock">
            <p className="mainText fontWeight-700">Logout From Account</p>
            <p className="subTextTwo">
              Are you sure want logout from {user?.fullName}
              {`'`}s Account?
            </p>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosemodal}>Cancel</Button>
          <button
            className="primaryBtn"
            onClick={() => {
              dispatch(logout()), handleClosemodal();
            }}
          >
            Logout
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Navbar;
