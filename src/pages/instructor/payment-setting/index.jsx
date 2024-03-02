import { AuthGuard } from "../../../guards/instructor/auth-guard";
import Seo from "@/components/common/seo";
import { ZodError } from "zod";
import { handelError } from "@/helpers/common";

import "../../../assets/css/instructor-dashboard/style.css";
import "../../../assets/css/instructor-dashboard/responsive.css";

import SuccessDialog from "@/components/common/successDialog";
import PermitionDialoug from "@/components/common/PermitionDialoug";

import {
  withdrawMoneyValidate,
  creditCardAddValidation,
  paypalEmailValidation,
  stripeValidation,
  bankAccountValidation,
} from "@/validation/student/profile";

import avatarDemo from "@/assets/images/avatar-demo.png";
import pdfIcon from "@/assets/images/pdf.svg";
import eyeIcon from "@/assets/images/eye.svg";
import documentDownloadIcon from "@/assets/images/document-download.svg";
import bellIcon from "@/assets/images/bell-icon.svg";
import paymentIcon from "@/assets/images/payment-icon.svg";
import polyCloseIcon from "@/assets/images/poly-close-red.svg";
import saveIcon from "@/assets/images/save-icon.svg";
import strip from "@/assets/images/strip.svg";
import visa from "@/assets/images/visa.svg";
import wellsfargo from "@/assets/images/wellsfargo.png";
import PayPal from "@/assets/images/PayPal-Logo.svg";
import erningBg from "@/assets/images/erning-bg.svg";
import mastercard from "@/assets/images/mastercard.svg";
import editIcon from "@/assets/images/edit.svg";
import creditCardIcon from "@/assets/images/credit-card.svg";
import bankIcon from "@/assets/images/bank-icon.svg";
import calendaroutlineIcon from "@/assets/images/calendar-outline.svg";
import infoutlineIcon from "@/assets/images/info-outline.svg";
import closepolygreyIcon from "@/assets/images/close-poly-grey.svg";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  LinearProgress,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Radio,
  RadioGroup,
  Switch,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import React, { useState } from "react";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import CloseIcon from "@mui/icons-material/Close";
import { TabContext, TabList, TabPanel } from "@mui/lab";

const metaTags = [
  { name: "Metaname1", content: "content1" },
  { name: "Metaname2", content: "content2" },
];

