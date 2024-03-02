import { useState, useEffect } from "react";
import { AuthGuard } from "../../../guards/student/auth-guard";
import Seo from "@/components/common/seo";

import "../../../assets/css/student-dashboard/style.css";
import "../../../assets/css/student-dashboard/responsive.css";
import { toast } from "react-toastify";

import {
  Box,
  FormControl,
  FormControlLabel,
  Grid,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
} from "@mui/material";

import LeftBar from "../../../components/student/settings-leftbar";
import {
  useGetStudentProfileDataMutation,
  useUpdateStudentNotificationMutation,
} from "../../../redux/api/student/profile";
import Accountmenu from "../../../components/student/account-menu";
import { useNavigate } from "react-router-dom";

const metaTags = [
  { name: "Metaname1", content: "content1" },
  { name: "Metaname2", content: "content2" },
];

export function Component() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    allMobile: false,
    messageMobile: false,
    newsletterMobile: false,
    offersAndPromotionsMobile: false,
    researchOpportunitiesMobile: false,
    tipsAndTricksMobile: false,
    tipsAndTricksEmail: false,
    offersAndPromotionsEmail: false,
    researchOpportunitiesEmail: false,
    newsletterEmail: false,
    emailNotification: "",
  });

  const handelChange = (_event) => {
    if (_event.target.name == "allMobile" && _event.target.checked == true) {
      setFormData((_prevState) => ({
        ..._prevState,
        [_event.target.name]: _event.target.checked,
        [`${_event.target.name}Err`]: false,
        [`${_event.target.name}ErrMsg`]: "",
        messageMobile: true,
        newsletterMobile: true,
        offersAndPromotionsMobile: true,
        researchOpportunitiesMobile: true,
        tipsAndTricksMobile: true,
      }));
    } else {
      setFormData((_prevState) => ({
        ..._prevState,
        [_event.target.name]: _event.target.checked,
        [`${_event.target.name}Err`]: false,
        [`${_event.target.name}ErrMsg`]: "",
        allMobile: false,
      }));
    }
  };

  const handelChang2 = (_event) => {
    setFormData((_prevState) => ({
      ..._prevState,
      [_event.target.name]: _event.target.value,
      [`${_event.target.name}Err`]: false,
      [`${_event.target.name}ErrMsg`]: "",
      allMobile: false,
    }));
  };

  const [getData, { isSuccess, data }] = useGetStudentProfileDataMutation();
  const [
    update,
    {
      isSuccess: isUpdateSuccess,
      data: updateData,
      isError: isUpdateError,
      error: updateError,
    },
  ] = useUpdateStudentNotificationMutation();

  const handelSubmit = async () => {
    try {
      console.log(formData);
      //   return;
      update({
        allMobile: formData.allMobile,
        messageMobile: formData.messageMobile,
        newsletterMobile: formData.newsletterMobile,
        offersAndPromotionsMobile: formData.offersAndPromotionsMobile,
        researchOpportunitiesMobile: formData.researchOpportunitiesMobile,
        tipsAndTricksMobile: formData.tipsAndTricksMobile,
        tipsAndTricksEmail: formData.tipsAndTricksEmail,
        offersAndPromotionsEmail: formData.offersAndPromotionsEmail,
        researchOpportunitiesEmail: formData.researchOpportunitiesEmail,
        newsletterEmail: formData.newsletterEmail,
        emailNotification: formData.emailNotification,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (isSuccess && data) {
      console.log(data, "data");
      const allData = data?.data;
      setFormData({
        allMobile: allData?.allMobile,
        messageMobile: allData?.messageMobile,
        newsletterMobile: allData?.newsletterMobile,
        offersAndPromotionsMobile: allData?.offersAndPromotionsMobile,
        researchOpportunitiesMobile: allData?.researchOpportunitiesMobile,
        tipsAndTricksMobile: allData?.tipsAndTricksMobile,
        tipsAndTricksEmail: allData?.tipsAndTricksEmail,
        offersAndPromotionsEmail: allData?.offersAndPromotionsEmail,
        researchOpportunitiesEmail: allData?.researchOpportunitiesEmail,
        newsletterEmail: allData?.newsletterEmail,
        emailNotification: allData?.emailNotification,
      });
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (isUpdateSuccess && updateData) {
      toast.success(updateData?.message);

      // dispatch(
      //   setAuthUserState({
      //     isAuthenticated: "authenticated",
      //     isInitialized: true,
      //     user: "SD",
      //   })
      // );

      // navigate("/student/dashboard");
    }
  }, [isUpdateSuccess, updateData]);

  useEffect(() => {
    if (isUpdateError && updateError) {
      toast.error(updateError?.data?.message);
    }
  }, [isUpdateError, updateError]);

  useEffect(() => {
    if (
      formData?.messageMobile &&
      formData?.newsletterMobile &&
      formData?.offersAndPromotionsMobile &&
      formData?.researchOpportunitiesMobile &&
      formData?.tipsAndTricksMobile
    ) {
      setFormData((_prevState) => ({
        ..._prevState,

        allMobile: true,
      }));
    }
  }, [
    formData?.allMobile,
    formData?.messageMobile,
    formData?.newsletterMobile,
    formData?.offersAndPromotionsMobile,
    formData?.researchOpportunitiesMobile,
    formData?.tipsAndTricksMobile,
  ]);

  return (
    <AuthGuard>
      <Seo title="Notification" metaName="Metaname" metaTags={metaTags}>
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
          <Grid container paddingTop={{ xs: 0, md: 4 }} paddingBottom={4}>
            <Grid item xs={12}>
              <Grid item container>
                <Grid
                  item
                  className="editProfileLeftPanel"
                  width={{ xs: "100%", sm: 300, md: 350 }}
                >
                  <LeftBar title={"notificationSetting"} />
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
                  <Accountmenu containedValue="2" />

                  <Box padding={"30px"}>
                    <p className="subTextThree fontWeight-700 color-Neutral-Black">
                      Notification
                    </p>
                    <Grid
                      item
                      container
                      paddingTop={"30px"}
                      spacing={"30px"}
                      className="studentNotificationSetting"
                    >
                      <Grid item xs={12}>
                        <p className="subTextOne fontWeight-500 color-Neutral-Black">
                          Mobile Push Notification
                        </p>
                        <Grid
                          item
                          container
                          flexDirection={"column"}
                          gap={"10px"}
                        >
                          <div className="lightforthCheckbox">
                            <div className="mainCheck">
                              <input
                                type="checkbox"
                                checked={formData?.allMobile}
                                name="allMobile"
                                onChange={(_event) => {
                                  handelChange(_event);
                                }}
                              />
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
                            <label className="color-Neutral-Dark-Grey">
                              All
                            </label>
                          </div>
                          <div className="lightforthCheckbox">
                            <div className="mainCheck">
                              <input
                                type="checkbox"
                                checked={formData?.messageMobile}
                                name="messageMobile"
                                onChange={(_event) => {
                                  handelChange(_event);
                                }}
                              />
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
                            <label className="color-Neutral-Dark-Grey">
                              Messages
                            </label>
                          </div>
                          <div className="lightforthCheckbox">
                            <div className="mainCheck">
                              <input
                                type="checkbox"
                                checked={formData?.tipsAndTricksMobile}
                                name="tipsAndTricksMobile"
                                onChange={(_event) => {
                                  handelChange(_event);
                                }}
                              />
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
                            <label className="color-Neutral-Dark-Grey">
                              Tips and Tricks
                            </label>
                          </div>
                          <div className="lightforthCheckbox">
                            <div className="mainCheck">
                              <input
                                type="checkbox"
                                checked={formData?.offersAndPromotionsMobile}
                                name="offersAndPromotionsMobile"
                                onChange={(_event) => {
                                  handelChange(_event);
                                }}
                              />
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
                            <label className="color-Neutral-Dark-Grey">
                              Offers and Promotions
                            </label>
                          </div>
                          <div className="lightforthCheckbox">
                            <div className="mainCheck">
                              <input
                                type="checkbox"
                                checked={formData?.researchOpportunitiesMobile}
                                name="researchOpportunitiesMobile"
                                onChange={(_event) => {
                                  handelChange(_event);
                                }}
                              />
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
                            <label className="color-Neutral-Dark-Grey">
                              Research Opportunities
                            </label>
                          </div>
                          <div className="lightforthCheckbox">
                            <div className="mainCheck">
                              <input
                                type="checkbox"
                                checked={formData?.newsletterMobile}
                                name="newsletterMobile"
                                onChange={(_event) => {
                                  handelChange(_event);
                                }}
                              />
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
                            <label className="color-Neutral-Dark-Grey">
                              Newsletter
                            </label>
                          </div>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <p className="subTextOne fontWeight-500 color-Neutral-Black">
                          Mobile Push Notification
                        </p>
                        <p className="subTextOne color-Neutral-Dark-Grey">
                          When you’re busy or not online, Substance can send you
                          email notifications for any new direct messages or
                          mentions of your name.
                        </p>
                      </Grid>
                      <Grid item xs={12}>
                        <p className="subTextOne fontWeight-500 color-Neutral-Black">
                          Send Me Email Notifications
                        </p>
                        <FormControl>
                          <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            name="emailNotification"
                            value={formData?.emailNotification}
                            onChange={(_event) => {
                              handelChang2(_event);
                            }}
                          >
                            <FormControlLabel
                              value="sendmeemailnotification"
                              control={
                                <Radio sx={{ color: "#afbdca" }} value={"1"} />
                              }
                              label="Send me email notification"
                            />
                            <FormControlLabel
                              value="onceanhouratmost"
                              control={
                                <Radio sx={{ color: "#afbdca" }} value={"2"} />
                              }
                              label="Once an hour at most"
                            />
                            <FormControlLabel
                              value="naver"
                              control={
                                <Radio sx={{ color: "#afbdca" }} value={"3"} />
                              }
                              label="Never"
                            />
                          </RadioGroup>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                        <p className="subTextOne fontWeight-500 color-Neutral-Black">
                          Email News & Updates
                        </p>
                        <p className="subTextOne color-Neutral-Dark-Grey">
                          From time to time, we’d like to send you emails with
                          interesting news about Substance and your workspace.
                          You can choose which of these updates you’d like to
                          receive :
                        </p>
                        <Grid
                          item
                          container
                          flexDirection={"column"}
                          gap={"10px"}
                        >
                          <div className="lightforthCheckbox">
                            <div className="mainCheck">
                              <input
                                type="checkbox"
                                checked={formData?.tipsAndTricksEmail}
                                name="tipsAndTricksEmail"
                                onChange={(_event) => {
                                  handelChange(_event);
                                }}
                              />
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
                            <label className="color-Neutral-Dark-Grey">
                              Tips and Tricks
                            </label>
                          </div>
                          <div className="lightforthCheckbox">
                            <div className="mainCheck">
                              <input
                                type="checkbox"
                                checked={formData?.offersAndPromotionsEmail}
                                name="offersAndPromotionsEmail"
                                onChange={(_event) => {
                                  handelChange(_event);
                                }}
                              />
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
                            <label className="color-Neutral-Dark-Grey">
                              Offers and Promotions
                            </label>
                          </div>
                          <div className="lightforthCheckbox">
                            <div className="mainCheck">
                              <input
                                type="checkbox"
                                checked={formData?.researchOpportunitiesEmail}
                                name="researchOpportunitiesEmail"
                                onChange={(_event) => {
                                  handelChange(_event);
                                }}
                              />
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
                            <label className="color-Neutral-Dark-Grey">
                              Research Opportunities
                            </label>
                          </div>
                          <div className="lightforthCheckbox">
                            <div className="mainCheck">
                              <input
                                type="checkbox"
                                checked={formData?.newsletterEmail}
                                name="newsletterEmail"
                                onChange={(_event) => {
                                  handelChange(_event);
                                }}
                              />
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
                            <label className="color-Neutral-Dark-Grey">
                              Newsletter
                            </label>
                          </div>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <p className="subTextOne color-Neutral-Dark-Grey">
                          If you opt out of the above, note that we’ll still
                          send you important administrative emails, such as
                          password resets.
                        </p>
                        <p className="subTextOne color-Neutral-Dark-Grey">
                          We will use this email address:{" "}
                          <span className="color-Neutral-Black">
                            {data?.data?.email}
                          </span>{" "}
                          <span
                            className="color-primary"
                            style={{ cursor: "pointer" }}
                            onClick={() => navigate("/student/edit-setting")}
                          >
                            (change address)
                          </span>
                        </p>
                      </Grid>

                      <Grid item xs={12}>
                        <button className="primaryBtn" onClick={handelSubmit}>
                          Save Change
                        </button>
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

Component.displayName = "StudentNotificationSetting";
