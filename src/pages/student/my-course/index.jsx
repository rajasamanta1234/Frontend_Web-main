import { useEffect } from "react";
import { AuthGuard } from "../../../guards/student/auth-guard";
import Seo from "@/components/common/seo";

import "../../../assets/css/student-dashboard/style.css";
import "../../../assets/css/student-dashboard/responsive.css";

import courseImg from "@/assets/images/coruse-img.png";
import avatarImg from "@/assets/images/avatar-demo.png";

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
  Menu,
  Tab,
  TextField,
} from "@mui/material";
import { Link } from "react-router-dom";

import StarIcon from "@mui/icons-material/Star";

import React from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  useGetonGoingCourseMutation,
  useGetCompleteCourseMutation,
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
  const [onGoingCourse, { data: onGoingCourseData }] =
    useGetonGoingCourseMutation();

  const [completeCourse, { data: completedCourseData }] =
    useGetCompleteCourseMutation();

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

  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (value == "1") {
      onGoingCourse();
    } else if (value == "2") {
      completeCourse();
    }
  }, [value]);

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
                <h3>My Courses</h3>
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
                      options={top100Films.map((option) => option.title)}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Search input"
                          InputProps={{
                            ...params.InputProps,
                            type: "search",
                          }}
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
                                      <input type="checkbox" />
                                      <span>All</span>
                                    </Box>
                                  </Grid>
                                  <Grid item>
                                    <Box className="courseFilterCheckbox">
                                      <input type="checkbox" />
                                      <span>Beginner</span>
                                    </Box>
                                  </Grid>
                                  <Grid item>
                                    <Box className="courseFilterCheckbox">
                                      <input type="checkbox" />
                                      <span>Intermediate</span>
                                    </Box>
                                  </Grid>
                                  <Grid item>
                                    <Box className="courseFilterCheckbox">
                                      <input type="checkbox" />
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
                          <img src={elementIcon} /> Level
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
                                  <Grid item>
                                    <Box className="courseFilterCheckbox">
                                      <input type="checkbox" />
                                      <span>All</span>
                                    </Box>
                                  </Grid>
                                  <Grid item>
                                    <Box className="courseFilterCheckbox">
                                      <input type="checkbox" />
                                      <span>Design</span>
                                    </Box>
                                  </Grid>
                                  <Grid item>
                                    <Box className="courseFilterCheckbox">
                                      <input type="checkbox" />
                                      <span>Soft Skill</span>
                                    </Box>
                                  </Grid>
                                  <Grid item>
                                    <Box className="courseFilterCheckbox">
                                      <input type="checkbox" />
                                      <span>Code</span>
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
                        <Button onClick={handleClickSort}>
                          <img src={sortIcon} /> Sort By : Popular
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
                                      <input type="radio" name="atoz" />
                                      <span>A-Z</span>
                                    </Box>
                                  </Grid>
                                  <Grid item xs={12}>
                                    <Box className="courseFilterRadio">
                                      <input type="radio" name="ztoa" />
                                      <span>Z-A</span>
                                    </Box>
                                  </Grid>
                                  <Grid item xs={12}>
                                    <Box className="courseFilterRadio">
                                      <input type="radio" name="popular" />
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
              <Grid item container padding={{ xs: "15px 0", sm: "30px 0" }}>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
              </Grid>
              <Grid item container>
                <TabContext value={value}>
                  <Grid item xs={12}>
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                      <TabList
                        onChange={handleChange}
                        aria-label="lab API tabs example"
                      >
                        <Tab label="Ongoing" value="1" />
                        <Tab label="Completed" value="2" />
                      </TabList>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <TabPanel value="1" sx={{ padding: "24px 0" }}>
                      <Grid item container spacing={{ sm: "15px", md: "30px" }}>
                        {onGoingCourseData?.data?.onGoingCourse?.map(
                          (e, index) => {
                            return (
                              <Grid item xs={12} sm={6} md={4} key={index}>
                                <Box padding={"30px"} className="courseThumb">
                                  <Link to="#">
                                    <Grid item container rowGap={"20px"}>
                                      <Grid item xs={12} position={"relative"}>
                                        <img src={e.image} width={"100%"} />
                                        <Button className="btnInter_midiate">
                                          {e.category}{" "}
                                          <img src={rangeIcon} alt="" />
                                        </Button>
                                      </Grid>
                                      <Grid item xs={12}>
                                        <p className="mb-10 mainText fontWeight-700 color-Neutral-Black">
                                          {e.title}
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
                                                alt={e.authorName}
                                                src={e.instructorImage}
                                              />
                                              <p className="mb-0 subTextOne color-Neutral-Dark-Grey">
                                                {e.authorName}
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
                                                {e.rating}
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
                                          <Grid item xs={12}>
                                            <LinearProgress
                                              variant="determinate"
                                              value={e.progress}
                                              className={
                                                e.progress > 50
                                                  ? "moreHalf"
                                                  : ""
                                              }
                                            />
                                          </Grid>
                                          <Grid item xs={12}>
                                            <Grid
                                              item
                                              container
                                              justifyContent={"space-between"}
                                              paddingTop={"10px"}
                                            >
                                              <p className="subTextTwo fontWeight-500">
                                                {e.doneModules}/{e.totalModules}
                                                Modules
                                              </p>
                                              <p className="subTextTwo fontWeight-500">
                                                {e.progress}%
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
                          }
                        )}
                      </Grid>
                    </TabPanel>
                    <TabPanel value="2" sx={{ padding: "24px 0" }}>
                      <Grid item container spacing={{ sm: "15px", md: "30px" }}>
                        {completedCourseData?.data?.map((e, index) => {
                          return (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                              <Box padding={"30px"} className="courseThumb">
                                <Link to="#">
                                  <Grid item container rowGap={"20px"}>
                                    <Grid item xs={12} position={"relative"}>
                                      <img src={e.image} width={"100%"} />
                                      <Button className="btnInter_midiate">
                                        {e.category}{" "}
                                        <img src={rangeIcon} alt="" />
                                      </Button>
                                    </Grid>
                                    <Grid item xs={12}>
                                      <p className="mb-10 mainText fontWeight-700 color-Neutral-Black">
                                        {e.title}
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
                                              alt={e.authorName}
                                              src={e.instructorImage}
                                            />
                                            <p className="mb-0 subTextOne color-Neutral-Dark-Grey">
                                              {e.authorName}
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
                                              {e.rating}
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
                                        <Grid item xs={12}>
                                          <LinearProgress
                                            variant="determinate"
                                            value={e.progress}
                                            className={
                                              e.progress > 50 ? "moreHalf" : ""
                                            }
                                          />
                                        </Grid>
                                        <Grid item xs={12}>
                                          <Grid
                                            item
                                            container
                                            justifyContent={"space-between"}
                                            paddingTop={"10px"}
                                          >
                                            <p className="subTextTwo fontWeight-500">
                                              {e.doneModules}/{e.totalModules}{" "}
                                              Modules
                                            </p>
                                            <p className="subTextTwo fontWeight-500">
                                              {e.progress}%
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
                    </TabPanel>
                  </Grid>
                </TabContext>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </Seo>
    </AuthGuard>
  );
}

Component.displayName = "StudentMyCourse";
