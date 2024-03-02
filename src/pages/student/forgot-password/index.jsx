import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ZodError } from "zod";
import { toast } from "react-toastify";

import { GuestGuard } from "../../../guards/student/guest-guard";
import Seo from "@/components/common/seo";
import { forgotPassword } from "@/validation/student/auth";
import { handelError } from "@/helpers/common";
import { useForgotPaswwordStudentMutation } from "@/redux/api/student/auth";

import ForgotPasswordImg from "@/assets/images/forgot-password-img.png";

const metaTags = [
  { name: "Metaname1", content: "content1" },
  { name: "Metaname2", content: "content2" },
];

export function Component() {
  const navigate = useNavigate();

  const [doForgotpassword, { isLoading, isSuccess, isError, data, error }] =
    useForgotPaswwordStudentMutation();

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
      role: "STUDENT",
    });
  };

  useEffect(() => {
    if (isSuccess && data) {
      toast.success(data?.message);
      localStorage.setItem("token", data.data.token);
      navigate(`/student/otp-verify?email=${formData.email}`);
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (isError && error) {
      toast.error(error?.data?.message);
    }
  }, [isError, error]);
  return (
    <GuestGuard>
      <Seo title="Forgot Password" metaName="Metaname" metaTags={metaTags}>
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
                      <h4>Forgot Password?</h4>
                      <p className="subTextOne">
                        We will send you an email to reset your password
                      </p>
                      <div className="imgBlock">
                        <img src={ForgotPasswordImg} alt="" />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12">
                        <div className="formGroup">
                          <label className="formlabel">Email</label>
                          <input
                            type="email"
                            className="form-control"
                            placeholder="Enter your mail id"
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
                    </div>
                    <div className="pd-top-20">
                      <p className="subTextOne fontWeight-500">
                        Remember now?{" "}
                        <Link
                          to="/student/login"
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

Component.displayName = "StudentForgotPassword";
