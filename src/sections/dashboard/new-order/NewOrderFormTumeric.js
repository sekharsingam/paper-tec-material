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
import { useDispatch } from "react-redux";
import { getCustomers } from "src/app/features/customer/customerAPI";
import { getMasterData } from "src/app/features/masterData/masterDataAPI";
import {
  HONEY_PACKAGE_SIZES,
  PACKAGE_SIZES,
  TUMERIC_PRODUCT_TYPE,
} from "src/utils/constants";

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
  const [quantity, setQuantity] = useState("");
  const [productType, setOrderType] = useState("");
  const [packingSize, setPackingSize] = useState("");

  //   const { cupSize: CUP_SIZE_ITEMS, paperSupplier: PAPER_SUPPLIER_ITEMS } =
  //     useSelector((state) => state.masterData);

  const loggedUserDetails = JSON.parse(localStorage.user);

  const dispatch = useDispatch();

  useEffect(() => {
    if (orderData) {
      const { orderDate, quantity, productType, packingSize } =
        orderData;
      setOrderDate(moment(orderDate).format());
      setQuantity(quantity);
      setOrderType(productType);
      setPackingSize(packingSize);
    }
  }, [orderData]);

  useEffect(() => {
    // dispatch(getCustomers());
    // dispatch(getMasterData());
  }, []);

  const handleOrderDateChange = (newDate) => {
    setOrderDate(newDate);
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleProductTypeChange = (event) => {
    setOrderType(event.target.value);
    setPackingSize(null);
  };

  const handlePackingSizeChange = (event) => {
    setPackingSize(event.target.value);
  };

  const handleSubmitClick = () => {
    const payload = {
      orderDate: moment.utc(orderDate).format(),
      customerId: loggedUserDetails.customerId,
      productType,
      packingSize,
      quantity: Number(quantity),
    };
    onSubmit(payload);
  };

  console.log(packingSize);

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
          <InputLabel id="product-type">Product Type</InputLabel>
          <Select
            labelId="product-type"
            id="product-type"
            value={productType}
            label="Product Type"
            onChange={handleProductTypeChange}
          >
            {TUMERIC_PRODUCT_TYPE.map((ele) => (
              <MenuItem key={ele} value={ele}>
                {ele}
              </MenuItem>
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
            {(productType === "Honey"
              ? HONEY_PACKAGE_SIZES
              : PACKAGE_SIZES
            ).map((ele) => (
              <MenuItem key={ele.value} value={ele.value}>
                {ele.label}
              </MenuItem>
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
