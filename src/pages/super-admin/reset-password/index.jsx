import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ZodError } from "zod";
import { toast } from "react-toastify";

import { resetPassword } from "@/validation/super-admin/auth";
import { handelError } from "@/helpers/common";
import { useResetPasswordAdminMutation } from "@/redux/api/super-admin/auth";
import { GuestGuard } from "@/guards/super-admin/guest-guard";
import Seo from "@/components/common/seo";
import Forgotpassword from "../../../assets/images/forgot-password.png";
import { resetPasswordTwo } from "../../../validation/super-admin/auth";
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
    useResetPasswordAdminMutation();

  const [formData, setFormData] = useState({
    password: "",
    passwordErr: false,
    passwordErrMsg: "",
    confirmPassword: "",
    confirmPasswordErr: false,
    confirmPasswordErrMsg: "",
  });
  const [passwordView, setpasswordView] = useState(false);
  const [confirmPasswordView, setconfirmPasswordView] = useState(false);

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

      navigate("/super-admin/login");
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (isError && error) {
      toast.error(error?.data?.message);
    }
  }, [isError, error]);

  return (
    <GuestGuard>
      <Seo title="Login" metaName="Metaname" metaTags={metaTags}>
        <div className="superAdminContainer">
          <div className="superAdminRow">
            <div className="left">
              <div className="contentBlock">
                <div>
                  <div className="imgBlock">
                    <img src={Forgotpassword} alt="" />
                  </div>
                  <h4>Set New Password</h4>
                  <p className="subTextOne">Create a new password</p>
                </div>
                <div>
                  <p className="subTextOne">LightForth V1.0</p>
                </div>
              </div>
            </div>
            <div className="right">
              <div className="superAdminmobileContent">
                <div className="contentBlock">
                  <h4>Set New Password</h4>
                  <p className="subTextOne">Create a new password</p>
                </div>
                <div className="imgBlock">
                  <img src={Forgotpassword} alt="" />
                </div>
              </div>
              <form>
                <div className="row">
                  <div className="col-12">
                    <div className="formGroup">
                      <label className="formlabel">New Password</label>
                      <div className="inputGroup positionRight">
                        <input
                          type={passwordView ? "text" : "password"}
                          className={`form-control ${
                            formData.passwordErr ? "errField" : ""
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
                        <p className="errorMsg">{formData?.passwordErrMsg}</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="formGroup">
                      <label className="formlabel">Confirm New Password</label>
                      <div className="inputGroup positionRight">
                        <input
                          type={confirmPasswordView ? "text" : "password"}
                          className={`form-control ${
                            formData.confirmPasswordErr ? "errField" : ""
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
                  <div className="col-12">
                    <p className="subTextOne fontWeight-500">
                      Remember now?{" "}
                      <Link
                        to="/super-admin/login"
                        className="subTextOne fontWeight-700 colorOrange underline"
                      >
                        Login
                      </Link>
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="superAdminMobileFooter">
            <p className="subTextOne">LightForth V1.0</p>
          </div>
        </div>
      </Seo>
    </GuestGuard>
  );
}

Component.displayName = "SuperAdminForgotPassword";
