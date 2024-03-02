import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Menu,
  MenuItem,
  Slide,
  Badge,
  Grid,
  ListItemButton,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import { Link, useLocation } from "react-router-dom";

import PersonIcon from "@mui/icons-material/Person";
import menuIconTwo from "@/assets/images/superadmin-dashboard-icon/icon-2.svg";
import menuIconSaven from "@/assets/images/superadmin-dashboard-icon/icon-7.svg";
import videoIcon from "@/assets/images/video-icon.svg";
import userSquareIcon from "@/assets/images/user-square.svg";
import settingIcon from "@/assets/images/setting-2.svg";
import notificationIcon from "@/assets/images/notification.svg";
import cardtickIcon from "@/assets/images/card-tick.svg";
import messagequestionIcon from "@/assets/images/message-question.svg";
import CloseIcon from "@mui/icons-material/Close";
import infowhiteIcon from "@/assets/images/info-white.svg";
import noticardIcon from "@/assets/images/noti-card.svg";
import avatarDemo from "@/assets/images/avatar-demo.png";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slice/instructor/user";
import mobileBarIcon from "../../assets/images/mobileBar.svg";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const items = [
  {
    title: "Message",
    path: "/instructor/message",
  },
  {
    title: "Courses",
    path: "/instructor/courses",
  },
  {
    title: "instructors",
    path: "/instructor/instructors",
  },
  {
    title: "Instructors",
    path: "/instructor/instructor",
  },
  {
    title: "Ambassadors",
    path: "/instructor/ambassadors",
  },
  {
    title: "Reviews",
    path: "/instructor/reviews",
  },
  {
    title: "My Accounts",
    path: "/instructor/my-accounts",
  },
];

