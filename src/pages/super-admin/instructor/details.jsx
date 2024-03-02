import { AuthGuard } from "../../../guards/super-admin/auth-guard";
import Seo from "@/components/common/seo";
import React, { useState, useEffect } from "react";
import moment from "moment";
import { Document, Page } from "react-pdf";

import { useParams } from "react-router-dom";

import "../../../assets/css/super-admin/dashboard/style.css";
import "../../../assets/css/super-admin/dashboard/responsive.css";
import mobileIcon from "@/assets/images/mobile.svg";
import smsIcon from "@/assets/images/sms.svg";
import shareIcon from "@/assets/images/share.svg";
import pdfIcon from "@/assets/images/pdf.svg";
import eyeIcon from "@/assets/images/eye.svg";
import documentDownloadIcon from "@/assets/images/document-download.svg";
import programIcon from "@/assets/images/programIcon.svg";
import CloseIcon from "@mui/icons-material/Close";
import EastIcon from "@mui/icons-material/East";
import WestIcon from "@mui/icons-material/West";
import infowhiteIcon from "@/assets/images/info-white.svg";
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Slide,
} from "@mui/material";

import {
  useInstructorDetailsMutation,
  useInstructorApprovedMutation,
} from "../../../redux/api/super-admin/instructor";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export function Component() {
  const metaTags = [
    { name: "Metaname1", content: "content1" },
    { name: "Metaname2", content: "content2" },
  ];

  // eslint-disable-next-line no-unused-vars
  const [getDetails, { isLoading, isSuccess, data }] =
    useInstructorDetailsMutation();

  const [
    handelApprove,
    { isLoading: isLoadingApproved, isSuccess: isSuccessApproved },
  ] = useInstructorApprovedMutation();

  let { user } = useParams();
  const [open, setOpen] = useState({ open: false, link: "" });
  const [openVerify, setVerify] = useState({ open: false, isVerify: null });

  function bytesToKB(bytes) {
    const kbSize = bytes / 1024;
    return kbSize.toFixed(2);
  }
  const handleClickOpen = (link) => {
    setOpen({
      open: true,
      link: link,
    });
  };
  const handleClickOpenVerify = (data) => {
    setVerify({
      open: true,
      isVerify: data,
    });
  };
  const handleDownload = (downloadLink) => {
    const link = document.createElement("a");
    link.href = downloadLink;
    link.download = "downloaded_file.pdf"; // Specify the desired file name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  const handleClose = () => {
    setOpen({ open: false, link: "" });
    setPageNumber(1);
  };
  const handleCloseVerify = () => {
    setVerify({ open: false, isVerify: null });
  };
  const handelSubmit = async (status) => {
    await handelApprove({ userId: user, status: status });
  };

  const handelPageChange = (type) => {
    if (type == "inc" && pageNumber < numPages) {
      setPageNumber(pageNumber + 1);
    } else if (type == "dec" && pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  useEffect(() => {
    if (user) {
      getDetails({ id: user });
    }
  }, [user]);

  useEffect(() => {
    if (isSuccessApproved) {
      handleCloseVerify();
      getDetails({ id: user });
    }
  }, [isSuccessApproved]);

  return (
    <AuthGuard>
      <Seo title="Dashboard" metaName="Metaname" metaTags={metaTags}>
        <div className="mainDashboardArea">
          <div className="profilePage">
            <div className="profileRow">
              <div className="profileLeft">
                <div className="profileNameWithPic">
                  <Avatar
                    alt={data?.data?.fullName}
                    src={data?.data?.profilePicture}
                  />
                  <h5>{data?.data?.fullName}</h5>
                  <p className="subTextOne">{data?.data?.username}</p>
                </div>
                <div className="profileInfo">
                  <List disablePadding>
                    <ListItem disableGutters>
                      <ListItemIcon>
                        <img src={programIcon} />
                      </ListItemIcon>
                      <ListItemText primary={data?.data?.specialization} />
                    </ListItem>
                    <ListItem disableGutters>
                      <ListItemIcon>
                        <img src={mobileIcon} />
                      </ListItemIcon>
                      <ListItemText
                        primary={data?.data?.phoneno}
                        style={{ cursor: "pointer" }}
                        // onClick={() =>
                        //   (window.location = "{`tel:$(+1) 682 7892 9182`}")
                        // }
                      />
                    </ListItem>
                    <ListItem disableGutters>
                      <ListItemIcon>
                        <img src={smsIcon} />
                      </ListItemIcon>
                      <ListItemText
                        primary={data?.data?.email}
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          (window.location = `mailto:${data?.data?.email}`)
                        }
                      />
                    </ListItem>
                    <ListItem disableGutters>
                      <ListItemIcon>
                        <img src={shareIcon} />
                      </ListItemIcon>
                      <ListItemText primary={data?.data?.website} />
                    </ListItem>
                  </List>
                </div>
                <div className="profileSummaryBlock">
                  <p className="subTextOne fontWeight-700">Summary</p>
                  <p className="subTextTwo">{data?.data?.summary}</p>
                </div>
              </div>
              <div className="profileRight">
                {data?.data?.isApproved === "PENDING" &&
                  data?.data?.profileCreationStep == 4 && (
                    <div className="profileAction">
                      <button
                        className="primaryBtn fullWidth"
                        onClick={() => {
                          handleClickOpenVerify(true);
                        }}
                        disabled={isLoadingApproved}
                      >
                        Approve
                      </button>
                      <button
                        className="outlineBtn fullWidth"
                        onClick={() => handleClickOpenVerify(false)}
                        disabled={isLoadingApproved}
                      >
                        Reject
                      </button>
                    </div>
                  )}
                <div className="profileDetailsView">
                  <div className="profileDetailsViewScroll">
                    <div className="detailsView">
                      <p className="subTextOne fontWeight-700">CV</p>
                      {data?.data?.cvLink && (
                        <div className="detailsViewBlock">
                          <Grid container>
                            <Grid item>
                              <List disablePadding>
                                <ListItem disableGutters>
                                  <Avatar>
                                    <img src={pdfIcon} alt="pdf-icon" />
                                  </Avatar>
                                  <ListItemText
                                    primary={data?.data?.cvName}
                                    secondary={
                                      bytesToKB(data?.data?.cvSize) + "kb"
                                    }
                                  />
                                </ListItem>
                              </List>
                            </Grid>
                          </Grid>
                          <Grid
                            container
                            justifyContent={"flex-end"}
                            columnGap={1}
                          >
                            <IconButton
                              onClick={() => {
                                handleClickOpen(data?.data?.cvLink);
                              }}
                            >
                              <img src={eyeIcon} alt="eye-icon" />
                            </IconButton>
                            <IconButton
                              onClick={() => {
                                handleDownload(data?.data?.cvLink);
                              }}
                            >
                              <img src={documentDownloadIcon} alt="eye-icon" />
                            </IconButton>
                          </Grid>
                        </div>
                      )}
                    </div>
                    <div className="detailsView">
                      <p className="subTextOne fontWeight-700">Certificates</p>

                      {data?.data?.instructorCertificate?.map((e, index) => {
                        return (
                          <div className="detailsViewBlock" key={index}>
                            <Grid container>
                              <Grid item>
                                <List disablePadding>
                                  <ListItem disableGutters>
                                    <Avatar>
                                      <img src={pdfIcon} alt="pdf-icon" />
                                    </Avatar>
                                    <ListItemText
                                      primary={e?.title}
                                      secondary={
                                        bytesToKB(e?.certificateSize) + "kb"
                                      }
                                    />
                                  </ListItem>
                                </List>
                              </Grid>
                            </Grid>
                            <Grid
                              container
                              className="CertificatesInfo"
                              justifyContent={"space-between"}
                              sx={{ padding: "0 0 10px 50px" }}
                            >
                              <Grid item>
                                <p className="subTextOne">{e?.category}</p>
                              </Grid>
                              <Grid item>
                                <p className="subTextOne">
                                  Year: {moment(e?.date).format("YYYY")}
                                </p>
                              </Grid>
                            </Grid>
                            <Grid
                              container
                              className="CertificatesInfo"
                              sx={{ padding: "0 0 10px 50px" }}
                            >
                              <Grid item>
                                <p className="subTextOne mb-0">
                                  Cert. No: {e?.certificateNo}
                                </p>
                                <p className="subTextOne mb-0">
                                  Issuer: {e?.issuer}
                                </p>
                              </Grid>
                            </Grid>
                            <Grid
                              container
                              justifyContent={"flex-end"}
                              columnGap={1}
                            >
                              <IconButton
                                onClick={() => {
                                  handleClickOpen(e?.certificateLink);
                                }}
                              >
                                <img src={eyeIcon} alt="eye-icon" />
                              </IconButton>
                              <IconButton
                                onClick={() => {
                                  handleDownload(e?.certificateLink);
                                }}
                              >
                                <img
                                  src={documentDownloadIcon}
                                  alt="eye-icon"
                                />
                              </IconButton>
                            </Grid>
                          </div>
                        );
                      })}
                    </div>
                    <div className="detailsView">
                      <p className="subTextOne fontWeight-700">
                        Identification
                      </p>

                      {data?.data?.identificationFileLinks?.map((e, index) => {
                        return (
                          <div className="detailsViewBlock" key={index}>
                            <Grid container>
                              <Grid item>
                                <List disablePadding>
                                  <ListItem disableGutters>
                                    <Avatar>
                                      <img src={pdfIcon} alt="pdf-icon" />
                                    </Avatar>
                                    <ListItemText
                                      primary={e.name}
                                      secondary={bytesToKB(e.size) + "kb"}
                                    />
                                  </ListItem>
                                </List>
                              </Grid>
                            </Grid>
                            <Grid
                              container
                              justifyContent={"flex-end"}
                              columnGap={1}
                            >
                              <IconButton
                                onClick={() => {
                                  handleClickOpen(e?.link);
                                }}
                              >
                                <img src={eyeIcon} alt="eye-icon" />
                              </IconButton>
                              <IconButton
                                onClick={() => {
                                  handleDownload(e?.link);
                                }}
                              >
                                <img
                                  src={documentDownloadIcon}
                                  alt="eye-icon"
                                />
                              </IconButton>
                            </Grid>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="detailsView">
                    <p className="subTextOne fontWeight-700">Account Info</p>
                    <div className="profileAccountInfo">
                      <div className="profileAccountInfoBlock">
                        <p className="subTextTwo">
                          {" "}
                          {moment(data?.data?.createdAt).format(
                            "DD, MMMM YYYY"
                          )}
                        </p>
                        <p className="smallText">User Creation Date</p>
                      </div>
                      <div className="profileAccountInfoBlock">
                        <p className="subTextTwo">
                          {data?.data?.lastLogin &&
                            moment(data?.data?.lastLogin).format(
                              "DD, MMMM YYYY | h:mmA"
                            )}
                        </p>
                        <p className="smallText">Last Login Date</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Dialog
          open={open.open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
          className="pdfViewModal"
        >
          <DialogTitle>
            <p className="mainText fontWeight-700">File.pdf</p>

            <Button onClick={handleClose}>
              <CloseIcon />
            </Button>
          </DialogTitle>
          <DialogContent>
            <div className="pdfViewBlock">
              <Document file={open.link} onLoadSuccess={onDocumentLoadSuccess}>
                <Page pageNumber={pageNumber} />
              </Document>
            </div>
            <Grid
              container
              className="pageNumberBlock"
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Button
                onClick={() => {
                  handelPageChange("dec");
                }}
              >
                <WestIcon />
              </Button>{" "}
              {pageNumber} of {numPages}{" "}
              <Button
                onClick={() => {
                  handelPageChange("inc");
                }}
              >
                <EastIcon />
              </Button>
            </Grid>
            <Grid container justifyContent={"center"}>
              <p>
                {pageNumber}
                {/* of {numPages} */}
              </p>
            </Grid>
          </DialogContent>
        </Dialog>
        <Dialog
          open={openVerify.open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleCloseVerify}
          aria-describedby="alert-dialog-slide-description"
          className="logoutModal"
        >
          <DialogTitle>
            <Button onClick={handleCloseVerify}>
              <CloseIcon />
            </Button>
          </DialogTitle>
          <DialogContent>
            <div className="imgBlock">
              <img src={infowhiteIcon} />
            </div>
            <div className="contentBlock">
              {openVerify.isVerify ? (
                <p className="subTextTwo">Are you sure you want to approve?</p>
              ) : (
                <p className="subTextTwo">Are you sure you want to reject?</p>
              )}
            </div>
          </DialogContent>
          <DialogActions>
            <button
              className="redBtn fullWidth"
              onClick={() => {
                handelSubmit(openVerify.isVerify);
              }}
            >
              Yes
            </button>
            <button className="greyBtn fullWidth" onClick={handleCloseVerify}>
              Cancel
            </button>
          </DialogActions>
        </Dialog>
      </Seo>
    </AuthGuard>
  );
}

Component.displayName = "SuperAdminDashboard";
