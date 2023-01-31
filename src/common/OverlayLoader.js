import { Backdrop, CircularProgress } from "@mui/material";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

OverlayLoader.propTypes = {
  open: PropTypes.string,
};

export default function OverlayLoader() {
  const { show } = useSelector((state) => state.loader);

  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={show}
      //   onClick={handleClose}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
