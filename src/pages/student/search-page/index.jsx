import { useDispatch, useSelector } from "react-redux";
import { AuthGuard } from "../../../guards/student/auth-guard";
import Seo from "@/components/common/seo";
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
import sparklesIcon from "@/assets/images/sparkles-one.svg";
import taskpurpleIcon from "@/assets/images/task-purple-icon.svg";

import avatardemo from "@/assets/images/avatar-demo.png";
import usersquareIcon from "@/assets/images/user-square.svg";
import settingIcon from "@/assets/images/setting-2.svg";
import messagequestionIcon from "@/assets/images/message-question.svg";
import cardTickIcon from "@/assets/images/card-tick.svg";
import SwapIcon from "@/assets/images/Swap.svg";
import badgecheckIcon from "@/assets/images/badge-check.svg";
import academicCapIcon from "@/assets/images/academic-cap.svg";
import notificationIcon from "@/assets/images/notification.svg";
import sortIcon from "@/assets/images/sort.svg";
import elementIcon from "@/assets/images/element-1.svg";
import rangeIcon from "@/assets/images/range-icon.svg";
import searchnormalblackIcon from "@/assets/images/search-normal-black.svg";
import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  LinearProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Menu,
  MenuItem,
  Tab,
  TextField,
} from "@mui/material";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import StarIcon from "@mui/icons-material/Star";
import styled from "styled-components";

import React, { useEffect, useRef, useState } from "react";
import {
  useGetLearningMutation,
  useGetSearchCourseMutation,
} from "../../../redux/api/student/dashboard";

const metaTags = [
  { name: "Metaname1", content: "content1" },
  { name: "Metaname2", content: "content2" },
];

