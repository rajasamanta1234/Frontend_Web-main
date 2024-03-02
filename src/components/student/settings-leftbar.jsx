import React from "react";
import { Box, List, ListItem } from "@mui/material";
import { Link } from "react-router-dom";

import usersquareIcon from "@/assets/images/user-square.svg";
import settingIcon from "@/assets/images/setting-2.svg";
import messagequestionIcon from "@/assets/images/message-question.svg";
import cardTickIcon from "@/assets/images/card-tick.svg";
import SwapIcon from "@/assets/images/Swap.svg";
import badgecheckIcon from "@/assets/images/badge-check.svg";
import academicCapIcon from "@/assets/images/academic-cap.svg";
import notificationIcon from "@/assets/images/notification.svg";
import uploadIcon from "@/assets/images/upload-icon.svg";

const SettingLeftbar = ({ title }) => {
  return (
    <Box
      padding={{ xs: "0px 30px 30px", md: "30px 30px" }}
      className="editProfileMenu"
    >
      <h4>Update And Manage Your Account</h4>
      <List
        sx={{ display: "flex", flexDirection: "column", gap: "30px" }}
        disablePadding
      >
        <ListItem disableGutters disablePadding>
          <Link
            to="/student/edit-profile"
            className={`${title == "edit" ? "active" : ""}`}
          >
            <img src={usersquareIcon} /> Edit Profile
          </Link>
        </ListItem>
        <ListItem disableGutters disablePadding>
          <Link
            to="/student/edit-setting"
            className={`${title == "editprofile" ? "active" : ""}`}
          >
            <img src={settingIcon} /> Settings
          </Link>
        </ListItem>
        <ListItem disableGutters disablePadding>
          <Link
            to="/student/notification-setting"
            className={`${title == "notificationSetting" ? "active" : ""}`}
          >
            <img src={notificationIcon} /> Notification
          </Link>
        </ListItem>
        {/* <ListItem disableGutters disablePadding>
          <Link to="#">
            <img src={academicCapIcon} /> Certificates
          </Link>
        </ListItem> */}
        {/* <ListItem disableGutters disablePadding>
          <Link to="#">
            <img src={badgecheckIcon} /> Badges
          </Link>
        </ListItem> */}
        <ListItem disableGutters disablePadding>
          <Link
            to="/student/linked-accounts"
            className={`${title == "linkAccount" ? "active" : ""}`}
          >
            <img src={SwapIcon} /> Linked Accounts
          </Link>
        </ListItem>
        <ListItem disableGutters disablePadding>
          <Link
            to="/student/plan"
            className={`${title == "plan" ? "active" : ""}`}
          >
            <img src={cardTickIcon} /> Plans
          </Link>
        </ListItem>
        <ListItem disableGutters disablePadding>
          <Link
            to="/student/helpdesk"
            className={`${title == "helpdesk" ? "active" : ""}`}
          >
            <img src={messagequestionIcon} /> Helpdesk
          </Link>
        </ListItem>
      </List>
    </Box>
  );
};

export default SettingLeftbar;
