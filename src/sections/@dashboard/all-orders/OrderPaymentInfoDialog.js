import PropTypes from "prop-types";
import {
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import Scrollbar from "src/components/scrollbar";
import OrderListHead from "./OrderListHead";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import Iconify from "src/components/iconify";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import {
  addPayment,
  getAllPaymentsDetails,
  getOrder,
} from "src/app/features/orders/ordersAPI";
import Label from "src/components/label";
import { numberFormat } from "src/utils/constants";

OrderPaymentInfoDialog.propTypes = {
  open: PropTypes.bool,
  onCancel: PropTypes.func,
};

const TABLE_HEAD = [
  { id: "orderId", label: "Order Id ", alignRight: false },
  { id: "paymentDate", label: "Payment Date", alignRight: false },
  { id: "Amount", label: "Amount", alignRight: false },
  { id: "status", label: "Status", alignRight: false },
  //   { id: "" },
];

export default function OrderPaymentInfoDialog({ open, order, onCancel }) {
  const [paymentDate, setPaymentDate] = useState(null);
  const [amount, setAmount] = useState();
  const [notes, setNotes] = useState();
  const [showAddPaymentView, setShowAddPaymentView] = useState(false);

  const { allPaymentDetails = [], orderDetails = {} } = useSelector(
    (state) => state.order
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPaymentsDetails(order.orderId));
    dispatch(getOrder(order.orderId));
  }, []);

  const handlePaymentDateChange = (newDate) => {
    setPaymentDate(newDate);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleNotesChange = (e) => {
    setNotes(e.target.value);
  };

  const onSubmitPayment = () => {
    dispatch(
      addPayment({
        orderId: order.orderId,
        paymentDate: moment.utc(paymentDate).format(),
        amount,
        notes,
      })
    );
    onCancelPayment();
  };

  const onCancelPayment = () => {
    setPaymentDate(null);
    setAmount("");
    setNotes("");
    setShowAddPaymentView(false);
  };

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
                // flexWrap: "wrap",
                gap: 2,
                gridTemplateColumns: "repeat(3,1fr)",
                "& > :not(style)": {
                  p: 3,
                  boxShadow:
                    "rgb(145 158 171 / 20%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px",
                  borderRadius: 2,
                  border: "1px solid",
                  borderColor: "#ccc",
                },
              }}
            >
              <Paper>
                <Typography variant="subtitle2">Total Amount</Typography>
                <Typography variant="h4">
                  ₹ {numberFormat(orderDetails.totalAmount || 0)}
                </Typography>
              </Paper>
              <Paper>
                <Typography variant="subtitle2"> Paid Amount</Typography>
                <Typography variant="h4" color={"#00AB55"}>
                  ₹ {numberFormat(orderDetails.amountPaid || 0)}
                </Typography>
              </Paper>
              <Paper>
                <Typography variant="subtitle2">Due Amount</Typography>
                <Typography variant="h4" color={"#e74c3c"}>
                  ₹ {numberFormat(orderDetails.paymentPending || 0)}
                </Typography>
              </Paper>
            </Box>
          </Stack>
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

                <TextField
                  fullWidth
                  label="Notes"
                  multiline
                  rows={4}
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
              {/* <Scrollbar> */}
              <TableContainer sx={{ minWidth: 800 }}>
                <Table size="small">
                  <OrderListHead headLabel={TABLE_HEAD} />
                  <TableBody>
                    {allPaymentDetails.map((row) => {
                      const { id, orderId, paymentDate, amount, status } = row;
                      const stillUtc = moment.utc(paymentDate).toDate();

                      return (
                        <TableRow hover key={id}>
                          <TableCell align="left">{orderId}</TableCell>
                          <TableCell align="left">
                            {moment(stillUtc).local().format("YYYY-MM-DD")}
                          </TableCell>
                          <TableCell align="left">
                            {numberFormat(amount)}
                          </TableCell>
                          <TableCell align="left">
                            <Label color={"success"}>{"Paid"}</Label>
                          </TableCell>

                          {/* <TableCell align="right">
                          <IconButton
                            size="large"
                            color="inherit"
                            // onClick={(e) => handleOpenMenu(e, row)}
                          >
                            <Iconify icon={"eva:more-vertical-fill"} />
                          </IconButton>
                        </TableCell> */}
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
              {/* </Scrollbar> */}
            </Card>
          </Stack>
        </DialogContent>
      </Dialog>
    </div>
  );
}