const top100Films = [
  { title: "React JS", year: 1994 },
  { title: "Angular JS", year: 1972 },
  { title: "PHP", year: 1974 },
];
export function Component() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [getCourseList, { isSuccess, isLoading, data }] =
    useGetSearchCourseMutation();
  const [getLearningOption, { data: dataList }] = useGetLearningMutation();

  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(100);
  const [specialization, setSpecialization] = useState("");
  const [tutorData, setTutorData] = useState([
    {
      type: "UI/UX",
      tutorname: "Emerson Siphron",
    },
    {
      type: "Python",
      tutorname: "Emma Whatson",
    },
    {
      type: "Graphics",
      tutorname: "Camron Grey",
    },
    {
      type: "Figma",
      tutorname: "Graham bell",
    },
    {
      type: "Developer",
      tutorname: "Jhon Doa",
    },
  ]);
  const [courseData, setCourseData] = useState([]);
  const [backupcourseData, setBackupCourseData] = useState([]);
  const [lable, setLable] = useState("All");
  const [shortby, setShortBy] = useState("");

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [anchorElLevel, setAnchorElLevel] = React.useState(null);
  const openLevel = Boolean(anchorElLevel);
  const handleClickLevel = (event) => {
    setAnchorElLevel(event.currentTarget);
  };
  const handleCloseLevel = () => {
    setAnchorElLevel(null);
  };

  const [anchorElSort, setAnchorElSort] = React.useState(null);
  const openSort = Boolean(anchorElSort);
  const handleClickSort = (event) => {
    setAnchorElSort(event.currentTarget);
  };
  const handleCloseSort = () => {
    setAnchorElSort(null);
  };
  const handleOnChange = (event, newValue) => {
    setQuery(newValue);
  };
  const handleSearch = (event) => {
    const searchText = event.target.value;
    setQuery(searchText);

    const filteredCourses = backupcourseData?.filter((course) => {
      const { skillLevel, title, fullName } = course;
      return (
        skillLevel.toLowerCase().includes(searchText.toLowerCase()) ||
        title.toLowerCase().includes(searchText.toLowerCase()) ||
        fullName.toLowerCase().includes(searchText.toLowerCase())
      );
    });

    setCourseData(filteredCourses);
  };
  const searchResultSliderNav = useRef(null);

  const searchResultSlider = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1365,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 650,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  useEffect(() => {
    getLearningOption();
  }, []);
  useEffect(() => {
    getCourseList({
      page: page,
      pagelimit: rowsPerPage,
      specialization: specialization,
      searchkey: query,
      skillLable: lable == "All" ? "" : lable,
      shortBy: shortby,
    });
  }, [page, rowsPerPage, specialization, query, lable, shortby]);

  return (
    <AuthGuard>
      <Seo title="Dashboard" metaName="Metaname" metaTags={metaTags}>
        <div className="mainDashboardArea fullWidth">
          <Box padding={"30px 30px 30px"}>
            <Grid
              container
              className="forMobileUsernameBlock"
              paddingBottom={0}
            >
              <Box className="subPageTitleWithShort">
                <h3>Explore Courses</h3>
              </Box>
            </Grid>
          </Box>
          <Grid container paddingBottom={4} className="customPagePadding">
            <Grid item xs={12}>
              <Grid item container alignItems={"center"}>
                <Grid item xs={12} md={6}>
                  <Box className="searchAutocomplete searchStudentCourse">
                    <Autocomplete
                      freeSolo
                      id="free-solo-2-demo"
                      disableClearable
                      options={[]}
                      // getOptionLabel={(option) => option.title}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Search by course name"
                          InputProps={{
                            ...params.InputProps,
                            type: "search",
                          }}
                          value={query}
                          onChange={handleSearch}
                        />
                      )}
                    />
                    <button>
                      <img src={searchnormalblackIcon} />
                    </button>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Grid
                    item
                    container
                    justifyContent={{ xs: "flex-start", md: "flex-end" }}
                    spacing={{ xs: "10px", md: "20px" }}
                    className="courseSortBtn"
                  >
                    <Grid item>
                      <Box>
                        <Button onClick={handleClick}>
                          <img src={rangeIcon} /> Level
                        </Button>
                        <Menu
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
                          {/* <MenuItem onClick={handleClose}>Profile</MenuItem> */}

                          <Box padding={"20px"}>
                            <Grid
                              item
                              container
                              flexDirection={"column"}
                              gap={"18px"}
                            >
                              <Grid item xs={12}>
                                <p className="subTextOne fontWeight-500 color-Neutral-Black">
                                  By Level
                                </p>
                              </Grid>
                              <Grid item xs={12}>
                                <Grid
                                  item
                                  container
                                  spacing={"20px"}
                                  width={300}
                                >
                                  <Grid item>
                                    <Box className="courseFilterCheckbox">
                                      <input
                                        type="checkbox"
                                        onChange={() => {
                                          if (
                                            lable == "" ||
                                            lable == "Beginner" ||
                                            lable == "Intermediate" ||
                                            lable == "Master"
                                          ) {
                                            setLable("All");
                                          } else {
                                            setLable("");
                                          }
                                        }}
                                        checked={lable === "All"}
                                      />
                                      <span>All</span>
                                    </Box>
                                  </Grid>
                                  <Grid item>
                                    <Box className="courseFilterCheckbox">
                                      <input
                                        type="checkbox"
                                        onChange={() => {
                                          if (
                                            lable == "" ||
                                            lable == "All" ||
                                            lable == "Intermediate" ||
                                            lable == "Master"
                                          ) {
                                            setLable("Beginner");
                                          } else {
                                            setLable("");
                                          }
                                        }}
                                        checked={lable === "Beginner"}
                                      />
                                      <span>Beginner</span>
                                    </Box>
                                  </Grid>
                                  <Grid item>
                                    <Box className="courseFilterCheckbox">
                                      <input
                                        type="checkbox"
                                        onChange={() => {
                                          if (
                                            lable == "" ||
                                            lable == "All" ||
                                            lable == "Beginner" ||
                                            lable == "Master"
                                          ) {
                                            setLable("Intermediate");
                                          } else {
                                            setLable("");
                                          }
                                        }}
                                        checked={lable === "Intermediate"}
                                      />
                                      <span>Intermediate</span>
                                    </Box>
                                  </Grid>
                                  <Grid item>
                                    <Box className="courseFilterCheckbox">
                                      <input
                                        type="checkbox"
                                        onChange={() => {
                                          if (
                                            lable == "" ||
                                            lable == "All" ||
                                            lable == "Beginner" ||
                                            lable == "Intermediate"
                                          ) {
                                            setLable("Master");
                                          } else {
                                            setLable("");
                                          }
                                        }}
                                        checked={
                                          lable == "Master" ? true : false
                                        }
                                      />
                                      <span>Master</span>
                                    </Box>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Box>
                        </Menu>
                      </Box>
                    </Grid>
                    <Grid item>
                      <Box>
                        <Button onClick={handleClickLevel}>
                          <img src={elementIcon} /> Category
                        </Button>
                        <Menu
                          anchorEl={anchorElLevel}
                          open={openLevel}
                          onClose={handleCloseLevel}
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                          }}
                          transformOrigin={{
                            vertical: "top",
                            horizontal: "right",
                          }}
                        >
                          <Box padding={"20px"}>
                            <Grid
                              item
                              container
                              flexDirection={"column"}
                              gap={"18px"}
                            >
                              <Grid item xs={12}>
                                <p className="subTextOne fontWeight-500 color-Neutral-Black">
                                  By Category
                                </p>
                              </Grid>
                              <Grid item xs={12}>
                                <Grid
                                  item
                                  container
                                  spacing={"20px"}
                                  width={300}
                                >
                                  {dataList?.data?.map((it, ind) => {
                                    return (
                                      <Grid item key={ind}>
                                        <Box className="courseFilterCheckbox">
                                          <input
                                            type="checkbox"
                                            onChange={() => {
                                              setSpecialization(it?.name);
                                            }}
                                            checked={
                                              specialization === it?.name
                                            }
                                          />
                                          <span>{it?.name}</span>
                                        </Box>
                                      </Grid>
                                    );
                                  })}

                                  {/* <Grid item>
                                    <Box className="courseFilterCheckbox">
                                      <input type="checkbox" />
                                      <span>Design</span>
                                    </Box>
                                  </Grid>
                                  <Grid item>
                                    <Box className="courseFilterCheckbox">
                                      <input type="checkbox" />
                                      <span>Programing</span>
                                    </Box>
                                  </Grid>
                                  <Grid item>
                                    <Box className="courseFilterCheckbox">
                                      <input type="checkbox" />
                                      <span>Cyber Sequrity</span>
                                    </Box>
                                  </Grid> */}
                                </Grid>
                              </Grid>
                            </Grid>
                          </Box>
                        </Menu>
                      </Box>
                    </Grid>
                    <Grid item>
                      <Box>
                        <Button onClick={handleClickSort}>
                          <img src={sortIcon} /> Sort By : {shortby}
                        </Button>
                        <Menu
                          anchorEl={anchorElSort}
                          open={openSort}
                          onClose={handleCloseSort}
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "left",
                          }}
                          transformOrigin={{
                            vertical: "top",
                            horizontal: "left",
                          }}
                        >
                          <Box padding={"20px"}>
                            <Grid
                              item
                              container
                              flexDirection={"column"}
                              gap={"18px"}
                            >
                              <Grid item xs={12}>
                                <p className="subTextOne fontWeight-500 color-Neutral-Black">
                                  Sort
                                </p>
                              </Grid>
                              <Grid item xs={12}>
                                <Grid
                                  item
                                  container
                                  spacing={"20px"}
                                  width={239}
                                >
                                  <Grid item xs={12}>
                                    <Box className="courseFilterRadio">
                                      <input
                                        type="radio"
                                        name="atoz"
                                        onChange={() => {
                                          if (
                                            shortby == "" ||
                                            shortby == "Z-A" ||
                                            shortby == "Popularity"
                                          ) {
                                            setShortBy("A-Z");
                                          } else {
                                            setShortBy("");
                                          }
                                        }}
                                        checked={
                                          shortby == "A-Z" ? true : false
                                        }
                                      />
                                      <span>A-Z</span>
                                    </Box>
                                  </Grid>
                                  <Grid item xs={12}>
                                    <Box className="courseFilterRadio">
                                      <input
                                        type="radio"
                                        name="ztoa"
                                        onChange={() => {
                                          if (
                                            shortby == "" ||
                                            shortby == "A-Z" ||
                                            shortby == "Popularity"
                                          ) {
                                            setShortBy("Z-A");
                                          } else {
                                            setShortBy("");
                                          }
                                        }}
                                        checked={
                                          shortby == "Z-A" ? true : false
                                        }
                                      />
                                      <span>Z-A</span>
                                    </Box>
                                  </Grid>
                                  <Grid item xs={12}>
                                    <Box className="courseFilterRadio">
                                      <input
                                        type="radio"
                                        name="popular"
                                        onChange={() => {
                                          if (
                                            shortby == "" ||
                                            shortby == "A-Z" ||
                                            shortby == "Z-A"
                                          ) {
                                            setShortBy("Popularity");
                                          } else {
                                            setShortBy("");
                                          }
                                        }}
                                        checked={
                                          shortby == "Popularity" ? true : false
                                        }
                                      />
                                      <span>Popular</span>
                                    </Box>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Box>
                        </Menu>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item container padding={"30px 0"}>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
              </Grid>
              {/* <Grid item container>
                <Grid item xs={12}>
                  <Grid item container>
                    <Grid item xs={12}>
                      <Grid item container justifyContent={"space-between"}>
                        <Grid item>
                          <h4 className="fontWeight-500">Result Tutors (5)</h4>
                        </Grid>
                        <Grid item>
                          <Grid item container columnGap={"5px"}>
                            <Button
                              sx={{ minWidth: 24, padding: "9px 0px" }}
                              onClick={() =>
                                searchResultSliderNav?.current?.slickPrev()
                              }
                            >
                              <img src={arrowLeftIcon} width={24} />
                            </Button>
                            <Button
                              sx={{ minWidth: 24, padding: "9px 0px" }}
                              onClick={() =>
                                searchResultSliderNav?.current?.slickNext()
                              }
                            >
                              <img src={arrowRightIcon} width={24} />
                            </Button>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item container paddingTop={"30px"}>
                        <Grid item xs={12} className="searchResultSlider">
                          <Slider
                            {...searchResultSlider}
                            ref={searchResultSliderNav}
                          >
                            {tutorData.map((it, ind) => {
                              return (
                                <Box paddingBottom={"30px"} key={ind}>
                                  <Link to="#">
                                    <Box
                                      className="resuleTutorBox"
                                      padding={{ xs: "30px 15px", sm: "30px" }}
                                    >
                                      <Grid
                                        item
                                        container
                                        rowGap={"20px"}
                                        className="searchResultSliderBlock"
                                      >
                                        <Grid item xs={12}>
                                          <List disablePadding>
                                            <ListItem
                                              disableGutters
                                              secondaryAction={
                                                <Button
                                                  edge="end"
                                                  sx={{ color: "#04A4F4" }}
                                                >
                                                  + Follow
                                                </Button>
                                              }
                                            >
                                              <ListItemAvatar>
                                                <Avatar src={avatardemo} />
                                              </ListItemAvatar>
                                              <ListItemText
                                                primary={
                                                  <p className="subTextOne fontWeight-700">
                                                    {it?.tutorname}
                                                  </p>
                                                }
                                                secondary={it?.type}
                                              />
                                            </ListItem>
                                          </List>
                                        </Grid>
                                        <Grid item xs={12}>
                                          <Grid
                                            item
                                            container
                                            alignItems={"center"}
                                            justifyContent={"space-between"}
                                          >
                                            <Grid item>
                                              <Grid
                                                item
                                                container
                                                alignItems={"center"}
                                                columnGap={"5px"}
                                              >
                                                <Grid item>
                                                  <img src={documentIcon} />
                                                </Grid>
                                                <Grid item>
                                                  <p className="subTextOne">
                                                    50 Course
                                                  </p>
                                                </Grid>
                                              </Grid>
                                            </Grid>
                                            <Grid item>
                                              <Grid
                                                item
                                                container
                                                alignItems={"center"}
                                                columnGap={"5px"}
                                              >
                                                <Grid item>
                                                  <StarIcon
                                                    fontSize="small"
                                                    color="primary"
                                                  />
                                                </Grid>
                                                <Grid item>
                                                  <p className="subTextOne">
                                                    4,5 (1.200 Review)
                                                  </p>
                                                </Grid>
                                              </Grid>
                                            </Grid>
                                          </Grid>
                                        </Grid>
                                      </Grid>
                                    </Box>
                                  </Link>
                                </Box>
                              );
                            })}
                          </Slider>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid> */}
              <Grid item container paddingTop={"30px"}>
                <Grid item xs={12}>
                  <Grid item container justifyContent={"space-between"}>
                    <Grid item>
                      <h4 className="fontWeight-500">
                        {" "}
                        Courses ({data?.data?.rows?.length})
                      </h4>
                    </Grid>
                  </Grid>
                  <Grid item container spacing={{ sm: "15px", md: "30px" }}>
                    {data?.data?.rows?.map((it, ind) => {
                      return (
                        <Grid item xs={12} sm={6} md={4} key={ind}>
                          <Box padding={"30px"} className="courseThumb">
                            <Link to="#">
                              <Grid item container rowGap={"20px"}>
                                <Grid item xs={12} position={"relative"}>
                                  <Box className="imgBlock">
                                    <img src={it?.image} width={"100%"} />
                                    <Button className="btnInter_midiate">
                                      {it.skillLevel}{" "}
                                      <img src={rangeIcon} alt="" />
                                    </Button>
                                  </Box>
                                </Grid>
                                <Grid item xs={12}>
                                  <p className="mb-10 mainText fontWeight-700 color-Neutral-Black">
                                    {it.title}
                                  </p>
                                  <Grid
                                    marginBottom={"10px"}
                                    item
                                    container
                                    justifyContent={"space-between"}
                                    alignItems={"center"}
                                  >
                                    <Grid item>
                                      <Grid
                                        item
                                        container
                                        columnGap={"10px"}
                                        alignItems={"center"}
                                      >
                                        <Avatar
                                          sx={{ width: 30, height: 30 }}
                                          alt="Remy Sharp"
                                          src={it.profilePicture}
                                        />
                                        <p className="mb-0 subTextOne color-Neutral-Dark-Grey">
                                          {it.fullName}
                                        </p>
                                      </Grid>
                                    </Grid>
                                    <Grid item textAlign={"right"}>
                                      <Grid
                                        item
                                        container
                                        columnGap={"4px"}
                                        alignItems={"center"}
                                        justifyContent={"flex-end"}
                                      >
                                        <StarIcon
                                          fontSize="small"
                                          color="primary"
                                        />
                                        <p className="mb-0 subTextOne">
                                          {it?.averageRating}
                                        </p>
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                  <Grid
                                    item
                                    className="info"
                                    container
                                    justifyContent={"space-between"}
                                  >
                                    <Grid item xs={12}></Grid>
                                    <Grid item xs={12}>
                                      <Grid
                                        item
                                        container
                                        justifyContent={"space-between"}
                                        paddingTop={"10px"}
                                      >
                                        <p className="subTextTwo fontWeight-500">
                                          {it?.totalSales} Students
                                        </p>
                                        <p className="subTextTwo fontWeight-500">
                                          {it?.moduleCount} Modules
                                        </p>
                                        <p className="subTextTwo fontWeight-500">
                                          Time : {it?.hourVideoTime}
                                        </p>
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Link>
                          </Box>
                        </Grid>
                      );
                    })}
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

Component.displayName = "StudentSearch";
