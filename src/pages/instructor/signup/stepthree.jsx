import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ZodError } from "zod";
import { toast } from "react-toastify";
import AWS from "aws-sdk";

import { GuestGuard } from "../../../guards/student/guest-guard";
import Seo from "@/components/common/seo";
import { handelError } from "@/helpers/common";

import { govtidformvalidate } from "../../../validation/instructor/auth";

import InstructorSignupImg from "@/assets/images/instructor-signup.png";
import BecomeInstructorImg from "@/assets/images/become-Instructor.png";
import { useGovtidformMutation } from "../../../redux/api/instructor/auth";
import { Grid, LinearProgress } from "@mui/material";
import { v4 as uuidv4 } from "uuid";

const metaTags = [
  { name: "Metaname1", content: "content1" },
  { name: "Metaname2", content: "content2" },
];

export function Component() {
  const navigate = useNavigate();
  const idRef = useRef();
  const [doSubmitGoveid, { isLoading, isSuccess, isError, data, error }] =
    useGovtidformMutation();
  const [formData, setFormData] = useState({
    identityType: "",
    identityTypeErr: false,
    identityTypeErrMsg: "",
    identityNumber: "",
    identityNumberErr: false,
    identityNumberErrMsg: "",
  });
  const [idLink, setIdLink] = useState([]);
  const [idLinkErrMsg, setIdLinkErr] = useState("");
  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    handlemultiFileUpload(files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handelChange = (_event) => {
    setFormData((_prevState) => ({
      ..._prevState,
      [_event.target.name]: _event.target.value,
      [`${_event.target.name}Err`]: false,
      [`${_event.target.name}ErrMsg`]: "",
    }));
  };
  const handlemultiFileUpload = async (files) => {
    if (files.length > 0) {
      const maxSize = 20 * 1024 * 1024; // 20 MB

      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        // Check file size
        if (file.size > maxSize) {
          toast.error(`Uploading file can not be more than 20 MB`);
          idRef.current.value = null;
          return;
        }

        // Check file type
        if (!file.type.includes("pdf")) {
          toast.error(`Only PDF files are allowed `);
          idRef.current.value = null;
          return;
        }
      }
    }

    let Arr = [];

    Array.from(files)?.forEach((element) => {
      if (element) {
        let updated = {
          id: uuidv4(),
          file: element,
          progress: 0,
          imgName: element.name,
          imgsize: element.size,
        };
        Arr.push(updated);
      }
    });

    setIdLink((_prevState) => {
      const updatedState = [..._prevState, ...Arr];

      handelCheck(updatedState);

      return updatedState;
    });
  };
  // eslint-disable-next-line no-unused-vars
  const fileuploadOneByOne = async (file, s3, index) => {
    const params = {
      Bucket: "lightfourthbucket",
      Key: `uploads/${file.file.name}`,
      Body: file.file,
    };

    const upload = s3.upload(params);

    upload.on("httpUploadProgress", (progress) => {
      const percentUploaded = Math.round(
        (progress.loaded / progress.total) * 100
      );
      console.log("percentUploaded", file.file.name, percentUploaded);

      setIdLink((prevFormState) => {
        const updatedFormState = [...prevFormState];
        const index = updatedFormState.findIndex((item) => item.id === file.id);

        if (index !== -1) {
          updatedFormState[index] = {
            ...updatedFormState[index],
            progress: percentUploaded,
          };
        }

        return updatedFormState;
      });
    });

    try {
      const response = await upload.promise();
      console.log(response);
      setIdLinkErr("");
      return { link: response.Location, id: file.id };
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error;
    }
  };

  const handelCheck = async (updatedFiles) => {
    try {
      console.log(updatedFiles);

      const updatedFiles2 = updatedFiles?.filter((e) => e.progress == 0);

      console.log(updatedFiles2, "updatedFiles2");
      const s3 = new AWS.S3({
        accessKeyId: import.meta.env.VITE_S3_BUCKET_ACCESS_KEY,
        secretAccessKey: import.meta.env.VITE_S3_BUCKET_SECRET_KEY,
        region: "us-east-1",
      });

      const uploadPromises = updatedFiles2.map(async (file, index) => {
        return await fileuploadOneByOne(file, s3, index);
      });

      const uploadedFileLocations = await Promise.all(uploadPromises);
      console.log(uploadedFileLocations, "uploadedFileLocations");
      idRef.current.value = null;
      uploadedFileLocations?.forEach(async (element) => {
        if (element) {
          setIdLink((prevFormState) => {
            const updatedFormState = [...prevFormState];
            const index = updatedFormState.findIndex(
              (item) => item.id === element.id
            );

            if (index !== -1) {
              updatedFormState[index] = {
                ...updatedFormState[index],
                identificationFileLinks: element.link,
              };
            }

            return updatedFormState;
          });
        }
      });

      return uploadedFileLocations;
    } catch (error) {
      console.error("Error uploading files:", error);
      throw error; // You can choose to handle errors differently if needed
    }
  };

  const handelSubmit = async (_e) => {
    _e.preventDefault();

    try {
      let flag = 0;
      if (idLink?.length <= 0) {
        flag = 1;
        setIdLinkErr("ID file is required");
      } else {
        setIdLinkErr("");
      }
      govtidformvalidate.parse(formData);
      if (flag == 1) {
        return;
      } else {
        setIdLinkErr("");
      }
    } catch (error) {
      console.log(error);
      if (error instanceof ZodError) {
        handelError(error, setFormData);
      }
      return;
    }
    const postdata = idLink?.map((e) => ({
      link: e.identificationFileLinks,
      name: e.imgName,
      size: e.imgsize,
    }));
    doSubmitGoveid({
      identityType: formData?.identityType,
      identityNumber: formData?.identityNumber,
      identificationFileLinks: postdata,
    });
  };

  useEffect(() => {
    if (isSuccess && data) {
      console.log("data", data);
      navigate("/instructor/signup-step-four");
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (isError && error) {
      toast.error(error?.data?.message);
    }
  }, [isError, error]);

  return (
    <GuestGuard>
      <Seo title="signup step three" metaName="Metaname" metaTags={metaTags}>
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
                      <button className="active"></button>
                      <button></button>
                    </div>
                    <div className="staperMain">
                      <form onSubmit={handelSubmit}>
                        {/* Strat Step three */}

                        <div id="step-three" className="staper show">
                          <div className="formContent">
                            <h4>Verify Your Identity</h4>
                            <p className="subTextOne">
                              Upload a means of identification so that we can
                              get to know you.
                            </p>
                          </div>
                          <div className="row">
                            <div className="col-12">
                              <div className="formGroup">
                                <label className="formlabel">
                                  Select ID type
                                </label>
                                <div className="selectBlock">
                                  <select
                                    className="form-control"
                                    name="identityType"
                                    value={formData?.identityType}
                                    onChange={(_event) => {
                                      handelChange(_event);
                                    }}
                                  >
                                    <option value={""}>Select id type</option>
                                    <option value={"International Passport"}>
                                      International Passport
                                    </option>
                                    <option value={"Driver's License"}>
                                      Driver's License
                                    </option>
                                    <option value={"State-issued ID card"}>
                                      State-issued ID card
                                    </option>
                                    <option value={"Green Card"}>
                                      Green Card
                                    </option>
                                    <option value={"Social Security Card"}>
                                      Social Security Card
                                    </option>
                                    <option
                                      value={
                                        "Employment Authorization Document (EAD)"
                                      }
                                    >
                                      Employment Authorization Document (EAD)
                                    </option>
                                    <option value={"Military ID"}>
                                      Military ID
                                    </option>
                                    <option value={"Tribal Identification"}>
                                      Tribal Identification
                                    </option>
                                    <option value={"Voter ID Card"}>
                                      Voter ID Card
                                    </option>
                                    <option value={"Birth Certificate"}>
                                      Birth Certificate
                                    </option>
                                  </select>
                                </div>
                                <span className="errorMsg">
                                  {formData?.identityTypeErrMsg}
                                </span>
                              </div>
                            </div>
                            <div className="col-12">
                              <div className="formGroup">
                                <label className="formlabel">ID Number</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="identityNumber"
                                  value={formData?.identityNumber}
                                  onChange={(_event) => {
                                    handelChange(_event);
                                  }}
                                />
                                <p className="errorMsg">
                                  {formData?.identityNumberErrMsg}
                                </p>
                              </div>
                            </div>
                            <div className="col-12">
                              <div className="formGroup">
                                <label className="formlabel">Upload ID</label>
                                <div
                                  className="fileUploadTwo"
                                  onDrop={handleDrop}
                                  onDragOver={handleDragOver}
                                >
                                  <input
                                    type="file"
                                    name="id"
                                    multiple
                                    accept=".pdf"
                                    ref={idRef}
                                    onChange={(val) =>
                                      handlemultiFileUpload(val.target.files)
                                    }
                                  />
                                  <p className="subTextOne fontWeight-700">
                                    Drop one or more file(s) here or{" "}
                                    <span>browse</span>
                                  </p>
                                  <p className="subTextTwo">
                                    Max. File Size: 20MB
                                  </p>
                                </div>
                                <p className="errorMsg">{idLinkErrMsg}</p>
                              </div>
                            </div>

                            {idLink.length > 0
                              ? idLink?.map((item, index) => {
                                  return (
                                    <div className="uploadView" key={index}>
                                      <div className="uploadViewInner">
                                        <Grid
                                          container
                                          justifyContent={"space-between"}
                                        >
                                          <Grid item>
                                            <p className="subTextOne fontWeight-700">
                                              Uploading:{" "}
                                              <span>{item?.imgName}</span>
                                            </p>
                                          </Grid>
                                          <Grid item>
                                            <p className="subTextTwo fontWeight-300">
                                              {item.progress}%
                                            </p>
                                          </Grid>
                                        </Grid>
                                        <LinearProgress
                                          variant="determinate"
                                          value={item.progress}
                                          max="100"
                                        />
                                        <button
                                          className="fileDlt"
                                          type="button"
                                          onClick={() => {
                                            setIdLink((prev) => {
                                              let data = [...prev];
                                              data.splice(index, 1);
                                              return JSON.parse(
                                                JSON.stringify(data)
                                              );
                                            });
                                          }}
                                        >
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                          >
                                            <g
                                              opacity="0.2"
                                              clipPath="url(#clip0_1428_66983)"
                                            >
                                              <path
                                                d="M12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22ZM12 10.586L9.172 7.757L7.757 9.172L10.586 12L7.757 14.828L9.172 16.243L12 13.414L14.828 16.243L16.243 14.828L13.414 12L16.243 9.172L14.828 7.757L12 10.586Z"
                                                fill="#3F3F44"
                                              />
                                            </g>
                                            <defs>
                                              <clipPath id="clip0_1428_66983">
                                                <rect
                                                  width="24"
                                                  height="24"
                                                  fill="white"
                                                />
                                              </clipPath>
                                            </defs>
                                          </svg>
                                        </button>
                                      </div>
                                    </div>
                                  );
                                })
                              : null}
                            {/* <span className="errorMsg">{idLinkErrMsg}</span> */}
                            <div className="col-12">
                              <div className="staperBtnDiv">
                                <button
                                  className="circleBtn"
                                  type="button"
                                  onClick={() =>
                                    navigate("/instructor/signup-step-two")
                                  }
                                >
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
                                </button>
                                <button
                                  className="primaryBtn"
                                  disabled={isLoading}
                                >
                                  Next
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* End Step three */}
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

Component.displayName = "InstructorSignupStepThree";
