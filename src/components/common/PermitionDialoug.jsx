/* eslint-disable react/prop-types */
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import infowhiteIcon from "@/assets/images/info-white.svg";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
function PermitionDialoug({
  handleOpenModal,
  handleCloseModal,
  title,
  handelOnConfirm,
}) {
  return (
    <Dialog
      open={handleOpenModal}
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
          <p className="subTextTwo">{title}</p>
        </div>
      </DialogContent>
      <DialogActions>
        <button
          className="redBtn fullWidth"
          onClick={() => {
            handelOnConfirm();
          }}
        >
          Yes
        </button>
        <button className="greyBtn fullWidth" onClick={handleCloseModal}>
          Cancel
        </button>
      </DialogActions>
    </Dialog>
  );
}

export default PermitionDialoug;
