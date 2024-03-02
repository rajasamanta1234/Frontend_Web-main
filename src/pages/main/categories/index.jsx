// import { GuestGuard } from "../../../guards/student/guest-guard";
import React, { useState, useEffect } from "react";
import Seo from "@/components/common/seo";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";

import Googleplay from "@/assets/images/google-play.svg";
import Apple from "@/assets/images/apple.svg";
import aboutBanner from "@/assets/images/about-banner.png";
import aboutImgOne from "@/assets/images/about-img-1.png";
import aboutImgTwo from "@/assets/images/about-img-2.png";
import ArrowRightIcon from "@/assets/images/arrow-right.svg";
import faqImg from "@/assets/images/faq.png";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import PhoneCall from "@/assets/images/PhoneCall.svg";
import envolope from "@/assets/images/envolope.svg";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import iPhone from "@/assets/images/iPhone.png";
import missionImg from "@/assets/images/mission.png";
import visionImg from "@/assets/images/vision.png";
import rafikiImg from "@/assets/images/rafiki.png";
import cpuicon from "@/assets/images/Cpu.svg";
import stackClrIcon from "@/assets/images/StackClr.svg";
import easyLearning from "@/assets/images/easy-learningBanner.png";
import EastIcon from "@mui/icons-material/East";
import WestIcon from "@mui/icons-material/West";
import searchNormal from "@/assets/images/search-normal.svg";
import importIcon from "@/assets/images/import.svg";
import exportIcon from "@/assets/images/export.svg";
import settingIcon from "@/assets/images/setting.svg";
import rowVerticalIcon from "@/assets/images/row-vertical.svg";
import elementIcon from "@/assets/images/element.svg";
import documentIcon from "@/assets/images/document.svg";
import rangeIcon from "@/assets/images/range.svg";
import clockIcon from "@/assets/images/clock.svg";
import userIcon from "@/assets/images/user.svg";
import reviewOne from "@/assets/images/review.png";
import postImage from "@/assets/images/post-image.png";
import iconsFilter from "@/assets/images/icons-filter.svg";
import searchNormaBlackIcon from "@/assets/images/search-normal-black.svg";
import backBtnIcon from "@/assets/images/ep-back.svg";
import AddIcon from "@mui/icons-material/Add";

import { Grid, Avatar, Button, Rating, Pagination, Menu } from "@mui/material";
import Slider from "react-slick";
import { useRef } from "react";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import { TabContext, TabList, TabPanel } from "@mui/lab";

const metaTags = [
  { name: "Metaname1", content: "content1" },
  { name: "Metaname2", content: "content2" },
];

const array = [
  {
    title: "UI UX Design : Wireframe To Define Idea",
    price: "$2,000",
    author: "Jaxson George",
    rating: 4,
    no: "17,800",
    student: 5000,
    module: 4,
    time: "1h 30m",
    type: "Intermediate",
  },
  {
    title: "UI UX Design : Wireframe To Define Idea",
    price: "$2,000",
    author: "Jaxson George",
    rating: 4,
    no: "17,800",
    student: 5000,
    module: 4,
    time: "1h 30m",
    type: "Intermediate",
  },
  {
    title: "UI UX Design : Wireframe To Define Idea",
    price: "$2,000",
    author: "Jaxson George",
    rating: 4,
    no: "17,800",
    student: 5000,
    module: 4,
    time: "1h 30m",
    type: "Intermediate",
  },
  {
    title: "UI UX Design : Wireframe To Define Idea",
    price: "$2,000",
    author: "Jaxson George",
    rating: 4,
    no: "17,800",
    student: 5000,
    module: 4,
    time: "1h 30m",
    type: "Intermediate",
  },
  {
    title: "UI UX Design : Wireframe To Define Idea",
    price: "$2,000",
    author: "Jaxson George",
    rating: 4,
    no: "17,800",
    student: 5000,
    module: 4,
    time: "1h 30m",
    type: "Intermediate",
  },
];

