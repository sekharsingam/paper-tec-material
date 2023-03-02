import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Card,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack, TextField
} from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addPayment,
  getAllPaymentsDetails,
  getOrder
} from "src/app/features/orders/ordersAPI";
import { TableList } from "src/common";
import Iconify from "src/components/iconify";
import Label from "src/components/label";
import { numberFormat, ROLE_ADMIN } from "src/utils/constants";
import { AppWidgetSummary } from "../app";

OrderPaymentInfoDialog.propTypes = {
  open: PropTypes.bool,
  onCancel: PropTypes.func,
};

const PAYMENT_MODES = ["CASH", "CARD", "CHEQUE", "BANK TRANSFER", "UPI"];

export default function OrderPaymentInfoDialog({ open, order, onCancel }) {
  const [paymentDate, setPaymentDate] = useState(null);
  const [amount, setAmount] = useState();
  const [notes, setNotes] = useState();
  const [showAddPaymentView, setShowAddPaymentView] = useState(false);
  const [paymentMode, setPaymentMode] = useState(null);

  const {
    allPaymentDetails = [],
    orderDetails = {},
    paymentProcessingSuccess,
  } = useSelector((state) => state.order);

  const { loggedInUser } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPaymentsDetails(order.orderId));
    dispatch(getOrder(order.orderId));
  }, []);

  useEffect(() => {
    if (paymentProcessingSuccess) {
      clearForm();
    }
  }, [paymentProcessingSuccess]);

  const handlePaymentDateChange = (newDate) => {
    setPaymentDate(newDate);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleNotesChange = (e) => {
    setNotes(e.target.value);
  };

  const handlePaymentModeChange = (e) => {
    setPaymentMode(e.target.value);
  };

  const onSubmitPayment = () => {
    dispatch(
      addPayment({
        orderId: order.orderId,
        paymentDate: moment.utc(paymentDate).format(),
        amount,
        notes,
        mode: paymentMode,
      })
    );
    onCancelPayment();
  };

  const onCancelPayment = () => {
    clearForm();
  };

  const clearForm = () => {
    setPaymentDate(null);
    setAmount("");
    setPaymentMode("");
    setNotes("");
    setShowAddPaymentView(false);
  };

  const PAYMENT_TABLE_HEAD = [
    { id: "orderId", label: "Order Id " },
    {
      id: "paymentDate",
      label: "Payment Date",
      dataFormat: (cell, row) => {
        const stillUtc = moment.utc(cell).toDate();
        return <span>{moment(stillUtc).local().format("YYYY-MM-DD")}</span>;
      },
    },
    {
      id: "amount",
      label: "Amount",
      dataFormat: (cell, row) => numberFormat(cell),
    },
  ];

  if (loggedInUser.role === ROLE_ADMIN) {
    PAYMENT_TABLE_HEAD.push({ id: "mode", label: "Mode" });
  }
  PAYMENT_TABLE_HEAD.push({
    id: "status",
    label: "Status",
    dataFormat: (cell, row) => <Label color={"success"}>{"Paid"}</Label>,
  });

  return (
    <div>
      <Dialog
        open={open}
        maxWidth={"md"}
        fullWidth={true}
        onClose={onCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Payment Information
          <IconButton
            aria-label="close"
            onClick={onCancel}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Stack
            direction="row"
            alignItems="center"
            // justifyContent="space-between"
            mb={2}
          >
            <Box
              sx={{
                display: "grid",
                gap: 2,
                gridTemplateColumns: "repeat(3,1fr)",
                "& > :not(style)": {
                  p: 3,
                  boxShadow:
                    "rgb(145 158 171 / 20%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px",
                  borderRadius: 2,
                },
              }}
            >
              <AppWidgetSummary
                title="Total Amount"
                total={`₹ ${numberFormat(orderDetails.totalAmount || 0)}`}
              />

              <AppWidgetSummary
                title="Paid Amount"
                total={`₹ ${numberFormat(orderDetails.amountPaid || 0)}`}
                color={"success"}
              />

              <AppWidgetSummary
                title="Due Amount"
                total={`₹ ${numberFormat(orderDetails.paymentPending || 0)}`}
                color={"error"}
              />
            </Box>
          </Stack>
          {loggedInUser.role === ROLE_ADMIN && (
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="end"
              mb={2}
            >
              <Button
                onClick={() => setShowAddPaymentView((prevValue) => !prevValue)}
                variant="contained"
                startIcon={
                  <Iconify
                    icon={
                      !showAddPaymentView
                        ? "akar-icons:circle-plus-fill"
                        : "akar-icons:circle-minus-fill"
                    }
                  />
                }
              >
                Add Payment
              </Button>
            </Stack>
          )}
          {showAddPaymentView && (
            <Stack sx={{ my: 3, display: "flex", justifyContent: "center" }}>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 2,
                  width: "50%",
                  justifyContent: "center",
                  marginLeft: "25%",
                }}
              >
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <DesktopDatePicker
                    label="Payment Date"
                    inputFormat="YYYY/MM/DD"
                    value={paymentDate}
                    onChange={handlePaymentDateChange}
                    renderInput={(params) => (
                      <TextField fullWidth {...params} />
                    )}
                  />
                </LocalizationProvider>

                <TextField
                  fullWidth
                  name="amount"
                  type={"number"}
                  label="Amount"
                  value={amount}
                  onChange={handleAmountChange}
                />

                <FormControl fullWidth>
                  <InputLabel id="paper-supplier">Payment Mode</InputLabel>
                  <Select
                    labelId="paper-supplier"
                    id="paper-supplier"
                    value={paymentMode}
                    label="Paper Supplier"
                    onChange={handlePaymentModeChange}
                  >
                    {PAYMENT_MODES.map((ele) => (
                      <MenuItem key={ele} value={ele}>
                        {ele}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <TextField
                  fullWidth
                  label="Notes"
                  multiline
                  rows={3}
                  value={notes}
                  onChange={handleNotesChange}
                />
                <Button
                  variant="outlined"
                  onClick={onCancelPayment}
                  // sx={{ width: "200px" }}
                  // size="small"
                  // startIcon={<Iconify icon="eva:plus-fill" />}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  onClick={onSubmitPayment}
                  // sx={{ width: "200px" }}
                  // size="small"
                  // startIcon={<Iconify icon="eva:plus-fill" />}
                >
                  Submit
                </Button>
              </Box>
            </Stack>
          )}

          <Stack sx={{ my: 3 }}>
            <Card>
              <TableList
                size={"small"}
                data={allPaymentDetails}
                columns={PAYMENT_TABLE_HEAD}
                noDataText={"No payments"}
              />
            </Card>
          </Stack>
        </DialogContent>
      </Dialog>
    </div>
  );
}
