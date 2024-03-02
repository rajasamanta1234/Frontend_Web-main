import { AuthGuard } from "../../../guards/instructor/auth-guard";
import Seo from "@/components/common/seo";

import "../../../assets/css/instructor-dashboard/style.css";
import "../../../assets/css/instructor-dashboard/responsive.css";

import dashGraphIcon from "@/assets/images/dash-graph.svg";
import revenuLightIcon from "@/assets/images/revenu-light.svg";
import profileratingLightIcon from "@/assets/images/profile-rating-light.svg";
import studentLightIcon from "@/assets/images/studentIcon-light.svg";
import videoIcon from "@/assets/images/video-icon.svg";
import avatardemo from "@/assets/images/avatar-demo.png";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Chip,
  Grid,
  IconButton,
  LinearProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { items } from "../../../components/student/navbar-with-auth";
import AddIcon from "@mui/icons-material/Add";
import React, { useEffect, useState, useMemo } from "react";
import eyeLightIcon from "@/assets/images/eye-light.svg";
import indonesiaFlag from "@/assets/images/indonesia.png";
import vietnamFlag from "@/assets/images/vietnam.png";
import usFlag from "@/assets/images/us.png";
import erningBg from "@/assets/images/erning-bg.svg";
import penciloutlinepurpleIcon from "@/assets/images/pencil-outline-purple.svg";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useParams } from "react-router-dom";
import { useCourseDetailsMutation } from "../../../redux/api/instructor/courses";
import { toast } from "react-toastify";

const metaTags = [
  { name: "Metaname1", content: "content1" },
  { name: "Metaname2", content: "content2" },
];

