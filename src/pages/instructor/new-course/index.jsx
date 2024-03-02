import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { AuthGuard } from "../../../guards/instructor/auth-guard";
import Seo from "@/components/common/seo";

import dashGraphIcon from "@/assets/images/dash-graph.svg";
import revenuLightIcon from "@/assets/images/revenu-light.svg";
import profileratingLightIcon from "@/assets/images/profile-rating-light.svg";
import studentLightIcon from "@/assets/images/studentIcon-light.svg";
import videoIcon from "@/assets/images/video-icon.svg";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Chip,
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
  ListItemAvatar,
  ListItemText,
  Menu,
  MenuItem,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  styled,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { items } from "../../../components/student/navbar-with-auth";
import AddIcon from "@mui/icons-material/Add";
import React from "react";
import { handelError } from "@/helpers/common";
import { ZodError } from "zod";
import eyeLightIcon from "@/assets/images/eye-light.svg";
import indonesiaFlag from "@/assets/images/indonesia.png";
import vietnamFlag from "@/assets/images/vietnam.png";
import usFlag from "@/assets/images/us.png";
import erningBg from "@/assets/images/erning-bg.svg";
import imgVectorIcon from "@/assets/images/img-vector.svg";
import penciloutlinepurpleIcon from "@/assets/images/pencil-outline-purple.svg";
import peneditIcon from "@/assets/images/pen-edit.svg";
import arrowsexpandIcon from "@/assets/images/arrows-expand.svg";
import videoplayercontrolsIcon from "@/assets/images/video-player-controls.svg";
import teacherHandbookBoxImg from "@/assets/images/teacherHandbookBoxImg.png";
import guideimgone from "@/assets/images/guide-img-one.png";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import CloseIcon from "@mui/icons-material/Close";
import Slider from "@mui/material/Slider";
import listparagraphdotscircle from "@/assets/images/list-paragraph-dots-circle.svg";
import listparagraphdotscircleGreyIcon from "@/assets/images/list-paragraph-dots-circle-grey.svg";
import listparagraphdotscircleone from "@/assets/images/list-paragraph-dots-circle-1.svg";
import truefalse from "@/assets/images/true-false.svg";
import listparagraphtexta from "@/assets/images/list-paragraph-text-a.svg";
import copypasteIcon from "@/assets/images/copy-paste-select-add-plus.svg";
import trashIcon from "@/assets/images/trash.svg";
import AWS from "aws-sdk";
import {
  useAddCourseMutation,
  useGetTopicMutation,
} from "../../../redux/api/instructor/courses";
import coverImg from "@/assets/images/Course-Cover-Image.png";
import editImg from "@/assets/images/edit-img.svg";

import "../../../assets/css/instructor-dashboard/style.css";
import "../../../assets/css/instructor-dashboard/responsive.css";
import { toast } from "react-toastify";
import {
  addCourseValidate,
  addLessonValidate,
  addTypeAnswerQuestionValidate,
  addBooleanQuestionValidate,
  addSingleQuestionValidate,
  addMultipleQuestionValidate,
  addQuizValidate,
} from "../../../validation/instructor/course";
import DragCard from "../../../components/common/DragCard";
import SuccessDialog from "../../../components/common/successDialog";

import PauseIcon from "@mui/icons-material/Pause";
import { v4 as uuidv4 } from "uuid";
import CourseGuidePanel from "../../../components/common/CourseGuidePanel";

const QUIZ_PASS_PERCENTAGE = 70;
const metaTags = [
  { name: "Metaname1", content: "content1" },
  { name: "Metaname2", content: "content2" },
];

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

