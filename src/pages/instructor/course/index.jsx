import { AuthGuard } from "../../../guards/instructor/auth-guard";
import Seo from "@/components/common/seo";

import "../../../assets/css/instructor-dashboard/style.css";
import "../../../assets/css/instructor-dashboard/responsive.css";

import dashGraphIcon from "@/assets/images/dash-graph.svg";
import revenuIcon from "@/assets/images/revenu.svg";
import profileratingIcon from "@/assets/images/profile-rating.svg";
import studentIcon from "@/assets/images/studentIcon.svg";
import videoIcon from "@/assets/images/video-icon.svg";
import {
  Avatar,
  Box,
  Chip,
  FormControl,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Menu,
  MenuItem,
  Pagination,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { items } from "../../../components/student/navbar-with-auth";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import React, { useEffect, useState, useMemo } from "react";
import eyeLightIcon from "@/assets/images/eye-light.svg";
import indonesiaFlag from "@/assets/images/indonesia.png";
import vietnamFlag from "@/assets/images/vietnam.png";
import usFlag from "@/assets/images/us.png";
import erningBg from "@/assets/images/erning-bg.svg";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useCoursesListMutation } from "../../../redux/api/instructor/courses";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const metaTags = [
  { name: "Metaname1", content: "content1" },
  { name: "Metaname2", content: "content2" },
];

