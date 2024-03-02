import React, { useEffect, useState } from "react";
import { AuthGuard } from "../../../guards/super-admin/auth-guard";
import Seo from "@/components/common/seo";
import moment from "moment";

import "../../../assets/css/super-admin/dashboard/style.css";
import "../../../assets/css/super-admin/dashboard/responsive.css";

import searchNormal from "@/assets/images/search-normal.svg";
import importIcon from "@/assets/images/import.svg";
import exportIcon from "@/assets/images/export.svg";
import settingIcon from "@/assets/images/setting.svg";
import rowVerticalIcon from "@/assets/images/row-vertical.svg";
import elementIcon from "@/assets/images/element.svg";
import deleteIcon from "@/assets/images/delete-bin.svg";
import saveIcon from "@/assets/images/save.svg";
import TuneIcon from "@mui/icons-material/Tune";
import ratingStar from "@/assets/images/star.png";
import KeyboardBackspaceRoundedIcon from "@mui/icons-material/KeyboardBackspaceRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";

import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import {
  Avatar,
  Button,
  ButtonGroup,
  Chip,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Pagination,
  TablePagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  ToggleButtonGroup,
  ToggleButton,
  Menu,
  MenuItem,
} from "@mui/material";

import SwitchBtn from "@/components/super-admin/instructor/SwitchBtn";
import SkeletonBody from "../../../components/super-admin/instructor/Skeleton";
import { useInstructorApprovedMutation } from "@/redux/api/super-admin/instructor";
import { useGetAllCourseMutation } from "../../../redux/api/super-admin/course";
const metaTags = [
  { name: "Metaname1", content: "content1" },
  { name: "Metaname2", content: "content2" },
];
export function Component() {
  const [menushow, setMenuShow] = useState("");

  const [getCourseList, { isSuccess, isLoading, data }] =
    useGetAllCourseMutation();

  const [
    handelApprove,
    { isLoading: isLoadingApproved, isSuccess: isSuccessApproved },
  ] = useInstructorApprovedMutation();

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [courseStatus, setcourseStatus] = useState("APPROVED");
  const [searchKey, setSearchKey] = useState("");

  // const [count, setcount] = useState(0)

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 5));
    setPage(1);
  };

  const handelChangeStatus = async (_e) => {
    const id = _e.currentTarget.getAttribute("data-id");
    const status = _e.currentTarget.getAttribute("status");
    console.log(id);
    console.log(status);
    // return;
    await handelApprove({ userId: id, status: status });
  };

  useEffect(() => {
    getCourseList({
      page: page,
      limit: rowsPerPage,
      status: courseStatus,
      searchkey: searchKey,
    });
  }, [page, rowsPerPage, courseStatus, searchKey]);

  useEffect(() => {
    if (isSuccessApproved) {
      getCourseList({ page: page, limit: rowsPerPage, status: courseStatus });
    }
  }, [isSuccessApproved]);

  // toggle Btn
  const [toggle, setBtnToogle] = useState("published");

  const courseToggleBtn = (event, btnToogle) => {
    setBtnToogle(btnToogle);
  };

  /* dropdown */

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  /* dropdown */

  return (
    <AuthGuard>
      <Seo title="Course" metaName="Metaname" metaTags={metaTags}>
        <div className="mainDashboardArea">
          <Box className="mobPage_title_block">
            <h3>Courses</h3>
          </Box>
          <div className="pageFilter coursePg_filtr">
            <div className="pageFilterLeft">
              <ToggleButtonGroup
                variant="outlined"
                value={toggle}
                className="courseTglBtn_group"
                onChange={courseToggleBtn}
              >
                <ToggleButton
                  sx={{ columnGap: "4px" }}
                  value="published"
                  onClick={() => setcourseStatus("APPROVED")}
                >
                  Published <Chip label={data?.data?.APPROVED} />
                </ToggleButton>
                <ToggleButton
                  sx={{ columnGap: "4px" }}
                  value="pending"
                  onClick={() => setcourseStatus("PENDING")}
                >
                  PENDING <Chip label={data?.data?.PENDING} />
                </ToggleButton>
                <ToggleButton
                  sx={{ columnGap: "4px" }}
                  value="active"
                  onClick={() => setcourseStatus("REJECTED")}
                >
                  REJECTED <Chip label={data?.data?.REJECTED} />
                </ToggleButton>
                <ToggleButton
                  sx={{ columnGap: "4px" }}
                  value="delete"
                  onClick={() => setcourseStatus("DELETED")}
                >
                  Deleted <Chip label={data?.data?.DELETED} />
                </ToggleButton>
              </ToggleButtonGroup>
              <Box className="courseBackDlt_area">
                <Button>
                  <KeyboardBackspaceRoundedIcon />
                </Button>
                <Button>
                  <img src={deleteIcon} alt="" />
                </Button>
              </Box>
            </div>
            <div className="pageFilterRight">
              <Box className="searchArea">
                <div className="filterSearch filterSearch_sm">
                  <input
                    type="text"
                    className="form-control"
                    value={searchKey}
                    onChange={(val) => setSearchKey(val.target.value)}
                  />
                  <img src={searchNormal} alt="" />
                </div>
                <Button
                  onClick={() => {
                    if (menushow == "") {
                      setMenuShow("show");
                    } else {
                      setMenuShow("");
                    }
                  }}
                >
                  <TuneIcon />
                </Button>
                <div className={`pageFilterRightInner ${menushow}`}>
                  {/* <Link to="#" className="outlineBtnSmall">
                    <img src={importIcon} alt="" /> Import
                  </Link>
                  <Link to="#" className="outlineBtnSmall">
                    <img src={exportIcon} alt="" /> Export
                  </Link> */}
                  <Link to="#" className="outlineBtnSmall">
                    <img src={settingIcon} alt="" className="mr-0" />
                  </Link>
                </div>
                <Link to="#" className="primaryBtnSmall">
                  <AddIcon /> <span>Create Course</span>
                </Link>
              </Box>
              <Box className="saveArea">
                <p className="chngStatLbl">
                  Change Status:
                  <Button
                    id="basic-button"
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                    endIcon={<KeyboardArrowDownRoundedIcon />}
                    sx={{
                      backgroundColor: "transparent !important",
                      color: "var(--neutral-light-400)",
                    }}
                  >
                    Approved
                  </Button>
                </p>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem onClick={handleClose}>Approved</MenuItem>
                  <MenuItem onClick={handleClose}>Pending</MenuItem>
                  <MenuItem onClick={handleClose}>Deleted</MenuItem>
                </Menu>
                <Link to="#" className="primaryBtnSmall">
                  <img src={saveIcon} alt="" /> <span>Save</span>
                </Link>
              </Box>
            </div>
          </div>
          <div className="tableContainer instructorsTable responsiveTable">
            <TableContainer>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left" width={50}></TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Instructor</TableCell>
                    <TableCell align="left">Published</TableCell>
                    <TableCell align="left">TAKES</TableCell>
                    <TableCell align="left">STUDENTS</TableCell>
                    <TableCell align="left" width={80}>
                      Rating
                    </TableCell>
                    <TableCell align="left">Price</TableCell>
                    <TableCell align="left" width={80}>
                      Status
                    </TableCell>
                    <TableCell align="left" width={30}></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {isLoading && <SkeletonBody number={rowsPerPage} />}
                  {!isLoading &&
                    data?.data?.rows?.map((e) => {
                      return (
                        <TableRow key={e.courseUniqueId}>
                          <TableCell width={50}>
                            <div className="lightforthCheckbox">
                              <div className="mainCheck">
                                <input type="checkbox" />
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
                            </div>
                          </TableCell>
                          <TableCell className="customerName" data-th="Name">
                            <List>
                              <ListItem disableGutters>
                                <ListItemAvatar>
                                  <Avatar alt={e.fullName} src={e.image} />
                                </ListItemAvatar>
                                <Link
                                  to={`/super-admin/courses-details/${e?.courseUniqueId}`}
                                >
                                  <ListItemText>{e?.title}</ListItemText>
                                  <Box className="courseTbl_chipBox">
                                    <Chip
                                      sx={{
                                        backgroundColor:
                                          "var(--Neutral-Light-50) !important",
                                        color: "var(--neutral-light-400)",
                                      }}
                                      label={e?.speciallization}
                                    />
                                    {/* <Chip
                                      sx={{
                                        backgroundColor:
                                          "var(--Neutral-Light-50) !important",
                                        color: "var(--neutral-light-400)",
                                      }}
                                      label="PRODUCT DESIGN"
                                    /> */}
                                  </Box>
                                </Link>
                              </ListItem>
                            </List>
                          </TableCell>
                          <TableCell data-th="Instructor">
                            {e?.fullName}
                          </TableCell>
                          <TableCell data-th="Published" align="left">
                            {moment(e?.createdAt).format("Do MMMM YYYY")}
                          </TableCell>
                          <TableCell data-th="TAKES" align="left">
                            {e?.totalSales}
                          </TableCell>
                          <TableCell data-th="STUDENTS" align="left">
                            ${e?.totalRevenue}
                          </TableCell>
                          <TableCell data-th="Rating" align="left">
                            <img src={ratingStar} alt="" />
                            {e?.averageRating}
                          </TableCell>
                          <TableCell
                            data-th="Price"
                            width={80}
                            className="fontWeight-700"
                          >
                            ${e?.price}
                          </TableCell>
                          <TableCell data-th="Status" width={80}>
                            {e?.isDeleted != 1 &&
                              e?.courseApprovalStatus == "PENDING" && (
                                <Chip className="inactive" label="Pending" />
                              )}

                            {e?.isDeleted == 1 && (
                              <Chip className="blocked" label="Delete" />
                            )}

                            {e?.courseApprovalStatus == "APPROVED" && (
                              <Chip className="active" label="Approved" />
                            )}
                            {e?.courseApprovalStatus == "REJECTED" && (
                              <Chip className="blocked" label="Rejected" />
                            )}
                          </TableCell>
                          <TableCell width={50}>
                            <SwitchBtn
                              handelChangeStatus={handelChangeStatus}
                              data={e}
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <Grid
            className="customPagination"
            container
            justifyContent={"space-between"}
            paddingTop={3}
            paddingBottom={3}
          >
            <Grid item>
              <TablePagination
                component="div"
                count={data?.data?.count}
                page={page - 1}
                onPageChange={(e, newPage) => {
                  setPage(newPage);
                }}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Grid>
            <Grid item>
              <Grid
                item
                container
                alignContent={"center"}
                justifyContent={{ xs: "center", md: "flex-end" }}
              >
                <Grid item className="firstlastButton">
                  <Button>First</Button>
                </Grid>
                <Grid item className="mainPagination">
                  <Pagination
                    count={Math.ceil(data?.data?.count / rowsPerPage)}
                    page={page}
                    onChange={(event, value) => {
                      setPage(value);
                    }}
                  />
                </Grid>
                <Grid item className="firstlastButton">
                  <Button>End</Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </Seo>
    </AuthGuard>
  );
}

Component.displayName = "SuperAdminCourses";
