import PropTypes from "prop-types";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import moment from "moment";

CreateDeliveryDialog.propTypes = {
  open: PropTypes.bool,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
  order: PropTypes.object,
};

export default function CreateDeliveryDialog({
  open,
  onConfirm,
  order = {},
  onCancel,
}) {
  const [deliveryDate, setDeliveryDate] = useState(null);
  const [rollWeightUtilize, setRollWeightUtilize] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleDeliveryDateChange = (newDate) => {
    setDeliveryDate(newDate);
  };

  const handleRollWeightUtilize = (e) => {
    setRollWeightUtilize(e.target.value);
  };

  const handleQuantity = (e) => {
    setQuantity(e.target.value);
  };

  const handleConfirm = () => {
    onConfirm({
      deliveryDate: moment.utc(deliveryDate).format(),
      // price,
      // rollWeight: Number(rollWeightUtilize),
      quantity
    });
  };

  return (
    <div>
      <Dialog
        open={open}
        maxWidth={"sm"}
        fullWidth={true}
        onClose={onCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Create Delivery
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
          <Stack gap={2} sx={{ my: 3 }}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DesktopDatePicker
                label="Delivery Date"
                inputFormat="YYYY/MM/DD"
                value={deliveryDate}
                onChange={handleDeliveryDateChange}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            {/* <TextField
              fullWidth
              name="rollWeightUtilize"
              type={"number"}
              label="Roll Weight Utilize (Tons)"
              value={rollWeightUtilize}
              onChange={handleRollWeightUtilize}
              helperText={`Remaining Roll Weight: ${order.remainingRollWeight}`}
            /> */}
            <TextField
              fullWidth
              name="quanty"
              type={"number"}
              label="Quantity"
              value={quantity}
              onChange={handleQuantity}
              helperText={`Remaining Quantity: ${order.remainingQuantity}`}
            />
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleConfirm}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
