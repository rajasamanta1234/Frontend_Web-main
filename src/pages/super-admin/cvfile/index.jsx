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
import pngImage from "@/assets/images/png.png";
import KeyboardBackspaceRoundedIcon from "@mui/icons-material/KeyboardBackspaceRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import { toast } from "react-toastify";
import AddIcon from "@mui/icons-material/Add";
import EastIcon from "@mui/icons-material/East";
import WestIcon from "@mui/icons-material/West";
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
  Divider,
  Slide,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";

import SwitchBtn from "@/components/super-admin/instructor/SwitchBtn";
import SkeletonBody from "../../../components/super-admin/instructor/Skeleton";

import {
  useChangeCurrentStatusMutation,
  useCvListMutation,
} from "../../../redux/api/super-admin/cv";
import { useInstructorApprovedMutation } from "../../../redux/api/super-admin/instructor";
import { Document, Page } from "react-pdf";
import CloseIcon from "@mui/icons-material/Close";

const metaTags = [
  { name: "Metaname1", content: "content1" },
  { name: "Metaname2", content: "content2" },
];
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export function Component() {
  const [menushow, setMenuShow] = useState("");

  // const [getInstructorList, { isSuccess, isLoading, data }] =
  //   useInstructorListMutation();
  const [getCertificateList, { isSuccess, isLoading, data }] =
    useCvListMutation();

  const [
    handelApprove,
    { isLoading: isLoadingApproved, isSuccess: isSuccessApproved },
  ] = useInstructorApprovedMutation();
  const [
    changeStatus,
    {
      isLoading: isLoadingStatus,
      isSuccess: isSuccessStatus,
      isError: isStatusError,
      error: statusError,
    },
  ] = useChangeCurrentStatusMutation();
  const [numPages, setNumPages] = useState();

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [toggle, setBtnToogle] = useState("APPROVED");
  const [checkedData, setCheckedData] = useState([]);
  const [currentOperation, setCurrentOperation] = useState("APPROVED");
  const [pageNumber, setPageNumber] = useState(1);

  // const [count, setcount] = useState(0)
  const [cvopen, setCVOpen] = useState({ open: false, link: "", name: "" });

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  const handelChangeStatus = async (_e) => {
    const id = _e.currentTarget.getAttribute("data-id");
    const status = _e.currentTarget.getAttribute("status");
    console.log(id);
    console.log(status);
    // return;
    await handelApprove({ userId: id, status: status });
  };

  useEffect(() => {
    getCertificateList({
      page: page,
      limit: rowsPerPage,
      status: toggle,
      searchBy: "",
    });
  }, [page, rowsPerPage, toggle]);

  useEffect(() => {
    if (isSuccessStatus) {
      toast.success("Status Changed Successfully.");
      getCertificateList({
        page: page,
        limit: rowsPerPage,
        status: toggle,
        searchBy: "",
      });
      setCheckedData([]);
    }
  }, [isSuccessStatus]);
  function debounce(func, delay) {
    let timeoutId;

    return function (...args) {
      const context = this;

      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(context, args);
      }, delay);
    };
  }
  // toggle Btn

  const courseToggleBtn = (event, btnToogle) => {
    setBtnToogle(event.target.value);
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
  const handleCVlickOpen = (link, name) => {
    setCVOpen({
      open: true,
      link: link,
      name: name,
    });
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
  const handleCloseCV = () => {
    setCVOpen({ open: false, link: "" });
    setPageNumber(1);
  };
  const handleSearchFilter = debounce((event) => {
    console.log(event.target.value);
    getCertificateList({
      page: page,
      limit: rowsPerPage,
      status: toggle,
      searchBy: event.target.value,
    });
  }, 500);
  const handleCheckbox = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setCheckedData([...checkedData, value]);
    } else {
      setCheckedData(checkedData.filter((val) => val !== value));
    }
  };
  const handleChangeStatus = async (event) => {
    try {
      event.preventDefault();
      const intConvertedIds = checkedData.map((val) => Number(val));
      await changeStatus({
        cv: intConvertedIds, // mandatory
        action: currentOperation.toUpperCase(), // mandatory APPROVED/REJECTED/DELETED
        cvRejectionReason: "Reject by admin",
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (isStatusError && statusError) {
      toast.error(statusError?.data?.message);
    }
  }, [isStatusError, statusError]);

  /* dropdown */
  return (
    <AuthGuard>
      <Seo title="CV" metaName="Metaname" metaTags={metaTags}>
        <div className="mainDashboardArea">
          <Box className="mobPage_title_block">
            <h3>CV</h3>
          </Box>
          {/* toggle class with coursePg_filtr when checkbox checked- courseSelect */}
          <div
            className={`pageFilter coursePg_filtr ${
              checkedData.length > 0 ? "courseSelect" : ""
            }`}
          >
            <div className="pageFilterLeft">
              <ToggleButtonGroup
                variant="outlined"
                value={toggle}
                className="courseTglBtn_group"
                onChange={courseToggleBtn}
              >
                <ToggleButton
                  sx={{ columnGap: "4px" }}
                  value="APPROVED"
                  autoFocus={toggle === "APPROVED"}
                >
                  APPROVED <Chip label={data?.data?.APPROVED} />
                </ToggleButton>
                <ToggleButton
                  sx={{ columnGap: "4px" }}
                  value="PENDING"
                  autoFocus={toggle === "PENDING"}
                >
                  PENDING <Chip label={data?.data?.PENDING} />
                </ToggleButton>
                <ToggleButton
                  sx={{ columnGap: "4px" }}
                  value="REJECTED"
                  autoFocus={toggle === "REJECTED"}
                >
                  REJECTED <Chip label={data?.data?.REJECTED} />
                </ToggleButton>
              </ToggleButtonGroup>
              <Box className="courseBackDlt_area">
                <Button
                  onClick={() => {
                    setCheckedData([]);
                  }}
                >
                  <KeyboardBackspaceRoundedIcon />
                </Button>
                {/* <Button>
                  <img src={deleteIcon} alt="" />
                </Button> */}
              </Box>
            </div>
            <div className="pageFilterRight">
              <Box className="searchArea">
                <div className="filterSearch filterSearch_sm">
                  <input
                    type="text"
                    className="form-control"
                    onChange={handleSearchFilter}
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
                {/* <Link to="#" className="primaryBtnSmall">
                    <AddIcon /> <span>Create Course</span>
                  </Link> */}
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
                    {currentOperation}
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
                  <MenuItem
                    onClick={() => {
                      setCurrentOperation("APPROVED");
                      handleClose();
                    }}
                  >
                    APPROVED
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setCurrentOperation("REJECTED");
                      handleClose();
                    }}
                  >
                    REJECTED
                  </MenuItem>
                  {/* <MenuItem
                    onClick={() => {
                      setCurrentOperation("DELETED");
                      handleClose();
                    }}
                  >
                    Deleted
                  </MenuItem> */}
                </Menu>
                <a
                  href="#"
                  className="primaryBtnSmall"
                  onClick={handleChangeStatus}
                >
                  <img src={saveIcon} alt="" /> <span>Save</span>
                </a>
              </Box>
            </div>
          </div>
          <div className="tableContainer instructorsTable responsiveTable">
            <TableContainer>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left" width={50}></TableCell>
                    <TableCell>File Name</TableCell>
                    <TableCell>Instructor</TableCell>
                    <TableCell align="left">Date Submited</TableCell>
                    <TableCell align="left">Size</TableCell>
                    <TableCell align="left">File Type</TableCell>
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
                        <TableRow key={e.id}>
                          <TableCell width={50}>
                            <div className="lightforthCheckbox">
                              {e?.isApproved == "PENDING" && (
                                <div className="mainCheck">
                                  <input
                                    type="checkbox"
                                    value={e.id}
                                    checked={checkedData.includes(String(e.id))}
                                    onChange={handleCheckbox}
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
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="customerName" data-th="Name">
                            <List>
                              <ListItem disableGutters>
                                <ListItemAvatar>
                                  <Box width={"28px"} height={"28px"}>
                                    <img
                                      src={pngImage}
                                      alt=""
                                      className="w-100"
                                    />
                                  </Box>
                                </ListItemAvatar>
                                <Link

                                // to={`/super-admin/courses-details`}
                                >
                                  <ListItemText
                                    onClick={() =>
                                      handleCVlickOpen(e?.cvLink, e?.cvName)
                                    }
                                  >
                                    {e?.cvName}
                                  </ListItemText>
                                </Link>
                              </ListItem>
                            </List>
                          </TableCell>
                          <TableCell data-th="Instructor">
                            {e?.instructor?.fullName}
                          </TableCell>
                          <TableCell data-th="Date Submited" align="left">
                            {moment(e.date).format("DD MMM YYYY")}
                          </TableCell>
                          <TableCell data-th="Size" align="left">
                            {parseInt(e.cvSize / 1024)} Kb
                          </TableCell>
                          <TableCell data-th="File Type" align="left">
                            {e?.cvName.split(".").pop().toUpperCase()}
                          </TableCell>
                          <TableCell data-th="Status" width={80}>
                            {e?.isApproved == "REJECTED" && (
                              <Chip className="inactive" label="Rejected" />
                            )}

                            {e?.isApproved == "PENDING" && (
                              <Chip className="blocked" label="Pending" />
                            )}

                            {e?.isApproved == "APPROVED" && (
                              <Chip className="active" label="Approved" />
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
          <Dialog
            open={cvopen.open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleCloseCV}
            aria-describedby="alert-dialog-slide-description"
            className="pdfViewModal"
          >
            <DialogTitle>
              <p className="mainText fontWeight-700">{cvopen.name}</p>

              <Button onClick={handleCloseCV}>
                <CloseIcon />
              </Button>
            </DialogTitle>
            <DialogContent>
              <div className="pdfViewBlock">
                <Document
                  file={cvopen.link}
                  onLoadSuccess={onDocumentLoadSuccess}
                >
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
        </div>
      </Seo>
    </AuthGuard>
  );
}

Component.displayName = "SuperAdminCv";