export function Component() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { courseId } = useParams();
  const [courseDetails, setCourseDetails] = useState(null);
  const { user } = useSelector((state) => state.instructorUser);

  const [
    getCourseDetails,
    {
      isSuccess: isCourseDetailsSuccess,
      data: courseDetailsData,
      isError: isCourseDetailsError,
      error: CourseDetailsError,
    },
  ] = useCourseDetailsMutation();

  /*
  useEffect(() => {
    if (isCourseDetailsSuccess && courseDetailsData) {
      toast.success(courseDetailsData?.message);
    }
  }, [courseDetailsData, isCourseDetailsSuccess]);
  */

  useEffect(() => {
    if (isCourseDetailsError && CourseDetailsError) {
      toast.error(CourseDetailsError?.data?.message);
    }
  }, [CourseDetailsError, isCourseDetailsError]);

  useEffect(() => {
    async function fetchData() {
      const response = await getCourseDetails({ courseId });
      setCourseDetails(response.data.data);
    }
    fetchData();
  }, [courseId, getCourseDetails]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const getLessonContent = useMemo(() => {
    const items = courseDetails?.courseContent.map((item, index) => (
      //console.log(item.lessonType)
      <TableRow key={index}>
        <TableCell width={50}>{index}</TableCell>
        <TableCell>
          <p className="subTextTwo fontWeight-500">{item?.title}</p>
        </TableCell>
        <TableCell width={50}>
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            sx={{
              color: "var(--secondary-Main)",
              opacity: 0.5,
            }}
          >
            <MoreHorizIcon />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
        </TableCell>
      </TableRow>
    ));

    return items;
  }, [courseDetails?.courseContent]);

  const getTopStudentContent = useMemo(() => {
    const items = courseDetails?.topStudents.map((item, index) => (
      <TableRow key={index}>
        <TableCell className="courseNameTd">
          <List disablePadding>
            <ListItem disableGutters disablePadding>
              <ListItemAvatar>
                <Avatar alt="P" src={item?.profilePicture} />
              </ListItemAvatar>
              <ListItemText primary={item?.fullName} />
            </ListItem>
          </List>
        </TableCell>
        <TableCell className="progressTd">
          <p className="mb-0">{item?.progress}%</p>
          <LinearProgress variant="determinate" value={item?.progress} />
        </TableCell>
        <TableCell align="right">
          <p className="subTextTwo fontWeight-500">{item?.testScore}</p>
        </TableCell>
      </TableRow>
    ));
    return items;
  }, [courseDetails?.topStudents]);

  return (
    <AuthGuard>
      <Seo title="Login" metaName="Metaname" metaTags={metaTags}>
        <div className="mainDashboardArea">
          <Grid container>
            <Grid
              className="instDashLeft"
              item
              sx={{ width: "calc(100% - 366px)", paddingRight: "64px" }}
            >
              <Grid
                container
                className="layoutHead"
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Grid item xs={12} sm={8}>
                  <Grid item container alignItems={"center"} columnGap={"20px"}>
                    <Link to="/instructor/course" className="backBtn">
                      <ArrowBackIcon />
                    </Link>
                    <h4>Course Detail</h4>
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={4} paddingTop={{ xs: 3, sm: 0 }}>
                  <Grid
                    item
                    container
                    justifyContent={{ xs: "flex-start", sm: "flex-end" }}
                  >
                    <Grid item xs={12} sm="auto">
                      <div
                        className="newCoursebtndiv"
                        style={
                          courseDetails?.courseApprovalStatus === "APPROVED" ||
                          courseDetails?.courseApprovalStatus === "REJECTED"
                            ? null
                            : { pointerEvents: "none", opacity: 0.4 }
                        }
                      >
                        <Link
                          to={`/instructor/course/edit-course/${courseId}`}
                          className="lightBtn fullWidth"
                        >
                          <img src={penciloutlinepurpleIcon} />
                          Edit Course
                        </Link>
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              <Grid
                item
                container
                justifyContent={"center"}
                display={
                  courseDetails?.courseApprovalStatus === "APPROVED"
                    ? "hide"
                    : ""
                }
                paddingTop={{ xs: 0, sm: 4 }}
                paddingBottom={3}
              >
                <Grid item>
                  <Box className="courseStatus">
                    {courseDetails?.courseApprovalStatus === "APPROVED" ||
                    courseDetails?.courseApprovalStatus === "REJECTED" ? (
                      courseDetails?.courseApprovalStatus === "REJECTED" ? (
                        <Alert severity="error" variant="outlined">
                          This course is rejected by admin
                        </Alert>
                      ) : null
                    ) : (
                      <Alert severity="warning" variant="outlined">
                        This course is under review and can't be edited now
                      </Alert>
                    )}
                  </Box>
                </Grid>
              </Grid>

              <Grid
                item
                container
                spacing={3}
                paddingTop={{ xs: 0, sm: 4 }}
                paddingBottom={5}
              >
                <Grid item width={{ xs: "100%", sm: 361 }}>
                  <Box className="courseCoverBox">
                    {/* <List disablePadding>
                      <ListItem>{courseDetails?.title}</ListItem>
                      <ListItem disablePadding disableGutters>
                        <ListItemAvatar>
                          <Avatar src={courseDetails?.image} />
                        </ListItemAvatar>
                        <ListItemText primary={user?.fullName} />
                      </ListItem>
                    </List> */}
                    <Avatar src={courseDetails?.image} />
                  </Box>
                </Grid>
                <Grid
                  item
                  sx={{ width: { xs: "100%", sm: "calc(100% - 361px)" } }}
                >
                  <Grid item container>
                    <Grid item xs={12}>
                      <p className="mainText fontWeight-700">
                        {courseDetails?.title}
                      </p>
                      <p className="subTextTwo">
                        {courseDetails?.description}{" "}
                        <Link className="color-primary fontWeight-500">
                          Read More
                        </Link>
                      </p>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid item container paddingTop={4}>
                        <Grid item xs={6}>
                          <p className="subTextTwo fontWeight-500 mb-0">
                            Language
                          </p>
                          <p className="subTextTwo color-secondary-light">
                            {courseDetails?.language}
                          </p>
                        </Grid>
                        <Grid item xs={6}>
                          <p className="subTextTwo fontWeight-500 mb-0">
                            Skill Level
                          </p>
                          <p className="subTextTwo color-secondary-light">
                            {courseDetails?.skillLevel}
                          </p>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item container spacing={3}>
                <Grid item xs={12} sm={6} md={6} lg={4}>
                  <Grid item container sx={{ padding: "24px 16px" }}>
                    <Grid item xs={12}>
                      <Grid
                        item
                        container
                        justifyContent={"space-between"}
                        marginBottom={2}
                      >
                        <Grid item>
                          <h4 className="color-primary fontWeight-500">
                            {courseDetails?.totalRevenue}
                          </h4>
                        </Grid>
                        <Grid item>
                          <img src={revenuLightIcon} />
                        </Grid>
                      </Grid>
                      <Grid item container justifyContent={"space-between"}>
                        <Grid item>
                          <p className="subTextOne fontWeight-700">
                            Total Earnings
                          </p>
                        </Grid>
                        <Grid item>
                          <img src={dashGraphIcon} />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={4}>
                  <Grid item container sx={{ padding: "24px 16px" }}>
                    <Grid item xs={12}>
                      <Grid
                        item
                        container
                        justifyContent={"space-between"}
                        marginBottom={2}
                      >
                        <Grid item>
                          <h4 className="color-primary fontWeight-500">
                            {courseDetails?.averageRating}
                          </h4>
                        </Grid>
                        <Grid item>
                          <img src={profileratingLightIcon} />
                        </Grid>
                      </Grid>
                      <Grid item container justifyContent={"space-between"}>
                        <Grid item>
                          <p className="subTextOne fontWeight-700">
                            Average Rating
                          </p>
                        </Grid>
                        <Grid item>
                          <img src={dashGraphIcon} />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={4}>
                  <Grid item container sx={{ padding: "24px 16px" }}>
                    <Grid item xs={12}>
                      <Grid
                        item
                        container
                        justifyContent={"space-between"}
                        marginBottom={2}
                      >
                        <Grid item>
                          <h4 className="color-primary fontWeight-500">
                            5,622
                          </h4>
                        </Grid>
                        <Grid item>
                          <img src={studentLightIcon} />
                        </Grid>
                      </Grid>
                      <Grid item container justifyContent={"space-between"}>
                        <Grid item>
                          <p className="subTextOne fontWeight-700">
                            Students Enrolled
                          </p>
                        </Grid>
                        <Grid item>
                          <img src={dashGraphIcon} />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item container spacing={3} marginTop={5}>
                <Grid item xs={12} md={12} lg={5} xl={4}>
                  <p className="mainText fontWeight-700">Course Content</p>
                  <Grid
                    item
                    container
                    spacing={1}
                    xs={12}
                    sx={{ marginTop: "26px" }}
                  >
                    <Box
                      className="tableContainer courseListTable responsiveTable"
                      sx={{ width: "100%" }}
                    >
                      <TableContainer>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell align="left" width={50}>
                                No
                              </TableCell>
                              <TableCell align="left">Title</TableCell>
                              <TableCell align="left" width={50}></TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>{getLessonContent}</TableBody>
                        </Table>
                      </TableContainer>
                    </Box>
                  </Grid>
                </Grid>
                <Grid item xs={12} md={12} lg={7} xl={8}>
                  <p className="mainText fontWeight-700">Top Student</p>
                  <Grid
                    item
                    container
                    spacing={1}
                    xs={12}
                    sx={{ marginTop: "26px" }}
                  >
                    <Box
                      className="tableContainer topStudentListTable responsiveTable"
                      sx={{ width: "100%" }}
                    >
                      <TableContainer>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell align="left">Student</TableCell>
                              <TableCell align="left">Progress</TableCell>
                              <TableCell align="right">Test Score</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>{getTopStudentContent}</TableBody>
                        </Table>
                      </TableContainer>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid className="instDashRight" item width={366}>
              <Grid item container className="rightWidgets">
                <p className="mainText fontWeight-700">Top Student Location</p>
                {/* If no data Available */}
                {/* <Grid item xs={12}>
                  <Grid
                    item
                    container
                    className="rightWidgetsInner"
                    flexDirection={"column"}
                    alignItems={"center"}
                    justifyContent={"center"}
                  >
                    <p className="mainText fontWeight-500">No data to show</p>
                  </Grid>
                </Grid> */}
                {/* If no data Available */}
                <Grid item xs={12}>
                  <Grid
                    className="customStudentProgress"
                    marginTop={2}
                    item
                    container
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
                    <Grid item className="progressBlock" width={"30%"}>
                      <Grid
                        item
                        container
                        justifyContent={"space-between"}
                        width={"100%"}
                      >
                        <Grid item>
                          <Grid
                            item
                            container
                            columnGap={1}
                            alignItems={"center"}
                          >
                            <Grid item>
                              <img src={indonesiaFlag} />
                            </Grid>
                            <Grid item>
                              <p className="subTextTwo">Indonesia</p>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item>
                          <p className="subTextTwo">3,551</p>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid className="progressValue" item width={50}>
                      <p className="subTextTwo">30%</p>
                    </Grid>
                  </Grid>
                  <Grid
                    className="customStudentProgress"
                    marginTop={2}
                    item
                    container
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
                    <Grid item className="progressBlock" width={"20%"}>
                      <Grid
                        item
                        container
                        justifyContent={"space-between"}
                        width={"100%"}
                      >
                        <Grid item>
                          <Grid
                            item
                            container
                            columnGap={1}
                            alignItems={"center"}
                          >
                            <Grid item>
                              <img src={vietnamFlag} />
                            </Grid>
                            <Grid item>
                              <p className="subTextTwo">Vietnam</p>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item>
                          <p className="subTextTwo">2,951</p>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid className="progressValue" item width={50}>
                      <p className="subTextTwo">20%</p>
                    </Grid>
                  </Grid>
                  <Grid
                    className="customStudentProgress"
                    marginTop={2}
                    item
                    container
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
                    <Grid item className="progressBlock" width={"15%"}>
                      <Grid
                        item
                        container
                        justifyContent={"space-between"}
                        width={"100%"}
                      >
                        <Grid item>
                          <Grid
                            item
                            container
                            columnGap={1}
                            alignItems={"center"}
                          >
                            <Grid item>
                              <img src={usFlag} />
                            </Grid>
                            <Grid item>
                              <p className="subTextTwo">United States</p>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item>
                          <p className="subTextTwo">2,951</p>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid className="progressValue" item width={50}>
                      <p className="subTextTwo">15%</p>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item container className="rightWidgets">
                <p className="mainText fontWeight-700">Enrollment</p>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </Seo>
    </AuthGuard>
  );
}

Component.displayName = "InstructorCourseDetails";
