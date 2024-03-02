import { useDispatch, useSelector } from "react-redux";
import { AuthGuard } from "../../../guards/student/auth-guard";
import Seo from "@/components/common/seo";
import { Document, Page } from "react-pdf";
import { logout } from "@/redux/slice/student/user";

import "../../../assets/css/student-dashboard/style.css";
import "../../../assets/css/student-dashboard/responsive.css";
import arrowRightIcon from "@/assets/images/cheveron-right.svg";
import arrowLeftIcon from "@/assets/images/cheveron-left.svg";
import courseImg from "@/assets/images/coruse-img.png";
import avatarImg from "@/assets/images/avatar-demo.png";
import documentIcon from "@/assets/images/document.svg";
import imgThree from "@/assets/images/img-3.jpeg";
import imgFour from "@/assets/images/img-4.jpeg";
import userIcon from "@/assets/images/user.svg";
import clockIcon from "@/assets/images/clock.svg";
import rangeIcon from "@/assets/images/range.svg";
import sparklesIcon from "@/assets/images/sparkles-one.svg";
import taskpurpleIcon from "@/assets/images/task-purple-icon.svg";
import pdfIcon from "@/assets/images/pdf.svg";
import avatardemo from "@/assets/images/avatar-demo.png";
import badgeOne from "@/assets/images/badge-1.svg";
import badgeTwo from "@/assets/images/badge-2.svg";
import badgeThree from "@/assets/images/badge-3.svg";
import badgeFour from "@/assets/images/badge-4.svg";
import badgeFive from "@/assets/images/badge-5.svg";
import eyeIcon from "@/assets/images/eye.svg";
import documentDownloadIcon from "@/assets/images/document-download.svg";
import CloseIcon from "@mui/icons-material/Close";
import EastIcon from "@mui/icons-material/East";
import WestIcon from "@mui/icons-material/West";

import badgeSix from "@/assets/images/badge-6.svg";
import {
  Avatar,
  Box,
  Button,
  Grid,
  LinearProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
  Dialog,
  // DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
} from "@mui/material";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import SliderValue from "@mui/material/Slider";
import StarIcon from "@mui/icons-material/Star";
import { useGetBadgeMutation } from "../../../redux/api/student/auth";
import React, { useEffect, useState } from "react";

const metaTags = [
  { name: "Metaname1", content: "content1" },
  { name: "Metaname2", content: "content2" },
];
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

