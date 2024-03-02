import { AuthGuard } from "../../../guards/super-admin/auth-guard";
import Seo from "@/components/common/seo";
import React, { useState, useEffect } from "react";
import moment from "moment";
import { Document, Page } from "react-pdf";

import { Link, useNavigate, useParams } from "react-router-dom";

import "../../../assets/css/super-admin/dashboard/style.css";
import "../../../assets/css/super-admin/dashboard/responsive.css";
import mobileIcon from "@/assets/images/mobile.svg";
import smsIcon from "@/assets/images/sms.svg";
import shareIcon from "@/assets/images/share.svg";
import pdfIcon from "@/assets/images/pdf.svg";
import eyeIcon from "@/assets/images/eye.svg";
import documentDownloadIcon from "@/assets/images/document-download.svg";
import programIcon from "@/assets/images/programIcon.svg";
import CloseIcon from "@mui/icons-material/Close";
import EastIcon from "@mui/icons-material/East";
import WestIcon from "@mui/icons-material/West";
import infowhiteIcon from "@/assets/images/info-white.svg";
import mediaImage from "@/assets/images/media.png";
import playImage from "@/assets/images/play-img.png";
import textAlignImage from "@/assets/images/text-align.png";
import docImage from "@/assets/images/document.png";
import listImage from "@/assets/images/list.png";
import profileImage from "@/assets/images/profile-image.png";
import userIcon from "@/assets/images/user.png";
import chatIcon from "@/assets/images/chat-message.png";
import htmlImage from "@/assets/images/html.png";
import pdfImage from "@/assets/images/pdf.png";
import usImage from "@/assets/images/us.png";
import delteImage from "@/assets/images/delete.svg";

import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";

import {
  Avatar,
  Box,
  Breadcrumbs,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Slide,
  TextField,
  Typography,
} from "@mui/material";

