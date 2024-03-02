import { useState, useEffect } from "react";
import { ZodError } from "zod";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

import { GuestGuard } from "../../../guards/student/guest-guard";
import Seo from "@/components/common/seo";
import { signupValidate } from "@/validation/instructor/auth";
import { handelError } from "@/helpers/common";
import {
  useSignupMutation,
  useFacebookLoginInstructorMutation,
  useGoogleLoginInstructorMutation,
} from "@/redux/api/instructor/auth";
import { setAuthUserState } from "../../../redux/slice/instructor/user";
import FacebookLogin from "../../../components/loginButtons/facebook";
import GoogleLogin from "../../../components/loginButtons/google";
import LinkdinLogin from "../../../components/loginButtons/linkdin";

import InstructorSignupImg from "@/assets/images/instructor-signup.png";
import BecomeInstructorImg from "@/assets/images/become-Instructor.png";
import { signupValidateTwo } from "../../../validation/instructor/auth";
import { Link, useNavigate } from "react-router-dom";
import eyeClose from "@/assets/images/eye-close.svg";
import eyeOpen from "@/assets/images/eye.svg";
import { useLinkedinLoginInstructorMutation } from "../../../redux/api/instructor/auth";
const metaTags = [
  { name: "Metaname1", content: "content1" },
  { name: "Metaname2", content: "content2" },
];