import {
  useGetStudentProfileDataMutation,
  useGetStudentCertificateMutation,
  useGetStudentStatsMutation,
} from "../../../redux/api/student/profile";
export function Component() {
  const { user } = useSelector((state) => state.studetnUser);
  const [getBadgeData, { isLoading, isSuccess, isError, data, error }] =
    useGetBadgeMutation();
  const [getData, { data: allData, isSuccess: allDataIsSuccess }] =
    useGetStudentProfileDataMutation();

  const [getStats, { data: statsData }] = useGetStudentStatsMutation();
  const [getCerti, { data: certiData }] = useGetStudentCertificateMutation();
  const [allBadges, setAllBadges] = useState([]);
  const [open, setOpen] = useState({ open: false, link: "" });
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);

  const handleClickOpen = (link) => {
    setOpen({
      open: true,
      link: link,
    });
  };
  const handelPageChange = (type) => {
    if (type == "inc" && pageNumber < numPages) {
      setPageNumber(pageNumber + 1);
    } else if (type == "dec" && pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  const handleClose = () => {
    setOpen({ open: false, link: "" });
    setPageNumber(1);
  };

  useEffect(() => {
    getBadgeData();
    getData();
    getStats();
    getCerti();
  }, []);

  const handleDownload = (downloadLink) => {
    const link = document.createElement("a");
    link.href = downloadLink;
    link.download = "downloaded_file.pdf"; // Specify the desired file name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    if (isSuccess && data) {
      setAllBadges(data?.data);
    }
  }, [isSuccess, data]);
  return (
    <AuthGuard>
      <Seo title="Profile" metaName="Metaname" metaTags={metaTags}>
        <div className="mainDashboardArea fullWidth">
          <Grid
            container
            paddingTop={{ xs: 4, sm: 7 }}
            paddingBottom={7}
            className="customPagePadding"
          >
            <Grid item xs={12}>
              <Grid item container gap={"30px"}>
                <Grid item xs={12}>
                  <Grid
                    item
                    container
                    className="studentProfileBox"
                    alignItems={"center"}
                    justifyContent={"space-between"}
                    gap={2}
                  >
                    <Grid item>
                      <List disablePadding>
                        <ListItem disableGutters disablePadding>
                          <ListItemAvatar>
                            <Avatar src={user?.profilePicture} />
                          </ListItemAvatar>
                          <ListItemText
                            primary={allData?.data?.fullName}
                            secondary={user?.email}
                          />
                        </ListItem>
                      </List>
                    </Grid>
                    <Grid item>
                      <Link to="/student/edit-profile" className="primaryBtn">
                        Edit Profile
                      </Link>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid item container>
                    <Grid item maxWidth={700}>
                      <p className="subTextOne fontWeight-700">Bio</p>
                      <p className="subTextTwo color-Neutral-light-400">
                        {allData?.data?.bio}
                      </p>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid item container>
                    <Grid item xs={12}>
                      <p className="subTextOne fontWeight-700">Stats</p>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid
                        item
                        container
                        spacing={"30px"}
                        className="studentProfileStats"
                      >
                        <Grid item xs={12} sm={6} md={3}>
                          <Box>
                            <h3>{statsData?.data?.learningStreak} Days</h3>
                            <p className="subTextOne">
                              Current Learning Streak
                            </p>
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                          <Box>
                            <h3>{statsData?.data?.completedCourse}</h3>
                            <p className="subTextOne">Completed Courses</p>
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                          <Box>
                            <h3>{statsData?.data?.ongoingCourse}</h3>
                            <p className="subTextOne">Ongoing courses</p>
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                          <Box>
                            <h3>{statsData?.data?.quizCompleted}</h3>
                            <p className="subTextOne">
                              Quiz Completed (Score/Total)
                            </p>
                          </Box>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid item container>
                    <Grid item xs={12}>
                      <p className="subTextOne fontWeight-700">Certificates</p>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid
                        item
                        container
                        className="profileCertificatesInfo"
                        spacing={"30px"}
                      >
                        {certiData?.data?.map((e, index) => {
                          return (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                              <Box>
                                <List disablePadding>
                                  <ListItem disableGutters>
                                    <Avatar>
                                      <img src={pdfIcon} alt="pdf-icon" />
                                    </Avatar>
                                    <ListItemText
                                      primary={e.title}
                                      secondary={
                                        <>
                                          <Grid
                                            item
                                            container
                                            justifyContent={"space-between"}
                                          >
                                            <Grid item>
                                              <p className="subTextTwo color-Neutral-light-400">
                                                {e.category}
                                              </p>
                                            </Grid>
                                            <Grid item>
                                              <p className="subTextTwo color-Neutral-light-400">
                                                Year: {e.year}
                                              </p>
                                            </Grid>
                                          </Grid>
                                          <Grid
                                            item
                                            container
                                            paddingTop={"10px"}
                                            justifyContent={"space-between"}
                                          >
                                            <Grid item>
                                              <p className="subTextTwo color-Neutral-light-400">
                                                Cert. No: {e.certificateNo}
                                              </p>
                                            </Grid>
                                          </Grid>
                                        </>
                                      }
                                    />
                                  </ListItem>
                                </List>
                                <Grid
                                  container
                                  justifyContent={"flex-end"}
                                  columnGap={1}
                                >
                                  <IconButton
                                    onClick={() => {
                                      handleClickOpen(e.certificateLink);
                                    }}
                                  >
                                    <img src={eyeIcon} alt="eye-icon" />
                                  </IconButton>
                                  <IconButton
                                    onClick={() => {
                                      handleDownload(e.certificateLink);
                                    }}
                                  >
                                    <img
                                      src={documentDownloadIcon}
                                      alt="eye-icon"
                                    />
                                  </IconButton>
                                </Grid>
                              </Box>
                            </Grid>
                          );
                        })}
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid item container>
                    <Grid item xs={12}>
                      <p className="subTextOne fontWeight-700 mb-10">Badges</p>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid item container gap={"22px"}>
                        {allBadges?.badges?.map((it, ind) => {
                          return (
                            <Grid item xs={12} key={ind}>
                              <Box className="badgeBox">
                                <Grid
                                  item
                                  container
                                  alignItems={"center"}
                                  gap={{ xs: 2, sm: 0 }}
                                >
                                  <Grid
                                    item
                                    sx={{
                                      width: {
                                        xs: "calc(100% - 0px)",
                                        sm: "calc(100% - 50px)",
                                      },
                                      paddingRight: { xs: "0px", sm: "50px" },
                                    }}
                                  >
                                    <Grid
                                      item
                                      container
                                      spacing={{ xs: 1, sm: 3 }}
                                      width={"100%"}
                                    >
                                      <Grid item width={{ xs: 50, sm: 88 }}>
                                        <img src={it?.image} />
                                      </Grid>
                                      <Grid
                                        item
                                        sx={{
                                          width: {
                                            xs: "calc(100% - 50px)",
                                            sm: "calc(100% - 112px)",
                                          },
                                        }}
                                      >
                                        <p className="mainText color-Neutral-Black">
                                          {it?.title}
                                        </p>
                                        <LinearProgress
                                          variant="determinate"
                                          value={100}
                                        />
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                  <Grid item width={{ xs: "100%", sm: 50 }}>
                                    <Grid
                                      item
                                      container
                                      justifyContent={{
                                        xs: "flex-end",
                                        sm: "flex-start",
                                      }}
                                    >
                                      <p className="subTextOne color-Neutral-600">
                                        {it?.completion}/{it?.target}
                                      </p>
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </Box>
                            </Grid>
                          );
                        })}
                        {/* <Grid item xs={12}>
                          <Box className="badgeBox">
                            <Grid item container alignItems={"center"}>
                              <Grid
                                item
                                sx={{
                                  width: "calc(100% - 50px)",
                                  paddingRight: "109px",
                                }}
                              >
                                <Grid item container spacing={3} width={"100%"}>
                                  <Grid item width={88}>
                                    <img src={badgeTwo} />
                                  </Grid>
                                  <Grid
                                    item
                                    sx={{ width: "calc(100% - 112px)" }}
                                  >
                                    <p className="mainText color-Neutral-Black">
                                      Watch 50 videos fro 10 minutes
                                    </p>
                                    <LinearProgress
                                      variant="determinate"
                                      value={100}
                                    />
                                  </Grid>
                                </Grid>
                              </Grid>
                              <Grid item width={50}>
                                <p className="subTextOne color-Neutral-600">
                                  50/50
                                </p>
                              </Grid>
                            </Grid>
                          </Box>
                        </Grid>
                        <Grid item xs={12}>
                          <Box className="badgeBox">
                            <Grid item container alignItems={"center"}>
                              <Grid
                                item
                                sx={{
                                  width: "calc(100% - 50px)",
                                  paddingRight: "109px",
                                }}
                              >
                                <Grid item container spacing={3} width={"100%"}>
                                  <Grid item width={88}>
                                    <img src={badgeThree} />
                                  </Grid>
                                  <Grid
                                    item
                                    sx={{ width: "calc(100% - 112px)" }}
                                  >
                                    <p className="mainText color-Neutral-Black">
                                      Watch 50 videos fro 10 minutes
                                    </p>
                                    <LinearProgress
                                      variant="determinate"
                                      value={100}
                                    />
                                  </Grid>
                                </Grid>
                              </Grid>
                              <Grid item width={50}>
                                <p className="subTextOne color-Neutral-600">
                                  50/50
                                </p>
                              </Grid>
                            </Grid>
                          </Box>
                        </Grid>
                        <Grid item xs={12}>
                          <Box className="badgeBox">
                            <Grid item container alignItems={"center"}>
                              <Grid
                                item
                                sx={{
                                  width: "calc(100% - 50px)",
                                  paddingRight: "109px",
                                }}
                              >
                                <Grid item container spacing={3} width={"100%"}>
                                  <Grid item width={88}>
                                    <img src={badgeFour} />
                                  </Grid>
                                  <Grid
                                    item
                                    sx={{ width: "calc(100% - 112px)" }}
                                  >
                                    <p className="mainText color-Neutral-Black">
                                      Watch 50 videos fro 10 minutes
                                    </p>
                                    <LinearProgress
                                      variant="determinate"
                                      value={100}
                                    />
                                  </Grid>
                                </Grid>
                              </Grid>
                              <Grid item width={50}>
                                <p className="subTextOne color-Neutral-600">
                                  50/50
                                </p>
                              </Grid>
                            </Grid>
                          </Box>
                        </Grid>
                        <Grid item xs={12}>
                          <Box className="badgeBox">
                            <Grid item container alignItems={"center"}>
                              <Grid
                                item
                                sx={{
                                  width: "calc(100% - 50px)",
                                  paddingRight: "109px",
                                }}
                              >
                                <Grid item container spacing={3} width={"100%"}>
                                  <Grid item width={88}>
                                    <img src={badgeFive} />
                                  </Grid>
                                  <Grid
                                    item
                                    sx={{ width: "calc(100% - 112px)" }}
                                  >
                                    <p className="mainText color-Neutral-Black">
                                      Watch 50 videos fro 10 minutes
                                    </p>
                                    <LinearProgress
                                      variant="determinate"
                                      value={100}
                                    />
                                  </Grid>
                                </Grid>
                              </Grid>
                              <Grid item width={50}>
                                <p className="subTextOne color-Neutral-600">
                                  50/50
                                </p>
                              </Grid>
                            </Grid>
                          </Box>
                        </Grid>
                        <Grid item xs={12}>
                          <Box className="badgeBox">
                            <Grid item container alignItems={"center"}>
                              <Grid
                                item
                                sx={{
                                  width: "calc(100% - 50px)",
                                  paddingRight: "109px",
                                }}
                              >
                                <Grid item container spacing={3} width={"100%"}>
                                  <Grid item width={88}>
                                    <img src={badgeSix} />
                                  </Grid>
                                  <Grid
                                    item
                                    sx={{ width: "calc(100% - 112px)" }}
                                  >
                                    <p className="mainText color-Neutral-Black">
                                      Watch 50 videos fro 10 minutes
                                    </p>
                                    <LinearProgress
                                      variant="determinate"
                                      value={35}
                                    />
                                  </Grid>
                                </Grid>
                              </Grid>
                              <Grid item width={50}>
                                <p className="subTextOne color-Neutral-600">
                                  35/50
                                </p>
                              </Grid>
                            </Grid>
                          </Box>
                        </Grid> */}
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
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
      </Seo>
    </AuthGuard>
  );
}

Component.displayName = "StudentProfile";
