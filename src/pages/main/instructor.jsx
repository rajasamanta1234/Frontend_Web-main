// import { GuestGuard } from "../../../guards/student/guest-guard";
import Seo from "@/components/common/seo";
import { Link } from "react-router-dom";
import Googleplay from "@/assets/images/google-play.svg";
import Apple from "@/assets/images/apple.svg";
import studentBanner from "@/assets/images/student-banner.png";
import FeatureiconOne from "@/assets/images/feature-icon/icon-1.svg";
import FeatureiconTwo from "@/assets/images/feature-icon/icon-2.svg";
import FeatureiconThree from "@/assets/images/feature-icon/icon-3.svg";
import FeatureiconFour from "@/assets/images/feature-icon/icon-4.svg";
import FeatureiconFive from "@/assets/images/feature-icon/icon-5.svg";
import FeatureiconSix from "@/assets/images/feature-icon/icon-6.svg";
import ImgOne from "@/assets/images/img-1.png";
import ImgTwo from "@/assets/images/img-2.png";
import iPhone from "@/assets/images/iPhone.png";
import ArrowRightIcon from "@/assets/images/arrow-right.svg";
import faqImg from "@/assets/images/faq.png";
import StarIcon from "@mui/icons-material/Star";
import PhoneCall from "@/assets/images/PhoneCall.svg";
import envolope from "@/assets/images/envolope.svg";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EastIcon from "@mui/icons-material/East";
import WestIcon from "@mui/icons-material/West";
import {
  Avatar,
  Button,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";

import Slider from "react-slick";
import { useRef } from "react";
const metaTags = [
  { name: "Metaname1", content: "content1" },
  { name: "Metaname2", content: "content2" },
];
export function Component() {
  //   const metaTags = [
  //     { name: "Metaname1", content: "content1" },
  //     { name: "Metaname2", content: "content2" },
  //   ];
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

  return (
    <>
      <Seo title="Instructor" metaName="Metaname" metaTags={metaTags}>
        <section className="banner instructorBanner">
          <div className="container">
            <div className="contentBlock">
              <h1>
                Teach to make a <span>difference</span>
              </h1>
              <h5>
                Move from where you are to where you want to be in your career
                with ease.
              </h5>
              <div className="btnGroup">
                <Link to="/instructor/signup" className="primaryBtn">
                  Get Started
                </Link>
              </div>
              <div className="imgBlock">
                <img src={studentBanner} alt="" />
              </div>
            </div>
          </div>
        </section>
        <section className="featuresSec">
          <div className="container">
            <div className="title">
              <h2 className="fontWeight-700">Teach to make a difference</h2>
              <p className="subTextThree">
                With lightforth, you can move from where you are to where you
                want to be in your career as a tutor with ease.
              </p>
            </div>
            <div className="featureRow">
              <div className="featureCol">
                <div className="featureColInner">
                  <div className="iconBlock">
                    <img src={FeatureiconOne} alt="" />
                  </div>
                  <div className="contentBlock">
                    <h3>Global Reach, Global Impact</h3>
                    <p className="mainText">
                      Your knowledge knows no bounds. Share it with a worldwide
                      audience and watch as your influence grows.
                    </p>
                  </div>
                </div>
              </div>
              <div className="featureCol">
                <div className="featureColInner">
                  <div className="iconBlock">
                    <img src={FeatureiconTwo} alt="" />
                  </div>
                  <div className="contentBlock">
                    <h3>Smart AI tools</h3>
                    <p className="mainText">
                      Employ modern AI tools to craft dynamic learning
                      experiences that appeal to students globally.
                    </p>
                  </div>
                </div>
              </div>
              <div className="featureCol">
                <div className="featureColInner">
                  <div className="iconBlock">
                    <img src={FeatureiconThree} alt="" />
                  </div>
                  <div className="contentBlock">
                    <h3>Engaging live classes</h3>
                    <p className="mainText">
                      Live and interactive sessions where you can actively
                      engage your students for maximum impact.
                    </p>
                  </div>
                </div>
              </div>
              <div className="featureCol">
                <div className="featureColInner">
                  <div className="iconBlock">
                    <img src={FeatureiconFour} alt="" />
                  </div>
                  <div className="contentBlock">
                    <h3>User-friendly interface</h3>
                    <p className="mainText">
                      An easy-to-use app design that makes teaching
                      straightforward and enjoyable, even if you're not familiar
                      with online tutoring.
                    </p>
                  </div>
                </div>
              </div>
              <div className="featureCol">
                <div className="featureColInner">
                  <div className="iconBlock">
                    <img src={FeatureiconFive} alt="" />
                  </div>
                  <div className="contentBlock">
                    <h3>Never Stop Growing</h3>
                    <p className="mainText">
                      Dive into ongoing professional development opportunities
                      designed to keep your teaching methods fresh and
                      impactful.
                    </p>
                  </div>
                </div>
              </div>
              <div className="featureCol">
                <div className="featureColInner">
                  <div className="iconBlock">
                    <img src={FeatureiconSix} alt="" />
                  </div>
                  <div className="contentBlock">
                    <h3>Transparent Rewards</h3>
                    <p className="mainText">
                      Enjoy a clear, competitive compensation structure that
                      honors your dedication and expertise.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="leftImgRightContent">
          <div className="container">
            <div className="customRow">
              <div className="left">
                <div className="imgBlock">
                  <img src={ImgOne} alt="" />
                </div>
              </div>
              <div className="right">
                <div className="contentBlock">
                  <div className="title">
                    <p className="subTextOne">Creative Direction</p>
                    <h2>Embark on Your Lightforth Journey</h2>
                  </div>
                  <div className="contentBlockInner">
                    <p className="subTextThree">
                      Sign up as a Lightforth tutor and create your unique
                      profile. Upload your course on our portal and connect with
                      the students who need them.
                    </p>
                    <Link to="/instructor/signup" className="outlineBtn">
                      Create an Account <img src={ArrowRightIcon} alt="" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="leftContentRightImg">
          <div className="container">
            <div className="customRow">
              <div className="left">
                <div className="contentBlock">
                  <div className="title">
                    <p className="subTextOne">Creative Direction</p>
                    <h2>
                      At Lightforth, We're not just a platform; We're a
                      partnership
                    </h2>
                  </div>
                  <div className="contentBlockInner">
                    <p className="subTextThree">
                      Become part of Lightforth Tutors' Community for
                      round-the-clock support, collaborative innovation with
                      like-minded educators, and elevate your courses through
                      continuous feedback and improvement.
                    </p>
                    <Link to="/instructor/signup" className="outlineBtn">
                      Create an Account <img src={ArrowRightIcon} alt="" />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="right">
                <div className="imgBlock">
                  <img src={ImgTwo} alt="" />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="appBannersec">
          <div className="container">
            <div className="contentBlock">
              <h2>Study Smarter Effortlessly</h2>
              <p className="subTextThree">
                Lightforth helps you advance straight to the top of your career
                by providing in-demand courses on a platform that is easy to
                navigate and instructors willing to go the extra mile for you.
              </p>
              <div className="ratingBlock">
                <div className="ratingContent">
                  <div className="startBlock">
                    <StarIcon className="active" />
                    <StarIcon className="active" />
                    <StarIcon className="active" />
                    <StarIcon className="active" />
                    <StarIcon className="active" />
                  </div>
                  <p className="mainText">4.9 / 5 rating</p>
                  <p className="mainText">Trustpilot</p>
                </div>
                <div className="ratingContent">
                  <div className="startBlock">
                    <StarIcon className="active" />
                    <StarIcon className="active" />
                    <StarIcon className="active" />
                    <StarIcon className="active" />
                    <StarIcon />
                  </div>
                  <p className="mainText">4.8 / 5 rating</p>
                  <p className="mainText">App Store</p>
                </div>
                <div className="ratingContent">
                  <div className="startBlock">
                    <StarIcon className="active" />
                    <StarIcon className="active" />
                    <StarIcon className="active" />
                    <StarIcon className="active" />
                    <StarIcon />
                  </div>
                  <p className="mainText">4.8 / 5 rating</p>
                  <p className="mainText">Play Store</p>
                </div>
              </div>
            </div>
            <img src={iPhone} className="imgRight" alt="" />
          </div>
        </section>
        <section className="faqsec">
          <div className="container">
            <div className="faqRow">
              <div className="left">
                <h3 className="fontWeight-700">
                  Frequently asked
                  <br />
                  questions
                </h3>
                <p className="subTextThree">
                  Aenean quis est erat. Pellentesque pretium convallis ligula,
                  vite euismod nisl vehicula non. In felis leo, faucibus vel
                  sagittis pharetra.
                </p>
                <div className="faqInfoBlock">
                  <div className="faqInfoCol">
                    <div className="imgBlock">
                      <img src={envolope} alt="" />
                    </div>
                    <div className="contentBlock">
                      <p className="smallText">Email address</p>
                      <p className="subTextOne">Info@lightforth.ai</p>
                    </div>
                  </div>
                  <div className="faqInfoCol">
                    <div className="imgBlock">
                      <img src={PhoneCall} alt="" />
                    </div>
                    <div className="contentBlock">
                      <p className="smallText">Phone Number</p>
                      <p className="subTextOne">+1-202-555-0177</p>
                    </div>
                  </div>
                </div>
                <img src={faqImg} alt="" />
              </div>
              <div className="right">
                <div className="faqAccordionBlock">
                  <Accordion defaultExpanded>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography>What Is Lightforth?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <p className="mainText">
                        Lightforth is a dynamic career development platform
                        offering AI-powered tools. We have engaging courses and
                        a supportive community to guide your unique professional
                        journey towards success.
                      </p>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel2a-content"
                      id="panel2a-header"
                    >
                      <Typography>
                        How does Lightforth help with job applications?
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <p className="mainText">
                        Lightforth streamlines your job hunt with an AI-driven
                        AutoApply feature that builds tailored resumes and
                        automates applications, enhancing your chances of
                        landing your dream job.
                      </p>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel2a-content"
                      id="panel2a-header"
                    >
                      <Typography>
                        What kind of support does Lightforth offer after I get a
                        job?
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <p className="mainText">
                        Once hired, you'll receive continuous support from our
                        AI Tasks Help feature, providing step-by-step guidance
                        and suggestions on various work tasks to help you stand
                        out on the job.
                      </p>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel2a-content"
                      id="panel2a-header"
                    >
                      <Typography>
                        How does Lightforth foster community and networking?
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <p className="mainText">
                        Lightforth offers a lively Student Community Chat,
                        connecting peers across courses, promoting learning and
                        socializing in a vibrant environment.
                      </p>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel2a-content"
                      id="panel2a-header"
                    >
                      <Typography>
                        Is Lightforth suitable for beginners?
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <p className="mainText">
                        Yes, it is! Whether you're starting from scratch or
                        looking to upgrade your skills, our courses and tools
                        are designed for all levels.
                      </p>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel2a-content"
                      id="panel2a-header"
                    >
                      <Typography>
                        How do Lightforth's AI-powered tools work?
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <p className="mainText">
                        Our smart tools adjust to your learning needs, help
                        build resumes, automate job applications, and provide
                        on-the-job guidance to boost your success.
                      </p>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel2a-content"
                      id="panel2a-header"
                    >
                      <Typography>
                        Can I learn at my own pace on Lightforth?
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <p className="mainText">
                        Yes, you can! Our flexible learning environment allows
                        you to learn whenever and wherever you choose, fitting
                        your education around your lifestyle.
                      </p>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel2a-content"
                      id="panel2a-header"
                    >
                      <Typography>
                        What makes Lightforth different from other learning
                        platforms?
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <p className="mainText">
                        The difference is in our ability to combine AI-powered
                        assistance with a supportive community and real-world
                        job application tools not just to teach you but to
                        launch your career.
                      </p>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel2a-content"
                      id="panel2a-header"
                    >
                      <Typography>
                        Are there any interactive features in Lightforth
                        courses?
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <p className="mainText">
                        Yes! our courses include quizzes, live classes, and
                        community chats to make learning interactive, practical,
                        and social.
                      </p>
                    </AccordionDetails>
                  </Accordion>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="testimonialSec">
          <div className="title">
            <div className="container">
              <h3>Feedbacks from real people</h3>
              <div className="sliderButton">
                <Button onClick={() => slider?.current?.slickPrev()}>
                  <WestIcon />
                </Button>
                <Button onClick={() => slider?.current?.slickNext()}>
                  <EastIcon />
                </Button>
              </div>
            </div>
          </div>
          <Slider className="testimonialSlider" {...settings} ref={slider}>
            <div>
              <Grid container className="testimonialSliderInner">
                <Grid item xs={12} className="sliderContent">
                  <Grid item container alignItems={"center"}>
                    <Grid
                      item
                      sx={{
                        width: {
                          xs: "calc(100% - 37px)",
                          sm: "calc(100% - 52px)",
                        },
                      }}
                    >
                      <List disablePadding>
                        <ListItem disableGutters>
                          <ListItemAvatar>
                            <Avatar>AM</Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary="Alexander R."
                            secondary="01 Year With Us "
                          />
                        </ListItem>
                      </List>
                    </Grid>
                    <Grid item width={{ xs: 37, sm: 52 }}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="100%"
                        height="40"
                        viewBox="0 0 52 40"
                        fill="none"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M32.9262 39.2747C30.2211 34.0447 28.8685 28.364 28.8685 22.2323C28.8685 16.0105 30.5141 10.8708 33.8053 6.81311C37.0966 2.75542 42.2138 0.726568 49.1569 0.726568V9.24772C46.7223 9.24772 44.9414 9.78875 43.8143 10.8708C42.6872 11.9529 42.1236 14.0268 42.1236 17.0926V18.4452H51.9973V39.2747H32.9262ZM4.92901 39.2746C2.2239 34.0447 0.871338 28.364 0.871338 22.2323C0.871338 16.0105 2.51695 10.8708 5.80818 6.8131C9.09942 2.75541 14.2166 0.726562 21.1598 0.726562V9.24772C18.7251 9.24772 16.9443 9.78874 15.8171 10.8708C14.69 11.9528 14.1264 14.0268 14.1264 17.0926V18.4452H24.0001V39.2746H4.92901Z"
                          fill="#DADADA"
                        />
                      </svg>
                    </Grid>
                  </Grid>
                  <Grid item container>
                    <Grid item xs={12} className="contentBlock">
                      <p className="subTextOne">
                        “ Online invoice payment helps companies save time, are
                        faster and save maximum effort for the clients and save
                        maximum effort. Online invoice payment helps companies
                        save time ”
                      </p>
                    </Grid>
                    <Grid item xs={12}>
                      <div className="startBlock">
                        <StarIcon className="active" />
                        <StarIcon className="active" />
                        <StarIcon className="active" />
                        <StarIcon className="active" />
                        <StarIcon className="active" />
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </div>
            <div>
              <Grid container className="testimonialSliderInner">
                <Grid item xs={12} className="sliderContent">
                  <Grid item container alignItems={"center"}>
                    <Grid
                      item
                      sx={{
                        width: {
                          xs: "calc(100% - 37px)",
                          sm: "calc(100% - 52px)",
                        },
                      }}
                    >
                      <List disablePadding>
                        <ListItem disableGutters>
                          <ListItemAvatar>
                            <Avatar>AM</Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary="Alexander R."
                            secondary="01 Year With Us "
                          />
                        </ListItem>
                      </List>
                    </Grid>
                    <Grid item width={{ xs: 37, sm: 52 }}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="100%"
                        height="40"
                        viewBox="0 0 52 40"
                        fill="none"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M32.9262 39.2747C30.2211 34.0447 28.8685 28.364 28.8685 22.2323C28.8685 16.0105 30.5141 10.8708 33.8053 6.81311C37.0966 2.75542 42.2138 0.726568 49.1569 0.726568V9.24772C46.7223 9.24772 44.9414 9.78875 43.8143 10.8708C42.6872 11.9529 42.1236 14.0268 42.1236 17.0926V18.4452H51.9973V39.2747H32.9262ZM4.92901 39.2746C2.2239 34.0447 0.871338 28.364 0.871338 22.2323C0.871338 16.0105 2.51695 10.8708 5.80818 6.8131C9.09942 2.75541 14.2166 0.726562 21.1598 0.726562V9.24772C18.7251 9.24772 16.9443 9.78874 15.8171 10.8708C14.69 11.9528 14.1264 14.0268 14.1264 17.0926V18.4452H24.0001V39.2746H4.92901Z"
                          fill="#DADADA"
                        />
                      </svg>
                    </Grid>
                  </Grid>
                  <Grid item container>
                    <Grid item xs={12} className="contentBlock">
                      <p className="subTextOne">
                        “ Online invoice payment helps companies save time, are
                        faster and save maximum effort for the clients and save
                        maximum effort. Online invoice payment helps companies
                        save time ”
                      </p>
                    </Grid>
                    <Grid item xs={12}>
                      <div className="startBlock">
                        <StarIcon className="active" />
                        <StarIcon className="active" />
                        <StarIcon className="active" />
                        <StarIcon className="active" />
                        <StarIcon className="active" />
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </div>
            <div>
              <Grid container className="testimonialSliderInner">
                <Grid item xs={12} className="sliderContent">
                  <Grid item container alignItems={"center"}>
                    <Grid
                      item
                      sx={{
                        width: {
                          xs: "calc(100% - 37px)",
                          sm: "calc(100% - 52px)",
                        },
                      }}
                    >
                      <List disablePadding>
                        <ListItem disableGutters>
                          <ListItemAvatar>
                            <Avatar>AM</Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary="Alexander R."
                            secondary="01 Year With Us "
                          />
                        </ListItem>
                      </List>
                    </Grid>
                    <Grid item width={{ xs: 37, sm: 52 }}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="100%"
                        height="40"
                        viewBox="0 0 52 40"
                        fill="none"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M32.9262 39.2747C30.2211 34.0447 28.8685 28.364 28.8685 22.2323C28.8685 16.0105 30.5141 10.8708 33.8053 6.81311C37.0966 2.75542 42.2138 0.726568 49.1569 0.726568V9.24772C46.7223 9.24772 44.9414 9.78875 43.8143 10.8708C42.6872 11.9529 42.1236 14.0268 42.1236 17.0926V18.4452H51.9973V39.2747H32.9262ZM4.92901 39.2746C2.2239 34.0447 0.871338 28.364 0.871338 22.2323C0.871338 16.0105 2.51695 10.8708 5.80818 6.8131C9.09942 2.75541 14.2166 0.726562 21.1598 0.726562V9.24772C18.7251 9.24772 16.9443 9.78874 15.8171 10.8708C14.69 11.9528 14.1264 14.0268 14.1264 17.0926V18.4452H24.0001V39.2746H4.92901Z"
                          fill="#DADADA"
                        />
                      </svg>
                    </Grid>
                  </Grid>
                  <Grid item container>
                    <Grid item xs={12} className="contentBlock">
                      <p className="subTextOne">
                        “ Online invoice payment helps companies save time, are
                        faster and save maximum effort for the clients and save
                        maximum effort. Online invoice payment helps companies
                        save time ”
                      </p>
                    </Grid>
                    <Grid item xs={12}>
                      <div className="startBlock">
                        <StarIcon className="active" />
                        <StarIcon className="active" />
                        <StarIcon className="active" />
                        <StarIcon className="active" />
                        <StarIcon className="active" />
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </div>
            <div>
              <Grid container className="testimonialSliderInner">
                <Grid item xs={12} className="sliderContent">
                  <Grid item container alignItems={"center"}>
                    <Grid
                      item
                      sx={{
                        width: {
                          xs: "calc(100% - 37px)",
                          sm: "calc(100% - 52px)",
                        },
                      }}
                    >
                      <List disablePadding>
                        <ListItem disableGutters>
                          <ListItemAvatar>
                            <Avatar>AM</Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary="Alexander R."
                            secondary="01 Year With Us "
                          />
                        </ListItem>
                      </List>
                    </Grid>
                    <Grid item width={{ xs: 37, sm: 52 }}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="100%"
                        height="40"
                        viewBox="0 0 52 40"
                        fill="none"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M32.9262 39.2747C30.2211 34.0447 28.8685 28.364 28.8685 22.2323C28.8685 16.0105 30.5141 10.8708 33.8053 6.81311C37.0966 2.75542 42.2138 0.726568 49.1569 0.726568V9.24772C46.7223 9.24772 44.9414 9.78875 43.8143 10.8708C42.6872 11.9529 42.1236 14.0268 42.1236 17.0926V18.4452H51.9973V39.2747H32.9262ZM4.92901 39.2746C2.2239 34.0447 0.871338 28.364 0.871338 22.2323C0.871338 16.0105 2.51695 10.8708 5.80818 6.8131C9.09942 2.75541 14.2166 0.726562 21.1598 0.726562V9.24772C18.7251 9.24772 16.9443 9.78874 15.8171 10.8708C14.69 11.9528 14.1264 14.0268 14.1264 17.0926V18.4452H24.0001V39.2746H4.92901Z"
                          fill="#DADADA"
                        />
                      </svg>
                    </Grid>
                  </Grid>
                  <Grid item container>
                    <Grid item xs={12} className="contentBlock">
                      <p className="subTextOne">
                        “ Online invoice payment helps companies save time, are
                        faster and save maximum effort for the clients and save
                        maximum effort. Online invoice payment helps companies
                        save time ”
                      </p>
                    </Grid>
                    <Grid item xs={12}>
                      <div className="startBlock">
                        <StarIcon className="active" />
                        <StarIcon className="active" />
                        <StarIcon className="active" />
                        <StarIcon className="active" />
                        <StarIcon className="active" />
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </div>
            <div>
              <Grid container className="testimonialSliderInner">
                <Grid item xs={12} className="sliderContent">
                  <Grid item container alignItems={"center"}>
                    <Grid
                      item
                      sx={{
                        width: {
                          xs: "calc(100% - 37px)",
                          sm: "calc(100% - 52px)",
                        },
                      }}
                    >
                      <List disablePadding>
                        <ListItem disableGutters>
                          <ListItemAvatar>
                            <Avatar>AM</Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary="Alexander R."
                            secondary="01 Year With Us "
                          />
                        </ListItem>
                      </List>
                    </Grid>
                    <Grid item width={{ xs: 37, sm: 52 }}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="100%"
                        height="40"
                        viewBox="0 0 52 40"
                        fill="none"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M32.9262 39.2747C30.2211 34.0447 28.8685 28.364 28.8685 22.2323C28.8685 16.0105 30.5141 10.8708 33.8053 6.81311C37.0966 2.75542 42.2138 0.726568 49.1569 0.726568V9.24772C46.7223 9.24772 44.9414 9.78875 43.8143 10.8708C42.6872 11.9529 42.1236 14.0268 42.1236 17.0926V18.4452H51.9973V39.2747H32.9262ZM4.92901 39.2746C2.2239 34.0447 0.871338 28.364 0.871338 22.2323C0.871338 16.0105 2.51695 10.8708 5.80818 6.8131C9.09942 2.75541 14.2166 0.726562 21.1598 0.726562V9.24772C18.7251 9.24772 16.9443 9.78874 15.8171 10.8708C14.69 11.9528 14.1264 14.0268 14.1264 17.0926V18.4452H24.0001V39.2746H4.92901Z"
                          fill="#DADADA"
                        />
                      </svg>
                    </Grid>
                  </Grid>
                  <Grid item container>
                    <Grid item xs={12} className="contentBlock">
                      <p className="subTextOne">
                        “ Online invoice payment helps companies save time, are
                        faster and save maximum effort for the clients and save
                        maximum effort. Online invoice payment helps companies
                        save time ”
                      </p>
                    </Grid>
                    <Grid item xs={12}>
                      <div className="startBlock">
                        <StarIcon className="active" />
                        <StarIcon className="active" />
                        <StarIcon className="active" />
                        <StarIcon className="active" />
                        <StarIcon className="active" />
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </div>
            <div>
              <Grid container className="testimonialSliderInner">
                <Grid item xs={12} className="sliderContent">
                  <Grid item container alignItems={"center"}>
                    <Grid
                      item
                      sx={{
                        width: {
                          xs: "calc(100% - 37px)",
                          sm: "calc(100% - 52px)",
                        },
                      }}
                    >
                      <List disablePadding>
                        <ListItem disableGutters>
                          <ListItemAvatar>
                            <Avatar>AM</Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary="Alexander R."
                            secondary="01 Year With Us "
                          />
                        </ListItem>
                      </List>
                    </Grid>
                    <Grid item width={{ xs: 37, sm: 52 }}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="100%"
                        height="40"
                        viewBox="0 0 52 40"
                        fill="none"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M32.9262 39.2747C30.2211 34.0447 28.8685 28.364 28.8685 22.2323C28.8685 16.0105 30.5141 10.8708 33.8053 6.81311C37.0966 2.75542 42.2138 0.726568 49.1569 0.726568V9.24772C46.7223 9.24772 44.9414 9.78875 43.8143 10.8708C42.6872 11.9529 42.1236 14.0268 42.1236 17.0926V18.4452H51.9973V39.2747H32.9262ZM4.92901 39.2746C2.2239 34.0447 0.871338 28.364 0.871338 22.2323C0.871338 16.0105 2.51695 10.8708 5.80818 6.8131C9.09942 2.75541 14.2166 0.726562 21.1598 0.726562V9.24772C18.7251 9.24772 16.9443 9.78874 15.8171 10.8708C14.69 11.9528 14.1264 14.0268 14.1264 17.0926V18.4452H24.0001V39.2746H4.92901Z"
                          fill="#DADADA"
                        />
                      </svg>
                    </Grid>
                  </Grid>
                  <Grid item container>
                    <Grid item xs={12} className="contentBlock">
                      <p className="subTextOne">
                        “ Online invoice payment helps companies save time, are
                        faster and save maximum effort for the clients and save
                        maximum effort. Online invoice payment helps companies
                        save time ”
                      </p>
                    </Grid>
                    <Grid item xs={12}>
                      <div className="startBlock">
                        <StarIcon className="active" />
                        <StarIcon className="active" />
                        <StarIcon className="active" />
                        <StarIcon className="active" />
                        <StarIcon className="active" />
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </div>
          </Slider>
        </section>
      </Seo>
    </>
  );
}

Component.displayName = "StudentLogin";
