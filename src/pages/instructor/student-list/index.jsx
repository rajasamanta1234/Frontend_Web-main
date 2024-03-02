import { AuthGuard } from "../../../guards/instructor/auth-guard";
import Seo from "@/components/common/seo";

import "../../../assets/css/instructor-dashboard/style.css";
import "../../../assets/css/instructor-dashboard/responsive.css";

import dashGraphIcon from "@/assets/images/dash-graph.svg";
import barIcon from "@/assets/images/bar.svg";
import PIcon from "@/assets/images/P-icon.svg";
import DIcon from "@/assets/images/D-icon.svg";
import profileratingLightIcon from "@/assets/images/profile-rating-light.svg";
import studentIcon from "@/assets/images/studentIcon.svg";
import taskIcon from "@/assets/images/taskIcon.svg";
import {
    Avatar,
    Box,
    Chip,
    FormControl,
    Grid,
    IconButton,
    LinearProgress,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Menu,
    MenuItem,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { items } from "../../../components/student/navbar-with-auth";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import React, { useEffect, useState } from "react";
import eyeLightIcon from "@/assets/images/eye-light.svg";
import CourseCoverImage from "@/assets/images/Course-Cover-Image.png";
import itFlag from "@/assets/images/flag/it.png";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
    useGetAccountInfoMutation,
    useGetAllStatusMutation,
    useGetInstructorStatisticsMutation,
} from "../../../redux/api/instructor/auth";


const metaTags = [
    { name: "Metaname1", content: "content1" },
    { name: "Metaname2", content: "content2" },
];

