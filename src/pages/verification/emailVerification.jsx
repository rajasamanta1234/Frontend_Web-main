import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ZodError } from "zod";
import { Link } from "react-router-dom";
import Navbar from "../../components/main/navbar";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

import { forgotPassword } from "@/validation/instructor/auth";
import { handelError } from "@/helpers/common";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

import { toast } from "react-toastify";

import {
  useResendVerificationMutation,
  useVerificationMailMutation,
} from "../../redux/api/others";
import { Grid } from "@mui/material";

export function Component() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");
  const role = queryParams.get("role");

  const [doVerify, { isSuccess, data, isError, error }] =
    useVerificationMailMutation();

  const [
    doResendVerification,
    {
      isSuccess: isResendSuccess,
      isError: isErrorResend,
      data: resendData,
      error: resendError,
    },
  ] = useResendVerificationMutation();

  const [resend, setresend] = useState(false);

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
    doResendVerification({ email: formData?.email, role: role });
  };

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (token) {
      // Do something with the token, for example, store it in state or dispatch an action
      // console.log("Token:", token);
      doVerify({ token });
    }
  }, []);

  useEffect(() => {
    if (isSuccess && data) {
      toast.success(data.message);
      if (data.data.role === "STUDENT") {
        navigate("/student/login");
      } else if (data.data.role === "INSTRUCTOR") {
        localStorage.setItem("token", data?.data?.token);
        navigate("/instructor/login");
      }
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (isError && error) {
      toast.error(error.data.message);
      if (error?.data?.message == "User not found") {
        navigate("/");
      }
      if (error?.data?.message == "Already verified") {
        if (role === "STUDENT") {
          navigate("/student/login");
        } else if (role === "INSTRUCTOR") {
          navigate("/instructor/login");
        }
      }
      if (error?.data?.isExpired) {
        setresend(true);
      }
    }
  }, [isError, error]);

  useEffect(() => {
    if (isResendSuccess && resendData) {
      toast.success(resendData.message);
      handleClose();
      setFormData({
        email: "",
        emailErr: false,
        emailErrMsg: "",
      });
    }
  }, [isResendSuccess, resendData]);

  useEffect(() => {
    if (isErrorResend && resendError) {
      toast.error(resendError?.data?.message);
      setFormData({
        email: "",
        emailErr: false,
        emailErrMsg: "",
      });
    }
  }, [isErrorResend, resendError]);

  return (
    <>
      {resend && (
        <>
          <Navbar />
          <div className="container">
            <div className="resetpasssucss">
              <div className="resetpasssucssInner">
                <div className="contentBlock">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    enableBackground="new 0 0 47.5 47.5"
                    viewBox="0 0 47.5 47.5"
                    id="warning"
                    width="50" // Set the width to a smaller value
                    height="50"
                  >
                    <defs>
                      <clipPath id="a">
                        <path d="M0 38h38V0H0v38Z"></path>
                      </clipPath>
                    </defs>
                    <g
                      clipPath="url(#a)"
                      transform="matrix(1.25 0 0 -1.25 0 47.5)"
                    >
                      <path
                        fill="#ffcc4d"
                        d="M0 0c-1.842 0-2.654 1.338-1.806 2.973l15.609 30.055c.848 1.635 2.238 1.635 3.087 0L32.499 2.973C33.349 1.338 32.536 0 30.693 0H0Z"
                        transform="translate(3.653 2)"
                      ></path>
                      <path
                        fill="#231f20"
                        d="M0 0c0 1.302.961 2.108 2.232 2.108 1.241 0 2.233-.837 2.233-2.108v-11.938c0-1.271-.992-2.108-2.233-2.108-1.271 0-2.232.807-2.232 2.108V0Zm-.187-18.293a2.422 2.422 0 0 0 2.419 2.418 2.422 2.422 0 0 0 2.419-2.418 2.422 2.422 0 0 0-2.419-2.419 2.422 2.422 0 0 0-2.419 2.419"
                        transform="translate(16.769 26.34)"
                      ></path>
                    </g>
                  </svg>
                  <p className="mainText">
                    Your previous verification link is expired, further proceed
                    please click the button
                  </p>
                </div>
                <div>
                  <button onClick={handleClickOpen} className="primaryBtn">
                    Resend Verification
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        fullWidth
        maxWidth="xs"
      >
        {/* <DialogTitle>{"Use Google's location service?"}</DialogTitle> */}
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <label className="formlabel">Email</label>
            <input
              type="email"
              className={`form-control ${formData.emailErr ? "errField" : ""}`}
              placeholder="Enter your mail id"
              name="email"
              value={formData?.email}
              onChange={(_event) => {
                handelChange(_event);
              }}
            />
            <p className="errorMsg">{formData?.emailErrMsg}</p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button onClick={handleClose} className="outlineBtn">
            Cancel
          </button>
          <button onClick={handelSubmit} className="primaryBtn">
            Send
          </button>
        </DialogActions>
      </Dialog>
    </>
  );
}

Component.displayName = "EmailVerification";