export function Component() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [doLogin, { isLoading, isSuccess, isError, data, error }] =
    useSignupMutation();

  const [fbLogin, { isError: fbIsError, error: fbError }] =
    useFacebookLoginInstructorMutation();
  const [linkedinLogin, { isError: linkedinIsError, error: linkedinError }] =
    useLinkedinLoginInstructorMutation();
  const [googleLogin, { isError: googleIsError, error: googleError }] =
    useGoogleLoginInstructorMutation();

  const [passwordView, setpasswordView] = useState(false);
  const [termscheck, settermsCheck] = useState(false);
  const [formData, setFormData] = useState({
    firstname: "",
    firstnameErr: false,
    firstnameErrMsg: "",
    lastname: "",
    lastnameErr: false,
    lastnameErrMsg: "",
    email: "",
    emailErr: false,
    emailErrMsg: "",
    password: "",
    passwordErr: false,
    passwordErrMsg: "",
  });

  const handelChange = (_event) => {
    setFormData((_prevState) => ({
      ..._prevState,
      [_event.target.name]: _event.target.value,
      [`${_event.target.name}Err`]: false,
      [`${_event.target.name}ErrMsg`]: "",
    }));
  };
  const handleaccessToken = (response) => {
    console.log("response", response);
  };
  const handleGoogleAccessToken = async (response) => {
    try {
      const res = await googleLogin({ idToken: response }).unwrap();
      console.log(res);
      handeloSocialLogin(res);
    } catch (error) {
      console.log(error);
    }
  };
  const handleLinkedinAccessToken = async (response) => {
    try {
      const res = await linkedinLogin({ accessToken: response }).unwrap();
      console.log(res);
      handeloSocialLogin(res);
    } catch (error) {
      console.log(error);
    }
  };
  const handleFbAccessToken = async (response) => {
    console.log(response, "respons otke e");
    try {
      const res = await fbLogin({ accessToken: response }).unwrap();
      console.log(res);
      handeloSocialLogin(res);
    } catch (error) {
      console.log(error);
    }
  };

  const handeloSocialLogin = (data) => {
    localStorage.setItem("token", data?.data?.token);

    if (data?.data?.step == 1) {
      navigate("/instructor/signup-step-two");
    } else if (data?.data?.step == 2) {
      navigate("/instructor/signup-step-three");
    } else if (data?.data?.step == 3) {
      navigate("/instructor/signup-step-four");
    } else if (data?.data?.step == 4 && data?.data?.isApproved == "PENDING") {
      navigate(`/instructor/signup-success?fullName=${data?.data?.fullName}`);
    } else if (data?.data?.step == 4 && data?.data?.isApproved == "APPROVED") {
      dispatch(
        setAuthUserState({
          isAuthenticated: "authenticated",
          isInitialized: true,
          user: "SD",
        })
      );
      navigate("/instructor/dashboard");
    }
  };

  const handelSubmit = async (_e) => {
    _e.preventDefault();
    try {
      if (
        !formData.firstname.trim() ||
        !formData.lastname.trim() ||
        !formData.email.trim() ||
        !formData.password.trim()
      ) {
        signupValidateTwo.parse(formData);
      } else {
        signupValidate.parse(formData);
      }
      if (!termscheck) {
        return toast.error(
          "Please agree to the LightForth Terms of Service and Privacy Policy"
        );
      }
    } catch (error) {
      if (error instanceof ZodError) {
        handelError(error, setFormData);
      }
      return;
    }
    doLogin({
      firstName: formData.firstname.trim(),
      lastName: formData.lastname.trim(),
      email: formData.email.trim(),
      password: formData.password,
    });
  };

  useEffect(() => {
    if (isSuccess && data) {
      // localStorage.setItem("token", data.data.token);
      // dispatch(
      //   setAuthUserState({
      //     isAuthenticated: "authenticated",
      //     isInitialized: true,
      //     user: "SD",
      //   })
      // );
      toast.success(data?.message);
      let datanew = {
        firstname: "",
        firstnameErr: false,
        firstnameErrMsg: "",
        lastname: "",
        lastnameErr: false,
        lastnameErrMsg: "",
        email: "",
        emailErr: false,
        emailErrMsg: "",
        password: "",
        passwordErr: false,
        passwordErrMsg: "",
      };
      setFormData(datanew);
      // navigate("/instructor/signup-step-two");
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (isError && error) {
      toast.error(error?.data?.message);
    }
  }, [isError, error]);

  useEffect(() => {
    if (fbIsError && fbError) {
      toast.error(fbError?.data?.message);
    }
  }, [fbIsError, fbError]);

  useEffect(() => {
    if (googleIsError && googleError) {
      toast.error(googleError?.data?.message);
    }
  }, [googleIsError, googleError]);

  useEffect(() => {
    if (linkedinIsError && linkedinError) {
      toast.error(linkedinError?.data?.message);
    }
  }, [linkedinIsError, linkedinError]);
  return (
    <GuestGuard>
      <Seo title="signup" metaName="Metaname" metaTags={metaTags}>
        <section className="authSec">
          <div className="container">
            <div className="authblock">
              <div className="authRow instructorAuth">
                <div className="left">
                  <div className="imgBlock">
                    <img src={InstructorSignupImg} alt="" />
                  </div>
                  <div className="becomeBlock instructorbecomeBlock">
                    <img src={BecomeInstructorImg} alt="" />
                    <p className="subTextOne">
                      Earn while you share your knowledge and experiences.
                    </p>
                  </div>
                </div>
                <div className="right">
                  <div className="customStaper">
                    <div className="staperLine">
                      <button className="active"></button>
                      <button></button>
                      <button></button>
                      <button></button>
                    </div>
                    <div className="staperMain">
                      <form onSubmit={handelSubmit}>
                        {/* Strat Step One */}

                        <div id="step-one" className="staper show">
                          <div className="formContent">
                            <h4>Become an Instructor</h4>
                            <p className="subTextOne">
                              Sign up to join a vast community of instructors
                              and students waiting to share experiences and
                              opportunities!
                            </p>
                            <div className="imgBlock">
                              <img src={InstructorSignupImg} alt="" />
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-12 col-sm-6">
                              <div className="formGroup">
                                <label className="formlabel">First Name</label>
                                <input
                                  type="text"
                                  className={`form-control ${
                                    formData.firstnameErr ? "errField" : ""
                                  }`}
                                  placeholder="Enter First Name"
                                  name="firstname"
                                  value={formData.firstname}
                                  onChange={(_event) => {
                                    handelChange(_event);
                                  }}
                                />
                                <p className="errorMsg">
                                  {formData?.firstnameErrMsg}
                                </p>
                              </div>
                            </div>
                            <div className="col-12 col-sm-6">
                              <div className="formGroup">
                                <label className="formlabel">Last Name</label>
                                <input
                                  type="text"
                                  className={`form-control ${
                                    formData.lastnameErr ? "errField" : ""
                                  }`}
                                  placeholder="Enter Last Name"
                                  name="lastname"
                                  value={formData.lastname}
                                  onChange={(_event) => {
                                    handelChange(_event);
                                  }}
                                />
                                <p className="errorMsg">
                                  {formData?.lastnameErrMsg}
                                </p>
                              </div>
                            </div>
                            <div className="col-12">
                              <div className="formGroup">
                                <label className="formlabel">Email</label>
                                <input
                                  type="text"
                                  className={`form-control ${
                                    formData.emailErr ? "errField" : ""
                                  }`}
                                  placeholder="youremail@guru.com"
                                  name="email"
                                  value={formData.email}
                                  onChange={(_event) => {
                                    handelChange(_event);
                                  }}
                                />
                                <p className="errorMsg">
                                  {formData?.emailErrMsg}
                                </p>
                              </div>
                            </div>
                            <div className="col-12">
                              <div className="formGroup">
                                <label className="formlabel">Password</label>
                                <div className="inputGroup positionRight">
                                  <input
                                    type={passwordView ? "text" : "password"}
                                    className={`form-control ${
                                      formData.passwordErr ? "errField" : ""
                                    }`}
                                    placeholder="Enter your pssword"
                                    value={formData.password}
                                    name="password"
                                    onChange={(_event) => {
                                      handelChange(_event);
                                    }}
                                  />
                                  <button
                                    type="button"
                                    className="inputGroupRight"
                                    onClick={() => {
                                      setpasswordView(!passwordView);
                                    }}
                                  >
                                    <img
                                      src={passwordView ? eyeOpen : eyeClose}
                                      alt="eye-close"
                                    />
                                  </button>
                                  <p
                                    className="errorMsg"
                                    style={{ color: "red" }}
                                  >
                                    {formData?.passwordErrMsg}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="col-12">
                              <div className="formGroup">
                                <div className="lightforthCheckbox">
                                  <div className="mainCheck">
                                    <input
                                      type="checkbox"
                                      checked={termscheck}
                                      onChange={() =>
                                        settermsCheck(!termscheck)
                                      }
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
                                    I agree to the LightForth{" "}
                                    <Link
                                      to="/terms-condition"
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      Terms of Service
                                    </Link>{" "}
                                    and{" "}
                                    <Link
                                      to="/privacy-policy"
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      Privacy Policy
                                    </Link>
                                  </label>
                                </div>
                              </div>
                            </div>
                            <div className="col-12">
                              <div className="submitDiv">
                                <button
                                  className="primaryBtn fullWidth"
                                  disabled={isLoading}
                                >
                                  Sign Up
                                </button>
                              </div>
                            </div>
                          </div>
                          <div className="loginWith">
                            <p className="subTextOne">Or continue with</p>
                            <div className="loginWithRow">
                              <div className="loginWithCol">
                                <GoogleLogin
                                  handleaccessToken={(res) =>
                                    handleGoogleAccessToken(res)
                                  }
                                />
                              </div>
                              <div className="loginWithCol">
                                <LinkdinLogin
                                  handleaccessToken={(res) =>
                                    handleLinkedinAccessToken(res)
                                  }
                                />
                              </div>
                              <div className="loginWithCol">
                                <FacebookLogin
                                  handleaccessToken={(res) =>
                                    handleFbAccessToken(res)
                                  }
                                />
                              </div>
                            </div>
                          </div>
                          <p className="subTextOne fontWeight-500">
                            Already have an account?{" "}
                            <Link
                              to={"/instructor/login"}
                              className="subTextOne fontWeight-700 colorOrange underline hoverLink"
                            >
                              Login
                            </Link>
                          </p>
                        </div>

                        {/* End Step One */}

                        {/* Strat Step Two */}

                        <div id="step-two" className="staper">
                          <div className="formContent">
                            <h4>Upload Certification</h4>
                            <p className="subTextOne">
                              Upload a copy of your CV and Certificate(s) to
                              enable us evaluate your application.
                            </p>
                          </div>
                          <div className="row">
                            <div className="col-12">
                              <div className="formGroup">
                                <label className="formlabel">
                                  Upload CV <strong>(2mb max)</strong>
                                </label>
                                <div className="fileUploadOne">
                                  <div className="fileName">
                                    <p className="subTextOne">mynewcv.pdf</p>
                                    <button>
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="12"
                                        height="12"
                                        viewBox="0 0 12 12"
                                        fill="none"
                                      >
                                        <path
                                          fillRule="evenodd"
                                          clipRule="evenodd"
                                          d="M2.57613 2.57417C2.81044 2.33986 3.19034 2.33986 3.42465 2.57417L6.00039 5.14991L8.57613 2.57417C8.81044 2.33986 9.19034 2.33986 9.42465 2.57417C9.65897 2.80849 9.65897 3.18839 9.42465 3.4227L6.84892 5.99844L9.42465 8.57417C9.65897 8.80849 9.65897 9.18839 9.42465 9.4227C9.19034 9.65702 8.81044 9.65702 8.57613 9.4227L6.00039 6.84697L3.42465 9.4227C3.19034 9.65702 2.81044 9.65702 2.57613 9.4227C2.34181 9.18839 2.34181 8.80849 2.57613 8.57417L5.15186 5.99844L2.57613 3.4227C2.34181 3.18839 2.34181 2.80849 2.57613 2.57417Z"
                                          fill="#AFBDCA"
                                        />
                                      </svg>
                                    </button>
                                  </div>
                                  <div className="fileUpload">
                                    <input type="file" />
                                    <button>
                                      Choose{" "}
                                      <img src="assets/images/upload.svg" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-12">
                              <div className="formGroup">
                                <label className="formlabel">
                                  Upload Certificate(s)
                                </label>
                                <div className="fileUploadTwo">
                                  <input type="file" />
                                  <p className="subTextOne fontWeight-700">
                                    Drop one or more file(s) here or{" "}
                                    <span>browse</span>
                                  </p>
                                  <p className="subTextTwo">
                                    Max. File Size: 20MB
                                  </p>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-12">
                                  <div className="formGroup">
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Add Title"
                                    />
                                  </div>
                                </div>
                                <div className="col-12 col-md-6">
                                  <div className="formGroup">
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Date"
                                    />
                                  </div>
                                </div>
                                <div className="col-12 col-md-6">
                                  <div className="formGroup">
                                    <select className="form-control">
                                      <option>Select Category</option>
                                    </select>
                                  </div>
                                </div>
                                <div className="col-12 col-md-6">
                                  <div className="formGroup">
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Issuer"
                                    />
                                  </div>
                                </div>
                                <div className="col-12 col-md-6">
                                  <div className="formGroup">
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Cert. No"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-12">
                              <div className="staperBtnDiv">
                                <button className="circleBtn">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="32"
                                    height="32"
                                    viewBox="0 0 32 32"
                                    fill="none"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      clipRule="evenodd"
                                      d="M15.5318 23.5314C14.9069 24.1562 13.8939 24.1562 13.269 23.5314L6.86902 17.1314C6.24418 16.5065 6.24418 15.4935 6.86902 14.8686L13.269 8.46863C13.8939 7.84379 14.9069 7.84379 15.5318 8.46863C16.1566 9.09347 16.1566 10.1065 15.5318 10.7314L11.8631 14.4L24.0004 14.4C24.884 14.4 25.6004 15.1163 25.6004 16C25.6004 16.8837 24.884 17.6 24.0004 17.6H11.8631L15.5318 21.2686C16.1566 21.8935 16.1566 22.9065 15.5318 23.5314Z"
                                      fill="#C4D2DF"
                                    />
                                  </svg>
                                </button>
                                <button className="primaryBtn">Next</button>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* End Step Two */}

                        {/* Strat Step three */}

                        <div id="step-three" className="staper">
                          <div className="formContent">
                            <h4>Verify Your Identity</h4>
                            <p className="subTextOne">
                              Upload a means of identification so that we can
                              get to know you.
                            </p>
                          </div>
                          <div className="row">
                            <div className="col-12">
                              <div className="formGroup">
                                <label className="formlabel">
                                  Select ID Type
                                </label>
                                <select className="form-control">
                                  <option>International Passport</option>
                                </select>
                              </div>
                            </div>
                            <div className="col-12">
                              <div className="formGroup">
                                <label className="formlabel">ID Number</label>
                                <input type="text" className="form-control" />
                              </div>
                            </div>
                            <div className="col-12">
                              <div className="formGroup">
                                <label className="formlabel">Upload ID</label>
                                <div className="fileUploadTwo">
                                  <input type="file" />
                                  <p className="subTextOne fontWeight-700">
                                    Drop one or more file(s) here or{" "}
                                    <span>browse</span>
                                  </p>
                                  <p className="subTextTwo">
                                    Max. File Size: 20MB
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="col-12">
                              <div className="staperBtnDiv">
                                <button className="circleBtn">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="32"
                                    height="32"
                                    viewBox="0 0 32 32"
                                    fill="none"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      clipRule="evenodd"
                                      d="M15.5318 23.5314C14.9069 24.1562 13.8939 24.1562 13.269 23.5314L6.86902 17.1314C6.24418 16.5065 6.24418 15.4935 6.86902 14.8686L13.269 8.46863C13.8939 7.84379 14.9069 7.84379 15.5318 8.46863C16.1566 9.09347 16.1566 10.1065 15.5318 10.7314L11.8631 14.4L24.0004 14.4C24.884 14.4 25.6004 15.1163 25.6004 16C25.6004 16.8837 24.884 17.6 24.0004 17.6H11.8631L15.5318 21.2686C16.1566 21.8935 16.1566 22.9065 15.5318 23.5314Z"
                                      fill="#C4D2DF"
                                    />
                                  </svg>
                                </button>
                                <button className="primaryBtn">Next</button>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* End Step three */}

                        {/* Strat Step four */}

                        <div id="step-four" className="staper">
                          <div className="formContent">
                            <h4>Summary</h4>
                            <p className="subTextOne">
                              Tell us a bit about yourself and your primary area
                              of tutelage.
                            </p>
                          </div>
                          <div className="row">
                            <div className="col-12">
                              <div className="formGroup">
                                <label className="formlabel">
                                  Select primary area of specialization
                                </label>
                                <select className="form-control">
                                  <option>Programming</option>
                                </select>
                              </div>
                            </div>
                            <div className="col-12">
                              <div className="formGroup">
                                <label className="formlabel">
                                  Upload a picture of yourself{" "}
                                  <strong>(2mb max)</strong>
                                </label>
                                <div className="fileUploadOne">
                                  <div className="fileName">
                                    <p className="subTextOne">mynewcv.pdf</p>
                                    <button>
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="12"
                                        height="12"
                                        viewBox="0 0 12 12"
                                        fill="none"
                                      >
                                        <path
                                          fillRule="evenodd"
                                          clipRule="evenodd"
                                          d="M2.57613 2.57417C2.81044 2.33986 3.19034 2.33986 3.42465 2.57417L6.00039 5.14991L8.57613 2.57417C8.81044 2.33986 9.19034 2.33986 9.42465 2.57417C9.65897 2.80849 9.65897 3.18839 9.42465 3.4227L6.84892 5.99844L9.42465 8.57417C9.65897 8.80849 9.65897 9.18839 9.42465 9.4227C9.19034 9.65702 8.81044 9.65702 8.57613 9.4227L6.00039 6.84697L3.42465 9.4227C3.19034 9.65702 2.81044 9.65702 2.57613 9.4227C2.34181 9.18839 2.34181 8.80849 2.57613 8.57417L5.15186 5.99844L2.57613 3.4227C2.34181 3.18839 2.34181 2.80849 2.57613 2.57417Z"
                                          fill="#AFBDCA"
                                        />
                                      </svg>
                                    </button>
                                  </div>
                                  <div className="fileUpload">
                                    <input type="file" />
                                    <button>
                                      Choose{" "}
                                      <img src="assets/images/upload.svg" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-12">
                              <div className="formGroup">
                                <label className="formlabel">
                                  Brief summary about yourself
                                </label>
                                <textarea className="form-control"></textarea>
                              </div>
                            </div>
                            <div className="col-12">
                              <div className="staperBtnDiv">
                                <button className="circleBtn">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="32"
                                    height="32"
                                    viewBox="0 0 32 32"
                                    fill="none"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      clipRule="evenodd"
                                      d="M15.5318 23.5314C14.9069 24.1562 13.8939 24.1562 13.269 23.5314L6.86902 17.1314C6.24418 16.5065 6.24418 15.4935 6.86902 14.8686L13.269 8.46863C13.8939 7.84379 14.9069 7.84379 15.5318 8.46863C16.1566 9.09347 16.1566 10.1065 15.5318 10.7314L11.8631 14.4L24.0004 14.4C24.884 14.4 25.6004 15.1163 25.6004 16C25.6004 16.8837 24.884 17.6 24.0004 17.6H11.8631L15.5318 21.2686C16.1566 21.8935 16.1566 22.9065 15.5318 23.5314Z"
                                      fill="#C4D2DF"
                                    />
                                  </svg>
                                </button>
                                <button className="primaryBtn">Sign Up</button>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* End Step four */}
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Seo>
    </GuestGuard>
  );
}

Component.displayName = "InstructorSignup";
