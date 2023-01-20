import { LoadingButton } from "@mui/lab";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCustomers } from "src/app/features/customer/customerAPI";
import { getMasterData } from "src/app/features/masterData/masterDataAPI";
import { PACKAGE_SIZES, TUMERIC_ORDER_TYPE } from "src/utils/constants";

NewOrderFormTumeric.propTypes = {
  onSubmit: PropTypes.func,
  buttonLabel: PropTypes.string,
  orderData: PropTypes.any,
};

export default function NewOrderFormTumeric({
  buttonLabel = "Create",
  onSubmit,
  orderData,
}) {
  const [orderDate, setOrderDate] = useState(null);
  const [quantity, setQuantity] = useState();
  const [orderType, setOrderType] = useState();
  const [packingSize, setPackingSize] = useState();

  //   const { cupSize: CUP_SIZE_ITEMS, paperSupplier: PAPER_SUPPLIER_ITEMS } =
  //     useSelector((state) => state.masterData);

  const loggedUserDetails = JSON.parse(localStorage.user);

  const dispatch = useDispatch();

  useEffect(() => {
    // if (orderData) {
    //   const { orderDate, rollWeight, rollSize, cupSize, paperSupplier } =
    //     orderData;
    //   setOrderDate(moment(orderDate).format());
    //   setRollWeight(rollWeight);
    //   setRollSize(rollSize);
    //   setCupSize(cupSize);
    //   setPaperSupplier(paperSupplier);
    // }
  }, [orderData]);

  useEffect(() => {
    dispatch(getCustomers());
    dispatch(getMasterData());
  }, []);

  const handleOrderDateChange = (newDate) => {
    setOrderDate(newDate);
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleOrderTypeChange = (event) => {
    setOrderType(event.target.value);
  };

  const handlePackingSizeChange = (event) => {
    setPackingSize(event.target.value);
  };

  const handleSubmitClick = () => {
    const payload = {
      orderDate: moment.utc(orderDate).format(),
      customerId: loggedUserDetails.customerId,
      orderType,
      packingSize,
      quantity: Number(quantity),
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
        <FormControl fullWidth>
          <InputLabel id="order-type">Order Type</InputLabel>
          <Select
            labelId="order-type"
            id="order-type"
            value={orderType}
            label="Order Type"
            onChange={handleOrderTypeChange}
          >
            {TUMERIC_ORDER_TYPE.map((ele) => (
              <MenuItem value={ele}>{ele}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="package-size">Packing Size</InputLabel>
          <Select
            labelId="package-size"
            id="package-size"
            value={packingSize}
            label="Packing Size"
            onChange={handlePackingSizeChange}
          >
            {PACKAGE_SIZES.map((ele) => (
              <MenuItem value={ele}>{ele}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          name="quantity"
          type={"number"}
          label="Quantity"
          value={quantity}
          onChange={handleQuantityChange}
        />
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
