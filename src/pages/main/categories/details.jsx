// import { GuestGuard } from "../../../guards/student/guest-guard";
import React, { useState } from "react";
import Seo from "@/components/common/seo";
import { Link } from "react-router-dom";


import StarIcon from "@mui/icons-material/Star";
import Typography from "@mui/material/Typography";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";

import videoImage from "@/assets/images/video-img.png";
import playImage from "@/assets/images/play.png";
import tikCircale from "@/assets/images/tick-circle.png";
import documentIcon from "@/assets/images/document.svg";
import rangeRedIcon from "@/assets/images/range-red.png";
import clockIcon from "@/assets/images/clock.svg";
import userIcon from "@/assets/images/user.svg";
import reviewTwo from "@/assets/images/review2.png";
import courseImg from "@/assets/images/coruse-img.png";
import avatarImg from "@/assets/images/avatar-demo.png";
import courseImgFour from "@/assets/images/course-img-4.jpeg";
import courseImgFive from "@/assets/images/course-img-5.jpeg";
import courseImgSix from "@/assets/images/course-img-6.jpeg";
import rangeIcon from "@/assets/images/range.svg";
import calendarIcon from "@/assets/images/calendar.svg";
import figmaIcon from "@/assets/images/figma.png";
import PrincipleIcon from "@/assets/images/Principle.png";

import {
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Button,
  Card,
  CardHeader,
  IconButton,
  Box,
  Tab,
} from "@mui/material";
import Slider from "react-slick";
import { useRef } from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";

const metaTags = [
  { name: "Metaname1", content: "content1" },
  { name: "Metaname2", content: "content2" },
];