export function Component() {
  const navigate = useNavigate();
  const fileInputRef = useRef();
  const fileInputRef2 = useRef();
  const [cvLink, setCvLink] = useState([]);
  const [cvLinkErrMsg, setCvLinkErr] = useState("");
  const [isFileMissing, setFileMIssing] = useState(false);

  const [
    addCourse,
    {
      isSuccess: isAddCourseSuccess,
      data: addCourseData,
      isError: isAddCourseError,
      error: addCourseError,
    },
  ] = useAddCourseMutation();

  const [
    getCourseTopics,
    {
      isSuccess: isGetCourseTopicSuccess,
      data: getCourseTopicData,
      isError: isGetCourseTopicError,
      error: getCourseTopicError,
    },
  ] = useGetTopicMutation();

  const [courseContent, setCourseContent] = useState([]);
  const [courseContentOrder, setCourseContentOrder] = useState([]);
  const [courseQuizes, setCourseQuizes] = useState([]);
  const [reviewmodal, setReviewModal] = useState(false);
  const [coverImageFileName, setCoverImageFileName] = useState(null);
  const [displayEnrolment, setDisplayEnrolment] = useState(false);
  const [isQuizQuestionTypeOpened, setQuizQuestionTypeOpened] = useState(false);
  const [quizQuestionType, setQuizQuestionType] = useState("");
  const [scqOptionsList, setScqOptionsList] = useState(2);
  const [scqOptionsListAnswers, setScqOptionsListAnswers] = useState({});
  const [mcqOptionsList, setMcqOptionsList] = useState(4);
  const [mcqOptionsListAnswers, setMcqOptionsListAnswers] = useState({});
  const [isEditingCourseContent, setEditingCourseContent] = useState(false);
  const [isChoosedQuestionType, setChoosedQuestionType] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [isEditQuizId, setEditQuizId] = useState(null);
  const [isLessonExist, setLessonExist] = useState(true);
  const [isCloseQuizClicked, setCloseQuizClicked] = useState(false);

  const [formData, setFormData] = useState({
    // Form fields
    title: "",
    titleErr: false,
    titleErrMsg: "",
    description: "",
    descriptionErr: false,
    descriptionErrMsg: "",
    coverImage: "",
    coverImageErr: false,
    coverImageErrMsg: "",
    language: "",
    languageErr: false,
    languageErrMsg: "",
    skillLevel: "",
    skillLevelErr: false,
    skillLevelErrMsg: "",
    price: "",
    priceErr: false,
    priceErrMsg: "",
    category: "",
    categoryErr: false,
    categoryErrMsg: "",
    displayCount: "",
    displayCountErr: false,
    displayCountErrMsg: "",
  });

  const [lessonFormData, setLessonFormData] = useState({
    // Lesson fields
    lessonId: "",
    lessonType: "",
    lessonTypeErr: false,
    lessonTypeErrMsg: "",
    lessonTitle: "",
    lessonTitleErr: false,
    lessonTitleErrMsg: "",
    lessonContent: "",
    lessonContentErr: false,
    lessonContentErrMsg: "",
    lessonUploadFile: [],
    lessonUploadFileErr: false,
    lessonUploadFileErrMsg: "",
  });

  const [quizFormData, setQuizFormData] = useState({
    quizId: "",
    quizTitle: "",
    quizTitleErr: false,
    quizTitleErrMsg: "",
    quizPassPercentage: null,
  });

  const [typeAnswerQuestionFormData, setTypeAnswerQuestionFormData] = useState({
    typeQId: "",
    typeQuestion: "",
    typeQuestionErr: false,
    typeQuestionErrMsg: "",
    typeAnswer: "",
    typeAnswerErr: false,
    typeAnswerErrMsg: "",
  });

  const [booleanQuestionFormData, setBooleanQuestionFormData] = useState({
    booleanId: "",
    booleanQuestion: "",
    booleanQuestionErr: false,
    booleanQuestionErrMsg: "",
    booleanAnswer: "",
    booleanAnswerErr: false,
    booleanAnswerErrMsg: "",
  });

  const [singleQuestionFormData, setSingleQuestionFormData] = useState({
    scqId: "",
    singleQuestion: "",
    singleQuestionErr: false,
    singleQuestionErrMsg: "",
    singleAnswer: [],
    singleAnswerErr: false,
    singleAnswerErrMsg: "",
    allSingleAnswerOptions: [],
  });

  const [multipleQuestionFormData, setMultipleQuestionFormData] = useState({
    mcqId: "",
    multipleQuestion: "",
    multipleQuestionErr: false,
    multipleQuestionErrMsg: "",
    multipleAnswer: [],
    multipleAnswerErr: false,
    multipleAnswerErrMsg: "",
    allMultipleAnswerOptions: [],
  });

  const [openLessonModal, setOpen] = React.useState(false);

  //Open Lesson Modal
  const handleClickOpenLessonModal = () => {
    setCvLink([]);
    setLessonFormData({
      lessonId: uuidv4(),
      lessonType: "",
      lessonTypeErr: false,
      lessonTypeErrMsg: "",
      lessonTitle: "",
      lessonTitleErr: false,
      lessonTitleErrMsg: "",
      lessonContent: "",
      lessonContentErr: false,
      lessonContentErrMsg: "",
      lessonUploadFile: [],
      lessonUploadFileErr: false,
      lessonUploadFileErrMsg: "",
    });
    setOpen(true);
  };

  //Close Lesson Modal
  const handleCloseLessonModal = () => {
    setOpen(false);
    setEditingCourseContent(false);
  };

  const [openQuizModal, setOpenQuiz] = React.useState(false);

  //Open Quiz Modal
  const handleClickOpenQuizModal = (editQuizValues = {}) => {
    setQuizFormData({
      quizId: editQuizValues?.quizId ?? isEditQuizId ?? uuidv4(),
      quizTitle: editQuizValues?.quizTitle ?? "",
      quizTitleErr: false,
      quizTitleErrMsg: "",
      quizPassPercentage: editQuizValues?.quizPassPercentage ?? null,
    });
    setOpenQuiz(true);
    setQuizQuestionTypeOpened(false);
    setQuizQuestionType("");
    setQuizQuestions([]);
  };

  //Open Quiz Modal
  const handleCloseQuizModal = (flag = false) => {
    setOpenQuiz(false);
    setQuizQuestionTypeOpened(false);
    setQuizQuestionType("");
    setChoosedQuestionType(false);
    setEditingCourseContent(false);
    setScqOptionsList(2);
    setScqOptionsListAnswers({});
    setMcqOptionsList(4);
    setMcqOptionsListAnswers({});
    setEditQuizId(null);
    if (flag) {
      setCloseQuizClicked(true);
    }
  };

  //Alert for Course form successful submission
  useEffect(() => {
    if (isAddCourseSuccess && addCourseData) {
      setReviewModal(true);
      toast.success(addCourseData?.message);
    }
  }, [addCourseData, isAddCourseSuccess]);

  //Alert for Course form unsuccessful submission
  useEffect(() => {
    if (isAddCourseError && addCourseError) {
      toast.error(addCourseError?.data?.message);
    }
  }, [isAddCourseError, addCourseError]);

  useEffect(() => {
    const sessContentToBeEditID = sessionStorage.getItem("contentToBeEditID");
    if (isCloseQuizClicked && isEditQuizId !== quizFormData?.quizId) {
      editCourseContent(sessContentToBeEditID ?? quizFormData?.quizId);
      sessionStorage.removeItem("contentToBeEditID");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseContent, isEditQuizId, quizFormData, isCloseQuizClicked]);

  useEffect(() => {
    getCourseTopics();
  }, []);

  //--------------------------------------------------------------------
  //-------------------------Uploading cover image----------------------
  function getOriginalname(data) {
    let arr = data?.split("/");
    let lent = Number(arr.length - 1);
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
    const s3 = new AWS.S3({
      accessKeyId: import.meta.env.VITE_S3_BUCKET_ACCESS_KEY,
      secretAccessKey: import.meta.env.VITE_S3_BUCKET_SECRET_KEY,
      region: "us-east-1",
    });
    console.log("s3",s3)

    const params = {
      Bucket: "lightfourthbucket",
      Key: `uploads/${file.name}`,
      Body: file,
      // ACL: 'public-read',
    };
    console.log("params",params)

    try {
      const response = await s3.upload(params).promise();
      console.log("response",response)

      let fileName = getOriginalname(response.Location);
      console.log("fileName",fileName)

      setCoverImageFileName(fileName);

      setFormData((prevData) => ({
        ...prevData,
        coverImage: response.Location,
        coverImageErr: false,
        coverImageErrMsg: "",
      }));
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleuploadImg = (file) => {
    if (file) {
      alert("ok")
      console.log("okk",file)

      handleFileUpload(file);
    }
  };
  console.log("coverImage",formData)

  //--------------------------------------------------------------------
  //-------------------------Uploading cover image----------------------

  //Removing cover image
  const handleRemoveCoverImage = () => {
    setCoverImageFileName(null);
    setFormData((prevData) => ({
      ...prevData,
      coverImage: "",
      coverImageErr: true,
      coverImageErrMsg: "Cover Picture is required",
    }));
  };

  //--------------------------------------------------------------------
  //------Uploading multiple Video & Document type lessons--------------
  //Uploading multiple Video or Document type lessons
  const handlemultiFileUploadCvLink = async (files) => {
    setFileMIssing(false);
    if (files.length > 0) {
      const documentMaxSize = 200 * 1024 * 1024; // 200 MB
      const videoMaxSize = 200 * 1024 * 1024; // 200 MB

      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        //DOCUMENT TYPE
        // Check file type for Document
        if (
          lessonFormData.lessonType === "document" &&
          (file.type.includes("webm") ||
            file.type.includes("mp4") ||
            file.type.includes("avi") ||
            file.type.includes("mkv") ||
            file.type.includes("gif") ||
            file.type.includes("avi") ||
            file.type.includes("wmv") ||
            file.type.includes("3gp"))
        ) {
          toast.error(`Audio & video files are not allowed`);
          fileInputRef2.current.value = null;
          return;
        }

        // Check file size for Document
        if (
          lessonFormData.lessonType === "document" &&
          file.size > documentMaxSize
        ) {
          toast.error(`Uploading file can not be more than 200 MB`);
          fileInputRef2.current.value = null;
          return;
        }

        //VIDEO TYPE
        // Check file type for Video
        if (
          lessonFormData.lessonType === "video" &&
          !file.type.includes("webm") &&
          !file.type.includes("mp4") &&
          !file.type.includes("avi") &&
          !file.type.includes("mkv") &&
          !file.type.includes("gif") &&
          !file.type.includes("avi") &&
          !file.type.includes("wmv") &&
          !file.type.includes("3gp")
        ) {
          toast.error(`Only video files are allowed`);
          fileInputRef2.current.value = null;
          return;
        }

        // Check file size for Video
        if (lessonFormData.lessonType === "video" && file.size > videoMaxSize) {
          toast.error(`Uploading file can not be more than 200 MB`);
          fileInputRef2.current.value = null;
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

    setCvLink((_prevState) => {
      const updatedState = [..._prevState, ...Arr];

      handelCheckCvLink(updatedState);

      return updatedState;
    });
  };

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
      setCvLinkErr("");
      return { link: response.Location, id: file.id };
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error;
    }
  };

  const handelCheckCvLink = async (updatedFiles) => {
    try {
      const updatedFiles2 = updatedFiles?.filter((e) => e.progress == 0);
      const s3 = new AWS.S3({
        accessKeyId: import.meta.env.VITE_S3_BUCKET_ACCESS_KEY,
        secretAccessKey: import.meta.env.VITE_S3_BUCKET_SECRET_KEY,
        region: "us-east-1",
      });

      const uploadPromises = updatedFiles2.map(async (file, index) => {
        return await fileuploadOneByOneCvLink(file, s3, index);
      });

      const uploadedFileLocations = await Promise.all(uploadPromises);
      fileInputRef2.current.value = null;
      const lessonFiles = [];
      uploadedFileLocations?.forEach(async (element) => {
        if (element) {
          lessonFiles.push(element.link);
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

      //Update lesson form data
      if (cvLink.length > 0) {
        cvLink.map((item) => {
          if (item?.cvFileLinks) lessonFiles.push(item?.cvFileLinks);
        });
      }

      setLessonFormData((_prevState) => ({
        ..._prevState,
        ["lessonUploadFile"]: lessonFiles,
        ["lessonUploadFileErr"]: false,
        ["lessonUploadFileErrMsg"]: "",
      }));
      return uploadedFileLocations;
    } catch (error) {
      console.error("Error uploading files:", error);
      throw error; // You can choose to handle errors differently if needed
    }
  };
  //--------------------------------------------------------------------
  //------Uploading multiple Video & Document type lessons--------------

  const reviewModalClose = () => {
    setReviewModal(false);
    navigate("/instructor/course");
  };

  /****************** */
  /** EVENT HANDLERS  */
  /****************** */

  /** Handling data for the FINAL Review form On change  */
  const handelReviewChange = (_event) => {
    if (_event.target.name === "price") {
      if (_event.target.value.match(/^(?:\d*\.\d{1,2}|\d+)$/)) {
        setFormData((_prevState) => ({
          ..._prevState,
          [_event.target.name]: parseFloat(_event.target.value),
          [`${_event.target.name}Err`]: false,
          [`${_event.target.name}ErrMsg`]: "",
        }));
        return;
      } else {
        setFormData((_prevState) => ({
          ..._prevState,
          [_event.target.name]:
            _event.target.value === "" ? _event.target.value : formData?.price,
          [`${_event.target.name}Err`]: true,
          [`${_event.target.name}ErrMsg`]:
            "Price with 2 decimal places are allowed only",
        }));
        return;
      }
    }

    setFormData((_prevState) => ({
      ..._prevState,
      [_event.target.name]: _event.target.value,
      [`${_event.target.name}Err`]: false,
      [`${_event.target.name}ErrMsg`]: "",
      [`priceErr`]: false,
      [`priceErrMsg`]: "",
    }));
  };

  /** Handling data for the Lesson form On change  */
  const handelLessonChange = (_event) => {
    setFileMIssing(false);
    setLessonFormData((_prevState) => ({
      ..._prevState,
      [_event.target.name]: _event.target.value,
      [`${_event.target.name}Err`]: false,
      [`${_event.target.name}ErrMsg`]: "",
    }));
  };

  /** Handling data for the Type-Answer-Question form On change  */
  const handleTypeAnswerQuestionChange = async (_event) => {
    setTypeAnswerQuestionFormData((_prevState) => ({
      ..._prevState,
      [_event.target.name]: _event.target.value,
      [`${_event.target.name}Err`]: false,
      [`${_event.target.name}ErrMsg`]: "",
      ["quizId"]: quizFormData?.quizId ?? {},
    }));
  };

  /** Handling data for the Boolean-Question form On change  */
  const handleBooleanQuestionChange = async (_event) => {
    setBooleanQuestionFormData((_prevState) => ({
      ..._prevState,
      [_event.target.name]: _event.target.value,
      [`${_event.target.name}Err`]: false,
      [`${_event.target.name}ErrMsg`]: "",
      ["quizId"]: quizFormData?.quizId ?? {},
    }));
  };

  /** Handling data for the Single-Question form On change  */
  const handleSingleQuestionChange = async (_event, scqIndex) => {
    setSingleQuestionFormData((_prevState) => ({
      ..._prevState,
      [_event.target.name]:
        _event.target.name === "singleAnswer"
          ? [scqIndex]
          : _event.target.value,
      [`${_event.target.name}Err`]: false,
      [`${_event.target.name}ErrMsg`]: "",
      ["quizId"]: quizFormData?.quizId ?? {},
    }));
  };

  /** Handling data for the Multiple-Question form On change  */
  const handleMultipleQuestionChange = async (_event, mcqIndex) => {
    //Check if index already exists then toggle the checkbox onCllick
    if (_event.target.name === "multipleAnswer") {
      if (multipleQuestionFormData.multipleAnswer.includes(mcqIndex)) {
        multipleQuestionFormData.multipleAnswer =
          multipleQuestionFormData.multipleAnswer.filter(
            (item) => item !== mcqIndex
          );
      } else {
        multipleQuestionFormData.multipleAnswer.push(mcqIndex);
      }
    }

    setMultipleQuestionFormData((_prevState) => ({
      ..._prevState,
      [_event.target.name]:
        _event.target.name === "multipleAnswer"
          ? [...new Set(multipleQuestionFormData.multipleAnswer)]
          : _event.target.value,
      [`${_event.target.name}Err`]: false,
      [`${_event.target.name}ErrMsg`]: "",
      ["quizId"]: quizFormData?.quizId ?? {},
    }));
  };

  /** Handling data while saving Quiz */
  const handleSaveQuizData = useCallback(() => {
    alert("okk")
    if (quizFormData.quizTitle.trim() === "") {
      try {
        addQuizValidate.parse(quizFormData);
      } catch (error) {
        console.log(error);
        if (error instanceof ZodError) {
          handelError(error, setQuizFormData);
        }
        return;
      }
    } else {
      setQuizFormData((_prevState) => ({
        ..._prevState,
        ["quizPassPercentage"]:
          quizFormData.quizPassPercentage ?? QUIZ_PASS_PERCENTAGE,
      }));
    }
    setQuizQuestionTypeOpened(true);
  }, [quizFormData]);

  //Edit 4 types Quiz question
  const editQuizQuestion = (questionValues) => {
    setEditingCourseContent(true);
    //MCQ Quiz type
    if (questionValues?.mcqId && questionValues?.quizId) {
      setMultipleQuestionFormData({
        mcqId: questionValues?.mcqId ?? "",
        multipleQuestion: questionValues?.multipleQuestion ?? "",
        multipleQuestionErr: false,
        multipleQuestionErrMsg: "",
        multipleAnswer: questionValues?.multipleAnswer ?? [],
        multipleAnswerErr: false,
        multipleAnswerErrMsg: "",
        allMultipleAnswerOptions:
          questionValues?.allMultipleAnswerOptions ?? [],
      });
      setMcqOptionsList(questionValues?.allMultipleAnswerOptions.length ?? 2);
      setMcqOptionsListAnswers({
        ...questionValues?.allMultipleAnswerOptions,
      });
      setOpenQuiz(true);
      setQuizQuestionType("Multiple_Choices");
      setChoosedQuestionType(true);
      setQuizQuestionTypeOpened(true);
    }

    //if SCQ Quiz type
    if (questionValues?.scqId && questionValues?.quizId) {
      setSingleQuestionFormData({
        scqId: questionValues?.scqId ?? "",
        singleQuestion: questionValues?.singleQuestion ?? "",
        singleQuestionErr: false,
        singleQuestionErrMsg: "",
        singleAnswer: questionValues?.singleAnswer ?? [],
        singleAnswerErr: false,
        singleAnswerErrMsg: "",
        allSingleAnswerOptions: questionValues?.allSingleAnswerOptions ?? [],
      });

      setScqOptionsList(questionValues?.allSingleAnswerOptions.length ?? 2);
      setScqOptionsListAnswers({
        ...questionValues?.allSingleAnswerOptions,
      });
      setOpenQuiz(true);
      setQuizQuestionType("Single_Choice");
      setChoosedQuestionType(true);
      setQuizQuestionTypeOpened(true);
    }

    //If Boolean Quiz type
    if (questionValues?.booleanId && questionValues?.quizId) {
      setBooleanQuestionFormData({
        booleanId: questionValues.booleanId ?? "",
        booleanQuestion: questionValues?.booleanQuestion ?? "",
        booleanQuestionErr: false,
        booleanQuestionErrMsg: "",
        booleanAnswer: questionValues?.booleanAnswer ?? "",
        booleanAnswerErr: false,
        booleanAnswerErrMsg: "",
      });
      setOpenQuiz(true);
      setQuizQuestionType("True_or_False");
      setChoosedQuestionType(true);
      setQuizQuestionTypeOpened(true);
    }

    //If Typed Quiz type
    if (questionValues?.typeQId && questionValues?.quizId) {
      setTypeAnswerQuestionFormData({
        typeQId: questionValues?.typeQId ?? "",
        typeQuestion: questionValues?.typeQuestion ?? "",
        typeQuestionErr: false,
        typeQuestionErrMsg: "",
        typeAnswer: questionValues?.typeAnswer ?? "",
        typeAnswerErr: false,
        typeAnswerErrMsg: "",
      });
      setOpenQuiz(true);
      setQuizQuestionType("Type_Answer");
      setChoosedQuestionType(true);
      setQuizQuestionTypeOpened(true);
    }
  };

  //Edit Lesson OR Quiz content
  const editCourseContent = (contentToBeEditID) => {
    if (!isCloseQuizClicked) return;
    const coursePlusQuizList = [...courseContent, ...courseQuizes];
    const matcheItem = coursePlusQuizList.filter((item) => {
      if (item?.lessonId || item?.quizTitle) {
        return contentToBeEditID === (item?.lessonId || item?.quizId);
      }
    });
    const courseContentEditData = matcheItem[0];

    //If Lesson Type
    if (courseContentEditData?.lessonId) {
      setEditingCourseContent(true);
      setLessonFormData({
        lessonId: courseContentEditData.lessonId ?? "",
        lessonType: courseContentEditData?.lessonType ?? "",
        lessonTypeErr: false,
        lessonTypeErrMsg: "",
        lessonTitle: courseContentEditData?.lessonTitle ?? "",
        lessonTitleErr: false,
        lessonTitleErrMsg: "",
        lessonContent: courseContentEditData?.lessonContent ?? "",
        lessonContentErr: false,
        lessonContentErrMsg: "",
        lessonUploadFile: courseContentEditData?.lessonUploadFile ?? "",
        lessonUploadFileErr: false,
        lessonUploadFileErrMsg: "",
      });
      setOpen(true);
      if (courseContentEditData?.uploadedLessonFiles) {
        setCvLink(courseContentEditData.uploadedLessonFiles);
      }
    }

    //Prepare 4 types quiz questions
    if (courseContentEditData?.quizId) {
      handleClickOpenQuizModal(courseContentEditData);
      setEditQuizId(courseContentEditData.quizId);
      const filteredQuizQuestions = courseContent.filter((value) => {
        if (
          (value?.scqId ||
            value?.mcqId ||
            value?.booleanId ||
            value?.typeQId) &&
          value?.quizId === courseContentEditData.quizId
        ) {
          return value;
        }
      });
      setQuizQuestions(filteredQuizQuestions);
    }
  };

  //Remove Lesson OR Quiz course content
  const removeCourseContent = (contentToBeRemoveID) => {
    const filteredCourseContent = courseContent.filter((item) => {
      return contentToBeRemoveID !== (item?.lessonId || item?.quizId);
    });
    setCourseContent(filteredCourseContent);

    const filteredQuizes = courseQuizes.filter((item) => {
      return contentToBeRemoveID !== item?.quizId;
    });
    setCourseQuizes(filteredQuizes);
  };

  /****************** */
  /** FORM SUBMISSION */
  /****************** */

  /** FINAL Review form submission  */
  const handelReviewSubmit = async (_e) => {
    try {
      _e.preventDefault();
      try {
        // console.log({ formData });
        // console.log({ lessonFormData });
        // console.log({ quizFormData });
        // console.log({ typeAnswerQuestionFormData });
        // console.log({ booleanQuestionFormData });
        // console.log({ singleQuestionFormData });
        // console.log({ multipleQuestionFormData });
        //console.log({ courseContent });
        // console.log({ displayEnrolment });
        //console.log({ courseQuizes });
        //console.log({ courseContentOrder });
        //
        addCourseValidate.parse(formData);

        //Prepare payload for Course's Lesson & Quiz content
        const textLessons = [];
        const videoLessons = [];
        const documentLessons = [];

        //Prepare Lesson payload
        let lessonFlag = false;
        courseContent.map((item, index) => {
          if (item?.lessonType === "text") {
            lessonFlag = true;
            textLessons.push({
              contentType: "Lesson", // Lesson, Quiz
              lessonType: "Text", // Text, Video, Document
              title: item?.lessonTitle ?? "",
              order: courseContentOrder.indexOf(item?.lessonId),
              content: item?.lessonContent ?? "",
              videoUrl: [],
              fileUrl: [],
            });
          }

          if (item?.lessonType === "video") {
            lessonFlag = true;
            videoLessons.push({
              contentType: "Lesson", // Lesson, Quiz
              lessonType: "Video", // Text, Video, Document
              title: item?.lessonTitle ?? "",
              order: courseContentOrder.indexOf(item?.lessonId),
              content: item?.lessonContent ?? "",
              videoUrl: item?.lessonUploadFile ? item.lessonUploadFile : [],
              fileUrl: [],
            });
          }

          if (item?.lessonType === "document") {
            lessonFlag = true;
            documentLessons.push({
              contentType: "Lesson", // Lesson, Quiz
              lessonType: "Document", // Text, Video, Document
              title: item?.lessonTitle ?? "",
              order: courseContentOrder.indexOf(item?.lessonId),
              content: item?.lessonContent ?? "",
              videoUrl: [],
              fileUrl: item?.lessonUploadFile ? item.lessonUploadFile : [],
            });
          }
        });
        setLessonExist(lessonFlag);
        if (!lessonFlag) return;

        //Prepare Quiz payload
        const finalQuizPayload = courseQuizes.map((quizItem, quizIndex) => ({
          contentType: "Quiz",
          lessonType: null,
          title: quizItem.quizTitle,
          order: courseContentOrder.indexOf(quizItem?.quizId),
          passingPercentage: quizItem.quizPassPercentage,
          quizes: courseContent
            .map((item, index) => {
              if (
                quizItem?.quizId === item?.quizId &&
                item?.mcqId &&
                item?.multipleQuestion
              ) {
                return {
                  questionType: "Multiple Choices", // Multiple Choices, Single Choice, True or False, Type Answer
                  question: item.multipleQuestion ?? "",
                  answer: null,
                  order: index,
                  options:
                    item.multipleQuestion &&
                    item.allMultipleAnswerOptions.length > 0
                      ? item.allMultipleAnswerOptions
                      : [],
                  correctAnswer:
                    item.multipleAnswer.length > 0 ? item.multipleAnswer : [],
                };
              }

              if (
                quizItem?.quizId === item?.quizId &&
                item?.scqId &&
                item?.singleQuestion
              ) {
                return {
                  questionType: "Single Choice", // Multiple Choices, Single Choice, True or False, Type Answer
                  question: item.singleQuestion ?? "",
                  answer: null,
                  order: index,
                  options:
                    item.singleQuestion &&
                    singleQuestionFormData.allSingleAnswerOptions.length > 0
                      ? item.allSingleAnswerOptions
                      : [],
                  correctAnswer: item.singleAnswer ?? [],
                };
              }

              if (
                quizItem?.quizId === item?.quizId &&
                item?.booleanId &&
                item?.booleanQuestion
              ) {
                return {
                  questionType: "True or False", // Multiple Choices, Single Choice, True or False, Type Answer
                  question: item.booleanQuestion ?? "",
                  answer: null,
                  order: index,
                  options: ["True", "False"],
                  correctAnswer: [item.booleanAnswer],
                };
              }

              if (
                quizItem?.quizId === item?.quizId &&
                item?.typeQId &&
                item?.typeQuestion
              ) {
                return {
                  questionType: "Type Answer", // Multiple Choices, Single Choice, True or False, Type Answer
                  question: item.typeQuestion ?? "",
                  answer: item.typeAnswer ?? "",
                  order: index,
                };
              }
            })
            .filter((item) => item?.questionType),
        }));

        //Send backend request
        addCourse({
          title: formData.title,
          description: formData.description,
          language: formData.language,
          skillLevel: formData.skillLevel, // Beginner, Intermediate, Expert
          image: formData.coverImage,
          price: parseFloat(`${formData.price}`),
          speciallization: formData.category,
          showDisplayEnrollmentCount: displayEnrolment,
          contents: [
            ...textLessons,
            ...videoLessons,
            ...documentLessons,
            ...finalQuizPayload,
          ],
        });

        //Reset the Review form fields
        setFormData({
          title: "",
          titleErr: false,
          titleErrMsg: "",
          description: "",
          descriptionErr: false,
          descriptionErrMsg: "",
          coverImage: "",
          coverImageErr: false,
          coverImageErrMsg: "",
          language: "",
          languageErr: false,
          languageErrMsg: "",
          skillLevel: "",
          skillLevelErr: false,
          skillLevelErrMsg: "",
          price: "",
          priceErr: false,
          priceErrMsg: "",
          category: "",
          categoryErr: false,
          categoryErrMsg: "",
          displayCount: "",
          displayCountErr: false,
          displayCountErrMsg: "",
        });
        //Reset the Course content
        setCourseContent([]);
        setCourseQuizes([]);
        //
        setCoverImageFileName(null);
        handleCloseQuizModal(true);
        handleCloseLessonModal();
      } catch (error) {
        console.log(error);
        if (error instanceof ZodError) {
          handelError(error, setFormData);
        }
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  /** Lesson form submission  */
  const handelLessonSubmit = async (_e) => {
    try {
      _e.preventDefault();
      try {
        addLessonValidate.parse(lessonFormData);
        //File checking for Video & Document lesson types
        if (
          (lessonFormData.lessonType === "video" ||
            lessonFormData.lessonType === "document") &&
          lessonFormData.lessonUploadFile.length === 0
        ) {
          setFileMIssing(true);
        } else {
          if (isEditingCourseContent) {
            setCourseContent(
              courseContent.map((item) =>
                item.lessonId === lessonFormData.lessonId
                  ? { ...item, uploadedLessonFiles: cvLink, ...lessonFormData }
                  : item
              )
            );
          } else {
            if (
              lessonFormData.lessonType === "video" ||
              lessonFormData.lessonType === "document"
            ) {
              setCourseContent((_prevState) => [
                ..._prevState,
                { uploadedLessonFiles: cvLink, ...lessonFormData },
              ]);
            } else {
              setCourseContent((_prevState) => [..._prevState, lessonFormData]);
            }
          }
          handleCloseLessonModal();
          setEditingCourseContent(false);
          setLessonExist(true);

          if (courseContentOrder.length === 0) {
            setCourseContentOrder([lessonFormData.lessonId]);
          } else {
            if (!courseContentOrder.includes(lessonFormData?.lessonId)) {
              setCourseContentOrder((_prevState) => [
                ..._prevState,
                lessonFormData.lessonId,
              ]);
            }
          }
        }
      } catch (error) {
        console.log(error);
        if (error instanceof ZodError) {
          handelError(error, setLessonFormData);
        }
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };
  /** Type Answer Question form submission  */
  const handleTypeAnswerQuestionSubmit = async (_e) => {
    try {
      _e.preventDefault();
      try {
        addTypeAnswerQuestionValidate.parse(typeAnswerQuestionFormData);
        if (isEditingCourseContent) {
          setCourseContent(
            courseContent.map((item) =>
              item.typeQId === typeAnswerQuestionFormData.typeQId
                ? { ...item, ...typeAnswerQuestionFormData }
                : item
            )
          );
        } else {
          setCourseContent((_prevState) => [
            ..._prevState,
            typeAnswerQuestionFormData,
          ]);
        }

        if (isEditQuizId) {
          setCourseQuizes(
            courseQuizes.map((item) =>
              item.quizId === isEditQuizId ? { ...item, ...quizFormData } : item
            )
          );
        } else {
          setCourseQuizes((_prevState) => [..._prevState, quizFormData]);
        }
        setEditingCourseContent(false);
        handleCloseQuizModal(true);
        setEditQuizId(null);

        if (courseContentOrder.length === 0) {
          setCourseContentOrder([quizFormData?.quizId]);
        } else {
          if (!courseContentOrder.includes(quizFormData?.quizId)) {
            setCourseContentOrder((_prevState) => [
              ..._prevState,
              quizFormData?.quizId,
            ]);
          }
        }
      } catch (error) {
        console.log(error);
        if (error instanceof ZodError) {
          handelError(error, setTypeAnswerQuestionFormData);
        }
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  /** Boolean Question form submission  */
  const handleBooleanQuestionSubmit = async (_e) => {
    try {
      _e.preventDefault();
      try {
        addBooleanQuestionValidate.parse(booleanQuestionFormData);
        if (isEditingCourseContent) {
          setCourseContent(
            courseContent.map((item) =>
              item.booleanId === booleanQuestionFormData.booleanId
                ? { ...item, ...booleanQuestionFormData }
                : item
            )
          );
        } else {
          setCourseContent((_prevState) => [
            ..._prevState,
            booleanQuestionFormData,
          ]);
        }

        if (isEditQuizId) {
          setCourseQuizes(
            courseQuizes.map((item) =>
              item.quizId === isEditQuizId ? { ...item, ...quizFormData } : item
            )
          );
        } else {
          setCourseQuizes((_prevState) => [..._prevState, quizFormData]);
        }
        setEditingCourseContent(false);
        handleCloseQuizModal(true);
        setEditQuizId(null);

        if (courseContentOrder.length === 0) {
          setCourseContentOrder([quizFormData?.quizId]);
        } else {
          if (!courseContentOrder.includes(quizFormData?.quizId)) {
            setCourseContentOrder((_prevState) => [
              ..._prevState,
              quizFormData?.quizId,
            ]);
          }
        }
      } catch (error) {
        console.log(error);
        if (error instanceof ZodError) {
          handelError(error, setBooleanQuestionFormData);
        }
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  /** Single Question form submission  */
  const handleSingleQuestionSubmit = async (_e) => {
    try {
      _e.preventDefault();
      try {
        if (scqOptionsList !== Object.keys(scqOptionsListAnswers).length) {
          setSingleQuestionFormData((_prevState) => ({
            ..._prevState,
            ["singleAnswerErr"]: true,
            ["singleAnswerErrMsg"]: "Please fill all the answer options",
          }));
          return;
        }
        addSingleQuestionValidate.parse(singleQuestionFormData);
        if (isEditingCourseContent) {
          setCourseContent(
            courseContent.map((item) =>
              item.scqId === singleQuestionFormData.scqId
                ? { ...item, ...singleQuestionFormData }
                : item
            )
          );
        } else {
          setCourseContent((_prevState) => [
            ..._prevState,
            singleQuestionFormData,
          ]);
        }

        if (isEditQuizId) {
          setCourseQuizes(
            courseQuizes.map((item) =>
              item.quizId === isEditQuizId ? { ...item, ...quizFormData } : item
            )
          );
        } else {
          setCourseQuizes((_prevState) => [..._prevState, quizFormData]);
        }

        setScqOptionsList(2);
        setScqOptionsListAnswers({});
        handleCloseQuizModal(true);
        setEditingCourseContent(false);
        setEditQuizId(null);

        if (courseContentOrder.length === 0) {
          setCourseContentOrder([quizFormData?.quizId]);
        } else {
          if (!courseContentOrder.includes(quizFormData?.quizId)) {
            setCourseContentOrder((_prevState) => [
              ..._prevState,
              quizFormData?.quizId,
            ]);
          }
        }
      } catch (error) {
        console.log(error);
        if (error instanceof ZodError) {
          handelError(error, setSingleQuestionFormData);
        }
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  /** Multiple Question form submission  */
  const handleMultipleQuestionSubmit = async (_e) => {
    try {
      _e.preventDefault();
      try {
        if (mcqOptionsList !== Object.keys(mcqOptionsListAnswers).length) {
          setMultipleQuestionFormData((_prevState) => ({
            ..._prevState,
            ["multipleAnswerErr"]: true,
            ["multipleAnswerErrMsg"]: "Please fill all the answer options",
          }));
          return;
        }
        addMultipleQuestionValidate.parse(multipleQuestionFormData);
        if (isEditingCourseContent) {
          setCourseContent(
            courseContent.map((item) =>
              item.mcqId === multipleQuestionFormData.mcqId
                ? { ...item, ...multipleQuestionFormData }
                : item
            )
          );
        } else {
          setCourseContent((_prevState) => [
            ..._prevState,
            multipleQuestionFormData,
          ]);
        }

        if (isEditQuizId) {
          setCourseQuizes(
            courseQuizes.map((item) =>
              item.quizId === isEditQuizId ? { ...item, ...quizFormData } : item
            )
          );
        } else {
          setCourseQuizes((_prevState) => [..._prevState, quizFormData]);
        }
        setMcqOptionsList(4);
        setMcqOptionsListAnswers({});
        setEditingCourseContent(false);
        handleCloseQuizModal(true);
        setEditQuizId(null);

        if (courseContentOrder.length === 0) {
          setCourseContentOrder([quizFormData?.quizId]);
        } else {
          if (!courseContentOrder.includes(quizFormData?.quizId)) {
            setCourseContentOrder((_prevState) => [
              ..._prevState,
              quizFormData?.quizId,
            ]);
          }
        }
      } catch (error) {
        console.log(error);
        if (error instanceof ZodError) {
          handelError(error, setMultipleQuestionFormData);
        }
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  //Prepare all Quiz types questions header
  const getQuestionHeader = useMemo(() => {
    if (
      isQuizQuestionTypeOpened &&
      isChoosedQuestionType &&
      quizQuestionType === "Multiple_Choices" &&
      !isEditingCourseContent
    ) {
      setMultipleQuestionFormData({
        mcqId: uuidv4(),
        multipleQuestion: "",
        multipleQuestionErr: false,
        multipleQuestionErrMsg: "",
        multipleAnswer: [],
        multipleAnswerErr: false,
        multipleAnswerErrMsg: "",
        allMultipleAnswerOptions: [],
      });
      return "Add Multiple Choice Question";
    } else if (
      isQuizQuestionTypeOpened &&
      isChoosedQuestionType &&
      quizQuestionType === "Single_Choice" &&
      !isEditingCourseContent
    ) {
      setSingleQuestionFormData({
        scqId: uuidv4(),
        singleQuestion: "",
        singleQuestionErr: false,
        singleQuestionErrMsg: "",
        singleAnswer: [],
        singleAnswerErr: false,
        singleAnswerErrMsg: "",
        allSingleAnswerOptions: [],
      });
      return "Add Single Choice Question";
    } else if (
      isQuizQuestionTypeOpened &&
      isChoosedQuestionType &&
      quizQuestionType === "True_or_False" &&
      !isEditingCourseContent
    ) {
      setBooleanQuestionFormData({
        booleanId: uuidv4(),
        booleanQuestion: "",
        booleanQuestionErr: false,
        booleanQuestionErrMsg: "",
        booleanAnswer: "",
        booleanAnswerErr: false,
        booleanAnswerErrMsg: "",
      });
      return "Add True or False Question";
    } else if (
      isQuizQuestionTypeOpened &&
      isChoosedQuestionType &&
      quizQuestionType === "Type_Answer" &&
      !isEditingCourseContent
    ) {
      setTypeAnswerQuestionFormData({
        typeQId: uuidv4(),
        typeQuestion: "",
        typeQuestionErr: false,
        typeQuestionErrMsg: "",
        typeAnswer: "",
        typeAnswerErr: false,
        typeAnswerErrMsg: "",
      });
      return "Add Type Answer Question";
    }

    return isQuizQuestionTypeOpened
      ? `${isEditingCourseContent ? "Edit" : "Add"} Question`
      : `${isEditingCourseContent ? "Edit" : "Add"} Quiz`;
  }, [
    isChoosedQuestionType,
    isEditingCourseContent,
    isQuizQuestionTypeOpened,
    quizQuestionType,
  ]);

  //OnClick Remove answer options for the MCQ Type
  const handleRemoveMcqOptionsList = (mcqOptionTobeRemoveId) => {
    if (Object.keys(mcqOptionsListAnswers).length === 0) {
      setMultipleQuestionFormData((_prevState) => ({
        ..._prevState,
        ["multipleAnswerErr"]: true,
        ["multipleAnswerErrMsg"]: "Please create the Quiz first",
      }));
      return;
    }

    if (Object.keys(mcqOptionsListAnswers).length === 2) {
      setMultipleQuestionFormData((_prevState) => ({
        ..._prevState,
        ["multipleAnswerErr"]: true,
        ["multipleAnswerErrMsg"]: "There must be atleast two answer options",
      }));
      return;
    }

    delete mcqOptionsListAnswers[mcqOptionTobeRemoveId];
    setMcqOptionsList(Object.keys(mcqOptionsListAnswers).length);
    setMcqOptionsListAnswers(JSON.parse(JSON.stringify(mcqOptionsListAnswers)));

    //Update SCQ type form data
    setMultipleQuestionFormData((_prevState) => ({
      ..._prevState,
      ["multipleAnswer"]: multipleQuestionFormData?.multipleAnswer.filter(
        (item) => item !== mcqOptionTobeRemoveId
      ),
      ["allMultipleAnswerOptions"]: Object.values(mcqOptionsListAnswers),
    }));
  };

  //Submit all answer options for the MCQ type
  const handleMcqOptionsListAnswersSubmission = (_e, listKey) => {
    _e.preventDefault();
    let allAnswers = {};
    setMcqOptionsListAnswers((prev) => {
      allAnswers = { ...prev, [listKey]: _e.target.value };
      return allAnswers;
    });

    //Update MCQ form data
    setMultipleQuestionFormData((_prevState) => ({
      ..._prevState,
      ["allMultipleAnswerOptions"]: Object.values(allAnswers),
    }));
  };

  //Prepare answer options list for MCQ type
  const getMcqAnswersList = useMemo(() => {
    const mcqAnsList = [];
    for (let i = 0; i < mcqOptionsList; i++) {
      mcqAnsList.push(
        <Box className="questionBoxInner active" key={i}>
          <Grid
            item
            container
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Grid item xs={8} sm={10}>
              <Grid
                item
                container
                alignItems={"center"}
                spacing={{ xs: 1, sm: 2 }}
              >
                <Grid item width={44}>
                  <div className="lightforthCheckbox">
                    <div className="mainCheck">
                      <input
                        type="checkbox"
                        name="multipleAnswer"
                        checked={
                          i ===
                          multipleQuestionFormData?.multipleAnswer.filter(
                            (item) => item === i
                          )[0]
                        }
                        onChange={(_event) => {
                          handleMultipleQuestionChange(_event, i);
                        }}
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
                    {/* <label>Answer {i + 1}</label> */}
                  </div>
                </Grid>
                <Grid item sx={{ width: "calc(100% - 44px)" }}>
                  <input
                    type="text"
                    className="formtransparent fullWidth"
                    value={mcqOptionsListAnswers[i]}
                    onChange={(_e) =>
                      handleMcqOptionsListAnswersSubmission(_e, i)
                    }
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={4} sm={2}>
              <Grid item container justifyContent={"flex-end"}>
                <button>
                  <img
                    src={copypasteIcon}
                    onClick={() => setMcqOptionsList(mcqOptionsList + 1)}
                  />
                </button>
                <button>
                  <img
                    src={trashIcon}
                    onClick={() => handleRemoveMcqOptionsList(i)}
                  />
                </button>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      );
    }

    return mcqAnsList;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mcqOptionsList, multipleQuestionFormData]);

  //OnClick Remove answer options for the SCQ Type
  const handleRemoveScqOptionsList = (scqOptionTobeRemoveId) => {
    if (Object.keys(scqOptionsListAnswers).length === 0) {
      setSingleQuestionFormData((_prevState) => ({
        ..._prevState,
        ["singleAnswerErr"]: true,
        ["singleAnswerErrMsg"]: "Please create the Quiz first",
      }));
      return;
    }

    if (Object.keys(scqOptionsListAnswers).length === 1) {
      setSingleQuestionFormData((_prevState) => ({
        ..._prevState,
        ["singleAnswerErr"]: true,
        ["singleAnswerErrMsg"]: "There must be atleast one answer option",
      }));
      return;
    }

    delete scqOptionsListAnswers[scqOptionTobeRemoveId];
    setScqOptionsList(Object.keys(scqOptionsListAnswers).length);
    setScqOptionsListAnswers(JSON.parse(JSON.stringify(scqOptionsListAnswers)));

    //Update SCQ type form data
    setSingleQuestionFormData((_prevState) => ({
      ..._prevState,
      ["singleAnswer"]:
        singleQuestionFormData?.singleAnswer[0] === scqOptionTobeRemoveId
          ? []
          : singleQuestionFormData?.singleAnswer,
      ["allSingleAnswerOptions"]: Object.values(scqOptionsListAnswers),
    }));
  };

  //Submit all answer options for the SCQ type
  const handleScqOptionsListAnswersSubmission = (_e, listKey) => {
    _e.preventDefault();
    let allAnswers = {};
    setScqOptionsListAnswers((prev) => {
      allAnswers = { ...prev, [listKey]: _e.target.value };
      return allAnswers;
    });

    //Update SCQ type form data
    setSingleQuestionFormData((_prevState) => ({
      ..._prevState,
      ["allSingleAnswerOptions"]: Object.values(allAnswers),
    }));
  };

  //Prepare answer options for SCQ type
  const getScqAnswersList = useMemo(() => {
    const scqAnsList = [];
    for (let i = 0; i < scqOptionsList; i++) {
      scqAnsList.push(
        <Box className="questionBoxInner active" key={i}>
          <Grid
            item
            container
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Grid item xs={8} sm={10}>
              <Grid
                item
                container
                alignItems={"center"}
                spacing={{ xs: 1, sm: 2 }}
              >
                <Grid item width={44}>
                  <div className="lightforthCheckbox">
                    <div className="mainCheck">
                      <input
                        type="radio"
                        name="singleAnswer"
                        checked={i === singleQuestionFormData?.singleAnswer[0]}
                        onChange={(_event) => {
                          handleSingleQuestionChange(_event, i);
                        }}
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
                    {/* <label>Answer{i + 1}</label> */}
                  </div>
                </Grid>
                <Grid item sx={{ width: "calc(100% - 44px)" }}>
                  <input
                    type="text"
                    className="formtransparent fullWidth"
                    value={scqOptionsListAnswers[i]}
                    onChange={(_e) =>
                      handleScqOptionsListAnswersSubmission(_e, i)
                    }
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={4} sm={2}>
              <Grid item container justifyContent={"flex-end"}>
                <button>
                  <img
                    src={copypasteIcon}
                    onClick={() => setScqOptionsList(scqOptionsList + 1)}
                  />
                </button>
                <button>
                  <img
                    src={trashIcon}
                    onClick={() => handleRemoveScqOptionsList(i)}
                  />
                </button>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      );
    }

    return scqAnsList;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scqOptionsList, singleQuestionFormData]);

  //Prepare all Quiz questions
  const getQuizContent = useMemo(() => {
    return quizQuestions.map((value, index) => (
      <Grid item xs={12} key={index}>
        <Box className="addQuizEditBox">
          <Grid
            item
            container
            gap={{ xs: 2, sm: 0 }}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Grid
              item
              sx={{
                width: {
                  xs: "calc(100% - 134px)",
                  sm: "calc(100% - 178px)",
                },
              }}
            >
              <Grid item container alignItems={"center"} spacing={2}>
                <Grid item xs={12}>
                  <p className="subTextTwo">
                    {value.typeQuestion ??
                      value.booleanQuestion ??
                      value.singleQuestion ??
                      value.multipleQuestion}
                  </p>
                </Grid>
              </Grid>
            </Grid>
            <Grid item width={{ xs: 118, sm: 178 }}>
              <Grid
                item
                container
                justifyContent={"flex-end"}
                alignItems={"center"}
                columnGap={2}
              >
                <Grid item>
                  <img
                    className="catgoryListImg"
                    src={
                      value?.typeQuestion
                        ? listparagraphtexta
                        : value?.booleanQuestion
                        ? truefalse
                        : value?.singleQuestion
                        ? listparagraphdotscircleone
                        : value?.multipleQuestion
                        ? listparagraphdotscircle
                        : null
                    }
                    width={24}
                  />
                </Grid>
                <Grid item>
                  <Grid item container>
                    <Box
                      sx={{ display: { xs: "none", sm: "block" }, padding: 0 }}
                    >
                      <button
                        className="lightBtnSmall"
                        onClick={() => {
                          handleSaveQuizData();
                          editQuizQuestion(value);
                        }}
                      >
                        Edit
                      </button>
                    </Box>
                    <Button
                      size="small"
                      onClick={() => {
                        handleSaveQuizData();
                        editQuizQuestion(value);
                      }}
                      sx={{
                        display: { xs: "inline-flex", sm: "none" },
                        minWidth: 30,
                        padding: 0,
                      }}
                    >
                      <img src={peneditIcon} />
                    </Button>
                    {/* <Button sx={{ minWidth: 44, padding: 0 }} size="small">
                      <img src={arrowsexpandIcon} />
                    </Button> */}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    ));
  }, [handleSaveQuizData, quizQuestions]);

  return (
    <AuthGuard>
      <Seo title="New Course" metaName="Metaname" metaTags={metaTags}>
        <div className="mainDashboardArea">
          <Grid container>
            <Grid
              className="instDashLeft"
              item
              sx={{
                width: "calc(100% - 366px)",
                paddingRight: "64px",
                paddingBottom: 4,
              }}
            >
              <Grid
                container
                className="layoutHead"
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Grid item xs={12} sm={8}>
                  <Grid item container alignItems={"center"} columnGap={"20px"}>
                    <Link to="/instructor/course" className="backBtn">
                      <ArrowBackIcon />
                    </Link>
                    <h4>Create Course</h4>
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={4} paddingTop={{ xs: 3, sm: 0 }}>
                  <Grid
                    item
                    container
                    justifyContent={{ xs: "flex-start", sm: "flex-end" }}
                  >
                    <Grid item xs={12} sm="auto">
                      <div className="newCoursebtndiv">
                        <Link
                          className="lightBtn fullWidth"
                          to={"/instructor/course/new-course"}
                        >
                          <AddIcon />
                          New Course
                        </Link>
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item container flexDirection={"column"} rowGap={4}>
                <Grid item xs={12}>
                  <Box>
                    <p className="mainText fontWeight-700">Upload New Course</p>
                    <Grid item container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <Grid item container spacing={3}>
                          <Grid item xs={12}>
                            <label className="formlabel">Title</label>
                            <input
                              type="text"
                              className={`form-control ${
                                formData.titleErr ? "errField" : ""
                              }`}
                              placeholder="Type Here"
                              name="title"
                              value={formData.title}
                              onChange={(_event) => {
                                handelReviewChange(_event);
                              }}
                            />
                            <p className="errorMsg">{formData?.titleErrMsg}</p>
                          </Grid>
                          <Grid item xs={12}>
                            <label className="formlabel">Description</label>
                            <textarea
                              style={{ height: "100px" }}
                              className={`form-control ${
                                formData.descriptionErr ? "errField" : ""
                              }`}
                              placeholder="Type Here"
                              name="description"
                              value={formData.description}
                              onChange={(_event) => {
                                handelReviewChange(_event);
                              }}
                            ></textarea>
                            <p className="errorMsg">
                              {formData?.descriptionErrMsg}
                            </p>
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <Grid
                          item
                          container
                          spacing={3}
                          paddingTop={{ xs: 0, sm: "37px" }}
                        >
                          <Grid item xs={12}>
                            <div className="fileUploadThree">
                              <input
                                title=""
                                type="file"
                                accept=".jpg,.png,.jpeg"
                                ref={fileInputRef}
                                name="coverImage"
                                onClick={(e) =>
                                  handleuploadImg(e.target.files[0])
                                }
                              />
                              <Grid
                                item
                                container
                                spacing={3}
                                justifyContent={"center"}
                                alignItems={"center"}
                                display={coverImageFileName ? "none" : ""}
                              >
                                <Grid item>
                                  <img src={imgVectorIcon} />
                                </Grid>
                                <Grid item>
                                  <Grid
                                    item
                                    container
                                    flexDirection={"column"}
                                    rowGap={1}
                                  >
                                    <p className="subTextOne fontWeight-500 color-primary textCenter">
                                      Upload Cover Image (19:6)
                                    </p>
                                    <p className="subTextTwo textCenter">
                                      Drop your file here or browse
                                    </p>
                                  </Grid>
                                </Grid>
                              </Grid>
                              <Box
                                className="uploadCoverView"
                                display={coverImageFileName ? "" : "none"}
                                width={"100%"}
                              >
                                <Grid
                                  item
                                  container
                                  justifyContent={{
                                    xs: "center",
                                    md: "space-between",
                                  }}
                                  alignItems={"center"}
                                  spacing={1}
                                >
                                  <Grid item width={140} position={"relative"}>
                                    <img
                                      className="viewImg"
                                      src={formData?.coverImage ?? coverImg}
                                      width={"100%"}
                                    />
                                    <IconButton
                                      size="small"
                                      sx={{
                                        position: "absolute",
                                        right: "-10px",
                                        width: "24px !important",
                                        height: "24px !important",
                                        top: "0px",
                                      }}
                                    >
                                      <CloseIcon
                                        fontSize="small"
                                        onClick={handleRemoveCoverImage}
                                      />
                                    </IconButton>
                                  </Grid>
                                  <Grid
                                    item
                                    width={{
                                      xs: "calc(100% - 0px)",
                                      md: "calc(100% - 140px)",
                                    }}
                                  >
                                    <Grid
                                      item
                                      container
                                      alignItems={"center"}
                                      justifyContent={{
                                        xs: "center",
                                        md: "flex-end",
                                      }}
                                      columnGap={2}
                                    >
                                      <Grid
                                        item
                                        maxWidth={{
                                          xs: "calc(100% - 65px)",
                                          md: "calc(100% - 65px)",
                                        }}
                                        width={{
                                          xs: "max-content",
                                          md: "calc(100% - 65px)",
                                        }}
                                        textAlign={"right"}
                                      >
                                        <p className="subTextTwo mb-0 fontWeight-500 color-primary">
                                          Upload New Cover Image (19:6)
                                        </p>
                                      </Grid>
                                      <Grid item width={48}>
                                        <IconButton>
                                          <img src={editImg} />
                                        </IconButton>
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </Box>
                              {/* <Grid
                                item
                                container
                                display={coverImageFileName ? "" : "none"}
                              >
                                <Grid
                                  item
                                  container
                                  justifyContent={"center"}
                                  alignItems={"center"}
                                >
                                  <Grid item>
                                    <p className="subTextTwo textCenter">
                                      {coverImageFileName}
                                    </p>
                                  </Grid>
                                  {coverImageFileName && (
                                    <Grid item>
                                      <IconButton size="small">
                                        <CloseIcon
                                          fontSize="small"
                                          onClick={handleRemoveCoverImage}
                                        />
                                      </IconButton>
                                    </Grid>
                                  )}
                                </Grid>
                              </Grid> */}
                            </div>
                            <p className="errorMsg">
                              {formData?.coverImageErrMsg}
                            </p>
                          </Grid>
                          <Grid item xs={12}>
                            <Grid item container spacing={3}>
                              <Grid item xs={12} sm={6}>
                                <label className="formlabel">Language</label>
                                <select
                                  className={`form-control ${
                                    formData.languageErr ? "errField" : ""
                                  }`}
                                  name="language"
                                  value={formData.language}
                                  onChange={(_event) => {
                                    handelReviewChange(_event);
                                  }}
                                >
                                  <option value="" selected disabled hidden>
                                    Please Select
                                  </option>
                                  <option value={"english"}>English</option>
                                  <option value={"french"}>French</option>
                                  <option value={"spanish"}>Spanish</option>
                                </select>
                                <p className="errorMsg">
                                  {formData?.languageErrMsg}
                                </p>
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                <label className="formlabel">Skill Level</label>
                                <select
                                  className={`form-control ${
                                    formData.skillLevelErr ? "errField" : ""
                                  }`}
                                  name="skillLevel"
                                  value={formData.skillLevel}
                                  onChange={(_event) => {
                                    handelReviewChange(_event);
                                  }}
                                >
                                  <option value="" selected disabled hidden>
                                    Please Select
                                  </option>
                                  <option value={"beginner"}>Beginner</option>
                                  <option value={"intermediate"}>
                                    Intermediate
                                  </option>
                                  <option value={"master"}>Master</option>
                                </select>
                                <p className="errorMsg">
                                  {formData?.skillLevelErrMsg}
                                </p>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box>
                    <p className="mainText fontWeight-700">Course Content</p>
                    <Grid item container flexDirection={"column"} rowGap={3}>
                      <DragCard
                        courseContent={courseContent}
                        quizContent={courseQuizes}
                        editCourseContent={editCourseContent}
                        removeCourseContent={removeCourseContent}
                        setCloseQuizClicked={setCloseQuizClicked}
                        courseContentOrder={courseContentOrder}
                        setCourseContentOrder={setCourseContentOrder}
                      />
                    </Grid>
                    <Grid
                      item
                      container
                      columnGap={{ xs: 1, sm: 2 }}
                      paddingTop={3}
                    >
                      <button
                        className="lightBtnSmall minWidth-146"
                        onClick={handleClickOpenLessonModal}
                      >
                        <AddIcon fontSize="small" /> Add Lesson
                      </button>
                      <button
                        className="darkBtnSmall minWidth-146"
                        onClick={handleClickOpenQuizModal}
                      >
                        <AddIcon fontSize="small" /> Add Quiz
                      </button>
                    </Grid>
                  </Box>
                </Grid>
                {!isLessonExist ? (
                  <Grid item xs={12}>
                    <p className="errorMsg">{"Lesson is required"}</p>
                  </Grid>
                ) : null}
                <Grid item xs={12}>
                  <Box>
                    <p className="mainText fontWeight-700">Other Information</p>
                    <Grid item container spacing={3}>
                      <Grid item xs={12} sm={6} md={4} xl={3}>
                        <label className="formlabel">Price</label>
                        <div className="inputGroup positionLeft priceInuptGroup">
                          <input
                            type="number"
                            className={`form-control ${
                              formData.priceErr ? "errField" : ""
                            }`}
                            name="price"
                            value={formData.price}
                            onChange={(_event) => {
                              handelReviewChange(_event);
                            }}
                            step=".01"
                          />
                          <button className="inputGroupLeft">$</button>
                        </div>

                        <p className="errorMsg">{formData?.priceErrMsg}</p>
                      </Grid>
                      {/* <Grid item xs={12} sm={6} md={3}>
                        <label className="formlabel">Price</label>
                        <select className="form-control">
                          <option>Please Select</option>
                        </select>
                      </Grid> */}
                      <Grid item xs={12} sm={6} md={4} xl={3}>
                        <label className="formlabel">Category</label>
                        <select
                          className={`form-control ${
                            formData.categoryErr ? "errField" : ""
                          }`}
                          name="category"
                          value={formData.category}
                          onChange={(_event) => {
                            handelReviewChange(_event);
                          }}
                        >
                          <option value="" selected disabled hidden>
                            Please Select
                          </option>
                          {getCourseTopicData?.data.length > 0 &&
                            getCourseTopicData.data.map((item, index) => (
                              <option value={item?.name} key={index}>
                                {item?.name}
                              </option>
                            ))}
                          {/* <option value={"design"}>Design</option>
                          <option value={"programming"}>Programming</option>
                          <option value={"cyber_security"}>
                            Cyber Security
                          </option> */}
                        </select>
                        <p className="errorMsg">{formData?.categoryErrMsg}</p>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        xl={3}
                        sx={{ paddingTop: { xs: "67px !important", md: 3 } }}
                        onChange={() =>
                          setDisplayEnrolment((_prevState) => !_prevState)
                        }
                      >
                        <FormControlLabel
                          control={<BigSwitch sx={{ m: 1 }} />}
                          label="Display enrolment count?"
                        />
                      </Grid>
                    </Grid>
                    <Grid item container>
                      <Grid item xs={12}>
                        <Box paddingTop={"24px"}>
                          <button
                            type="submit"
                            className="lightBtn"
                            onClick={handelReviewSubmit}
                          >
                            Submit for Review
                          </button>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
            <Grid className="instDashRight" item width={366}>
              <CourseGuidePanel />
            </Grid>
          </Grid>
        </div>

        {/* Add Lesson Dialog START */}
        <Dialog
          open={openLessonModal}
          onClose={handleCloseLessonModal}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth
          maxWidth="sm"
          className="modalOne"
        >
          <DialogTitle id="alert-dialog-title">
            <Grid container justifyContent={"space-between"}>
              <Grid item>
                <p className="mainText fontWeight-700">
                  {isEditingCourseContent ? "Update" : "Add"} Lesson
                </p>
              </Grid>
              <Grid item>
                <Button className="modalClose" onClick={handleCloseLessonModal}>
                  <CloseIcon />
                </Button>
              </Grid>
            </Grid>
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <label className="formlabel">Lesson Type</label>
                <select
                  className="form-control"
                  name="lessonType"
                  value={lessonFormData.lessonType}
                  onChange={(_event) => {
                    handelLessonChange(_event);
                  }}
                >
                  <option value="" selected disabled hidden>
                    Please Select
                  </option>
                  <option value={"text"}>Text</option>
                  <option value={"video"}>Video</option>
                  <option value={"document"}>Document / File</option>
                </select>
                <p className="errorMsg">{lessonFormData?.lessonTypeErrMsg}</p>
              </Grid>
              <Grid item xs={12}>
                <label className="formlabel">Lesson Title</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Type Here"
                  name="lessonTitle"
                  value={lessonFormData.lessonTitle}
                  onChange={(_event) => {
                    handelLessonChange(_event);
                  }}
                />
                <p className="errorMsg">{lessonFormData?.lessonTitleErrMsg}</p>
              </Grid>
              <Grid item xs={12}>
                <label className="formlabel">Lesson Content</label>
                <textarea
                  className="form-control"
                  placeholder="Type Here"
                  name="lessonContent"
                  value={lessonFormData.lessonContent}
                  onChange={(_event) => {
                    handelLessonChange(_event);
                  }}
                ></textarea>
                <p className="errorMsg">
                  {lessonFormData?.lessonContentErrMsg}
                </p>
              </Grid>
              <Grid item xs={12}>
                <div
                  className="fileUploadTwo"
                  style={
                    lessonFormData.lessonType === "text" ||
                    lessonFormData.lessonType === ""
                      ? { pointerEvents: "none", opacity: 0.4 }
                      : null
                  }
                >
                  <input
                    type="file"
                    name="certificate"
                    multiple
                    accept=".pdf, .txt, .html, .webm, .mp4, .avi, .mkv, .gif, .avi, .wmv, .3gp, .doc"
                    ref={fileInputRef2}
                    onChange={(val) =>
                      handlemultiFileUploadCvLink(val.target.files)
                    }
                  />
                  <p className="subTextOne fontWeight-700 textCenter">
                    Drop one or more file(s) here or <span>browse</span>
                  </p>
                  <p className="subTextTwo">Max. File Size: 200MB</p>
                </div>
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
                                    : "Uploading"}
                                  : <span>{item?.imgName}</span>
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
                                const data = cvLink;
                                data.splice(index, 1);

                                if (
                                  lessonFormData.lessonType === "video" ||
                                  lessonFormData.lessonType === "document"
                                ) {
                                  const lessonFiles = [];
                                  data?.forEach(async (element) => {
                                    if (element) {
                                      lessonFiles.push(element.cvFileLinks);
                                    }
                                  });
                                  //Update lesson form data
                                  setLessonFormData((_prevState) => ({
                                    ..._prevState,
                                    ["lessonUploadFile"]: lessonFiles,
                                    ["lessonUploadFileErr"]: false,
                                    ["lessonUploadFileErrMsg"]: "",
                                  }));
                                }

                                setCvLink(() => {
                                  return JSON.parse(JSON.stringify(data));
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
                                    <rect width="24" height="24" fill="white" />
                                  </clipPath>
                                </defs>
                              </svg>
                            </button>
                          </div>
                        </div>
                      );
                    })
                  : null}
                {isFileMissing ? (
                  <p className="errorMsg">{"File is required"}</p>
                ) : null}
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <button className="lightBtn fullWidth" onClick={handelLessonSubmit}>
              Save
            </button>
          </DialogActions>
        </Dialog>
        {/* Add Lesson Dialog END */}

        {/* Add QUIZ Dialog START */}
        <Dialog
          open={openQuizModal}
          onClose={() => {
            setCloseQuizClicked(false);
            handleCloseQuizModal(false);
          }}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth
          maxWidth="sm"
          className="modalOne"
        >
          <DialogTitle id="alert-dialog-title">
            <Grid container justifyContent={"space-between"}>
              <Grid item>
                <p className="mainText fontWeight-700">{getQuestionHeader}</p>
              </Grid>
              <Grid item>
                <Button
                  className="modalClose"
                  onClick={() => {
                    setCloseQuizClicked(false);
                    handleCloseQuizModal(false);
                  }}
                >
                  <CloseIcon />
                </Button>
              </Grid>
            </Grid>
          </DialogTitle>
          <DialogContent>
            {/* Add Quiz Step One START */}

            {!isQuizQuestionTypeOpened ? (
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <label className="formlabel">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Type Here"
                    name="quizTitle"
                    value={quizFormData.quizTitle}
                    onChange={(_event) => {
                      setQuizFormData((_prevState) => ({
                        ..._prevState,
                        [_event.target.name]: _event.target.value,
                        [`${_event.target.name}Err`]: false,
                        [`${_event.target.name}ErrMsg`]: "",
                      }));
                    }}
                  />
                  <p className="errorMsg">{quizFormData?.quizTitleErrMsg}</p>
                </Grid>
                {getQuizContent}
                <Grid item xs={12}>
                  <Grid
                    item
                    container
                    justifyContent={"space-between"}
                    paddingBottom={1}
                  >
                    <Grid item>
                      <p className="subTextTwo">Set Passing Percentage</p>
                    </Grid>
                    <Grid item>
                      <p className="subTextTwo">
                        {quizFormData?.quizPassPercentage ??
                          QUIZ_PASS_PERCENTAGE}
                        %
                      </p>
                    </Grid>
                  </Grid>
                  <Slider
                    defaultValue={
                      quizFormData?.quizPassPercentage ?? QUIZ_PASS_PERCENTAGE
                    }
                    aria-label="Default"
                    valueLabelDisplay="auto"
                    name="quizPassPercentage"
                    onChange={(_event) => {
                      setQuizFormData((_prevState) => ({
                        ..._prevState,
                        [_event.target.name]: _event.target.value,
                      }));
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <button className="lightgreyBtn" onClick={handleSaveQuizData}>
                    Add Question
                  </button>
                </Grid>
              </Grid>
            ) : null}

            {/* Add Quiz Step One END */}

            {/* Add Quiz Question Type START */}

            {isQuizQuestionTypeOpened && !isChoosedQuestionType ? (
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <p className="subTextTwo">Choose question type</p>
                </Grid>
                <Grid item container paddingTop={3} spacing={3}>
                  <Grid item xs={6}>
                    <Box
                      className="questionRadio"
                      onClick={() => setQuizQuestionType("Multiple_Choices")}
                    >
                      <input type="radio" name="questiontype" />
                      <Box className="questionRadioInner">
                        <img src={listparagraphdotscircle} />
                        <p className="subTextTwo textCenter">
                          Multiple Choices
                        </p>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box
                      className="questionRadio"
                      onClick={() => setQuizQuestionType("Single_Choice")}
                    >
                      <input type="radio" name="questiontype" />
                      <Box className="questionRadioInner">
                        <img src={listparagraphdotscircleone} />
                        <p className="subTextTwo textCenter">Single Choice</p>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box
                      className="questionRadio"
                      onClick={() => setQuizQuestionType("True_or_False")}
                    >
                      <input type="radio" name="questiontype" />
                      <Box className="questionRadioInner">
                        <img src={truefalse} />
                        <p className="subTextTwo textCenter">True or False</p>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box
                      className="questionRadio"
                      onClick={() => setQuizQuestionType("Type_Answer")}
                    >
                      <input type="radio" name="questiontype" />
                      <Box className="questionRadioInner">
                        <img src={listparagraphtexta} />
                        <p className="subTextTwo textCenter">Type Answer</p>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <button
                      className="lightBtn fullWidth"
                      onClick={() => setChoosedQuestionType(true)}
                    >
                      Continue
                    </button>
                  </Grid>
                </Grid>
              </Grid>
            ) : null}

            {/* Add Quiz Question Type END */}

            {/* Add Multiple Choice Question START */}

            {isChoosedQuestionType &&
            quizQuestionType === "Multiple_Choices" ? (
              <Grid container spacing={3} marginTop={1}>
                <Grid item xs={12}>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Type your question here"
                    name="multipleQuestion"
                    value={multipleQuestionFormData.multipleQuestion}
                    onChange={(_event) => {
                      handleMultipleQuestionChange(_event);
                    }}
                  />
                  <p className="errorMsg">
                    {multipleQuestionFormData?.multipleQuestionErrMsg}
                  </p>
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<BigSwitch sx={{ m: 1 }} />}
                    label="Make this a Poll"
                  />
                </Grid>
                <Grid item xs={12}>
                  <p className="subTextTwo">
                    Answers (Check the correct answers, options will be
                    randomized for students)
                  </p>
                  <Box className="questionBox multiplequestionBox">
                    <Box className="questionBoxBlock">{getMcqAnswersList}</Box>
                    <Box paddingTop={3}>
                      <button
                        className="addOptionBtn"
                        onClick={() => setMcqOptionsList(mcqOptionsList + 1)}
                      >
                        <AddIcon /> Add Option
                      </button>
                    </Box>
                  </Box>
                  <p className="errorMsg">
                    {multipleQuestionFormData?.multipleAnswerErrMsg}
                  </p>
                </Grid>
                <Grid item xs={12}>
                  <button
                    className="lightBtn fullWidth"
                    onClick={handleMultipleQuestionSubmit}
                  >
                    Save
                  </button>
                </Grid>
              </Grid>
            ) : null}

            {/* Add Multiple Choice Question END */}

            {/* Add Single Choice Question START */}

            {isChoosedQuestionType && quizQuestionType === "Single_Choice" ? (
              <Grid container spacing={3} marginTop={1}>
                <Grid item xs={12}>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Type your question here"
                    name="singleQuestion"
                    value={singleQuestionFormData.singleQuestion}
                    onChange={(_event) => {
                      handleSingleQuestionChange(_event);
                    }}
                  />
                  <p className="errorMsg">
                    {singleQuestionFormData?.singleQuestionErrMsg}
                  </p>
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<BigSwitch sx={{ m: 1 }} />}
                    label="Make this a Poll"
                  />
                </Grid>
                <Grid item xs={12}>
                  <p className="subTextTwo">
                    Answers (Check the correct answers, options will be
                    randomized for students)
                  </p>
                  <Box className="questionBox multiplequestionBox">
                    <Box className="questionBoxBlock">{getScqAnswersList}</Box>
                    <Box paddingTop={3}>
                      <button
                        className="addOptionBtn"
                        onClick={() => setScqOptionsList(scqOptionsList + 1)}
                      >
                        <AddIcon /> Add Option
                      </button>
                    </Box>
                  </Box>
                  <p className="errorMsg">
                    {singleQuestionFormData?.singleAnswerErrMsg}
                  </p>
                </Grid>
                <Grid item xs={12}>
                  <button
                    className="lightBtn fullWidth"
                    onClick={handleSingleQuestionSubmit}
                  >
                    Save
                  </button>
                </Grid>
              </Grid>
            ) : null}

            {/* Add Single Choice Question END */}

            {/* Add True and False Choice Question START */}

            {isChoosedQuestionType && quizQuestionType === "True_or_False" ? (
              <Grid container spacing={3} marginTop={1}>
                <Grid item xs={12}>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Type your question here"
                    name="booleanQuestion"
                    value={booleanQuestionFormData.booleanQuestion}
                    onChange={(_event) => {
                      handleBooleanQuestionChange(_event);
                    }}
                  />
                  <p className="errorMsg">
                    {booleanQuestionFormData?.booleanQuestionErrMsg}
                  </p>
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<BigSwitch sx={{ m: 1 }} />}
                    label="Make this a Poll"
                  />
                </Grid>
                <Grid item xs={12}>
                  <p className="subTextTwo">
                    Answers (Check the correct answers, options will be
                    randomized for students)
                  </p>
                  <Box className="questionBox multiplequestionBox">
                    <Box className="questionBoxBlock">
                      <Box className="questionBoxInner">
                        <Grid
                          item
                          container
                          justifyContent={"space-between"}
                          alignItems={"center"}
                        >
                          <Grid item>
                            <div className="lightforthCheckbox">
                              <div className="mainCheck">
                                <input
                                  type="radio"
                                  name="booleanAnswer"
                                  value={"true"}
                                  onChange={(_event) => {
                                    handleBooleanQuestionChange(_event);
                                  }}
                                  checked={
                                    booleanQuestionFormData.booleanAnswer ===
                                    "true"
                                      ? "checked"
                                      : null
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
                              <label>True</label>
                            </div>
                          </Grid>
                          {/* <Grid item>
                            <Grid item container>
                              <button>
                                <img src={copypasteIcon} />
                              </button>
                              <button>
                                <img src={trashIcon} />
                              </button>
                            </Grid>
                          </Grid> */}
                        </Grid>
                      </Box>
                      <Box className="questionBoxInner">
                        <Grid
                          item
                          container
                          justifyContent={"space-between"}
                          alignItems={"center"}
                        >
                          <Grid item>
                            <div className="lightforthCheckbox">
                              <div className="mainCheck">
                                <input
                                  type="radio"
                                  name="booleanAnswer"
                                  value={"false"}
                                  onChange={(_event) => {
                                    handleBooleanQuestionChange(_event);
                                  }}
                                  checked={
                                    booleanQuestionFormData.booleanAnswer ===
                                    "false"
                                      ? "checked"
                                      : null
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
                              <label>False</label>
                            </div>
                          </Grid>
                          {/* <Grid item>
                            <Grid item container>
                              <button>
                                <img src={copypasteIcon} />
                              </button>
                              <button>
                                <img src={trashIcon} />
                              </button>
                            </Grid>
                          </Grid> */}
                        </Grid>
                      </Box>
                    </Box>
                  </Box>
                  <p className="errorMsg">
                    {booleanQuestionFormData?.booleanAnswerErrMsg}
                  </p>
                </Grid>
                <Grid item xs={12}>
                  <button
                    className="lightBtn fullWidth"
                    onClick={handleBooleanQuestionSubmit}
                  >
                    Save
                  </button>
                </Grid>
              </Grid>
            ) : null}

            {/* Add True and False Choice Question END */}

            {/* Add Type Answer Question START */}

            {isChoosedQuestionType && quizQuestionType === "Type_Answer" ? (
              <Grid container spacing={3} marginTop={0.1}>
                <Grid item xs={12}>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Type your question here"
                    name="typeQuestion"
                    value={typeAnswerQuestionFormData.typeQuestion}
                    onChange={(_event) => {
                      handleTypeAnswerQuestionChange(_event);
                    }}
                  />
                  <p className="errorMsg">
                    {typeAnswerQuestionFormData?.typeQuestionErrMsg}
                  </p>
                </Grid>
                <Grid item xs={12}>
                  <p className="subTextTwo">
                    Enter answer with essential keywords for the AI system to
                    auto-grade
                  </p>
                  <Grid item container>
                    <Grid item xs={12}>
                      <textarea
                        className="form-control"
                        placeholder="Type Here"
                        style={{ height: "100px" }}
                        name="typeAnswer"
                        value={typeAnswerQuestionFormData.typeAnswer}
                        onChange={(_event) => {
                          handleTypeAnswerQuestionChange(_event);
                        }}
                      ></textarea>
                    </Grid>
                  </Grid>
                  <p className="errorMsg">
                    {typeAnswerQuestionFormData?.typeAnswerErrMsg}
                  </p>
                </Grid>
                <Grid item xs={12}>
                  <button
                    className="lightBtn fullWidth"
                    onClick={handleTypeAnswerQuestionSubmit}
                  >
                    Save
                  </button>
                </Grid>
              </Grid>
            ) : null}

            {/* Add Type Answer Question END */}
          </DialogContent>
        </Dialog>
        {/* Add QUIZ Dialog END */}

        <SuccessDialog
          handleOpenModal={reviewmodal}
          type="review"
          handleCloseModal={reviewModalClose}
          title="Your course has been sent for review"
        />
      </Seo>
    </AuthGuard>
  );
}

Component.displayName = "InstructorNewCourse";
