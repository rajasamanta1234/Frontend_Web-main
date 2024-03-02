import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AuthGuard } from "../../../guards/student/auth-guard";
import Seo from "@/components/common/seo";

import "../../../assets/css/student-dashboard/style.css";
import "../../../assets/css/student-dashboard/responsive.css";
import CloseIcon from "@mui/icons-material/Close";
import Accountmenu from "../../../components/student/account-menu";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  OutlinedInput,
  TextField,
} from "@mui/material";

import LeftBar from "../../../components/student/settings-leftbar";

import {
  changepasswordValidation,
  changeUsernameValidate,
  changeTimezoneValidate,
  changeLanguageValidate,
  changeEmailValidate,
} from "../../../validation/student/profile";
import { ZodError } from "zod";
import { handelError } from "@/helpers/common";
import {
  useUpdateStudentPasswordMutation,
  useGetStudentProfileDataMutation,
  useUpdateStudentLanguageMutation,
  useUpdateStudentUsernameMutation,
  useUpdateStudentTimezoneMutation,
  useDeactiveStudentAccountMutation,
  useGetLanguageStudentMutation,
  useGetTimezoneStudentMutation,
  useUpdateStudentEmailMutation,
} from "../../../redux/api/student/profile";
import { logout } from "@/redux/slice/student/user";

import { toast } from "react-toastify";
import eyeClose from "@/assets/images/eye-close.svg";
import eyeOpen from "@/assets/images/eye.svg";
import resendImage from "@/assets/images/resend-image.png";
import infocircleIcon from "@/assets/images/info-circle.svg";
import {
  useCheckPasswordFordisableMutation,
  useOtpVerifyPasswordMutation,
  useResendOtpVerifyStudentMutation,
} from "../../../redux/api/student/auth";
import successImage from "@/assets/images/Success.png";
import OTPInput from "../../../components/common/OtpInput";

const metaTags = [
  { name: "Metaname1", content: "content1" },
  { name: "Metaname2", content: "content2" },
];