const Navbar = ({ handleShow }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.instructorUser);
  const a = items?.find((e) => {
    return location.pathname === e.path;
  });

  const [openlogoutModal, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  console.log("instructor", user);
  const [navbarshow, setnavBarshow] = useState("closebutton");

  const [anchorElNotifi, setAnchorElNoti] = React.useState(null);
  const openNotifi = Boolean(anchorElNotifi);
  const handleClickNotifi = (event) => {
    setAnchorElNoti(event.currentTarget);
  };
  const handleCloseNotifi = () => {
    setAnchorElNoti(null);
  };

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
        </div>
        <div className="rightBlock">
          <List disablePadding className="forDesktop">
            <ListItem
              disablePadding
              secondaryAction={
                <IconButton edge="end" sx={{ padding: 0, minWidth: "37px" }}>
                  <Button
                    id="basic-button"
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                    sx={{ padding: "0", minWidth: "37px" }}
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
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                  >
                    <MenuItem
                      onClick={() => {
                        navigate("/instructor/profile/edit-profile");
                        handleClose();
                      }}
                    >
                      <img src={userSquareIcon} /> Edit Profile
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        navigate("/instructor/profile");
                        handleClose();
                      }}
                    >
                      <img src={settingIcon} /> Account Setting
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        navigate("/instructor/notifiaction");
                        handleClose();
                      }}
                    >
                      <img src={notificationIcon} />
                      Notification
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        // navigate("/instructor/plan");
                        handleClose();
                      }}
                    >
                      <img src={cardtickIcon} /> Plans
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        // navigate("/instructor/helpdesk");
                        handleClose();
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
                <Avatar>
                  <img src={user?.profilePicture} />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={user?.fullName} secondary={user?.role} />
            </ListItem>
          </List>
          <IconButton aria-label="chat">
            <img src={menuIconTwo} alt="" />
          </IconButton>
          <IconButton aria-label="notifiaction" onClick={handleClickNotifi}>
            <Badge color="secondary" variant="dot">
              <img src={menuIconSaven} alt="" />
            </Badge>
          </IconButton>
          <Menu
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            anchorEl={anchorElNotifi}
            open={openNotifi}
            onClose={handleCloseNotifi}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            {/* <MenuItem onClick={handleCloseNotifi}> */}
            <Grid
              item
              container
              className="notifiList notifiListMenu"
              padding={2}
              maxWidth={500}
            >
              <Grid item xs={12}>
                <List disablePadding>
                  <ListItem
                    disableGutters
                    secondaryAction={
                      <p className="subTextOne color-secondary-light">
                        10.12 PM
                      </p>
                    }
                  >
                    <ListItemButton component="a" href="#simple-list">
                      <Badge badgeContent={<img src={noticardIcon} />}>
                        <Avatar src={avatarDemo} />
                      </Badge>
                      <ListItemText
                        primary={
                          <p className="subTextOne fontWeight-300">
                            Nicolas Bekker purchased{" "}
                            <span className="fontWeight-500">
                              Designing with User Centered Approach
                            </span>
                          </p>
                        }
                      />
                    </ListItemButton>
                  </ListItem>
                  <ListItem
                    disableGutters
                    secondaryAction={
                      <p className="subTextOne color-secondary-light">
                        10.12 PM
                      </p>
                    }
                  >
                    <ListItemButton component="a" href="#simple-list">
                      <Badge badgeContent={<img src={noticardIcon} />}>
                        <Avatar src={avatarDemo} />
                      </Badge>
                      <ListItemText
                        primary={
                          <p className="subTextOne fontWeight-300">
                            Nicolas Bekker purchased{" "}
                            <span className="fontWeight-500">
                              Designing with User Centered Approach
                            </span>
                          </p>
                        }
                      />
                    </ListItemButton>
                  </ListItem>
                  <ListItem
                    disableGutters
                    secondaryAction={
                      <p className="subTextOne color-secondary-light">
                        10.12 PM
                      </p>
                    }
                  >
                    <ListItemButton component="a" href="#simple-list">
                      <Badge badgeContent={<img src={noticardIcon} />}>
                        <Avatar src={avatarDemo} />
                      </Badge>
                      <ListItemText
                        primary={
                          <p className="subTextOne fontWeight-300">
                            Nicolas Bekker purchased{" "}
                            <span className="fontWeight-500">
                              Designing with User Centered Approach
                            </span>
                          </p>
                        }
                      />
                    </ListItemButton>
                  </ListItem>
                </List>
              </Grid>
            </Grid>
            {/* </MenuItem> */}
          </Menu>
          <Box className="forMobile">
            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              sx={{ padding: "0", minWidth: "37px" }}
            >
              <Avatar src={user?.profilePicture} />
            </Button>
            <Menu
              className="menuProfile"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <MenuItem
                onClick={() => {
                  navigate("/instructor/profile/edit-profile");
                  handleClose();
                }}
              >
                <img src={userSquareIcon} /> Edit Profile
              </MenuItem>
              <MenuItem
                onClick={() => {
                  navigate("/instructor/profile");
                  handleClose();
                }}
              >
                <img src={settingIcon} /> Account Setting
              </MenuItem>
              <MenuItem
                onClick={() => {
                  navigate("/instructor/notifiaction");
                  handleClose();
                }}
              >
                <img src={notificationIcon} />
                Notification
              </MenuItem>
              <MenuItem
                onClick={() => {
                  // navigate("/instructor/plan");
                  handleClose();
                }}
              >
                <img src={cardtickIcon} /> Plans
              </MenuItem>
              <MenuItem
                onClick={() => {
                  // navigate("/instructor/helpdesk");
                  handleClose();
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
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseModal}
        aria-describedby="alert-dialog-slide-description"
        className="logoutModal"
      >
        <DialogTitle>
          <Button onClick={handleCloseModal}>
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
              dispatch(logout()), handleCloseModal();
            }}
          >
            Yes
          </button>
          <button className="greyBtn fullWidth" onClick={handleCloseModal}>
            Cancel
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Navbar;
