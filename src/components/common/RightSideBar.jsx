/* eslint-disable react/prop-types */
import pdfIcon from "@/assets/images/pdf.svg";
import eyeIcon from "@/assets/images/eye.svg";
import documentDownloadIcon from "@/assets/images/document-download.svg";
import bellIcon from "@/assets/images/bell-icon.svg";
import paymentIcon from "@/assets/images/payment-icon.svg";
import polyCloseIcon from "@/assets/images/poly-close-red.svg";
import passwordlockIcon from "@/assets/images/password-lock.svg";
import editIcon from "@/assets/images/edit-icon.svg";
import pendingIcon from "@/assets/images/Frame.svg";

import eyeClose from "@/assets/images/eye-close.svg";
import eyeOpen from "@/assets/images/eye.svg";
import closefillcircle from "@/assets/images/close-fill-circle.svg";
import reviewIcon from "@/assets/images/review-icon.svg";
import deleteIcon from "@/assets/images/delete.svg";
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  IconButton,
  LinearProgress,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  OutlinedInput,
  Slide,
  Switch,
  TextField,
  styled,
} from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import { ZodError } from "zod";
import { v4 as uuidv4 } from "uuid";
import AWS from "aws-sdk";

import CloseIcon from "@mui/icons-material/Close";
import { Document, Page } from "react-pdf";
import EastIcon from "@mui/icons-material/East";
import WestIcon from "@mui/icons-material/West";
import React, { useEffect, useRef, useState } from "react";
import moment from "moment";
import PermitionDialoug from "./PermitionDialoug";
import { toast } from "react-toastify";
import {
  certificateFormValidate,
  certificateFormValidateUpdate,
  changePasswordValidate,
  checkpasswordValidation,
  cvEditformValidate,
} from "../../validation/instructor/auth";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import resendImage from "@/assets/images/resend-image.png";
import {
  useAddCertificateMutation,
  useChangeNotificationMutation,
  useChangePasswordInstructorMutation,
  useCheckPasswordFordisableMutation,
  useCvdeleteMutation,
  useDisableAccountMutation,
  useEditCvMutation,
  useGetMyProfileMutation,
  useOtpVerifyPasswordMutation,
  useResendOtpVerifyInstructorMutation,
  useUpdateCertificateMutation,
} from "../../redux/api/instructor/auth";
import SuccessDialog from "./successDialog";
import { handelError } from "@/helpers/common";
import { logout } from "../../redux/slice/instructor/user";
import { useDispatch } from "react-redux";
import PauseIcon from "@mui/icons-material/Pause";
import infocircleIcon from "@/assets/images/info-circle.svg";
import OTPInput from "./OtpInput";
import successImage from "../../assets/images/Success.png";
import RejectedIcon from "../../assets/images/Reject1.svg";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const label = { inputProps: { "aria-label": "Switch demo" } };

const BigSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    color: "#fff",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: "#581959",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiTypography-body1": {
    fontFamily: "Gordita !important",
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

