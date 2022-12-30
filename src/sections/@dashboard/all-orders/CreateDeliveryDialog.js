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

CreateDeliveryDialog.propTypes = {
  open: PropTypes.bool,
  handleConfirm: PropTypes.func,
  handleCancel: PropTypes.func,
};

export default function CreateDeliveryDialog({
  open,
  handleConfirm,
  handleCancel,
}) {
  const [deliveryDate, setDeliveryDate] = useState(null);

  const handleDeliveryDateChange = (newDate) => {
    setDeliveryDate(newDate);
  };

  return (
    <div>
      <Dialog
        open={open}
        maxWidth={"sm"}
        fullWidth={true}
        onClose={handleCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Create Delivery
          <IconButton
            aria-label="close"
            onClick={handleCancel}
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
            // direction="row"
            // display={"grid"}
            // gridTemplateColumns={"repeat(2, 1fr)"}
            // gap={3}
            sx={{ my: 3 }}
          >
            {/* <Stack spacing={3} style={{ marginTop: 10 }}> */}
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DesktopDatePicker
                label="Delivery Date"
                inputFormat="YYYY/MM/DD"
                value={deliveryDate}
                onChange={handleDeliveryDateChange}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" onClick={handleCancel}>
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
