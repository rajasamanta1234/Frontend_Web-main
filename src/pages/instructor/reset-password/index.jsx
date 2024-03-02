import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ZodError } from "zod";
import { toast } from "react-toastify";

import { GuestGuard } from "../../../guards/instructor/guest-guard";
import Seo from "@/components/common/seo";
import { resetPassword } from "@/validation/instructor/auth";
import { handelError } from "@/helpers/common";

import ForgotPasswordImg from "@/assets/images/forgot-password-img.png";
import { resetPasswordTwo } from "../../../validation/instructor/auth";
import { useResetPasswordInstructorMutation } from "../../../redux/api/instructor/auth";

import eyeClose from "@/assets/images/eye-close.svg";
import eyeOpen from "@/assets/images/eye.svg";

const metaTags = [
  { name: "Metaname1", content: "content1" },
  { name: "Metaname2", content: "content2" },
];

export function Component() {
  const navigate = useNavigate();
  // const location = useLocation();
  // const searchParams = new URLSearchParams(location.search);
  // const email = searchParams.get("email");
  // const otp = searchParams.get("otp");

  const [doResetPassword, { isLoading, isSuccess, isError, data, error }] =
    useResetPasswordInstructorMutation();
  const [passwordView, setpasswordView] = useState(false);
  const [confirmPasswordView, setconfirmPasswordView] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    passwordErr: false,
    passwordErrMsg: "",
    confirmPassword: "",
    confirmPasswordErr: false,
    confirmPasswordErrMsg: "",
  });

  const handelChange = (_event) => {
    setFormData((_prevState) => ({
      ..._prevState,
      [_event.target.name]: _event.target.value,
      [`${_event.target.name}Err`]: false,
      [`${_event.target.name}ErrMsg`]: "",
    }));
  };

  const handelSubmit = async () => {
    try {
      if (!formData.password.trim() || !formData.confirmPassword.trim()) {
        resetPasswordTwo.parse(formData);
      } else {
        resetPassword.parse(formData);
      }
    } catch (error) {
      if (error instanceof ZodError) {
        handelError(error, setFormData);
      }
      return;
    }
    doResetPassword({ password: formData.password });
  };

  useEffect(() => {
    if (isSuccess && data) {
      localStorage.removeItem("token");
      toast.success(data.message);

      navigate(
        `/instructor/reset-password-success?fullName=${data?.data?.fullName}`
      );
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (isError && error) {
      toast.error(error?.data?.message);
    }
  }, [isError, error]);
  return (
    <GuestGuard>
      <Seo title="Reset Password" metaName="Metaname" metaTags={metaTags}>
        <section className="authSec">
          <div className="container">
            <div className="authblock">
              <div className="authRow">
                <div className="left">
                  <div className="imgBlock">
                    <img src={ForgotPasswordImg} alt="" />
                  </div>
                </div>
                <div className="right">
                  <form>
                    <div className="formContent">
                      <h4>Set New Password</h4>
                      <p className="subTextOne">Create a new password</p>
                      <div className="imgBlock">
                        <img src={ForgotPasswordImg} alt="" />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12">
                        <div className="formGroup">
                          <label className="formlabel">New Password</label>
                          <div className="inputGroup positionRight">
                            <input
                              type={passwordView ? "text" : "password"}
                              className={`form-control ${formData.passwordErr ? "errField" : ""
                                }`}
                              placeholder="Enter password"
                              name="password"
                              value={formData?.password}
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
                            <p className="errorMsg">
                              {formData?.passwordErrMsg}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="formGroup">
                          <label className="formlabel">
                            Confirm New Password
                          </label>
                          <div className="inputGroup positionRight">
                            <input
                              type={confirmPasswordView ? "text" : "password"}
                              className={`form-control ${formData.confirmPasswordErr ? "errField" : ""
                                }`}
                              placeholder="Enter password"
                              name="confirmPassword"
                              value={formData?.confirmPassword}
                              onChange={(_event) => {
                                handelChange(_event);
                              }}
                            />
                            <button
                              type="button"
                              className="inputGroupRight"
                              onClick={() => {
                                setconfirmPasswordView(!confirmPasswordView);
                              }}
                            >
                              <img
                                src={confirmPasswordView ? eyeOpen : eyeClose}
                                alt="eye-close"
                              />
                            </button>
                            <p className="errorMsg">
                              {formData?.confirmPasswordErrMsg}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="submitDiv">
                          <button
                            className="primaryBtn fullWidth"
                            onClick={handelSubmit}
                            type="button"
                            disabled={isLoading}
                          >
                            Save Password
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="pd-top-20">
                      <p className="subTextOne fontWeight-500">
                        Remember now?{" "}
                        <Link
                          to="/instructor/login"
                          className="subTextOne fontWeight-700 colorOrange underline"
                        >
                          Login
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

Component.displayName = "InstructorResetPassword";
