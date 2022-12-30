import PropTypes from "prop-types";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import NewOrderForm from "../new-order/NewOrderForm";

EditOrderDialog.propTypes = {
  open: PropTypes.bool,
  orderData: PropTypes.any,
  handleConfirm: PropTypes.func,
  handleCancel: PropTypes.func,
};

export default function EditOrderDialog({
  open,
  orderData,
  handleConfirm,
  handleCancel,
}) {
  return (
    <div>
      <Dialog
        open={open}
        maxWidth={"md"}
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
          <NewOrderForm
            buttonLabel="Update"
            orderData={orderData}
            onSubmit={handleConfirm}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
