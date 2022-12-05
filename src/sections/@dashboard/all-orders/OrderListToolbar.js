import PropTypes from "prop-types";
// @mui
import { styled, alpha } from "@mui/material/styles";
import SyncIcon from "@mui/icons-material/Sync";
import {
  Toolbar,
  Tooltip,
  IconButton,
  Typography,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";
// component
import Iconify from "../../../components/iconify";
import { useDispatch } from "react-redux";
import { getOrders } from "src/app/features/orders/ordersAPI";

// ----------------------------------------------------------------------

const StyledRoot = styled(Toolbar)(({ theme }) => ({
  height: 75,
  display: "flex",
  justifyContent: "end",
  padding: theme.spacing(0, 1, 0, 3),
  gap: 10,
}));

const StyledSearch = styled(OutlinedInput)(({ theme }) => ({
  width: 250,
  height: 50,
  transition: theme.transitions.create(["box-shadow", "width"], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  "&.Mui-focused": {
    width: 350,
    boxShadow: theme.customShadows.z8,
  },
  "& fieldset": {
    borderWidth: `1px !important`,
    borderColor: `${alpha(theme.palette.grey[500], 0.32)} !important`,
  },
}));

// ----------------------------------------------------------------------

OrderListToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
};

export default function OrderListToolbar({
  numSelected,
  filterName,
  onFilterName,
}) {
  const dispatch = useDispatch();
  return (
    <StyledRoot>
      <SyncIcon
        sx={{ cursor: "pointer", height: 32, width: 32 }}
        onClick={() => dispatch(getOrders())}
      />
      <StyledSearch
        value={filterName}
        onChange={onFilterName}
        placeholder="Search order..."
        startAdornment={
          <InputAdornment position="start" sx={{ height: "1em" }}>
            <Iconify
              icon="eva:search-fill"
              sx={{ color: "text.disabled", width: 20, height: 20 }}
            />
          </InputAdornment>
        }
      />
    </StyledRoot>
  );
}