export function Component() {
  const dispatch = useDispatch();
  const [
    doVerifyPass,
    {
      isLoading: virifyPassLoading,
      isSuccess: virifyPassSuccess,
      data: virifyPassData,
      isError: virifyPassisError,
      error: errorvirifyPass,
    },
  ] = useCheckPasswordFordisableMutation();

  const [showPassword, setshowPassword] = useState(false);
  const [showUsername, setshowUsername] = useState(false);
  const [showEmail, setshowEmail] = useState(false);
  const [showLanguage, setshowLanguage] = useState(false);
  const [showTimezone, setshowTimezone] = useState(false);
  const [showDelectAccount, setshowDelectAccount] = useState(false);
  const [showOldPIcon, setshowOldPIcon] = useState(false);
  const [showPIcon, setshowPIcon] = useState(false);
  const [showCpIcon, setshowCpIcon] = useState(false);
  const [confirmCheckbox, setconfirmCheckbox] = useState(false);
  const [afterDeactiveModal, setAfterDeactiveModal] = useState(false);
  const [pendingEmail, setPendingEmail] = useState("");
  const [firstOtpModal, setFirstOtpModal] = useState(false);
  const [secondOtpModal, setSecondOtpModal] = useState(false);
  const [otp, setotp] = useState("");
  const [otpError, setotpError] = useState(false);
  const [otpErrMsg, setotpErrMsg] = useState("");
  const [getData, { isSuccess, data }] = useGetStudentProfileDataMutation();
  const [passChangeSuccessModal, setPassChangeSuccessModal] = useState(false);

  const [
    updatePassword,
    {
      isSuccess: isUpdatePasswordSuccess,
      isError: isUpdatePasswordError,
      error: updatePasswordError,
      data: updatePasswordData,
    },
  ] = useUpdateStudentPasswordMutation();

  const [
    updateUsername,
    {
      isSuccess: isUpdateUsernameSuccess,
      data: updateUsernameData,
      isError: isUpdateUsernameError,
      error: updateUsernameError,
    },
  ] = useUpdateStudentUsernameMutation();

  const [
    updateLanguage,
    {
      isSuccess: isUpdateLanguageSuccess,
      data: updateLanguageData,
      isError: isUpdateLanguageError,
      error: updateLanguageError,
    },
  ] = useUpdateStudentLanguageMutation();

  const [
    updateEmail,
    {
      isSuccess: isUpdateEmailSuccess,
      data: updateEmailData,
      isError: isUpdateEmailError,
      error: updateEmailError,
    },
  ] = useUpdateStudentEmailMutation();

  const [
    updateTimezone,
    {
      isSuccess: isUpdateTimezoneSuccess,
      data: updateTimezoneData,
      isError: isUpdateTimezoneError,
      error: updateTimezoneError,
    },
  ] = useUpdateStudentTimezoneMutation();

  const [
    updateStudentDeactiveAccount,
    {
      isSuccess: isUpdateDeactivaeSuccess,
      data: updateDeactivaeData,
      isError: isUpdateDeactivaeError,
      error: updateDeactivaeError,
    },
  ] = useDeactiveStudentAccountMutation();
  const [
    doVerifyOtp,
    {
      isLoading: otpLoading,
      isSuccess: otpSuccess,
      data: otpData,
      isError: otpisError,
      error: otperror,
    },
  ] = useOtpVerifyPasswordMutation();
  const [
    doResendOtp,
    {
      isLoading: resendotpLoading,
      isSuccess: resendotpSuccess,
      data: resendotpData,
      isError: resendotpisError,
      error: resendotperror,
    },
  ] = useResendOtpVerifyStudentMutation();
  const [getLanguageList, { data: languageList }] =
    useGetLanguageStudentMutation();
  const [getTimezoneList, { data: timezoneList }] =
    useGetTimezoneStudentMutation();

  const [formPassword, setFormPassword] = useState({
    oldPassword: "",
    oldPasswordErr: false,
    oldPasswordErrMsg: "",
    password: "",
    passwordErr: false,
    passwordErrMsg: "",
    confirmPassword: "",
    confirmPasswordErr: false,
    confirmPasswordErrMsg: "",
  });

  const [formUsername, setformUsername] = useState({
    userName: "",
    userNameErr: false,
    userNameErrMsg: "",
  });

  const [formTimezone, setFormTimezone] = useState({
    timezone: "",
    timezoneErr: false,
    timezoneErrMsg: "",
  });

  const [formLanguage, setFormLanguage] = useState({
    language: "",
    languageErr: false,
    languageErrMsg: "",
  });
  const [formEmail, setFormEmail] = useState({
    email: "",
    emailErr: false,
    emailErrMsg: "",
  });

  const handelChangePassword = (_event, _setState) => {
    _setState((_prevState) => ({
      ..._prevState,
      [_event.target.name]: _event.target.value,
      [`${_event.target.name}Err`]: false,
      [`${_event.target.name}ErrMsg`]: "",
    }));
  };
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handlePasswordChange = (e) => {
    const { value } = e.target;
    setFormPassword((prevState) => ({
      ...prevState,
      password: value,
      passwordErr: !passwordRegex.test(value),
      passwordErrMsg: passwordRegex.test(value)
        ? ""
        : "Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long.",
    }));
  };
  const handelPasswordChange = async () => {
    try {
      changepasswordValidation.parse(formPassword);
    } catch (error) {
      if (error instanceof ZodError) {
        handelError(error, setFormPassword);
      }
      return;
    }

    updatePassword({
      oldPassword: formPassword.oldPassword,
      password: formPassword.password,
    });
  };

  const hanedelSubmitUsername = async () => {
    try {
      changeUsernameValidate.parse(formUsername);
    } catch (error) {
      if (error instanceof ZodError) {
        handelError(error, setformUsername);
      }
      return;
    }

    updateUsername({ userName: formUsername.userName });
  };
  const handleLogout = () => {
    dispatch(logout());
  };
  const handleVerify = () => {
    try {
      doVerifyOtp({ otp: otp });
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };
  const handleResendOtp = () => {
    try {
      doResendOtp();
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };
  const hanedelSubmitTimezone = async () => {
    try {
      changeTimezoneValidate.parse(formTimezone);
    } catch (error) {
      if (error instanceof ZodError) {
        handelError(error, setFormTimezone);
      }
      return;
    }

    updateTimezone({ timeZone: formTimezone.timezone });
  };

  const hanedelSubmitLanguage = async () => {
    try {
      changeLanguageValidate.parse(formLanguage);
    } catch (error) {
      if (error instanceof ZodError) {
        handelError(error, setFormLanguage);
      }
      return;
    }

    updateLanguage({ language: formLanguage.language });
  };

  const handleDeactivate = () => {
    try {
      doVerifyPass({ password: formPassword?.oldPassword });
    } catch (error) {
      console.log(error);
    }
  };
  const handelSubmitEmail = async () => {
    try {
      changeEmailValidate.parse(formEmail);
    } catch (error) {
      if (error instanceof ZodError) {
        handelError(error, setFormEmail);
      }
      return;
    }
    updateEmail({ email: formEmail.email });
  };
  const handleButtonClick = () => {
    setAfterDeactiveModal(false);
    dispatch(logout());
  };

  useEffect(() => {
    getData();
    getLanguageList();
    getTimezoneList();
  }, []);

  useEffect(() => {
    if (isSuccess && data) {
      console.log(data, "data");
      setPendingEmail(data?.data?.pendingEmail);
      setformUsername({
        userName: data?.data?.userName ?? "",
        userNameErr: false,
        userNameErrMsg: "",
      });
      setFormTimezone({
        timezone: data?.data?.timeZone ?? "",
        timezoneErr: false,
        timezoneErrMsg: "",
      });
      setFormLanguage({
        language: data?.data?.language ?? "",
        languageErr: false,
        languageErrMsg: "",
      });
    }
  }, [isSuccess, data]);

  //...............................................password change .................................................

  useEffect(() => {
    if (isUpdatePasswordSuccess && updatePasswordData) {
      // toast.success(updatePasswordData?.message);
      setFirstOtpModal(true);
    }
  }, [isUpdatePasswordSuccess, updatePasswordData]);

  useEffect(() => {
    if (isUpdatePasswordError && updatePasswordError) {
      toast.error(updatePasswordError?.data?.message);
    }
  }, [isUpdatePasswordError, updatePasswordError]);

  //...............................................Email change .................................................

  useEffect(() => {
    if (isUpdateEmailSuccess && updateEmailData) {
      toast.success(updateEmailData?.message);
      getData();
    }
  }, [isUpdateEmailSuccess, updateEmailData]);

  useEffect(() => {
    if (isUpdateEmailError && updateEmailError) {
      toast.error(updateEmailError?.data?.message);
    }
  }, [isUpdateEmailError, updateEmailError]);

  //...............................................uername change .................................................

  useEffect(() => {
    if (isUpdateUsernameSuccess && updateUsernameData) {
      toast.success(updateUsernameData?.message);
      getData();
    }
  }, [isUpdateUsernameSuccess, updateUsernameData]);

  useEffect(() => {
    if (isUpdateUsernameError && updateUsernameError) {
      toast.error(updateUsernameError?.data?.message);
    }
  }, [isUpdateUsernameError, updateUsernameError]);

  //...............................................language change .................................................

  useEffect(() => {
    if (isUpdateLanguageSuccess && updateLanguageData) {
      toast.success(updateLanguageData?.message);
      getData();
    }
  }, [isUpdateLanguageSuccess, updateLanguageData]);

  useEffect(() => {
    if (isUpdateLanguageError && updateLanguageError) {
      toast.error(updateLanguageError?.data?.message);
    }
  }, [isUpdateLanguageError, updateLanguageError]);

  //...............................................timezone change .................................................

  useEffect(() => {
    if (isUpdateTimezoneSuccess && updateTimezoneData) {
      toast.success(updateTimezoneData?.message);
      getData();
    }
  }, [isUpdateTimezoneSuccess, updateTimezoneData]);

  useEffect(() => {
    if (isUpdateTimezoneError && updateTimezoneError) {
      toast.error(updateTimezoneError?.data?.message);
    }
  }, [isUpdateTimezoneError, updateTimezoneError]);

  //...............................................account deactivate  .................................................

  useEffect(() => {
    if (isUpdateDeactivaeSuccess && updateDeactivaeData) {
      toast.success(updateDeactivaeData?.message);

      dispatch(logout());
    }
  }, [isUpdateDeactivaeSuccess, updateDeactivaeData]);

  useEffect(() => {
    if (isUpdateDeactivaeError && updateDeactivaeError) {
      toast.error(updateDeactivaeError?.data?.message);
    }
  }, [isUpdateDeactivaeError, updateDeactivaeError]);

  const [openDeactiveModal, setOpen] = useState(false);

  const handleClickOpen = () => {
    if (!confirmCheckbox) {
      toast.error("Please check the checkbox");
      return;
    }
    setOpen(true);
  };

  const handleClosemodal = () => {
    setOpen(false);
  };
  // ------------------------------------------Otp Verify Success ---------------------------------

  useEffect(() => {
    if (otpSuccess && otpData) {
      // toast.success(otpData?.message);
      setSecondOtpModal(false);
      setPassChangeSuccessModal(true);
    }
  }, [otpSuccess, otpData]);

  // ------------------------------------------Otp Resend Success ---------------------------------

  useEffect(() => {
    if (resendotpSuccess && resendotpData) {
      toast.success(resendotpData?.message);
    }
  }, [resendotpSuccess, resendotpData]);
  // ----------------------------------------------for check password successfull ------------------------------------------------------
  useEffect(() => {
    if (afterDeactiveModal) {
      const timespan = setTimeout(() => {
        setOpen(false);
        setAfterDeactiveModal(false);
        dispatch(logout());
      }, 3000);

      return () => clearTimeout(timespan);
    }
  }, [afterDeactiveModal]);

  useEffect(() => {
    if (virifyPassSuccess && virifyPassData) {
      // toast.success(virifyPassData?.message);
      setAfterDeactiveModal(true);
      // handleCloseDeactiveModal();
    }
  }, [virifyPassSuccess, virifyPassData]);

  // ----------------------------------------------for check password successfull section end ------------------------------------------------------
  // -------------------------------------Otp Verify Error -----------------------------------

  useEffect(() => {
    if (otpisError && otperror) {
      toast.error(otperror?.data?.message);
    }
  }, [otpisError, otperror]);
  // -------------------------------------Resend Otp Verify Error -----------------------------------

  useEffect(() => {
    if (resendotpisError && resendotperror) {
      toast.error(resendotperror?.data?.message);
    }
  }, [resendotpisError, resendotperror]);

  useEffect(() => {
    if (virifyPassisError && errorvirifyPass) {
      toast.error(errorvirifyPass?.data?.message);
    }
  }, [virifyPassisError, errorvirifyPass]);

  return (
    <AuthGuard>
      <Seo title="Settings" metaName="Metaname" metaTags={metaTags}>
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
                  <LeftBar title={"editprofile"} />
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
                  <Accountmenu containedValue="1" />
                  <Box padding={"30px"}>
                    <p className="subTextThree fontWeight-700 color-Neutral-Black mobileHide">
                      Account Setting
                    </p>
                    <Grid item container paddingTop={"30px"} spacing={"30px"}>
                      <Grid item xs={12}>
                        <Grid item container justifyContent={"space-between"}>
                          <Grid item xs={10}>
                            <p className="subTextOne fontWeight-700 color-Neutral-Black">
                              Password
                            </p>
                          </Grid>
                          <Grid item xs={2} textAlign={"right"}>
                            <Button
                              size="small"
                              color="secondary"
                              onClick={() => {
                                setshowPassword(!showPassword);
                                setFormPassword({
                                  oldPassword: "",
                                  oldPasswordErr: false,
                                  oldPasswordErrMsg: "",
                                  password: "",
                                  passwordErr: false,
                                  passwordErrMsg: "",
                                  confirmPassword: "",
                                  confirmPasswordErr: false,
                                  confirmPasswordErrMsg: "",
                                });
                              }}
                            >
                              {showPassword ? "Hide" : "Show"}
                            </Button>
                          </Grid>
                        </Grid>
                        {showPassword && (
                          <Box>
                            <Grid
                              item
                              container
                              paddingTop={"30px"}
                              spacing={"30px"}
                            >
                              <Grid item xs={12} sm={7}>
                                <label className="formlabel fontWeight-500">
                                  Current Password
                                </label>
                                <div className="inputGroup positionRight">
                                  <input
                                    type={showOldPIcon ? "text" : "password"}
                                    className={`form-control ${
                                      formPassword.oldPasswordErr
                                        ? "errField"
                                        : ""
                                    }`}
                                    name="oldPassword"
                                    value={formPassword.oldPassword}
                                    onChange={(_event) => {
                                      handelChangePassword(
                                        _event,
                                        setFormPassword
                                      );
                                    }}
                                  />
                                  <button
                                    type="button"
                                    className="inputGroupRight"
                                    onClick={() => {
                                      setshowOldPIcon(!showOldPIcon);
                                    }}
                                  >
                                    <img
                                      src={showOldPIcon ? eyeOpen : eyeClose}
                                      //   src={eyeOpen}
                                      alt="eye-close"
                                    />
                                  </button>
                                  <p className="errorMsg">
                                    {formPassword?.oldPasswordErrMsg}
                                  </p>
                                </div>
                              </Grid>
                              <Grid item xs={12} sm={7}>
                                <label className="formlabel fontWeight-500">
                                  New Password
                                </label>
                                <div className="inputGroup positionRight">
                                  <input
                                    type={showPIcon ? "text" : "password"}
                                    className={`form-control ${
                                      formPassword.passwordErr ? "errField" : ""
                                    }`}
                                    name="password"
                                    value={formPassword.password}
                                    onChange={(_event) => {
                                      // handelChangePassword(
                                      //   _event,
                                      //   setFormPassword
                                      // );
                                      handlePasswordChange(_event);
                                    }}
                                  />
                                  <button
                                    type="button"
                                    className="inputGroupRight"
                                    onClick={() => {
                                      setshowPIcon(!showPIcon);
                                    }}
                                  >
                                    <img
                                      src={showPIcon ? eyeOpen : eyeClose}
                                      //   src={eyeOpen}
                                      alt="eye-close"
                                    />
                                  </button>
                                  <p className="errorMsg">
                                    {formPassword?.passwordErrMsg}
                                  </p>
                                </div>
                              </Grid>
                              <Grid item xs={12} sm={7}>
                                <label className="formlabel fontWeight-500">
                                  Confirm New Password
                                </label>
                                <div className="inputGroup positionRight">
                                  <input
                                    type={showCpIcon ? "text" : "password"}
                                    className={`form-control ${
                                      formPassword.confirmPasswordErr
                                        ? "errField"
                                        : ""
                                    }`}
                                    name="confirmPassword"
                                    disabled={
                                      formPassword.passwordErr ||
                                      !formPassword.password
                                    }
                                    value={formPassword.confirmPassword}
                                    onChange={(_event) => {
                                      handelChangePassword(
                                        _event,
                                        setFormPassword
                                      );
                                    }}
                                  />
                                  <button
                                    type="button"
                                    className="inputGroupRight"
                                    onClick={() => {
                                      setshowCpIcon(!showCpIcon);
                                    }}
                                  >
                                    <img
                                      src={showCpIcon ? eyeOpen : eyeClose}
                                      //   src={eyeOpen}
                                      alt="eye-close"
                                    />
                                  </button>
                                  <p className="errorMsg">
                                    {formPassword?.confirmPasswordErrMsg}
                                  </p>
                                </div>
                              </Grid>
                              <Grid item xs={12} sm={7}>
                                <button
                                  className="primaryBtn"
                                  onClick={() => {
                                    handelPasswordChange();
                                  }}
                                >
                                  Save Changes
                                </button>
                              </Grid>
                              <Grid item xs={12}>
                                <Divider />
                              </Grid>
                            </Grid>
                          </Box>
                        )}
                      </Grid>
                      <Grid item xs={12}>
                        <Grid item container justifyContent={"space-between"}>
                          <Grid item xs={10}>
                            <p className="subTextOne fontWeight-700 color-Neutral-Black">
                              Username
                            </p>
                          </Grid>
                          <Grid item xs={2} textAlign={"right"}>
                            <Button
                              size="small"
                              color="secondary"
                              onClick={() => {
                                setshowUsername(!showUsername);
                                setformUsername({
                                  userName: "",
                                  userNameErrMsg: "",
                                  userNameErr: false,
                                });
                              }}
                            >
                              {showUsername ? "Hide" : "Show"}
                            </Button>
                          </Grid>
                        </Grid>
                        {showUsername && (
                          <Box>
                            <Grid
                              item
                              container
                              paddingTop={"30px"}
                              spacing={"30px"}
                            >
                              <Grid item xs={12} sm={7}>
                                <label className="formlabel fontWeight-500">
                                  Edit Username
                                </label>
                                <input
                                  type="text"
                                  className={`form-control ${
                                    formUsername.userNameErr ? "errField" : ""
                                  }`}
                                  name="userName"
                                  value={formUsername.userName}
                                  onChange={(_event) => {
                                    handelChangePassword(
                                      _event,
                                      setformUsername
                                    );
                                  }}
                                />
                                <p className="errorMsg">
                                  {formUsername?.userNameErrMsg}
                                </p>
                              </Grid>
                              <Grid item xs={12} sm={7}>
                                <button
                                  className="primaryBtn"
                                  onClick={hanedelSubmitUsername}
                                >
                                  Save Changes
                                </button>
                              </Grid>
                              <Grid item xs={12}>
                                <Divider />
                              </Grid>
                            </Grid>
                          </Box>
                        )}
                      </Grid>
                      <Grid item xs={12}>
                        <Grid item container justifyContent={"space-between"}>
                          <Grid item xs={10}>
                            <p className="subTextOne fontWeight-700 color-Neutral-Black">
                              Email Address
                            </p>
                            <p className="subTextOne color-Neutral-Dark-Grey">
                              Your email address is {data?.data?.email}
                            </p>
                          </Grid>
                          <Grid item xs={2} textAlign={"right"}>
                            <Button
                              size="small"
                              color="secondary"
                              onClick={() => {
                                setshowEmail(!showEmail);
                                if (!showEmail) {
                                  setFormEmail({
                                    email: "",
                                    emailErrMsg: "",
                                    emailErr: false,
                                  });
                                }
                              }}
                            >
                              {showEmail ? "Hide" : "Show"}
                            </Button>
                          </Grid>
                        </Grid>
                        {showEmail && (
                          <Box>
                            <Grid
                              item
                              container
                              paddingTop={"30px"}
                              spacing={"30px"}
                            >
                              <Grid item xs={12} sm={7}>
                                <label className="formlabel fontWeight-500">
                                  New Email Address
                                </label>
                                <input
                                  type="text"
                                  className={`form-control ${
                                    formEmail.emailErr ? "errField" : ""
                                  }`}
                                  name="email"
                                  value={formEmail.email}
                                  onChange={(_event) => {
                                    handelChangePassword(_event, setFormEmail);
                                  }}
                                />
                                {pendingEmail && (
                                  <Grid item container>
                                    <p className="subTextOne mb-0 break-word">
                                      {pendingEmail}{" "}
                                      <span className="colorRed">
                                        (Not Verified)
                                      </span>
                                    </p>
                                  </Grid>
                                )}
                                <p className="errorMsg">
                                  {formEmail?.emailErrMsg}
                                </p>
                              </Grid>
                              <Grid item xs={12} sm={7}>
                                <button
                                  className="primaryBtn"
                                  onClick={handelSubmitEmail}
                                >
                                  Save Changes
                                </button>
                              </Grid>
                              <Grid item xs={12}>
                                <Divider />
                              </Grid>
                            </Grid>
                          </Box>
                        )}
                      </Grid>
                      <Grid item xs={12}>
                        <Grid item container justifyContent={"space-between"}>
                          <Grid item xs={10}>
                            <p className="subTextOne fontWeight-700 color-Neutral-Black">
                              Language
                            </p>
                            <p className="subTextOne color-Neutral-Dark-Grey">
                              Your language is currently set to:{" "}
                              {data?.data?.language}
                            </p>
                          </Grid>
                          <Grid item xs={2} textAlign={"right"}>
                            <Button
                              size="small"
                              color="secondary"
                              onClick={() => {
                                setshowLanguage(!showLanguage);
                                if (!showLanguage) {
                                  setFormLanguage({
                                    language: "",
                                    languageErrMsg: "",
                                    languageErr: false,
                                  });
                                }
                              }}
                            >
                              {showLanguage ? "Hide" : "Show"}
                            </Button>
                          </Grid>
                        </Grid>
                        {showLanguage && (
                          <Box>
                            <Grid
                              item
                              container
                              paddingTop={"30px"}
                              spacing={"30px"}
                            >
                              <Grid item xs={12} sm={7}>
                                <label className="formlabel fontWeight-500">
                                  Select Language
                                </label>
                                <select
                                  className={`form-control ${
                                    formLanguage.languageErr ? "errField" : ""
                                  }`}
                                  name="language"
                                  value={formLanguage.language}
                                  onChange={(_event) => {
                                    handelChangePassword(
                                      _event,
                                      setFormLanguage
                                    );
                                  }}
                                >
                                  <option value="">Select</option>

                                  {languageList?.data?.map((e) => {
                                    return (
                                      <option value={e.languageName} key={e.id}>
                                        {e.languageName}
                                      </option>
                                    );
                                  })}
                                </select>
                                <p className="errorMsg">
                                  {formLanguage?.languageErrMsg}
                                </p>
                              </Grid>
                              <Grid item xs={12} sm={7}>
                                <button
                                  className="primaryBtn"
                                  onClick={hanedelSubmitLanguage}
                                >
                                  Save Changes
                                </button>
                              </Grid>
                              <Grid item xs={12}>
                                <Divider />
                              </Grid>
                            </Grid>
                          </Box>
                        )}
                      </Grid>
                      {/* <Grid item xs={12}>
                        <Grid item container justifyContent={"space-between"}>
                          <Grid item xs={10}>
                            <p className="subTextOne fontWeight-700 color-Neutral-Black">
                              Timezone
                            </p>
                            <p className="subTextOne color-Neutral-Dark-Grey">
                              Your time zone is currently set to:{" "}
                              {data?.data?.timeZone}
                            </p>
                          </Grid>
                          <Grid item xs={2} textAlign={"right"}>
                            <Button
                              size="small"
                              color="secondary"
                              onClick={() => {
                                setshowTimezone(!showTimezone);
                                if (!showLanguage) {
                                  setFormTimezone({
                                    timezone: "",
                                    timezoneErrMsg: "",
                                    timezoneErr: false,
                                  });
                                }
                              }}
                            >
                              {showTimezone ? "Hide" : "Show"}
                            </Button>
                          </Grid>
                        </Grid>
                        {showTimezone && (
                          <Box>
                            <Grid
                              item
                              container
                              paddingTop={"30px"}
                              spacing={"30px"}
                            >
                              <Grid item xs={12} sm={7}>
                                <label className="formlabel fontWeight-500">
                                  Select Time Zone
                                </label>
                                <select
                                  className={`form-control ${
                                    formTimezone.timezoneErr ? "errField" : ""
                                  }`}
                                  name="timezone"
                                  value={formTimezone.timezone}
                                  onChange={(_event) => {
                                    handelChangePassword(
                                      _event,
                                      setFormTimezone
                                    );
                                  }}
                                >
                                  <option value="">Select</option>
                                  {timezoneList?.data?.map((e) => {
                                    return (
                                      <option value={e.id} key={e.id}>
                                        {e.shortCode}
                                      </option>
                                    );
                                  })}
                                </select>
                                <p className="errorMsg">
                                  {formTimezone?.timezoneErrMsg}
                                </p>
                              </Grid>
                              <Grid item xs={12} sm={7}>
                                <button
                                  className="primaryBtn"
                                  onClick={hanedelSubmitTimezone}
                                >
                                  Save Changes
                                </button>
                              </Grid>
                              <Grid item xs={12}>
                                <Divider />
                              </Grid>
                            </Grid>
                          </Box>
                        )}
                      </Grid> */}
                      <Grid item xs={12}>
                        <Grid item container justifyContent={"space-between"}>
                          <Grid item xs={10}>
                            <p className="subTextOne fontWeight-700 color-Neutral-Black">
                              Deactivate Your Account
                            </p>
                            <p className="subTextOne color-Neutral-Dark-Grey">
                              When you deactivate your account, you lose access
                              to Front account services, and we permanently
                              deactivate your personal data. You can cancel the
                              deletion for 14 days.
                            </p>
                          </Grid>
                          <Grid item xs={2} textAlign={"right"}>
                            <Button
                              size="small"
                              color="secondary"
                              onClick={() => {
                                setshowDelectAccount(!showDelectAccount);
                              }}
                            >
                              {showDelectAccount ? "Hide" : "Show"}
                            </Button>
                          </Grid>
                        </Grid>
                      </Grid>

                      {showDelectAccount && (
                        <>
                          <Grid item xs={12}>
                            <div className="lightforthCheckbox acntStinglightforthCheckbox">
                              <div className="mainCheck">
                                <input
                                  type="checkbox"
                                  checked={confirmCheckbox}
                                  onChange={() => {
                                    setconfirmCheckbox(!confirmCheckbox);
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
                              <label>
                                Confirm that I want to deactivate my account.
                              </label>
                            </div>
                          </Grid>
                          <Grid item xs={12}>
                            <Grid item container columnGap={1}>
                              <Grid item xs={12} sm="auto">
                                <button
                                  className="redOutlineBtn"
                                  // onClick={handelDeactiveSubmit}
                                  onClick={handleClickOpen}
                                >
                                  Deactivate Account
                                </button>
                              </Grid>
                            </Grid>
                          </Grid>
                        </>
                      )}
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>

        {/* Deactive Modal */}
        <Dialog
          open={openDeactiveModal}
          keepMounted
          onClose={handleClosemodal}
          aria-describedby="alert-dialog-slide-description"
          className="deActiveModal"
        >
          <DialogTitle>
            <Button onClick={handleClosemodal}>
              <CloseIcon />
            </Button>
          </DialogTitle>
          <DialogContent>
            <Box className="contentBlock">
              <p className="subTextOne mb-20">
                You must provide your password before we can deactivate your
                account
              </p>

              <Grid item xs={12}>
                <label className="formlabel">Password</label>
                <div className="inputGroup positionRight">
                  <input
                    type={showOldPIcon ? "text" : "password"}
                    placeholder="Enter your password"
                    className={`form-control ${
                      formPassword.oldPasswordErr ? "errField" : ""
                    }`}
                    name="oldPassword"
                    value={formPassword.oldPassword}
                    onChange={(_event) => {
                      handelChangePassword(_event, setFormPassword);
                    }}
                  />
                  <button
                    type="button"
                    className="inputGroupRight"
                    onClick={() => {
                      setshowOldPIcon(!showOldPIcon);
                    }}
                  >
                    <img
                      src={showOldPIcon ? eyeOpen : eyeClose}
                      //   src={eyeOpen}
                      alt="eye-close"
                    />
                  </button>
                  <p className="errorMsg">{formPassword?.oldPasswordErrMsg}</p>
                </div>
              </Grid>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                handleDeactivate();
              }}
              className="subTextOne fontWeight-500 fullWidth"
            >
              Deactivate
            </Button>
          </DialogActions>
        </Dialog>

        {/* Reactive Modal */}
        <Dialog
          open={afterDeactiveModal}
          keepMounted
          onClose={() => setAfterDeactiveModal(false)}
          aria-describedby="alert-dialog-slide-description"
          className="reactiveModal"
        >
          <DialogTitle>
            <Button onClick={() => setAfterDeactiveModal(false)}>
              <CloseIcon />
            </Button>
          </DialogTitle>
          <DialogContent>
            <Box className="imgBlock">
              <img src={infocircleIcon} />
            </Box>
            <Box className="contentBlock">
              <p className="subTextThree fontWeight-700 mb-2 txtCoution">
                Caution
              </p>
              <p className="subTextTwo txtMsg">
                Your account will be deactivated within 90 days, but logging in
                during this period will reactivate it.
              </p>
            </Box>
          </DialogContent>
          <DialogActions>
            <button
              onClick={handleButtonClick}
              className="primaryBtn fullWidth"
            >
              OK
            </button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={firstOtpModal}
          keepMounted
          onClose={() => setFirstOtpModal(false)}
          aria-describedby="alert-dialog-slide-description"
          className="reactiveModal"
        >
          <DialogTitle>
            <Button onClick={() => setFirstOtpModal(false)}>
              <CloseIcon />
            </Button>
          </DialogTitle>
          <DialogContent>
            <div className="resendImgBlock">
              <img src={resendImage} />
            </div>
            <div className="contentBlock">
              <h4 className="fontWeight-700">Your OTP has been sent!</h4>
              <p className="subTextOne resendtxtMsg">
                We have sent an OTP to{" "}
                <span className="d-block fontWeight-500">
                  {data?.data?.email}.
                </span>{" "}
                Please check your email.
              </p>
            </div>
          </DialogContent>
          <DialogActions>
            <button
              onClick={() => {
                setFirstOtpModal(false);
                setSecondOtpModal(true);
              }}
              className="primaryBtn fullWidth"
            >
              Next
            </button>
          </DialogActions>
        </Dialog>

        {/* OTP verify Modal */}
        <Dialog
          open={secondOtpModal}
          keepMounted
          onClose={() => setSecondOtpModal(false)}
          aria-describedby="alert-dialog-slide-description"
          className="reactiveModal"
        >
          <DialogTitle>
            <Button onClick={() => setSecondOtpModal(false)}>
              <CloseIcon />
            </Button>
          </DialogTitle>
          <DialogContent>
            <Box className="contentBlock" marginTop={2}>
              <p className="subTextOne mailTxt">
                Enter your code we have sent to your email{" "}
                <span className="d-block"> {data?.data?.email}.</span>
              </p>

              <Grid
                container
                paddingLeft={2}
                paddingRight={2}
                // justifyContent={"space-between"}
              >
                <Grid item className="otpFildBox">
                  <OTPInput
                    value={otp}
                    numInputs={5}
                    inputType="tel"
                    onChange={(_e) => {
                      if (otpError) {
                        setotpError(false);
                        setotpErrMsg("");
                      }
                      setotp(_e);
                    }}
                    renderInput={(props) => (
                      <OutlinedInput
                        {...props}
                        fullWidth
                        error={otpError}
                        variant="outlined"
                      />
                    )}
                  />
                </Grid>
                {/* <Grid item width={"56px"} height={"56px"} className="otpFildBox">
                <TextField variant="outlined" />
              </Grid>
              <Grid item width={"56px"} height={"56px"} className="otpFildBox">
                <TextField variant="outlined" />
              </Grid>
              <Grid item width={"56px"} height={"56px"} className="otpFildBox">
                <TextField variant="outlined" />
              </Grid> */}
              </Grid>
            </Box>
          </DialogContent>
          <DialogActions>
            <button onClick={handleVerify} className="primaryBtn fullWidth">
              Verify
            </button>

            <p className="m-0">
              Didn’t receive the code?{" "}
              <button onClick={handleResendOtp}>Resend</button>
            </p>
          </DialogActions>
        </Dialog>

        {/* Successful Modal */}
        <Dialog
          open={passChangeSuccessModal}
          keepMounted
          onClose={() => setPassChangeSuccessModal(false)}
          aria-describedby="alert-dialog-slide-description"
          className="reactiveModal successModal"
        >
          <DialogContent>
            <Box className="imgBlock">
              <img src={successImage} />
            </Box>
            <Box className="contentBlock">
              <p className="mainText successtxtMsg">
                Hi {data?.data?.fullName} 👋, your password was reset
                successfully!
              </p>
            </Box>
          </DialogContent>
          <DialogActions>
            <button
              onClick={() => {
                handleLogout();
              }}
              className="primaryBtn fullWidth"
            >
              Login
            </button>
          </DialogActions>
        </Dialog>
      </Seo>
    </AuthGuard>
  );
}

Component.displayName = "StudentEditProfile";
