import PropTypes from "prop-types";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

ChangeOrderStatusDialog.propTypes = {
  open: PropTypes.bool,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
  statuses: PropTypes.array,
};

export default function ChangeOrderStatusDialog({
  open,
  onConfirm,
  statuses,
  onCancel,
}) {
  const [status, setStatus] = useState(null);

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleConfirm = () => {
    onConfirm({ status });
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
          Change Status
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
          <Stack sx={{ my: 3 }}>
            <FormControl fullWidth>
              <InputLabel id="status">Status</InputLabel>
              <Select
                labelId="status"
                id="status"
                value={status}
                label="Status"
                onChange={handleStatusChange}
              >
                {statuses.map((ele) => (
                  <MenuItem value={ele}>{ele}</MenuItem>
                ))}
              </Select>
            </FormControl>
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
