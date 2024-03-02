import { useEffect, useState } from "react";
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
import TuneIcon from "@mui/icons-material/Tune";

import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import {
  Avatar,
  Button,
  ButtonGroup,
  Chip,
  Grid,
  Skeleton,
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
} from "@mui/material";

import SwitchBtn from "@/components/super-admin/student/SwitchBtn";
import SkeletonBody from "../../../components/super-admin/student/Skeleton";
import { useStudentListMutation } from "@/redux/api/super-admin/student";
const metaTags = [
  { name: "Metaname1", content: "content1" },
  { name: "Metaname2", content: "content2" },
];
export function Component() {
  const [menushow, setMenuShow] = useState("");

  const [getStudentList, { isSuccess, isLoading, data }] =
    useStudentListMutation();

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  // const [count, setcount] = useState(0)

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const handelChangeStatus = async (_e) => {
    const id = _e.currentTarget.getAttribute("data-id");
    const status = _e.currentTarget.getAttribute("status");
    console.log(id);
    console.log(status);
    // return;
    // await handelApprove({ userId: id, status: status });
  };

  useEffect(() => {
    getStudentList({ page: page, limit: rowsPerPage });
  }, [page, rowsPerPage]);

  return (
    <AuthGuard>
      <Seo title="Instructor Details" metaName="Metaname" metaTags={metaTags}>
        <div className="mainDashboardArea">
          <Box className="mobPage_title_block">
            <h3>Student</h3>
          </Box>
          <div className="pageFilter">
            <div className="pageFilterLeft">
              <div className="filterSearch">
                <input type="text" className="form-control" />
                <img src={searchNormal} alt="" />
              </div>
            </div>
            <div className="pageFilterRight">
              <div className="pageFilterRightLeftBox">
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
                  <Link to="#" className="outlineBtnSmall">
                    <img src={importIcon} alt="" /> Import
                  </Link>
                  <Link to="#" className="outlineBtnSmall">
                    <img src={exportIcon} alt="" /> Export
                  </Link>
                  <button className="outlineBtnSmall mobileHide">
                    <img src={settingIcon} alt="" className="mr-0" />
                  </button>
                </div>
              </div>
              <div className="pageFilterRightBox">
                <Link to="#" className="primaryBtnSmall">
                  <AddIcon /> <span className="mobileHide">Add Instructor</span>
                </Link>
                <button className="outlineBtnSmall">
                  <img src={settingIcon} alt="" className="mr-0" />
                </button>
                <ButtonGroup size="small">
                  <Button disableRipple className="active">
                    <img src={rowVerticalIcon} />
                  </Button>
                  <Button disableRipple>
                    <img src={elementIcon} />
                  </Button>
                </ButtonGroup>
              </div>
            </div>
          </div>
          <div className="tableContainer instructorsTable responsiveTable">
            <TableContainer>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left" width={50}></TableCell>
                    <TableCell>Student Name</TableCell>
                    <TableCell align="left">PHone</TableCell>
                    <TableCell align="left">Email</TableCell>
                    <TableCell align="left">Joined Date</TableCell>
                    <TableCell align="left">Balance</TableCell>
                    <TableCell align="left">Courses</TableCell>
                    <TableCell align="left" width={80}>
                      Status
                    </TableCell>
                    <TableCell align="left" width={50}></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {isLoading && <SkeletonBody number={rowsPerPage} />}
                  {!isLoading &&
                    isSuccess &&
                    data?.data?.rows?.map((e) => {
                      return (
                        <TableRow key={e.userUniqueId}>
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
                          <TableCell
                            className="customerName"
                            data-th="Custmer Name"
                          >
                            <List>
                              <ListItem disableGutters>
                                <ListItemAvatar>
                                  <Avatar
                                    alt={e.fullName}
                                    src={e.profilePicture}
                                  />
                                </ListItemAvatar>
                                <Link
                                  // to={`/super-admin/instructor/${e?.userUniqueId}`}
                                  to={"#"}
                                >
                                  <ListItemText primary={e.fullName} />
                                </Link>
                              </ListItem>
                            </List>
                          </TableCell>
                          <TableCell data-th="Phone">{e.phone}</TableCell>
                          <TableCell data-th="Email" align="left">
                            {e.email}
                          </TableCell>
                          <TableCell data-th="Joined Date" align="left">
                            {moment(e?.createdAt).format("DD MMM YYYY")}
                          </TableCell>
                          <TableCell data-th="Balance" align="left">
                            $450.54
                          </TableCell>
                          <TableCell data-th="Courses" align="left">
                            829
                          </TableCell>

                          <TableCell width={80} data-th="Status">
                            {e?.isVerified == false && (
                              <Chip className="inactive" label="Inactive" />
                            )}

                            {e?.isApproved == "PENDING" && (
                              <Chip className="blocked" label="Pending" />
                            )}

                            {e?.isVerified == true && (
                              <Chip className="active" label="Active" />
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
              <Grid item container alignContent={"center"}>
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

Component.displayName = "SuperAdminDashboard";