function RightSideBar() {
  const dispatch = useDispatch();
  const cvRef = useRef();
  const [doAddCert, { isLoading, isSuccess, isError, data, error }] =
    useAddCertificateMutation();
  const [
    doUpdateCert,
    {
      isLoading: updateLoading,
      isSuccess: updateSuccess,
      isError: updateError,
      data: updateData,
      error: UpdateErrorData,
    },
  ] = useUpdateCertificateMutation();
  const [
    getDetails,
    { isLoading: detailsLoading, isSuccess: detailsSuccess, data: detailsData },
  ] = useGetMyProfileMutation();
  const [
    changeNotification,
    { isLoading: notyLoading, isSuccess: notySuccess, data: notyData },
  ] = useChangeNotificationMutation();
  const [doDeleteCv, { isSuccess: dltcvSuccess, data: dltcvData }] =
    useCvdeleteMutation();
  const [
    doDisable,
    { isLoading: disableLoading, isSuccess: disableSuccess, data: disableData },
  ] = useDisableAccountMutation();
  const [
    doEditCv,
    { isLoading: cvLoading, isSuccess: cvSuccess, data: cvData },
  ] = useEditCvMutation();
  const [
    doChangePass,
    {
      isLoading: passLoading,
      isSuccess: passSuccess,
      data: passData,
      isError: passError,
      error: ErrorData,
    },
  ] = useChangePasswordInstructorMutation();

  const [
    doVerifyPass,
    {
      isLoading: virifyPassLoading,
      isSuccess: virifyPassSuccess,
      data: virifyPassData,
      isError: virifyPassisError,
      error: errorvirifyPass,
    },
  ] = useCheckPasswordFordisableMutation();
  const [
    doVerifyOtp,
    {
      isLoading: otpLoading,
      isSuccess: otpSuccess,
      data: otpData,
      isError: otpisError,
      error: otperror,
    },
  ] = useOtpVerifyPasswordMutation();
  const [
    doResendOtp,
    {
      isLoading: resendotpLoading,
      isSuccess: resendotpSuccess,
      data: resendotpData,
      isError: resendotpisError,
      error: resendotperror,
    },
  ] = useResendOtpVerifyInstructorMutation();
  const cirtificateInputRef = useRef();
  const [cvopen, setCVOpen] = useState({ open: false, link: "" });
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const [open, setOpen] = React.useState(false);
  const [certificatemodal, setCertificateModal] = useState(false);
  const [disablemodal, setDisable] = useState(false);
  const [formData, setFormData] = useState([]);
  const [formDataErrMsg, setformDataErrMsg] = useState("");
  const [editcertificatemodal, setEditCertificateModal] = useState(false);
  const [singleCert, setSingleCert] = useState({});
  const [reviewmodal, setReviewModal] = useState(false);
  const [openchangepassModal, setOpenChangePass] = React.useState(false);
  const [successmodal, setSuccessModal] = useState(false);
  const [profileDetails, setProfileDetails] = useState({});
  const [weeklySummaryNoty, setWeeklySummaryNoty] = useState(false);
  const [weeklySummaryAccNoty, setWeeklySummaryAccNoty] = useState(false);
  const [newEnrollmentNotify, setnewEnrollmentNotify] = useState(false);
  const [newCommentNotify, setnewCommentNotify] = useState(false);
  const [courseApprovalNotify, setcourseApprovalNotify] = useState(false);
  const [someoneLeftReviewNotify, setsomeoneLeftReviewNotify] = useState(false);
  const [passwordData, setPassData] = useState({
    oldpassword: "",
    oldpasswordErr: false,
    oldpasswordErrMsg: "",
    password: "",
    passwordErr: false,
    passwordErrMsg: "",
    confirmPassword: "",
    confirmPasswordErr: false,
    confirmPasswordErrMsg: "",
  });
  const [passwordView, setpasswordView] = useState(false);
  const [confirmPasswordView, setconfirmPasswordView] = useState(false);
  const [oldPasswordView, setOldPasswordView] = useState(false);
  const [cvLink, setCvLink] = useState([]);
  const [cvLinkErrMsg, setCvLinkErr] = useState("");
  const [cvreason, setCvreason] = useState("");
  const [cvreasonerr, setCvreasonErr] = useState("");
  const [cvalertmodal, setcvalertModal] = useState(false);
  const [openEditCvModal, setEditCvOpen] = React.useState(false);
  const [openDeactiveModal, setOpenDeactiveModal] = useState(false);
  const [afterDeactiveModal, setAfterDeactiveModal] = useState(false);
  const [firstOtpModal, setFirstOtpModal] = useState(false);
  const [secondOtpModal, setSecondOtpModal] = useState(false);
  const [formPassword, setFormPassword] = useState({
    oldPassword: "",
    oldPasswordErr: false,
    oldPasswordErrMsg: "",
  });
  const [showOldPIcon, setshowOldPIcon] = useState(false);
  const [otp, setotp] = useState("");
  const [otpError, setotpError] = useState(false);
  const [otpErrMsg, setotpErrMsg] = useState("");
  const [passChangeSuccessModal, setPassChangeSuccessModal] = useState(false);

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handlePasswordChange = (e) => {
    const { value } = e.target;
    setPassData((prevState) => ({
      ...prevState,
      password: value,
      passwordErr: !passwordRegex.test(value),
      passwordErrMsg: passwordRegex.test(value)
        ? ""
        : "Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long.",
    }));
  };

  const handelChangePassword = (_event, _setState) => {
    _setState((_prevState) => ({
      ..._prevState,
      [_event.target.name]: _event.target.value,
      [`${_event.target.name}Err`]: false,
      [`${_event.target.name}ErrMsg`]: "",
    }));
  };

  const handleCloseDeactiveModal = () => {
    setOpenDeactiveModal(false);
  };

  const handleDeactivate = () => {
    try {
      checkpasswordValidation(formPassword);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
    doVerifyPass({ password: formPassword.oldPassword });
  };
  const handleLogout = () => {
    dispatch(logout());
  };
  const handleVerify = () => {
    try {
      doVerifyOtp({ otp: otp });
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };
  const handleResendOtp = () => {
    try {
      doResendOtp();
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };
  const fileInputRef = useRef();

  const handleClickEditCvOpen = () => {
    console.log("profileDetails", profileDetails);
    let Arr = [
      {
        id: uuidv4(),
        file: null,
        progress: 100,
        imgName: profileDetails?.cvName,
        imgsize: profileDetails?.cvSize,
        cvFileLinks: profileDetails?.cvLink,
      },
    ];
    setCvLink([]);
    setCvreason("");
    // setCvreason(profileDetails?.cvName)
    setEditCvOpen(true);
  };

  const handleCloseEditCV = () => {
    setEditCvOpen(false);
  };
  function bytesToKB(bytes) {
    const kbSize = bytes / 1024;
    return kbSize.toFixed(2);
  }
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  const handleDrop = (e) => {
    alert("okk")
    e.preventDefault();
    console.log("okk",e)
    const files = Array.from(e.dataTransfer.files);
    console.log("okk1",files)

    handlemultiFileUpload(files);
  };
  const handlemultiFileUploadCvLink = async (files) => {
    if (files.length > 0) {
      const maxSize = 2 * 1024 * 1024; // 20 MB

      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        // Check file size
        if (file.size > maxSize) {
          toast.error(`Uploading file can not be more than 2 MB`);
          cvRef.current.value = null;
          return;
        }

        // Check file type
        if (!file.type.includes("pdf")) {
          toast.error(`Only PDF files are allowed `);
          cvRef.current.value = null;
          return;
        }
      }
    }

    let Arr = [];

    Array.from(files)?.forEach((element) => {
      console.log("element", element);
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

    setCvLink((_prevState) => {
      const updatedState = [..._prevState, ...Arr];

      handelCheckCvLink(updatedState);

      return updatedState;
    });
  };
  // eslint-disable-next-line no-unused-vars
  const fileuploadOneByOneCvLink = async (file, s3, index) => {
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

      setCvLink((prevFormState) => {
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
      setCvLinkErr("");
      return { link: response.Location, id: file.id };
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error;
    }
  };

  const handelCheckCvLink = async (updatedFiles) => {
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
        return await fileuploadOneByOneCvLink(file, s3, index);
      });

      const uploadedFileLocations = await Promise.all(uploadPromises);
      console.log(uploadedFileLocations, "uploadedFileLocations");
      // cvRef.current.value = null;
      uploadedFileLocations?.forEach(async (element) => {
        if (element) {
          setCvLink((prevFormState) => {
            const updatedFormState = [...prevFormState];
            const index = updatedFormState.findIndex(
              (item) => item.id === element.id
            );

            if (index !== -1) {
              updatedFormState[index] = {
                ...updatedFormState[index],
                cvFileLinks: element.link,
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
  const handleFileUpload = async (file) => {
    const maxFileSizeMB = 20;

    // Check file type
    if (!file.type.includes("pdf")) {
      console.error("Only PDF files are allowed");
      toast.error("Only PDF  files are allowed");
      fileInputRef.current.value = null;
      return;
    }

    // Check file size
    if (file.size > maxFileSizeMB * 1024 * 1024) {
      console.error("Uploading file can not be more than 20 MB");
      toast.error("Uploading file can not be more than 20 MB");
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
      const response = await s3.upload(params).promise();
      console.log("File uploaded successfully:", response);
      setSingleCert((prev) => {
        let data = { ...prev };
        data.certificateLink = response.Location;
        data.certificateName = file.name;
        data.ertificateSize = file.size;
        return data;
      });
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };
  const handleDragOver = (e) => {
    e.preventDefault();
  };
  const handleCVlickOpen = (link) => {
    setCVOpen({
      open: true,
      link: link,
    });
  };
  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  const handelChange = (_event) => {
    setSingleCert((_prevState) => ({
      ..._prevState,
      [_event.target.name]: _event.target.value,
      [`${_event.target.name}Err`]: false,
      [`${_event.target.name}ErrMsg`]: "",
    }));
  };
  const handelChangePassdata = (_event) => {
    setPassData((_prevState) => ({
      ..._prevState,
      [_event.target.name]: _event.target.value,
      [`${_event.target.name}Err`]: false,
      [`${_event.target.name}ErrMsg`]: "",
    }));
  };
  const handleCloseCV = () => {
    setCVOpen({ open: false, link: "" });
    setPageNumber(1);
  };
  const handelPageChange = (type) => {
    if (type == "inc" && pageNumber < numPages) {
      setPageNumber(pageNumber + 1);
    } else if (type == "dec" && pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };
  const handleDownload = (downloadLink) => {
    const link = document.createElement("a");
    link.href = downloadLink;
    link.download = "downloaded_file.pdf"; // Specify the desired file name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const disablemodalClose = () => {
    setDisable(false);
  };

  // ----------------------------------------------multiple certificate upload part  start---------------------------------------
  const handlemultiFileUpload = async (files) => {
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

    setFormData((_prevState) => {
      const updatedState = [..._prevState, ...Arr];

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
      // cirtificateInputRef.current.value = null;
      uploadedFileLocations?.forEach((element) => {
        console.log("element.link", element.link);
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

  // ----------------------------------------------multiple certificate upload part end ---------------------------------------

  // -------------------------------------add certificate start -----------------------------------
  const handleAddCertificate = (_e) => {
    _e.preventDefault();

    let flag = 0;
    try {
      console.log("formData", formData);
      if (formData?.length <= 0) {
        flag = 1;
        setformDataErrMsg("Certificate is required");
      } else if (
        formData?.length > 0 &&
        formData?.filter((e) => e.DocShow == true)?.length < 1
      ) {
        flag = 1;
        setformDataErrMsg("Save Certificate to proceed further");
      } else {
        setformDataErrMsg("");
      }
      if (flag == 1) {
        return;
      } else {
        setformDataErrMsg("");
      }

      const postdata = formData
        ?.map((e) => {
          if (e.DocShow) {
            return {
              title: e?.title,
              date: e?.date,
              issuer: e?.issuer,
              category: e?.category,
              certificateNo: e?.certificateNo,
              certificateLink: e?.certificateLink,
              certificateName: e?.imgName,
              certificateSize: e?.certificateSize,
            };
          }
          return null;
        })
        .filter(Boolean);
      doAddCert({
        certificate: postdata,
      });
    } catch (error) {
      console.log(error);
    }
  };
  // -------------------------------------add certificate end -----------------------------------

  // -------------------------------------Update certificate start -----------------------------------

  const handleUpdateCertificate = (_e) => {
    console.log(singleCert);
    _e.preventDefault();
    try {
      try {
        certificateFormValidateUpdate.parse(singleCert);
      } catch (error) {
        if (error instanceof ZodError) {
          handelError(error, setSingleCert);
        }
        return;
      }
      doUpdateCert({
        id: singleCert?.id,
        title: singleCert?.title,
        date: singleCert?.date,
        issuer: singleCert?.issuer,
        category: singleCert?.category,
        certificateNo: singleCert?.certificateNo,
        certificateLink: singleCert?.certificateLink,
        certificateName: singleCert?.certificateName,
        certificateSize: singleCert?.certificateSize,
      });
    } catch (error) {
      console.log(error);
    }
  };
  // -------------------------------------add certificate end -----------------------------------

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
  const handleDeleteCv = (uid) => {
    doDeleteCv({ uid });
  };
  const handleClickOpenchagepassModal = () => {
    setOpenChangePass(true);
  };

  const handleClosechangepassModal = () => {
    setOpenChangePass(false);
  };

  const reviewModalClose = () => {
    setReviewModal(false);
  };
  const cvalertModalClose = () => {
    setcvalertModal(false);
  };
  const successmodalClose = () => {
    setSuccessModal(false);
  };
  const handleNotification = () => {
    try {
      changeNotification({
        weeklySummaryaboutLightforthNotify: weeklySummaryNoty,
        weeklySummaryofAccountNotify: weeklySummaryAccNoty,
        newEnrollmentNotify: newEnrollmentNotify,
        newCommentNotify: newCommentNotify,
        courseApprovalNotify: courseApprovalNotify,
        someoneLeftReviewNotify: someoneLeftReviewNotify,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleChangePass = () => {
    try {
      changePasswordValidate.parse(passwordData);
    } catch (error) {
      if (error instanceof ZodError) {
        handelError(error, setPassData);
      }
      return;
    }
    doChangePass({
      oldPassword: passwordData.oldpassword,
      password: passwordData.password,
    });
  };
  const handleEditCv = () => {
    console.log("cvLink", cvLink);
    if (cvLink.length == 0) {
      setCvLinkErr("Cv is required");
      return;
    }
    if (cvreason == "") {
      setCvreasonErr("Reason for Change id required");
      return;
    }
    doEditCv({
      cvLink: cvLink[0]?.cvFileLinks,
      cvName: cvLink[0]?.imgName,
      cvSize: cvLink[0]?.imgsize,
      cvEditReason: cvreason,
    });
  };

  const handleDisableAcc = () => {
    disablemodalClose();
    setOpenDeactiveModal(true);
    // try {
    //   doDisable();
    // } catch (error) {
    //   console.log(error);
    // }
  };

  useEffect(() => {
    getDetails();
  }, []);
  // ------------------------------------------Cv delete Success ---------------------------------

  useEffect(() => {
    if (dltcvSuccess && dltcvData) {
      toast.success(dltcvData?.message);
      getDetails();
    }
  }, [dltcvSuccess, dltcvData]);
  // ------------------------------------------Otp Verify Success ---------------------------------

  useEffect(() => {
    if (otpSuccess && otpData) {
      // toast.success(otpData?.message);
      setSecondOtpModal(false);
      setPassChangeSuccessModal(true);
    }
  }, [otpSuccess, otpData]);

  // ------------------------------------------Otp Resend Success ---------------------------------

  useEffect(() => {
    if (resendotpSuccess && resendotpData) {
      toast.success(resendotpData?.message);
    }
  }, [resendotpSuccess, resendotpData]);
  // ------------------------------------------Verify Password Success ---------------------------------

  useEffect(() => {
    if (virifyPassSuccess && virifyPassData) {
      // toast.success(virifyPassData?.message);
      setAfterDeactiveModal(true);
      handleCloseDeactiveModal();
      setTimeout(() => {
        dispatch(logout());
      }, 3000);
    }
  }, [virifyPassSuccess, virifyPassData]);
  // -------------------------------------Cv Edit Success ----------------------------------------

  useEffect(() => {
    if (cvSuccess && cvData) {
      // toast.success(cvData?.message);
      setEditCvOpen(false);
      setcvalertModal(true);
      getDetails();
    }
  }, [cvSuccess, cvData]);

  // -------------------------------------Password Change Success -----------------------------------

  useEffect(() => {
    if (passSuccess && passData) {
      // toast.success(passData?.message);
      handleClosechangepassModal();
      setFirstOtpModal(true);
    }
  }, [passSuccess, passData]);

  // -------------------------------------Account Disable Success -----------------------------------

  useEffect(() => {
    if (disableSuccess && disableData) {
      toast.success(disableData?.message);
      disablemodalClose();
      dispatch(logout());
    }
  }, [disableSuccess, disableData]);

  // -------------------------------------Certificate Add Success -----------------------------------

  useEffect(() => {
    if (isSuccess && data) {
      setCertificateModal(false);
      setReviewModal(true);
      getDetails();
    }
  }, [isSuccess, data]);

  // -------------------------------------Certificate Update Success -----------------------------------

  useEffect(() => {
    if (updateSuccess && updateData) {
      setEditCertificateModal(false);
      setReviewModal(true);
      getDetails();
    }
  }, [updateSuccess, updateData]);

  // -------------------------------------Notification Success -----------------------------------

  useEffect(() => {
    if (notySuccess && notyData) {
      toast.success(notyData?.message);
      setOpen(false);
      getDetails();
    }
  }, [notySuccess, notyData]);

  // ------------------------------------get Notify data ------------------------------------
  useEffect(() => {
    if (detailsSuccess && detailsData) {
      setProfileDetails(detailsData?.data);
      setWeeklySummaryNoty(
        detailsData?.data?.weeklySummaryaboutLightforthNotify
      );
      setWeeklySummaryAccNoty(detailsData?.data?.weeklySummaryofAccountNotify);
      setnewEnrollmentNotify(detailsData?.data?.newEnrollmentNotify);
      setnewCommentNotify(detailsData?.data?.newCommentNotify);
      setcourseApprovalNotify(detailsData?.data?.courseApprovalNotify);
      setsomeoneLeftReviewNotify(detailsData?.data?.someoneLeftReviewNotify);
    }
  }, [detailsSuccess, detailsData]);

  // -------------------------------------Certificate Add Error -----------------------------------

  useEffect(() => {
    if (isError && error) {
      toast.error(error?.data?.message);
    }
  }, [isError, error]);

  // -------------------------------------Certificate update Error -----------------------------------

  useEffect(() => {
    if (updateError && error) {
      toast.error(error?.data?.message);
    }
  }, [updateError, error]);

  // -------------------------------------Password change Error -----------------------------------

  useEffect(() => {
    if (passError && ErrorData) {
      toast.error(ErrorData?.data?.message);
    }
  }, [passError, ErrorData]);

  // -------------------------------------Otp Verify Error -----------------------------------

  useEffect(() => {
    if (otpisError && otperror) {
      toast.error(otperror?.data?.message);
    }
  }, [otpisError, otperror]);
  // -------------------------------------Resend Otp Verify Error -----------------------------------

  useEffect(() => {
    if (resendotpisError && resendotperror) {
      toast.error(resendotperror?.data?.message);
    }
  }, [resendotpisError, resendotperror]);
  // ------------------------------------- Verify Password Error -----------------------------------

  useEffect(() => {
    if (virifyPassisError && errorvirifyPass) {
      toast.error(errorvirifyPass?.data?.message);
    }
  }, [virifyPassisError, errorvirifyPass]);
  return (
    <>
      <Grid className="instDashRight" item width={366}>
        <div className="profileRight">
          <div className="profileDetailsView">
            <div className="detailsView settingsListBlock">
              <p className="subTextOne fontWeight-700">Settings</p>
              <div className="detailsViewBlock">
                <Grid container>
                  <Grid item xs={12}>
                    <List disablePadding>
                      <ListItem
                        disablePadding
                        disableGutters
                        onClick={handleClickOpen}
                        secondaryAction={
                          <IconButton edge="end" aria-label="delete">
                            <KeyboardArrowRightIcon />
                          </IconButton>
                        }
                      >
                        <ListItemButton>
                          <ListItemIcon>
                            <img src={bellIcon} />
                          </ListItemIcon>
                          <ListItemText
                            primary="Notification Preferences"
                          />
                        </ListItemButton>
                      </ListItem>
                      <ListItem
                        disablePadding
                        disableGutters
                        secondaryAction={
                          <IconButton edge="end" aria-label="delete">
                            <KeyboardArrowRightIcon />
                          </IconButton>
                        }
                      >
                        <ListItemButton component="a" href="#simple-list">
                          <ListItemIcon>
                            <img src={paymentIcon} />
                          </ListItemIcon>
                          <ListItemText primary="Payment Settings" />
                        </ListItemButton>
                      </ListItem>
                      <ListItem
                        disablePadding
                        disableGutters
                        secondaryAction={
                          <IconButton edge="end" aria-label="delete">
                            <KeyboardArrowRightIcon />
                          </IconButton>
                        }
                        onClick={handleClickOpenchagepassModal}
                      >
                        <ListItemButton component="a" href="#simple-list">
                          <ListItemIcon>
                            <img src={passwordlockIcon} />
                          </ListItemIcon>
                          <ListItemText primary="Change Password" />
                        </ListItemButton>
                      </ListItem>
                    </List>
                  </Grid>
                </Grid>
              </div>
            </div>
            {/* <div className="profileDetailsViewScroll"> */}
            <div className="detailsView pd-right-22">
              <p className="subTextOne fontWeight-700">Uploaded CV</p>
              <div className="profileDetailsViewScroll">
                {profileDetails?.cvLink && (
                  <div className="detailsViewBlock">
                    <Grid container>
                      <Grid item>
                        <List disablePadding>
                          <ListItem disablePadding disableGutters>
                            <Avatar>
                              <img src={pdfIcon} alt="pdf-icon" />
                            </Avatar>
                            <ListItemText
                              primary={profileDetails?.cvName}
                              secondary={
                                bytesToKB(profileDetails?.cvSize) + "kb"
                              }
                            />
                          </ListItem>
                        </List>
                      </Grid>
                    </Grid>
                    <Grid container justifyContent={"flex-end"} columnGap={1}>
                      <IconButton onClick={handleClickEditCvOpen}>
                        <img src={editIcon} alt="edit-icon" />
                      </IconButton>
                      <IconButton
                        onClick={() => handleCVlickOpen(profileDetails?.cvLink)}
                      >
                        <img src={eyeIcon} alt="eye-icon" />
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          handleDownload(profileDetails?.cvLink);
                        }}
                      >
                        <img src={documentDownloadIcon} alt="eye-icon" />
                      </IconButton>
                    </Grid>
                  </div>
                )}
                {profileDetails?.instructorCv?.map((it, ind) => {
                  return (
                    <div className="detailsViewBlock" key={ind}>
                      <Grid container>
                        <Grid item>
                          <List disablePadding>
                            <ListItem disablePadding disableGutters>
                              <Avatar>
                                <img src={pdfIcon} alt="pdf-icon" />
                              </Avatar>
                              <ListItemText
                                primary={it?.cvName}
                                secondary={bytesToKB(it?.cvSize) + "kb"}
                              />
                            </ListItem>
                          </List>
                        </Grid>
                      </Grid>
                      <Grid container justifyContent={"space-between"}>
                        <Grid item>
                          {it?.isApproved == "PENDING" && (
                            <IconButton>
                              <img src={pendingIcon} alt="edit-icon" />
                            </IconButton>
                          )}
                          {it?.isApproved == "REJECTED" && (
                            <IconButton>
                              <img
                                src={RejectedIcon}
                                style={{ height: "20px", width: "20px" }}
                                alt="edit-icon"
                              />
                            </IconButton>
                          )}
                        </Grid>
                        <Grid item>
                          <Grid
                            item
                            container
                            justifyContent={"flex-end"}
                            columnGap={1}
                          >
                            {it?.isApproved == "REJECTED" && (
                              <IconButton
                                onClick={() => handleDeleteCv(it?.cvUniqueid)}
                              >
                                <img src={deleteIcon} alt="eye-icon" />
                              </IconButton>
                            )}
                            <IconButton
                              onClick={() => handleCVlickOpen(it?.cvLink)}
                            >
                              <img src={eyeIcon} alt="eye-icon" />
                            </IconButton>
                            <IconButton
                              onClick={() => {
                                handleDownload(it?.cvLink);
                              }}
                            >
                              <img src={documentDownloadIcon} alt="eye-icon" />
                            </IconButton>
                          </Grid>
                        </Grid>
                      </Grid>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="detailsView pd-right-22">
              <p className="subTextOne fontWeight-700">Uploaded Certificates</p>
              <div className="profileDetailsViewScroll">
                {profileDetails?.instructorCertificate?.map((e, index) => {
                  return (
                    <div className="detailsViewBlock" key={index}>
                      <Grid container>
                        <Grid item>
                          <List disablePadding>
                            <ListItem disableGutters>
                              <Avatar>
                                <img src={pdfIcon} alt="pdf-icon" />
                              </Avatar>
                              <ListItemText
                                primary={e?.title}
                                secondary={bytesToKB(e?.certificateSize) + "kb"}
                              />
                            </ListItem>
                          </List>
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        className="CertificatesInfo"
                        justifyContent={"space-between"}
                        sx={{ padding: "0 0 10px 50px" }}
                      >
                        <Grid item>
                          <p className="subTextOne">{e?.category}</p>
                        </Grid>
                        <Grid item>
                          <p className="subTextOne">
                            Year: {moment(e?.date).format("YYYY")}
                          </p>
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        className="CertificatesInfo"
                        sx={{ padding: "0 0 10px 50px" }}
                      >
                        <Grid item>
                          <p className="subTextOne mb-0">
                            Cert. No: {e?.certificateNo}
                          </p>
                          <p className="subTextOne mb-0">Issuer: {e?.issuer}</p>
                        </Grid>
                      </Grid>
                      <Grid container justifyContent={"space-between"}>
                        <Grid item>
                          {e?.isApproved == "PENDING" && (
                            <IconButton>
                              <img src={pendingIcon} alt="edit-icon" />
                            </IconButton>
                          )}
                          {e?.isApproved == "REJECTED" && (
                            <IconButton>
                              <img
                                src={RejectedIcon}
                                style={{ height: "20px", width: "20px" }}
                                alt="edit-icon"
                              />
                            </IconButton>
                          )}
                        </Grid>
                        <Grid item>
                          <Grid
                            container
                            justifyContent={"flex-end"}
                            columnGap={1}
                          >
                            {/* <IconButton>
                              <img src={deleteIcon} alt="eye-icon" />
                            </IconButton> */}
                            <IconButton
                              onClick={() => {
                                console.log("e", e);
                                setEditCertificateModal(true);
                                setSingleCert(e);
                              }}
                            >
                              <img src={editIcon} alt="edit-icon" />
                            </IconButton>
                            <IconButton
                              onClick={() => {
                                handleCVlickOpen(e?.certificateLink);
                              }}
                            >
                              <img src={eyeIcon} alt="eye-icon" />
                            </IconButton>
                            <IconButton
                              onClick={() => {
                                handleDownload(e?.certificateLink);
                              }}
                            >
                              <img src={documentDownloadIcon} alt="eye-icon" />
                            </IconButton>
                          </Grid>
                        </Grid>
                      </Grid>
                    </div>
                  );
                })}
              </div>
              <div className="addDivBtn">
                <Button
                  color="primary"
                  onClick={() => {
                    setCertificateModal(true);
                    setFormData([]);
                  }}
                >
                  Add More <AddCircleOutlineRoundedIcon fontSize="small" />
                </Button>
              </div>
            </div>
            {/* </div> */}
            <div className="detailsView">
              <p className="subTextOne fontWeight-700">Account Info</p>
              <div className="profileAccountInfo">
                <div className="profileAccountInfoBlock">
                  <p className="subTextTwo">
                    {moment(profileDetails?.createdAt).format("Do MMMM YYYY")}
                  </p>
                  <p className="smallText">User Creation Date</p>
                </div>
                <div className="profileAccountInfoBlock">
                  <p className="subTextTwo">
                    {moment(profileDetails?.lastLogin).format("Do MMMM YYYY")} |{" "}
                    {moment(profileDetails?.lastLogin).format("h:mm a")}
                  </p>
                  <p className="smallText">Last Login Date</p>
                </div>
              </div>
            </div>
            <Grid
              item
              container
              paddingLeft={"30px"}
              className="disableAccountBtn"
            >
              <Grid item>
                <Button
                  color="error"
                  onClick={() => setOpenDeactiveModal(true)}
                >
                  <img src={polyCloseIcon} />
                  &nbsp; Deactivate Account
                </Button>
              </Grid>
            </Grid>
          </div>
        </div>
      </Grid>
      {/* -------------------Edit Certificate Modal ------------------------- */}
      <Dialog
        open={editcertificatemodal}
        onClose={() => setEditCertificateModal(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="sm"
        className="modalOne uploadCertificateModal"
      >
        <DialogTitle id="alert-dialog-title">
          <Grid
            container
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Grid item>
              <p className="mainText fontWeight-700">Edit Certificate</p>
            </Grid>
            <Grid item>
              <Button
                className="modalClose"
                onClick={() => setEditCertificateModal(false)}
              >
                <CloseIcon />
              </Button>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <Grid container>
            <Grid item xs={12}>
              <Box className="formGroup">
                <label className="formlabel">Title</label>
                <input
                  type="text"
                  name="title"
                  className={`form-control ${
                    singleCert.titleErr ? "errField" : ""
                  }`}
                  placeholder="Type Here"
                  value={singleCert?.title}
                  onChange={(_event) => handelChange(_event)}
                />
                <p className="errorMsg">{singleCert?.titleErrMsg}</p>
              </Box>
            </Grid>
            <Grid item xs={12}>
              {singleCert?.certificateLink == "" ? (
                <div className="formGroup">
                  <label className="formlabel">Upload Certificate(s)</label>
                  <div className="fileUploadTwo">
                    <input
                      type="file"
                      name="certificate"
                      multiple={false}
                      accept=".pdf"
                      ref={fileInputRef}
                      onChange={(val) => handleFileUpload(val.target.files[0])}
                    />

                    <p className="subTextOne fontWeight-700">
                      Drop one or more file(s) here or <span>browse</span>
                    </p>
                    <p className="subTextTwo">Max. File Size: 20MB</p>
                  </div>
                </div>
              ) : null}
              {singleCert?.certificateLink != "" ? (
                <div className="uploadView">
                  <div className="uploadViewInner">
                    <Grid container justifyContent={"space-between"}>
                      <Grid item>
                        <p className="subTextOne fontWeight-700">
                          Uploading: <span>{singleCert?.certificateName}</span>
                        </p>
                      </Grid>
                      <Grid item>
                        <p className="subTextTwo fontWeight-300">100%</p>
                      </Grid>
                    </Grid>

                    <LinearProgress
                      variant="determinate"
                      value={100}
                      max="100"
                    />
                    <button
                      type="button"
                      className="fileDlt"
                      onClick={() =>
                        setSingleCert((prev) => {
                          let data = { ...prev };
                          data.certificateLink = "";
                          data.certificateName = "";
                          data.ertificateSize = "";
                          return data;
                        })
                      }
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <g opacity="0.2" clipPath="url(#clip0_1428_66983)">
                          <path
                            d="M12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22ZM12 10.586L9.172 7.757L7.757 9.172L10.586 12L7.757 14.828L9.172 16.243L12 13.414L14.828 16.243L16.243 14.828L13.414 12L16.243 9.172L14.828 7.757L12 10.586Z"
                            fill="#3F3F44"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_1428_66983">
                            <rect width="24" height="24" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </button>
                  </div>

                  <Grid container className="fileViewDetails">
                    <p className="subTextOne fontWeight-700">
                      {singleCert?.name}
                    </p>
                    <Grid item container justifyContent={"space-between"}>
                      <Grid item>
                        <p className="subTextOne">
                          Category: {singleCert?.category}
                        </p>
                      </Grid>
                      <Grid item>
                        <p className="subTextOne">
                          Year: {moment(singleCert?.date).format("YYYY")}
                        </p>
                      </Grid>
                    </Grid>
                    <Grid item container justifyContent={"space-between"}>
                      <Grid item>
                        <p className="subTextOne">
                          Issuer: {singleCert?.issuer}
                        </p>
                      </Grid>
                      <Grid item>
                        <p className="subTextOne">
                          Cert. No: {singleCert?.certificateNo}
                        </p>
                      </Grid>
                    </Grid>
                  </Grid>
                </div>
              ) : null}
              <p className="errorMsg">{singleCert?.certificateLinkErrMsg}</p>
            </Grid>
            <Grid item xs={12}>
              <Grid item container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Box className="formGroup mb-0">
                    <input
                      type="date"
                      className={`form-control ${
                        singleCert.dateErr ? "errField" : ""
                      }`}
                      name="date"
                      placeholder="Date"
                      max={getCurrentDate()}
                      value={formatDate(singleCert?.date)}
                      onChange={(_event) => handelChange(_event)}
                    />
                    <p className="errorMsg">{singleCert?.dateErrMsg}</p>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box className="formGroup mb-0">
                    <select
                      className={`form-control ${
                        singleCert.categoryErr ? "errField" : ""
                      }`}
                      name="category"
                      value={singleCert?.category}
                      onChange={(_event) => handelChange(_event)}
                    >
                      <option value={"Professional Certificate"}>
                        Professional Certificate
                      </option>
                      <option value={"Academic Certificate"}>
                        Academic Certificate
                      </option>
                      <option value={"Teaching Certificate"}>
                        Teaching Certificate
                      </option>
                      <option value={"Industry-Specific Certificate"}>
                        Industry-Specific Certificate
                      </option>
                      <option value={"STEM Education Certificate"}>
                        STEM Education Certificate
                      </option>
                      <option value={"Special Education Certificate"}>
                        Special Education Certificate
                      </option>
                      <option value={"Business & Leadership Certificate"}>
                        Business & Leadership Certificate
                      </option>
                      <option value={"Creative & Performing Arts Certificate"}>
                        Creative & Performing Arts Certificate
                      </option>
                    </select>
                    <p className="errorMsg">{singleCert?.categoryErrMsg}</p>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box className="formGroup mb-0">
                    <input
                      type="text"
                      name="issuer"
                      className={`form-control ${
                        singleCert.issuerErr ? "errField" : ""
                      }`}
                      placeholder="Issuer"
                      value={singleCert?.issuer}
                      onChange={(_event) => handelChange(_event)}
                    />
                    <p className="errorMsg">{singleCert?.issuerErrMsg}</p>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box className="formGroup mb-0">
                    <input
                      type="text"
                      name="certificateNo"
                      className={`form-control ${
                        singleCert.certificateNoErr ? "errField" : ""
                      }`}
                      placeholder="Cert. No"
                      value={singleCert?.certificateNo}
                      onChange={(_event) => handelChange(_event)}
                    />
                    <p className="errorMsg">
                      {singleCert?.certificateNoErrMsg}
                    </p>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <button
            className="lightBtn fullWidth"
            onClick={handleUpdateCertificate}
            disabled={updateLoading}
          >
            Save
          </button>
        </DialogActions>
      </Dialog>
      {/* ------------------------Edit Modal Close -------------------- */}
      <Dialog
        open={certificatemodal}
        onClose={() => setCertificateModal(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="sm"
        className="modalOne uploadCertificateModal"
      >
        <DialogTitle id="alert-dialog-title">
          <Grid
            container
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Grid item>
              <p className="mainText fontWeight-700">Upload Certificate</p>
            </Grid>
            <Grid item>
              <Button
                className="modalClose"
                onClick={() => setCertificateModal(false)}
              >
                <CloseIcon />
              </Button>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <Grid container>
            <Grid item xs={12}>
              <div className="col-12">
                <div className="formGroup">
                  <label className="formlabel">Upload Certificate(s)</label>
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
                      Drop one or more file(s) here or <span>browse</span>
                    </p>
                    <p className="subTextTwo">Max. File Size: 20MB</p>
                  </div>
                  {formDataErrMsg == "Certificate is required" && (
                    <p className="errorMsg">{formDataErrMsg}</p>
                  )}
                </div>
                {formData && formData.length > 0
                  ? formData?.map((item, index) => {
                      return (
                        <>
                          <div className="uploadView" key={index}>
                            <div className="uploadViewInner">
                              <Grid container justifyContent={"space-between"}>
                                <Grid item>
                                  <p className="subTextOne fontWeight-700">
                                    Uploading: <span>{item?.imgName}</span>
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
                                    return JSON.parse(JSON.stringify(data));
                                  });
                                }}
                              >
                                <img src={closefillcircle} />
                              </button>
                            </div>
                            {item?.DocShow && (
                              <Grid container className="fileViewDetails">
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
                                      Year: {moment(item?.date).format("YYYY")}
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
                                      Cert. No: {item?.certificateNo}
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
                                        item?.titleErr ? "errField" : ""
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
                                        item?.dateErr ? "errField" : ""
                                      }`}
                                      name="date"
                                      placeholder="Date"
                                      max={getCurrentDate()}
                                      value={item?.date}
                                      onChange={(e) => {
                                        const selectedDate = e.target.value;
                                        if (isFutureDate(selectedDate)) {
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
                                          item?.categoryErr ? "errField" : ""
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
                                          value={"Professional Certificate"}
                                        >
                                          Professional Certificate
                                        </option>
                                        <option value={"Academic Certificate"}>
                                          Academic Certificate
                                        </option>
                                        <option value={"Teaching Certificate"}>
                                          Teaching Certificate
                                        </option>
                                        <option
                                          value={
                                            "Industry-Specific Certificate"
                                          }
                                        >
                                          Industry-Specific Certificate
                                        </option>
                                        <option
                                          value={"STEM Education Certificate"}
                                        >
                                          STEM Education Certificate
                                        </option>
                                        <option
                                          value={
                                            "Special Education Certificate"
                                          }
                                        >
                                          Special Education Certificate
                                        </option>
                                        <option
                                          value={
                                            "Business & Leadership Certificate"
                                          }
                                        >
                                          Business & Leadership Certificate
                                        </option>
                                        <option
                                          value={
                                            "Creative & Performing Arts Certificate"
                                          }
                                        >
                                          Creative & Performing Arts Certificate
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
                                        item?.issuerErr ? "errField" : ""
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
                                        item?.certificateNoErr ? "errField" : ""
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
            </Grid>
          </Grid>
        </DialogContent>
        {formDataErrMsg != "Certificate is required" && (
          <p className="errorMsg" style={{ paddingLeft: "35px" }}>
            {formDataErrMsg}
          </p>
        )}
        <DialogActions>
          <button className="lightBtn fullWidth" onClick={handleAddCertificate}>
            Save
          </button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="sm"
        className="modalOne notificationsSettingModal"
      >
        <DialogTitle id="alert-dialog-title">
          <Grid
            container
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Grid item>
              <p className="mainText fontWeight-700">Notifications</p>
            </Grid>
            <Grid item>
              <Button className="modalClose" onClick={handleClose}>
                <CloseIcon />
              </Button>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <Grid container flexDirection={"column"} rowGap={"30px"}>
            <Grid item xs={12}>
              <Grid item container flexDirection={"column"} rowGap={"18px"}>
                <Grid item xs={12}>
                  <p className="subTextTwo fontWeight-700">
                    Email Notifications
                  </p>
                </Grid>
                <Grid item xs={12}>
                  <Grid
                    item
                    container
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
                    <Grid item xs={9} sm={7}>
                      <p className="subTextTwo fontWeight-500">
                        Weekly newsletter to update you about LightForth
                        products and offers
                      </p>
                    </Grid>
                    {/* <Switch
                      {...label}
                      checked={weeklySummaryNoty}
                      value={weeklySummaryNoty}
                      onChange={() => setWeeklySummaryNoty(!weeklySummaryNoty)}
                    /> */}
                    <Grid item xs={3} sm={5} textAlign={"right"}>
                      <FormControlLabel
                        sx={{ marginRight: 0 }}
                        control={
                          <BigSwitch
                            {...label}
                            checked={weeklySummaryNoty}
                            value={weeklySummaryNoty}
                            onChange={() =>
                              setWeeklySummaryNoty(!weeklySummaryNoty)
                            }
                          />
                        }
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid
                    item
                    container
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
                    <Grid item xs={9} sm={7}>
                      <p className="subTextTwo fontWeight-500">
                        A weekly summary of your account
                      </p>
                    </Grid>
                    {/* <Switch
                      {...label}
                      checked={weeklySummaryAccNoty}
                      value={weeklySummaryAccNoty}
                      onChange={() =>
                        setWeeklySummaryAccNoty(!weeklySummaryAccNoty)
                      }
                    /> */}
                    <Grid item xs={3} sm={5} textAlign={"right"}>
                      <FormControlLabel
                        sx={{ marginRight: 0 }}
                        control={
                          <BigSwitch
                            {...label}
                            checked={weeklySummaryAccNoty}
                            value={weeklySummaryAccNoty}
                            onChange={() =>
                              setWeeklySummaryAccNoty(!weeklySummaryAccNoty)
                            }
                          />
                        }
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid item container flexDirection={"column"} rowGap={"18px"}>
                <Grid item xs={12}>
                  <p className="subTextTwo fontWeight-700">Web Notifications</p>
                </Grid>
                <Grid item xs={12}>
                  <Grid item container alignItems={"center"} rowGap={"12px"}>
                    <Grid item xs={12}>
                      <div className="lightforthCheckbox">
                        <div className="mainCheck">
                          <input
                            type="checkbox"
                            checked={newEnrollmentNotify}
                            onChange={() =>
                              setnewEnrollmentNotify(!newEnrollmentNotify)
                            }
                          />
                          <span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="14"
                              height="14"
                              viewBox="0 0 14 14"
                              fill="none"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M11.4711 3.86714C11.7314 4.12749 11.7314 4.5496 11.4711 4.80995L6.13775 10.1433C5.8774 10.4036 5.45529 10.4036 5.19494 10.1433L2.52827 7.47661C2.26792 7.21626 2.26792 6.79415 2.52827 6.5338C2.78862 6.27345 3.21073 6.27345 3.47108 6.5338L5.66634 8.72907L10.5283 3.86714C10.7886 3.60679 11.2107 3.60679 11.4711 3.86714Z"
                                fill="white"
                              />
                            </svg>
                          </span>
                        </div>
                        <label>New enrollment</label>
                      </div>
                    </Grid>
                    <Grid item xs={12}>
                      <div className="lightforthCheckbox">
                        <div className="mainCheck">
                          <input
                            type="checkbox"
                            checked={newCommentNotify}
                            onChange={() =>
                              setnewCommentNotify(!newCommentNotify)
                            }
                          />
                          <span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="14"
                              height="14"
                              viewBox="0 0 14 14"
                              fill="none"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M11.4711 3.86714C11.7314 4.12749 11.7314 4.5496 11.4711 4.80995L6.13775 10.1433C5.8774 10.4036 5.45529 10.4036 5.19494 10.1433L2.52827 7.47661C2.26792 7.21626 2.26792 6.79415 2.52827 6.5338C2.78862 6.27345 3.21073 6.27345 3.47108 6.5338L5.66634 8.72907L10.5283 3.86714C10.7886 3.60679 11.2107 3.60679 11.4711 3.86714Z"
                                fill="white"
                              />
                            </svg>
                          </span>
                        </div>
                        <label>New comment</label>
                      </div>
                    </Grid>
                    <Grid item xs={12}>
                      <div className="lightforthCheckbox">
                        <div className="mainCheck">
                          <input
                            type="checkbox"
                            checked={courseApprovalNotify}
                            onChange={() =>
                              setcourseApprovalNotify(!courseApprovalNotify)
                            }
                          />
                          <span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="14"
                              height="14"
                              viewBox="0 0 14 14"
                              fill="none"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M11.4711 3.86714C11.7314 4.12749 11.7314 4.5496 11.4711 4.80995L6.13775 10.1433C5.8774 10.4036 5.45529 10.4036 5.19494 10.1433L2.52827 7.47661C2.26792 7.21626 2.26792 6.79415 2.52827 6.5338C2.78862 6.27345 3.21073 6.27345 3.47108 6.5338L5.66634 8.72907L10.5283 3.86714C10.7886 3.60679 11.2107 3.60679 11.4711 3.86714Z"
                                fill="white"
                              />
                            </svg>
                          </span>
                        </div>
                        <label>Course approval</label>
                      </div>
                    </Grid>
                    <Grid item xs={12}>
                      <div className="lightforthCheckbox">
                        <div className="mainCheck">
                          <input
                            type="checkbox"
                            checked={someoneLeftReviewNotify}
                            onChange={() =>
                              setsomeoneLeftReviewNotify(
                                !someoneLeftReviewNotify
                              )
                            }
                          />
                          <span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="14"
                              height="14"
                              viewBox="0 0 14 14"
                              fill="none"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M11.4711 3.86714C11.7314 4.12749 11.7314 4.5496 11.4711 4.80995L6.13775 10.1433C5.8774 10.4036 5.45529 10.4036 5.19494 10.1433L2.52827 7.47661C2.26792 7.21626 2.26792 6.79415 2.52827 6.5338C2.78862 6.27345 3.21073 6.27345 3.47108 6.5338L5.66634 8.72907L10.5283 3.86714C10.7886 3.60679 11.2107 3.60679 11.4711 3.86714Z"
                                fill="white"
                              />
                            </svg>
                          </span>
                        </div>
                        <label>Someone left a review</label>
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Grid container justifyContent={"flex-start"} columnGap={"20px"}>
            <button className="lightBtn" onClick={handleNotification}>
              Save
            </button>
            <button className="normalBtn" onClick={() => setOpen(false)}>
              Cancel
            </button>
          </Grid>
        </DialogActions>
      </Dialog>

      <Dialog
        open={cvopen.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseCV}
        aria-describedby="alert-dialog-slide-description"
        className="pdfViewModal"
      >
        <DialogTitle>
          <p className="mainText fontWeight-700">File.pdf</p>

          <Button onClick={handleCloseCV}>
            <CloseIcon />
          </Button>
        </DialogTitle>
        <DialogContent>
          <div className="pdfViewBlock">
            <Document file={cvopen.link} onLoadSuccess={onDocumentLoadSuccess}>
              <Page pageNumber={pageNumber} />
            </Document>
          </div>
          <Grid
            container
            className="pageNumberBlock"
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Button
              onClick={() => {
                handelPageChange("dec");
              }}
            >
              <WestIcon />
            </Button>{" "}
            {pageNumber} of {numPages}{" "}
            <Button
              onClick={() => {
                handelPageChange("inc");
              }}
            >
              <EastIcon />
            </Button>
          </Grid>
          <Grid container justifyContent={"center"}>
            <p>
              {pageNumber}
              {/* of {numPages} */}
            </p>
            <button
              className="lightBtn fullWidth"
              onClick={() => handleDownload(cvopen.link)}
            >
              Download
            </button>
          </Grid>
        </DialogContent>
      </Dialog>

      <Dialog
        open={openEditCvModal}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseEditCV}
        aria-describedby="alert-dialog-slide-description"
        className="modalOne"
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          <Grid
            container
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Grid item>
              <p className="mainText fontWeight-700">Edit CV</p>
            </Grid>
            <Grid item>
              <Button className="modalClose" onClick={handleCloseEditCV}>
                <CloseIcon />
              </Button>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {cvLink.length == 0 ? (
                <div className="fileUploadTwo">
                  <input
                    type="file"
                    name="certificate"
                    multiple={false}
                    accept=".pdf"
                    ref={cvRef}
                    onChange={(val) =>
                      handlemultiFileUploadCvLink(val.target.files)
                    }
                  />
                  <p className="subTextOne fontWeight-700">
                    Drop one file here or <span>browse</span>
                  </p>
                  <p className="subTextTwo">Max. File Size: 2MB</p>
                </div>
              ) : null}

              <p className="errorMsg">{cvLinkErrMsg}</p>
            </Grid>
            <Grid item xs={12}>
              <label className="formlabel">Reason for Change</label>
              <textarea
                className="form-control"
                placeholder="Type Here"
                style={{ height: "100px" }}
                value={cvreason}
                onChange={(val) => setCvreason(val.target.value)}
              ></textarea>
              <p className="errorMsg">{cvreasonerr}</p>
            </Grid>
            <Grid item xs={12}>
              {cvLink.length > 0
                ? cvLink?.map((item, index) => {
                    return (
                      <div
                        className="uploadView uploadViewTwo mb-0"
                        key={index}
                      >
                        <div className="uploadViewInner">
                          <Grid container justifyContent={"space-between"}>
                            <Grid item>
                              <p className="subTextOne fontWeight-700">
                                {item.progress === 100
                                  ? "Uploaded"
                                  : "Uploading"}{" "}
                                <span>{item?.imgName}</span>
                              </p>
                            </Grid>
                            <Grid item>
                              <Grid item container columnGap={2}>
                                {/* <p className="subTextTwo">{25}%</p> */}
                                <p className="subTextTwo opacity-50">
                                  {item.progress}%
                                </p>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid container paddingRight={"70px"}>
                            <Grid item xs={12}>
                              <LinearProgress
                                variant="determinate"
                                value={item.progress}
                                max="100"
                              />
                            </Grid>
                          </Grid>
                          {/* <button type="button" className="filePlayPause">
                            <PlayArrowIcon />
                            <PauseIcon />
                          </button> */}
                          <button
                            type="button"
                            className="fileDlt"
                            onClick={() => {
                              setCvLink((prev) => {
                                let data = [...prev];
                                data.splice(index, 1);
                                return JSON.parse(JSON.stringify(data));
                              });
                            }}
                          >
                            <img src={closefillcircle} />
                          </button>
                        </div>
                      </div>
                    );
                  })
                : null}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <button className="lightBtn fullWidth" onClick={handleEditCv}>
            Save
          </button>
        </DialogActions>
      </Dialog>

      <PermitionDialoug
        handleOpenModal={disablemodal}
        handleCloseModal={disablemodalClose}
        handelOnConfirm={() => handleDisableAcc()}
        title="Are you sure you want to deactivate your account?"
      />

      <Dialog
        open={openchangepassModal}
        onClose={handleClosechangepassModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="sm"
        className="modalOne"
      >
        <DialogTitle id="alert-dialog-title">
          <Grid container justifyContent={"space-between"}>
            <Grid item>
              <p className="mainText fontWeight-700">Change Password</p>
            </Grid>
            <Grid item>
              <Button
                className="modalClose"
                onClick={handleClosechangepassModal}
              >
                <CloseIcon />
              </Button>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <label className="formlabel">Current Password</label>
              <div className="inputGroup positionRight">
                <input
                  type={oldPasswordView ? "text" : "password"}
                  className={`form-control ${
                    passwordData.oldpasswordErr ? "errField" : ""
                  }`}
                  placeholder="Enter your pssword"
                  value={passwordData.oldpassword}
                  name="oldpassword"
                  onChange={(_event) => {
                    handelChangePassdata(_event);
                  }}
                />
                <button
                  type="button"
                  className="inputGroupRight"
                  onClick={() => {
                    setOldPasswordView(!oldPasswordView);
                  }}
                >
                  <img
                    src={oldPasswordView ? eyeOpen : eyeClose}
                    alt="eye-close"
                  />
                </button>
                <p className="errorMsg">{passwordData?.oldpasswordErrMsg}</p>
              </div>
            </Grid>
            <Grid item xs={12}>
              <label className="formlabel">New Password</label>
              <div className="inputGroup positionRight">
                <input
                  type={passwordView ? "text" : "password"}
                  className={`form-control ${
                    passwordData.passwordErr ? "errField" : ""
                  }`}
                  placeholder="Enter your pssword"
                  value={passwordData.password}
                  name="password"
                  onChange={(_event) => {
                    // handelChangePassdata(_event);
                    handlePasswordChange(_event);
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
                {/* <p className="errorMsg">{passwordData?.passwordErrMsg}</p> */}
                {passwordData.passwordErr && (
                  <p className="errorMsg">{passwordData.passwordErrMsg}</p>
                )}
              </div>
            </Grid>
            <Grid item xs={12}>
              <label className="formlabel">Confirm New Password</label>
              <div className="inputGroup positionRight">
                <input
                  type={confirmPasswordView ? "text" : "password"}
                  className={`form-control ${
                    passwordData.confirmPasswordErr ? "errField" : ""
                  }`}
                  placeholder="Enter your pssword"
                  value={passwordData.confirmPassword}
                  name="confirmPassword"
                  disabled={passwordData.passwordErr || !passwordData.password}
                  onChange={(_event) => {
                    handelChangePassdata(_event);
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
                  {passwordData?.confirmPasswordErrMsg}
                </p>
              </div>
            </Grid>
            <Grid item xs={12}>
              <button
                className="lightBtn fullWidth"
                type="submit"
                onClick={handleChangePass}
              >
                Change Password
              </button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>

      {/* Deactive Modal */}
      <Dialog
        open={openDeactiveModal}
        keepMounted
        onClose={handleCloseDeactiveModal}
        aria-describedby="alert-dialog-slide-description"
        className="deActiveModal"
      >
        <DialogTitle>
          <Button onClick={handleCloseDeactiveModal}>
            <CloseIcon />
          </Button>
        </DialogTitle>
        <DialogContent>
          <Box className="contentBlock">
            <p className="subTextOne mb-20">
              You must provide your password before we can deactivate your
              account
            </p>

            <Grid item xs={12}>
              <label className="formlabel">Password</label>
              <div className="inputGroup positionRight">
                <input
                  type={showOldPIcon ? "text" : "password"}
                  placeholder="Enter your password"
                  className={`form-control ${
                    formPassword.oldPasswordErr ? "errField" : ""
                  }`}
                  name="oldPassword"
                  value={formPassword.oldPassword}
                  onChange={(_event) => {
                    handelChangePassword(_event, setFormPassword);
                  }}
                />
                <button
                  type="button"
                  className="inputGroupRight"
                  onClick={() => {
                    setshowOldPIcon(!showOldPIcon);
                  }}
                >
                  <img
                    src={showOldPIcon ? eyeOpen : eyeClose}
                    //   src={eyeOpen}
                    alt="eye-close"
                  />
                </button>
                <p className="errorMsg">{formPassword?.oldPasswordErrMsg}</p>
              </div>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleDeactivate();
            }}
            className="subTextOne fontWeight-500 fullWidth"
          >
            Deactivate
          </Button>
        </DialogActions>
      </Dialog>

      {/* Reactive Modal */}
      <Dialog
        open={afterDeactiveModal}
        keepMounted
        onClose={() => setAfterDeactiveModal(false)}
        aria-describedby="alert-dialog-slide-description"
        className="reactiveModal"
      >
        <DialogTitle>
          <Button onClick={() => setAfterDeactiveModal(false)}>
            <CloseIcon />
          </Button>
        </DialogTitle>
        <DialogContent>
          <Box className="imgBlock">
            <img src={infocircleIcon} />
          </Box>
          <Box className="contentBlock">
            <p className="subTextThree fontWeight-700 mb-2 txtCoution">
              Caution
            </p>
            <p className="subTextTwo txtMsg">
              Your account will be deactivated within 90 days, but logging in
              during this period will reactivate it.
            </p>
          </Box>
        </DialogContent>
        <DialogActions>
          <button
            onClick={() => {
              setAfterDeactiveModal(false);
            }}
            className="primaryBtn fullWidth"
          >
            OK
          </button>
        </DialogActions>
      </Dialog>
      {/* Enter OTP Modal */}
      <Dialog
        open={firstOtpModal}
        keepMounted
        onClose={() => setFirstOtpModal(false)}
        aria-describedby="alert-dialog-slide-description"
        className="reactiveModal"
      >
        <DialogTitle>
          <Button onClick={() => setFirstOtpModal(false)}>
            <CloseIcon />
          </Button>
        </DialogTitle>
        <DialogContent>
          <div className="resendImgBlock">
            <img src={resendImage} />
          </div>
          <div className="contentBlock">
            <h4 className="fontWeight-700">Your OTP has been sent!</h4>
            <p className="subTextOne resendtxtMsg">
              We have sent an OTP to{" "}
              <span className="d-block fontWeight-500">
                {profileDetails?.email}.
              </span>{" "}
              Please check your email.
            </p>
          </div>
        </DialogContent>
        <DialogActions>
          <button
            onClick={() => {
              setFirstOtpModal(false);
              setSecondOtpModal(true);
            }}
            className="primaryBtn fullWidth"
          >
            Next
          </button>
        </DialogActions>
      </Dialog>

      {/* OTP verify Modal */}
      <Dialog
        open={secondOtpModal}
        keepMounted
        onClose={() => setSecondOtpModal(false)}
        aria-describedby="alert-dialog-slide-description"
        className="reactiveModal"
      >
        <DialogTitle>
          <Button onClick={() => setSecondOtpModal(false)}>
            <CloseIcon />
          </Button>
        </DialogTitle>
        <DialogContent>
          <Box className="contentBlock" marginTop={2}>
            <p className="subTextOne mailTxt">
              Enter your code we have sent to your email{" "}
              <span className="d-block"> {profileDetails?.email}.</span>
            </p>

            <Grid
              container
              paddingLeft={2}
              paddingRight={2}
              // justifyContent={"space-between"}
            >
              <Grid item className="otpFildBox">
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
              </Grid>
              {/* <Grid item width={"56px"} height={"56px"} className="otpFildBox">
                <TextField variant="outlined" />
              </Grid>
              <Grid item width={"56px"} height={"56px"} className="otpFildBox">
                <TextField variant="outlined" />
              </Grid>
              <Grid item width={"56px"} height={"56px"} className="otpFildBox">
                <TextField variant="outlined" />
              </Grid> */}
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <button onClick={handleVerify} className="primaryBtn fullWidth">
            Verify
          </button>

          <p className="m-0">
            Didn’t receive the code?{" "}
            <button onClick={handleResendOtp}>Resend</button>
          </p>
        </DialogActions>
      </Dialog>

      {/* Successful Modal */}
      <Dialog
        open={passChangeSuccessModal}
        keepMounted
        onClose={() => setPassChangeSuccessModal(false)}
        aria-describedby="alert-dialog-slide-description"
        className="reactiveModal successModal"
      >
        <DialogContent>
          <Box className="imgBlock">
            <img src={successImage} />
          </Box>
          <Box className="contentBlock">
            <p className="mainText successtxtMsg">
              Hi {detailsData?.fullName} 👋, your password was reset
              successfully!
            </p>
          </Box>
        </DialogContent>
        <DialogActions>
          <button
            onClick={() => {
              handleLogout();
            }}
            className="primaryBtn fullWidth"
          >
            Login
          </button>
        </DialogActions>
      </Dialog>
      <SuccessDialog
        handleOpenModal={reviewmodal}
        type="review"
        handleCloseModal={reviewModalClose}
        title="Your certificate has been sent for review"
      />
      <SuccessDialog
        handleOpenModal={cvalertmodal}
        type="review"
        handleCloseModal={cvalertModalClose}
        title="Your cv has been sent for review"
      />
      <SuccessDialog
        handleOpenModal={successmodal}
        handleCloseModal={successmodalClose}
        title="Your changes have been saved!"
      />
    </>
  );
}

export default RightSideBar;