export function Component() {
    const location = useLocation();
    const [getDetails, { isLoading, isSuccess, data }] =
        useGetInstructorStatisticsMutation();
    const [
        getBallanceSheet,
        {
            isLoading: ballanceLoading,
            isSuccess: ballanceSuccess,
            data: ballanceData,
        },
    ] = useGetAccountInfoMutation();
    const [
        getAllStatus,
        { isLoading: statusLoading, isSuccess: statusSuccess, data: statusData },
    ] = useGetAllStatusMutation();
    const { user } = useSelector((state) => state.instructorUser);
    const a = items?.find((e) => {
        return location.pathname === e.path;
    });
    const [statics, setStatistic] = useState({});
    const [ballancesheet, setBallanceSheet] = useState({});
    const [statussheet, setStatusSheet] = useState({});

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    useEffect(() => {
        getDetails();
        getBallanceSheet();
        getAllStatus();
        if (isSuccess) {
            setStatistic(data?.data);
        }
        if (ballanceSuccess) {
            setBallanceSheet(ballanceData?.data);
        }
        if (statusSuccess) {
            setStatusSheet(statusData?.data);
        }
    }, []);
    useEffect(() => {
        if (isSuccess) {
            setStatistic(data?.data);
        }
        if (ballanceSuccess) {
            setBallanceSheet(ballanceData?.data);
        }
        if (statusSuccess) {
            setStatusSheet(statusData?.data);
        }
    }, [isSuccess, ballanceSuccess, statusSuccess]);

    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    return (
        <AuthGuard>
            <Seo title="Dashboard" metaName="Metaname" metaTags={metaTags}>
                <div className="mainDashboardArea">
                    <Grid container>
                        <Grid
                            className="instDashLeft"
                            item
                            sx={{ width: "calc(100% - 366px)", paddingRight: "64px", paddingBottom: 4 }}
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
                                        <h4>Students</h4>
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item container spacing={3}>
                                <Grid item xs={12} sm={6} md={6} lg={4}>
                                    <Grid item container className="shadowBox" sx={{ padding: "24px 16px" }}>
                                        <Grid item xs={12}>
                                            <Grid
                                                item
                                                container
                                                justifyContent={"space-between"}
                                                marginBottom={2}
                                            >
                                                <Grid item>
                                                    <img src={studentIcon} />
                                                </Grid>
                                                <Grid item>
                                                    <h4 className="colorOrange fontWeight-500">
                                                        5,622
                                                    </h4>
                                                </Grid>
                                            </Grid>
                                            <Grid item container justifyContent={"space-between"}>
                                                <Grid item>
                                                    <p className="subTextOne fontWeight-700">Total Student</p>
                                                </Grid>
                                                <Grid item>
                                                    <img src={dashGraphIcon} />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6} lg={4}>
                                    <Grid item container className="shadowBox" sx={{ padding: "24px 16px" }}>
                                        <Grid item xs={12}>
                                            <Grid
                                                item
                                                container
                                                justifyContent={"space-between"}
                                                marginBottom={2}
                                            >
                                                <Grid item>
                                                    <img src={barIcon} />
                                                </Grid>
                                                <Grid item>
                                                    <h4 className="color-primary fontWeight-500">
                                                        34%
                                                    </h4>
                                                </Grid>
                                            </Grid>
                                            <Grid item container justifyContent={"space-between"}>
                                                <Grid item>
                                                    <p className="subTextOne fontWeight-700">
                                                        Avg. Progress
                                                    </p>
                                                </Grid>
                                                <Grid item>
                                                    <img src={dashGraphIcon} />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6} lg={4}>
                                    <Grid item container className="shadowBox" sx={{ padding: "24px 16px" }}>
                                        <Grid item xs={12}>
                                            <Grid
                                                item
                                                container
                                                justifyContent={"space-between"}
                                                marginBottom={2}
                                            >
                                                <Grid item>
                                                    <img src={taskIcon} />
                                                </Grid>
                                                <Grid item>
                                                    <h4 className="color-primary fontWeight-500">
                                                        152
                                                    </h4>
                                                </Grid>
                                            </Grid>
                                            <Grid item container justifyContent={"space-between"}>
                                                <Grid item>
                                                    <p className="subTextOne fontWeight-700">
                                                        Task Completed
                                                    </p>
                                                </Grid>
                                                <Grid item>
                                                    <img src={dashGraphIcon} />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item container gap={{xs:2,sm:0}} paddingTop={4} paddingBottom={3}>
                                <Grid item xs={12} sm={3}>
                                    <p className="mainText fontWeight-700">All Students</p>
                                </Grid>
                                <Grid item xs={12} sm={9}>
                                    <Grid item container>
                                        <Grid item xs={12} sm={2}>
                                            <p className="subTextTwo">Select Course:</p>
                                        </Grid>
                                        <Grid item xs={12} sm={10}>
                                            <Box className="selectCourseBox">
                                                <FormControl fullWidth>
                                                    <Select
                                                        value={age}
                                                        onChange={handleChange}
                                                        displayEmpty
                                                        inputProps={{ 'aria-label': 'Without label' }}
                                                    >
                                                        <MenuItem value="">
                                                            <Grid item container spacing={2} alignItems={'center'}>
                                                                <Grid item width={70}>
                                                                    <img src={CourseCoverImage} />
                                                                </Grid>
                                                                <Grid item sx={{ width: 'calc(100% - 70px)', }}>
                                                                    <p className="subTextTwo fontWeight-500 mb-0">How to Make UX Case Study for Beginner</p>
                                                                </Grid>
                                                            </Grid>
                                                        </MenuItem>
                                                        <MenuItem value={10}>
                                                            <Grid item container spacing={2} alignItems={'center'}>
                                                                <Grid item width={70}>
                                                                    <img src={CourseCoverImage} />
                                                                </Grid>
                                                                <Grid item sx={{ width: 'calc(100% - 70px)', }}>
                                                                    <p className="subTextTwo fontWeight-500 mb-0">How to Make UX Case Study for Beginner</p>
                                                                </Grid>
                                                            </Grid>
                                                        </MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item container>
                                <Grid item xs={12}>
                                    <Box className="tableContainer insStudentListTable">
                                        <TableContainer>
                                            <Table>
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell>Student</TableCell>
                                                        <TableCell align="left">Nationality</TableCell>
                                                        <TableCell align="left">Tasks Completed</TableCell>
                                                        <TableCell align="left">Progress</TableCell>
                                                        <TableCell align="right">Test Score</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    <TableRow>
                                                        <TableCell className="studentNameTd">
                                                            <List disablePadding>
                                                                <ListItem disableGutters>
                                                                    <ListItemAvatar>
                                                                        <Avatar
                                                                            alt={'Daniel Berraldi'}
                                                                        />
                                                                    </ListItemAvatar>
                                                                    <Link to="#">
                                                                        <ListItemText primary={'Daniel Berraldi'} />
                                                                    </Link>
                                                                </ListItem>
                                                            </List>
                                                        </TableCell>
                                                        <TableCell><p className="subTextTwo"><img src={itFlag} /> &nbsp; Italy</p></TableCell>
                                                        <TableCell className="taskTd">
                                                            <Box><Link to="#"><img src={DIcon} /> <span>Lesson 3.pdf</span></Link></Box>
                                                            <Box><Link to="#"><img src={PIcon} /> <span>Case Study Final Fix.ppt</span></Link></Box>
                                                        </TableCell>
                                                        <TableCell className="progressTd">
                                                            <p>60%</p>
                                                            <LinearProgress variant="determinate" value={50} />
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            <p className="subTextTwo fontWeight-500">86</p>
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell className="studentNameTd">
                                                            <List disablePadding>
                                                                <ListItem disableGutters>
                                                                    <ListItemAvatar>
                                                                        <Avatar
                                                                            alt={'Daniel Berraldi'}
                                                                        />
                                                                    </ListItemAvatar>
                                                                    <Link to="#">
                                                                        <ListItemText primary={'Daniel Berraldi'} />
                                                                    </Link>
                                                                </ListItem>
                                                            </List>
                                                        </TableCell>
                                                        <TableCell><p className="subTextTwo"><img src={itFlag} /> &nbsp; Italy</p></TableCell>
                                                        <TableCell className="taskTd">
                                                            <Box><Link to="#"><img src={DIcon} /> <span>Lesson 3.pdf</span></Link></Box>
                                                            <Box><Link to="#"><img src={PIcon} /> <span>Case Study Final Fix.ppt</span></Link></Box>
                                                        </TableCell>
                                                        <TableCell className="progressTd">
                                                            <p>60%</p>
                                                            <LinearProgress variant="determinate" value={50} />
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            <p className="subTextTwo fontWeight-500">86</p>
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell className="studentNameTd">
                                                            <List disablePadding>
                                                                <ListItem disableGutters>
                                                                    <ListItemAvatar>
                                                                        <Avatar
                                                                            alt={'Daniel Berraldi'}
                                                                        />
                                                                    </ListItemAvatar>
                                                                    <Link to="#">
                                                                        <ListItemText primary={'Daniel Berraldi'} />
                                                                    </Link>
                                                                </ListItem>
                                                            </List>
                                                        </TableCell>
                                                        <TableCell><p className="subTextTwo"><img src={itFlag} /> &nbsp; Italy</p></TableCell>
                                                        <TableCell className="taskTd">
                                                            <Box><Link to="#"><img src={DIcon} /> <span>Lesson 3.pdf</span></Link></Box>
                                                            <Box><Link to="#"><img src={PIcon} /> <span>Case Study Final Fix.ppt</span></Link></Box>
                                                        </TableCell>
                                                        <TableCell className="progressTd">
                                                            <p>60%</p>
                                                            <LinearProgress variant="determinate" value={50} />
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            <p className="subTextTwo fontWeight-500">86</p>
                                                        </TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </Box>
                                </Grid>
                            </Grid>


                        </Grid>
                        <Grid className="instDashRight" item width={366}>
                            <Grid item container className="rightWidgets">
                                <p className="mainText fontWeight-700">Top Student Location</p>
                                <Grid item xs={12}>
                                    {statussheet?.top_student_location?.length > 0 &&
                                        statussheet?.top_student_location.map((it, ind) => {
                                            return (
                                                <Grid
                                                    key={ind}
                                                    className="customStudentProgress"
                                                    marginTop={2}
                                                    item
                                                    container
                                                    justifyContent={"space-between"}
                                                    alignItems={"center"}
                                                >
                                                    <Grid item className="progressBlock" width={"30%"}>
                                                        <Grid
                                                            item
                                                            container
                                                            justifyContent={"space-between"}
                                                            width={"100%"}
                                                        >
                                                            <Grid item>
                                                                <Grid
                                                                    item
                                                                    container
                                                                    columnGap={1}
                                                                    alignItems={"center"}
                                                                >
                                                                    <Grid item>
                                                                        <img src={it?.flag_img} />
                                                                    </Grid>
                                                                    <Grid item>
                                                                        <p className="subTextTwo">{it?.country}</p>
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                            <Grid item>
                                                                <p className="subTextTwo">{it?.people}</p>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid className="progressValue" item width={50}>
                                                        <p className="subTextTwo">{it?.percentage}</p>
                                                    </Grid>
                                                </Grid>
                                            );
                                        })}
                                </Grid>
                            </Grid>
                            <Grid item container className="rightWidgets">
                                <p className="mainText fontWeight-700">Top Student Continent</p>

                                <Grid item xs={12}>
                                    {statussheet?.top_student_location?.length > 0 &&
                                        statussheet?.top_student_location.map((it, ind) => {
                                            return (
                                                <Grid
                                                    key={ind}
                                                    className="customStudentProgress"
                                                    marginTop={2}
                                                    item
                                                    container
                                                    justifyContent={"space-between"}
                                                    alignItems={"center"}
                                                >
                                                    <Grid item className="progressBlock" width={"30%"}>
                                                        <Grid
                                                            item
                                                            container
                                                            justifyContent={"space-between"}
                                                            width={"100%"}
                                                        >
                                                            <Grid item>
                                                                <Grid
                                                                    item
                                                                    container
                                                                    columnGap={1}
                                                                    alignItems={"center"}
                                                                >
                                                                    <Grid item>
                                                                        <img src={it?.flag_img} />
                                                                    </Grid>
                                                                    <Grid item>
                                                                        <p className="subTextTwo">{it?.country}</p>
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                            <Grid item>
                                                                <p className="subTextTwo">{it?.people}</p>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid className="progressValue" item width={50}>
                                                        <p className="subTextTwo">{it?.percentage}</p>
                                                    </Grid>
                                                </Grid>
                                            );
                                        })}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            </Seo>
        </AuthGuard>
    );
}

Component.displayName = "InstructorStudentList";
