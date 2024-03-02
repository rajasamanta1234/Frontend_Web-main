// import { GuestGuard } from "../../../guards/student/guest-guard";
// import Seo from "@/components/common/seo";
import { useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Googleplay from "@/assets/images/google-play.svg";
import Apple from "@/assets/images/apple.svg";
import topBanner from "@/assets/images/landing-banner.png";
import bannerShape from "@/assets/images/banner-bg-shape.png";
import learnSmarterBanner from "@/assets/images/learn-smarter/left-banner.png";
import learnSmartericonOne from "@/assets/images/learn-smarter/icon-1.png";
import learnSmartericonTwo from "@/assets/images/learn-smarter/icon-2.png";
import learnSmartericonThree from "@/assets/images/learn-smarter/icon-3.png";
import learnSmartericonFour from "@/assets/images/learn-smarter/icon-4.png";
import careerTransfomerimgOne from "@/assets/images/career-transformer/img-1.png";
import careerTransfomerimgTwo from "@/assets/images/career-transformer/img-2.png";
import careerTransfomerimgThree from "@/assets/images/career-transformer/img-3.png";
import learningWebView from "@/assets/images/learning-experience/web-dashboard.svg";
import demandCardImgOne from "@/assets/images/icon/01.svg";
import demandCardImgTwo from "@/assets/images/icon/02.svg";
import demandCardImgThree from "@/assets/images/icon/03.svg";
import demandCardImgFour from "@/assets/images/icon/04.svg";
import demandCardImgFive from "@/assets/images/icon/05.svg";
import demandCardImgSix from "@/assets/images/icon/06.svg";
import demandCardImgSeven from "@/assets/images/icon/07.svg";
import demandCardImgEight from "@/assets/images/icon/08.svg";
import leadCahrgeiconOne from "@/assets/images/lead-charge/icon-1.svg";
import leadCahrgeiconTwo from "@/assets/images/lead-charge/icon-2.svg";
import leadCahrgeiconThree from "@/assets/images/lead-charge/icon-3.svg";
import courseStars from "@/assets/images/cours-star.svg";
import contunueCourse from "@/assets/images/continue-course.svg";
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
      {/* <Seo title="Login" metaName="Metaname" metaTags={metaTags}> */}
      <section className="banner homeBanner">
        <div className="container">
          <div className="contentBlock">
            <h1>
              Building Tomorrow's Experts, One <span>Course</span> at a Time
            </h1>
            <h5>
              Explore any course, anytime, in any field while chatting with
              professional tutors and fellow students as you propel yourself
              towards your dream job with AI-enhanced resume creation and mock
              interviews.
            </h5>
            <div className="btnGroup">
              <Link to="#">
                <img src={Googleplay} alt="" />
              </Link>
              <Link to="#">
                <img src={Apple} alt="" />
              </Link>
            </div>
            <div className="imgBlock">
              <img src={topBanner} alt="" />
            </div>
          </div>
          <img src={bannerShape} alt="" className="bannerShape" />
        </div>
      </section>

      <section className="learn-smarter">
        <div className="container">
          <div className="customRow">
            <div className="left">
              <div className="title">
                <h2>Learn Smarter with Lighforth</h2>
                <p className="subTextThree">
                  Subscribe to achieve your career goals without the usual
                  stress. Enroll and track your progress on various courses.
                </p>
              </div>
              <div className="learn-smarter-thymb">
                <img src={learnSmarterBanner} alt="" />
              </div>
            </div>
            <div className="right">
              <div className="learn-smart-card">
                <span className="smart-card-thumb">
                  <img src={learnSmartericonOne} alt="" />
                </span>
                <div className="smart-card-rgt">
                  <h4 className="fontWeight-500">Training Module</h4>
                  <p className="mainText fontWeight-400">
                    Gain access to our online training modules and live classes.
                    We offer an interactive, user-friendly interface designed to
                    simplify your learning experience and make it more
                    engaging..
                  </p>
                </div>
              </div>
              <div className="learn-smart-card">
                <span className="smart-card-thumb">
                  <img src={learnSmartericonTwo} alt="" />
                </span>
                <div className="smart-card-rgt">
                  <h4 className="fontWeight-500">Auto Apply for jobs</h4>
                  <p className="mainText fontWeight-400">
                    Complete your training and unlock our AI-driven platform!
                    Effortlessly create tailored resumes, automate job
                    applications, and practice interviews customized for your
                    industry - all designed to take your career to the next
                    level.
                  </p>
                </div>
              </div>
              <div className="learn-smart-card">
                <span className="smart-card-thumb">
                  <img src={learnSmartericonThree} alt="" />
                </span>
                <div className="smart-card-rgt">
                  <h4 className="fontWeight-500">AI Job Support</h4>
                  <p className="mainText fontWeight-400">
                    With Lightforth, land your dream job and seamlessly connect
                    with our AI feature for on-the-job support. Receive
                    step-by-step guidance and valuable suggestions on task
                    approach and execution.
                  </p>
                </div>
              </div>
              <div className="learn-smart-card">
                <span className="smart-card-thumb">
                  <img src={learnSmartericonFour} alt="" />
                </span>
                <div className="smart-card-rgt">
                  <h4 className="fontWeight-500">Student Community Chat</h4>
                  <p className="mainText fontWeight-400">
                    Chat and bond with students while learning. We help foster a
                    friendly community for knowledge-sharing and endless
                    learning opportunities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="demand-course">
        <div className="container">
          <div className="title">
            <h2>In-demand courses</h2>
          </div>
          <div className="demand-card-list">
            <div className="demand-card">
              <h4>DevOps Engineer</h4>
              <div className="demand-card-thumb">
                <img src={demandCardImgOne} alt="" />
              </div>
            </div>
            <div className="demand-card">
              <h4>Project Lead</h4>
              <div className="demand-card-thumb">
                <img src={demandCardImgTwo} alt="" />
              </div>
            </div>
            <div className="demand-card">
              <h4>Business Analyst</h4>
              <div className="demand-card-thumb">
                <img src={demandCardImgThree} alt="" />
              </div>
            </div>
            <div className="demand-card">
              <h4>Marketing Officer</h4>
              <div className="demand-card-thumb">
                <img src={demandCardImgFour} alt="" />
              </div>
            </div>
            <div className="demand-card">
              <h4>Cyber Security</h4>
              <div className="demand-card-thumb">
                <img src={demandCardImgEight} alt="" />
              </div>
            </div>
            <div className="demand-card">
              <h4>Program Manager</h4>
              <div className="demand-card-thumb">
                <img src={demandCardImgFive} alt="" />
              </div>
            </div>
            <div className="demand-card">
              <h4>Technical Specialist</h4>
              <div className="demand-card-thumb">
                <img src={demandCardImgSix} alt="" />
              </div>
            </div>
            <div className="demand-card">
              <h4>
                UI
                <br />
                Designer
              </h4>
              <div className="demand-card-thumb">
                <img src={demandCardImgSeven} alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="career-transformation">
        <div className="container">
          <div className="title">
            <h2>AI-Driven Career Transformation</h2>
            <p className="subTextThree">
              Discover career success through our AI-enabled resume builder, job
              application enhancer and interview preparation tool.
            </p>
          </div>
          <div className="career-transform-down">
            <div className="customRow">
              <div className="career-traform-card">
                <div className="career-card-thumb">
                  <img src={careerTransfomerimgOne} alt="" />
                </div>
                <div className="career-card-content">
                  <h4>Automated Resume & Job Application</h4>
                  <p className="mainText">
                    After training, automate your job search with your standout
                    resume, using our AI tool.
                  </p>
                </div>
              </div>
              <div className="career-traform-card">
                <div className="career-card-thumb">
                  <img src={careerTransfomerimgTwo} alt="" />
                </div>
                <div className="career-card-content">
                  <h4>AI-Interview Prep</h4>
                  <p className="mainText">
                    Master interviews with our AI simulator! Practice for any
                    role and industry for real success.
                  </p>
                </div>
              </div>
              <div className="career-traform-card">
                <div className="career-card-thumb">
                  <img src={careerTransfomerimgThree} alt="" />
                </div>
                <div className="career-card-content">
                  <h4>AI Job Support</h4>
                  <p className="mainText">
                    On the job, grow with AI assistance! Get step-by-step
                    guidance on tasks for optimal performance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="learning-experience">
        <div className="container">
          <div className="title">
            <div className="title-main">
              <h2>Join Us and Elevate Your Learning Experience!</h2>
              <p className="subTextThree">
                Don't just dream, achieve!  Access cutting-edge courses, expert
                guidance, and a vibrant community. Begin your success story
                TODAY!
              </p>
            </div>
            <div className="title-btn">
              <Link to="#" className="outlineBtn">
                Register Now <img src={ArrowRightIcon} alt="" />
              </Link>
            </div>
          </div>
          <div className="learning-experience-down">
            <img src={learningWebView} alt="" />
          </div>
        </div>
      </section>

      <section className="lead-the-charge">
        <div className="container">
          <div className="leadChargeRow">
            <div className="lead-charge-card lead-charge-half">
              <div className="lead-charge-thumb">
                <img src={leadCahrgeiconOne} alt="" />
              </div>
              <div className="lead-charge-cntn">
                <h3>Tutor to Earn</h3>
                <p className="mainText fontWeight-400">
                  Share your expertise, inspire learners, and earn! Join our
                  dynamic community of instructors, enjoy flexible teaching, and
                  make a real impact. Transform lives and grow with us. Start
                  your teaching journey now!
                </p>
                <Link to="#" className="outlineBtn">
                  Become an Instructor <img src={ArrowRightIcon} alt="" />
                </Link>
              </div>
            </div>
            <div className="lead-charge-card lead-charge-half">
              <div className="lead-charge-thumb">
                <img src={leadCahrgeiconTwo} alt="" />
              </div>
              <div className="lead-charge-cntn">
                <h3>Lead the Charge</h3>
                <p className="mainText fontWeight-400">
                  Become an ambassador and champion education! Spread the word
                  about our revolutionary learning app and enjoy exclusive
                  perks, a lively community, and the satisfaction of making a
                  real difference. Join us now.
                </p>
                <Link to="#" className="outlineBtn">
                  Become an Ambassador <img src={ArrowRightIcon} alt="" />
                </Link>
              </div>
            </div>
            <div className="lead-charge-card lead-charge-full">
              <div className="lead-charge-thumb">
                <img src={leadCahrgeiconThree} alt="" />
              </div>
              <div className="lead-charge-cntn">
                <h3>Lighting Your Path to Career Success.</h3>
                <p className="mainText fontWeight-400">
                  Lightforth enhances your education with accessible,
                  personalized, and interactive courses. We guide you towards
                  growth and empower you to achieve your career goals..
                </p>
                <Link to="#" className="outlineBtn">
                  Create an Account <img src={ArrowRightIcon} alt="" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="leftImgRightContent leftImgRightContent-space-reduce">
        <div className="container">
          <div className="customRow">
            <div className="left">
              <div className="imgBlock">
                <img src={contunueCourse} alt="" />
              </div>
            </div>
            <div className="right">
              <div className="contentBlock">
                <div className="title">
                  <h2>
                    Refining Skills. <span>Crafting Careers.</span>
                  </h2>
                </div>
                <div className="contentBlockInner">
                  <ul>
                    <li>Measure your progress with engaging quizzes.</li>
                    <li>
                      Obtain certificates that showcase your hard-earned skills.
                    </li>
                  </ul>
                  <Link to="#" className="outlineBtn">
                    Register Now <img src={ArrowRightIcon} alt="" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="leftContentRightImg leftContentRightImg-space-reduce">
        <div className="container">
          <div className="customRow">
            <div className="left">
              <div className="contentBlock">
                <div className="title">
                  <h2>
                    We Love to <span>Hear From</span> You!
                  </h2>
                </div>
                <div className="contentBlockInner">
                  <ul>
                    <li>
                      Connect and communicate with peers and instructors on our
                      interactive platform.
                    </li>
                    <li>
                      Rate and review courses: provide valuable feedback for
                      peers and creators..
                    </li>
                  </ul>
                  <Link to="#" className="outlineBtn">
                    Register Now <img src={ArrowRightIcon} alt="" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="right">
              <div className="imgBlock">
                <img src={courseStars} alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="lightforth-opportunity">
        <div className="container">
          <div className="light-opportunity-row">
            <div className="left">
              <h2 className="fontWeight-700">
                Don't Wait for Opportunities; Create Them with Lightforth
              </h2>
            </div>
            <div className="right">
              <p className="subTextThree">
                Build a solid career path at every turn for a rewarding
                professional journey.
              </p>
              <Link to="#" className="outlineBtn">
                Create Account <img src={ArrowRightIcon} alt="" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="faqsec">
        <div className="container">
          <div className="faqRow">
            <div className="left">
              <h2>
                Got Questions?
                <br />
                Check Our Answers
              </h2>
              <p className="subTextThree">
                If you can’t find the answers you’re looking for here, please
                contact us with your enquiries.
              </p>
              <div className="faqInfoBlock">
                <div className="faqInfoCol">
                  <div className="imgBlock">
                    <img src={envolope} alt="" />
                  </div>
                  <div className="contentBlock">
                    <p className="smallText">Email address</p>
                    <p className="subTextOne">
                      <Link to="mailto:Info@lightforth.ai">
                        Info@lightforth.ai
                      </Link>
                    </p>
                  </div>
                </div>
                <div className="faqInfoCol">
                  <div className="imgBlock">
                    <img src={PhoneCall} alt="" />
                  </div>
                  <div className="contentBlock">
                    <p className="smallText">Phone Number</p>
                    <p className="subTextOne">
                      <Link to="tel:1-202-555-0177">+1-202-555-0177</Link>
                    </p>
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
                      offering AI-powered tools. We have engaging courses and a
                      supportive community to guide your unique professional
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
                      automates applications, enhancing your chances of landing
                      your dream job.
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
                      Once hired, you'll receive continuous support from our AI
                      Tasks Help feature, providing step-by-step guidance and
                      suggestions on various work tasks to help you stand out on
                      the job.
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
                      looking to upgrade your skills, our courses and tools are
                      designed for all levels.
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
                      Our smart tools adjust to your learning needs, help build
                      resumes, automate job applications, and provide on-the-job
                      guidance to boost your success.
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
                      Yes, you can! Our flexible learning environment allows you
                      to learn whenever and wherever you choose, fitting your
                      education around your lifestyle.
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
                      assistance with a supportive community and real-world job
                      application tools not just to teach you but to launch your
                      career.
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
                      Are there any interactive features in Lightforth courses?
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

      {/* </Seo> */}
    </>
  );
}

Component.displayName = "StudentLogin";