import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export function Component() {
  const [passwordView, setpasswordView] = useState(false);
  const [withdrawMoney, setWithdrawMoney] = useState({
    amount: "",
    amountErr: false,
    amountErrMsg: "",
    cardHolderName: "",
    cardHolderNameErr: false,
    cardHolderNameErrMsg: "",
    cardNumber: "",
    cardNumberErr: false,
    cardNumberErrMsg: "",
    paymentMethod: "",
    paymentMethodErr: false,
    paymentMethodErrMsg: "",
  });

  const [creditCardAddForm, setcreditCardAddForm] = useState({
    cardHolderName: "",
    cardHolderNameErr: false,
    cardHolderNameErrMsg: "",
    cardNumber: "",
    cardNumberErr: false,
    cardNumberErrMsg: "",
    expiryDate: "",
    expiryDateErr: false,
    expiryDateErrMsg: "",
    cvv: "",
    cvvErr: false,
    cvvErrMsg: "",
  });

  const [paypalAddForm, setpaypalAddForm] = useState({
    email: "",
    emailErr: false,
    emailErrMsg: "",
  });

  const [stripeAddForm, setstripeAddForm] = useState({
    stripApiKey: "",
    stripApiKeyErr: false,
    stripApiKeyErrMsg: "",
  });

  const [bankAccountAddForm, setbankAccountAddForm] = useState({
    accountNumber: "",
    accountNumberErr: false,
    accountNumberErrMsg: "",
    sortCode: "",
    sortCodeErr: false,
    sortCodeErrMsg: "",
  });

  const [addCardModal, setaddCardModal] = useState({ open: false, data: null });

  const [cardDetailsModal, setcardDetailsModal] = useState({
    open: false,
    data: null,
    edit: false,
    type: "",
  });

  const cardDetailsOpenForView = (data, type) => {
    console.log(type);
    setcardDetailsModal({
      open: true,
      data: data || null,
      edit: false,
      type: type || "",
    });
  };

  const cardDetailsCloseForViewOrEdit = () => {
    setcardDetailsModal({
      open: false,
      data: null,
      edit: false,
      type: "",
    });
  };

  const cardDetailsOpenForEdit = (data, type) => {
    setcardDetailsModal({
      open: true,
      data: data || null,
      edit: true,
      type: type || "",
    });
  };

  // const cardDetailsCloseForEdit = (data, type) => {
  //   setcardDetailsModal({
  //     open: false,
  //     data: null,
  //     edit: false,
  //     type: "",
  //   });
  // };

  const [openSucessDialog, setopenSucessDialog] = useState({
    open: false,
    title: "",
  });
  const [alertmodal, setAlertModal] = useState({
    open: false,
    title: "",
  });

  const handleOpenAlertModal = (data) => {
    setAlertModal({ open: true, title: data || "" });
  };
  const handleCloseAlertModal = () => {
    setAlertModal({ open: false, title: "" });
  };

  const handelOpenAddCardModal = (data = null) => {
    setaddCardModal({ open: true, data: data || null });
  };
  const handelCloseAddCardModal = () => {
    setaddCardModal({ open: false, data: null });
    setValue("1");
  };

  const handelSuccessDialogOpen = (data) => {
    setopenSucessDialog({ open: true, title: data || "" });
  };

  const handelSuccessDialogClose = () => {
    setopenSucessDialog({ open: false, data: "" });
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const label = { inputProps: { "aria-label": "Switch demo" } };

  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handelSubmitAddCard = async () => {
    try {
      creditCardAddValidation.parse(creditCardAddForm);
    } catch (error) {
      if (error instanceof ZodError) {
        handelError(error, setcreditCardAddForm);
      }
      return;
    }

    // console.log(creditCardAddForm);
    handelCloseAddCardModal();
    handelSuccessDialogOpen("Card Added Successfully!");
  };

  const handelSubmitAddPaypal = async () => {
    try {
      paypalEmailValidation.parse(paypalAddForm);
    } catch (error) {
      if (error instanceof ZodError) {
        handelError(error, setpaypalAddForm);
      }
      return;
    }

    handelCloseAddCardModal();
    handelSuccessDialogOpen("Card Added Successfully!");
  };

  const handelSubmitAddStripe = async () => {
    try {
      stripeValidation.parse(stripeAddForm);
    } catch (error) {
      if (error instanceof ZodError) {
        handelError(error, setstripeAddForm);
      }
      return;
    }

    handelCloseAddCardModal();
    handelSuccessDialogOpen("Card Added Successfully!");
  };

  const handelSubmitAddBank = async () => {
    try {
      bankAccountValidation.parse(bankAccountAddForm);
    } catch (error) {
      if (error instanceof ZodError) {
        handelError(error, setbankAccountAddForm);
      }
      return;
    }

    handelCloseAddCardModal();
    handelSuccessDialogOpen("Card Added Successfully!");
  };

  const getHeaderDetails = (data) => {
    if (data?.type == "card" && data?.edit) {
      return "Edit Card Information";
    } else if (data?.type == "card" && !data?.edit) {
      return "Card Information";
    } else if (data?.type == "paypal" && data?.edit) {
      return "Edit Paypal Information";
    } else if (data?.type == "paypal" && !data?.edit) {
      return "Paypal Information";
    } else if (data?.type == "stripe" && data?.edit) {
      return "Edit Stripe Information";
    } else if (data?.type == "stripe" && !data?.edit) {
      return "Stripe Information";
    } else if (data?.type == "bank" && data?.edit) {
      return "Edit Bank Account Information";
    } else if (data?.type == "bank" && !data?.edit) {
      return "Bank Account Information";
    }
    return "";
  };

  const handelEditDetails = (data, type) => {
    try {
      console.log(data, type);
      cardDetailsCloseForViewOrEdit();

      switch (type) {
        case "stripe":
          handelSuccessDialogOpen("Stripe Settings Saved!");
          break;

        case "bank":
          handelSuccessDialogOpen("Bank Account Settings Saved!");
          break;

        case "paypal":
          handelSuccessDialogOpen("PayPal Settings Saved!");
          break;

        case "card":
          handelSuccessDialogOpen("Card Settings Saved!");
          break;

        default:
          break;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickDisconnect = (data, type) => {
    cardDetailsCloseForViewOrEdit();
    switch (type) {
      case "stripe":
        handleOpenAlertModal("Stripe Settings Saved!");
        break;

      case "bank":
        handleOpenAlertModal("Bank Account Settings Saved!");
        break;

      case "paypal":
        handleOpenAlertModal("PayPal Settings Saved!");
        break;

      case "card":
        handleOpenAlertModal("Card Settings Saved!");
        break;

      default:
        break;
    }
  };

  const handelOnConfirmDisconnect = async () => {
    handleCloseAlertModal();
  };
  const handelChange = (_event) => {
    setWithdrawMoney((_prevState) => ({
      ..._prevState,
      [_event.target.name]: _event.target.value,
      [`${_event.target.name}Err`]: false,
      [`${_event.target.name}ErrMsg`]: "",
    }));
  };

  const handelChangeAddPaymentMethod = (_event, setState) => {
    setState((_prevState) => ({
      ..._prevState,
      [_event.target.name]: _event.target.value,
      [`${_event.target.name}Err`]: false,
      [`${_event.target.name}ErrMsg`]: "",
    }));
  };

  const handelWithdrawMoney = async () => {
    console.log(withdrawMoney);

    try {
      withdrawMoneyValidate.parse(withdrawMoney);
    } catch (error) {
      if (error instanceof ZodError) {
        handelError(error, setWithdrawMoney);
      }
      return;
    }
  };

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
                    <h4>Payment Settings</h4>
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Grid
                    item
                    container
                    justifyContent={{ xs: "flex-start", sm: "flex-end" }}
                  >
                    <Grid item>
                      <div className="newCoursebtndiv">
                        <button className="lightBtn">
                          <img src={saveIcon} alt="icon" />
                          Save Changes
                        </button>
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item container padding={"20px 0 37px"}>
                <Grid item xs={12}>
                  <h2 className="color-Neutral-800 fontWeight-700">$168.50</h2>
                  <p className="mainText color-Neutral-800 fontWeight-400">
                    Available Balance
                  </p>
                </Grid>
              </Grid>
              <Grid item container>
                <Grid item xs={12} sm={6}>
                  <Grid
                    item
                    container
                    padding={3}
                    flexDirection={"column"}
                    rowGap={3}
                  >
                    <Grid item xs={12}>
                      <p className="mainText fontWeight-700">Withdraw</p>
                    </Grid>
                    <Grid item xs={12}>
                      <Box className="amountInputGroup">
                        <label className="formlabel">Amount</label>
                        <div className="inputGroup positionLeft">
                          <input
                            type="tel"
                            className={`form-control ${
                              withdrawMoney.amountErr ? "errField" : ""
                            }`}
                            name="amount"
                            value={withdrawMoney.amount}
                            onChange={(_event) => {
                              handelChange(_event);
                            }}
                          />
                          <span>$</span>
                        </div>
                        <p className="errorMsg">
                          {withdrawMoney?.amountErrMsg}
                        </p>
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <label className="formlabel">Withdraw to</label>
                      <FormControl fullWidth>
                        <RadioGroup
                          aria-labelledby="demo-radio-buttons-group-label"
                          name="paymentMethod"
                          value={withdrawMoney.paymentMethod}
                          onChange={(_event) => {
                            handelChange(_event);
                          }}
                        >
                          <Box className="withdrawBox">
                            <Grid
                              item
                              container
                              justifyContent={"space-between"}
                              alignItems={"center"}
                            >
                              <Grid item>
                                <FormControlLabel
                                  value="paypal"
                                  control={<Radio />}
                                  label={<img src={PayPal} />}
                                />
                              </Grid>
                              <Grid item>
                                <p className="subTextTwo">sam****</p>
                              </Grid>
                            </Grid>
                          </Box>
                          <Box className="withdrawBox">
                            <Grid
                              item
                              container
                              justifyContent={"space-between"}
                              alignItems={"center"}
                            >
                              <Grid item>
                                <FormControlLabel
                                  value="wellsfargo"
                                  control={<Radio />}
                                  label={<img src={wellsfargo} />}
                                />
                              </Grid>
                              <Grid item>
                                <p className="subTextTwo">**** 4097</p>
                              </Grid>
                            </Grid>
                          </Box>
                          <Box className="withdrawBox">
                            <Grid
                              item
                              container
                              justifyContent={"space-between"}
                              alignItems={"center"}
                            >
                              <Grid item>
                                <FormControlLabel
                                  value="visa"
                                  control={<Radio />}
                                  label={<img src={visa} />}
                                />
                              </Grid>
                              <Grid item>
                                <p className="subTextTwo">**** 2842</p>
                              </Grid>
                            </Grid>
                          </Box>
                          <Box className="withdrawBox">
                            <Grid
                              item
                              container
                              justifyContent={"space-between"}
                              alignItems={"center"}
                            >
                              <Grid item>
                                <FormControlLabel
                                  value="strip"
                                  control={<Radio />}
                                  label={<img src={strip} />}
                                />
                              </Grid>
                              <Grid item>
                                <p className="subTextTwo">sam****</p>
                              </Grid>
                            </Grid>
                          </Box>
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <Box className="formGroup">
                        <label className="formlabel">Card Holder Name</label>
                        <input
                          type="text"
                          className={`form-control ${
                            withdrawMoney.cardHolderNameErr ? "errField" : ""
                          }`}
                          name="cardHolderName"
                          value={withdrawMoney.cardHolderName}
                          onChange={(_event) => {
                            handelChange(_event);
                          }}
                        />
                        <p className="errorMsg">
                          {withdrawMoney?.cardHolderNameErrMsg}
                        </p>
                      </Box>
                      <Box className="formGroup">
                        <label className="formlabel">Card Number</label>
                        <input
                          type="tel"
                          className={`form-control ${
                            withdrawMoney.cardNumberErr ? "errField" : ""
                          }`}
                          name="cardNumber"
                          value={withdrawMoney.cardNumber}
                          onChange={(_event) => {
                            handelChange(_event);
                          }}
                        />
                        <p className="errorMsg">
                          {withdrawMoney?.cardNumberErrMsg}
                        </p>
                      </Box>
                      <Box>
                        <button
                          className="lightBtn fullWidth"
                          onClick={handelWithdrawMoney}
                        >
                          Withdraw
                        </button>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Grid item container padding={3}>
                    <Grid item xs={12}>
                      <Grid
                        item
                        container
                        flexDirection={"column"}
                        rowGap={"17px"}
                      >
                        <Box className="amountBalance">
                          <Grid item container justifyContent={"space-between"}>
                            <Grid item>
                              <h5>$75.90</h5>
                              <p className="subTextOne">Today’s Earning</p>
                            </Grid>
                            <Grid item>
                              <img src={erningBg} />
                            </Grid>
                          </Grid>
                        </Box>
                        <Box className="amountBalance">
                          <Grid item container justifyContent={"space-between"}>
                            <Grid item>
                              <h5>$125</h5>
                              <p className="subTextOne">Pending Payout</p>
                            </Grid>
                            <Grid item>
                              <img src={erningBg} />
                            </Grid>
                          </Grid>
                        </Box>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Box className="payoutList">
                        <p className="mainText fontWeight-700">
                          Recent Payouts
                        </p>
                        <TableContainer className="recentPayoutsTable">
                          <Table>
                            <TableHead>
                              <TableRow>
                                <TableCell align="left">Amount</TableCell>
                                <TableCell align="left">Bank/Card</TableCell>
                                <TableCell align="right">Date</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              <TableRow>
                                <TableCell align="left">
                                  <Chip label="$100" />
                                </TableCell>
                                <TableCell align="left">
                                  <img src={PayPal} />
                                </TableCell>
                                <TableCell align="right">
                                  Aug 21, 2021
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell align="left">
                                  <Chip label="$150" />
                                </TableCell>
                                <TableCell align="left">
                                  <img src={mastercard} />
                                </TableCell>
                                <TableCell align="right">
                                  Aug 21, 2021
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell align="left">
                                  <Chip label="$150" />
                                </TableCell>
                                <TableCell align="left">
                                  <img src={PayPal} />
                                </TableCell>
                                <TableCell align="right">
                                  Aug 21, 2021
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell align="left">
                                  <Chip label="$150" />
                                </TableCell>
                                <TableCell align="left">
                                  <img src={visa} />
                                </TableCell>
                                <TableCell align="right">
                                  Aug 21, 2021
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell align="left">
                                  <Chip label="$150" />
                                </TableCell>
                                <TableCell align="left">
                                  <img src={mastercard} />
                                </TableCell>
                                <TableCell align="right">
                                  Aug 21, 2021
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell align="left">
                                  <Chip label="$150" />
                                </TableCell>
                                <TableCell align="left">
                                  <img src={mastercard} />
                                </TableCell>
                                <TableCell align="right">
                                  Aug 21, 2021
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid className="instDashRight" item width={366}>
              <Grid item container>
                <Grid item xs={12}>
                  <Box className="savePaymentList">
                    <Grid
                      item
                      container
                      flexDirection={"column"}
                      rowGap={"18px"}
                    >
                      <Grid item xs={12}>
                        <Grid
                          item
                          container
                          justifyContent={"space-between"}
                          alignItems={"center"}
                        >
                          <Grid item>
                            <p className="mainText fontWeight-700 mb-0">
                              Saved Payment Method
                            </p>
                          </Grid>
                          <Grid item>
                            <button
                              className="lightBtnSmall"
                              onClick={() => {
                                handelOpenAddCardModal();
                              }}
                            >
                              Add
                            </button>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Grid
                          item
                          container
                          flexDirection={"column"}
                          rowGap={"16px"}
                        >
                          <Grid item xs={12}>
                            <Box className="paymentList">
                              <Grid
                                item
                                container
                                justifyContent={"space-between"}
                              >
                                <Grid item>
                                  <img src={PayPal} />
                                </Grid>
                                <Grid item>
                                  <Grid
                                    item
                                    container
                                    alignItems={"center"}
                                    columnGap={2}
                                  >
                                    <p className="subTextTwo mb-0">sam****</p>
                                    <button
                                      onClick={() => {
                                        cardDetailsOpenForView(
                                          {
                                            name: "Samantha William",
                                            country: "Bulgaria",
                                            card: 1234,
                                            expire: "10/21",
                                            email: "samant**@yopmail.com",
                                          },
                                          "paypal"
                                        );
                                      }}
                                    >
                                      <img src={editIcon} />
                                    </button>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Box>
                          </Grid>
                          <Grid item xs={12}>
                            <Box className="paymentList">
                              <Grid
                                item
                                container
                                justifyContent={"space-between"}
                              >
                                <Grid item>
                                  <img src={strip} />
                                </Grid>
                                <Grid item>
                                  <Grid
                                    item
                                    container
                                    alignItems={"center"}
                                    columnGap={2}
                                  >
                                    <p className="subTextTwo mb-0">sam****</p>
                                    <button
                                      onClick={() => {
                                        cardDetailsOpenForView(
                                          {
                                            name: "Samantha William",
                                            country: "Bulgaria",
                                            card: 1234,
                                            expire: "10/21",
                                            email: "samant**@yopmail.com",
                                            apiKey: "1234******",
                                          },
                                          "stripe"
                                        );
                                      }}
                                    >
                                      <img src={editIcon} />
                                    </button>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Box>
                          </Grid>
                          <Grid item xs={12}>
                            <Box className="paymentList">
                              <Grid
                                item
                                container
                                justifyContent={"space-between"}
                              >
                                <Grid item>
                                  <img src={mastercard} />
                                </Grid>
                                <Grid item>
                                  <Grid
                                    item
                                    container
                                    alignItems={"center"}
                                    columnGap={2}
                                  >
                                    <p className="subTextTwo mb-0">sam****</p>
                                    <button
                                      onClick={() => {
                                        cardDetailsOpenForView(
                                          {
                                            name: "Samantha William",
                                            country: "Bulgaria",
                                            card: 1234,
                                            expire: "10/21",
                                          },
                                          "card"
                                        );
                                      }}
                                    >
                                      <img src={editIcon} />
                                    </button>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Box>
                          </Grid>
                          <Grid item xs={12}>
                            <Box className="paymentList">
                              <Grid
                                item
                                container
                                justifyContent={"space-between"}
                              >
                                <Grid item>
                                  <img src={visa} />
                                </Grid>
                                <Grid item>
                                  <Grid
                                    item
                                    container
                                    alignItems={"center"}
                                    columnGap={2}
                                  >
                                    <p className="subTextTwo mb-0">sam****</p>
                                    <button
                                      onClick={() => {
                                        cardDetailsOpenForView(
                                          {
                                            name: "Samantha William",
                                            country: "Bulgaria",
                                            card: 1234,
                                            expire: "10/21",
                                            email: "samant**@yopmail.com",
                                            apiKey: "1234******",
                                          },
                                          "bank"
                                        );
                                      }}
                                    >
                                      <img src={editIcon} />
                                    </button>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Box>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>

        <Dialog
          open={addCardModal?.open}
          onClose={handelCloseAddCardModal}
          TransitionComponent={Transition}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth
          maxWidth="sm"
          className="modalOne paymentModal"
        >
          <DialogTitle id="alert-dialog-title">
            <Grid container justifyContent={"space-between"}>
              <Grid item>
                <p className="mainText fontWeight-700">Add Payment Method</p>
              </Grid>
              <Grid item>
                <Button
                  className="modalClose"
                  onClick={handelCloseAddCardModal}
                >
                  <CloseIcon />
                </Button>
              </Grid>
            </Grid>
          </DialogTitle>
          <DialogContent>
            <Box className="paymentModalTab" sx={{ width: "100%" }}>
              <TabContext value={value}>
                <Box
                  sx={{
                    borderBottom: 1,
                    borderColor: "divider",
                    padding: "0 0 24px",
                  }}
                >
                  <TabList
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                  >
                    <Tab
                      label={
                        <p>
                          <img src={creditCardIcon} /> Credit Card
                        </p>
                      }
                      value="1"
                    />
                    <Tab label={<img src={PayPal} />} value="2" />
                    <Tab label={<img src={strip} />} value="3" />
                    <Tab
                      label={
                        <p>
                          <img src={bankIcon} /> bank
                        </p>
                      }
                      value="4"
                    />
                  </TabList>
                </Box>
                <TabPanel value="1">
                  <Grid container flexDirection={"column"} rowGap={3}>
                    <Grid item xs={12}>
                      <label className="formlabel">Card Number</label>
                      <input
                        type="number"
                        placeholder="0000 0000 0000 0000 0000"
                        className={`form-control ${
                          creditCardAddForm.cardNumberErr ? "errField" : ""
                        }`}
                        name="cardNumber"
                        value={creditCardAddForm.cardNumber}
                        onChange={(_event) => {
                          handelChangeAddPaymentMethod(
                            _event,
                            setcreditCardAddForm
                          );
                        }}
                      />

                      <p className="errorMsg">
                        {creditCardAddForm?.cardNumberErrMsg}
                      </p>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid item container spacing={3}>
                        <Grid item xs={12} sm={6}>
                          <label className="formlabel">Expiry Date</label>
                          <div className="inputGroup positionRight">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="MM/YY"
                            />
                            <button type="button" className="inputGroupRight">
                              <img src={calendaroutlineIcon} alt="icon" />
                            </button>
                          </div>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <label className="formlabel">CVC/CVV</label>
                          <div className="inputGroup positionRight">
                            <input
                              type="password"
                              placeholder="123"
                              className={`form-control ${
                                creditCardAddForm.cvvErr ? "errField" : ""
                              }`}
                              name="cvv"
                              value={creditCardAddForm.cvv}
                              onChange={(_event) => {
                                handelChangeAddPaymentMethod(
                                  _event,
                                  setcreditCardAddForm
                                );
                              }}
                            />
                            <button type="button" className="inputGroupRight">
                              <img src={infoutlineIcon} alt="icon" />
                            </button>
                          </div>

                          <p className="errorMsg">
                            {creditCardAddForm?.cvvErrMsg}
                          </p>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <label className="formlabel">Cardholder Name</label>
                      <input
                        type="text"
                        placeholder="Enter cardholder’s full name"
                        className={`form-control ${
                          creditCardAddForm.cardHolderNameErr ? "errField" : ""
                        }`}
                        name="cardHolderName"
                        value={creditCardAddForm.cardHolderName}
                        onChange={(_event) => {
                          handelChangeAddPaymentMethod(
                            _event,
                            setcreditCardAddForm
                          );
                        }}
                      />

                      <p className="errorMsg">
                        {creditCardAddForm?.cardHolderNameErrMsg}
                      </p>
                    </Grid>
                    <Grid item xs={12}>
                      <button
                        className="lightBtn fullWidth"
                        onClick={() => {
                          handelSubmitAddCard();
                        }}
                      >
                        Save Changes
                      </button>
                    </Grid>
                  </Grid>
                </TabPanel>
                <TabPanel value="2">
                  <Grid container flexDirection={"column"} rowGap={3}>
                    <Grid item xs={12}>
                      <label className="formlabel">PayPal Email Address</label>
                      <input
                        type="email"
                        placeholder="yourmail@mail.com"
                        className={`form-control ${
                          paypalAddForm.emailErr ? "errField" : ""
                        }`}
                        name="email"
                        value={paypalAddForm.email}
                        onChange={(_event) => {
                          handelChangeAddPaymentMethod(
                            _event,
                            setpaypalAddForm
                          );
                        }}
                      />

                      <p className="errorMsg">{paypalAddForm?.emailErrMsg}</p>
                    </Grid>
                    <Grid item xs={12}>
                      <button
                        className="lightBtn fullWidth"
                        onClick={handelSubmitAddPaypal}
                      >
                        Save
                      </button>
                    </Grid>
                  </Grid>
                </TabPanel>
                <TabPanel value="3">
                  <Grid container flexDirection={"column"} rowGap={3}>
                    <Grid item xs={12}>
                      <label className="formlabel">Stripe API Key</label>
                      <input
                        type="text"
                        placeholder="Enter API Key here"
                        className={`form-control ${
                          stripeAddForm.stripApiKeyErr ? "errField" : ""
                        }`}
                        name="stripApiKey"
                        value={stripeAddForm.stripApiKey}
                        onChange={(_event) => {
                          handelChangeAddPaymentMethod(
                            _event,
                            setstripeAddForm
                          );
                        }}
                      />
                      <p className="errorMsg">
                        {stripeAddForm?.stripApiKeyErrMsg}
                      </p>
                    </Grid>
                    <Grid item xs={12}>
                      <button
                        className="lightBtn fullWidth"
                        onClick={handelSubmitAddStripe}
                      >
                        Save
                      </button>
                    </Grid>
                  </Grid>
                </TabPanel>
                <TabPanel value="4">
                  <Grid container flexDirection={"column"} rowGap={3}>
                    <Grid item xs={12}>
                      <label className="formlabel">Account Number</label>
                      <input
                        type="number"
                        placeholder="Enter Bank Account Number"
                        className={`form-control ${
                          bankAccountAddForm.accountNumberErr ? "errField" : ""
                        }`}
                        name="accountNumber"
                        value={bankAccountAddForm.accountNumber}
                        onChange={(_event) => {
                          handelChangeAddPaymentMethod(
                            _event,
                            setbankAccountAddForm
                          );
                        }}
                      />
                      <p className="errorMsg">
                        {bankAccountAddForm?.accountNumberErrMsg}
                      </p>
                    </Grid>
                    <Grid item xs={12}>
                      <label className="formlabel">Bank Sort Code</label>
                      <input
                        type="text"
                        placeholder="Enter Sort Code "
                        className={`form-control ${
                          bankAccountAddForm.sortCodeErr ? "errField" : ""
                        }`}
                        name="sortCode"
                        value={bankAccountAddForm.sortCode}
                        onChange={(_event) => {
                          handelChangeAddPaymentMethod(
                            _event,
                            setbankAccountAddForm
                          );
                        }}
                      />
                      <p className="errorMsg">{bankAccountAddForm?.sortCode}</p>
                    </Grid>
                    <Grid item xs={12}>
                      <button
                        className="lightBtn fullWidth"
                        onClick={handelSubmitAddBank}
                      >
                        Save
                      </button>
                    </Grid>
                  </Grid>
                </TabPanel>
              </TabContext>
            </Box>
          </DialogContent>
        </Dialog>

        <Dialog
          open={cardDetailsModal?.open}
          TransitionComponent={Transition}
          onClose={cardDetailsCloseForViewOrEdit}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth
          maxWidth="sm"
          className="modalOne paymentModal"
        >
          <DialogTitle id="alert-dialog-title">
            <Grid container justifyContent={"space-between"}>
              <Grid item>
                <p className="mainText fontWeight-700">
                  {getHeaderDetails(cardDetailsModal)}
                </p>
              </Grid>
              <Grid item>
                <Button
                  className="modalClose"
                  onClick={cardDetailsCloseForViewOrEdit}
                >
                  <CloseIcon />
                </Button>
              </Grid>
            </Grid>
          </DialogTitle>
          <DialogContent>
            {/* *******************************************card*********************************** */}
            {cardDetailsModal?.type == "card" && (
              <>
                <Grid
                  container
                  className="creditCardInfo"
                  justifyContent={"space-between"}
                >
                  <Grid item>
                    <Grid item container>
                      <Grid item marginRight={3}>
                        <img src={mastercard} />
                      </Grid>
                      <Grid item>
                        <p className="subTextTwo mb-0">
                          {cardDetailsModal?.data?.name}
                        </p>
                        <p className="subTextTwo mb-0" style={{ opacity: 0.5 }}>
                          {cardDetailsModal?.data?.country}
                        </p>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <p className="subTextTwo mb-0 textRight">
                      Ending in <strong>{cardDetailsModal?.data?.card}</strong>
                    </p>
                    <p className="subTextTwo mb-0 textRight">
                      Expires <strong>{cardDetailsModal?.data?.expire}</strong>
                    </p>
                  </Grid>
                </Grid>

                {cardDetailsModal?.edit && (
                  <>
                    <Grid
                      container
                      flexDirection={"column"}
                      rowGap={3}
                      paddingTop={3}
                    >
                      <Grid item xs={12}>
                        <label className="formlabel">Card Number</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="0000 0000 0000 0000 0000"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Grid item container spacing={3}>
                          <Grid item xs={12} sm={6}>
                            <label className="formlabel">Card Number</label>
                            <div className="inputGroup positionRight">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="MM/YY"
                              />
                              <button type="button" className="inputGroupRight">
                                <img src={calendaroutlineIcon} alt="icon" />
                              </button>
                            </div>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <label className="formlabel">CVC/CVV</label>
                            <div className="inputGroup positionRight">
                              <input
                                type="password"
                                className="form-control"
                                placeholder="123"
                              />
                              <button type="button" className="inputGroupRight">
                                <img src={infoutlineIcon} alt="icon" />
                              </button>
                            </div>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <label className="formlabel">Cardholder Name</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter cardholder’s full name"
                        />
                      </Grid>
                    </Grid>
                  </>
                )}
                {/* <Grid container className="creditCardInfoAction" spacing={2}>
                  <Grid item xs={6}>
                    {cardDetailsModal?.edit ? (
                      <button className="lightBtn">Save</button>
                    ) : (
                      <button className="lightBtn">Edit</button>
                    )}
                  </Grid>
                  <Grid item xs={6}>
                    <button className="normalBtn">
                      Disconnect <img src={closepolygreyIcon} />
                    </button>
                  </Grid>
                </Grid> */}
              </>
            )}
            {/* End Credit Card info and edit */}

            {/* *******************************************paypal*********************************** */}
            {cardDetailsModal?.type == "paypal" && (
              <>
                {" "}
                <Grid
                  container
                  className="creditCardInfo"
                  justifyContent={"space-between"}
                >
                  <Grid item>
                    <p className="subTextTwo mb-0">
                      {cardDetailsModal?.data?.name}
                    </p>
                    <p className="subTextTwo mb-0" style={{ opacity: 0.5 }}>
                      {cardDetailsModal?.data?.email}
                    </p>
                  </Grid>
                </Grid>
                {cardDetailsModal?.edit && (
                  <>
                    <Grid
                      container
                      flexDirection={"column"}
                      rowGap={3}
                      paddingTop={3}
                    >
                      <Grid item xs={12}>
                        <label className="formlabel">
                          PayPal Email Address
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="0000 0000 0000 0000 0000"
                        />
                      </Grid>
                    </Grid>
                  </>
                )}
              </>
            )}

            {/* *******************************************Stripe*********************************** */}

            {cardDetailsModal?.type == "stripe" && (
              <>
                {" "}
                <Grid
                  container
                  className="creditCardInfo"
                  justifyContent={"space-between"}
                >
                  <Grid item>
                    <p className="subTextTwo mb-0">
                      {cardDetailsModal?.data?.name}
                    </p>
                    <p className="subTextTwo mb-0" style={{ opacity: 0.5 }}>
                      {cardDetailsModal?.data?.apiKey}
                    </p>
                  </Grid>
                </Grid>
                {cardDetailsModal?.edit && (
                  <>
                    <Grid
                      container
                      flexDirection={"column"}
                      rowGap={3}
                      paddingTop={3}
                    >
                      <Grid item xs={12}>
                        <label className="formlabel">Stripe API Key</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="0000 0000 0000 0000 0000"
                        />
                      </Grid>
                    </Grid>
                  </>
                )}
              </>
            )}

            {/* *******************************************Bank*********************************** */}

            {cardDetailsModal?.type == "bank" && (
              <>
                {" "}
                <Grid
                  container
                  className="creditCardInfo"
                  justifyContent={"space-between"}
                >
                  <Grid item>
                    <p className="subTextTwo mb-0">
                      {cardDetailsModal?.data?.name}
                    </p>
                    <p className="subTextTwo mb-0" style={{ opacity: 0.5 }}>
                      {cardDetailsModal?.data?.apiKey}
                    </p>
                  </Grid>
                </Grid>
                {cardDetailsModal?.edit && (
                  <>
                    <Grid
                      container
                      flexDirection={"column"}
                      rowGap={3}
                      paddingTop={3}
                    >
                      <Grid item xs={12}>
                        <label className="formlabel">Account Number</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Bank Account Number"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <label className="formlabel">Bank Sort Code</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Sort Code"
                        />
                      </Grid>
                    </Grid>
                  </>
                )}
              </>
            )}

            <Grid container className="creditCardInfoAction" spacing={2}>
              <Grid item xs={6}>
                {cardDetailsModal?.edit ? (
                  <button
                    className="lightBtn"
                    onClick={() => {
                      handelEditDetails(
                        cardDetailsModal?.data,
                        cardDetailsModal?.type
                      );
                    }}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    className="lightBtn"
                    onClick={() => {
                      cardDetailsOpenForEdit(
                        cardDetailsModal?.data,
                        cardDetailsModal?.type
                      );
                    }}
                  >
                    Edit
                  </button>
                )}
              </Grid>
              <Grid item xs={6}>
                <button
                  className="normalBtn"
                  onClick={() => {
                    handleClickDisconnect(
                      cardDetailsModal?.data,
                      cardDetailsModal?.type
                    );
                  }}
                >
                  Disconnect <img src={closepolygreyIcon} />
                </button>
              </Grid>
            </Grid>
            {/* End paypal info and edit */}
          </DialogContent>
        </Dialog>

        <SuccessDialog
          handleOpenModal={openSucessDialog.open}
          handleCloseModal={handelSuccessDialogClose}
          title={openSucessDialog.title}
          direction="down"
        />

        <PermitionDialoug
          handleOpenModal={alertmodal.open}
          handelOnConfirm={handelOnConfirmDisconnect}
          handleCloseModal={handleCloseAlertModal}
          title={alertmodal.title}
        />
      </Seo>
    </AuthGuard>
  );
}

Component.displayName = "InstructorEditProfile";
