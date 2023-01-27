import PropTypes from "prop-types";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import NewOrderForm from "../new-order/NewOrderForm";
import NewOrderFormTumeric from "../new-order/NewOrderFormTumeric";

EditOrderDialog.propTypes = {
  open: PropTypes.bool,
  orderData: PropTypes.any,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
};

export default function EditOrderDialog({
  open,
  orderData,
  onConfirm,
  onCancel,
}) {
  return (
    <div>
      <Dialog
        open={open}
        maxWidth={"md"}
        fullWidth={true}
        onClose={onCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Update Order
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
          {/* <NewOrderForm
            buttonLabel="Update"
            orderData={orderData}
            onSubmit={onConfirm}
          /> */}
          <NewOrderFormTumeric
            buttonLabel="Update"
            orderData={orderData}
            onSubmit={onConfirm}
          /> 
        </DialogContent>
      </Dialog>
    </div>
  );
}
