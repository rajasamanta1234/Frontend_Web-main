import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { GuestGuard } from "@/guards/super-admin/guest-guard";
import { useOtpVerifyAdminMutation } from "@/redux/api/super-admin/auth";
import Seo from "@/components/common/seo";
import OTPInput from "../../../components/common/OtpInput";
import VerificationImg from "../../../assets/images/verification.png";
import { useForgotPaswwordAdminMutation } from "@/redux/api/super-admin/auth";

import { OutlinedInput } from "@mui/material";
import moment from "moment";

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
    useOtpVerifyAdminMutation();
  const [
    doResendOtp,
    {
      isLoading: otpLoading,
      isSuccess: otpSuccess,
      isError: otpdataError,
      data: otpData,
      error: errorotp,
    },
  ] = useForgotPaswwordAdminMutation();
  // const searchParams = new URLSearchParams(location.search);
  // const email = searchParams.get("email");

  const [otp, setotp] = useState();
  const [otpError, setotpError] = useState(false);
  const [otpErrMsg, setotpErrMsg] = useState("");

  const handelSubmit = async () => {
    try {
      let getdata = JSON.parse(localStorage.getItem("hitCount"));
      let timeDifference = moment().diff(moment(getdata?.time));
      let timeDifferenceInMinutes = Number(600000 - timeDifference);
      let convertmin = Number(timeDifferenceInMinutes / (1000 * 60)).toFixed();

      if (otp?.length != 5) {
        setotpError(true);
        setotpErrMsg("Invalid OTP");
        return;
      }
      if (getdata?.count >= 3 && timeDifference <= 600000) {
        if (convertmin == 0) {
          toast.error(`Please try after 1 minutes`);
        } else {
          toast.error(`Please try after ${convertmin} minutes`);
        }

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
        role: "ADMIN",
      });
    } catch (error) {
      console.log(error);
    }
  };
  // const handleblockbutton = () => {
  //   let count = JSON.parse(localStorage.getItem("hitCount"))?.count || 0;
  //   count++;
  //   let getdata = JSON.parse(localStorage.getItem("hitCount"));
  //   let timeDifference = moment().diff(moment(getdata?.time));
  //   console.log("getCount", getdata, count);

  //   if (count > 3 || getdata?.count >= 3) {
  //     console.log(timeDifference);
  //     if (getdata?.count == 3 && timeDifference <= 600000) {
  //       toast.error("Please Try after 10 minutes");
  //       return;
  //     }
  //     return;
  //   } else {
  //     let data = {
  //       count: count,
  //       time: moment().format(),
  //     };
  //     localStorage.setItem("hitCount", JSON.stringify(data));
  //   }
  // };

  const handelHitInc = () => {
    let getdata = JSON.parse(localStorage.getItem("hitCount"));
    let timeDifference = moment().diff(moment(getdata?.time));
    if (getdata) {
      console.log("timeDifference", timeDifference);
      if (getdata?.count < 3 && timeDifference <= 600000) {
        const data = {
          count: getdata.count + 1,
          time: getdata.time,
        };
        localStorage.setItem("hitCount", JSON.stringify(data));
      } else if (getdata?.count <= 3 && timeDifference >= 600000) {
        const data = {
          count: 1,
          time: moment().format(),
        };
        localStorage.setItem("hitCount", JSON.stringify(data));
      }
    } else {
      console.log("getdata", getdata);
      const data = {
        count: 1,
        time: moment().format(),
      };
      localStorage.setItem("hitCount", JSON.stringify(data));
    }
  };

  useEffect(() => {
    if (isSuccess && data) {
      toast.success(data.message);
      localStorage.setItem("token", data.data.token);
      localStorage.removeItem("hitCount");
      navigate(`/super-admin/reset-password`);
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (isError && error) {
      toast.error(error.data.message);

      if (error?.data?.message == "Invalid OTP") {
        handelHitInc();
      }
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
      <Seo title="Login" metaName="Metaname" metaTags={metaTags}>
        <div className="superAdminContainer">
          <div className="superAdminRow">
            <div className="left">
              <div className="contentBlock">
                <div>
                  <div className="imgBlock">
                    <img src={VerificationImg} alt="" />
                  </div>
                  <h4>Enter Verification Code</h4>
                  <p className="subTextOne">
                    Please enter the verification code that was sent to your
                    email address
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
                  <h4>Enter Verification Code</h4>
                  <p className="subTextOne">
                    Please enter the verification code that was sent to your
                    email address
                  </p>
                </div>
                <div className="imgBlock">
                  <img src={VerificationImg} alt="" />
                </div>
              </div>
              <form>
                <div className="row">
                  <div className="col-12">
                    <div className="formGroup">
                      <div className="otpFld">
                        {/* <input type="text" className="form-control" placeholder="0" />
                        <input type="text" className="form-control" placeholder="0" />
                        <input type="text" className="form-control" placeholder="0" />
                        <input type="text" className="form-control" placeholder="0" />
                        <input type="text" className="form-control" placeholder="0" /> */}
                        <OTPInput
                          value={otp}
                          numInputs={5}
                          inputType="tel"
                          onChange={(_e) => {
                            // setotp(_e);
                            if (otpError) {
                              setotpError(false);
                              setotpErrMsg("");
                            }
                            // if (resentOtpisSuccess) {
                            // 	resetOtpCall();
                            // }
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
                  <div className="pd-top-10" style={{ paddingBottom: "10px" }}>
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
