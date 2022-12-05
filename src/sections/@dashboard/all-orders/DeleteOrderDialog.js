import PropTypes from 'prop-types';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";


DeleteOrderDialog.propTypes = {
  open: PropTypes.bool,
  handleConfirm: PropTypes.func,
  handleCancel: PropTypes.func
}

export default function DeleteOrderDialog({ open, handleConfirm, handleCancel }) {
  
  return (
    <div>
      <Dialog
        open={open}
        maxWidth={"xs"}
        fullWidth={true}
        onClose={handleCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure want to delete?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleConfirm}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
