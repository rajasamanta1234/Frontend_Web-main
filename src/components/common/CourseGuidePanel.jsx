import React from "react";
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
import { Link } from "react-router-dom";


import guideimgone from "@/assets/images/guide-img-one.png";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import teacherHandbookBoxImg from "@/assets/images/teacherHandbookBoxImg.png";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const CourseGuidePanel = () => {
  return (
    <>
      <Box className="courseGuidesBlock">
        <p className="mainText fontWeight-700">Guides</p>
        <Grid
          item
          container
          flexDirection={"column"}
          rowGap={3}
          paddingTop={1}
        >
          <Grid item xs={12}>
            <Link to="/instructor/course/guide">
              <Grid item container alignItems={"center"} spacing={2}>
                <Grid item width={120}>
                  <Box className="guidesVideoBlock">
                    <img src={guideimgone} width={"100%"} />
                    <Button>
                      <PlayArrowIcon />
                    </Button>
                  </Box>
                </Grid>
                <Grid item sx={{ width: "calc(100% - 120px)" }}>
                  <p className="subTextTwo fontWeight-500">
                    How to Upload Your Course Correctly
                  </p>
                </Grid>
              </Grid>
            </Link>
          </Grid>
          <Grid item xs={12}>
            <Link to="/instructor/course/guide">
              <Grid item container alignItems={"center"} spacing={2}>
                <Grid item width={120}>
                  <Box className="guidesVideoBlock">
                    <img src={guideimgone} />
                    <Button>
                      <PlayArrowIcon />
                    </Button>
                  </Box>
                </Grid>
                <Grid item sx={{ width: "calc(100% - 120px)" }}>
                  <p className="subTextTwo fontWeight-500">
                    The Complete Way to Organize Your Course Content
                  </p>
                </Grid>
              </Grid>
            </Link>
          </Grid>
          <Grid item xs={12}>
            <Link to="/instructor/course/guide">
              <Grid item container alignItems={"center"} spacing={2}>
                <Grid item width={120}>
                  <Box className="guidesVideoBlock">
                    <img src={guideimgone} />
                    <Button>
                      <PlayArrowIcon />
                    </Button>
                  </Box>
                </Grid>
                <Grid item sx={{ width: "calc(100% - 120px)" }}>
                  <p className="subTextTwo fontWeight-500">
                    How to Get More Impressions on Your Course
                  </p>
                </Grid>
              </Grid>
            </Link>
          </Grid>
        </Grid>
      </Box>
      <Box className="teacherHandbookBox">
        <Grid
          item
          container
          alignItems={"center"}
          spacing={{ xs: 1, sm: 2 }}
        >
          <Grid item width={{ xs: 73, sm: 83 }}>
            <Box>
              <img src={teacherHandbookBoxImg} />
            </Box>
          </Grid>
          <Grid
            item
            sx={{
              width: {
                xs: "calc(100% - 80px)",
                sm: "calc(100% - 90px)",
              },
            }}
          >
            <Grid
              item
              container
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Grid item sx={{ width: "calc(100% - 28px)" }}>
                <p className="mainText fontWeight-700 mb-5">
                  Teacher Handbook
                </p>
                <p className="subTextTwo">
                  Must Read if You are a Teacher
                </p>
              </Grid>
              <Grid item width={24}>
                <Link to="/instructor/teacher-handbook">
                  <KeyboardArrowRightIcon color="secondary" />
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Box className="lastSubmitedBox">
        <p className="mainText fontWeight-700">Last Submitted</p>
        <Grid item container gap={2}>
          <Grid item xs={12}>
            <Grid item container justifyContent={"space-between"}>
              <Grid item>
                <p className="subTextTwo fontWeight-500 mb-0">
                  How to Design a Logotype
                </p>
                <p className="subTextTwo color-secondary-light">
                  Aug 21, 2021
                </p>
              </Grid>
              <Grid item>
                <Button size="small">APPROVED</Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid item container justifyContent={"space-between"}>
              <Grid item>
                <p className="subTextTwo fontWeight-500 mb-0">
                  How to Design a Logotype
                </p>
                <p className="subTextTwo color-secondary-light">
                  Aug 21, 2021
                </p>
              </Grid>
              <Grid item>
                <Button size="small">APPROVED</Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default CourseGuidePanel