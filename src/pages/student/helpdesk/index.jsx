import { useDispatch, useSelector } from "react-redux";
import { AuthGuard } from "../../../guards/student/auth-guard";
import Seo from "@/components/common/seo";

import "../../../assets/css/student-dashboard/style.css";
import "../../../assets/css/student-dashboard/responsive.css";

import RoundIconOne from "@/assets/images/Round-icon-1.svg";
import RoundIconTwo from "@/assets/images/Round-icon-2.svg";
import RoundIconThree from "@/assets/images/Round-icon-3.svg";
import {
  Box,
  Divider,
  Grid,
} from "@mui/material";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import SliderValue from "@mui/material/Slider";
import StarIcon from "@mui/icons-material/Star";
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
          <Grid container paddingBottom={{ xs: 0, md: 4 }}>
            <Grid item xs={12}>
              <Grid item container>
                <Grid
                  item
                  className="editProfileLeftPanel"
                  width={{ xs: "100%", sm: 300, md: 350 }}
                >
                  <LeftBar title={"helpdesk"} />
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
                  <Accountmenu containedValue="7" />
                  <Box padding={"30px"}>
                    <p className="subTextThree fontWeight-700 color-Neutral-Black">
                      Helpdesk
                    </p>
                    <Grid item container paddingTop={"30px"} spacing={"30px"}>
                      <Grid item xs={12}>
                        <Grid item container>
                          <Grid item width={48}>
                            <img src={RoundIconOne} />
                          </Grid>
                          <Grid
                            item
                            sx={{
                              width: "calc(100% - 48px)",
                              paddingLeft: "20px",
                            }}
                          >
                            <p className="subTextOne color-Neutral-Black fontWeight-500 mb-8">
                              What is LightForth
                            </p>
                            <p className="subTextOne color-Neutral-Dark-Grey">
                              Here for the first time? See how ExcelMindC can
                              help student to improve it self
                            </p>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Divider />
                      </Grid>
                      <Grid item xs={12}>
                        <Grid item container>
                          <Grid item width={48}>
                            <img src={RoundIconTwo} />
                          </Grid>
                          <Grid
                            item
                            sx={{
                              width: "calc(100% - 48px)",
                              paddingLeft: "20px",
                            }}
                          >
                            <p className="subTextOne color-Neutral-Black fontWeight-500 mb-8">
                              Term & Condition
                            </p>
                            <p className="subTextOne color-Neutral-Dark-Grey">
                              Updating your privacy policy to include Substance,
                              and our own term and privacy policy.
                            </p>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Divider />
                      </Grid>
                      <Grid item xs={12}>
                        <Grid item container>
                          <Grid item width={48}>
                            <img src={RoundIconThree} />
                          </Grid>
                          <Grid
                            item
                            sx={{
                              width: "calc(100% - 48px)",
                              paddingLeft: "20px",
                            }}
                          >
                            <p className="subTextOne color-Neutral-Black fontWeight-500 mb-8">
                              Getting Started
                            </p>
                            <p className="subTextOne color-Neutral-Dark-Grey">
                              Everything you need to know to get started with
                              Substance Lightforth
                            </p>
                          </Grid>
                        </Grid>
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
