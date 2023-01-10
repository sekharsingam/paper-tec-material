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
};

export default function CreateDeliveryDialog({ open, onConfirm, onCancel }) {
  const [deliveryDate, setDeliveryDate] = useState(null);
  const [price, setPrice] = useState("");
  const [rollWeightUtilize, setRollWeightUtilize] = useState("");

  const handleDeliveryDateChange = (newDate) => {
    setDeliveryDate(newDate);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleRollWeightUtilize = (e) => {
    setRollWeightUtilize(e.target.value);
  };

  const handleConfirm = () => {
    onConfirm({
      deliveryDate: moment.utc(deliveryDate).format(),
      // price,
      rollWeight: Number(rollWeightUtilize),
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
              name="price"
              type={"number"}
              label="Price"
              value={price}
              onChange={handlePriceChange}
            /> */}
            <TextField
              fullWidth
              name="rollWeightUtilize"
              type={"number"}
              label="Roll Weight Utilize (Tons)"
              value={rollWeightUtilize}
              onChange={handleRollWeightUtilize}
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
