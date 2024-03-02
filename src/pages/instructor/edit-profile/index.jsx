import { AuthGuard } from "../../../guards/instructor/auth-guard";
import Seo from "@/components/common/seo";

import "../../../assets/css/instructor-dashboard/style.css";
import "../../../assets/css/instructor-dashboard/responsive.css";
import AWS from "aws-sdk";

import saveIcon from "@/assets/images/save-icon.svg";
import eyeClose from "@/assets/images/eye-close.svg";
import eyeOpen from "@/assets/images/eye.svg";
import { Avatar, Box, Grid, MenuItem, Select } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useEffect, useRef, useState } from "react";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import SuccessDialog from "../../../components/common/successDialog";
import PermitionDialoug from "../../../components/common/PermitionDialoug";
import { toast } from "react-toastify";
import { handelError } from "@/helpers/common";
import { ZodError } from "zod";
import {
  useEditProfileMutation,
  useEmailChangeMutation,
  useGetCountryMutation,
  useGetMyProfileMutation,
  useGetSpecializationMutation,
  useGetTimeZoneMutation,
  useUsernameChangeMutation,
} from "../../../redux/api/instructor/auth";
import {
  editProfileValidate,
  emailValidate,
  usernameValidate,
} from "../../../validation/instructor/auth";
import RightSideBar from "../../../components/common/RightSideBar";
import { useDispatch } from "react-redux";
import { setAuthUserState } from "../../../redux/slice/instructor/user";
import { parsePhoneNumber } from "awesome-phonenumber";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import zipCodesData from "../../../../Zipcode.json";
const metaTags = [
  { name: "Metaname1", content: "content1" },
  { name: "Metaname2", content: "content2" },
];

