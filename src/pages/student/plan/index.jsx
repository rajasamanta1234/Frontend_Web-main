import { useDispatch, useSelector } from "react-redux";
import { AuthGuard } from "../../../guards/student/auth-guard";
import Seo from "@/components/common/seo";
import { logout } from "@/redux/slice/student/user";

import "../../../assets/css/student-dashboard/style.css";
import "../../../assets/css/student-dashboard/responsive.css";

import {
  Box,
  Grid,
} from "@mui/material";
import { Link } from "react-router-dom";

import styled from "styled-components";

import LeftBar from "../../../components/student/settings-leftbar";
import Accountmenu from "../../../components/student/account-menu";

const metaTags = [
  { name: "Metaname1", content: "content1" },
  { name: "Metaname2", content: "content2" },
];

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export function Component() {
  const dispatch = useDispatch();

  const settings = {
    nav: false,
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
  };

  const { user } = useSelector((state) => state.studetnUser);

  return (
    <AuthGuard>
      <Seo title="Dashboard" metaName="Metaname" metaTags={metaTags}>
        <div className="mainDashboardArea fullWidth">
          <Box padding={"30px 30px 0"}>
            <Grid
              container
              className="forMobileUsernameBlock"
              paddingBottom={0}
            >
              <Box className="subPageTitleWithShort">
                <h3>Accounts</h3>
              </Box>
            </Grid>
          </Box>
          <Grid container paddingBottom={4}>
            <Grid item xs={12}>
              <Grid item container>
                <Grid
                  item
                  className="editProfileLeftPanel"
                  width={{ xs: "100%", sm: 300, md: 350 }}
                >
                  <LeftBar title={"plan"} />
                </Grid>
                <Grid
                  item
                  className="editProfileRightPanel"
                  sx={{
                    width: {
                      xs: "calc(100% - 0px)",
                      sm: "calc(100% - 300px)",
                      md: "calc(100% - 350px)",
                    },
                    paddingLeft: { sm: "0px", md: "30px" },
                  }}
                >
                  <Accountmenu containedValue="6" />
                  <Box padding={"30px"}>
                    <p className="subTextThree fontWeight-700 color-Neutral-Black">
                      Plans
                    </p>
                    <Grid item container paddingTop={"30px"} spacing={"30px"}>
                      <Grid item xs={12}>
                        <Box className="studentPlanBox">
                          <Grid item container>
                            <Grid item xs={12} md={6}>
                              <h3 className="mb-8">Basic</h3>
                              <p className="mainText color-Neutral-Dark-Grey fontWeight-400 mb-32">
                                3 Month Access to All Premium Course
                              </p>
                              <Link className="primaryBtn forDesktop">
                                Go Basic
                              </Link>
                            </Grid>
                            <Grid
                              item
                              xs={12}
                              md={6}
                              textAlign={{ xs: "left", md: "right" }}
                            >
                              <h1 className="color-Neutral-Black fontWeight-500 mb-24">
                                $ 159
                              </h1>
                              <p className="mainText color-Neutral-Black fontWeight-400">
                                15% renewal discount - reg. price $188
                              </p>
                              <Link className="primaryBtn forMobile">
                                Go Basic
                              </Link>
                            </Grid>
                          </Grid>
                        </Box>
                      </Grid>
                      <Grid item xs={12}>
                        <Box className="studentPlanBox pro">
                          <Grid item container>
                            <Grid item xs={12} md={6}>
                              <h3 className="mb-8 color-white">Pro</h3>
                              <p className="mainText color-white fontWeight-400 mb-32">
                                6 Month Access to All Premium Course
                              </p>
                              <Link className="primaryBtn forDesktop">
                                Go Pro
                              </Link>
                            </Grid>
                            <Grid
                              item
                              xs={12}
                              md={6}
                              textAlign={{ xs: "left", md: "right" }}
                            >
                              <h1 className="color-white fontWeight-500 mb-24">
                                $ 236
                              </h1>
                              <p className="mainText  fontWeight-400 color-white">
                                15% renewal discount - reg. price $278
                              </p>
                              <Link className="primaryBtn forMobile">
                                Go Pro
                              </Link>
                            </Grid>
                          </Grid>
                        </Box>
                      </Grid>
                      <Grid item xs={12}>
                        <Box className="studentPlanBox">
                          <Grid item container>
                            <Grid item xs={12} md={6}>
                              <h3 className="mb-8">Elite</h3>
                              <p className="mainText color-Neutral-Dark-Grey fontWeight-400 mb-32">
                                1 Year Access to All Premium Course
                              </p>
                              <Link className="primaryBtn forDesktop">
                                Go Elite
                              </Link>
                            </Grid>
                            <Grid
                              item
                              xs={12}
                              md={6}
                              textAlign={{ xs: "left", md: "right" }}
                            >
                              <h1 className="color-Neutral-Black fontWeight-500 mb-24">
                                $ 312
                              </h1>
                              <p className="mainText color-Neutral-Black fontWeight-400">
                                15% renewal discount - reg. price $368
                              </p>
                              <Link className="primaryBtn forMobile">
                                Go Elite
                              </Link>
                            </Grid>
                          </Grid>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </Seo>
    </AuthGuard>
  );
}

Component.displayName = "StudentHelpDesk";
