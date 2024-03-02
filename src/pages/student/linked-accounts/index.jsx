import { useState, useEffect } from "react";

import { AuthGuard } from "../../../guards/student/auth-guard";
import Seo from "@/components/common/seo";

import "../../../assets/css/student-dashboard/style.css";
import "../../../assets/css/student-dashboard/responsive.css";

import facebookColorIcon from "@/assets/images/facebook-icon-color.svg";
import googleColorIcon from "@/assets/images/devicon_google.svg";
import { Box, Divider, Grid } from "@mui/material";

import LeftBar from "../../../components/student/settings-leftbar";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useGetStudentProfileDataMutation } from "../../../redux/api/student/profile";
import Accountmenu from "../../../components/student/account-menu";
import moment from "moment";
import { Link } from "react-router-dom";

const metaTags = [
  { name: "Metaname1", content: "content1" },
  { name: "Metaname2", content: "content2" },
];

export function Component() {
  const [showFb, setshowFb] = useState(false);
  const [showGoogle, setshowGoogle] = useState(false);

  const [getData, { isSuccess, data }] = useGetStudentProfileDataMutation();
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (isSuccess && data) {
      console.log(data, "data");
    }
  }, [isSuccess, data]);
  return (
    <AuthGuard>
      <Seo title="Linked Accounts" metaName="Metaname" metaTags={metaTags}>
        <div className="mainDashboardArea fullWidth">
          <Box padding={"0 30px"}>
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
                  <LeftBar title={"linkAccount"} />
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
                  <Accountmenu containedValue="5" />
                  <Box padding={"30px"}>
                    <p className="subTextThree fontWeight-700 color-Neutral-Black">
                      Linked Accounts
                    </p>
                    <Grid
                      item
                      container
                      paddingTop={"30px"}
                      spacing={"30px"}
                      className="accountLinkBlock"
                    >
                      {!data?.data?.hasFacebook &&
                        !data?.data?.hasGoogle &&
                        !data?.data?.hasLinkedin && (
                          <p
                            className="subTextThree fontWeight-500"
                            style={{ color: "red" }}
                          >
                            There is no linked accounts for now
                          </p>
                        )}
                      {data?.data?.hasLinkedin && (
                        <>
                          <Grid item xs={12}>
                            <Grid item container className="accountLinkBox">
                              <Grid item width={30}>
                                <img
                                  src={
                                    "https://cdn1.iconfinder.com/data/icons/logotypes/32/circle-linkedin-512.png"
                                  }
                                />
                              </Grid>
                              <Grid
                                item
                                sx={{
                                  width: "calc(100% - 30px)",
                                  paddingLeft: "16px",
                                }}
                              >
                                <p className="subTextOne color-Neutral-900 fontWeight-500 mb-8">
                                  Linkedin
                                </p>
                                <p className="subTextTwo color-Neutral-900 mb-8">
                                  {moment(data?.data?.linkedinTime).format(
                                    "MMMM Do YYYY, h:mm:ss a"
                                  )}
                                </p>
                                {showFb && (
                                  <Box marginBottom={1}>
                                    <p className="small mb-0">
                                      You have granted the following access to the
                                      service
                                    </p>
                                    <ul>
                                      <li>
                                        Use the email address associated with your
                                        account
                                      </li>
                                      <li>Use your name and photo</li>
                                    </ul>
                                  </Box>
                                )}
                                <Link
                                  className="subTextTwo color-Neutral-900"
                                  onClick={() => {
                                    setshowFb(!showFb);
                                  }}
                                >
                                  Show {showFb ? "more" : "less"}
                                  {showFb ? (
                                    <KeyboardArrowDownIcon fontSize="small" />
                                  ) : (
                                    <KeyboardArrowUpIcon fontSize="small" />
                                  )}
                                </Link>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item xs={12}>
                            <Divider />
                          </Grid>{" "}
                        </>
                      )}

                      {data?.data?.hasFacebook && (
                        <>
                          <Grid item xs={12}>
                            <Grid item container className="accountLinkBox">
                              <Grid item width={30}>
                                <img src={facebookColorIcon} />
                              </Grid>
                              <Grid
                                item
                                sx={{
                                  width: "calc(100% - 30px)",
                                  paddingLeft: "16px",
                                }}
                              >
                                <p className="subTextOne color-Neutral-900 fontWeight-500 mb-8">
                                  Facebook
                                </p>
                                <p className="subTextTwo color-Neutral-900 mb-8">
                                  Jan 2, 2024 • 11:00 AM CST
                                </p>
                                {showFb && (
                                  <Box marginBottom={1}>
                                    <p className="small mb-0">
                                      You have granted the following access to the
                                      service
                                    </p>
                                    <ul>
                                      <li>
                                        Use the email address associated with your
                                        account
                                      </li>
                                      <li>Use your name and photo</li>
                                    </ul>
                                  </Box>
                                )}
                                <Link
                                  className="subTextTwo color-Neutral-900"
                                  onClick={() => {
                                    setshowFb(!showFb);
                                  }}
                                >
                                  Show {showFb ? "more" : "less"}
                                  {showFb ? (
                                    <KeyboardArrowDownIcon fontSize="small" />
                                  ) : (
                                    <KeyboardArrowUpIcon fontSize="small" />
                                  )}
                                </Link>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item xs={12}>
                            <Divider />
                          </Grid>{" "}
                        </>
                      )}

                      {data?.data?.hasGoogle && (
                        <Grid item xs={12}>
                          <Grid item container className="accountLinkBox">
                            <Grid item width={30}>
                              <img src={googleColorIcon} />
                            </Grid>
                            <Grid
                              item
                              sx={{
                                width: "calc(100% - 30px)",
                                paddingLeft: "16px",
                              }}
                            >
                              <p className="subTextOne color-Neutral-900 fontWeight-500 mb-8">
                                Google
                              </p>
                              <p className="subTextTwo color-Neutral-900 mb-8">
                                {moment(data?.data?.googleTime).format(
                                  "MMMM Do YYYY, h:mm:ss a"
                                )}
                              </p>
                              {showGoogle && (
                                <Box marginBottom={1}>
                                  <p className="small mb-0">
                                    You have granted the following access to the
                                    service
                                  </p>
                                  <ul>
                                    <li>
                                      Use the email address associated with your
                                      account
                                    </li>
                                    <li>Use your name and photo</li>
                                  </ul>
                                </Box>
                              )}
                              <Link
                                className="subTextTwo color-Neutral-900"
                                onClick={() => setshowGoogle(!showGoogle)}
                              >
                                Show {showGoogle ? "more" : "less"}
                                {showGoogle ? (
                                  <KeyboardArrowDownIcon fontSize="small" />
                                ) : (
                                  <KeyboardArrowUpIcon fontSize="small" />
                                )}
                              </Link>
                            </Grid>
                          </Grid>
                        </Grid>
                      )}
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

Component.displayName = "StudentLinkedAccounts";
