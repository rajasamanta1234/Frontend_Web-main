import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ZodError } from "zod";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

import { GuestGuard } from "../../../guards/instructor/guest-guard";
import Seo from "@/components/common/seo";
import { loginValidate } from "@/validation/instructor/auth";
import { handelError } from "@/helpers/common";
import { setAuthUserState } from "../../../redux/slice/instructor/user";

import FacebookLogin from "../../../components/loginButtons/facebook";
import GoogleLogin from "../../../components/loginButtons/google";
import LinkdinLogin from "../../../components/loginButtons/linkdin";

import InstaLoginImg from "@/assets/images/ins-signin.png";
import BecomeInstructorImg from "@/assets/images/become-Instructor.png";

import eyeClose from "@/assets/images/eye-close.svg";
import eyeOpen from "@/assets/images/eye.svg";
import {
  useLoginInstructorMutation,
  useFacebookLoginInstructorMutation,
  useGoogleLoginInstructorMutation,
  useLinkedinLoginInstructorMutation,
} from "../../../redux/api/instructor/auth";

const metaTags = [
  { name: "Metaname1", content: "content1" },
  { name: "Metaname2", content: "content2" },
];
export function Component() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [doLogin, { isLoading, isSuccess, isError, data, error }] =
    useLoginInstructorMutation();
  const [fbLogin, { isError: fbIsError, error: fbError }] =
    useFacebookLoginInstructorMutation();
  const [googleLogin, { isError: googleIsError, error: googleError }] =
    useGoogleLoginInstructorMutation();
  const [linkedinLogin, { isError: linkedinIsError, error: linkedinError }] =
    useLinkedinLoginInstructorMutation();
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
      loginValidate.parse(formData);
    } catch (error) {
      if (error instanceof ZodError) {
        handelError(error, setFormData);
      }
      return;
    }
    doLogin({ email: formData.email.trim(), password: formData.password });
  };

  useEffect(() => {
    if (isSuccess && data?.data?.token) {
      localStorage.setItem("token", data?.data?.token);

      if (data?.data?.step == 1) {
        navigate("/instructor/signup-step-two");
      } else if (data?.data?.step == 2) {
        navigate("/instructor/signup-step-three");
      } else if (data?.data?.step == 3) {
        navigate("/instructor/signup-step-four");
      } else if (data?.data?.step == 4 && data?.data?.isApproved == "PENDING") {
        navigate(`/instructor/signup-success?fullName=${data?.data?.fullName}`);
      } else if (
        data?.data?.step == 4 &&
        data?.data?.isApproved == "APPROVED"
      ) {
        dispatch(
          setAuthUserState({
            isAuthenticated: "authenticated",
            isInitialized: true,
            user: "SD",
          })
        );
        navigate("/instructor/dashboard");
      }
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (isError && error) {
      toast.error(error?.data?.message);
    }
  }, [isError, error]);
  useEffect(() => {
    if (linkedinIsError && linkedinError) {
      toast.error(linkedinError?.data?.message);
    }
  }, [linkedinIsError, linkedinError]);
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

  return (
    <GuestGuard>
      <Seo title="Login Instructor" metaName="Metaname" metaTags={metaTags}>
        <section className="authSec">
          <div className="container">
            <div className="authblock">
              <div className="authRow instructorAuth">
                <div className="left">
                  <div className="imgBlock">
                    <img src={InstaLoginImg} alt="" />
                  </div>
                  <div className="becomeBlock instructorbecomeBlock">
                    <img src={BecomeInstructorImg} alt="" />
                    <p className="subTextOne">
                      Earn while you share your knowledge and experiences.
                    </p>
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
                        <img src={InstaLoginImg} alt="" />
                      </div>
                    </div>
                    <div className="row">
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
                              className={`form-control ${
                                formData.passwordErr ? "errField" : ""
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
                              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14"
                                fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                  d="M11.4711 3.86714C11.7314 4.12749 11.7314 4.5496 11.4711 4.80995L6.13775 10.1433C5.8774 10.4036 5.45529 10.4036 5.19494 10.1433L2.52827 7.47661C2.26792 7.21626 2.26792 6.79415 2.52827 6.5338C2.78862 6.27345 3.21073 6.27345 3.47108 6.5338L5.66634 8.72907L10.5283 3.86714C10.7886 3.60679 11.2107 3.60679 11.4711 3.86714Z"
                                  fill="white" />
                              </svg>
                            </span>
                          </div>
                          <label>
                            I agree to the LightForth <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
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
                          to="/instructor/signup"
                          className="subTextOne fontWeight-700 colorOrange underline hoverLink"
                        >
                          Sign Up
                        </Link>
                      </p>
                      <p className="subTextOne">
                        <Link
                          to="/instructor/forgot-password"
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

Component.displayName = "InstructorLogin";
