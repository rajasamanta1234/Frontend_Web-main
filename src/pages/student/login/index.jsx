import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ZodError } from "zod";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

import { GuestGuard } from "../../../guards/student/guest-guard";
import Seo from "@/components/common/seo";
import { loginValidate } from "@/validation/student/auth";
import { handelError } from "@/helpers/common";
import {
  useLoginStudentMutation,
  useFacebookLoginStudentMutation,
  useGoogleLoginStudentMutation,
} from "@/redux/api/student/auth";
import { setAuthUserState } from "../../../redux/slice/student/user";
import FacebookLogin from "../../../components/loginButtons/facebook";
import GoogleLogin from "../../../components/loginButtons/google";
import LinkdinLogin from "../../../components/loginButtons/linkdin";

import StudentLoginImg from "@/assets/images/student-login.png";
import BecomeInstructorImg from "@/assets/images/become-Instructor.png";
import eyeClose from "@/assets/images/eye-close.svg";
import eyeOpen from "@/assets/images/eye.svg";
import { useLinkedinLoginStudentMutation } from "../../../redux/api/student/auth";

const metaTags = [
  { name: "Metaname1", content: "content1" },
  { name: "Metaname2", content: "content2" },
];
export function Component() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [doLogin, { isLoading, isSuccess, isError, data, error }] =
    useLoginStudentMutation();

  const [fbLogin, { isError: fbIsError, error: fbError }] =
    useFacebookLoginStudentMutation();
  const [googleLogin, { isError: googleIsError, error: googleError }] =
    useGoogleLoginStudentMutation();
  const [linkedinLogin, { isError: linkedinIsError, error: linkedinError }] =
    useLinkedinLoginStudentMutation();
  const [passwordView, setpasswordView] = useState(false);
  const [formData, setFormData] = useState({
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

  const handelSubmit = async (_e) => {
    _e.preventDefault();

    try {
      loginValidate.parse(formData);
    } catch (error) {
      if (error instanceof ZodError) {
        handelError(error, setFormData);
      }
      return;
    }
    doLogin({ email: formData.email.trim(), password: formData.password });
  };

  const handleaccessToken = (response) => {
    // console.log("response", response);
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
    dispatch(
      setAuthUserState({
        isAuthenticated: "authenticated",
        isInitialized: true,
        user: "SD",
      })
    );
    navigate("/student/dashboard");
  };
  useEffect(() => {
    if (isSuccess && data) {
      localStorage.setItem("token", data?.data?.token);

      console.log(data?.data?.isTopicsAdded);
      if (data?.data?.isTopicsAdded) {
        dispatch(
          setAuthUserState({
            isAuthenticated: "authenticated",
            isInitialized: true,
            user: "SD",
          })
        );

        navigate("/student/dashboard");
      } else {
        // dispatch(
        //   setAuthUserState({
        //     isAuthenticated: "authenticated",
        //     isInitialized: true,
        //     user: "SD",
        //   })
        // );
        navigate("/student/dashboard-first");
      }
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
      <Seo title="Login Student" metaName="Metaname" metaTags={metaTags}>
        <section className="authSec">
          <div className="container">
            <div className="authblock">
              <div className="authRow">
                <div className="left">
                  <div className="imgBlock">
                    <img src={StudentLoginImg} alt="" />
                  </div>
                  <div className="becomeBlock">
                    <img src={BecomeInstructorImg} alt="" />
                    <h4>Become an Instructor</h4>
                    <p className="subTextOne">
                      Sign up to join a vast community of instructors and
                      students waiting to share experiences and opportunities!
                    </p>
                    <Link to={"/instructor/signup"}>Sign Up</Link>
                  </div>
                </div>
                <div className="right">
                  <form onSubmit={handelSubmit}>
                    <div className="formContent">
                      <h4>Sign In</h4>
                      <p className="subTextOne">
                        Sign in to join a vast community of instructors and
                        students waiting to share experiences and opportunities!
                      </p>
                      <div className="imgBlock">
                        <img src={StudentLoginImg} alt="" />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12">
                        <div className="formGroup">
                          <label className="formlabel">Email</label>
                          <input
                            type="text"
                            className={`form-control ${formData.emailErr ? "errField" : ""
                              }`}
                            placeholder="youremail@guru.com"
                            name="email"
                            value={formData.email}
                            onChange={(_event) => {
                              handelChange(_event);
                            }}
                            autoComplete="off"
                          />
                          <p className="errorMsg">{formData?.emailErrMsg}</p>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="formGroup">
                          <label className="formlabel">Password</label>
                          <div className="inputGroup positionRight">
                            <input
                              type={passwordView ? "text" : "password"}
                              className={`form-control ${formData.passwordErr ? "errField" : ""
                                }`}
                              placeholder="Enter your pssword"
                              value={formData.password}
                              name="password"
                              onChange={(_event) => {
                                handelChange(_event);
                              }}
                              onPaste={(e) => {
                                e.preventDefault()
                                return false;
                              }} onCopy={(e) => {
                                e.preventDefault()
                                return false;
                              }} />
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
                            <p className="errorMsg">
                              {formData?.passwordErrMsg}
                            </p>
                          </div>
                        </div>
                      </div>
                      {/* <div className="col-12">
                        <div className="formGroup">
                          <div className="lightforthCheckbox">
                            <div className="mainCheck">
                              <input type="checkbox" />
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
                              <a href="#">Terms of Service</a> and{" "}
                              <a href="#">Privacy Policy</a>
                            </label>
                          </div>
                        </div>
                      </div> */}
                      <div className="col-12">
                        <div className="submitDiv">
                          <button
                            className="primaryBtn fullWidth"
                            disabled={isLoading}
                          >
                            Sign In
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
                    <div className="formInfo">
                      <p className="subTextOne fontWeight-500">
                        Don’t have an account?{" "}
                        <Link
                          to="/student/signup"
                          className="subTextOne fontWeight-700 colorOrange underline hoverLink"
                        >
                          Sign Up
                        </Link>
                      </p>
                      <p className="subTextOne">
                        <Link
                          to="/student/forgot-password"
                          className="subTextOne fontWeight-700 colorOrange underline hoverLink"
                        >
                          Forgot Password?
                        </Link>
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Seo>
    </GuestGuard>
  );
}

Component.displayName = "StudentLogin";
