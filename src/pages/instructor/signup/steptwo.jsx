/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-labels */
import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ZodError } from "zod";
import { toast } from "react-toastify";
import AWS from "aws-sdk";
import { GuestGuard } from "../../../guards/student/guest-guard";
import Seo from "@/components/common/seo";
import { handelError } from "@/helpers/common";
import { v4 as uuidv4 } from "uuid";

import InstructorSignupImg from "@/assets/images/instructor-signup.png";
import BecomeInstructorImg from "@/assets/images/become-Instructor.png";
import uploadIcon from "@/assets/images/upload.svg";
import {
  certificateFormValidate,
  cvformvalidate,
} from "../../../validation/instructor/auth";
import {
  useCvformMutation,
  useGetCvFormMutation,
} from "../../../redux/api/instructor/auth";
import { Grid, LinearProgress } from "@mui/material";
import moment from "moment";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { Hourglass } from "react-loader-spinner";

const metaTags = [
  { name: "Metaname1", content: "content1" },
  { name: "Metaname2", content: "content2" },
];

export function Component() {
  const navigate = useNavigate();
  const location = useLocation();
  const [
    doSubmitCv,
    {
      isLoading: isLoadingSubmit,
      isSuccess: isSuccessSubmit,
      isError,
      data: dataSubmit,
      error,
    },
  ] = useCvformMutation();
  const [getCvForm, { isLoading, isSuccess }] = useGetCvFormMutation();
  const fileInputRef = useRef(null);
  const cirtificateInputRef = useRef(null);

  const [formData, setFormData] = useState([]);
  //   const [uploadDoc, setUploaddoc] = useState([]);
  const [disablecv, setDisable] = useState(false);
  const [cvFile, setCvFile] = useState("");
  const [cvFileErrMsg, setCvFileErrMsg] = useState("");
  const [formDataErrMsg, setformDataErrMsg] = useState("");
  const [cvName, setcvName] = useState("");
  const [cvSize, setcvSize] = useState("");

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    handlemultiFileUpload(files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };
  function getOriginalname(data) {
    console.log("image///", data);
    let arr = data?.split("/");
    let lent = Number(arr.length - 1);
    console.log(arr[lent]);
    return arr[lent];
  }
  const handleFileUpload = async (file) => {
    setCvFileErrMsg("");
    const maxFileSizeMB = 2;

    // Check file type
    if (!file.type.includes("pdf")) {
      console.error("Only PDF files are allowed");
      toast.error("Only PDF  files are allowed");
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
      setDisable(true);
      const response = await s3.upload(params).promise();
      let fileName = getOriginalname(response.Location);
      console.log("File uploaded successfully:", response, fileName);
      setCvFile(response.Location);
      setcvName(file.name);
      setcvSize(file.size);
      setDisable(false);
    } catch (error) {
      console.error("Error uploading file:", error);
      setDisable(false);
    }
  };

  const handlemultiFileUpload = async (files) => {
    const allowedFileTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    const maxFileSizeMB = 20;
    if (files.length > 0) {
      const maxSize = 20 * 1024 * 1024; // 20 MB

      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        // Check file size
        if (file.size > maxSize) {
          toast.error(`Uploading file can not be more than 20 MB`);
          cirtificateInputRef.current.value = null;
          return;
        }

        // Check file type
        if (!file.type.includes("pdf")) {
          toast.error(`Only PDF files are allowed`);
          cirtificateInputRef.current.value = null;
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
          title: "",
          titleErr: false,
          titleErrMsg: "",
          date: "",
          dateErr: false,
          dateErrMsg: "",
          category: "",
          categoryErr: false,
          categoryErrMsg: "",
          issuer: "",
          issuerErr: false,
          issuerErrMsg: "",
          certificateNo: "",
          certificateNoErr: false,
          certificateNoErrMsg: "",
          certificateLink: "",
          imgName: element.name,
          certificateSize: element.size,
          DocShow: false,
        };
        Arr.push(updated);
      }
    });
    let uploadPromises2 = [];
    setFormData((_prevState) => {
      let updatedState;
      if (Array.isArray(_prevState)) {
        updatedState = [..._prevState, ...Arr];
      } else {
        updatedState = Arr;
      }

      handelCheck(updatedState);

      return updatedState;
    });
  };
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

      setFormData((prevFormState) => {
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
      cirtificateInputRef.current.value = null;
      uploadedFileLocations?.forEach(async (element) => {
        if (element) {
          setFormData((prevFormState) => {
            const updatedFormState = [...prevFormState];
            const index = updatedFormState.findIndex(
              (item) => item.id === element.id
            );

            if (index !== -1) {
              updatedFormState[index] = {
                ...updatedFormState[index],
                certificateLink: element.link,
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

  const handleuploadcv = (file) => {
    // console.log(file)
    if (file) {
      handleFileUpload(file);
    }
  };
  const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  function isFutureDate(dateString) {
    const selectedDate = new Date(dateString);
    const currentDate = new Date();
    return selectedDate > currentDate;
  }
  const handelSubmit = async (_e) => {
    _e.preventDefault();

    let flag = 0;
    try {
      if (!cvFile?.trim()) {
        setCvFileErrMsg("CV file is required");
        flag = 1;
      } else {
        setCvFileErrMsg("");
      }
      console.log("formData", formData);
      if (formData?.length <= 0) {
        flag = 1;
        setformDataErrMsg("Certificate is required");
      } else if (
        formData?.length > 0 &&
        formData?.filter((e) => e.DocShow == true)?.length < 1
      ) {
        flag = 1;
        setformDataErrMsg(
          "Upload CV and Save at least 1 Certificate to proceed further"
        );
      } else {
        setformDataErrMsg("");
      }
      if (flag == 1) {
        return;
      } else {
        setCvFileErrMsg("");
        setformDataErrMsg("");
      }

      const postdata = formData
        ?.map((e) => {
          if (e.DocShow) {
            return {
              title: e.title,
              date: e.date,
              issuer: e.issuer,
              category: e.category,
              certificateNo: e.certificateNo,
              certificateLink: e.certificateLink,
              certificateName: e.imgName,
              certificateSize: e.certificateSize,
            };
          }
          return null;
        })
        .filter(Boolean);

      doSubmitCv({
        cvLink: cvFile,
        cvName: cvName,
        cvSize: cvSize,
        certificates: postdata,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const multipleHandelChange = (index, field, value) => {
    setFormData((prevFormState) => {
      const updatedFormState = [...prevFormState];
      updatedFormState[index] = {
        ...updatedFormState[index],
        [field]: value,
        [`${field}Err`]: false,
        [`${field}ErrMsg`]: "",
      };
      return updatedFormState;
    });
  };

  const handelErrorTwo = (error, index) => {
    const errors = error.issues;
    console.log(errors);

    // return;

    errors.forEach((validationError) => {
      const { path, message } = validationError;
      const fieldName = path[1];
      //   const indexA = path[0];
      //   console.log(fieldName);

      setFormData((prevState) => {
        const updatedFormData = [...prevState];
        updatedFormData[index] = {
          ...updatedFormData[index],

          [`${fieldName}Err`]: true,
          [`${fieldName}ErrMsg`]: message,
        };
        return updatedFormData;
      });
    });
  };

  const handleSaveData = (index, item) => {
    try {
      certificateFormValidate.parse([formData[index]]);
      setformDataErrMsg("");
    } catch (error) {
      if (error instanceof ZodError) {
        handelErrorTwo(error, index);
      }
      return;
    }
    setFormData((prevState) => {
      const updatedFormData = [...prevState];
      updatedFormData[index] = {
        ...updatedFormData[index],

        DocShow: true,
      };
      return updatedFormData;
    });
    console.log("formData", formData);
  };
  useEffect(() => {
    getCvForm()
      .then(({ data }) => {
        console.log(data);
        if (data?.success) {
          const updatedData = data?.data?.instructorCertificate?.map((e) => ({
            id: uuidv4(),
            file: {},
            progress: 100,
            title: e?.title,
            titleErr: false,
            titleErrMsg: "",
            date: e?.date,
            dateErr: false,
            dateErrMsg: "",
            category: e?.category,
            categoryErr: false,
            categoryErrMsg: "",
            issuer: e?.issuer,
            issuerErr: false,
            issuerErrMsg: "",
            certificateNo: e?.certificateNo,
            certificateNoErr: false,
            certificateNoErrMsg: "",
            certificateLink: e?.certificateLink,
            imgName: e?.certificateName,
            certificateSize: e?.certificateSize,
            DocShow: true,
          }));
          if (data?.data?.cvLink) {
            setCvFile(data?.data?.cvLink);
            setcvName(data?.data?.cvName);
            setcvSize(data?.data?.cvSize);
          }

          setFormData(updatedData);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [location.pathname]);

  useEffect(() => {
    if (isSuccessSubmit && dataSubmit) {
      navigate("/instructor/signup-step-three");
    }
  }, [isSuccessSubmit, dataSubmit]);

  useEffect(() => {
    if (isError && error) {
      toast.error(error?.data?.message);
    }
  }, [isError, error]);
  return (
    <GuestGuard>
      <Seo title="signup step two" metaName="Metaname" metaTags={metaTags}>
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
                      <button className="active"></button>
                      <button></button>
                      <button></button>
                    </div>
                    <div className="staperMain">
                      <form onSubmit={handelSubmit}>
                        {/* Strat Step Two */}

                        <div id="step-two" className="staper show">
                          <div className="formContent">
                            <h4>Upload Certification</h4>
                            <p className="subTextOne">
                              Upload a copy of your CV and Certificate(s) to
                              enable us evaluate your application.
                            </p>
                          </div>
                          <div className="row">
                            <div className="col-12">
                              <div className="formGroup">
                                <label className="formlabel">
                                  Upload CV <strong>(2 MB max)</strong>
                                </label>

                                <div className="fileUploadOne">
                                  <div className="fileName">
                                    <p className="subTextOne">{cvName}</p>
                                    {cvName !== "" && (
                                      <button
                                        type="button"
                                        onClick={() => {
                                          setCvFile("");
                                          setcvName("");
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
                                      ref={fileInputRef}
                                      disabled={disablecv}
                                      type="file"
                                      name="cvfile"
                                      accept=".pdf"
                                      onChange={(val) =>
                                        handleuploadcv(val.target.files[0])
                                      }
                                    />
                                    {disablecv ? (
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
                                <p className="errorMsg">{cvFileErrMsg}</p>
                              </div>
                            </div>
                            <div className="col-12">
                              <div className="formGroup">
                                <label className="formlabel">
                                  Upload Certificate(s)
                                </label>
                                <div
                                  className="fileUploadTwo"
                                  onDrop={handleDrop}
                                  onDragOver={handleDragOver}
                                >
                                  <input
                                    ref={cirtificateInputRef}
                                    type="file"
                                    name="certificate"
                                    multiple
                                    accept=".pdf"
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
                                {formDataErrMsg ==
                                  "Certificate is required" && (
                                  <p className="errorMsg">{formDataErrMsg}</p>
                                )}
                              </div>

                              {formData && formData.length > 0
                                ? formData?.map((item, index) => {
                                    return (
                                      <>
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
                                                  {item?.progress}%
                                                </p>
                                              </Grid>
                                            </Grid>
                                            <LinearProgress
                                              variant="determinate"
                                              value={item?.progress}
                                              max="100"
                                            />
                                            <button
                                              type="button"
                                              className="fileDlt"
                                              onClick={() => {
                                                setFormData((prev) => {
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
                                          {item?.DocShow && (
                                            <Grid
                                              container
                                              className="fileViewDetails"
                                            >
                                              <p className="subTextOne fontWeight-700">
                                                {item?.title}
                                              </p>
                                              <Grid
                                                item
                                                container
                                                justifyContent={"space-between"}
                                              >
                                                <Grid item>
                                                  <p className="subTextOne">
                                                    Category: {item?.category}
                                                  </p>
                                                </Grid>
                                                <Grid item>
                                                  <p className="subTextOne">
                                                    Year:{" "}
                                                    {moment(item?.date).format(
                                                      "YYYY"
                                                    )}
                                                  </p>
                                                </Grid>
                                              </Grid>
                                              <Grid
                                                item
                                                container
                                                justifyContent={"space-between"}
                                              >
                                                <Grid item>
                                                  <p className="subTextOne">
                                                    Issuer: {item?.issuer}
                                                  </p>
                                                </Grid>
                                                <Grid item>
                                                  <p className="subTextOne">
                                                    Cert. No:{" "}
                                                    {item?.certificateNo}
                                                  </p>
                                                </Grid>
                                              </Grid>
                                            </Grid>
                                          )}
                                        </div>
                                        {!item?.DocShow && (
                                          <>
                                            <div className="row" key={index}>
                                              <div className="col-12">
                                                <div className="formGroup">
                                                  <input
                                                    type="text"
                                                    className={`form-control ${
                                                      item?.titleErr
                                                        ? "errField"
                                                        : ""
                                                    }`}
                                                    placeholder="Add Title"
                                                    name="title"
                                                    value={item?.title}
                                                    onChange={(e) => {
                                                      multipleHandelChange(
                                                        index,
                                                        "title",
                                                        e.target.value
                                                      );
                                                    }}
                                                  />
                                                  <p className="errorMsg">
                                                    {item?.titleErrMsg}
                                                  </p>
                                                </div>
                                              </div>
                                              <div className="col-12 col-md-6">
                                                <div className="formGroup">
                                                  <input
                                                    type="date"
                                                    className={`form-control ${
                                                      item?.dateErr
                                                        ? "errField"
                                                        : ""
                                                    }`}
                                                    name="date"
                                                    placeholder="Date"
                                                    max={getCurrentDate()}
                                                    value={item?.date}
                                                    onChange={(e) => {
                                                      const selectedDate =
                                                        e.target.value;
                                                      if (
                                                        isFutureDate(
                                                          selectedDate
                                                        )
                                                      ) {
                                                        toast.error(
                                                          "Future date not allowed"
                                                        );
                                                      } else {
                                                        multipleHandelChange(
                                                          index,
                                                          "date",
                                                          selectedDate
                                                        );
                                                      }
                                                    }}
                                                  />
                                                  <p className="errorMsg">
                                                    {item?.dateErrMsg}
                                                  </p>
                                                </div>
                                              </div>
                                              <div className="col-12 col-md-6">
                                                <div className="formGroup">
                                                  <div className="selectBlock">
                                                    <select
                                                      className={`form-control ${
                                                        item?.categoryErr
                                                          ? "errField"
                                                          : ""
                                                      }`}
                                                      value={item?.category}
                                                      onChange={(e) => {
                                                        multipleHandelChange(
                                                          index,
                                                          "category",
                                                          e.target.value
                                                        );
                                                      }}
                                                    >
                                                      <option value={""}>
                                                        Select Category
                                                      </option>
                                                      <option
                                                        value={
                                                          "Professional Certificate"
                                                        }
                                                      >
                                                        Professional Certificate
                                                      </option>
                                                      <option
                                                        value={
                                                          "Academic Certificate"
                                                        }
                                                      >
                                                        Academic Certificate
                                                      </option>
                                                      <option
                                                        value={
                                                          "Teaching Certificate"
                                                        }
                                                      >
                                                        Teaching Certificate
                                                      </option>
                                                      <option
                                                        value={
                                                          "Industry-Specific Certificate"
                                                        }
                                                      >
                                                        Industry-Specific
                                                        Certificate
                                                      </option>
                                                      <option
                                                        value={
                                                          "STEM Education Certificate"
                                                        }
                                                      >
                                                        STEM Education
                                                        Certificate
                                                      </option>
                                                      <option
                                                        value={
                                                          "Special Education Certificate"
                                                        }
                                                      >
                                                        Special Education
                                                        Certificate
                                                      </option>
                                                      <option
                                                        value={
                                                          "Business & Leadership Certificate"
                                                        }
                                                      >
                                                        Business & Leadership
                                                        Certificate
                                                      </option>
                                                      <option
                                                        value={
                                                          "Creative & Performing Arts Certificate"
                                                        }
                                                      >
                                                        Creative & Performing
                                                        Arts Certificate
                                                      </option>
                                                    </select>
                                                  </div>

                                                  <p className="errorMsg">
                                                    {item?.categoryErrMsg}
                                                  </p>
                                                </div>
                                              </div>
                                              <div className="col-12 col-md-6">
                                                <div className="formGroup">
                                                  <input
                                                    type="text"
                                                    className={`form-control ${
                                                      item?.issuerErr
                                                        ? "errField"
                                                        : ""
                                                    }`}
                                                    placeholder="Issuer"
                                                    name="Issuer"
                                                    value={item?.issuer}
                                                    onChange={(e) => {
                                                      multipleHandelChange(
                                                        index,
                                                        "issuer",
                                                        e.target.value
                                                      );
                                                    }}
                                                  />
                                                  <p className="errorMsg">
                                                    {item?.issuerErrMsg}
                                                  </p>
                                                </div>
                                              </div>
                                              <div className="col-12 col-md-6">
                                                <div className="formGroup">
                                                  <input
                                                    type="text"
                                                    className={`form-control ${
                                                      item?.certificateNoErr
                                                        ? "errField"
                                                        : ""
                                                    }`}
                                                    placeholder="Cert. No"
                                                    name="certificateNo"
                                                    value={item?.certificateNo}
                                                    onChange={(e) => {
                                                      multipleHandelChange(
                                                        index,
                                                        "certificateNo",
                                                        e.target.value
                                                      );
                                                    }}
                                                  />
                                                  <p className="errorMsg">
                                                    {item?.certificateNoErrMsg}
                                                  </p>
                                                </div>
                                              </div>
                                            </div>
                                            <Grid
                                              container
                                              justifyContent={"flex-end"}
                                              paddingBottom={2}
                                            >
                                              <Grid item>
                                                <button
                                                  type="button"
                                                  className="primaryBtnSmall"
                                                  onClick={() => {
                                                    handleSaveData(index, item);
                                                  }}
                                                >
                                                  <SaveOutlinedIcon /> Save
                                                </button>
                                              </Grid>
                                            </Grid>
                                          </>
                                        )}
                                      </>
                                    );
                                  })
                                : null}
                            </div>
                            {formDataErrMsg != "Certificate is required" && (
                              <p className="errorMsg">{formDataErrMsg}</p>
                            )}

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
                                <button
                                  className="primaryBtn"
                                  disabled={isLoadingSubmit}
                                  type="submit"
                                >
                                  Next
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* End Step Two */}
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

Component.displayName = "SignupStepTwo";
