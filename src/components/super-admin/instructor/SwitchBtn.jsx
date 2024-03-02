import { useState } from "react";
import { Button, Menu, MenuItem } from "@mui/material";

import moreIcon from "@/assets/images/more.svg";

const switchBtn = ({ handelChangeStatus, data }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <Button
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        // onClick={handleClick}
      >
        <img src={moreIcon} />
      </Button>
      <Menu
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
        className="customMenuFilter"
      >
        <MenuItem
          data-id={data.userUniqueId}
          status={1}
          onClick={handelChangeStatus}
        >
          Active
        </MenuItem>
        <MenuItem
          data-id={data.userUniqueId}
          status={1}
          onClick={handelChangeStatus}
        >
          Pending
        </MenuItem>
        <MenuItem
          data-id={data.userUniqueId}
          status={1}
          onClick={handelChangeStatus}
        >
          Inactive
        </MenuItem>
        <MenuItem
          data-id={data.userUniqueId}
          status={"true"}
          onClick={handelChangeStatus}
        >
          Approved
        </MenuItem>
        <MenuItem
          data-id={data.userUniqueId}
          status={"false"}
          onClick={handelChangeStatus}
        >
          Rejected
        </MenuItem>
      </Menu>
    </div>
  );
};

export default switchBtn;