import {
  useInstructorDetailsMutation,
  useInstructorApprovedMutation,
} from "../../../redux/api/super-admin/instructor";
import {
  useGetSingleCourseMutation,
  useStatusChangeAdminMutation,
} from "../../../redux/api/super-admin/course";
import { toast } from "react-toastify";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export function Component() {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [rejectreason, setRejectReason] = useState("");
  const [getSingleCourse, { isSuccess, isLoading, data }] =
    useGetSingleCourseMutation();
  const [
    doStatusChange,
    {
      isSuccess: dataSuccess,
      isLoading: dataLoading,
      data: singleData,
      isError,
      error,
    },
  ] = useStatusChangeAdminMutation();
  const metaTags = [
    { name: "Metaname1", content: "content1" },
    { name: "Metaname2", content: "content2" },
  ];

  console.log("Singledata", data);
  const [open, setOpen] = useState(false);

  const rejectModalOpen = () => {
    setOpen(true);
  };

  const rejectModalClose = () => {
    setOpen(false);
  };
  const handleStatusChange = (status) => {
    doStatusChange({
      courseId: [data?.data?.courseUniqueId],
      action: status,
      courseRejectionReason: rejectreason,
    });
  };
  useEffect(() => {
    getSingleCourse({
      courseId: courseId,
    });
  }, [courseId]);
  useEffect(() => {
    if (dataSuccess && singleData) {
      toast.success(singleData?.message);
      navigate("/super-admin/courses");
    }
  }, [dataSuccess, singleData]);

  useEffect(() => {
    if (isError && error) {
      toast.error(error?.data?.message);
    }
  }, [isError, error]);
  return (
    <AuthGuard>
      <Seo title="Dashboard" metaName="Metaname" metaTags={metaTags}>
        <div className="mainDashboardArea">
          <Grid>
            <Breadcrumbs
              aria-label="breadcrumb"
              separator={<NavigateNextRoundedIcon />}
              className="cstmBreadCrumb"
              paddingBottom={2}
            >
              <Link
                className="subTextOne fontWeight-500"
                href="/super-admin/courses"
              >
                Courses
              </Link>
              <Link className="subTextOne" href="/super-admin/courses">
                {data?.data?.courseApprovalStatus}
              </Link>
              <p className="subTextOne m-0">{data?.data?.title}</p>
            </Breadcrumbs>
          </Grid>
          <Grid container>
            <Grid
              item
              sx={{
                width: { xs: "calc(100% - 0px)", md: "calc(100% - 290px)" },
              }}
              padding={{ md: "18px 15px", lg: "24px 20px", xl: "24px 30px" }}
            >
              <Grid item container>
                <Grid item xs={12} lg={7} paddingRight={{ lg: 2, xl: 3 }}>
                  <Grid item xs={12} className="cardBox">
                    <Grid className="mediaImage" marginBottom={2}>
                      <img src={data?.data?.image} alt="" />
                    </Grid>
                    <p className="mainText">{data?.data?.title}</p>
                    <p className="subTextTwo" marginTop={2}>
                      {data?.data?.description}
                    </p>
                  </Grid>

                  <Grid
                    item
                    className="couseOutline_list"
                    marginTop={2}
                    padding={{ md: 3 }}
                    borderRadius={"12px"}
                    border={"1px solid #EEEEEE"}
                  >
                    <h3 className="subTextOne fontWeight-700">
                      Course Outline
                    </h3>
                    <List sx={{ padding: "0px" }}>
                      {data?.data?.courseContent.map((it, ind) => {
                        return (
                          <ListItem className="courseOut_listItm" key={ind}>
                            <ListItemText>
                              <span className="subTextOne d-block">
                                {it?.title}
                              </span>
                              <span className="subTextTwo d-block">
                                {it?.lessonType} {it?.contentType}
                              </span>
                            </ListItemText>
                            <img src={playImage} alt="" />
                          </ListItem>
                        );
                      })}

                      {/* <ListItem className="courseOut_listItm">
                        <ListItemText>
                          <span className="subTextOne d-block">
                            Getting Started with Web Design
                          </span>
                          <span className="subTextTwo d-block">
                            Text Lesson
                          </span>
                        </ListItemText>
                        <img src={textAlignImage} alt="" />
                      </ListItem>
                      <ListItem className="courseOut_listItm">
                        <ListItemText>
                          <span className="subTextOne d-block">
                            Starting the Ideation Process
                          </span>
                          <span className="subTextTwo d-block">
                            Video Lesson
                          </span>
                        </ListItemText>
                        <img src={playImage} alt="" />
                      </ListItem>
                      <ListItem className="courseOut_listItm">
                        <ListItemText>
                          <span className="subTextOne d-block">
                            Resource Files
                          </span>
                          <span className="subTextTwo d-block">Files</span>
                        </ListItemText>
                        <img src={docImage} alt="" />
                      </ListItem>
                      <ListItem className="courseOut_listItm">
                        <ListItemText>
                          <span className="subTextOne d-block">Questions</span>
                          <span className="subTextTwo d-block">Quiz</span>
                        </ListItemText>
                        <img src={listImage} alt="" />
                      </ListItem>
                      <ListItem className="courseOut_listItm">
                        <ListItemText>
                          <span className="subTextOne d-block">Conclusion</span>
                          <span className="subTextTwo d-block">
                            Text Lesson
                          </span>
                        </ListItemText>
                        <img src={textAlignImage} alt="" />
                      </ListItem>
                      <ListItem className="courseOut_listItm">
                        <ListItemText>
                          <span className="subTextOne d-block">
                            Practice Session
                          </span>
                          <span className="subTextTwo d-block">
                            Video Lesson
                          </span>
                        </ListItemText>
                        <img src={playImage} alt="" />
                      </ListItem> */}
                    </List>
                  </Grid>
                </Grid>
                <Grid
                  item
                  xs={12}
                  lg={5}
                  paddingRight={{ lg: 2, xl: 3 }}
                  paddingLeft={{ lg: 2, xl: 3 }}
                  marginTop={{ xs: 3, lg: 0 }}
                >
                  <Grid
                    item
                    xs={12}
                    className="courseDtl_profile"
                    padding={{ xs: 2, xl: 3 }}
                  >
                    <Grid item container alignItems={"center"}>
                      <Grid
                        className="courseProfile"
                        sx={{ width: { xs: "40px", md: "56px" } }}
                        borderRadius={"12px"}
                      >
                        <img src={data?.data?.profilePicture} alt="" />
                      </Grid>
                      <Grid className="courseProfName" paddingLeft={"12px"}>
                        <h4 className="mainText">{data?.data?.fullName}</h4>
                        <span className="subTextTwo d-block">Instructor</span>
                      </Grid>
                    </Grid>

                    <Grid
                      item
                      container
                      columnGap={"18px"}
                      marginTop={3}
                      className="coursePrfoInfo"
                    >
                      <Box item>
                        <strong className="d-block subTextTwo fontWeight-700">
                          Date Joined
                        </strong>
                        <p
                          className="subTextTwo fontWeight-500"
                          marginTop={"4px"}
                        >
                          {moment(data?.data?.userCreatedAt).format(
                            "Do MMMM YYYY"
                          )}
                        </p>
                      </Box>
                      <Box item>
                        <strong className="d-block subTextTwo fontWeight-700">
                          Experience
                        </strong>
                        <p
                          className="subTextTwo fontWeight-500"
                          marginTop={"4px"}
                        >
                          {data?.data?.Experience}
                        </p>
                      </Box>
                    </Grid>

                    <Grid
                      item
                      container
                      columnGap={"12px"}
                      marginTop={3}
                      className="courseProfAction_area"
                    >
                      <Link to="#" className="primaryOutlineBtn grayOutlineBtn">
                        <img src={userIcon} alt="" />
                        View Profile
                      </Link>
                      <Link to="#" className="primaryOutlineBtn grayOutlineBtn">
                        <img src={chatIcon} alt="" />
                        Message
                      </Link>
                    </Grid>
                  </Grid>

                  <Grid
                    item
                    container
                    xs={12}
                    spacing={1}
                    marginTop={4}
                    className="coursePriceDtl"
                  >
                    <Grid item xs={6}>
                      <Grid
                        item
                        className="coursePriceDtlBox"
                        padding={{ xs: 2, xl: 3 }}
                        sx={{
                          backgroundColor: "var(--neutral-100)",
                          borderRadius: "12px",
                        }}
                      >
                        <h3 className="subTextThree fontWeight-500">
                          ${data?.data?.price}
                        </h3>
                        <span className="d-block subTextTwo">Price</span>
                      </Grid>
                    </Grid>
                    <Grid item xs={6}>
                      <Grid
                        item
                        className="coursePriceDtlBox"
                        padding={{ xs: 2, xl: 3 }}
                        sx={{
                          backgroundColor: "var(--neutral-100)",
                          borderRadius: "12px",
                        }}
                      >
                        <h3 className="subTextThree fontWeight-500">
                          {data?.data?.lessonsCount}
                        </h3>
                        <span className="d-block subTextTwo">Lessons</span>
                      </Grid>
                    </Grid>
                    <Grid item xs={6}>
                      <Grid
                        item
                        className="coursePriceDtlBox"
                        padding={{ xs: 2, xl: 3 }}
                        sx={{
                          backgroundColor: "var(--neutral-100)",
                          borderRadius: "12px",
                        }}
                      >
                        <h3 className="subTextThree fontWeight-500">
                          {data?.data?.quizCount}
                        </h3>
                        <span className="d-block subTextTwo">Quizzes</span>
                      </Grid>
                    </Grid>
                    <Grid item xs={6}>
                      <Grid
                        item
                        className="coursePriceDtlBox"
                        padding={{ xs: 2, xl: 3 }}
                        sx={{
                          backgroundColor: "var(--neutral-100)",
                          borderRadius: "12px",
                        }}
                      >
                        <h3 className="subTextThree fontWeight-500">
                          {data?.data?.hourVideoTime}
                        </h3>
                        <span className="d-block subTextTwo">
                          Hour Video Time
                        </span>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item className="couseDtl_list" marginTop={4}>
                    <List sx={{ padding: "0px" }}>
                      <ListItem className="courDtl_listItm">
                        <ListItemText>
                          <p className="subTextOne fontWeight-700 courseDtlLbl">
                            Course ID
                          </p>
                        </ListItemText>
                        <ListItemText>
                          <p className="subTextOne courseDtlTxt">
                            {data?.data?.courseUniqueId}
                          </p>
                        </ListItemText>
                      </ListItem>
                      <ListItem className="courDtl_listItm">
                        <ListItemText>
                          <p className="subTextOne fontWeight-700 courseDtlLbl">
                            Category
                          </p>
                        </ListItemText>
                        <ListItemText>
                          <Link className="subTextOne courseDtlTxt">
                            {data?.data?.speciallization}
                          </Link>
                        </ListItemText>
                      </ListItem>
                      <ListItem className="courDtl_listItm">
                        <ListItemText>
                          <p className="subTextOne fontWeight-700 courseDtlLbl">
                            Published Date
                          </p>
                        </ListItemText>
                        <ListItemText>
                          <p className="subTextOne courseDtlTxt">
                            {moment(data?.data?.createdAt).format(
                              "Do MMMM YYYY h:mm a"
                            )}
                          </p>
                        </ListItemText>
                      </ListItem>
                      <ListItem className="courDtl_listItm">
                        <ListItemText>
                          <p className="subTextOne fontWeight-700 courseDtlLbl">
                            Skill Level
                          </p>
                        </ListItemText>
                        <ListItemText>
                          <p className="subTextOne courseDtlTxt">
                            {data?.data?.skillLevel}
                          </p>
                        </ListItemText>
                      </ListItem>
                      <ListItem className="courDtl_listItm">
                        <ListItemText>
                          <p className="subTextOne fontWeight-700 courseDtlLbl">
                            Language
                          </p>
                        </ListItemText>
                        <ListItemText>
                          <p className="subTextOne courseDtlTxt">
                            {/* <img src={usImage} alt="" />  */}
                            {data?.data?.language}
                          </p>
                        </ListItemText>
                      </ListItem>
                    </List>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              width={{ xs: "100%", md: 290 }}
              sx={{
                borderLeft: { md: "1px solid #EEEEEE" },
                borderBottom: { md: "1px solid #EEEEEE" },
                marginTop: { xs: "16px", md: "0" },
              }}
            >
              {data?.data?.courseApprovalStatus == "PENDING" &&
                !data?.data?.isDeleted && (
                  <Grid
                    item
                    container
                    className="courseDtl_right_actionBox"
                    padding={{
                      sm: "18px 0px",
                      md: "18px 10px",
                      lg: "24px 30px",
                    }}
                    sx={{ borderBottom: "1px solid #EEEEEE" }}
                    rowGap={1}
                    paddingBottom={{ xs: 2 }}
                  >
                    <Button
                      container
                      className="primaryOutlineBtn grayOutlineBtn fullWidth"
                      sx={{ justifyContent: "flex-start" }}
                      onClick={() => handleStatusChange("APPROVED")}
                    >
                      <CheckRoundedIcon />
                      Approve
                    </Button>
                    <Button
                      container
                      className="primaryOutlineBtn grayOutlineBtn fullWidth"
                      sx={{ justifyContent: "flex-start" }}
                      onClick={rejectModalOpen}
                    >
                      <CloseRoundedIcon />
                      Reject
                    </Button>
                    <Button
                      container
                      className="primaryOutlineBtn grayOutlineBtn fullWidth"
                      sx={{ justifyContent: "flex-start" }}
                      onClick={() => handleStatusChange("DELETED")}
                    >
                      <img src={delteImage} alt="" />
                      Delete
                    </Button>
                  </Grid>
                )}

              <Grid
                item
                className="attachBox"
                padding={{ xs: "18px 0px", md: "18px 10px", lg: "24px 30px" }}
              >
                <h3 className="subTextOne fontWeight-700 mb-0">
                  Attached Files
                </h3>

                <List
                  className="attachList"
                  sx={{ padding: "0px", marginTop: "16px" }}
                >
                  <ListItem className="attach_listItm">
                    <ListItemIcon sx={{ marginRight: "12px" }}>
                      <img src={htmlImage} alt="" />
                    </ListItemIcon>
                    <ListItemText className="m-0">
                      <p className="subTextTwo courseDocName mb-0">
                        SAML18920-An-.html
                      </p>
                      <span className="docSize">231.72 KB</span>
                    </ListItemText>
                    <Button className="viewIcon">
                      <VisibilityOutlinedIcon />
                    </Button>
                  </ListItem>
                  <ListItem className="attach_listItm">
                    <ListItemIcon sx={{ marginRight: "12px" }}>
                      <img src={htmlImage} alt="" />
                    </ListItemIcon>
                    <ListItemText className="m-0">
                      <p className="subTextTwo courseDocName mb-0">
                        SAML18920-An-.html
                      </p>
                      <span className="docSize">231.72 KB</span>
                    </ListItemText>
                    <Button className="viewIcon">
                      <VisibilityOutlinedIcon />
                    </Button>
                  </ListItem>
                  <ListItem className="attach_listItm">
                    <ListItemIcon sx={{ marginRight: "12px" }}>
                      <img src={pdfImage} alt="" />
                    </ListItemIcon>
                    <ListItemText className="m-0">
                      <p className="subTextTwo courseDocName mb-0">
                        SAML18920-An-1293.png
                      </p>
                      <span className="docSize">81.72 KB</span>
                    </ListItemText>
                    <Button className="viewIcon">
                      <VisibilityOutlinedIcon />
                    </Button>
                  </ListItem>
                  <ListItem className="attach_listItm">
                    <ListItemIcon sx={{ marginRight: "12px" }}>
                      <img src={htmlImage} alt="" />
                    </ListItemIcon>
                    <ListItemText className="m-0">
                      <p className="subTextTwo courseDocName mb-0">
                        SAML18920-An-.html
                      </p>
                      <span className="docSize">231.72 KB</span>
                    </ListItemText>
                    <Button className="viewIcon">
                      <VisibilityOutlinedIcon />
                    </Button>
                  </ListItem>
                  <ListItem className="attach_listItm">
                    <ListItemIcon sx={{ marginRight: "12px" }}>
                      <img src={pdfImage} alt="" />
                    </ListItemIcon>
                    <ListItemText className="m-0">
                      <p className="subTextTwo courseDocName mb-0">
                        SAML18920-An-1293.png
                      </p>
                      <span className="docSize">231.72 KB</span>
                    </ListItemText>
                    <Button className="viewIcon">
                      <VisibilityOutlinedIcon />
                    </Button>
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          </Grid>
        </div>

        <Dialog open={open} onClose={rejectModalClose} className="rejectDialog">
          <DialogTitle>
            <h5>Reject Course</h5>
          </DialogTitle>

          <DialogContent>
            <Grid item>
              <span className="d-block fontWeight-700 subTextTwo rejectModal_lbl">
                Course Name
              </span>
              <p className="subTextOne">{data?.data?.title}</p>
            </Grid>
            <Grid item container marginTop={3}>
              <Grid item xs={6}>
                <span className="d-block fontWeight-700 subTextTwo rejectModal_lbl">
                  Instructor
                </span>
                <p className="subTextOne">{data?.data?.fullName}</p>
              </Grid>
              <Grid item xs={6}>
                <span className="d-block fontWeight-700 subTextTwo rejectModal_lbl">
                  Status
                </span>
                <p className="subTextOne">{data?.data?.courseApprovalStatus}</p>
              </Grid>
            </Grid>

            <Grid
              item
              sx={{ width: { xs: "100%", md: "480px" } }}
              marginTop={2}
              className="rejectModaltxtarea"
            >
              <span className="subTextTwo fontWeight-700">Reason</span>
              <TextField
                fullWidth
                label="Type here"
                id="fullWidth"
                value={rejectreason}
                onChange={(val) => setRejectReason(val.target.value)}
              />
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={rejectModalClose}>Cancel</Button>
            <Button
              onClick={() => {
                rejectModalClose(), handleStatusChange("REJECTED");
              }}
              className="rejectBtn"
            >
              Reject
            </Button>
          </DialogActions>
        </Dialog>
      </Seo>
    </AuthGuard>
  );
}

Component.displayName = "SuperAdminCourses";
