import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Stack,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";

const CUP_SIZE_ITEMS = [
  { label: 45, value: 45 },
  { label: 55, value: 55 },
  { label: 65, value: 65 },
  { label: 75, value: 75 },
  { label: 85, value: 85 },
  { label: 90, value: 90 },
  { label: 200, value: 100 },
];

const PAPER_SUPPLIER_ITEMS = [
  { label: "ITC", value: "ITC" },
  { label: "TNPL", value: "TNPL" },
  { label: "WESTCOAST", value: "WESTCOAST" },
  { label: "APPM", value: "APPM" },
];

NewOrderForm.propTypes = {
  onSubmit: PropTypes.func,
  buttonLabel: PropTypes.string,
  orderData: PropTypes.any,
};

export default function NewOrderForm({
  buttonLabel = "Create",
  onSubmit,
  orderData,
}) {
  const [orderDate, setOrderDate] = useState(moment());
  const [customerName, setCustomerName] = useState();
  const [rollWeight, setRollWeight] = useState();
  const [rollSize, setRollSize] = useState();
  const [cupSize, setCupSize] = useState();
  const [paperSupplier, setPaperSupplier] = useState();

  useEffect(() => {
    if (orderData) {
      const {
        orderDate,
        customerName,
        rollWeight,
        rollSize,
        cupSize,
        paperSupplier,
      } = orderData;
      setOrderDate(moment(orderDate).format());
      setCustomerName(customerName);
      setRollWeight(rollWeight);
      setRollSize(rollSize);
      setCupSize(cupSize);
      setPaperSupplier(paperSupplier);
    }
  }, [orderData]);

  const handleOrderDateChange = (newDate) => {
    setOrderDate(newDate);
  };

  const handleCustomerNameChange = (e) => {
    setCustomerName(e.target.value);
  };

  const handleRollWeightChange = (e) => {
    setRollWeight(e.target.value);
  };

  const handleRollSizeChange = (e) => {
    setRollSize(e.target.value);
  };

  const handleCupSizeChange = (event) => {
    setCupSize(event.target.value);
  };

  const handlePaperSupplierChange = (event) => {
    setPaperSupplier(event.target.value);
  };

  const handleSubmitClick = () => {
    const payload = {
      orderDate: moment.utc(orderDate).format("YYYY-MM-DD"),
      customerName,
      rollWeight,
      rollSize,
      cupSize,
      paperSupplier,
    };
    onSubmit(payload);
  };

  return (
    <>
      <Stack spacing={3} style={{ marginTop: 10 }}>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <DesktopDatePicker
            label="Order Date"
            inputFormat="YYYY/MM/DD"
            value={orderDate}
            onChange={handleOrderDateChange}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <TextField
          name="customerName"
          label="Customer Name"
          value={customerName}
          onChange={handleCustomerNameChange}
        />
        <TextField
          name="rollWeight"
          type={"number"}
          label="Roll Weight"
          value={rollWeight}
          onChange={handleRollWeightChange}
        />
        <TextField
          name="rollSize"
          label="Roll Size"
          type={"number"}
          value={rollSize}
          onChange={handleRollSizeChange}
        />
        <FormControl fullWidth>
          <InputLabel id="cup-size">Cup Size</InputLabel>
          <Select
            labelId="cup-size"
            id="cup-size"
            value={cupSize}
            label="Cup Size"
            onChange={handleCupSizeChange}
          >
            {CUP_SIZE_ITEMS.map((ele) => (
              <MenuItem value={ele.value}>{ele.label}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="paper-supplier">Paper Supplier</InputLabel>
          <Select
            labelId="paper-supplier"
            id="paper-supplier"
            value={paperSupplier}
            label="Paper Supplier"
            onChange={handlePaperSupplierChange}
          >
            {PAPER_SUPPLIER_ITEMS.map((ele) => (
              <MenuItem value={ele.value}>{ele.label}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        sx={{ mt: 2 }}
        onClick={handleSubmitClick}
      >
        {buttonLabel}
      </LoadingButton>
    </>
  );
}
