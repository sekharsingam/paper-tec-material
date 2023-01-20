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
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
};

export default function DeleteDialog({
  open,
  title,
  contentText,
  onConfirm,
  onCancel,
}) {
  return (
    <div>
      <Dialog
        open={open}
        maxWidth={"xs"}
        fullWidth={true}
        onClose={onCancel}
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
          <Button variant="outlined" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="contained" onClick={onConfirm}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
