import PropTypes from "prop-types";
// @mui
import { styled, alpha } from "@mui/material/styles";
import SyncIcon from "@mui/icons-material/Sync";
import { Toolbar, OutlinedInput, InputAdornment } from "@mui/material";
import Iconify from "src/components/iconify";
// component

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

CustomSearchToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onSearchChange: PropTypes.func,
  onRefresh: PropTypes.func,
};

export default function CustomSearchToolbar({
  numSelected,
  searchValue,
  onSearchChange,
  onRefresh,
}) {
  return (
    <StyledRoot>
      <SyncIcon
        sx={{ cursor: "pointer", height: 32, width: 32 }}
        onClick={onRefresh}
      />
      <StyledSearch
        value={searchValue}
        onChange={onSearchChange}
        placeholder="Search..."
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
