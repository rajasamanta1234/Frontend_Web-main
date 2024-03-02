import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AuthGuard } from "../../../guards/student/auth-guard";
import Seo from "@/components/common/seo";
import { logout } from "@/redux/slice/student/user";

import "../../../assets/css/student-dashboard/style.css";
import "../../../assets/css/student-dashboard/responsive.css";

import AWS from "aws-sdk";

import uploadIcon from "@/assets/images/upload-icon.svg";
import {
  Avatar,
  Box,
  Button,
  Grid,
  LinearProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  MenuItem,
  Select,
} from "@mui/material";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import SliderValue from "@mui/material/Slider";
import StarIcon from "@mui/icons-material/Star";
import styled from "styled-components";
import { toast } from "react-toastify";

import LeftBar from "../../../components/student/settings-leftbar";
import {
  useGetStudentProfileDataMutation,
  useUpdateStudentProfileMutation,
  useGetLocationMutation,
} from "../../../redux/api/student/profile";
import { editProfileValidation } from "../../../validation/student/profile";

import { ZodError } from "zod";
import { handelError, getCurrentDate } from "@/helpers/common";
import Accountmenu from "../../../components/student/account-menu";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import {
  getCountryCallingCode,
  formatPhoneNumber,
} from "react-phone-number-input";
import moment from "moment";
import {
  useGetCountryMutation,
  useGetTimeZoneMutation,
} from "../../../redux/api/instructor/auth";

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
  const birthday_ref = useRef();
  const dispatch = useDispatch();
  const fileInputRef = useRef();
  const [getData, { data, isSuccess }] = useGetStudentProfileDataMutation();
  const [
    update,
    { isSuccess: isUpdateSuccess, isError, error, data: updateData },
  ] = useUpdateStudentProfileMutation();

  const [getLocation, { data: locationList, isSuccess: locationSuccess }] =
    useGetLocationMutation();
  const [getCountry, { isSuccess: countrySuccess, data: countryData }] =
    useGetCountryMutation();
  const [getTimeZone, { isSuccess: timezoneSuccess, data: timezoneData }] =
    useGetTimeZoneMutation();
  const [formData, setFormData] = useState({
    fullName: "",
    fullNameErr: false,
    fullNameErrMsg: "",
    profilePicture: "",
    profilePictureErr: false,
    profilePictureErrMsg: "",
    bio: "",
    bioErr: false,
    bioErrMsg: "",
    phonenocode: "",
    phonenocodeErr: false,
    phonenocodeErrMsg: "",
    phoneno: "",
    phonenoErr: false,
    phonenoErrMsg: "",
    countryCode: "",
    countryCodeFalse: false,
    countryCodeErrMsg: "",
    location: "",
    locationErr: false,
    locationErrMsg: "",
    dob: "",
    dobErr: false,
    dobErrMsg: "",
    timezone: "",
    timezoneErr: false,
    timezoneErrMsg: "",
  });
  const [disableImg, setDisableImg] = useState(false);
  const [timezone, setTimezone] = useState([]);
  const [backuptimezone, setBackupTimezone] = useState([]);

  const [country, setCountry] = useState([]);
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
    if (formData.countryCode && formData.timezone) {
      let filterData = timezoneData?.data?.filter(
        (it) => it.shortCode == formData.countryCode
      );
      setTimezone(filterData);
      setBackupTimezone(timezoneData?.data);
    }
  }, [timezoneSuccess, timezoneData]);
  useEffect(() => {
    if (locationSuccess && countryData) {
      setCountry(countryData?.data);
      getTimeZone();
    }
  }, [locationSuccess, countryData]);
  function isFutureDate(dateString) {
    const selectedDate = new Date(dateString);
    const currentDate = new Date();
    return selectedDate > currentDate;
  }
  const handelChange = (_event) => {
    if (_event.target.name === "dob" && _event.target.value) {
      if (isFutureDate(_event.target.value)) {
        toast.error("Future date not allowed");
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
  const handleFileUpload = async (file) => {
    const maxFileSizeMB = 2;
    const maxImageWidth = 300;
    const maxImageHeight = 300;

    if (
      !file.type.includes("jpg") &&
      !file.type.includes("png") &&
      !file.type.includes("jpeg")
    ) {
      console.error("Only image format can be uploaded");
      toast.error("Only image format can be uploaded");
      fileInputRef.current.value = null;
      return;
    }

    if (file.size > maxFileSizeMB * 1024 * 1024) {
      console.error("Uploading file can not be more than 2 MB");
      toast.error("Uploading file can not be more than 2 MB");
      fileInputRef.current.value = null;
      return;
    }

    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = async function () {
      // if (this.width > maxImageWidth || this.height > maxImageHeight) {
      //   console.error("Image dimensions should be 300x300 or smaller");
      //   toast.error("Image dimensions should be 300x300 or smaller");
      //   fileInputRef.current.value = null;
      //   return;
      // } else {
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
      // }
    };
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
  const handelSubmit = async (_e) => {
    _e.preventDefault();
    console.log("formdata", formData);
    try {
      editProfileValidation.parse(formData);
    } catch (error) {
      if (error instanceof ZodError) {
        console.log(error);
        handelError(error, setFormData);
      }
      return;
    }
    update({
      fullName: formData?.fullName ?? "",
      profilePicture: formData?.profilePicture ?? "",
      bio: formData?.bio ?? "",
      phoneno: formData?.phoneno ?? "",
      countryCode: formData?.phonenocode ?? "",
      location: formData?.countryCode ?? "",
      timeZone: formData?.timezone ?? "",
      dob: formData?.dob ?? "",
    });
  };

  useEffect(() => {
    getData();
    getLocation();
    getCountry();
  }, []);

  useEffect(() => {
    if (isSuccess && data?.data) {
      const _data = data?.data;
      setFormData({
        fullName: _data?.fullName,
        fullNameErr: false,
        fullNameErrMsg: "",
        profilePicture: _data?.profilePicture ?? "",
        profilePictureErr: false,
        profilePictureErrMsg: "",
        bio: _data?.bio ?? "",
        bioErr: false,
        bioErrMsg: "",
        phoneno: _data?.phoneno ? _data?.phoneno?.toString() : "",
        phonenoErr: false,
        phonenoErrMsg: "",
        countryCode: _data?.location ?? "",
        countryCodeFalse: false,
        countryCodeErrMsg: "",
        location: _data?.location ?? "",
        locationErr: false,
        locationErrMsg: "",
        timezone: _data?.timeZone ?? "",
        timezoneErr: false,
        timezoneErrMsg: "",
        dob: _data?.dob
          ? moment(_data?.dob, "DD-MM-YYYY").format("YYYY-MM-DD")
          : "",
        dobErr: false,
        dobErrMsg: "",
        phonenocode: _data?.countryCode ?? "US",
        phonenocodeErr: false,
        phonenocodeErrMsg: "",
      });
    }
  }, [data, isSuccess]);

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
    if (isError && error) {
      toast.error(error?.data?.message);
    }
  }, [isError, error]);

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
                  <LeftBar title={"edit"} />
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
                  <Accountmenu containedValue="0" />
                  <Box padding={"30px"}>
                    <p className="subTextThree fontWeight-700 color-Neutral-Black">
                      Edit Profile
                    </p>
                    <Grid item container paddingTop={"30px"} spacing={"30px"}>
                      <Grid item xs={12}>
                        <List className="studentProfileUpload">
                          <ListItem>
                            <ListItemAvatar>
                              <Avatar>
                                <img
                                  style={{
                                    position: "absolute",
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                  }}
                                  src={formData?.profilePicture}
                                />
                                <Button
                                  component="label"
                                  variant="contained"
                                  startIcon={<img src={uploadIcon} />}
                                >
                                  <VisuallyHiddenInput
                                    type="file"
                                    disabled={disableImg}
                                    accept=".jpg,.png,.jpeg"
                                    ref={fileInputRef}
                                    name="profilepic"
                                    onChange={(val) =>
                                      handleuploadImg(val.target.files[0])
                                    }
                                  />
                                </Button>
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                              primary="Upload Photo"
                              //secondary="300x300 and max 2 MB"
                              secondary="Max 2 MB"
                            />
                          </ListItem>
                        </List>
                        <p className="errorMsg">
                          {formData?.profilePictureErrMsg}
                        </p>
                      </Grid>
                      <Grid item xs={12} sm={7}>
                        <label className="formlabel fontWeight-500">
                          Full Name
                        </label>
                        <input
                          type="text"
                          className={`form-control ${
                            formData.fullNameErr ? "errField" : ""
                          }`}
                          name="fullName"
                          value={formData.fullName}
                          onChange={(_event) => {
                            handelChange(_event);
                          }}
                        />
                        <p className="errorMsg">{formData?.fullNameErrMsg}</p>
                      </Grid>
                      <Grid item xs={12} sm={7}>
                        <label className="formlabel fontWeight-500">
                          Location
                        </label>
                        <select
                          className={`form-control ${
                            formData.countryCodeFalse ? "errField" : ""
                          }`}
                          name="countryCode"
                          value={formData.countryCode}
                          onChange={(_event) => {
                            handelChange(_event);
                            let filtertimezone = backuptimezone.filter(
                              (it) => it.shortCode == _event.target.value
                            );
                            setTimezone(filtertimezone);
                          }}
                        >
                          <option value={""}>Select</option>
                          {/* <option value="arm">Arambagh</option>
                          <option value="kol">kolkata</option> */}

                          {country?.map((e, index) => {
                            return (
                              <option value={e.shortCode} key={index}>
                                {e.countryName}
                              </option>
                            );
                          })}
                        </select>
                        <p className="errorMsg">
                          {formData?.countryCodeErrMsg}
                        </p>
                      </Grid>
                      <Grid item xs={12} sm={7}>
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
                      </Grid>
                      <Grid item xs={12} sm={7}>
                        <label className="formlabel fontWeight-500">
                          Birthday
                        </label>
                        <input
                          ref={birthday_ref}
                          type="date"
                          className={`form-control ${
                            formData.dobErr ? "errField" : ""
                          }`}
                          min="1900-01-01"
                          max={getCurrentDate()}
                          name="dob"
                          value={formData.dob}
                          onChange={(_event) => {
                            handelChange(_event);
                          }}
                          //uncomment this if you want to open calander when clicking on body
                          // onClick={() => {
                          //   if (birthday_ref.current && typeof birthday_ref.current.showPicker === 'function') {
                          //     birthday_ref.current.showPicker();
                          //   }
                          // }}
                        />
                        <p className="errorMsg">{formData?.dobErrMsg}</p>
                      </Grid>
                      <Grid item xs={12} sm={7}>
                        <label className="formlabel fontWeight-500">
                          Phone Number
                        </label>
                        <div className="CustomPhoneInput">
                          <div className="PhoneInput">
                            <Select
                              labelId="demo-simple-select-label"
                              value={formData?.phonenocode}
                              defaultValue="US"
                              label="Age"
                              onChange={(_event) => {
                                handelChange(_event);
                              }}
                              name="phonenocode"
                              className={`PhoneInputSelect ${
                                formData?.phonenocodeErr ? "errField" : ""
                              }`}
                            >
                              {countryData?.data?.map((it, ind) => {
                                return (
                                  <MenuItem value={it?.shortCode} key={ind}>
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
                        {/* <div className="CustomPhoneInput"> */}
                        {/*<PhoneInput
                          international
                          defaultCountry="US"
                          className={`form-control ${formData.phonenoErr ? "errField" : ""
                            }`}
                          value={formData?.phonenocode}
                          onChange={(value) => {
                            setFormData((prev) => {
                              let data = { ...prev };

                              data.phonenocode = value;
                              data.phonenocodeErrMsg = "";
                              data.phonenocodeErr = false;
                              data.phoneno = value;
                              data.phonenoErr = false;
                              data.phonenoErrMsg = "";
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
                        />*/}
                        {/* <input
                            type="number"
                            className={`form-control ${
                              formData.phonenoErr ? "errField" : ""
                            }`}
                            name="phoneno"
                            value={formData.phonenoErr}
                            onChange={(_event) => {
                              handelChange(_event);
                            }}
                          /> */}
                        {/* </div> */}
                        <p className="errorMsg">{formData?.phonenoErrMsg}</p>
                      </Grid>
                      <Grid item xs={12} sm={7}>
                        <label className="formlabel fontWeight-500">Bio</label>
                        <input
                          type="text"
                          className={`form-control ${
                            formData.bioErr ? "errField" : ""
                          }`}
                          name="bio"
                          value={formData.bio}
                          onChange={(_event) => {
                            handelChange(_event);
                          }}
                        />
                        <p className="errorMsg">{formData?.bioErrMsg}</p>
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

Component.displayName = "StudentEditProfile";
