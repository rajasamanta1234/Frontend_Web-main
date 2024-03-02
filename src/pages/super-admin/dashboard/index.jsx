import { AuthGuard } from "../../../guards/super-admin/auth-guard";
import Seo from "@/components/common/seo";

import "../../../assets/css/super-admin/dashboard/style.css";
import "../../../assets/css/super-admin/dashboard/responsive.css";

import dashGraphIcon from "@/assets/images/dash-graph.svg";
import revenuIcon from "@/assets/images/revenu.svg";
import profileratingIcon from "@/assets/images/profile-rating.svg";
import studentIcon from "@/assets/images/studentIcon.svg";
import eyeLightIcon from "@/assets/images/eye-light.svg";
import indonesiaFlag from "@/assets/images/indonesia.png";
import vietnamFlag from "@/assets/images/vietnam.png";
import usFlag from "@/assets/images/us.png";

import { Avatar, Box, Chip, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemText, Menu, MenuItem, Typography } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import React from "react";


export function Component() {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  const metaTags = [
    { name: "Metaname1", content: "content1" },
    { name: "Metaname2", content: "content2" },
  ];
  return (
    <AuthGuard>
      <Seo title="Dashboard" metaName="Metaname" metaTags={metaTags}>
        <div className="mainDashboardArea">
          <Box className="mobPage_title_block">
            <h3 className="fontWeight-300">Hello, <strong className="fontWeight-500"> Admin</strong> 😄</h3>
          </Box>
          <Grid container>
            <Grid item sx={{ width: { xs: 'calc(100% - 0px)', md: 'calc(100% - 350px)', xl: 'calc(100% - 418px)' } }}>
              <Grid item container spacing={3}>
                <Grid item xs={12} sm={6} md={6} lg={4}>
                  <Grid item container sx={{ padding: '24px 16px', boxShadow: '0px 10px 32px 0px rgba(63,63,68,0.10)', background: '#fff', borderRadius: '8px' }}>
                    <Grid item xs={12}>
                      <Grid item container justifyContent={'space-between'} marginBottom={2}>
                        <Grid item>
                          <img src={revenuIcon} />
                        </Grid>
                        <Grid item>
                          <h4 className="fontWeight-500 color-primary">3,450</h4>
                        </Grid>
                      </Grid>
                      <Grid item container justifyContent={'space-between'}>
                        <Grid item>
                          <p className="subTextOne fontWeight-700">Total Courses</p>
                        </Grid>
                        <Grid item>
                          <img src={dashGraphIcon} />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={4}>
                  <Grid item container sx={{ padding: '24px 16px', boxShadow: '0px 10px 32px 0px rgba(63,63,68,0.10)', background: '#fff', borderRadius: '8px' }}>
                    <Grid item xs={12}>
                      <Grid item container justifyContent={'space-between'} marginBottom={2}>
                        <Grid item>
                          <img src={profileratingIcon} />
                        </Grid>
                        <Grid item>
                          <h4 className="fontWeight-500 color-primary">205</h4>
                        </Grid>
                      </Grid>
                      <Grid item container justifyContent={'space-between'}>
                        <Grid item>
                          <p className="subTextOne fontWeight-700">Total Instructors</p>
                        </Grid>
                        <Grid item>
                          <img src={dashGraphIcon} />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={4}>
                  <Grid item container sx={{ padding: '24px 16px', boxShadow: '0px 10px 32px 0px rgba(63,63,68,0.10)', background: '#fff', borderRadius: '8px' }}>
                    <Grid item xs={12}>
                      <Grid item container justifyContent={'space-between'} marginBottom={2}>
                        <Grid item>
                          <img src={studentIcon} />
                        </Grid>
                        <Grid item>
                          <h4 className="fontWeight-500 colorOrange">5622</h4>
                        </Grid>
                      </Grid>
                      <Grid item container justifyContent={'space-between'}>
                        <Grid item>
                          <p className="subTextOne fontWeight-700">Total Students</p>
                        </Grid>
                        <Grid item>
                          <img src={dashGraphIcon} />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={4}>
                  <Grid item container sx={{ padding: '24px 16px', boxShadow: '0px 10px 32px 0px rgba(63,63,68,0.10)', background: '#fff', borderRadius: '8px' }}>
                    <Grid item xs={12}>
                      <Grid item container justifyContent={'space-between'} marginBottom={2}>
                        <Grid item>
                          <img src={revenuIcon} />
                        </Grid>
                        <Grid item>
                          <h4 className="fontWeight-500 color-primary">$168.2K</h4>
                        </Grid>
                      </Grid>
                      <Grid item container justifyContent={'space-between'}>
                        <Grid item>
                          <p className="subTextOne fontWeight-700">Revenue</p>
                        </Grid>
                        <Grid item>
                          <img src={dashGraphIcon} />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={4}>
                  <Grid item container sx={{ padding: '24px 16px', boxShadow: '0px 10px 32px 0px rgba(63,63,68,0.10)', background: '#fff', borderRadius: '8px' }}>
                    <Grid item xs={12}>
                      <Grid item container justifyContent={'space-between'} marginBottom={2}>
                        <Grid item>
                          <img src={profileratingIcon} />
                        </Grid>
                        <Grid item>
                          <h4 className="fontWeight-500 color-primary">340</h4>
                        </Grid>
                      </Grid>
                      <Grid item container justifyContent={'space-between'}>
                        <Grid item>
                          <p className="subTextOne fontWeight-700">Courses Sold</p>
                        </Grid>
                        <Grid item>
                          <img src={dashGraphIcon} />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={4}>
                  <Grid item container sx={{ padding: '24px 16px', boxShadow: '0px 10px 32px 0px rgba(63,63,68,0.10)', background: '#fff', borderRadius: '8px' }}>
                    <Grid item xs={12}>
                      <Grid item container justifyContent={'space-between'} marginBottom={2}>
                        <Grid item>
                          <img src={studentIcon} />
                        </Grid>
                        <Grid item>
                          <h4 className="fontWeight-500 colorOrange">567</h4>
                        </Grid>
                      </Grid>
                      <Grid item container justifyContent={'space-between'}>
                        <Grid item>
                          <p className="subTextOne fontWeight-700">Subscriptions</p>
                        </Grid>
                        <Grid item>
                          <img src={dashGraphIcon} />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item container spacing={3} marginTop={7}>
                <Grid item xs={12} md={12} lg={5} xl={4}>
                  <Grid item container sx={{ padding: '24px 16px', boxShadow: '0px 10px 32px 0px rgba(63,63,68,0.10)', background: '#fff', borderRadius: '16px' }}>
                    <Grid item xs={12}>
                      <Grid item container justifyContent={'space-between'} alignItems={'center'}>
                        <p className="mainText fontWeight-700">Course Statistics</p>
                        <IconButton
                          aria-label="more"
                          id="long-button"
                          aria-controls={open ? 'long-menu' : undefined}
                          aria-expanded={open ? 'true' : undefined}
                          aria-haspopup="true"
                          onClick={handleClick}
                        >
                          <MoreVertIcon />
                        </IconButton>
                        <Menu
                          id="long-menu"
                          MenuListProps={{
                            'aria-labelledby': 'long-button',
                          }}
                          anchorEl={anchorEl}
                          open={open}
                          onClose={handleClose}
                          anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                          }}
                          transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                          }}
                        >
                          <MenuItem onClick={handleClose}>Profile</MenuItem>
                          <MenuItem onClick={handleClose}>My account</MenuItem>
                          <MenuItem onClick={handleClose}>Logout</MenuItem>
                        </Menu>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} md={12} lg={7} xl={8} className="dashWeeklySales">
                  <p className="mainText fontWeight-700">Weekly Sales Stats</p>
                  <Grid item container spacing={1} className="topBlock" sx={{ marginTop: '26px' }}>
                    <Grid item xs={6}>
                      <p className="subTextTwo">Course</p>
                    </Grid>
                    <Grid item xs={3}>
                      <p className="subTextTwo">Sale</p>
                    </Grid>
                    <Grid item xs={3}>
                      <p className="subTextTwo">Earnings</p>
                    </Grid>
                  </Grid>
                  <Grid item container spacing={1} className="bodyBlock" sx={{ marginTop: '16px' }}>
                    <Grid item xs={12}>
                      <Grid item container alignItems={'center'} spacing={1}>
                        <Grid item xs={6}>
                          <List disablePadding>
                            <ListItem disableGutters>
                              <ListItemAvatar>
                                <Avatar></Avatar>
                              </ListItemAvatar>
                              <ListItemText primary="UI/UX Prototyping with Proto.io" />
                            </ListItem>
                          </List>
                        </Grid>
                        <Grid item xs={3}>
                          <p className="subTextTwo">10</p>
                        </Grid>
                        <Grid item xs={3}>
                          <Chip size="small" label="$150.5" />
                        </Grid>
                      </Grid>
                      <Grid item container alignItems={'center'} spacing={1}>
                        <Grid item xs={6}>
                          <List disablePadding>
                            <ListItem disableGutters>
                              <ListItemAvatar>
                                <Avatar></Avatar>
                              </ListItemAvatar>
                              <ListItemText primary="UI/UX Prototyping with Proto.io" />
                            </ListItem>
                          </List>
                        </Grid>
                        <Grid item xs={3}>
                          <p className="subTextTwo">10</p>
                        </Grid>
                        <Grid item xs={3}>
                          <Chip size="small" label="$285" />
                        </Grid>
                      </Grid>
                      <Grid item container alignItems={'center'} spacing={1}>
                        <Grid item xs={6}>
                          <List disablePadding>
                            <ListItem disableGutters>
                              <ListItemAvatar>
                                <Avatar></Avatar>
                              </ListItemAvatar>
                              <ListItemText primary="UI/UX Prototyping with Proto.io" />
                            </ListItem>
                          </List>
                        </Grid>
                        <Grid item xs={3}>
                          <p className="subTextTwo">10</p>
                        </Grid>
                        <Grid item xs={3}>
                          <Chip size="small" label="$109" />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item width={{ xs: '100%', md: 350, xl: 418 }} paddingLeft={{ sm: 3, lg: 4 }} paddingRight={{ sm: 3, lg: 4 }} paddingTop={{ xs: 2, md: 0 }}>
              <Grid item container flexDirection={'column'} rowGap={5}>
                <Grid item xs={12}>
                  <p className="mainText fontWeight-700">Top Ambassadors</p>
                  <List className="dashRightList" disablePadding>
                    <ListItem disableGutters
                      secondaryAction={
                        <p className="subTextTwo"><img src={eyeLightIcon} />&nbsp; 2,440</p>
                      }
                    >
                      <ListItemAvatar>
                        <Avatar>A</Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary="Adebola Kunle"
                        secondary="adebolakunle@gmail.com"
                      />
                    </ListItem>
                    <ListItem disableGutters
                      secondaryAction={
                        <p className="subTextTwo"><img src={eyeLightIcon} />&nbsp; 1,947</p>
                      }
                    >
                      <ListItemAvatar>
                        <Avatar>B</Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary="Beatrice Emeka"
                        secondary="beatriceemeka@gmail.com"
                      />
                    </ListItem>
                    <ListItem disableGutters
                      secondaryAction={
                        <p className="subTextTwo"><img src={eyeLightIcon} />&nbsp; 1,731</p>
                      }
                    >
                      <ListItemAvatar>
                        <Avatar>A</Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary="Audrey Kobe"
                        secondary="audreykobe@gmail.com"
                      />
                    </ListItem>
                    <ListItem disableGutters
                      secondaryAction={
                        <p className="subTextTwo"><img src={eyeLightIcon} />&nbsp; 1,731</p>
                      }
                    >
                      <ListItemAvatar>
                        <Avatar>S</Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary="Seun Olagunju"
                        secondary="audreykobe@gmail.com"
                      />
                    </ListItem>
                  </List>
                </Grid>

                <Grid item xs={12}>
                  <p className="mainText fontWeight-700">Top Selling Courses</p>
                  <List className="dashRightList" disablePadding>
                    <ListItem disableGutters
                      secondaryAction={
                        <p className="subTextTwo"><img src={eyeLightIcon} />&nbsp; 2,440</p>
                      }
                    >
                      <ListItemAvatar>
                        <Avatar>G</Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary="Get Started with Figjam"
                        secondary="2 months ago"
                      />
                    </ListItem>
                    <ListItem disableGutters
                      secondaryAction={
                        <p className="subTextTwo"><img src={eyeLightIcon} />&nbsp; 1,947</p>
                      }
                    >
                      <ListItemAvatar>
                        <Avatar>P</Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary="Principle Advanced Prototyping"
                        secondary="3 months ago"
                      />
                    </ListItem>
                    <ListItem disableGutters
                      secondaryAction={
                        <p className="subTextTwo"><img src={eyeLightIcon} />&nbsp; 1,731</p>
                      }
                    >
                      <ListItemAvatar>
                        <Avatar>S</Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary="Sketch 101 - UI Design"
                        secondary="2 months ago"
                      />
                    </ListItem>
                  </List>
                </Grid>

                <Grid item xs={12}>
                  <p className="mainText fontWeight-700">Top Student Location</p>
                  <Grid className="customStudentProgress" marginTop={2} item container justifyContent={'space-between'} alignItems={'center'}>
                    <Grid item className="progressBlock" width={'30%'}>
                      <Grid item container justifyContent={'space-between'} width={'100%'}>
                        <Grid item>
                          <Grid item container columnGap={1} alignItems={'center'}>
                            <Grid item><img src={indonesiaFlag} /></Grid>
                            <Grid item><p className="subTextTwo">Indonesia</p></Grid>
                          </Grid>
                        </Grid>
                        <Grid item>
                          <p className="subTextTwo">3,551</p>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid className="progressValue" item width={50}>
                      <p className="subTextTwo">30%</p>
                    </Grid>
                  </Grid>
                  <Grid className="customStudentProgress" marginTop={2} item container justifyContent={'space-between'} alignItems={'center'}>
                    <Grid item className="progressBlock" width={'20%'}>
                      <Grid item container justifyContent={'space-between'} width={'100%'}>
                        <Grid item>
                          <Grid item container columnGap={1} alignItems={'center'}>
                            <Grid item><img src={vietnamFlag} /></Grid>
                            <Grid item><p className="subTextTwo">Vietnam</p></Grid>
                          </Grid>
                        </Grid>
                        <Grid item>
                          <p className="subTextTwo">2,951</p>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid className="progressValue" item width={50}>
                      <p className="subTextTwo">20%</p>
                    </Grid>
                  </Grid>
                  <Grid className="customStudentProgress" marginTop={2} item container justifyContent={'space-between'} alignItems={'center'}>
                    <Grid item className="progressBlock" width={'15%'}>
                      <Grid item container justifyContent={'space-between'} width={'100%'}>
                        <Grid item>
                          <Grid item container columnGap={1} alignItems={'center'}>
                            <Grid item><img src={usFlag} /></Grid>
                            <Grid item><p className="subTextTwo">United States</p></Grid>
                          </Grid>
                        </Grid>
                        <Grid item>
                          <p className="subTextTwo">2,951</p>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid className="progressValue" item width={50}>
                      <p className="subTextTwo">15%</p>
                    </Grid>
                  </Grid>
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
