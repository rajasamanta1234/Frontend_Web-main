import { Box, MenuItem, Select } from "@mui/material";
import React from "react";

import usersquareIcon from "@/assets/images/user-square.svg";
import settingIcon from "@/assets/images/setting-2.svg";
import messagequestionIcon from "@/assets/images/message-question.svg";
import cardTickIcon from "@/assets/images/card-tick.svg";
import SwapIcon from "@/assets/images/Swap.svg";
import badgecheckIcon from "@/assets/images/badge-check.svg";
import academicCapIcon from "@/assets/images/academic-cap.svg";
import notificationIcon from "@/assets/images/notification.svg";
import { Link } from "react-router-dom";

const Accountmenu = ({ containedValue }) => {
  const [selectMenu, setMenu] = React.useState("");

  const handleChange = (event) => {
    setMenu(event.target.value);
  };

  React.useEffect(() => {
    if (containedValue) {
      setMenu(containedValue);
    }
  }, [containedValue]);

  return (
    <Box padding={"0px 50px"} className="editProfileMobileMenu">
      <Select
        fullWidth
        value={selectMenu}
        onChange={handleChange}
        displayEmpty
        inputProps={{ "aria-label": "Without label" }}
      >
        <MenuItem value="0">
          <Link className="color-Neutral-Black" to="/student/edit-profile">
            <img src={usersquareIcon} /> &nbsp; Edit Profile
          </Link>
        </MenuItem>
        <MenuItem value="1">
          <Link className="color-Neutral-Black" to="/student/edit-setting">
            <img src={settingIcon} /> &nbsp; Account Setting
          </Link>
        </MenuItem>
        <MenuItem value="2">
          <Link
            className="color-Neutral-Black"
            to="/student/notification-setting"
          >
            <img src={notificationIcon} /> &nbsp; Notification
          </Link>
        </MenuItem>
        <MenuItem value="3">
          <Link className="color-Neutral-Black" to="#">
            <img src={academicCapIcon} /> &nbsp; Certificates
          </Link>
        </MenuItem>
        <MenuItem value="4">
          <Link className="color-Neutral-Black" to="#">
            <img src={badgecheckIcon} /> &nbsp; Badges
          </Link>
        </MenuItem>
        <MenuItem value="5">
          <Link className="color-Neutral-Black" to="/student/linked-accounts">
            <img src={SwapIcon} /> &nbsp; Linked Accounts
          </Link>
        </MenuItem>
        <MenuItem value="6">
          <Link className="color-Neutral-Black" to="/student/plan">
            <img src={cardTickIcon} /> &nbsp; Plans
          </Link>
        </MenuItem>
        <MenuItem value="7">
          <Link className="color-Neutral-Black" to="/student/helpdesk">
            <img src={messagequestionIcon} /> &nbsp; Helpdesk
          </Link>
        </MenuItem>
      </Select>
    </Box>
  );
};

export default Accountmenu;
