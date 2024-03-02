import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

import { GuestGuard } from "../../../guards/student/guest-guard";
import Seo from "@/components/common/seo";

import ForgotPasswordImg from "@/assets/images/forgot-password-img.png";
import OTPInput from "../../../components/common/OtpInput";
import { OutlinedInput } from "@mui/material";
import {
  useForgotPaswwordInstructorMutation,
  useOtpVerifyInstructorMutation,
} from "../../../redux/api/instructor/auth";

const metaTags = [
  { name: "Metaname1", content: "content1" },
  { name: "Metaname2", content: "content2" },
];

export function Component() {
  const navigate = useNavigate();
  // const location = useLocation();
  const urlParams = new URLSearchParams(window.location.search);
  const email = urlParams.get("email");
  const [doOtpVerify, { isLoading, isSuccess, isError, data, error }] =
    useOtpVerifyInstructorMutation();
  const [
    doResendOtp,
    {
      isLoading: otpLoading,
      isSuccess: otpSuccess,
      isError: otpdataError,
      data: otpData,
      error: errorotp,
    },
  ] = useForgotPaswwordInstructorMutation();
  // const searchParams = new URLSearchParams(location.search);
  // const email = searchParams.get("email");

  const [otp, setotp] = useState("");
  const [otpError, setotpError] = useState(false);
  const [otpErrMsg, setotpErrMsg] = useState("");

  const handelSubmit = async () => {
    try {
      if (otp?.length != 5) {
        setotpError(true);
        setotpErrMsg("Invalid OTP");
        return;
      }
      await doOtpVerify({ otp: otp });
    } catch (error) {
      console.log(error);
    }
  };
  const handelResendOtp = async () => {
    try {
      await doResendOtp({
        email: email,
        role: "INSTRUCTOR",
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (isSuccess && data) {
      toast.success(data.message);
      localStorage.setItem("token", data.data.token);
      navigate(`/instructor/reset-password`);
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (isError && error) {
      toast.error(error.data.message);
      setotpError(true);
    }
  }, [isError, error]);
  useEffect(() => {
    if (otpSuccess && otpData) {
      toast.success(otpData.message);
    }
  }, [otpSuccess, otpData]);

  useEffect(() => {
    if (otpdataError && errorotp) {
      toast.error(errorotp.data.message);
    }
  }, [otpdataError, errorotp]);
  return (
    <GuestGuard>
      <Seo title="OTP Verification" metaName="Metaname" metaTags={metaTags}>
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
                      <h4>Enter Verification Code</h4>
                      <p className="subTextOne">
                        Please enter the verification code we sent to your email
                        address
                      </p>
                      <div className="imgBlock">
                        <img src={ForgotPasswordImg} alt="" />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12">
                        <div className="formGroup">
                          <div className="otpFld">
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
                          </div>
                          <p className="errorMsg">{otpErrMsg}</p>
                        </div>
                      </div>
                      <div
                        className="pd-top-10"
                        style={{ paddingBottom: "10px" }}
                      >
                        <p
                          className="subTextOne fontWeight-700 colorOrange underline hoverLink"
                          style={{ cursor: "pointer" }}
                          onClick={handelResendOtp}
                        >
                          Resend Otp
                        </p>
                      </div>
                      <div className="col-12">
                        <div className="submitDiv">
                          <button
                            className="primaryBtn fullWidth"
                            onClick={handelSubmit}
                            type="button"
                            disabled={isLoading}
                          >
                            Verify
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="pd-top-20">
                      <p className="subTextOne fontWeight-500">
                        Remember now?{" "}
                        <Link
                          to="/instructor/login"
                          className="subTextOne fontWeight-700 colorOrange underline hoverLink"
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

Component.displayName = "InstructorOtpVerify";
