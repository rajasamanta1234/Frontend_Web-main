import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ZodError } from "zod";
import { toast } from "react-toastify";

import { forgotPassword } from "@/validation/super-admin/auth";
import { handelError } from "@/helpers/common";
import { useForgotPaswwordAdminMutation } from "@/redux/api/super-admin/auth";

import { GuestGuard } from "@/guards/super-admin/guest-guard";
import Seo from "@/components/common/seo";
import Forgotpassword from "../../../assets/images/forgot-password.png";

const metaTags = [
  { name: "Metaname1", content: "content1" },
  { name: "Metaname2", content: "content2" },
];
export function Component() {
  const navigate = useNavigate();

  const [doForgotpassword, { isLoading, isSuccess, isError, data, error }] =
    useForgotPaswwordAdminMutation();

  const [formData, setFormData] = useState({
    email: "",
    emailErr: false,
    emailErrMsg: "",
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
      forgotPassword.parse(formData);
    } catch (error) {
      if (error instanceof ZodError) {
        handelError(error, setFormData);
      }
      return;
    }
    doForgotpassword({
      email: formData.email,
      password: formData.password,
      role: "ADMIN",
    });
  };

  useEffect(() => {
    if (isSuccess && data) {
      toast.success(data?.message);
      localStorage.setItem("token", data.data.token);
      navigate(`/super-admin/otp-verify?email=${formData.email}`);
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
                  <h4>Forgot Password?</h4>
                  <p className="subTextOne">
                    You will get an email to reset your password
                  </p>
                </div>
                <div>
                  <p className="subTextOne">LightForth V1.0</p>
                </div>
              </div>
            </div>
            <div className="right">
              <div className="superAdminmobileContent">
                <div className="contentBlock">
                  <h4>Forgot Password?</h4>
                  <p className="subTextOne">
                    You will get an email to reset your password
                  </p>
                </div>
                <div className="imgBlock">
                  <img src={Forgotpassword} alt="" />
                </div>
              </div>
              <form>
                <div className="row">
                  <div className="col-12">
                    <div className="formGroup">
                      <label className="formlabel">Email</label>
                      <input
                        type="email"
                        className={`form-control ${
                          formData.emailErr ? "errField" : ""
                        }`}
                        placeholder="Enter Email"
                        name="email"
                        value={formData?.email}
                        onChange={(_event) => {
                          handelChange(_event);
                        }}
                      />
                      <p className="errorMsg">{formData?.emailErrMsg}</p>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="submitDiv">
                      <button
                        className="primaryBtn fullWidth"
                        onClick={handelSubmit}
                        disabled={isLoading}
                      >
                        Reset Password
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