export function Component() {
  const navigate = useNavigate();
  let { category } = useParams();

  // for tab
  const [value, setValue] = useState("1");
  const [filterShow, setfilterShow] = useState(false);

  const categoriTabChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (category) {
      console.log(category);
      switch (category) {
        case "DevOps Engineer":
          setValue(1);
          break;

        case "Cyber security":
          setValue(2);
          break;

        case "Project Lead":
          setValue(3);
          break;

        case "Project manager":
          setValue(4);
          break;

        case "Business Analyst":
          setValue(5);
          break;

        case "UI/UX Design":
          setValue(6);
          break;

        case "Marketing Officer":
          setValue(7);
          break;

        case "Technical Specialist":
          setValue(8);
          break;

        case "Program Manager":
          setValue(10);
          break;

        case "UI Designer":
          setValue(11);
          break;

        case "System Analyst":
          setValue(12);
          break;

        default:
          break;
      }
    }
  }, [category]);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Seo title="Categories" metaName="Metaname" metaTags={metaTags}>
        <Grid className="subpageBanner">
          <Grid className="container">
            <h1>Course Categories</h1>
            <h4>Choose from a wide range of categories</h4>
          </Grid>
        </Grid>

        <div className="categoriMain">
          <section className="categoriSection">
            <Grid className="container">
              <div className="categoriHead">
                <h2>Sed aenean ac commodo quis</h2>
                <p>
                  Lorem ipsum is common placeholder text used to demonstrate the
                  graphic elements of a document or visual presentation.
                </p>
              </div>
              <Box sx={{ width: "100%" }}>
                <TabContext value={value}>
                  <Box
                    sx={{ borderBottom: 1, borderColor: "divider" }}
                    className="courseTabList"
                  >
                    <TabList
                      onChange={categoriTabChange}
                      variant="scrollable"
                      scrollButtons="auto"
                    >
                      <Tab
                        className="tabName"
                        label="DevOps Engineer"
                        value={1}
                        component={Link}
                        to="/categories/DevOps Engineer"
                        // onClick={() => {
                        //   navigate("/categories/DevOps Engineer");
                        // }}
                      />
                      <Tab
                        className="tabName"
                        label="Cyber security"
                        value={2}
                        component={Link}
                        to="/categories/Cyber security"
                      />
                      <Tab
                        className="tabName"
                        label="Project lead"
                        value={3}
                        component={Link}
                        to="/categories/Project lead"
                      />
                      <Tab
                        className="tabName"
                        label="Project manager"
                        value={4}
                        component={Link}
                        to="/categories/Project manager"
                      />
                      <Tab
                        className="tabName"
                        label="Business Analyst"
                        value={5}
                        component={Link}
                        to="/categories/Business Analyst"
                      />
                      <Tab
                        className="tabName"
                        label="UI/UX Design"
                        value="6"
                        component={Link}
                        to="/categories/UI-UX Design"
                      />
                      <Tab
                        className="tabName"
                        label="Marketing Officer"
                        value={7}
                        component={Link}
                        to="/categories/Marketing Officer"
                      />
                      <Tab
                        className="tabName"
                        label="Technical Specialist"
                        value={8}
                        component={Link}
                        to="/categories/Technical Specialist"
                      />
                      {/* <Tab
                        className="tabName"
                        label="Marketing Officer"
                        value={9}
                      /> */}
                      <Tab
                        className="tabName"
                        label="Program Manager"
                        value={10}
                        component={Link}
                        to="/categories/Program Manager"
                      />
                      <Tab
                        className="tabName"
                        label="UI Designer"
                        value={11}
                        component={Link}
                        to="/categories/UI Designer"
                      />
                      <Tab
                        className="tabName"
                        label="System Analyst"
                        value={12}
                        component={Link}
                        to="/categories/System Analyst"
                      />
                    </TabList>
                  </Box>
                  <div value="1" style={{ padding: 0 }}>
                    <Grid paddingTop={"25px"}>
                      <Grid container>
                        <Grid item xs={12}>
                          <Typography className="descriptioPara">
                            Lorem ipsum is common placeholder text used to
                            demonstrate the graphic elements of a document or
                            visual presentation.
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        marginTop={{ xs: "25px", sm: "40px", md: "90px" }}
                      >
                        <Grid
                          item
                          className={`courseLeft ${filterShow ? "hide" : ""}`}
                        >
                          <Grid
                            container
                            alignItems="center"
                            justifyContent="space-between"
                            style={{ width: "100%" }}
                          >
                            <h3 className="titleCategori">{category}</h3>

                            <Grid item xs="auto" md={4} position={"relative"}>
                              <Box className="courseMblSearchFilter">
                                <Button
                                  onClick={() => {
                                    setfilterShow(true);
                                  }}
                                >
                                  <img src={iconsFilter} alt="" />
                                </Button>
                                <Button
                                  aria-controls={
                                    open ? "basic-menu" : undefined
                                  }
                                  aria-haspopup="true"
                                  aria-expanded={open ? "true" : undefined}
                                  onClick={handleClick}
                                >
                                  <img src={searchNormaBlackIcon} alt="" />
                                </Button>
                                <Menu
                                  id="basic-menu"
                                  anchorEl={anchorEl}
                                  open={open}
                                  onClose={handleClose}
                                  MenuListProps={{
                                    "aria-labelledby": "basic-button",
                                  }}
                                  anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "right",
                                  }}
                                  transformOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                  }}
                                >
                                  <Box className="categoriSearch categoriSearchMobile">
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Search"
                                    />
                                    <img src={searchNormal} alt="" />
                                  </Box>
                                </Menu>
                              </Box>
                              <Box className="categoriSearch">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Search"
                                />
                                <img src={searchNormal} alt="" />
                              </Box>
                            </Grid>
                          </Grid>

                          <Grid
                            container
                            marginTop={{ xs: "35px", md: "57px" }}
                          >
                            <Grid item container className="courseCategoriBox">
                              <Grid
                                item
                                className="couseCatImg"
                                position={"relative"}
                              >
                                <img src={postImage} alt="" />

                                <Button className="btnInter_midiate">
                                  Intermediate <img src={rangeIcon} alt="" />
                                </Button>
                              </Grid>
                              <Grid
                                item
                                className="couseCat_nameBox"
                                paddingTop={"15px"}
                              >
                                <Grid item xs={12} className="cousrseInfo">
                                  <Grid
                                    item
                                    container
                                    justifyContent={"space-between"}
                                  >
                                    <Grid
                                      item
                                      xs={8}
                                      paddingRight={{ xs: 0, sm: 2 }}
                                    >
                                      <h4>
                                        <Link to={"/course/UI UX Design"}>
                                          UI UX Design : Wireframe To Define
                                          Idea
                                        </Link>
                                      </h4>
                                    </Grid>
                                    <Grid item>
                                      <p className="mainText fontWeight-700 color-primary">
                                        $2,000
                                      </p>
                                    </Grid>
                                  </Grid>
                                  <Box
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                  >
                                    <Avatar
                                      alt=""
                                      src={reviewOne}
                                      sx={{ width: 30, height: 30 }}
                                    />
                                    <Typography
                                      paddingLeft={"10px"}
                                      className="revieweName"
                                    >
                                      Jaxson George
                                    </Typography>
                                  </Box>
                                  <Box
                                    className="ratingArea"
                                    marginTop={"23px"}
                                  >
                                    <span>4,5</span>

                                    <Grid className="">
                                      <Rating
                                        name="read-only"
                                        defaultValue={3}
                                        precision={0.5}
                                        readOnly
                                      />
                                    </Grid>
                                    <span>(17,800)</span>
                                  </Box>
                                  <Grid
                                    item
                                    container
                                    flexDirection={"row"}
                                    columnGap={{ xs: "10px", sm: "20px" }}
                                    marginTop={{ xs: "18px", md: "27px" }}
                                  >
                                    <Grid item container xs="auto">
                                      <img src={userIcon} alt="" />
                                      <Typography paddingLeft={"5px"}>
                                        500 Student
                                      </Typography>
                                    </Grid>
                                    <Grid item container xs="auto">
                                      <img src={documentIcon} alt="" />
                                      <Typography paddingLeft={"5px"}>
                                        5 Modul
                                      </Typography>
                                    </Grid>
                                    <Grid item container xs="auto">
                                      <img src={clockIcon} alt="" />
                                      <Typography paddingLeft={"5px"}>
                                        1h 30m
                                      </Typography>
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                            {array?.map((_e, _index) => {
                              return (
                                <Grid
                                  item
                                  container
                                  className="courseCategoriBox"
                                  key={_index}
                                >
                                  <Grid
                                    item
                                    className="couseCatImg"
                                    position={"relative"}
                                  >
                                    <img src={postImage} alt="" />

                                    <Button className="btnInter_midiate">
                                      {_e.type}
                                      <img src={rangeIcon} alt="" />
                                    </Button>
                                  </Grid>
                                  <Grid
                                    item
                                    className="couseCat_nameBox"
                                    paddingTop={"15px"}
                                  >
                                    <Grid item xs={12} className="cousrseInfo">
                                      <Grid
                                        item
                                        container
                                        justifyContent={"space-between"}
                                      >
                                        <Grid
                                          item
                                          xs={8}
                                          paddingRight={{ xs: 0, sm: 2 }}
                                        >
                                          <h4>
                                            <Link to={"/course/UI UX Design"}>
                                              {_e.title}
                                            </Link>
                                          </h4>
                                        </Grid>
                                        <Grid item>
                                          <p className="mainText fontWeight-700 color-primary">
                                            {_e.price}
                                          </p>
                                        </Grid>
                                      </Grid>

                                      <Box
                                        style={{
                                          display: "flex",
                                          alignItems: "center",
                                        }}
                                      >
                                        <Avatar
                                          alt=""
                                          src={reviewOne}
                                          sx={{ width: 30, height: 30 }}
                                        />
                                        <Typography
                                          paddingLeft={"10px"}
                                          className="revieweName"
                                        >
                                          {_e.author}
                                        </Typography>
                                      </Box>
                                      <Box
                                        className="ratingArea"
                                        marginTop={"23px"}
                                      >
                                        <span>{_e.rating}</span>

                                        <Grid className="">
                                          <Rating
                                            name="read-only"
                                            defaultValue={_e.rating}
                                            precision={0.5}
                                            readOnly
                                          />
                                        </Grid>
                                        <span>({_e.no})</span>
                                      </Box>
                                      <Grid
                                        item
                                        container
                                        flexDirection={"row"}
                                        columnGap={{ xs: "10px", sm: "20px" }}
                                        marginTop={{ xs: "18px", md: "27px" }}
                                      >
                                        <Grid item container xs="auto">
                                          <img src={userIcon} alt="" />
                                          <Typography paddingLeft={"5px"}>
                                            {_e.student} Student
                                          </Typography>
                                        </Grid>
                                        <Grid item container xs="auto">
                                          <img src={documentIcon} alt="" />
                                          <Typography paddingLeft={"5px"}>
                                            {_e.module} Module
                                          </Typography>
                                        </Grid>
                                        <Grid item container xs="auto">
                                          <img src={clockIcon} alt="" />
                                          <Typography paddingLeft={"5px"}>
                                            {_e.time}
                                          </Typography>
                                        </Grid>
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                </Grid>
                              );
                            })}
                          </Grid>
                        </Grid>
                        <Grid
                          item
                          className={`courseFilter ${filterShow ? "show" : ""}`}
                        >
                          <Grid item container className="forMobileFiter">
                            <Button
                              onClick={() => {
                                setfilterShow(false);
                              }}
                            >
                              <img src={backBtnIcon} /> Filter
                            </Button>
                          </Grid>
                          <Grid
                            item
                            container
                            flexDirection={"column"}
                            rowGap={4}
                          >
                            <Grid item xs={12}>
                              <h5>Review</h5>
                              <Grid
                                className="reviewFilter"
                                item
                                container
                                flexDirection={"column"}
                                rowGap={"10px"}
                                marginTop={"20px"}
                              >
                                <Grid item xs={12}>
                                  <Grid
                                    item
                                    container
                                    justifyContent={"space-between"}
                                    spacing={1}
                                  >
                                    <Grid item>
                                      <Grid item container spacing={1}>
                                        <Grid item>
                                          <div className="lightforthCheckbox">
                                            <div className="mainCheck">
                                              <input type="checkbox" />
                                              <span>
                                                <svg
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  width="14"
                                                  height="14"
                                                  viewBox="0 0 14 14"
                                                  fill="none"
                                                >
                                                  <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M11.4711 3.86714C11.7314 4.12749 11.7314 4.5496 11.4711 4.80995L6.13775 10.1433C5.8774 10.4036 5.45529 10.4036 5.19494 10.1433L2.52827 7.47661C2.26792 7.21626 2.26792 6.79415 2.52827 6.5338C2.78862 6.27345 3.21073 6.27345 3.47108 6.5338L5.66634 8.72907L10.5283 3.86714C10.7886 3.60679 11.2107 3.60679 11.4711 3.86714Z"
                                                    fill="white"
                                                  />
                                                </svg>
                                              </span>
                                            </div>
                                          </div>
                                        </Grid>
                                        <Grid item>
                                          <StarIcon className="active" />
                                          <StarIcon className="active" />
                                          <StarIcon className="active" />
                                          <StarIcon className="active" />
                                          <StarIcon className="active" />
                                        </Grid>
                                      </Grid>
                                    </Grid>
                                    <Grid item>
                                      <p className="subTextThree">(1,025)</p>
                                    </Grid>
                                  </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                  <Grid
                                    item
                                    container
                                    justifyContent={"space-between"}
                                    spacing={1}
                                  >
                                    <Grid item>
                                      <Grid item container spacing={1}>
                                        <Grid item>
                                          <div className="lightforthCheckbox">
                                            <div className="mainCheck">
                                              <input type="checkbox" checked />
                                              <span>
                                                <svg
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  width="14"
                                                  height="14"
                                                  viewBox="0 0 14 14"
                                                  fill="none"
                                                >
                                                  <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M11.4711 3.86714C11.7314 4.12749 11.7314 4.5496 11.4711 4.80995L6.13775 10.1433C5.8774 10.4036 5.45529 10.4036 5.19494 10.1433L2.52827 7.47661C2.26792 7.21626 2.26792 6.79415 2.52827 6.5338C2.78862 6.27345 3.21073 6.27345 3.47108 6.5338L5.66634 8.72907L10.5283 3.86714C10.7886 3.60679 11.2107 3.60679 11.4711 3.86714Z"
                                                    fill="white"
                                                  />
                                                </svg>
                                              </span>
                                            </div>
                                          </div>
                                        </Grid>
                                        <Grid item>
                                          <StarIcon className="active" />
                                          <StarIcon className="active" />
                                          <StarIcon className="active" />
                                          <StarIcon className="active" />
                                          <StarIcon />
                                        </Grid>
                                      </Grid>
                                    </Grid>
                                    <Grid item>
                                      <p className="subTextThree">(1,025)</p>
                                    </Grid>
                                  </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                  <Grid
                                    item
                                    container
                                    justifyContent={"space-between"}
                                    spacing={1}
                                  >
                                    <Grid item>
                                      <Grid item container spacing={1}>
                                        <Grid item>
                                          <div className="lightforthCheckbox">
                                            <div className="mainCheck">
                                              <input type="checkbox" />
                                              <span>
                                                <svg
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  width="14"
                                                  height="14"
                                                  viewBox="0 0 14 14"
                                                  fill="none"
                                                >
                                                  <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M11.4711 3.86714C11.7314 4.12749 11.7314 4.5496 11.4711 4.80995L6.13775 10.1433C5.8774 10.4036 5.45529 10.4036 5.19494 10.1433L2.52827 7.47661C2.26792 7.21626 2.26792 6.79415 2.52827 6.5338C2.78862 6.27345 3.21073 6.27345 3.47108 6.5338L5.66634 8.72907L10.5283 3.86714C10.7886 3.60679 11.2107 3.60679 11.4711 3.86714Z"
                                                    fill="white"
                                                  />
                                                </svg>
                                              </span>
                                            </div>
                                          </div>
                                        </Grid>
                                        <Grid item>
                                          <StarIcon className="active" />
                                          <StarIcon className="active" />
                                          <StarIcon className="active" />
                                          <StarIcon />
                                          <StarIcon />
                                        </Grid>
                                      </Grid>
                                    </Grid>
                                    <Grid item>
                                      <p className="subTextThree">(1,025)</p>
                                    </Grid>
                                  </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                  <Grid
                                    item
                                    container
                                    justifyContent={"space-between"}
                                    spacing={1}
                                  >
                                    <Grid item>
                                      <Grid item container spacing={1}>
                                        <Grid item>
                                          <div className="lightforthCheckbox">
                                            <div className="mainCheck">
                                              <input type="checkbox" />
                                              <span>
                                                <svg
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  width="14"
                                                  height="14"
                                                  viewBox="0 0 14 14"
                                                  fill="none"
                                                >
                                                  <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M11.4711 3.86714C11.7314 4.12749 11.7314 4.5496 11.4711 4.80995L6.13775 10.1433C5.8774 10.4036 5.45529 10.4036 5.19494 10.1433L2.52827 7.47661C2.26792 7.21626 2.26792 6.79415 2.52827 6.5338C2.78862 6.27345 3.21073 6.27345 3.47108 6.5338L5.66634 8.72907L10.5283 3.86714C10.7886 3.60679 11.2107 3.60679 11.4711 3.86714Z"
                                                    fill="white"
                                                  />
                                                </svg>
                                              </span>
                                            </div>
                                          </div>
                                        </Grid>
                                        <Grid item>
                                          <StarIcon className="active" />
                                          <StarIcon className="active" />
                                          <StarIcon />
                                          <StarIcon />
                                          <StarIcon />
                                        </Grid>
                                      </Grid>
                                    </Grid>
                                    <Grid item>
                                      <p className="subTextThree">(1,025)</p>
                                    </Grid>
                                  </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                  <Grid
                                    item
                                    container
                                    justifyContent={"space-between"}
                                    spacing={1}
                                  >
                                    <Grid item>
                                      <Grid item container spacing={1}>
                                        <Grid item>
                                          <div className="lightforthCheckbox">
                                            <div className="mainCheck">
                                              <input type="checkbox" />
                                              <span>
                                                <svg
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  width="14"
                                                  height="14"
                                                  viewBox="0 0 14 14"
                                                  fill="none"
                                                >
                                                  <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M11.4711 3.86714C11.7314 4.12749 11.7314 4.5496 11.4711 4.80995L6.13775 10.1433C5.8774 10.4036 5.45529 10.4036 5.19494 10.1433L2.52827 7.47661C2.26792 7.21626 2.26792 6.79415 2.52827 6.5338C2.78862 6.27345 3.21073 6.27345 3.47108 6.5338L5.66634 8.72907L10.5283 3.86714C10.7886 3.60679 11.2107 3.60679 11.4711 3.86714Z"
                                                    fill="white"
                                                  />
                                                </svg>
                                              </span>
                                            </div>
                                          </div>
                                        </Grid>
                                        <Grid item>
                                          <StarIcon className="active" />
                                          <StarIcon />
                                          <StarIcon />
                                          <StarIcon />
                                          <StarIcon />
                                        </Grid>
                                      </Grid>
                                    </Grid>
                                    <Grid item>
                                      <p className="subTextThree">(1,025)</p>
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid item>
                              <h5>Price</h5>
                              <Grid
                                item
                                container
                                flexDirection={"column"}
                                rowGap={"10px"}
                                marginTop={"20px"}
                              >
                                <Grid item xs={12}>
                                  <Grid
                                    item
                                    container
                                    justifyContent={"space-between"}
                                    spacing={1}
                                  >
                                    <Grid item>
                                      <Grid item container spacing={1}>
                                        <Grid item>
                                          <div className="lightforthCheckbox">
                                            <div className="mainCheck">
                                              <input type="checkbox" />
                                              <span>
                                                <svg
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  width="14"
                                                  height="14"
                                                  viewBox="0 0 14 14"
                                                  fill="none"
                                                >
                                                  <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M11.4711 3.86714C11.7314 4.12749 11.7314 4.5496 11.4711 4.80995L6.13775 10.1433C5.8774 10.4036 5.45529 10.4036 5.19494 10.1433L2.52827 7.47661C2.26792 7.21626 2.26792 6.79415 2.52827 6.5338C2.78862 6.27345 3.21073 6.27345 3.47108 6.5338L5.66634 8.72907L10.5283 3.86714C10.7886 3.60679 11.2107 3.60679 11.4711 3.86714Z"
                                                    fill="white"
                                                  />
                                                </svg>
                                              </span>
                                            </div>
                                            <label>
                                              <p className="subTextThree">
                                                All
                                              </p>
                                            </label>
                                          </div>
                                        </Grid>
                                      </Grid>
                                    </Grid>
                                    <Grid item>
                                      <p className="subTextThree">(209)</p>
                                    </Grid>
                                  </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                  <Grid
                                    item
                                    container
                                    justifyContent={"space-between"}
                                    spacing={1}
                                  >
                                    <Grid item>
                                      <Grid item container spacing={1}>
                                        <Grid item>
                                          <div className="lightforthCheckbox">
                                            <div className="mainCheck">
                                              <input type="checkbox" />
                                              <span>
                                                <svg
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  width="14"
                                                  height="14"
                                                  viewBox="0 0 14 14"
                                                  fill="none"
                                                >
                                                  <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M11.4711 3.86714C11.7314 4.12749 11.7314 4.5496 11.4711 4.80995L6.13775 10.1433C5.8774 10.4036 5.45529 10.4036 5.19494 10.1433L2.52827 7.47661C2.26792 7.21626 2.26792 6.79415 2.52827 6.5338C2.78862 6.27345 3.21073 6.27345 3.47108 6.5338L5.66634 8.72907L10.5283 3.86714C10.7886 3.60679 11.2107 3.60679 11.4711 3.86714Z"
                                                    fill="white"
                                                  />
                                                </svg>
                                              </span>
                                            </div>
                                            <label>
                                              <p className="subTextThree">
                                                Free
                                              </p>
                                            </label>
                                          </div>
                                        </Grid>
                                      </Grid>
                                    </Grid>
                                    <Grid item>
                                      <p className="subTextThree">(4893)</p>
                                    </Grid>
                                  </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                  <Grid
                                    item
                                    container
                                    justifyContent={"space-between"}
                                    spacing={1}
                                  >
                                    <Grid item>
                                      <Grid item container spacing={1}>
                                        <Grid item>
                                          <div className="lightforthCheckbox">
                                            <div className="mainCheck">
                                              <input type="checkbox" />
                                              <span>
                                                <svg
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  width="14"
                                                  height="14"
                                                  viewBox="0 0 14 14"
                                                  fill="none"
                                                >
                                                  <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M11.4711 3.86714C11.7314 4.12749 11.7314 4.5496 11.4711 4.80995L6.13775 10.1433C5.8774 10.4036 5.45529 10.4036 5.19494 10.1433L2.52827 7.47661C2.26792 7.21626 2.26792 6.79415 2.52827 6.5338C2.78862 6.27345 3.21073 6.27345 3.47108 6.5338L5.66634 8.72907L10.5283 3.86714C10.7886 3.60679 11.2107 3.60679 11.4711 3.86714Z"
                                                    fill="white"
                                                  />
                                                </svg>
                                              </span>
                                            </div>
                                            <label>
                                              <p className="subTextThree">
                                                Paid
                                              </p>
                                            </label>
                                          </div>
                                        </Grid>
                                      </Grid>
                                    </Grid>
                                    <Grid item>
                                      <p className="subTextThree">(32449)</p>
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid item xs={12}>
                              <h5>Price Range</h5>
                              <Grid
                                item
                                container
                                alignItems={"center"}
                                marginTop={"20px"}
                              >
                                <Grid item xs={5}>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="min"
                                  />
                                </Grid>
                                <Grid item xs={2}>
                                  <Grid
                                    item
                                    container
                                    justifyContent={"center"}
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="16"
                                      height="2"
                                      viewBox="0 0 16 2"
                                      fill="none"
                                    >
                                      <path
                                        d="M0.765625 1.09375H14.6353"
                                        stroke="#506375"
                                        strokeLinecap="round"
                                      />
                                    </svg>
                                  </Grid>
                                </Grid>
                                <Grid item xs={5}>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="max"
                                  />
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid item>
                              <h5>Level</h5>
                              <Grid
                                item
                                container
                                flexDirection={"column"}
                                rowGap={"10px"}
                                marginTop={"20px"}
                              >
                                <Grid item xs={12}>
                                  <Grid
                                    item
                                    container
                                    justifyContent={"space-between"}
                                    spacing={1}
                                  >
                                    <Grid item>
                                      <Grid item container spacing={1}>
                                        <Grid item>
                                          <div className="lightforthCheckbox">
                                            <div className="mainCheck">
                                              <input type="checkbox" />
                                              <span>
                                                <svg
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  width="14"
                                                  height="14"
                                                  viewBox="0 0 14 14"
                                                  fill="none"
                                                >
                                                  <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M11.4711 3.86714C11.7314 4.12749 11.7314 4.5496 11.4711 4.80995L6.13775 10.1433C5.8774 10.4036 5.45529 10.4036 5.19494 10.1433L2.52827 7.47661C2.26792 7.21626 2.26792 6.79415 2.52827 6.5338C2.78862 6.27345 3.21073 6.27345 3.47108 6.5338L5.66634 8.72907L10.5283 3.86714C10.7886 3.60679 11.2107 3.60679 11.4711 3.86714Z"
                                                    fill="white"
                                                  />
                                                </svg>
                                              </span>
                                            </div>
                                            <label>
                                              <p className="subTextThree">
                                                All levels
                                              </p>
                                            </label>
                                          </div>
                                        </Grid>
                                      </Grid>
                                    </Grid>
                                    <Grid item>
                                      <p className="subTextThree">(8934)</p>
                                    </Grid>
                                  </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                  <Grid
                                    item
                                    container
                                    justifyContent={"space-between"}
                                    spacing={1}
                                  >
                                    <Grid item>
                                      <Grid item container spacing={1}>
                                        <Grid item>
                                          <div className="lightforthCheckbox">
                                            <div className="mainCheck">
                                              <input type="checkbox" />
                                              <span>
                                                <svg
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  width="14"
                                                  height="14"
                                                  viewBox="0 0 14 14"
                                                  fill="none"
                                                >
                                                  <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M11.4711 3.86714C11.7314 4.12749 11.7314 4.5496 11.4711 4.80995L6.13775 10.1433C5.8774 10.4036 5.45529 10.4036 5.19494 10.1433L2.52827 7.47661C2.26792 7.21626 2.26792 6.79415 2.52827 6.5338C2.78862 6.27345 3.21073 6.27345 3.47108 6.5338L5.66634 8.72907L10.5283 3.86714C10.7886 3.60679 11.2107 3.60679 11.4711 3.86714Z"
                                                    fill="white"
                                                  />
                                                </svg>
                                              </span>
                                            </div>
                                            <label>
                                              <p className="subTextThree">
                                                Beginner
                                              </p>
                                            </label>
                                          </div>
                                        </Grid>
                                      </Grid>
                                    </Grid>
                                    <Grid item>
                                      <p className="subTextThree">(65)</p>
                                    </Grid>
                                  </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                  <Grid
                                    item
                                    container
                                    justifyContent={"space-between"}
                                    spacing={1}
                                  >
                                    <Grid item>
                                      <Grid item container spacing={1}>
                                        <Grid item>
                                          <div className="lightforthCheckbox">
                                            <div className="mainCheck">
                                              <input type="checkbox" />
                                              <span>
                                                <svg
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  width="14"
                                                  height="14"
                                                  viewBox="0 0 14 14"
                                                  fill="none"
                                                >
                                                  <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M11.4711 3.86714C11.7314 4.12749 11.7314 4.5496 11.4711 4.80995L6.13775 10.1433C5.8774 10.4036 5.45529 10.4036 5.19494 10.1433L2.52827 7.47661C2.26792 7.21626 2.26792 6.79415 2.52827 6.5338C2.78862 6.27345 3.21073 6.27345 3.47108 6.5338L5.66634 8.72907L10.5283 3.86714C10.7886 3.60679 11.2107 3.60679 11.4711 3.86714Z"
                                                    fill="white"
                                                  />
                                                </svg>
                                              </span>
                                            </div>
                                            <label>
                                              <p className="subTextThree">
                                                Intermidiate
                                              </p>
                                            </label>
                                          </div>
                                        </Grid>
                                      </Grid>
                                    </Grid>
                                    <Grid item>
                                      <p className="subTextThree">(12)</p>
                                    </Grid>
                                  </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                  <Grid
                                    item
                                    container
                                    justifyContent={"space-between"}
                                    spacing={1}
                                  >
                                    <Grid item>
                                      <Grid item container spacing={1}>
                                        <Grid item>
                                          <div className="lightforthCheckbox">
                                            <div className="mainCheck">
                                              <input type="checkbox" />
                                              <span>
                                                <svg
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  width="14"
                                                  height="14"
                                                  viewBox="0 0 14 14"
                                                  fill="none"
                                                >
                                                  <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M11.4711 3.86714C11.7314 4.12749 11.7314 4.5496 11.4711 4.80995L6.13775 10.1433C5.8774 10.4036 5.45529 10.4036 5.19494 10.1433L2.52827 7.47661C2.26792 7.21626 2.26792 6.79415 2.52827 6.5338C2.78862 6.27345 3.21073 6.27345 3.47108 6.5338L5.66634 8.72907L10.5283 3.86714C10.7886 3.60679 11.2107 3.60679 11.4711 3.86714Z"
                                                    fill="white"
                                                  />
                                                </svg>
                                              </span>
                                            </div>
                                            <label>
                                              <p className="subTextThree">
                                                Expert
                                              </p>
                                            </label>
                                          </div>
                                        </Grid>
                                      </Grid>
                                    </Grid>
                                    <Grid item>
                                      <p className="subTextThree">(12)</p>
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item container className="forMobileFiterAction">
                            <button className="primaryBtn">Apply Filter</button>
                            <button className="normalBtn">Cancel</button>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </div>
                </TabContext>
              </Box>

              <Grid
                container
                justifyContent={"center"}
                marginTop={{ xs: "65px", md: "110px" }}
              >
                <Pagination
                  count={3}
                  color="primary"
                  variant="outlined"
                  className="cstmPagination"
                />
              </Grid>
            </Grid>
          </section>
        </div>
      </Seo>
    </>
  );
}

Component.displayName = "Categories";
