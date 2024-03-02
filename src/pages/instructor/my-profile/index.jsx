import { AuthGuard } from "../../../guards/instructor/auth-guard";
import Seo from "@/components/common/seo";

import "../../../assets/css/instructor-dashboard/style.css";
import "../../../assets/css/instructor-dashboard/responsive.css";

import mobileIcon from "@/assets/images/mobile.svg";
import avatarDemo from "@/assets/images/avatar-demo.png";
import editPurpleIcon from "@/assets/images/edit-purple.svg";
import smsIcon from "@/assets/images/sms.svg";
import shareIcon from "@/assets/images/share.svg";

import programIcon from "@/assets/images/programIcon.svg";
import {
  Avatar,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import RightSideBar from "../../../components/common/RightSideBar";
import { useGetMyProfileMutation } from "../../../redux/api/instructor/auth";
import { useEffect, useState } from "react";

const metaTags = [
  { name: "Metaname1", content: "content1" },
  { name: "Metaname2", content: "content2" },
];

export function Component() {
  const [getDetails, { isLoading, isSuccess, data }] =
    useGetMyProfileMutation();
  const [profileDetails, setProfileDetails] = useState(null);

  useEffect(() => {
    getDetails();
  }, []);
  useEffect(() => {
    console.log("data", data);
    if (isSuccess) {
      setProfileDetails(data?.data);
    }
  }, [isSuccess]);
  return (
    <AuthGuard>
      <Seo title="Login" metaName="Metaname" metaTags={metaTags}>
        <div className="mainDashboardArea">
          <Grid container>
            <Grid
              className="instDashLeft"
              item
              sx={{ width: "calc(100% - 366px)", paddingRight: "64px" }}
            >
              <Grid
                container
                className="layoutHead"
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Grid item xs={12} sm={8}>
                  <Grid item container alignItems={"center"} columnGap={"20px"}>
                    <Link to="#" className="backBtn">
                      <ArrowBackIcon />
                    </Link>
                    <h4>My Profile</h4>
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={4} paddingTop={{xs:3, sm:0}}>
                  <Grid
                    item
                    container
                    justifyContent={{ xs: "flex-start", sm: "flex-end" }}
                  >
                    <Grid item xs={12} sm="auto">
                      <div className="newCoursebtndiv">
                        <Link
                          to={"/instructor/profile/edit-profile"}
                          className="lightBtn fullWidth"
                        >
                          <img src={editPurpleIcon} alt="icon" />
                          Edit Profile
                        </Link>
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              <div className="profilePage">
                <div className="profileRow">
                  <div className="profileLeft">
                    <div className="profileNameWithPic">
                      <Avatar src={profileDetails?.profilePicture} />
                      <h5>
                        {profileDetails?.firstName} {profileDetails?.lastName}
                      </h5>
                      <p className="subTextOne">{profileDetails?.username}</p>
                    </div>
                    <div className="profileInfo">
                      <List disablePadding>
                        <ListItem disableGutters>
                          <ListItemIcon>
                            <img src={programIcon} />
                          </ListItemIcon>
                          <ListItemText
                            primary={profileDetails?.specialization}
                          />
                        </ListItem>
                        <ListItem disableGutters>
                          <ListItemIcon>
                            <img src={mobileIcon} />
                          </ListItemIcon>
                          <ListItemText
                            primary={profileDetails?.phoneno}
                            style={{ cursor: "pointer" }}
                          />
                        </ListItem>
                        <ListItem disableGutters>
                          <ListItemIcon>
                            <img src={smsIcon} />
                          </ListItemIcon>
                          <ListItemText
                            primary={profileDetails?.email}
                            style={{ cursor: "pointer" }}
                          />
                        </ListItem>
                        <ListItem disableGutters>
                          <ListItemIcon>
                            <img src={shareIcon} />
                          </ListItemIcon>
                          <ListItemText primary={profileDetails?.website} />
                        </ListItem>
                      </List>
                    </div>
                    <div className="profileSummaryBlock">
                      <p className="subTextOne fontWeight-700">Summary</p>
                      <p className="subTextTwo">{profileDetails?.summary}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Grid>
            <RightSideBar profileDetails={profileDetails} />
          </Grid>
        </div>
      </Seo>
    </AuthGuard>
  );
}

Component.displayName = "InstructorProfile";
