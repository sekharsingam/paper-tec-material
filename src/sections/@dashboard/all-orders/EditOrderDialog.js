import PropTypes from "prop-types";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import NewOrderForm from "../new-order/NewOrderForm";

EditOrderDialog.propTypes = {
  open: PropTypes.bool,
  handleConfirm: PropTypes.func,
  handleCancel: PropTypes.func,
};

export default function EditOrderDialog({ open, handleConfirm, handleCancel }) {
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
          Update Order
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
          <NewOrderForm buttonLabel="Update" />
        </DialogContent>
      </Dialog>
    </div>
  );
}