export function Component() {
  const slider = useRef(null);
  const settings = {
    nav: false,
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2,
    initialSlide: 0,
    gitter: 40,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
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

  // for tab
  const [value, setValue] = useState("1");

  const courseDtlTabChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Seo title="Course Details" metaName="Metaname" metaTags={metaTags}>
        <Grid className="subpageBanner">
          <Grid className="container">
            <h1>Course Details</h1>
          </Grid>
        </Grid>

        <Grid className="courseDtilMain">
          <Grid className="container">
            <Grid container>
              <Grid item className="courseDetailLeft">
                <Grid item>
                  <Card>
                    <Grid className="videoBox">
                      <img src={videoImage} />

                      <Button className="playBtn">
                        <img src={playImage} alt="" />
                      </Button>
                    </Grid>
                  </Card>
                  <Grid item marginTop={{ xs: "20px", md: "30px" }}>
                    <h2 className="courseName_dtlPage">
                      Animation is the Key of Successfull UI/UX Design
                    </h2>

                    <Grid
                      item
                      container
                      alignItems="center"
                      justifyContent="space-between"
                      marginBottom="20px"
                    >
                      <Grid item>
                        <Grid
                          item
                          container
                          alignItems="center"
                          columnGap="20px"
                        >
                          <Grid item className="detailsBox_riv_cont"
                            xs={12} sm="auto"
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <Avatar
                              alt=""
                              src={reviewTwo}
                              sx={{ width: 30, height: 30 }}
                            />
                            <Typography
                              paddingLeft={"10px"}
                              className="revieweName"
                            >
                              Emerson Siphron
                            </Typography>
                          </Grid>
                          <Grid item className="detailsBox_riv_cont" xs={12} sm="auto">
                            <Typography>UI UX Design . Apps Design</Typography>
                          </Grid>
                          <Grid item className="detailsBox_riv_cont" xs={12} sm="auto">
                            <Button className="BtnMentor_follow">
                              + Follow Mentor
                            </Button>
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid item>
                        <Typography className="totalRiviews">
                          <StarIcon />
                          4,5 (500 Reviews)
                        </Typography>
                      </Grid>
                    </Grid>

                    <Grid
                      item
                      container
                      alignItems={{xs: 'flex-start', sm: 'center'}}
                      justifyContent="space-between"
                      marginBottom={"20px"}
                      flexDirection={{xs: 'column-reverse', sm: 'row'}}
                      rowGap={{xs: 2, sm: 0}}
                    >
                      <Grid item>
                        <Grid
                          item
                          container
                          flexDirection={"row"}
                          columnGap={"20px"}
                        >
                          <Grid item container xs="auto">
                            <img src={userIcon} alt="" />
                            <Typography paddingLeft={"5px"}>
                              500 Student
                            </Typography>
                          </Grid>
                          <Grid item container xs="auto">
                            <img src={documentIcon} alt="" />
                            <Typography paddingLeft={"5px"}>5 Modul</Typography>
                          </Grid>
                          <Grid item container xs="auto">
                            <img src={clockIcon} alt="" />
                            <Typography paddingLeft={"5px"}>1h 30m</Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid>
                        <Box className="masterBox">
                          <Typography>Master</Typography>
                          <img src={rangeRedIcon} alt="" />
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item>
                    <Box sx={{ width: "100%" }}>
                      <TabContext value={value}>
                        <Box
                          sx={{ borderBottom: 1, borderColor: "divider" }}
                          className="detailsTab"
                        >
                          <TabList
                            onChange={courseDtlTabChange}
                            variant="scrollable"
                            scrollButtons="auto"
                          >
                            <Tab className="tabName" label="About" value="1" />
                            <Tab className="tabName" label="Assessment" value="2" />
                            <Tab className="tabName" label="Tools" value="3" />
                            <Tab className="tabName" label="Review" value="4" />
                          </TabList>
                        </Box>
                        <TabPanel value="1" style={{ padding: 0 }}>
                          <Grid container paddingTop={"30px"}>
                            <h4 className="titleDescription">Description</h4>

                            <p className="subTextOne courseDtl_pg_para">
                              The community{`'`}s need for applications that can
                              facilitate daily activities is increasing as
                              technology advances. Currently, many companies are
                              looking for developers so that they can sell
                              products (goods or services) that can reach wider
                              buyers online. To become a developer, we are not
                              required to understand all the science of design,
                              but at least we can know the basics so that we can
                              realize the design into code into a complete
                              application more effectively. This class is the
                              right medium to learn design and coding at the
                              same time. With Mentor, you will create useful
                              applications by adding animations to applications
                              that are made to make them more interesting and
                              interactive.
                            </p>

                            <p className="subTextOne courseDtl_pg_para">
                              Our expert Mentors will explain how to create a
                              furniture application from the design to code
                              stage using the flagship Google Flutter SDK
                              framework. By using the popular design tool Figma,
                              you will learn the basics of creating interactive
                              mockups as an illustration into an application or
                              commonly known as a prototype. Then you will learn
                              to apply animation between screens to make the
                              prototype come alive. After that, the process will
                              continue to slicing with a variety of ready-to-use
                              Flutter Widgets so that the developer{`'`}s work
                              can be more efficient, saving time and effort.
                            </p>

                            <p className="subTextOne courseDtl_pg_para">
                              This class is suitable for those of you who want
                              to deepen complete mobile application development
                              on the front-end side. Later the application that
                              is successfully built can become a portfolio for
                              applying for work or your personal business needs.
                              If you encounter difficulties while studying,
                              please ask our Mentor directly through the
                              Telegram group, OK? Register now and we are
                              waiting in class!
                            </p>
                          </Grid>

                          <Grid item marginTop={{ xs: "20px", md: "30px" }}>
                            <h3 className="titleKeyPoint">Key Point</h3>

                            <List className="keyItmList_wrap">
                              <ListItem className="keyItmList">
                                <img src={tikCircale} alt="" /> Understand the
                                basics of Prototype & Animation
                              </ListItem>
                              <ListItem className="keyItmList">
                                <img src={tikCircale} alt="" /> Understand the
                                basics of MicroInteraction
                              </ListItem>
                              <ListItem className="keyItmList">
                                <img src={tikCircale} alt="" /> Creating
                                Animation (20 case studies) for mobile apps
                              </ListItem>
                              <ListItem className="keyItmList">
                                <img src={tikCircale} alt="" /> Presenting
                                designs using Animation
                              </ListItem>
                            </List>
                          </Grid>
                        </TabPanel>
                        <TabPanel value="2" style={{ padding: 0 }}>
                          <Grid item container>
                            <Grid item xs={12}>
                              <Grid item container padding={'30px 0px'}>
                                <Grid item xs={12}>
                                  <Grid item container flexDirection={'column'} rowGap={'20px'}>
                                    <Grid item xs={12}>
                                      <p className="subTextThree fontWeight-500 color-Neutral-Black">1.Make a simple animation from figma prototype</p>
                                    </Grid>
                                    <Grid item xs={12}>
                                      <p className="subTextOne color-Neutral-Black">Let’s return to design thinking. Over time designers have built up their own body of approaches to solving classes of problems.</p>
                                    </Grid>
                                    <Grid item xs={12}>
                                      <Grid item container columnGap={'20px'}>
                                        <Grid item>
                                          <button className="normalBtn"><img src={calendarIcon} /> Calendar</button>
                                        </Grid>
                                        <Grid item>
                                          <button className="primaryBtn">Detail</button>
                                        </Grid>
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid item xs={12}>
                              <Grid item container padding={'30px 0px'}>
                                <Grid item xs={12}>
                                  <Grid item container flexDirection={'column'} rowGap={'20px'}>
                                    <Grid item xs={12}>
                                      <p className="subTextThree fontWeight-500 color-Neutral-Black">2. Make a micro interaction with principle</p>
                                    </Grid>
                                    <Grid item xs={12}>
                                      <p className="subTextOne color-Neutral-Black">Let’s return to design thinking. Over time designers have built up their own body of approaches to solving classes of problems.</p>
                                    </Grid>
                                    <Grid item xs={12}>
                                      <Grid item container columnGap={'20px'}>
                                        <Grid item>
                                          <button className="normalBtn"><img src={calendarIcon} /> Calendar</button>
                                        </Grid>
                                        <Grid item>
                                          <button className="primaryBtn">Detail</button>
                                        </Grid>
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid item xs={12}>
                              <Grid item container padding={'30px 0px'}>
                                <Grid item xs={12}>
                                  <Grid item container flexDirection={'column'} rowGap={'20px'}>
                                    <Grid item xs={12}>
                                      <p className="subTextThree fontWeight-500 color-Neutral-Black">3. Make a showcase animation for dribbble</p>
                                    </Grid>
                                    <Grid item xs={12}>
                                      <p className="subTextOne color-Neutral-Black">Let’s return to design thinking. Over time designers have built up their own body of approaches to solving classes of problems.</p>
                                    </Grid>
                                    <Grid item xs={12}>
                                      <Grid item container columnGap={'20px'}>
                                        <Grid item>
                                          <button className="normalBtn"><img src={calendarIcon} /> Calendar</button>
                                        </Grid>
                                        <Grid item>
                                          <button className="primaryBtn">Detail</button>
                                        </Grid>
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </TabPanel>
                        <TabPanel value="3" style={{ padding: 0 }}>
                          <Grid item container padding={'30px 0'} className="toolsblock">
                            <Grid item xs={12}>
                              <Grid item container>
                                <Grid item xs={12} sm={6} padding={'30px'}>
                                  <List disablePadding>
                                    <ListItem disablePadding disableGutters
                                      secondaryAction={
                                        <Button edge="end">
                                          Download
                                        </Button>
                                      }
                                    >
                                      <ListItemAvatar>
                                        <Avatar src={figmaIcon} />
                                      </ListItemAvatar>
                                      <ListItemText
                                        primary="Figma"
                                        secondary="Freemium"
                                      />
                                    </ListItem>
                                  </List>
                                </Grid>
                                <Grid item xs={12} sm={6} padding={'30px'}>
                                  <List disablePadding>
                                    <ListItem disablePadding disableGutters
                                      secondaryAction={
                                        <Button edge="end">
                                          Download
                                        </Button>
                                      }
                                    >
                                      <ListItemAvatar>
                                        <Avatar src={PrincipleIcon} />
                                      </ListItemAvatar>
                                      <ListItemText
                                        primary="Figma"
                                        secondary="Freemium"
                                      />
                                    </ListItem>
                                  </List>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </TabPanel>
                        <TabPanel value="4" style={{ padding: 0 }}>
                          <Grid item container className="courseReviewBlock">
                            <Grid item xs={12}>
                              <Grid item container padding={'30px 0px'}>
                                <Grid item xs={12}>
                                  <Grid item container flexDirection={'column'} rowGap={'20px'}>
                                    <Grid item xs={12}>
                                      <p className="mainText fontWeight-500 color-Neutral-Black">Jason Smith</p>
                                    </Grid>
                                    <Grid item xs={12}>
                                      <Grid item container justifyContent={'space-between'} columnGap={'20px'}>
                                        <Grid item>
                                          <Grid item container columnGap={'10px'}>
                                            <StarIcon fontSize="small" className="active" />
                                            <StarIcon fontSize="small" className="active" />
                                            <StarIcon fontSize="small" className="active" />
                                            <StarIcon fontSize="small" className="active" />
                                            <StarIcon fontSize="small" />
                                          </Grid>
                                        </Grid>
                                        <Grid item>
                                          <p className="subTextOne color-Neutral-Dark-Grey">20 Feb 2022</p>
                                        </Grid>
                                      </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                      <p className="subTextOne color-Neutral-Black">This course definitely brings me more values than I expect. Thank you so much both of you guys!</p>
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid item xs={12}>
                              <Grid item container padding={'30px 0px'}>
                                <Grid item xs={12}>
                                  <Grid item container flexDirection={'column'} rowGap={'20px'}>
                                    <Grid item xs={12}>
                                      <p className="mainText fontWeight-500 color-Neutral-Black">Jason Smith</p>
                                    </Grid>
                                    <Grid item xs={12}>
                                      <Grid item container justifyContent={'space-between'} columnGap={'20px'}>
                                        <Grid item>
                                          <Grid item container columnGap={'10px'}>
                                            <StarIcon fontSize="small" className="active" />
                                            <StarIcon fontSize="small" className="active" />
                                            <StarIcon fontSize="small" className="active" />
                                            <StarIcon fontSize="small" className="active" />
                                            <StarIcon fontSize="small" />
                                          </Grid>
                                        </Grid>
                                        <Grid item>
                                          <p className="subTextOne color-Neutral-Dark-Grey">20 Feb 2022</p>
                                        </Grid>
                                      </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                      <p className="subTextOne color-Neutral-Black">This course definitely brings me more values than I expect. Thank you so much both of you guys!</p>
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid item xs={12}>
                              <Grid item container padding={'30px 0px'}>
                                <Grid item xs={12}>
                                  <Grid item container flexDirection={'column'} rowGap={'20px'}>
                                    <Grid item xs={12}>
                                      <p className="mainText fontWeight-500 color-Neutral-Black">Jason Smith</p>
                                    </Grid>
                                    <Grid item xs={12}>
                                      <Grid item container justifyContent={'space-between'} columnGap={'20px'}>
                                        <Grid item>
                                          <Grid item container columnGap={'10px'}>
                                            <StarIcon fontSize="small" className="active" />
                                            <StarIcon fontSize="small" className="active" />
                                            <StarIcon fontSize="small" className="active" />
                                            <StarIcon fontSize="small" className="active" />
                                            <StarIcon fontSize="small" />
                                          </Grid>
                                        </Grid>
                                        <Grid item>
                                          <p className="subTextOne color-Neutral-Dark-Grey">20 Feb 2022</p>
                                        </Grid>
                                      </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                      <p className="subTextOne color-Neutral-Black">This course definitely brings me more values than I expect. Thank you so much both of you guys!</p>
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item container paddingTop={'60px'}>
                            <Grid item xs={12}>
                              <button className="normalBtn fullWidth">See More Review</button>
                            </Grid>
                          </Grid>
                        </TabPanel>
                      </TabContext>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item className="courseDetailRight">
                <Grid item container rowGap={'30px'}>
                  <Grid item xs={12}>
                    <p className="subTextThree fontWeight-700">UX Design : How To Implement Usability Testing</p>
                    <Grid marginBottom={'10px'} item container justifyContent={'space-between'} alignItems={'center'}>
                      <Grid item>
                        <Grid item container alignItems={'center'} columnGap={'10px'}>
                          <Avatar sx={{ width: 30, height: 30 }} alt="Remy Sharp" src={avatarImg} />
                          <p className="mb-0 subTextOne color-Neutral-Dark-Grey">Alfredo Rhiel Madsen</p>
                        </Grid>
                      </Grid>
                      <Grid item>
                        <Grid item container alignItems={'center'} columnGap={'5px'}>
                          <StarIcon color="primary" fontSize="small" />
                          <p className="color-Neutral-Black">4,5</p>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item className="info" container justifyContent={'space-between'}>
                      <Grid item>
                        <Grid item container alignItems={'center'} columnGap={'5px'}>
                          <Grid item><img src={userIcon} /></Grid>
                          <Grid item><p className="mb-0 subTextOne color-Neutral-Black">500 Student</p></Grid>
                        </Grid>
                      </Grid>
                      <Grid item>
                        <Grid item container alignItems={'center'} columnGap={'5px'}>
                          <Grid item><img src={documentIcon} /></Grid>
                          <Grid item><p className="mb-0 subTextOne color-Neutral-Black">5 Modul</p></Grid>
                        </Grid>
                      </Grid>
                      <Grid item>
                        <Grid item container alignItems={'center'} columnGap={'5px'}>
                          <Grid item><img src={clockIcon} /></Grid>
                          <Grid item><p className="mb-0 subTextOne color-Neutral-Black">1h 30m</p></Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid item container justifyContent={'space-between'}>
                      <p className="mainText fontWeight-700 mb-0 color-Neutral-Black">5 Modul</p>
                      <p className="subTextOne mb-0 color-Neutral-Dark-Grey">0/5 Done</p>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} className="infoList">
                    <Grid item container>
                      <Grid item xs={12}>
                        <List disablePadding>
                          <ListItem disablePadding disableGutters
                            secondaryAction={
                              <p className="subTextOne color-Neutral-Dark-Grey">10:00</p>
                            }
                          >
                            <ListItemAvatar>
                              <Avatar>
                                1
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Introduction" />
                          </ListItem>
                          <ListItem disablePadding disableGutters
                            secondaryAction={
                              <p className="subTextOne color-Neutral-Dark-Grey">10:00</p>
                            }
                          >
                            <ListItemAvatar>
                              <Avatar>
                                2
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="What is UX Design" />
                          </ListItem>
                          <ListItem disablePadding disableGutters
                            secondaryAction={
                              <p className="subTextOne color-Neutral-Dark-Grey">10:00</p>
                            }
                          >
                            <ListItemAvatar>
                              <Avatar>
                                3
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Usability Testing" />
                          </ListItem>
                          <ListItem disablePadding disableGutters
                            secondaryAction={
                              <p className="subTextOne color-Neutral-Dark-Grey">30:00</p>
                            }
                          >
                            <ListItemAvatar>
                              <Avatar>
                                4
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Create Usability Test" />
                          </ListItem>
                        </List>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Link to="/#" className="primaryBtn fullWidth">Join Course</Link>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid className="testimonialSec">
          <Grid className="container">
            <Grid
              container
              alignItems="center"
              justifyContent="space-between"
              marginBottom="30px"
            >
              <h3 className="title_recentCourse">Related Course</h3>
              <Box className="sliderButton">
                <Button onClick={() => slider?.current?.slickPrev()}>
                  <ArrowBackIosNewRoundedIcon />
                </Button>
                <Button onClick={() => slider?.current?.slickNext()}>
                  <ArrowForwardIosRoundedIcon />
                </Button>
              </Box>
            </Grid>
            <Slider className="relatedCourseSlider" {...settings} ref={slider}>
              <div>
                <Grid container className="relatedCourseSliderInner">
                  <Grid item padding={'30px'}>
                    <Grid item container flexDirection={'column'} rowGap={'20px'}>
                      <Grid item xs={12} className="imgBlock">
                        <img src={courseImgFour} />
                        <Button className="btnInter_midiate">
                          Intermediate <img src={rangeIcon} alt="" />
                        </Button>
                      </Grid>
                      <Grid item xs={12}>
                        <Grid item container>
                          <Grid item xs={12}>
                            <p className="subTextThree fontWeight-700 color-Neutral-Black">Introduction Basic Programming HTML & CSS</p>
                          </Grid>
                          <Grid item xs={12}>
                            <Grid marginTop={'10px'} marginBottom={'10px'} item container justifyContent={'space-between'} alignItems={'center'}>
                              <Grid item>
                                <Grid item container alignItems={'center'} columnGap={'10px'}>
                                  <Avatar sx={{ width: 30, height: 30 }} alt="Remy Sharp" src={avatarImg} />
                                  <p className="mb-0 subTextOne color-Neutral-Dark-Grey">Alfredo Rhiel Madsen</p>
                                </Grid>
                              </Grid>
                              <Grid item>
                                <Grid item container alignItems={'center'} columnGap={'5px'}>
                                  <StarIcon color="primary" fontSize="small" />
                                  <p className="color-Neutral-Black">4,5</p>
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid item className="info" container justifyContent={'space-between'}>
                              <Grid item>
                                <Grid item container alignItems={'center'} columnGap={'5px'}>
                                  <Grid item><img src={userIcon} /></Grid>
                                  <Grid item><p className="mb-0 subTextOne color-Neutral-Black">500 Student</p></Grid>
                                </Grid>
                              </Grid>
                              <Grid item>
                                <Grid item container alignItems={'center'} columnGap={'5px'}>
                                  <Grid item><img src={documentIcon} /></Grid>
                                  <Grid item><p className="mb-0 subTextOne color-Neutral-Black">5 Modul</p></Grid>
                                </Grid>
                              </Grid>
                              <Grid item>
                                <Grid item container alignItems={'center'} columnGap={'5px'}>
                                  <Grid item><img src={clockIcon} /></Grid>
                                  <Grid item><p className="mb-0 subTextOne color-Neutral-Black">1h 30m</p></Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </div>
              <div>
                <Grid container className="relatedCourseSliderInner">
                  <Grid item padding={'30px'}>
                    <Grid item container flexDirection={'column'} rowGap={'20px'}>
                      <Grid item xs={12} className="imgBlock">
                        <img src={courseImgFive} />
                        <Button className="btnInter_midiate">
                          Intermediate <img src={rangeIcon} alt="" />
                        </Button>
                      </Grid>
                      <Grid item xs={12}>
                        <Grid item container>
                          <Grid item xs={12}>
                            <p className="subTextThree fontWeight-700 color-Neutral-Black">Introduction Basic Programming HTML & CSS</p>
                          </Grid>
                          <Grid item xs={12}>
                            <Grid marginTop={'10px'} marginBottom={'10px'} item container justifyContent={'space-between'} alignItems={'center'}>
                              <Grid item>
                                <Grid item container alignItems={'center'} columnGap={'10px'}>
                                  <Avatar sx={{ width: 30, height: 30 }} alt="Remy Sharp" src={avatarImg} />
                                  <p className="mb-0 subTextOne color-Neutral-Dark-Grey">Alfredo Rhiel Madsen</p>
                                </Grid>
                              </Grid>
                              <Grid item>
                                <Grid item container alignItems={'center'} columnGap={'5px'}>
                                  <StarIcon color="primary" fontSize="small" />
                                  <p className="color-Neutral-Black">4,5</p>
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid item className="info" container justifyContent={'space-between'}>
                              <Grid item>
                                <Grid item container alignItems={'center'} columnGap={'5px'}>
                                  <Grid item><img src={userIcon} /></Grid>
                                  <Grid item><p className="mb-0 subTextOne color-Neutral-Black">500 Student</p></Grid>
                                </Grid>
                              </Grid>
                              <Grid item>
                                <Grid item container alignItems={'center'} columnGap={'5px'}>
                                  <Grid item><img src={documentIcon} /></Grid>
                                  <Grid item><p className="mb-0 subTextOne color-Neutral-Black">5 Modul</p></Grid>
                                </Grid>
                              </Grid>
                              <Grid item>
                                <Grid item container alignItems={'center'} columnGap={'5px'}>
                                  <Grid item><img src={clockIcon} /></Grid>
                                  <Grid item><p className="mb-0 subTextOne color-Neutral-Black">1h 30m</p></Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </div>
              <div>
                <Grid container className="relatedCourseSliderInner">
                  <Grid item padding={'30px'}>
                    <Grid item container flexDirection={'column'} rowGap={'20px'}>
                      <Grid item xs={12} className="imgBlock">
                        <img src={courseImgSix} />
                        <Button className="btnInter_midiate">
                          Intermediate <img src={rangeIcon} alt="" />
                        </Button>
                      </Grid>
                      <Grid item xs={12}>
                        <Grid item container>
                          <Grid item xs={12}>
                            <p className="subTextThree fontWeight-700 color-Neutral-Black">Introduction Basic Programming HTML & CSS</p>
                          </Grid>
                          <Grid item xs={12}>
                            <Grid marginTop={'10px'} marginBottom={'10px'} item container justifyContent={'space-between'} alignItems={'center'}>
                              <Grid item>
                                <Grid item container alignItems={'center'} columnGap={'10px'}>
                                  <Avatar sx={{ width: 30, height: 30 }} alt="Remy Sharp" src={avatarImg} />
                                  <p className="mb-0 subTextOne color-Neutral-Dark-Grey">Alfredo Rhiel Madsen</p>
                                </Grid>
                              </Grid>
                              <Grid item>
                                <Grid item container alignItems={'center'} columnGap={'5px'}>
                                  <StarIcon color="primary" fontSize="small" />
                                  <p className="color-Neutral-Black">4,5</p>
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid item className="info" container justifyContent={'space-between'}>
                              <Grid item>
                                <Grid item container alignItems={'center'} columnGap={'5px'}>
                                  <Grid item><img src={userIcon} /></Grid>
                                  <Grid item><p className="mb-0 subTextOne color-Neutral-Black">500 Student</p></Grid>
                                </Grid>
                              </Grid>
                              <Grid item>
                                <Grid item container alignItems={'center'} columnGap={'5px'}>
                                  <Grid item><img src={documentIcon} /></Grid>
                                  <Grid item><p className="mb-0 subTextOne color-Neutral-Black">5 Modul</p></Grid>
                                </Grid>
                              </Grid>
                              <Grid item>
                                <Grid item container alignItems={'center'} columnGap={'5px'}>
                                  <Grid item><img src={clockIcon} /></Grid>
                                  <Grid item><p className="mb-0 subTextOne color-Neutral-Black">1h 30m</p></Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </div>
              <div>
                <Grid container className="relatedCourseSliderInner">
                  <Grid item padding={'30px'}>
                    <Grid item container flexDirection={'column'} rowGap={'20px'}>
                      <Grid item xs={12} className="imgBlock">
                        <img src={courseImgFour} />
                        <Button className="btnInter_midiate">
                          Intermediate <img src={rangeIcon} alt="" />
                        </Button>
                      </Grid>
                      <Grid item xs={12}>
                        <Grid item container>
                          <Grid item xs={12}>
                            <p className="subTextThree fontWeight-700 color-Neutral-Black">Introduction Basic Programming HTML & CSS</p>
                          </Grid>
                          <Grid item xs={12}>
                            <Grid marginTop={'10px'} marginBottom={'10px'} item container justifyContent={'space-between'} alignItems={'center'}>
                              <Grid item>
                                <Grid item container alignItems={'center'} columnGap={'10px'}>
                                  <Avatar sx={{ width: 30, height: 30 }} alt="Remy Sharp" src={avatarImg} />
                                  <p className="mb-0 subTextOne color-Neutral-Dark-Grey">Alfredo Rhiel Madsen</p>
                                </Grid>
                              </Grid>
                              <Grid item>
                                <Grid item container alignItems={'center'} columnGap={'5px'}>
                                  <StarIcon color="primary" fontSize="small" />
                                  <p className="color-Neutral-Black">4,5</p>
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid item className="info" container justifyContent={'space-between'}>
                              <Grid item>
                                <Grid item container alignItems={'center'} columnGap={'5px'}>
                                  <Grid item><img src={userIcon} /></Grid>
                                  <Grid item><p className="mb-0 subTextOne color-Neutral-Black">500 Student</p></Grid>
                                </Grid>
                              </Grid>
                              <Grid item>
                                <Grid item container alignItems={'center'} columnGap={'5px'}>
                                  <Grid item><img src={documentIcon} /></Grid>
                                  <Grid item><p className="mb-0 subTextOne color-Neutral-Black">5 Modul</p></Grid>
                                </Grid>
                              </Grid>
                              <Grid item>
                                <Grid item container alignItems={'center'} columnGap={'5px'}>
                                  <Grid item><img src={clockIcon} /></Grid>
                                  <Grid item><p className="mb-0 subTextOne color-Neutral-Black">1h 30m</p></Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </div>
            </Slider>
          </Grid>
        </Grid>
      </Seo>
    </>
  );
}

Component.displayName = "CourseDetails";
