import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ZodError } from "zod";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

// import LoadingButton from "@mui/lab/LoadingButton";

import { GuestGuard } from "@/guards/super-admin/guest-guard";
import Seo from "@/components/common/seo";
import { loginValidate } from "@/validation/super-admin/auth";
import { handelError } from "@/helpers/common";
import { useLoginAdminMutation } from "@/redux/api/super-admin/auth";
import { setAuthUserState } from "../../../redux/slice/superAdmin/user";

import securelogin from "@/assets/images/secure-login.png";
import eyeClose from "@/assets/images/eye-close.svg";
import eyeOpen from "@/assets/images/eye.svg";

const metaTags = [
  { name: "Metaname1", content: "content1" },
  { name: "Metaname2", content: "content2" },
];
export function Component() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [doLogin, { isLoading, isSuccess, isError, data, error }] =
    useLoginAdminMutation();

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
    doLogin({ email: formData.email, password: formData.password });
  };

  useEffect(() => {
    if (isSuccess && data) {
      localStorage.setItem("token", data.data.token);
      localStorage.setItem("admintoken", data.data.token);

      dispatch(
        setAuthUserState({
          isAuthenticated: "authenticated",
          isInitialized: true,
          user: "SD",
        })
      );
      navigate("/super-admin/dashboard");
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (isError && error) {
      toast.error(error?.data?.message);
    }
  }, [isError, error]);
  useEffect(() => {
    let token = localStorage.getItem("admintoken");
    if (token) {
      navigate("/super-admin/dashboard");
      // getMe();
    }
  }, []);
  return (
    <GuestGuard>
      <Seo title="Login" metaName="Metaname" metaTags={metaTags}>
        <div className="superAdminContainer">
          <div className="superAdminRow">
            <div className="left">
              <div className="contentBlock">
                <div>
                  <div className="imgBlock">
                    <img src={securelogin} alt="" />
                  </div>
                  <h4>Secure Login</h4>
                  <p className="subTextOne">
                    Login with your credentials. Remember to keep them safe
                    always.
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
                  <h4>Secure Login</h4>
                  <p className="subTextOne">
                    Login with your credentials. Remember to keep them safe
                    always.
                  </p>
                </div>
                <div className="imgBlock">
                  <img src={securelogin} alt="" />
                </div>
              </div>
              <form onSubmit={handelSubmit}>
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
                        value={formData?.email}
                        onChange={(_event) => {
                          handelChange(_event);
                        }}
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
                          placeholder="Enter your password"
                          name="password"
                          value={formData?.password}
                          onChange={(_event) => {
                            handelChange(_event);
                          }}
                          onPaste={(e) => {
                            e.preventDefault();
                            return false;
                          }}
                          onCopy={(e) => {
                            e.preventDefault();
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
                        <p className="errorMsg">{formData?.passwordErrMsg}</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="submitDiv">
                      <button
                        className="primaryBtn fullWidth"
                        disabled={isLoading}
                      >
                        Login
                      </button>
                      {/* <LoadingButton
                        variant="contained"
                        className="primaryBtn"
                        fullWidth
                        disableElevation
                        type="submit"
                        loading={isLoading}
                      >
                        Login
                      </LoadingButton> */}
                    </div>
                  </div>
                  <div className="col-12">
                    <Link
                      to="/super-admin/forgot-password"
                      className="subTextOne fontWeight-700 frgtLinkText colorOrange underline"
                    >
                      Forgot Password?
                    </Link>
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

Component.displayName = "SuperAdminLogin";
