/* eslint-disable react/prop-types */
import React from "react";
import { Button, Dialog, DialogContent, DialogTitle, Grid } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SuccessIcon from "../../assets/images/Success.png";
import reviewstatusIcon from "../../assets/images/review-status.svg";

import Slide from "@mui/material/Slide";
const Transition = React.forwardRef(function Transition(props, ref) {
  const dir = props.children.props.children.props["aria-describedby"];
  return <Slide direction={dir} ref={ref} {...props} />;
});

function SuccessDialog({
  handleOpenModal,
  handleCloseModal,
  title,
  type,
  direction,
}) {
  return (
    <Dialog
      TransitionComponent={Transition}
      open={handleOpenModal}
      onClose={handleCloseModal}
      aria-describedby={direction || "up"}
      className="statusModal"
    >
      <DialogTitle>
        <Button onClick={handleCloseModal}>
          <CloseIcon />
        </Button>
      </DialogTitle>
      <DialogContent>
        <Grid container gap={2} justifyContent={'center'} flexDirection={'column'} alignItems={'center'}>
          <div className="imgBlock">
            {
              type == 'review' ? 
              <img src={reviewstatusIcon} alt="Review Icon" /> : <img src={SuccessIcon} alt="Success Icon" />
            }
            
          </div>
          <div className="contentBlock">
            <p className="subTextTwo fontWeight-500">{title}</p>
          </div>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

export default SuccessDialog;
