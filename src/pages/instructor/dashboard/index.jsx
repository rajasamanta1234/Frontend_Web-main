import { AuthGuard } from "../../../guards/instructor/auth-guard";
import Seo from "@/components/common/seo";

import "../../../assets/css/instructor-dashboard/style.css";
import "../../../assets/css/instructor-dashboard/responsive.css";

import dashGraphIcon from "@/assets/images/dash-graph.svg";
import revenuLightIcon from "@/assets/images/revenu-light.svg";
import profileratingLightIcon from "@/assets/images/profile-rating-light.svg";
import studentLightIcon from "@/assets/images/studentIcon-light.svg";
import videoIcon from "@/assets/images/video-icon.svg";
import {
  Avatar,
  Box,
  Chip,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { items } from "../../../components/student/navbar-with-auth";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import React, { useEffect, useState } from "react";
import eyeLightIcon from "@/assets/images/eye-light.svg";
import indonesiaFlag from "@/assets/images/indonesia.png";
import vietnamFlag from "@/assets/images/vietnam.png";
import usFlag from "@/assets/images/us.png";
import erningBg from "@/assets/images/erning-bg.svg";
import {
  useGetAccountInfoMutation,
  useGetAllStatusMutation,
  useGetInstructorStatisticsMutation,
} from "../../../redux/api/instructor/auth";
import moment from "moment";
import { PieChart } from "../../../components/Charts/PieChart";
import { Barchart } from "../../../components/Charts/BarChart";
import { FormControl, Select } from "@mui/base";

const metaTags = [
  { name: "Metaname1", content: "content1" },
  { name: "Metaname2", content: "content2" },
];

export function Component() {
  const location = useLocation();
  const [getDetails, { isLoading, isSuccess, data }] =
    useGetInstructorStatisticsMutation();
  const [
    getBallanceSheet,
    {
      isLoading: ballanceLoading,
      isSuccess: ballanceSuccess,
      data: ballanceData,
    },
  ] = useGetAccountInfoMutation();
  const [
    getAllStatus,
    { isLoading: statusLoading, isSuccess: statusSuccess, data: statusData },
  ] = useGetAllStatusMutation();
  const { user } = useSelector((state) => state.instructorUser);
  const a = items?.find((e) => {
    return location.pathname === e.path;
  });
  const [statics, setStatistic] = useState({});
  const [ballancesheet, setBallanceSheet] = useState({});
  const [statussheet, setStatusSheet] = useState({});

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    getDetails();
    getBallanceSheet();
    getAllStatus();
    if (isSuccess) {
      setStatistic(data?.data);
    }
    if (ballanceSuccess) {
      setBallanceSheet(ballanceData?.data);
    }
    if (statusSuccess) {
      setStatusSheet(statusData?.data);
    }
  }, []);
  useEffect(() => {
    if (isSuccess) {
      setStatistic(data?.data);
    }
    if (ballanceSuccess) {
      setBallanceSheet(ballanceData?.data);
    }
    if (statusSuccess) {
      setStatusSheet(statusData?.data);
    }
  }, [isSuccess, ballanceSuccess, statusSuccess]);

  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <AuthGuard>
      <Seo title="Dashboard" metaName="Metaname" metaTags={metaTags}>
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
                rowGap={1}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Grid item xs={12} sm={8}>
                  {location.pathname == "/instructor/dashboard" && (
                    <h4>
                      Hi, <strong> {user?.fullName}</strong> 😄
                    </h4>
                  )}
                  <div className="subPageTitleWithShort">
                    <div className="titleBlock">
                      <h4>{a?.title}</h4>
                    </div>
                    {/* <div className="dateRangeBlock"></div> */}
                  </div>
                </Grid>
                <Grid item xs={12} sm={4} paddingTop={{ xs: 3, sm: 0 }}>
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
              <Grid item container spacing={3}>
                <Grid item xs={12} sm={6} md={6} lg={4}>
                  <Grid
                    item
                    container
                    sx={{
                      padding: "24px 16px",
                      boxShadow: "0px 10px 32px 0px rgba(63,63,68,0.10)",
                      background: "#fff",
                      borderRadius: "8px",
                    }}
                  >
                    <Grid item xs={12}>
                      <Grid
                        item
                        container
                        justifyContent={"space-between"}
                        marginBottom={2}
                      >
                        <Grid item>
                          <h4 className="color-primary fontWeight-500">
                            ${statics?.revenue || 0}
                          </h4>
                        </Grid>
                        <Grid item>
                          <img src={revenuLightIcon} />
                        </Grid>
                      </Grid>
                      <Grid item container justifyContent={"space-between"}>
                        <Grid item>
                          <p className="subTextOne fontWeight-700">Revenue</p>
                        </Grid>
                        <Grid item>
                          <img src={dashGraphIcon} />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={4}>
                  <Grid
                    item
                    container
                    sx={{
                      padding: "24px 16px",
                      boxShadow: "0px 10px 32px 0px rgba(63,63,68,0.10)",
                      background: "#fff",
                      borderRadius: "8px",
                    }}
                  >
                    <Grid item xs={12}>
                      <Grid
                        item
                        container
                        justifyContent={"space-between"}
                        marginBottom={2}
                      >
                        <Grid item>
                          <h4 className="color-primary fontWeight-500">
                            {statics?.average_rating || 0}
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
                  <Grid
                    item
                    container
                    sx={{
                      padding: "24px 16px",
                      boxShadow: "0px 10px 32px 0px rgba(63,63,68,0.10)",
                      background: "#fff",
                      borderRadius: "8px",
                    }}
                  >
                    <Grid item xs={12}>
                      <Grid
                        item
                        container
                        justifyContent={"space-between"}
                        marginBottom={2}
                      >
                        <Grid item>
                          <h4 className="color-primary fontWeight-500">
                            {statics?.students_enrolled || 0}
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

              <Grid item container marginTop={7}>
                <Grid item xs={12}>
                  <Grid
                    item
                    container
                    justifyContent={"space-between"}
                    alignItems={'center'}
                    paddingBottom={2}
                  >
                    <Grid item>
                      <p className="mainText fontWeight-700">
                        Earning Overview
                      </p>
                    </Grid>
                    <Grid item>
                      <select className="form-control earningOverviewSelect">
                        <option>Last 12 Month</option>
                        <option>Last 24 Month</option>
                      </select>
                    </Grid>
                  </Grid>
                </Grid>
                <Barchart />
              </Grid>

              {/* If no data Available */}

              {/* <Grid item container>


                <Grid item xs={12}>
                  <Grid
                    item
                    container
                    sx={{
                      minHeight: "calc(100vh - 280px)",
                      maxWidth: "415px",
                      margin: "0 auto",
                    }}
                    flexDirection={"column"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    className="nodataAvailableBlock"
                  >
                    {location.pathname == "/instructor/dashboard" && (
                      <p className="mainText textCenter">
                        Hi {user?.fullName} 👋, your profile is under review.
                        Please look out for our response via the email address
                        you provided.
                      </p>
                    )}
                  </Grid>
                </Grid>


              </Grid> */}

              {/* If no data Available */}

              <Grid item container spacing={3} marginTop={7}>
                <Grid item xs={12} md={12} lg={5} xl={4}>
                  <Grid
                    item
                    container
                    sx={{
                      padding: "24px 16px",
                      boxShadow: "0px 10px 32px 0px rgba(63,63,68,0.10)",
                      background: "#fff",
                      borderRadius: "16px",
                    }}
                  >
                    <Grid item xs={12}>
                      <Grid
                        item
                        container
                        justifyContent={"space-between"}
                        alignItems={"center"}
                      >
                        <p className="mainText fontWeight-700">Course Stat</p>
                        {/* <IconButton
                          aria-label="more"
                          id="long-button"
                          aria-controls={open ? "long-menu" : undefined}
                          aria-expanded={open ? "true" : undefined}
                          aria-haspopup="true"
                          onClick={handleClick}
                        >
                          <MoreVertIcon />
                        </IconButton>
                        <Menu
                          id="long-menu"
                          MenuListProps={{
                            "aria-labelledby": "long-button",
                          }}
                          anchorEl={anchorEl}
                          open={open}
                          onClose={handleClose}
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                          }}
                          transformOrigin={{
                            vertical: "top",
                            horizontal: "right",
                          }}
                        >
                          <MenuItem onClick={handleClose}>Profile</MenuItem>
                          <MenuItem onClick={handleClose}>My account</MenuItem>
                          <MenuItem onClick={handleClose}>Logout</MenuItem>
                        </Menu> */}

                        <PieChart />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={12}
                  lg={7}
                  xl={8}
                  className="dashWeeklySales"
                >
                  <p className="mainText fontWeight-700">Weekly Sales Stats</p>
                  <Grid
                    item
                    container
                    spacing={1}
                    className="topBlock"
                    sx={{ marginTop: "26px" }}
                  >
                    <Grid item xs={6} sm={7}>
                      <p className="subTextTwo">Course</p>
                    </Grid>
                    <Grid item xs={2} sm={2}>
                      <p className="subTextTwo">Sale</p>
                    </Grid>
                    <Grid item xs={4} sm={3}>
                      <p className="subTextTwo">Earnings</p>
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    container
                    spacing={1}
                    className="bodyBlock"
                    sx={{ marginTop: "16px" }}
                  >
                    <Grid item xs={12}>
                      {statussheet?.weekly_sale_status?.length > 0 &&
                        statussheet?.weekly_sale_status.map((it, ind) => {
                          return (
                            <Grid
                              item
                              container
                              alignItems={"center"}
                              spacing={1}
                              key={ind}
                            >
                              <Grid item xs={6} sm={7}>
                                <List disablePadding>
                                  <ListItem disableGutters>
                                    <ListItemAvatar>
                                      <Avatar src={it?.image} />
                                    </ListItemAvatar>
                                    <ListItemText primary={it?.title} />
                                  </ListItem>
                                </List>
                              </Grid>
                              <Grid item xs={2} sm={2}>
                                <p className="subTextTwo">{it?.sale}</p>
                              </Grid>
                              <Grid item xs={4} sm={3}>
                                <Chip size="small" label={"$" + it?.earnings} />
                              </Grid>
                            </Grid>
                          );
                        })}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid className="instDashRight" item width={366}>
              <Grid item container className="insinstructorWallet">
                {/* Old Design */}
                {/* <Grid item xs={12}>
                  <Grid
                    item
                    container
                    className="topWallet"
                    sx={{ padding: "24px 32px 22px" }}
                  >
                    <Grid item xs={12}>
                      <Grid
                        item
                        container
                        justifyContent={"space-between"}
                        marginBottom={3}
                      >
                        <Grid item>
                          <p className="mainText fontWeight-700">Wallet</p>
                        </Grid>
                        <Grid item>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="36"
                            height="20"
                            viewBox="0 0 36 20"
                            fill="none"
                          >
                            <path
                              d="M2 18L6.68864 13.3684L10.5248 15.8947L18.6873 7.47368L24.5907 12.5263L34 2"
                              stroke="url(#paint0_linear_1599_16086)"
                              strokeWidth="3"
                              strokeLinecap="round"
                            />
                            <defs>
                              <linearGradient
                                id="paint0_linear_1599_16086"
                                x1="35.2308"
                                y1="2.42106"
                                x2="-8.67422"
                                y2="23.0035"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop stopColor="#3F3F44" />
                                <stop
                                  offset="1"
                                  stopColor="#3F3F44"
                                  stopOpacity="0"
                                />
                              </linearGradient>
                            </defs>
                          </svg>
                        </Grid>
                      </Grid>
                      <Grid item container justifyContent={"space-between"}>
                        <Grid item>
                          <p className="subTextTwo fontWeight-300">
                            Today Earning
                          </p>
                          <h4 className="fontWeight-300">$0</h4>
                        </Grid>
                        <Grid item>
                          <p className="subTextTwo fontWeight-300">Pending</p>
                          <h4 className="fontWeight-300 colorOrange">$0</h4>
                        </Grid>
                        <Grid item>
                          <p className="subTextTwo fontWeight-300">In Review</p>
                          <h4 className="fontWeight-300">$0</h4>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    container
                    className="bottomWallet"
                    alignItems={"center"}
                    justifyContent={"space-between"}
                  >
                    <Grid item>
                      <p>Available</p>
                      <h4 className="fontWeight-500">$0</h4>
                    </Grid>
                    <Grid item>
                      <Link className="orangeBtn">Withdraw</Link>
                    </Grid>
                  </Grid>
                </Grid> */}
                {/* Old Design */}

                <Grid item xs={12}>
                  <Grid item container flexDirection={"column"} rowGap={"17px"}>
                    <Box>
                      <Grid
                        item
                        container
                        justifyContent={"space-between"}
                        alignItems={"center"}
                      >
                        <Grid item>
                          <h3 className="fontWeight-700 mb-0">
                            ${ballancesheet?.today_earnings}
                          </h3>
                          <p className="subTextOne">Available Balance</p>
                        </Grid>
                        <Grid item>
                          <button className="lightBtnSmall">Withdraw</button>
                        </Grid>
                      </Grid>
                    </Box>
                    {ballancesheet?.earnings_details?.length > 0 &&
                      ballancesheet?.earnings_details.map((it, ind) => {
                        return (
                          <Box className="amountBalance" key={ind}>
                            <Grid
                              item
                              container
                              justifyContent={"space-between"}
                            >
                              <Grid item>
                                <h5>${it?.amount}</h5>
                                <p className="subTextOne">{it?.title}</p>
                              </Grid>
                              <Grid item>
                                <img src={erningBg} />
                              </Grid>
                            </Grid>
                          </Box>
                        );
                      })}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item container className="rightWidgets" paddingBottom={5}>
                <p className="mainText fontWeight-700">
                  My Top Performing Course
                </p>
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
                  <List className="dashRightList" disablePadding>
                    {statussheet?.top_performing_courses?.length > 0 &&
                      statussheet?.top_performing_courses.map((it, ind) => {
                        return (
                          <ListItem
                            key={ind}
                            disableGutters
                            secondaryAction={
                              <p className="subTextTwo">
                                <img src={eyeLightIcon} />
                                &nbsp; {it?.view}
                              </p>
                            }
                          >
                            <ListItemAvatar>
                              <img src={it?.image} />
                            </ListItemAvatar>
                            <ListItemText
                              primary={it?.title}
                              secondary={moment(it?.date).fromNow()}
                            />
                          </ListItem>
                        );
                      })}
                  </List>
                </Grid>
              </Grid>
              <Divider
                sx={{ borderColor: "rgba(63, 63, 68, 0.9)", opacity: "10%" }}
              />
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
                  {statussheet?.top_student_location?.length > 0 &&
                    statussheet?.top_student_location.map((it, ind) => {
                      return (
                        <Grid
                          key={ind}
                          className="customStudentProgress"
                          marginTop={2}
                          item
                          container
                          justifyContent={"space-between"}
                          alignItems={"center"}
                        >
                          <Grid item sx={{ width: "calc(100% - 50px)" }}>
                            <Box
                              width={it?.percentage}
                              className="progressBlock"
                            >
                              <Grid
                                item
                                container
                                justifyContent={"space-between"}
                                alignItems={"center"}
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
                                      <img src={it?.flag_img} />
                                    </Grid>
                                    <Grid item>
                                      <p className="subTextTwo">
                                        {it?.country}
                                      </p>
                                    </Grid>
                                  </Grid>
                                </Grid>
                                <Grid item>
                                  <p className="subTextTwo">{it?.people}</p>
                                </Grid>
                              </Grid>
                            </Box>
                          </Grid>
                          <Grid className="progressValue" item width={50}>
                            <p className="subTextTwo">{it?.percentage}</p>
                          </Grid>
                        </Grid>
                      );
                    })}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </Seo>
    </AuthGuard>
  );
}

Component.displayName = "InstructorDashboard";
