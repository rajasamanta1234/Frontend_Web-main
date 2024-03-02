import { useSelector } from "react-redux";
import { useRef, useEffect } from "react";
import { AuthGuard } from "../../../guards/student/auth-guard";
import Seo from "@/components/common/seo";
import { useNavigate } from "react-router-dom";

import "../../../assets/css/student-dashboard/style.css";
import "../../../assets/css/student-dashboard/responsive.css";
import arrowRightIcon from "@/assets/images/cheveron-right.svg";
import arrowLeftIcon from "@/assets/images/cheveron-left.svg";
import courseImg from "@/assets/images/coruse-img.png";
import avatarImg from "@/assets/images/avatar-demo.png";
import documentIcon from "@/assets/images/document.svg";

import userIcon from "@/assets/images/user.svg";
import clockIcon from "@/assets/images/clock.svg";
import rangeIcon from "@/assets/images/range.svg";
import sparklesIcon from "@/assets/images/sparkles-one.svg";
import taskpurpleIcon from "@/assets/images/task-purple-icon.svg";
import mockIcon from "@/assets/images/mock-icon.svg";
import editBigIcon from "@/assets/images/edit-big.svg";
import {
  Avatar,
  Box,
  Button,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Rating,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { Slider as SliderValue } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

import PieChart from "../../../components/Charts/StraightAngelBarchart";

import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

// import { useForgotPaswwordStudentMutation } from "@/redux/api/student/auth";
import {
  useGetMyTopicMutation,
  useGetPopularCoachesMutation,
  useGetRecommendationMutation,
  useGetonGoingCourseMutation,
} from "../../../redux/api/student/dashboard";

const metaTags = [
  { name: "Metaname1", content: "content1" },
  { name: "Metaname2", content: "content2" },
];

export function Component() {
  const navigate = useNavigate();
  const Recommendationslider = useRef(null);
  const popularCoachesSlider = useRef(null);
  const webnerSlider = useRef(null);
  // const [recommendationslideToShow, setRecommendationslideToShow] = useState(0);
  // const [recommendationsliderCurrent, setrecommendationsliderCurrent] =
  //   useState(0);

  const [myTopic, { data: topicList }] = useGetMyTopicMutation();
  const [popualCoaches, { data: popularCoachesList }] =
    useGetPopularCoachesMutation();
  const [onGoingCourse, { data: onGoingCourseData }] =
    useGetonGoingCourseMutation();

  const [recommendation, { data: recommendationList }] =
    useGetRecommendationMutation();

  const settings = {
    nav: false,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
  };

  const cocahSlider = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
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
  const recommendationSlider = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1365,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1150,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    // afterChange: (current) => setrecommendationsliderCurrent(current),
  };

  const { user } = useSelector((state) => state.studetnUser);

  useEffect(() => {
    myTopic();
    popualCoaches();
    recommendation();
    onGoingCourse();
  }, []);

  // useEffect(() => {
  //   if (recommendationSlider.slidesToShow) {
  //     console.log(recommendationSlider.slidesToShow);
  //     setRecommendationslideToShow(recommendationSlider.slidesToShow);
  //   }
  // }, [recommendationSlider]);

  // useEffect(() => {
  //   if (Recommendationslider.current) {
  //     const { slidesToShow } = Recommendationslider.current.props;
  //     setRecommendationslideToShow(slidesToShow);
  //     console.log(slidesToShow);
  //   }
  // }, [Recommendationslider]);

  const StyledRating = styled(Rating)({
    "& .MuiRating-iconEmpty": {
      color: "#fff",
    },
    "& .MuiRating-iconFilled": {
      color: "#fff",
    },
    "& .MuiRating-iconHover": {
      color: "#fff",
    },
  });

  return (
    <AuthGuard>
      <Seo title="Dashboard" metaName="Metaname" metaTags={metaTags}>
        <div className="mainDashboardArea">
          {/* start don't have subscribed */}

          {/* <Grid container className="donthavesubscribedSec">
            <Grid item xs={12}>
              <img src={donthavesubscribedImg} />
              <h4>You Don’t Have A Subscribed Course</h4>
              <p className="mainText">Click on the button below to browse variety of course</p>
              <Link className="primaryBtn">Subscribe</Link>
            </Grid>
          </Grid> */}

          {/* End don't have subscribed */}

          <div className="dashboardLeftPanel">
            <Grid container className="forMobileUsernameBlock">
              <Box className="userNameBlock">
                <h3>Hi, {user?.fullName}</h3>
                <p className="subTextThree">Let’s learn something new today!</p>
              </Box>
            </Grid>

            <Grid container spacing={3} paddingTop={4} paddingBottom={6}>
              <Grid item xs={6} lg={3}>
                <Link to="#">
                  <Box className="aiBox active">
                    <Box paddingBottom={2}>
                      <img src={sparklesIcon} />
                    </Box>
                    <p className="subTextOne fontWeight-500">AI Companion</p>
                    <p className="subTextTwo">
                      Hi 👋 I’m Lite AI, ask me any question
                    </p>
                  </Box>
                </Link>
              </Grid>
              <Grid item xs={6} lg={3}>
                <Link to="#">
                  <Box className="aiBox">
                    <Box paddingBottom={2}>
                      <img src={taskpurpleIcon} />
                    </Box>
                    <p className="subTextOne fontWeight-500">Resume AI</p>
                    <p className="subTextTwo">
                      Generate your resume in minutes
                    </p>
                  </Box>
                </Link>
              </Grid>
              <Grid item xs={6} lg={3}>
                <Link to="#">
                  <Box className="aiBox">
                    <Box paddingBottom={2}>
                      <img src={mockIcon} />
                    </Box>
                    <p className="subTextOne fontWeight-500">AI Mock</p>
                    <p className="subTextTwo">
                      Prepare for interviews more effectively
                    </p>
                  </Box>
                </Link>
              </Grid>
              <Grid item xs={6} lg={3}>
                <Link to="#">
                  <Box className="aiBox">
                    <Box paddingBottom={2}>
                      <img src={editBigIcon} />
                    </Box>
                    <p className="subTextOne fontWeight-500">Auto Apply</p>
                    <p className="subTextTwo">
                      Apply for jobs more conveniently
                    </p>
                  </Box>
                </Link>
              </Grid>
            </Grid>

            <Grid container className="courseCompleteStatus">
              <Grid item width={{ xs: "100%", lg: 224 }}>
                <Box className="courseStatus">
                  <Grid
                    item
                    container
                    alignItems={{ xs: "center", md: "flex-start" }}
                    gap={{ xs: 0, md: 1 }}
                  >
                    <Grid item xs={7} md={12}>
                      <p className="mainText fontWeight-700 color-white">
                        Continue your courses
                      </p>
                      <p className="subTextTwo color-white">
                        You have completed{" "}
                        {onGoingCourseData?.data?.totalProgress}% of your
                        overall courses
                      </p>
                    </Grid>
                    <Grid item xs={5} md={12}>
                      <PieChart data={onGoingCourseData?.data?.totalProgress} />
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Grid
                item
                sx={{
                  width: { xs: "calc(100% - 0px)", lg: "calc(100% - 224px)" },
                  paddingLeft: { md: "0px", lg: "27px" },
                  paddingTop: { xs: "30px", lg: 0 },
                }}
              >
                <Grid
                  item
                  container
                  justifyContent={"space-between"}
                  paddingBottom={2}
                >
                  <Grid item>
                    <p className="mainText fontWeight-700">Ongoing Courses</p>
                  </Grid>
                  <Grid item>
                    <Link to="/student/my-course" className="color-primary">
                      <p className="subTextTwo color-primary">See All</p>
                    </Link>
                  </Grid>
                </Grid>
                <Grid item container>
                  <Grid item xs={12}>
                    <Box className="courseStatusContent">
                      <List disablePadding>
                        <ListItem disableGutters>
                          <ListItemAvatar>
                            <Avatar
                              src={
                                onGoingCourseData?.data?.onGoingCourse[0]?.image
                              }
                            />
                          </ListItemAvatar>
                          <ListItemText
                            primary={
                              onGoingCourseData?.data?.onGoingCourse[0]?.title
                            }
                            secondary={
                              onGoingCourseData?.data?.onGoingCourse[0]
                                ?.authorName
                            }
                          />
                        </ListItem>
                      </List>
                      <Grid item container paddingBottom={2}>
                        <Grid item xs={12}>
                          <Grid
                            item
                            container
                            justifyContent={"space-between"}
                            paddingBottom={1}
                          >
                            <Grid item>
                              <p className="subTextOne">
                                Course is in progress
                              </p>
                            </Grid>
                            <Grid item>
                              <p className="subTextOne">
                                {onGoingCourseData?.data?.totalProgress}%
                              </p>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item xs={12}>
                          {onGoingCourseData?.data?.totalProgress > 0 ? (
                            <SliderValue
                              value={
                                onGoingCourseData?.data?.totalProgress ?? 0
                              }
                              readOnly
                            />
                          ) : (
                            <SliderValue value={0} readOnly />
                          )}

                          {/* <LinearProgress
                            color="primary"
                            variant="determinate"
                            value={
                              onGoingCourseData?.data?.onGoingCourse[0]
                                ?.progress
                            }
                          /> */}
                        </Grid>
                      </Grid>

                      <Link to="#">
                        <p className="mainText fontWeight-700 color-primary">
                          Continue Course
                        </p>
                      </Link>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid
              container
              paddingBottom={{ xs: 3, sm: 4, md: 7 }}
              spacing={"12px"}
            >
              {topicList?.data?.map((e) => {
                return (
                  <Grid item key={e.id}>
                    <Box className="learningtag">
                      <Grid item container alignItems={"center"} columnGap={1}>
                        <img src={e?.image} width={10} />
                        <p className="subTextOne">{e.name}</p>
                      </Grid>
                    </Box>
                  </Grid>
                );
              })}
            </Grid>

            <Grid container>
              <Grid item xs={12}>
                <Grid item container justifyContent={"space-between"}>
                  <Grid item>
                    <h4 className="fontWeight-500">Popular Instructor</h4>
                  </Grid>
                  <Grid item>
                    <Grid item container columnGap={"5px"}>
                      <Button
                        sx={{ minWidth: 24, padding: "9px 0px" }}
                        onClick={() =>
                          popularCoachesSlider?.current?.slickPrev()
                        }
                      >
                        <img src={arrowLeftIcon} width={24} />
                      </Button>
                      <Button
                        sx={{ minWidth: 24, padding: "9px 0px" }}
                        onClick={() =>
                          popularCoachesSlider?.current?.slickNext()
                        }
                      >
                        <img src={arrowRightIcon} width={24} />
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item container>
                  <Grid item xs={12} className="popularCocahSlider">
                    <Slider {...cocahSlider} ref={popularCoachesSlider}>
                      {popularCoachesList?.data?.map((e) => {
                        return (
                          <div key={e.id}>
                            <Grid item container>
                              <Grid item xs={12} className="popularCocahBlock">
                                <Grid
                                  item
                                  container
                                  rowGap={"20px"}
                                  className="popularCocahBlockInner"
                                >
                                  <Grid item xs={12}>
                                    <List disablePadding>
                                      <ListItem disableGutters disablePadding>
                                        <ListItemAvatar>
                                          <Avatar src={e.image} />
                                        </ListItemAvatar>
                                        <ListItemText primary={e.name} />
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
                                              {e.totalCourse} Course
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
                                              {e.rating} ({e.reviewerCounting}{" "}
                                              Review)
                                            </p>
                                          </Grid>
                                        </Grid>
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                          </div>
                        );
                      })}
                    </Slider>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid container paddingTop={{ sm: "30px", md: "50px" }}>
              <Grid item xs={12}>
                <Grid item container justifyContent={"space-between"}>
                  <Grid item>
                    <h4 className="fontWeight-500">Recommendation</h4>
                  </Grid>
                  <Grid item>
                    <Grid item container columnGap={"5px"}>
                      {/* {recommendationsliderCurrent != 0 && ( */}
                      <Button
                        sx={{ minWidth: 24, padding: "9px 0px" }}
                        onClick={() =>
                          Recommendationslider?.current?.slickPrev()
                        }
                      >
                        <img src={arrowLeftIcon} width={24} />
                      </Button>
                      {/* )} */}

                      {/* {recommendationList?.data?.length > 0 &&
                        recommendationList?.data?.length -
                          (recommendationsliderCurrent + 1) !=
                          recommendationslideToShow} */}
                      <Button
                        sx={{ minWidth: 24, padding: "9px 0px" }}
                        onClick={() =>
                          Recommendationslider?.current?.slickNext()
                        }
                      >
                        <img src={arrowRightIcon} width={24} />
                        {/* {recommendationsliderCurrent} */}
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item container>
                  <Grid item xs={12} className="recommendationSlider">
                    {recommendationList?.data?.length > 0 && (
                      <Slider
                        {...recommendationSlider}
                        ref={Recommendationslider}
                      >
                        {recommendationList?.data?.map((e) => {
                          return (
                            <div key={e.id}>
                              <Grid
                                item
                                container
                                paddingLeft={"15px"}
                                paddingRight={"15px"}
                              >
                                <Grid item xs={12}>
                                  <Grid
                                    item
                                    container
                                    className="recommendationSliderBlock"
                                  >
                                    <Grid item xs={12}>
                                      <Box className="imgBlock">
                                        <img src={e.image} />
                                      </Box>
                                    </Grid>
                                    <Grid item xs={12}>
                                      <Box
                                        className="contentBlock"
                                        padding={"14px"}
                                      >
                                        <Grid
                                          item
                                          container
                                          justifyContent={"space-between"}
                                        >
                                          <Grid item>
                                            <p className="subTextOne fontWeight-500">
                                              {e.title}
                                            </p>
                                          </Grid>
                                          <Grid item>
                                            <Box className="ratingBtn">
                                              <StyledRating
                                                max={1}
                                                name="customized-color"
                                                defaultValue={0}
                                                getLabelText={(value) =>
                                                  `${value} Heart${
                                                    value !== 1 ? "s" : ""
                                                  }`
                                                }
                                                precision={1}
                                                icon={
                                                  <FavoriteIcon fontSize="small" />
                                                }
                                                emptyIcon={
                                                  <FavoriteBorderIcon fontSize="small" />
                                                }
                                              />
                                            </Box>
                                          </Grid>
                                        </Grid>
                                        <Grid item container marginTop={"4px"}>
                                          <p className="subTextTwo">
                                            {e.authorName}
                                          </p>
                                        </Grid>
                                        <Grid
                                          item
                                          container
                                          alignItems={"center"}
                                          columnGap={"4px"}
                                          marginTop={"4px"}
                                        >
                                          <Grid item>
                                            <p className="mainText color-primary">
                                              ${e.discountedPrice}
                                            </p>
                                          </Grid>
                                          <Grid item>
                                            <p className="subTextTwo">
                                              ${e.originalPrice}
                                            </p>
                                          </Grid>
                                        </Grid>
                                        <Grid
                                          item
                                          container
                                          alignItems={"center"}
                                          columnGap={"4px"}
                                          marginTop={"8px"}
                                        >
                                          <Grid item>
                                            <Rating
                                              name="half-rating"
                                              value={e.reviewRating}
                                              precision={0.1}
                                              readOnly
                                            />
                                          </Grid>
                                          <Grid item>
                                            <Grid
                                              item
                                              container
                                              alignItems={"center"}
                                              columnGap={"4px"}
                                            >
                                              <p className="subTextTwo mb-0">
                                                {e.reviewRating}
                                              </p>
                                              <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="4"
                                                height="4"
                                                viewBox="0 0 4 4"
                                                fill="none"
                                              >
                                                <circle
                                                  cx="2"
                                                  cy="2"
                                                  r="2"
                                                  fill="#C4D2DF"
                                                />
                                              </svg>
                                              <p className="subTextTwo">
                                                ({e.reviewerCounting})
                                              </p>
                                            </Grid>
                                          </Grid>
                                        </Grid>
                                      </Box>
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </div>
                          );
                        })}
                      </Slider>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </div>

          <div className="dashboardRightPanel">
            <Grid container>
              <Grid item xs={12} className="studentCalendar">
                <Grid item container>
                  <Grid item xs={12}>
                    <Grid
                      item
                      container
                      marginBottom={"20px"}
                      justifyContent={"space-between"}
                    >
                      <Grid item>
                        <Button>
                          <img src={arrowLeftIcon} />
                        </Button>
                      </Grid>
                      <Grid item>
                        <p className="subTextOne fontWeight-500">April 2022</p>
                      </Grid>
                      <Grid item>
                        <Button>
                          <img src={arrowRightIcon} />
                        </Button>
                      </Grid>
                    </Grid>
                    <Grid item container className="dateBlock">
                      <Grid item xs={12}>
                        <Grid item container justifyContent={"space-between"}>
                          <Grid item>
                            <p>S</p>
                          </Grid>
                          <Grid item className="activeDay">
                            <p>M</p>
                          </Grid>
                          <Grid item>
                            <p>T</p>
                          </Grid>
                          <Grid item>
                            <p>W</p>
                          </Grid>
                          <Grid item>
                            <p>T</p>
                          </Grid>
                          <Grid item>
                            <p>F</p>
                          </Grid>
                          <Grid item>
                            <p>S</p>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Grid item container justifyContent={"space-between"}>
                          <Grid item>
                            <Button>13</Button>
                          </Grid>
                          <Grid item className="activeDate">
                            <Button>14</Button>
                          </Grid>
                          <Grid item>
                            <Button>15</Button>
                          </Grid>
                          <Grid item>
                            <Button>16</Button>
                          </Grid>
                          <Grid item>
                            <Button>17</Button>
                          </Grid>
                          <Grid item>
                            <Button>18</Button>
                          </Grid>
                          <Grid item>
                            <Button>19</Button>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}></Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12} className="tradingCourse">
                {/* <h4>Trending course</h4> */}
                <Grid item container>
                  <Grid item xs={12} className="tradingCourseInner">
                    <Grid
                      item
                      container
                      alignItems={"center"}
                      justifyContent={"space-between"}
                      marginBottom={"20px"}
                    >
                      <Grid item>
                        <p>Today</p>
                      </Grid>
                      <Grid item>
                        <Grid item container>
                          <Grid item>
                            <Button
                              sx={{ minWidth: 16, padding: "5px" }}
                              onClick={() => webnerSlider?.current?.slickPrev()}
                            >
                              <img src={arrowLeftIcon} />
                            </Button>
                          </Grid>
                          <Grid item>
                            <Button
                              sx={{ minWidth: 16, padding: "5px" }}
                              onClick={() => webnerSlider?.current?.slickNext()}
                            >
                              <img src={arrowRightIcon} />
                            </Button>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Slider
                      className="tradingCourseSlider"
                      {...settings}
                      ref={webnerSlider}
                    >
                      {onGoingCourseData?.data?.onGoingCourse?.map((e) => {
                        return (
                          <div key={e.id}>
                            <Grid item container rowGap={"20px"}>
                              <Grid item xs={12} position={"relative"}>
                                <img src={courseImg} />
                                <Button className="btnInter_midiate">
                                  Intermediate <img src={rangeIcon} alt="" />
                                </Button>
                              </Grid>
                              <Grid item xs={12}>
                                <p className="mainText fontWeight-700">
                                  UX Design : How To Implement Usability Testing
                                </p>
                                <Grid
                                  marginBottom={"10px"}
                                  item
                                  container
                                  justifyContent={"space-between"}
                                  alignItems={"center"}
                                >
                                  <p className="mb-0 subTextOne">
                                    Alfredo Rhiel Madsen
                                  </p>
                                  <Avatar
                                    sx={{ width: 30, height: 30 }}
                                    alt="Remy Sharp"
                                    src={avatarImg}
                                  />
                                </Grid>
                                <Grid
                                  item
                                  className="info"
                                  container
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
                                        <img src={userIcon} />
                                      </Grid>
                                      <Grid item>
                                        <p className="mb-0 subTextOne">
                                          500 Student
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
                                        <img src={documentIcon} />
                                      </Grid>
                                      <Grid item>
                                        <p className="mb-0 subTextOne">
                                          5 Modules
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
                                        <img src={clockIcon} />
                                      </Grid>
                                      <Grid item>
                                        <p className="mb-0 subTextOne">
                                          1h 30m
                                        </p>
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </Grid>
                              <Grid item xs={12}>
                                <Grid
                                  item
                                  container
                                  justifyContent={"space-between"}
                                >
                                  <p className="mainText fontWeight-700 mb-0 color-Neutral-Black">
                                    5 Modules
                                  </p>
                                  <p className="subTextOne mb-0 color-Neutral-Dark-Grey">
                                    0/5 Done
                                  </p>
                                </Grid>
                              </Grid>
                              <Grid item xs={12} className="infoList">
                                <Grid item container>
                                  <Grid item xs={12}>
                                    <List disablePadding>
                                      <ListItem
                                        disableGutters
                                        secondaryAction={
                                          <p className="subTextOne">10:00</p>
                                        }
                                      >
                                        <ListItemAvatar>
                                          <Avatar>1</Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary="Introduction" />
                                      </ListItem>
                                      <ListItem
                                        disableGutters
                                        secondaryAction={
                                          <p className="subTextOne">10:00</p>
                                        }
                                      >
                                        <ListItemAvatar>
                                          <Avatar>2</Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary="What is UX Design" />
                                      </ListItem>
                                      <ListItem
                                        disableGutters
                                        secondaryAction={
                                          <p className="subTextOne">10:00</p>
                                        }
                                      >
                                        <ListItemAvatar>
                                          <Avatar>3</Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary="Usability Testing" />
                                      </ListItem>
                                      <ListItem
                                        disableGutters
                                        secondaryAction={
                                          <p className="subTextOne">30:00</p>
                                        }
                                      >
                                        <ListItemAvatar>
                                          <Avatar>4</Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary="Create Usability Test" />
                                      </ListItem>
                                    </List>
                                  </Grid>
                                </Grid>
                              </Grid>
                              <Link to="/#" className="primaryBtn fullWidth">
                                Go To Detail
                              </Link>
                            </Grid>
                          </div>
                        );
                      })}
                    </Slider>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </div>
      </Seo>
    </AuthGuard>
  );
}

Component.displayName = "StudentDashboard";
