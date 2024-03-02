import { AuthGuard } from "../../../guards/instructor/auth-guard";
import Seo from "@/components/common/seo";
import React, { useState, useEffect } from "react";

import "../../../assets/css/instructor-dashboard/style.css";
import "../../../assets/css/instructor-dashboard/responsive.css";


import avatarDemo from "@/assets/images/avatar-demo.png";
import chatIcon from "@/assets/images/chatIcon.svg";

import noticardIcon from "@/assets/images/noti-card.svg";
import filtersortmenuIcon from "@/assets/images/filter-sort-menu.svg";
import CloseIcon from "@mui/icons-material/Close";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Grid,
  List,
  ListItem,
  ListItemText,
  Radio,
  RadioGroup,
} from "@mui/material";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const metaTags = [
  { name: "Metaname1", content: "content1" },
  { name: "Metaname2", content: "content2" },
];

const notification = [
  {
    type: "comment",
    name: "Soumen Ghosh",
    image: null,
    date: "10.05 PM",
    comment: "Designing with User Centered Approach",
  },
  {
    type: "purchase",
    name: "Soumen Ghosh",
    image: avatarDemo,
    date: "10.05 PM",
    comment:
      "Creating Design System for Easier and Faster Design “thank you so much! 😊”",
  },
];

export function Component() {
  const [purchase, setPurchase] = useState(false);
  const [comment, setComment] = useState(false);
  const [like, setLike] = useState(false);
  const [reviews, setReviews] = useState(false);
  const [approval, setapproval] = useState(false);

  const [from, setFrom] = useState("");

  const getStatusOfNotification = (type) => {
    switch (type) {
      case "comment":
        return "commented";

        break;

      case "purchase":
        return "purchased";
        break;

      default:
        return "";
        break;
    }
  };

  const getIconOfNotification = (type) => {
    switch (type) {
      case "comment":
        return chatIcon;
        break;

      case "purchase":
        return noticardIcon;
        break;

      default:
        return "";
        break;
    }
  };

  useEffect(() => {
    console.log(purchase, comment);
  }, [purchase, comment, like, reviews, approval]);


  const [openNotiFilterModal, setOpenNotiFilter] = React.useState(false);

  const handleClickOpenNotiFilterModal = () => {
    setOpenNotiFilter(true);
  };

  const handleCloseNotiFilterModal = () => {
    setOpenNotiFilter(false);
  };


  return (
    <AuthGuard>
      <Seo title="Notification" metaName="Metaname" metaTags={metaTags}>
        <div className="mainDashboardArea">
          <Grid container>
            <Grid
              className="instDashLeft instDashLeftNotifi"
              item
              sx={{ width: "calc(100% - 366px)", paddingRight: "64px" }}
            >
              <Grid
                container
                className="layoutHead"
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Grid item xs={12} sm={12}>
                  <Grid item container justifyContent={'space-between'}>
                    <Grid item>
                      <Grid item container alignItems={"center"} columnGap={"20px"}>
                        <Link to="#" className="backBtn">
                          <ArrowBackIcon />
                        </Link>
                        <h4>Notifications</h4>
                      </Grid>
                    </Grid>
                    <Grid item display={{ xs: 'block', md: 'none' }}>
                      <Button onClick={handleClickOpenNotiFilterModal}><img src={filtersortmenuIcon} /></Button>
                    </Grid>
                  </Grid>

                </Grid>
              </Grid>

              <Grid
                item
                container
                flexDirection={"column"}
                gap={4}
                className="notifiList"
              >
                <Grid item xs={12}>
                  <p className="mainText fontWeight-700">Today</p>
                  <Grid item container paddingTop={2}>
                    <Grid item xs={12}>
                      <List disablePadding>
                        {/* <ListItem
                          disableGutters
                          secondaryAction={
                            <p className="subTextOne color-secondary-light">
                              10.12 PM
                            </p>
                          }
                        >
                          <Badge badgeContent={<img src={noticardIcon} />}>
                            <Avatar src={avatarDemo} />
                          </Badge>
                          <ListItemText
                            primary={
                              <p className="subTextOne fontWeight-300">
                                Nicolas Bekker purchased{" "}
                                <span className="fontWeight-500">
                                  Designing with User Centered Approach
                                </span>
                              </p>
                            }
                          />
                        </ListItem>
                        <ListItem
                          disableGutters
                          secondaryAction={
                            <p className="subTextOne color-secondary-light">
                              10.12 PM
                            </p>
                          }
                        >
                          <Badge badgeContent={<img src={chatIcon} />}>
                            <Avatar src={avatarDemo} />
                          </Badge>
                          <ListItemText
                            primary={
                              <p className="subTextOne fontWeight-300">
                                Bukayo Saka commented{" "}
                                <span className="fontWeight-500">
                                  Creating Design System for Easier and Faster
                                  Design “thank you so much! 😊”
                                </span>
                              </p>
                            }
                          />
                        </ListItem> */}

                        {notification?.map((_e, _index) => {
                          return (
                            <ListItem
                              disableGutters
                              secondaryAction={
                                <p className="subTextOne color-secondary-light">
                                  {_e.date}
                                </p>
                              }
                              key={_index}
                            >
                              <Badge
                                badgeContent={
                                  <img src={getIconOfNotification(_e.type)} />
                                }
                              >
                                <Avatar src={_e.image ?? "/"} alt={_e.name} />
                              </Badge>
                              <ListItemText
                                primary={
                                  <p className="subTextOne fontWeight-300">
                                    {_e.name} {getStatusOfNotification(_e.type)}{" "}
                                    <span className="fontWeight-500">
                                      Creating Design System for Easier and
                                      Faster Design “thank you so much! 😊”
                                    </span>
                                  </p>
                                }
                              />
                            </ListItem>
                          );
                        })}
                      </List>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <p className="mainText fontWeight-700">Yesterday</p>
                  <Grid item container paddingTop={2}>
                    <Grid item xs={12}>
                      <List disablePadding>
                        <ListItem
                          disableGutters
                          secondaryAction={
                            <p className="subTextOne color-secondary-light">
                              10.12 PM
                            </p>
                          }
                        >
                          <Badge badgeContent={<img src={noticardIcon} />}>
                            <Avatar src={avatarDemo} />
                          </Badge>
                          <ListItemText
                            primary={
                              <p className="subTextOne fontWeight-300">
                                Nicolas Bekker purchased{" "}
                                <span className="fontWeight-500">
                                  Designing with User Centered Approach
                                </span>
                              </p>
                            }
                          />
                        </ListItem>
                        <ListItem
                          disableGutters
                          secondaryAction={
                            <p className="subTextOne color-secondary-light">
                              10.12 PM
                            </p>
                          }
                        >
                          <Badge badgeContent={<img src={chatIcon} />}>
                            <Avatar src={avatarDemo} />
                          </Badge>
                          <ListItemText
                            primary={
                              <p className="subTextOne fontWeight-300">
                                Bukayo Saka commented{" "}
                                <span className="fontWeight-500">
                                  Creating Design System for Easier and Faster
                                  Design “thank you so much! 😊”
                                </span>
                              </p>
                            }
                          />
                        </ListItem>
                      </List>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid className="instDashRight instDashRightNotifi" item width={366}>
              <Box className="notifiFilter">
                <p className="mainText fontWeight-700">Filter</p>
                <Grid item container spacing={2} paddingTop={2}>
                  <Grid item xs={6}>
                    <div className="lightforthCheckbox">
                      <div className="mainCheck">
                        <input
                          type="checkbox"
                          value={purchase}
                          onChange={() => {
                            setPurchase(!purchase);
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
                      <label>Purchase</label>
                    </div>
                  </Grid>
                  <Grid item xs={6}>
                    <div className="lightforthCheckbox">
                      <div className="mainCheck">
                        <input
                          type="checkbox"
                          value={like}
                          onChange={() => {
                            setLike(!like);
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
                      <label>Likes</label>
                    </div>
                  </Grid>
                  <Grid item xs={6}>
                    <div className="lightforthCheckbox">
                      <div className="mainCheck">
                        <input
                          type="checkbox"
                          value={comment}
                          onChange={() => {
                            setComment(!comment);
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
                      <label>Comments</label>
                    </div>
                  </Grid>
                  <Grid item xs={6}>
                    <div className="lightforthCheckbox">
                      <div className="mainCheck">
                        <input
                          type="checkbox"
                          value={reviews}
                          onChange={() => {
                            setReviews(!reviews);
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
                      <label>Reviews</label>
                    </div>
                  </Grid>
                  <Grid item xs={6}>
                    <div className="lightforthCheckbox">
                      <div className="mainCheck">
                        <input
                          type="checkbox"
                          value={approval}
                          onChange={() => {
                            setapproval(!approval);
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
                      <label>Course Approval</label>
                    </div>
                  </Grid>
                </Grid>
                <Grid item container paddingTop={4}>
                  <Grid item xs={12} paddingBottom={2}>
                    <p className="mainText fontWeight-700">From</p>
                  </Grid>
                  <FormControl>
                    <RadioGroup
                      row
                      value={from}
                      onChange={(e) => {
                        setFrom(e.target.value);
                      }}
                    >
                      <Grid item container spacing={2}>
                        <Grid item xs={6}>
                          <FormControlLabel
                            value="everyone"
                            control={<Radio sx={{ color: '#afbdca' }} defaultChecked />}
                            label="Everyone"
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <FormControlLabel
                            value="followers"
                            control={<Radio sx={{ color: '#afbdca' }} />}
                            label="Followers"
                          />
                        </Grid>
                      </Grid>
                    </RadioGroup>
                  </FormControl>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </div>

        <Dialog
          open={openNotiFilterModal}
          onClose={handleCloseNotiFilterModal}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth
          maxWidth="sm"
          className="modalOne"
        >
          <DialogTitle id="alert-dialog-title">
            <Grid container justifyContent={"space-between"}>
              <Grid item>
                <p className="mainText fontWeight-700">Filter</p>
              </Grid>
              <Grid item>
                <Button
                  className="modalClose"
                  onClick={handleCloseNotiFilterModal}
                >
                  <CloseIcon />
                </Button>
              </Grid>
            </Grid>
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item>
                <Box className="notifiFilter" padding={0}>                  
                  <Grid item container spacing={2} paddingTop={2}>
                    <Grid item xs={6}>
                      <div className="lightforthCheckbox">
                        <div className="mainCheck">
                          <input
                            type="checkbox"
                            value={purchase}
                            onChange={() => {
                              setPurchase(!purchase);
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
                        <label>Purchase</label>
                      </div>
                    </Grid>
                    <Grid item xs={6}>
                      <div className="lightforthCheckbox">
                        <div className="mainCheck">
                          <input
                            type="checkbox"
                            value={like}
                            onChange={() => {
                              setLike(!like);
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
                        <label>Likes</label>
                      </div>
                    </Grid>
                    <Grid item xs={6}>
                      <div className="lightforthCheckbox">
                        <div className="mainCheck">
                          <input
                            type="checkbox"
                            value={comment}
                            onChange={() => {
                              setComment(!comment);
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
                        <label>Comments</label>
                      </div>
                    </Grid>
                    <Grid item xs={6}>
                      <div className="lightforthCheckbox">
                        <div className="mainCheck">
                          <input
                            type="checkbox"
                            value={reviews}
                            onChange={() => {
                              setReviews(!reviews);
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
                        <label>Reviews</label>
                      </div>
                    </Grid>
                    <Grid item xs={6}>
                      <div className="lightforthCheckbox">
                        <div className="mainCheck">
                          <input
                            type="checkbox"
                            value={approval}
                            onChange={() => {
                              setapproval(!approval);
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
                        <label>Course Approval</label>
                      </div>
                    </Grid>
                  </Grid>
                  <Grid item container paddingTop={4}>
                    <Grid item xs={12} paddingBottom={2}>
                      <p className="mainText fontWeight-700">From</p>
                    </Grid>
                    <FormControl>
                      <RadioGroup
                        row
                        value={from}
                        onChange={(e) => {
                          setFrom(e.target.value);
                        }}
                      >
                        <Grid item container spacing={2}>
                          <Grid item xs={6}>
                            <FormControlLabel
                              value="everyone"
                              control={<Radio sx={{ color: '#afbdca' }} defaultChecked />}
                              label="Everyone"
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <FormControlLabel
                              value="followers"
                              control={<Radio sx={{ color: '#afbdca' }} />}
                              label="Followers"
                            />
                          </Grid>
                        </Grid>
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <button className="lightBtn fullWidth">Filter</button>
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
      </Seo>
    </AuthGuard>
  );
}

Component.displayName = "InstructorNotification";
