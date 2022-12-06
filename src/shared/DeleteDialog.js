import PropTypes from "prop-types";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

DeleteDialog.propTypes = {
  open: PropTypes.bool,
  title: PropTypes.string,
  contentText: PropTypes.string,
  handleConfirm: PropTypes.func,
  handleCancel: PropTypes.func,
};

export default function DeleteDialog({
  open,
  title,
  contentText,
  handleConfirm,
  handleCancel,
}) {
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
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {contentText}
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