export function Component() {
  const location = useLocation();
  const { user } = useSelector((state) => state.instructorUser);
  const a = items?.find((e) => {
    return location.pathname === e.path;
  });
  const navigateTo = useNavigate();

  const [age, setAge] = React.useState("");
  const [page, setPage] = React.useState(1);

  const [coursesList, setCoursesList] = useState();
  const [pageSize, setPageSize] = useState(10);
  const [menuitem,setMentitem]=useState([])

  const [
    getCourses,
    {
      isSuccess: isGetCoursesSuccess,
      data: getCoursesData,
      isError: isGetCoursesError,
      error: getCoursesError,
    },
  ] = useCoursesListMutation();

  useEffect(() => {
    fetchData(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  // useEffect(() => {
  //   if (isGetCoursesSuccess && getCoursesData) {
  //     toast.success(
  //       /* getCoursesData?.message */ "Courses fetched successfully"
  //     );
  //   }
  // }, [getCoursesData, isGetCoursesSuccess]);

  useEffect(() => {
    if (isGetCoursesError && getCoursesError) {
      toast.error(getCoursesError?.data?.message);
    }
  }, [isGetCoursesError, getCoursesError]);

  async function fetchData(page, limit,sortBy) {
  
      const response = await getCourses({ page:page?page:1, limit: limit ?? pageSize ,sortBy:sortBy?sortBy:""});
      setCoursesList(response.data.data);
      setMentitem(response.data.data)
   
   
  }

  const handleChange = async(event) => {
    setAge(event.target.value);
    fetchData(page,null,event.target.value);

  };
  console.log("age",age)

  const handleChangePagination = (event, value) => {
    event.preventDefault();
    setPage(value);
    fetchData(value);
    setAge([])
    setMentitem([])
  };

  const onCourseClick = (e, courseUniqueId) => {
    e.preventDefault();
    navigateTo(`/instructor/course/course-details/${courseUniqueId}`);
  };

  const getTableContent = useMemo(() => {
    const rows = coursesList?.rows.map((row, index) => {
      return (
        <TableRow
          key={index}
          onClick={(e) => onCourseClick(e, row.courseUniqueId)}
          sx={{ cursor: "pointer" }}
        >
          <TableCell className="courseNameTd">
            <List disablePadding>
              <ListItem disableGutters disablePadding>
                <ListItemAvatar>
                  <Avatar alt="P" src={row.image} />
                </ListItemAvatar>
                <ListItemText primary={row.title} />
              </ListItem>
            </List>
          </TableCell>

          <TableCell>
            <span className="publishTag">{row.courseApprovalStatus}</span>
          </TableCell>
          <TableCell>
            <Chip label={`$${row.price}`} />
          </TableCell>
          <TableCell>{row.totalSales}</TableCell>
          <TableCell>
            <Grid container alignItems={"center"} columnGap={"12px"}>
              <Grid item>{row.totalRevenue}</Grid>
              <Grid item>
                <img src={dashGraphIcon} />
              </Grid>
            </Grid>
          </TableCell>
          {/* </Link> */}
        </TableRow>
      );
    });

    return rows;
  }, [coursesList]);

const menuitemdata= [...new Set (menuitem?.rows?.map((it)=>it.courseApprovalStatus))]
console.log("coursesList1",menuitemdata)

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
                paddingBottom: { xs: "30px", sm: 7 },
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
                    {/* <Link to="#" className="backBtn">
                                            <ArrowBackIcon />
                                        </Link> */}
                    <h4>My Courses</h4>
                  </Grid>
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
                          to={"/instructor/course/new-course"}
                          className="lightBtn fullWidth"
                        >
                          <AddIcon />
                          New Course
                        </Link>
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              <Grid
                className="courseFilter"
                item
                container
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Grid item>
                  <p className="mainText fontWeight-700">Course List</p>
                </Grid>
                <Grid item>
                  <Grid item container columnGap={1}>
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                   
                      <Select
                         value={age}
                        onChange={(event)=>handleChange(event)}
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                      >
                         <MenuItem value="">Sort by</MenuItem>
                         {menuitemdata.map((it) => (
                          <MenuItem key={it} value={it}>
                            {it}
                          </MenuItem>
                          ))}

                        {/* <MenuItem value="">Sort by</MenuItem>
                        <MenuItem value={10}>Course Name</MenuItem>
                        <MenuItem value={20}>Status</MenuItem> */}
                      </Select>
                    </FormControl>

                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                      <Select
                        value={age}
                        onChange={handleChange}
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                      >
                        <MenuItem value="">Last 12 Month</MenuItem>
                        <MenuItem value={10}>Last 6 Month</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item container>
                <Grid item xs={12}>
                  <Box className="tableContainer courseListTable responsiveTable">
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell align="left">Course Name</TableCell>
                            <TableCell align="left">Status</TableCell>
                            <TableCell align="left">Price</TableCell>
                            <TableCell align="left">Total Sales</TableCell>
                            <TableCell align="left">Total Revenue</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>{getTableContent}</TableBody>
                      </Table>
                    </TableContainer>
                  </Box>
                </Grid>
                <Grid item xs={12} paddingTop={3}>
                  <Grid
                    className="tablePagination"
                    item
                    container
                    justifyContent={{ xs: "center", md: "space-between" }}
                    alignItems={"center"}
                    gap={{ xs: 2, md: 0 }}
                  >
                    <Grid item xs={12} md="auto">
                      <Grid
                        item
                        container
                        columnGap={2}
                        alignItems={"center"}
                        justifyContent={{ xs: "center", md: "space-between" }}
                      >
                        <p className="subTextTwo mb-0">View</p>
                        <select
                          onChange={(_e) => {
                            setPageSize(parseInt(_e.target.value));
                            fetchData(1, parseInt(_e.target.value));
                          }}
                        >
                          <option value={10}>10</option>
                          <option value={20}>20</option>
                        </select>
                        <p className="subTextTwo mb-0">records per page</p>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} md="auto">
                      <Pagination
                        count={Math.ceil(coursesList?.count / pageSize)}
                        page={page}
                        onChange={handleChangePagination}
                      />
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
                          <h3 className="fontWeight-700 mb-0 color-Neutral-800">
                            $168.50
                          </h3>
                          <p className="subTextOne color-Neutral-800">
                            Available Balance
                          </p>
                        </Grid>
                        <Grid item>
                          <button className="lightBtnSmall">Withdraw</button>
                        </Grid>
                      </Grid>
                    </Box>
                    <Box className="amountBalance">
                      <Grid item container justifyContent={"space-between"}>
                        <Grid item>
                          <h5 className="color-Neutral-800">$75.90</h5>
                          <p className="subTextOne color-Neutral-800">
                            Today’s Earning
                          </p>
                        </Grid>
                        <Grid item>
                          <img src={erningBg} />
                        </Grid>
                      </Grid>
                    </Box>
                    <Box className="amountBalance">
                      <Grid item container justifyContent={"space-between"}>
                        <Grid item>
                          <h5 className="color-Neutral-800">$125</h5>
                          <p className="subTextOne color-Neutral-800">
                            Pending Payout
                          </p>
                        </Grid>
                        <Grid item>
                          <img src={erningBg} />
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item container className="rightWidgets">
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
                    <ListItem
                      disableGutters
                      secondaryAction={
                        <p className="subTextTwo">
                          <img src={eyeLightIcon} />
                          &nbsp; 2,440
                        </p>
                      }
                    >
                      <ListItemAvatar>
                        <Avatar>G</Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary="Get Started with Figjam"
                        secondary="2 months ago"
                      />
                    </ListItem>
                    <ListItem
                      disableGutters
                      secondaryAction={
                        <p className="subTextTwo">
                          <img src={eyeLightIcon} />
                          &nbsp; 1,947
                        </p>
                      }
                    >
                      <ListItemAvatar>
                        <Avatar>P</Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary="Principle Advanced Prototyping"
                        secondary="3 months ago"
                      />
                    </ListItem>
                    <ListItem
                      disableGutters
                      secondaryAction={
                        <p className="subTextTwo">
                          <img src={eyeLightIcon} />
                          &nbsp; 1,731
                        </p>
                      }
                    >
                      <ListItemAvatar>
                        <Avatar>S</Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary="Sketch 101 - UI Design"
                        secondary="2 months ago"
                      />
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
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
                    <Grid item sx={{ width: "calc(100% - 50px)" }}>
                      <Box width={"30%"} className="progressBlock">
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
                                <img src={indonesiaFlag} />
                              </Grid>
                              <Grid item>
                                <p className="subTextTwo">Indonesia</p>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item>
                            <p className="subTextTwo">3551</p>
                          </Grid>
                        </Grid>
                      </Box>
                    </Grid>
                    <Grid className="progressValue" item width={50}>
                      <p className="subTextTwo">60%</p>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </Seo>
    </AuthGuard>
  );
}

Component.displayName = "InstructorCourse";
