import { AuthGuard } from "../../../guards/instructor/auth-guard";
import Seo from "@/components/common/seo";

import {
  Box,
  Button,
  Grid,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { items } from "../../../components/student/navbar-with-auth";
import AddIcon from "@mui/icons-material/Add";
import React from "react";
import teacherHandbookBoxImg from "@/assets/images/teacherHandbookBoxImg.png";
import guideimgone from "@/assets/images/guide-img-one.png";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

import talkIcon from "@/assets/images/talk-icon.svg";
import lightIcon from "@/assets/images/light.svg";

import "../../../assets/css/instructor-dashboard/style.css";
import "../../../assets/css/instructor-dashboard/responsive.css";
import CourseGuidePanel from "../../../components/common/CourseGuidePanel";

const metaTags = [
  { name: "Metaname1", content: "content1" },
  { name: "Metaname2", content: "content2" },
];

export function Component() {
 
  return (
    <AuthGuard>
      <Seo title="Login" metaName="Metaname" metaTags={metaTags}>
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
                    <Link to="#" className="backBtn">
                      <ArrowBackIcon />
                    </Link>
                    <h4>Teacher Handbook</h4>
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

              <Grid item container>
                <Grid item xs={12}>
                    <h4 className="mb-24">Must Read if You are a Teacher</h4>
                    <p className="subTextOne fontWeight-300">Lorem ipsum dolor sit amet, consectetur adi piscing elit. Morbi ornare ut velit ut venenatis. Maecenas non lectus mollis, convallis magna quis, sagittis felis. Quisque pharetra ante non massa blandit fringilla. Quisque porttitor ex consequat luctus accumsan. In ullamcorper feugiat lobortis.</p>

                    <p className="subTextOne fontWeight-300 mb-24">Lorem ipsum dolor sit amet, consectetur adi piscing elit. Morbi ornare ut velit ut venenatis. Maecenas non lectus mollis, convallis magna quis, sagittis felis. Quisque pharetra ante non massa blandit fringilla. Quisque porttitor ex consequat luctus accumsan. In ullamcorper feugiat lobortis. Lorem ipsum dolor sit amet, consectetur adi piscing elit. Morbi ornare ut velit ut venenatis. Maecenas non lectus mollis, convallis magna quis, sagittis felis. Quisque pharetra ante non massa blandit fringilla. Quisque porttitor ex consequat luctus accumsan. In ullamcorper feugiat lobortis. </p>

                    <p className="subTextOne fontWeight-300 mb-24">Lorem ipsum dolor sit amet, consectetur adi piscing elit. Morbi ornare ut velit ut venenatis. Maecenas non lectus mollis, convallis magna quis, sagittis felis. Quisque pharetra ante non massa blandit fringilla. Quisque porttitor ex consequat luctus accumsan. In ullamcorper feugiat lobortis. Lorem ipsum dolor sit amet, consectetur adi piscing elit. Morbi ornare ut velit ut venenatis. Maecenas non lectus mollis, convallis magna quis, sagittis felis. Quisque pharetra ante non massa blandit fringilla. Quisque porttitor ex consequat luctus accumsan. In ullamcorper feugiat lobortis. Lorem ipsum dolor sit amet, consectetur adi piscing elit. Morbi ornare ut velit ut venenatis. Maecenas non lectus mollis, convallis magna quis, sagittis felis. Quisque pharetra ante non massa blandit fringilla. Quisque porttitor ex consequat luctus accumsan. In ullamcorper feugiat lobortis. Lorem ipsum dolor sit amet, consectetur adi piscing elit. Morbi ornare ut velit ut venenatis. Maecenas non lectus mollis, convallis magna quis, sagittis felis. Quisque pharetra ante non massa blandit fringilla. Quisque porttitor ex consequat luctus accumsan. In ullamcorper feugiat lobortis. </p>

                    <p className="subTextOne fontWeight-300 mb-24">Lorem ipsum dolor sit amet, consectetur adi piscing elit. Morbi ornare ut velit ut venenatis. Maecenas non lectus mollis, convallis magna quis, sagittis felis. Quisque pharetra ante non massa blandit fringilla. Quisque porttitor ex consequat luctus accumsan. In ullamcorper feugiat lobortis. </p>
                </Grid>                
              </Grid>
            </Grid>
            <Grid className="instDashRight" item width={366}>
              <CourseGuidePanel />
            </Grid>
          </Grid>
        </div>
      </Seo>
    </AuthGuard>
  );
}

Component.displayName = "InstructorTeacherHandbook";