export function Component() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [doEditProfile, { isLoading, isSuccess, isError, data, error }] =
    useEditProfileMutation();
  const [
    doUsernameChange,
    {
      isSuccess: usernameSuccess,
      isError: usernameError,
      data: usernamedata,
      error: usernameerr,
    },
  ] = useUsernameChangeMutation();
  const [
    doemaillChange,
    {
      isSuccess: emailSuccess,
      isError: emailError,
      data: emaildata,
      error: emailerr,
    },
  ] = useEmailChangeMutation();
  const [getDetails, { isSuccess: detailsSuccess, data: detailsData }] =
    useGetMyProfileMutation();
  const [
    getSpecialization,
    { isSuccess: specializationSuccess, data: specializationData },
  ] = useGetSpecializationMutation();
  const [getCountry, { isSuccess: countrySuccess, data: countryData }] =
    useGetCountryMutation();
  const [getTimeZone, { isSuccess: timezoneSuccess, data: timezoneData }] =
    useGetTimeZoneMutation();

  const fileInputRef = useRef();
  const [handleOpenModal, sethandleOpenModal] = useState(false);
  const [alertmodal, setAlertModal] = useState(false);
  const [disableImg, setDisableImg] = useState(false);
  const [specialization, setSpecialization] = useState([]);
  const [timezone, setTimezone] = useState([]);
  const [backuptimezone, setBackupTimezone] = useState([]);
  const [isValid, setIsValid] = useState(false);
  const [country, setCountry] = useState([]);
  const [pendingEmail, setPendingEmail] = useState("");
  const [userName, setUserName] = useState({
    username: "",
    usernameErr: false,
    usernameErrMsg: "",
  });
  const [emailData, setEmail] = useState({
    email: "",
    emailErr: false,
    emailErrMsg: "",
  });
  const [formData, setFormData] = useState({
    firstname: "",
    firstnameErr: false,
    firstnameErrMsg: "",
    lastname: "",
    lastnameErr: false,
    lastnameErrMsg: "",
    phonenocode: "",
    phonenocodeErr: false,
    phonenocodeErrMsg: "",
    phoneno: "",
    phonenoErr: false,
    phonenoErrMsg: "",
    website: "",
    websiteErr: false,
    websiteErrMsg: "",
    specialization: "",
    specializationErr: false,
    specializationErrMsg: "",
    gender: "",
    genderErr: false,
    genderErrMsg: "",
    address: "",
    addressErr: false,
    addressErrMsg: "",
    city: "",
    cityErr: false,
    cityErrMsg: "",
    state: "",
    stateErr: false,
    stateErrMsg: "",
    zipcode: "",
    zipcodeErr: false,
    zipcodeErrMsg: "",
    country: "",
    countryErr: false,
    countryErrMsg: "",
    timezone: "",
    timezoneErr: false,
    timezoneErrMsg: "",
    about: "",
    aboutErr: false,
    aboutErrMsg: "",
    profilePicture: "",
    profilePictureErr: true,
    profilePictureErrMsg: "",
  });

  const handelChange = (_event) => {
    if (_event.target.name === "about") {
      if (_event.target.value.length < 500) {
        setFormData((_prevState) => ({
          ..._prevState,
          [_event.target.name]: _event.target.value,
          [`${_event.target.name}Err`]: false,
          [`${_event.target.name}ErrMsg`]: "",
        }));
        return;
      } else if (_event.target.value.length > 500) {
        setFormData((_prevState) => ({
          ..._prevState,
          [_event.target.name]: formData?.about,
          [`${_event.target.name}Err`]: true,
          [`${_event.target.name}ErrMsg`]: "Maximum 500 characters are allowed",
        }));
        return;
      }
    }
    setFormData((_prevState) => ({
      ..._prevState,
      [_event.target.name]: _event.target.value,
      [`${_event.target.name}Err`]: false,
      [`${_event.target.name}ErrMsg`]: "",
    }));
  };
  const handelChangePhonenumber = (_event) => {
    // Remove any non-numeric characters from the input value
    const formattedValue = _event.target.value.replace(/\D/g, "");
    // Add spaces after every third digit (if needed)
    const formattedPhoneNumber = formattedValue.replace(
      /(\d{3})(?=\d)/g,
      "$1 "
    );

    setFormData((_prevState) => ({
      ..._prevState,
      [_event.target.name]: formattedPhoneNumber,
      [`${_event.target.name}Err`]: false,
      [`${_event.target.name}ErrMsg`]: "",
    }));
  };
  const handelChangeEmailInput = (_event) => {
    setEmail((_prevState) => ({
      ..._prevState,
      [_event.target.name]: _event.target.value,
      [`${_event.target.name}Err`]: false,
      [`${_event.target.name}ErrMsg`]: "",
    }));
  };
  const handelChangeUsernameInput = (_event) => {
    setUserName((_prevState) => ({
      ..._prevState,
      [_event.target.name]: _event.target.value,
      [`${_event.target.name}Err`]: false,
      [`${_event.target.name}ErrMsg`]: "",
    }));
  };
  const handleFileUpload = async (file) => {
    const maxFileSizeMB = 2;

    // Check file type
    if (
      !file.type.includes("jpg") &&
      !file.type.includes("png") &&
      !file.type.includes("jpeg")
    ) {
      console.error("Only image format  can be uploaded");
      toast.error("Only image format  can be uploaded");
      fileInputRef.current.value = null;
      return;
    }

    // Check file size
    if (file.size > maxFileSizeMB * 1024 * 1024) {
      console.error("Uploading file can not be more than 2 MB");
      toast.error("Uploading file can not be more than 2 MB");
      fileInputRef.current.value = null;
      return;
    }

    setDisableImg(true);
    const s3 = new AWS.S3({
      accessKeyId: import.meta.env.VITE_S3_BUCKET_ACCESS_KEY,
      secretAccessKey: import.meta.env.VITE_S3_BUCKET_SECRET_KEY,
      region: "us-east-1",
    });

    const params = {
      Bucket: "lightfourthbucket",
      Key: `uploads/${file.name}`,
      Body: file,
      // ACL: 'public-read',
    };

    try {
      const response = await s3.upload(params).promise();
      console.log("File uploaded successfully:", response);
      let fileName = getOriginalname(response.Location);

      console.log(fileName, "fileName");
      // setFormData((prev) => {
      //   let data = { ...prev };
      //   data.profilePicture = fileName;
      //   data.profilePictureErr = true;
      //   data.profilePictureErrMsg = "";
      //   return data;
      // });

      setFormData((prevData) => ({
        ...prevData,
        profilePicture: response.Location,
        profilePictureErr: true,
        profilePictureErrMsg: "",
      }));
      setDisableImg(false);
    } catch (error) {
      console.error("Error uploading file:", error);
      setDisableImg(false);
    }
  };
  function getOriginalname(data) {
    console.log("image///", data);
    let arr = data?.split("/");
    let lent = Number(arr.length - 1);
    console.log(arr[lent]);
    return arr[lent];
  }
  const handleuploadImg = (file) => {
    // console.log(file)
    if (file) {
      handleFileUpload(file);
    }
  };
  const validateZipCode = (value) => {
    // Assuming zipCodesData contains the JSON data
    for (const countryData of zipCodesData) {
      if (countryData.country === "USA") {
        // Check if the value is in the USA zip codes list
        if (countryData.zipCodes.includes(value)) {
          return true;
        }
      } else if (countryData.country === "Canada") {
        // Check if the value is in the Canada zip codes list
        if (countryData.zipCodes.includes(value)) {
          return true;
        }
      }
    }
    return false;
  };

  const handelSubmit = async (_e) => {
    _e.preventDefault();
    let reqData = {
      firstName: formData?.firstname?.trim(),
      lastName: formData?.lastname?.trim(),
      phoneno: formData?.phoneno,
      countryCode: formData?.phonenocode,
      gender: formData?.gender,
      address: formData?.address,
      city: formData?.city,
      state: formData?.state,
      zipcode: formData?.zipcode,
      country: formData?.country,
      timezone: formData?.timezone,
      summary: formData?.about,
      profilePicture: formData?.profilePicture,
      website: formData?.website,
      specialization: formData?.specialization,
    };
    // if (!isValid) {
    //   toast.error("Invalid zip code");
    //   return;
    // }
    try {
      editProfileValidate.parse(formData);
    } catch (error) {
      console.log(error);
      if (error instanceof ZodError) {
        handelError(error, setFormData);
      }
      return;
    }
    doEditProfile(reqData);
  };
  const handleChangeEmail = () => {
    try {
      emailValidate.parse(emailData);
    } catch (error) {
      console.log(error);
      if (error instanceof ZodError) {
        handelError(error, setEmail);
      }
      return;
    }
    doemaillChange({ email: emailData.email });
  };
  const handleChangeUsername = () => {
    try {
      usernameValidate.parse(userName);
    } catch (error) {
      console.log(error);
      if (error instanceof ZodError) {
        handelError(error, setUserName);
      }
      return;
    }
    doUsernameChange({
      userName: userName?.username,
    });
  };
  const alertModalClose = () => {
    setAlertModal(false);
  };
  const handleCloseModal = () => {
    sethandleOpenModal(false);
  };
  useEffect(() => {
    getDetails();
    getSpecialization();
    getCountry();
  }, []);
  useEffect(() => {
    if (timezoneSuccess && timezoneData) {
      let filterData = timezoneData?.data?.filter(
        (it) => it.shortCode == formData.country
      );
      setTimezone(filterData);
      setBackupTimezone(timezoneData?.data);
    }
  }, [timezoneSuccess, timezoneData]);
  useEffect(() => {
    if (countrySuccess && countryData) {
      setCountry(countryData?.data);
      getTimeZone();
    }
  }, [countrySuccess, countryData]);
  useEffect(() => {
    if (specializationSuccess && specializationData) {
      setSpecialization(specializationData?.data);
    }
  }, [specializationSuccess, specializationData]);

  useEffect(() => {
    if (detailsSuccess && detailsData) {
      dispatch(
        setAuthUserState({
          isAuthenticated: "authenticated",
          isInitialized: true,
          user: detailsData.data,
        })
      );
      setEmail((prev) => {
        let data = { ...prev };
        data.email = detailsData?.data?.email;
        return data;
      });
      setUserName((prev) => {
        let data = { ...prev };
        data.username = detailsData?.data?.username
          ? detailsData?.data?.username
          : "";
        return data;
      });
      // setIsValid(validateZipCode(detailsData?.data?.zipcode));
      setPendingEmail(detailsData?.data?.pendingEmail);
      setFormData((prev) => {
        let data = { ...prev };
        data.profilePicture = detailsData?.data?.profilePicture;
        data.firstname = detailsData?.data?.firstName
          ? detailsData?.data?.firstName
          : "";
        data.lastname = detailsData?.data?.lastName
          ? detailsData?.data?.lastName
          : "";
        data.phoneno = detailsData?.data?.phoneno
          ? detailsData?.data?.phoneno?.toString()
          : "";
        data.phonenocode = detailsData?.data?.countryCode
          ? detailsData?.data?.countryCode
          : "";
        data.gender = detailsData?.data?.gender
          ? detailsData?.data?.gender
          : "";
        data.address = detailsData?.data?.address
          ? detailsData?.data?.address
          : "";
        data.city = detailsData?.data?.city ? detailsData?.data?.city : "";
        data.state = detailsData?.data?.state ? detailsData?.data?.state : "";
        data.country = detailsData?.data?.country
          ? detailsData?.data?.country
          : "";
        data.zipcode = detailsData?.data?.zipcode
          ? detailsData?.data?.zipcode
          : "";
        data.timezone = detailsData?.data?.timezone
          ? detailsData?.data?.timezone
          : "";
        data.about = detailsData?.data?.summary
          ? detailsData?.data?.summary
          : "";
        data.specialization = detailsData?.data?.specialization
          ? detailsData?.data?.specialization
          : "";
        data.website = detailsData?.data?.website
          ? detailsData?.data?.website
          : "";
        return data;
      });
    }
  }, [detailsSuccess, detailsData]);

  useEffect(() => {
    if (isSuccess && data) {
      sethandleOpenModal(true);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (isError && error) {
      toast.error(error?.data?.message);
    }
  }, [isError, error]);

  useEffect(() => {
    if (usernameSuccess && usernamedata) {
      toast.success(usernamedata?.message);
    }
  }, [usernameSuccess, usernamedata]);

  useEffect(() => {
    if (usernameError && usernameerr) {
      toast.error(usernameerr?.data?.message);
    }
  }, [usernameError, usernameerr]);
  useEffect(() => {
    if (emailSuccess && emaildata) {
      toast.success(emaildata?.message);
    }
  }, [emailSuccess, emaildata]);

  useEffect(() => {
    if (emailError && emailerr) {
      toast.error(emailerr?.data?.message);
    }
  }, [emailError, emailerr]);
  return (
    <AuthGuard>
      <Seo title="Edit Profile" metaName="Metaname" metaTags={metaTags}>
        <div className="mainDashboardArea">
          <form onSubmit={handelSubmit}>
            <Grid container>
              <Grid
                className="instDashLeft"
                item
                sx={{
                  width: "calc(100% - 366px)",
                  paddingRight: "64px",
                  paddingBottom: 7,
                }}
              >
                <Grid
                  container
                  className="layoutHead"
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <Grid item xs={12} sm={8}>
                    <Grid
                      item
                      container
                      alignItems={"center"}
                      columnGap={"20px"}
                    >
                      <Link
                        to="#"
                        className="backBtn"
                        onClick={() => navigate(-1)}
                      >
                        <ArrowBackIcon />
                      </Link>
                      <h4>Edit Profile</h4>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Grid
                      item
                      container
                      justifyContent={{ xs: "flex-start", sm: "flex-end" }}
                    >
                      <Grid item>
                        <div className="newCoursebtndiv">
                          {/* <button className="lightBtn">
                            <img src={saveIcon} alt="icon" />
                            Save Changes
                          </button> */}
                        </div>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid
                  item
                  container
                  flexDirection={"column"}
                  rowGap={"30px"}
                  className="editProfileForm"
                >
                  <Grid item xs={12}>
                    <p className="mainText fontWeight-700">General</p>
                    <Grid item container spacing={1} marginTop={"35px"}>
                      <Grid item xs={12} sm={4} lg={3}>
                        <Box className="profilePhotoUpload">
                          <Avatar
                            alt="Remy Sharp"
                            src={formData?.profilePicture}
                          />
                          <Box position={"absolute"}>
                            <input
                              disabled={disableImg}
                              type="file"
                              accept=".jpg,.png,.jpeg"
                              ref={fileInputRef}
                              name="profilepic"
                              onChange={(val) =>
                                handleuploadImg(val.target.files[0])
                              }
                            />
                            <button>
                              <CameraAltOutlinedIcon />
                            </button>
                          </Box>
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={8} lg={9}>
                        <Grid item container spacing={2}>
                          <Grid item xs={12} sm={6}>
                            <Box className="formGroup">
                              <label className="formlabel">First Name</label>
                              <input
                                type="text"
                                className={`form-control ${
                                  formData.firstnameErr ? "errField" : ""
                                }`}
                                placeholder="Enter your First Name"
                                name="firstname"
                                value={formData?.firstname}
                                onChange={(_event) => {
                                  handelChange(_event);
                                }}
                              />
                              <p className="errorMsg">
                                {formData?.firstnameErrMsg}
                              </p>
                            </Box>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Box className="formGroup">
                              <label className="formlabel">Last Name</label>
                              <input
                                type="text"
                                className={`form-control ${
                                  formData.lastnameErr ? "errField" : ""
                                }`}
                                placeholder="Enter your Last Name"
                                name="lastname"
                                value={formData?.lastname}
                                onChange={(_event) => {
                                  handelChange(_event);
                                }}
                              />
                              <p className="errorMsg">
                                {formData?.lastnameErrMsg}
                              </p>
                            </Box>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Box className="formGroup">
                              <label className="formlabel">Website</label>
                              <input
                                type="text"
                                className={`form-control ${
                                  formData?.websiteErr ? "errField" : ""
                                }`}
                                placeholder="Enter your website"
                                name="website"
                                value={formData.website}
                                onChange={(_event) => {
                                  handelChange(_event);
                                }}
                              />
                              <p className="errorMsg">
                                {formData?.websiteErrMsg}
                              </p>
                            </Box>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Box className="formGroup">
                              <label className="formlabel">
                                Specialization
                              </label>
                              <select
                                name="specialization"
                                className={`form-control ${
                                  formData?.specializationErr ? "errField" : ""
                                }`}
                                value={formData?.specialization}
                                onChange={(_event) => {
                                  handelChange(_event);
                                }}
                              >
                                <option value={""}>
                                  ---Select Specialization---
                                </option>
                                {specialization?.map((it, ind) => {
                                  return (
                                    <option
                                      value={it?.specializationName}
                                      key={ind}
                                    >
                                      {it?.specializationName}
                                    </option>
                                  );
                                })}
                              </select>
                              <p className="errorMsg">
                                {formData?.specializationErrMsg}
                              </p>
                            </Box>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Box className="formGroup">
                              <label className="formlabel">Phone Number</label>
                              <div className="CustomPhoneInput">
                                <div className="PhoneInput">
                                  <Select
                                    labelId="demo-simple-select-label"
                                    value={formData?.phonenocode}
                                    label="Age"
                                    onChange={(_event) => {
                                      handelChange(_event);
                                    }}
                                    name="phonenocode"
                                    className={`PhoneInputSelect ${
                                      formData?.phonenocodeErr ? "errField" : ""
                                    }`}
                                  >
                                    {country?.map((it, ind) => {
                                      return (
                                        <MenuItem
                                          value={it?.shortCode}
                                          key={ind}
                                        >
                                          <img
                                            src={it?.flagUrl}
                                            alt="icon"
                                            width={20}
                                          />
                                        </MenuItem>
                                      );
                                    })}
                                  </Select>
                                  <p>+1</p>
                                </div>

                                {/* <PhoneInput
                                  international
                                  // defaultCountry="US"
                                  countries={["CA", "US"]}
                                  value={formData?.phonenocode}
                                  onChange={(e) => {
                                    console.log(e);
                                    setFormData((prev) => {
                                      let data = { ...prev };
                                      data.phonenocode = e;
                                      data.phonenocodeErrMsg = "";
                                      data.phonenocodeErr = false;
                                      return data;
                                    });
                                  }}
                                  onKeyPress={(e) => {
                                    // Allow only numeric characters (0-9) and certain special keys like backspace, delete, arrow keys, etc.
                                    const isNumeric = /^[0-9\b]+$/.test(e.key);
                                    if (!isNumeric) {
                                      e.preventDefault();
                                    }
                                  }}
                                /> */}
                                <input
                                  type="text"
                                  inputMode="numeric"
                                  className={`form-control ${
                                    formData?.phonenoErr ? "errField" : ""
                                  }`}
                                  placeholder={
                                    formData?.phonenocode == "US"
                                      ? "XXX XXX XXXX"
                                      : "(XXX) XXX-XXXX"
                                  }
                                  name="phoneno"
                                  value={formData?.phoneno}
                                  onChange={(e) => {
                                    handelChange(e);
                                  }}
                                  onKeyPress={(e) => {
                                    // Allow only numeric characters (0-9) and certain special keys like backspace, delete, arrow keys, etc.
                                    const isNumeric = /^[0-9\b]+$/.test(e.key);
                                    if (!isNumeric) {
                                      e.preventDefault();
                                    }
                                  }}
                                />
                              </div>
                              <p className="errorMsg">
                                {formData?.phonenoErrMsg}
                              </p>
                            </Box>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Box className="formGroup">
                              <label className="formlabel">Gender</label>
                              <select
                                className={`form-control ${
                                  formData?.genderErr ? "errField" : ""
                                }`}
                                name="gender"
                                value={formData?.gender}
                                onChange={(_event) => {
                                  handelChange(_event);
                                }}
                              >
                                <option value={""}>Select Gender</option>
                                <option value={"Female"}>Female</option>
                                <option value={"Male"}>Male</option>
                                <option value={"Other"}>Other</option>
                              </select>
                              <p className="errorMsg">
                                {formData?.genderErrMsg}
                              </p>
                            </Box>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item xs={12}>
                    <p className="mainText fontWeight-700">Other Information</p>
                    <Grid item container spacing={3} marginTop={"24px"}>
                      <Grid item xs={12} sm={4}>
                        <Box className="formGroup">
                          <label className="formlabel">Address</label>
                          <input
                            type="text"
                            placeholder="Enter your address"
                            name="address"
                            className={`form-control ${
                              formData?.addressErr ? "errField" : ""
                            }`}
                            value={formData?.address}
                            onChange={(_event) => {
                              handelChange(_event);
                            }}
                          />
                          <p className="errorMsg">{formData?.addressErrMsg}</p>
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Box className="formGroup">
                          <label className="formlabel">City</label>
                          <input
                            type="text"
                            placeholder="Enter your city"
                            name="city"
                            className={`form-control ${
                              formData?.cityErr ? "errField" : ""
                            }`}
                            value={formData?.city}
                            onChange={(_event) => {
                              handelChange(_event);
                            }}
                          />
                          <p className="errorMsg">{formData?.cityErrMsg}</p>
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Box className="formGroup">
                          <label className="formlabel">State</label>
                          <input
                            type="text"
                            placeholder="Enter your state"
                            name="state"
                            className={`form-control ${
                              formData?.stateErr ? "errField" : ""
                            }`}
                            value={formData?.state}
                            onChange={(_event) => {
                              handelChange(_event);
                            }}
                          />
                          <p className="errorMsg">{formData?.stateErrMsg}</p>
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Box className="formGroup">
                          <label className="formlabel">Zipcode</label>
                          <input
                            type="text"
                            placeholder="Enter your zip code"
                            name="zipcode"
                            className={`form-control ${
                              formData?.zipcodeErr ? "errField" : ""
                            }`}
                            value={formData?.zipcode}
                            onChange={(_event) => {
                              handelChange(_event);
                              // const value = _event.target.value.trim();
                              // setIsValid(validateZipCode(value));
                            }}
                          />
                          <p className="errorMsg">{formData?.zipcodeErrMsg}</p>
                          {/* {!isValid && (
                            <p className="errorMsg">Invalid ZIP code</p>
                          )} */}
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Box className="formGroup">
                          <label className="formlabel">Country</label>
                          <select
                            name="country"
                            className={`form-control ${
                              formData?.countryErr ? "errField" : ""
                            }`}
                            value={formData?.country}
                            onChange={(_event) => {
                              handelChange(_event);
                              let filtertimezone = backuptimezone.filter(
                                (it) => it.shortCode == _event.target.value
                              );
                              setTimezone(filtertimezone);
                            }}
                          >
                            <option value={""}>Select Country</option>
                            {country?.map((it, ind) => {
                              return (
                                <option value={it?.shortCode} key={ind}>
                                  {it?.countryName}
                                </option>
                              );
                            })}
                          </select>
                          <p className="errorMsg">{formData?.countryErrMsg}</p>
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Box className="formGroup">
                          <label className="formlabel">Time Zone</label>
                          <select
                            name="timezone"
                            className={`form-control ${
                              formData?.timezoneErr ? "errField" : ""
                            }`}
                            value={formData?.timezone}
                            onChange={(_event) => {
                              handelChange(_event);
                            }}
                          >
                            <option value={""}>Select Time Zone</option>
                            {timezone?.map((it, ind) => {
                              return (
                                <option value={it?.zoneName} key={ind}>
                                  {it?.zoneName}
                                </option>
                              );
                            })}
                          </select>
                          <p className="errorMsg">{formData?.timezoneErrMsg}</p>
                        </Box>
                      </Grid>
                      <Grid item xs={12}>
                        <Box className="formGroup">
                          <label className="formlabel">
                            About Info / Summary
                          </label>
                          <textarea
                            placeholder="Enter your summary"
                            name="about"
                            className={`form-control ${
                              formData?.aboutErr ? "errField" : ""
                            }`}
                            value={formData?.about}
                            onChange={(_event) => {
                              handelChange(_event);
                            }}
                          ></textarea>
                          <p className="errorMsg">{formData?.aboutErrMsg}</p>
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                  <p className="errorMsg">{formData?.profilePictureErrMsg}</p>
                  <Grid item xs={12}>
                    <Grid item container>
                      <Box className="formGroup">
                        <button className="lightBtn" disabled={isLoading}>
                          <img src={saveIcon} alt="icon" />
                          Save Changes
                        </button>
                      </Box>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <p className="mainText fontWeight-700">
                      Account Information
                    </p>
                    <Grid item container spacing={3} marginTop={"24px"}>
                      <Grid item xs={12} sm={6}>
                        <label className="formlabel">Email</label>
                        <Box position={"relative"} className="inputBtnRight">
                          <input
                            type="email"
                            className={`form-control ${
                              emailData?.emailErr ? "errField" : ""
                            }`}
                            placeholder="Enter your email"
                            name="email"
                            value={emailData.email}
                            onChange={(_event) => {
                              handelChangeEmailInput(_event);
                            }}
                          />
                          <p className="errorMsg">{emailData?.emailErrMsg}</p>
                          <button
                            className="lightBtnSmall"
                            onClick={handleChangeEmail}
                            type="button"
                          >
                            Change
                          </button>
                        </Box>
                        {pendingEmail && (
                          <Grid item container>
                            <p className="subTextOne mb-0 break-word">
                              {pendingEmail}{" "}
                              <span className="colorRed">(Not Verified)</span>
                            </p>
                          </Grid>
                        )}
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <label className="formlabel">Username</label>
                        <Box position={"relative"} className="inputBtnRight">
                          <input
                            type="text"
                            className={`form-control ${
                              userName?.usernameErr ? "errField" : ""
                            }`}
                            placeholder="Enter your username"
                            name="username"
                            value={userName.username}
                            onChange={(_event) => {
                              handelChangeUsernameInput(_event);
                            }}
                          />
                          <p className="errorMsg">{userName?.usernameErrMsg}</p>
                          <button
                            className="lightBtnSmall"
                            onClick={handleChangeUsername}
                            type="button"
                          >
                            Change
                          </button>
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <RightSideBar profileDetails={detailsData?.data} />
            </Grid>
          </form>
        </div>

        {/* success modal */}

        <SuccessDialog
          handleOpenModal={handleOpenModal}
          handleCloseModal={handleCloseModal}
          title="Your changes have been saved!"
        />

        {/* Alert Modal  */}
        <PermitionDialoug
          handleOpenModal={alertmodal}
          handleCloseModal={alertModalClose}
          title="Are you sure you want to disable your account?"
        />
      </Seo>
    </AuthGuard>
  );
}

Component.displayName = "InstructorEditProfile";
