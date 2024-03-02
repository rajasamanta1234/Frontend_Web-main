import { AuthGuard } from "../../../guards/instructor/auth-guard";
import Seo from "@/components/common/seo";

import {
  Box,
  Button,
  Grid,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { items } from "../../../components/student/navbar-with-auth";
import AddIcon from "@mui/icons-material/Add";
import React from "react";
import teacherHandbookBoxImg from "@/assets/images/teacherHandbookBoxImg.png";
import guideimgone from "@/assets/images/guide-img-one.png";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

import talkIcon from "@/assets/images/talk-icon.svg";
import lightIcon from "@/assets/images/light.svg";

import "../../../assets/css/instructor-dashboard/style.css";
import "../../../assets/css/instructor-dashboard/responsive.css";
import CourseGuidePanel from "../../../components/common/CourseGuidePanel";

const metaTags = [
  { name: "Metaname1", content: "content1" },
  { name: "Metaname2", content: "content2" },
];

export function Component() {
  const [openLessonModal, setOpen] = React.useState(false);

  const handleClickOpenLessonModal = () => {
    setOpen(true);
  };

  const handleCloseLessonModal = () => {
    setOpen(false);
  };

  const [openQuizModal, setOpenQuiz] = React.useState(false);

  const handleClickOpenQuizModal = () => {
    setOpenQuiz(true);
  };

  const handleCloseQuizModal = () => {
    setOpenQuiz(false);
  };

  const label = { inputProps: { "aria-label": "Switch demo" } };

  return (
    <AuthGuard>
      <Seo title="Login" metaName="Metaname" metaTags={metaTags}>
        <div className="mainDashboardArea">
          <Grid container>
            <Grid
              className="instDashLeft"
              item
              sx={{
                width: "calc(100% - 366px)",
                paddingRight: "64px",
                paddingBottom: 4,
              }}
            >
              <Grid
                container
                className="layoutHead"
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Grid item xs={12} sm={8}>
                  <Grid item container alignItems={"center"} columnGap={"20px"}>
                    <Link to="#" className="backBtn">
                      <ArrowBackIcon />
                    </Link>
                    <h4>Guides</h4>
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={4} paddingTop={{xs:3, sm:0}}>
                  <Grid
                    item
                    container
                    justifyContent={{ xs: "flex-start", sm: "flex-end" }}
                  >
                    <Grid item xs={12} sm="auto">
                      <div className="newCoursebtndiv">
                        <Link
                          className="lightBtn fullWidth"
                          to={"/instructor/course/new-course"}
                        >
                          <AddIcon />
                          New Course
                        </Link>
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item container>
                <Grid item xs={12} className="guideVideoBlock"></Grid>
                <Grid item xs={12} paddingTop={3}>
                  <Grid item container spacing={4}>
                    <Grid item xs={12} md={6}>
                      <h4>The Complete Way to Organize Your Course Content</h4>
                      <p className="subTextOne fontWeight-300">
                        Lorem ipsum dolor sit amet, consectetur adi piscing
                        elit. Morbi ornare ut velit ut venenatis. Maecenas non
                        lectus mollis, convallis magna quis, sagittis felis.
                        Quisque pharetra ante non massa blandit fringilla.
                        Quisque porttitor ex consequat luctus accumsan. In
                        ullamcorper feugiat lobortis.{" "}
                      </p>
                      <Link className="subTextOne fontWeight-500 color-primary">
                        Read More
                      </Link>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Grid item container flexDirection={"column"} gap={3}>
                        <Grid item xs={12}>
                          <Grid
                            item
                            container
                            alignItems={"center"}
                            className="divideYourCourseBox"
                          >
                            <Grid item sx={{ width: "calc(100% - 48px)" }}>
                              <Grid
                                item
                                container
                                columnGap={3}
                                alignItems={"center"}
                              >
                                <Grid item width={48}>
                                  <Box className="imgBlock">
                                    <img src={lightIcon} />
                                  </Box>
                                </Grid>
                                <Grid item sx={{ width: "calc(100% - 72px)" }}>
                                  <p className="subTextTwo fontWeight-500">
                                    Always Divide Your Course into Parts for
                                    More Structure
                                  </p>
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid item width={24}>
                              <Link>
                                <KeyboardArrowRightIcon
                                  color="secondary"
                                  sx={{ opacity: 0.5 }}
                                />
                              </Link>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item xs={12}>
                          <Box className="talkToUsBlock">
                            <Grid item container>
                              <Grid item width={80}>
                                <img src={talkIcon} />
                              </Grid>
                              <Grid
                                item
                                sx={{
                                  width: "calc(100% - 80px)",
                                  paddingLeft: "24px",
                                }}
                              >
                                <p className="smallText">CUSTOMER SERVICE</p>
                                <p className="subTextTwo fontWeight-500">
                                  We Are Always Available Whenever You Need
                                </p>
                                <Link className="lightBtnSmall">
                                  Talk to Us
                                </Link>
                              </Grid>
                            </Grid>
                          </Box>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid className="instDashRight" item width={366}>
              <CourseGuidePanel />
            </Grid>
          </Grid>
        </div>
      </Seo>
    </AuthGuard>
  );
}

Component.displayName = "InstructorGuide";
