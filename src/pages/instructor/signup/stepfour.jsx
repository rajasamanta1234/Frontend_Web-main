import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ZodError } from "zod";
import { toast } from "react-toastify";
import AWS from "aws-sdk";

import { GuestGuard } from "../../../guards/student/guest-guard";
import Seo from "@/components/common/seo";
import { handelError } from "@/helpers/common";

import { summaryformvalidate } from "../../../validation/instructor/auth";
import {
  useGetSpecializationMutation,
  useSummaryformMutation,
} from "../../../redux/api/instructor/auth";

import InstructorSignupImg from "@/assets/images/instructor-signup.png";
import BecomeInstructorImg from "@/assets/images/become-Instructor.png";
import uploadIcon from "@/assets/images/upload.svg";
import { Hourglass } from "react-loader-spinner";

const metaTags = [
  { name: "Metaname1", content: "content1" },
  { name: "Metaname2", content: "content2" },
];

export function Component() {
  const navigate = useNavigate();
  const fileInputRef = useRef();
  // eslint-disable-next-line no-unused-vars
  const [doSubmitGoveid, { isLoading, isSuccess, isError, data, error }] =
    useSummaryformMutation();
  const [
    getSpecialization,
    {
      isLoading: specializationLoading,
      isSuccess: specializationSuccess,
      data: specializationData,
    },
  ] = useGetSpecializationMutation();
  const [disableImg, setDisableImg] = useState(false);
  const [specialization, setSpecialization] = useState([]);
  const [formData, setFormData] = useState({
    specialization: "",
    specializationErr: false,
    specializationErrMsg: "",
    profilePicture: "",
    profilePictureErr: false,
    profilePictureErrMsg: "",
    summary: "",
    summaryErr: false,
    summaryErrMsg: "",
  });

  const handelChange = (_event) => {
    if (_event.target.name === "summary") {
      if (_event.target.value.length < 500) {
        setFormData((_prevState) => ({
          ..._prevState,
          [_event.target.name]: _event.target.value,
          [`${_event.target.name}Err`]: false,
          [`${_event.target.name}ErrMsg`]: "",
        }));
        return;
      } else if (_event.target.value.length > 500) {
        setFormData((_prevState) => ({
          ..._prevState,
          [_event.target.name]: formData?.summary,
          [`${_event.target.name}Err`]: true,
          [`${_event.target.name}ErrMsg`]: "Maximum 500 characters are allowed",
        }));
        return;
      }
    }
    setFormData((_prevState) => ({
      ..._prevState,
      [_event.target.name]: _event.target.value,
      [`${_event.target.name}Err`]: false,
      [`${_event.target.name}ErrMsg`]: "",
    }));
  };
  useEffect(() => {
    getSpecialization();
  }, []);
  useEffect(() => {
    if (specializationSuccess && specializationData) {
      setSpecialization(specializationData?.data);
    }
  }, [specializationSuccess, specializationData]);
  function getOriginalname(data) {
    //console.log("image///", data);
    let arr = data?.split("/");
    let lent = Number(arr.length - 1);
    console.log(arr[lent]);
    return arr[lent];
  }

  const handleFileUpload = async (file) => {
    const maxFileSizeMB = 2;

    // Check file type
    if (
      !file.type.includes("jpg") &&
      !file.type.includes("png") &&
      !file.type.includes("jpeg")
    ) {
      console.error("Only image format  can be uploaded");
      toast.error("Only image format  can be uploaded");
      fileInputRef.current.value = null;
      return;
    }

    // Check file size
    if (file.size > maxFileSizeMB * 1024 * 1024) {
      console.error("Uploading file can not be more than 2 MB");
      toast.error("Uploading file can not be more than 2 MB");
      fileInputRef.current.value = null;
      return;
    }

    setDisableImg(true);
    const s3 = new AWS.S3({
      accessKeyId: import.meta.env.VITE_S3_BUCKET_ACCESS_KEY,
      secretAccessKey: import.meta.env.VITE_S3_BUCKET_SECRET_KEY,
      region: "us-east-1",
    });

    const params = {
      Bucket: "lightfourthbucket",
      Key: `uploads/${file.name}`,
      Body: file,
      // ACL: 'public-read',
    };

    try {
      const response = await s3.upload(params).promise();
      console.log("File uploaded successfully:", response);
      let fileName = getOriginalname(response.Location);

      console.log(fileName, "fileName");
      // setFormData((prev) => {
      //   let data = { ...prev };
      //   data.profilePicture = fileName;
      //   data.profilePictureErr = true;
      //   data.profilePictureErrMsg = "";
      //   return data;
      // });

      setFormData((prevData) => ({
        ...prevData,
        profilePicture: response.Location,
        profilePictureErr: true,
        profilePictureErrMsg: "",
      }));
      setDisableImg(false);
    } catch (error) {
      console.error("Error uploading file:", error);
      setDisableImg(false);
    }
  };

  const handleuploadImg = (file) => {
    // console.log(file)
    if (file) {
      handleFileUpload(file);
    }
  };
  const handelSubmit = async (_e) => {
    _e.preventDefault();
    try {
      summaryformvalidate.parse(formData);
    } catch (error) {
      console.log(error);
      if (error instanceof ZodError) {
        handelError(error, setFormData);
      }
      return;
    }
    doSubmitGoveid({
      specialization: formData?.specialization,
      profilePicture: formData?.profilePicture,
      summary: formData?.summary,
    });
  };

  useEffect(() => {
    if (isSuccess && data) {
      console.log("data", data);
      navigate(`/instructor/signup-success?fullName=${data?.data?.fullName}`);
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (isError && error) {
      toast.error(error?.data?.message);
    }
  }, [isError, error]);
  return (
    <GuestGuard>
      <Seo title="signup step four" metaName="Metaname" metaTags={metaTags}>
        <section className="authSec">
          <div className="container">
            <div className="authblock">
              <div className="authRow instructorAuth">
                <div className="left">
                  <div className="imgBlock">
                    <img src={InstructorSignupImg} alt="" />
                  </div>
                  <div className="becomeBlock instructorbecomeBlock">
                    <img src={BecomeInstructorImg} alt="" />
                    <p className="subTextOne">
                      Earn while you share your knowledge and experiences.
                    </p>
                  </div>
                </div>
                <div className="right">
                  <div className="customStaper">
                    <div className="staperLine">
                      <button></button>
                      <button></button>
                      <button></button>
                      <button className="active"></button>
                    </div>
                    <div className="staperMain">
                      <form onSubmit={handelSubmit}>
                        {/* Strat Step four */}

                        <div id="step-four" className="staper show">
                          <div className="formContent">
                            <h4>Summary</h4>
                            <p className="subTextOne">
                              Tell us a bit about yourself and your primary area
                              of tutelage.
                            </p>
                          </div>
                          <div className="row">
                            <div className="col-12">
                              <div className="formGroup">
                                <label className="formlabel">
                                  Select primary area of specialization
                                </label>
                                <div className="selectBlock">
                                  <select
                                    className="form-control"
                                    name="specialization"
                                    value={formData?.specialization}
                                    onChange={(_event) => {
                                      handelChange(_event);
                                    }}
                                  >
                                    <option value={""}>
                                      ---Select Specialization---
                                    </option>

                                    {specialization?.map((it, ind) => {
                                      return (
                                        <option
                                          value={it?.specializationName}
                                          key={ind}
                                        >
                                          {it?.specializationName}
                                        </option>
                                      );
                                    })}
                                  </select>
                                </div>
                                <p className="errorMsg">
                                  {formData?.specializationErrMsg}
                                </p>
                              </div>
                            </div>
                            <div className="col-12">
                              <div className="formGroup">
                                <label className="formlabel">
                                  Upload a picture of yourself{" "}
                                  <strong>(2mb max)</strong>
                                </label>
                                <div className="fileUploadOne">
                                  <div className="fileName">
                                    <p className="subTextOne">
                                      {getOriginalname(
                                        formData?.profilePicture
                                      )}
                                    </p>
                                    {formData?.profilePicture && (
                                      <button
                                        type="button"
                                        onClick={() => {
                                          // setFormData((prev) => ({
                                          //   let data = { ...prev };
                                          //   data.profilePicture = "";
                                          //   data.profilePictureErr = false;
                                          //   data.profilePictureErrMsg =
                                          //     "Profile picture is required";
                                          //   return JSON.parse(
                                          //     JSON.stringify(data)
                                          //   );
                                          // }));
                                          setFormData((prevData) => ({
                                            ...prevData,
                                            profilePicture: "",
                                            profilePictureErr: false,
                                            profilePictureErrMsg: "",
                                          }));
                                          fileInputRef.current.value = null;
                                        }}
                                      >
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="12"
                                          height="12"
                                          viewBox="0 0 12 12"
                                          fill="none"
                                        >
                                          <path
                                            fillRule="evenodd"
                                            clipPath="evenodd"
                                            d="M2.57613 2.57417C2.81044 2.33986 3.19034 2.33986 3.42465 2.57417L6.00039 5.14991L8.57613 2.57417C8.81044 2.33986 9.19034 2.33986 9.42465 2.57417C9.65897 2.80849 9.65897 3.18839 9.42465 3.4227L6.84892 5.99844L9.42465 8.57417C9.65897 8.80849 9.65897 9.18839 9.42465 9.4227C9.19034 9.65702 8.81044 9.65702 8.57613 9.4227L6.00039 6.84697L3.42465 9.4227C3.19034 9.65702 2.81044 9.65702 2.57613 9.4227C2.34181 9.18839 2.34181 8.80849 2.57613 8.57417L5.15186 5.99844L2.57613 3.4227C2.34181 3.18839 2.34181 2.80849 2.57613 2.57417Z"
                                            fill="#AFBDCA"
                                          />
                                        </svg>
                                      </button>
                                    )}
                                  </div>
                                  <div className="fileUpload">
                                    <input
                                      disabled={disableImg}
                                      type="file"
                                      accept=".jpg,.png,.jpeg"
                                      ref={fileInputRef}
                                      name="profilepic"
                                      onChange={(val) =>
                                        handleuploadImg(val.target.files[0])
                                      }
                                    />
                                    {disableImg ? (
                                      <Hourglass
                                        visible={true}
                                        height="30"
                                        width="30"
                                        ariaLabel="hourglass-loading"
                                        wrapperStyle={{}}
                                        wrapperClass=""
                                        colors={["#581959", "#581959"]}
                                      />
                                    ) : (
                                      <button>
                                        Choose <img src={uploadIcon} />
                                      </button>
                                    )}
                                  </div>
                                </div>
                                <p className="errorMsg">
                                  {formData?.profilePictureErrMsg}
                                </p>
                              </div>
                            </div>

                            <div className="col-12">
                              <div className="formGroup">
                                <label className="formlabel">
                                  Brief summary about yourself
                                </label>
                                <textarea
                                  className="form-control"
                                  name="summary"
                                  value={formData?.summary}
                                  onChange={(_event) => {
                                    handelChange(_event);
                                  }}
                                ></textarea>
                                <p className="errorMsg">
                                  {formData?.summaryErrMsg}
                                </p>
                              </div>
                            </div>
                            <div className="col-12">
                              <div className="staperBtnDiv">
                                {/* <button className="circleBtn">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="32"
                                    height="32"
                                    viewBox="0 0 32 32"
                                    fill="none"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      clipRule="evenodd"
                                      d="M15.5318 23.5314C14.9069 24.1562 13.8939 24.1562 13.269 23.5314L6.86902 17.1314C6.24418 16.5065 6.24418 15.4935 6.86902 14.8686L13.269 8.46863C13.8939 7.84379 14.9069 7.84379 15.5318 8.46863C16.1566 9.09347 16.1566 10.1065 15.5318 10.7314L11.8631 14.4L24.0004 14.4C24.884 14.4 25.6004 15.1163 25.6004 16C25.6004 16.8837 24.884 17.6 24.0004 17.6H11.8631L15.5318 21.2686C16.1566 21.8935 16.1566 22.9065 15.5318 23.5314Z"
                                      fill="#C4D2DF"
                                    />
                                  </svg>
                                </button> */}
                                <button className="primaryBtn">Submit</button>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* End Step four */}
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Seo>
    </GuestGuard>
  );
}

Component.displayName = "InstructorSignupStepFour";
