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
import { useDispatch, useSelector } from "react-redux";
import { getCustomers } from "src/app/features/customer/customerAPI";
import { getMasterData } from "src/app/features/masterData/masterDataAPI";

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
  const [orderDate, setOrderDate] = useState(null);
  const [rollWeight, setRollWeight] = useState();
  const [rollSize, setRollSize] = useState();
  const [cupSize, setCupSize] = useState();
  const [paperSupplier, setPaperSupplier] = useState();

  const { cupSize: CUP_SIZE_ITEMS, paperSupplier: PAPER_SUPPLIER_ITEMS } =
    useSelector((state) => state.masterData);

  const loggedUserDetails = JSON.parse(localStorage.user);

  const dispatch = useDispatch();

  useEffect(() => {
    if (orderData) {
      const {
        orderDate,
        rollWeight,
        rollSize,
        cupSize,
        paperSupplier,
      } = orderData;
      setOrderDate(moment(orderDate).format());
      setRollWeight(rollWeight);
      setRollSize(rollSize);
      setCupSize(cupSize);
      setPaperSupplier(paperSupplier);
    }
  }, [orderData]);

  useEffect(() => {
    dispatch(getCustomers());
    dispatch(getMasterData());
  }, []);

  const handleOrderDateChange = (newDate) => {
    setOrderDate(newDate);
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
      orderDate: moment.utc(orderDate).format(),
      customerId: loggedUserDetails.customerId,
      rollWeight: Number(rollWeight),
      rollSize: Number(rollSize),
      cupSize: Number(cupSize),
      paperSupplier,
    };
    onSubmit(payload);
  };

  return (
    <>
      <Stack
        direction="row"
        display={"grid"}
        gridTemplateColumns={"repeat(2, 1fr)"}
        gap={3}
        sx={{ my: 3 }}
      >
        {/* <Stack spacing={3} style={{ marginTop: 10 }}> */}
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
          name="rollWeight"
          type={"number"}
          label="Roll Weight (Kgs)"
          value={rollWeight}
          onChange={handleRollWeightChange}
        />
        <TextField
          name="rollSize"
          label="Roll Size (cm)"
          type={"number"}
          value={rollSize}
          onChange={handleRollSizeChange}
        />
        <FormControl fullWidth>
          <InputLabel id="cup-size">Cup Size (ml)</InputLabel>
          <Select
            labelId="cup-size"
            id="cup-size"
            value={cupSize}
            label="Cup Size (ml)"
            onChange={handleCupSizeChange}
          >
            {CUP_SIZE_ITEMS.map((ele) => (
              <MenuItem value={ele}>{ele}</MenuItem>
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
              <MenuItem value={ele}>{ele}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>

      <LoadingButton
        // fullWidth
        // maxWidth="md"
        size="large"
        type="submit"
        variant="contained"
        // sx={{ mt: 2 }}
        onClick={handleSubmitClick}
      >
        {`${buttonLabel} Request`}
      </LoadingButton>
    </>
  );
}
