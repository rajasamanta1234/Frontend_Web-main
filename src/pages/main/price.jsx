// import { GuestGuard } from "../../../guards/student/guest-guard";
import Seo from "@/components/common/seo";
import { Link } from "react-router-dom";

import footerLogo from "@/assets/images/footer-logo.svg";
import facebookIcon from "@/assets/images/facebook-icon.svg";
import ArrowRightWhiteIcon from "@/assets/images/ArrowRightWhite.svg";
import StackIcon from "@/assets/images/Stack.svg";
import CheckgreenIcon from "@/assets/images/Check-green.svg";
import ArrowRightPurpleIcon from "@/assets/images/arrow-right-purple.svg";
import PackageIcon from "@/assets/images/Package.svg";
import {
  Box,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import * as React from "react";

const metaTags = [
  { name: "Metaname1", content: "content1" },
  { name: "Metaname2", content: "content2" },
];

export function Component() {
  const [alignment, setAlignment] = React.useState("monthly");

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <>
      <Seo title="Price" metaName="Metaname" metaTags={metaTags}>
        <div className="subpageBanner">
          <div className="container">
            <h1>Explore our pricing plans</h1>
            <h4>
              Choose the plan that best matches your goals for a successful
              learning journey.
            </h4>
          </div>
        </div>

        <div className="priceSec">
          <div className="container">
            <div className="priceTopdec">
              <h4>Try any plan free for 14 days</h4>
              <p className="mainText">
                Experience the full benefits of Lightforth with no commitment
                fee. Start your free trial today and unlock the power of AI
                learning at your fingertips.
              </p>
            </div>
            <Grid
              container
              justifyContent={"center"}
              className="priceToggleButtonGroup"
            >
              <ToggleButtonGroup
                value={alignment}
                exclusive
                onChange={handleAlignment}
              >
                <ToggleButton value="monthly">Monthly</ToggleButton>
                <ToggleButton value="yearly">Yearly</ToggleButton>
              </ToggleButtonGroup>
            </Grid>
            <Grid container spacing={3} className="priceList">
              <Grid item xs={12} sm={6} md={6} lg={4}>
                <Box className="standardList">
                  <Grid item container flexDirection={"column"} gap={4}>
                    <Grid item xs={12}>
                      <Grid
                        item
                        container
                        justifyContent={"space-between"}
                        alignItems={"center"}
                        className="topblock"
                      >
                        <Grid item>
                          <div className="imgBox">
                            <img src={PackageIcon} />
                          </div>
                        </Grid>
                        <Grid item>
                          <h2>
                            $21<sub>/Per Month</sub>
                          </h2>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid item container className="priceName">
                        <h4>Standard</h4>
                        <p>
                          Get all the essential tools and support to build a
                          strong foundation.
                        </p>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid item container>
                        <Link to="#" className="primaryOutlineBtn">
                          Get Started <img src={ArrowRightPurpleIcon} />
                        </Link>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} className="featureList">
                      <List>
                        <ListItem disablePadding>
                          <ListItemIcon>
                            <img src={CheckgreenIcon} />
                          </ListItemIcon>
                          <ListItemText primary="Access to all basic courses" />
                        </ListItem>
                        <ListItem disablePadding>
                          <ListItemIcon>
                            <img src={CheckgreenIcon} />
                          </ListItemIcon>
                          <ListItemText primary="24/7 community chat support" />
                        </ListItem>
                        <ListItem disablePadding>
                          <ListItemIcon>
                            <img src={CheckgreenIcon} />
                          </ListItemIcon>
                          <ListItemText primary="Interactive quizzes and challenges" />
                        </ListItem>
                        <ListItem disablePadding>
                          <ListItemIcon>
                            <img src={CheckgreenIcon} />
                          </ListItemIcon>
                          <ListItemText primary="Progress tracking and certificates" />
                        </ListItem>
                      </List>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={4}>
                <Box className="recomendedList">
                  <p className="recommendedtag">Recommended</p>
                  <Grid item container flexDirection={"column"} gap={4}>
                    <Grid item xs={12}>
                      <Grid
                        item
                        container
                        justifyContent={"space-between"}
                        alignItems={"center"}
                        className="topblock"
                      >
                        <Grid item>
                          <div className="imgBox">
                            <img src={StackIcon} />
                          </div>
                        </Grid>
                        <Grid item>
                          <h2>
                            $49<sub>/Per Month</sub>
                          </h2>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid item container className="priceName">
                        <h4>Premium</h4>
                        <p>
                          Elevate your learning with advanced courses and expert
                          guidance. Perfect for individuals aiming for the next
                          level in their career.
                        </p>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid item container>
                        <Link to="#" className="primaryBtn">
                          Get Started <img src={ArrowRightWhiteIcon} />
                        </Link>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} className="featureList">
                      <List>
                        <ListItem disablePadding>
                          <ListItemIcon>
                            <img src={CheckgreenIcon} />
                          </ListItemIcon>
                          <ListItemText primary="Access to all basic courses" />
                        </ListItem>
                        <ListItem disablePadding>
                          <ListItemIcon>
                            <img src={CheckgreenIcon} />
                          </ListItemIcon>
                          <ListItemText primary="24/7 community chat support" />
                        </ListItem>
                        <ListItem disablePadding>
                          <ListItemIcon>
                            <img src={CheckgreenIcon} />
                          </ListItemIcon>
                          <ListItemText primary="Interactive quizzes and challenges" />
                        </ListItem>
                        <ListItem disablePadding>
                          <ListItemIcon>
                            <img src={CheckgreenIcon} />
                          </ListItemIcon>
                          <ListItemText primary="Progress tracking and certificates" />
                        </ListItem>
                        <ListItem disablePadding>
                          <ListItemIcon>
                            <img src={CheckgreenIcon} />
                          </ListItemIcon>
                          <ListItemText primary="Access to advanced and specialized courses" />
                        </ListItem>
                        <ListItem disablePadding>
                          <ListItemIcon>
                            <img src={CheckgreenIcon} />
                          </ListItemIcon>
                          <ListItemText primary="Live sessions with industry experts" />
                        </ListItem>
                        <ListItem disablePadding>
                          <ListItemIcon>
                            <img src={CheckgreenIcon} />
                          </ListItemIcon>
                          <ListItemText primary="Personalized learning paths" />
                        </ListItem>
                        <ListItem disablePadding>
                          <ListItemIcon>
                            <img src={CheckgreenIcon} />
                          </ListItemIcon>
                          <ListItemText primary="Priority community support" />
                        </ListItem>
                        <ListItem disablePadding>
                          <ListItemIcon>
                            <img src={CheckgreenIcon} />
                          </ListItemIcon>
                          <ListItemText primary="Offline content access" />
                        </ListItem>
                      </List>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={4}>
                <Box className="businessList">
                  <Grid item container flexDirection={"column"} gap={4}>
                    <Grid item xs={12}>
                      <Grid
                        item
                        container
                        justifyContent={"space-between"}
                        alignItems={"center"}
                        className="topblock"
                      >
                        <Grid item>
                          <div className="imgBox">
                            <img src={PackageIcon} />
                          </div>
                        </Grid>
                        <Grid item>
                          <h2>
                            $124<sub>/Per Month</sub>
                          </h2>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid item container className="priceName">
                        <h4>Business</h4>
                        <p>
                          Transform your team with targeted training and
                          development. Ideal for businesses looking to invest in
                          their employees' growth and skills.
                        </p>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid item container>
                        <Link to="#" className="primaryOutlineBtn">
                          Get Started <img src={ArrowRightPurpleIcon} />
                        </Link>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} className="featureList">
                      <List>
                        <ListItem disablePadding>
                          <ListItemIcon>
                            <img src={CheckgreenIcon} />
                          </ListItemIcon>
                          <ListItemText primary="Access to all basic courses" />
                        </ListItem>
                        <ListItem disablePadding>
                          <ListItemIcon>
                            <img src={CheckgreenIcon} />
                          </ListItemIcon>
                          <ListItemText primary="24/7 community chat support" />
                        </ListItem>
                        <ListItem disablePadding>
                          <ListItemIcon>
                            <img src={CheckgreenIcon} />
                          </ListItemIcon>
                          <ListItemText primary="Interactive quizzes and challenges" />
                        </ListItem>
                        <ListItem disablePadding>
                          <ListItemIcon>
                            <img src={CheckgreenIcon} />
                          </ListItemIcon>
                          <ListItemText primary="Progress tracking and certificates" />
                        </ListItem>
                        <ListItem disablePadding>
                          <ListItemIcon>
                            <img src={CheckgreenIcon} />
                          </ListItemIcon>
                          <ListItemText primary="Access to advanced and specialized courses" />
                        </ListItem>
                        <ListItem disablePadding>
                          <ListItemIcon>
                            <img src={CheckgreenIcon} />
                          </ListItemIcon>
                          <ListItemText primary="Live sessions with industry experts" />
                        </ListItem>
                        <ListItem disablePadding>
                          <ListItemIcon>
                            <img src={CheckgreenIcon} />
                          </ListItemIcon>
                          <ListItemText primary="Personalized learning paths" />
                        </ListItem>
                        <ListItem disablePadding>
                          <ListItemIcon>
                            <img src={CheckgreenIcon} />
                          </ListItemIcon>
                          <ListItemText primary="Priority community support" />
                        </ListItem>
                        <ListItem disablePadding>
                          <ListItemIcon>
                            <img src={CheckgreenIcon} />
                          </ListItemIcon>
                          <ListItemText primary="Offline content access" />
                        </ListItem>
                        <ListItem disablePadding>
                          <ListItemIcon>
                            <img src={CheckgreenIcon} />
                          </ListItemIcon>
                          <ListItemText primary="Multiple user accounts" />
                        </ListItem>
                        <ListItem disablePadding>
                          <ListItemIcon>
                            <img src={CheckgreenIcon} />
                          </ListItemIcon>
                          <ListItemText primary="Individual learning paths for your team" />
                        </ListItem>
                        <ListItem disablePadding>
                          <ListItemIcon>
                            <img src={CheckgreenIcon} />
                          </ListItemIcon>
                          <ListItemText primary="Exclusive access to industry-specific courses" />
                        </ListItem>
                        <ListItem disablePadding>
                          <ListItemIcon>
                            <img src={CheckgreenIcon} />
                          </ListItemIcon>
                          <ListItemText primary="Dedicated account manager and support" />
                        </ListItem>
                        <ListItem disablePadding>
                          <ListItemIcon>
                            <img src={CheckgreenIcon} />
                          </ListItemIcon>
                          <ListItemText primary="Detailed progress and performance reports" />
                        </ListItem>
                        <ListItem disablePadding>
                          <ListItemIcon>
                            <img src={CheckgreenIcon} />
                          </ListItemIcon>
                          <ListItemText primary="Custom branding and integrations" />
                        </ListItem>
                      </List>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </div>
        </div>
      </Seo>
    </>
  );
}

Component.displayName = "price";
