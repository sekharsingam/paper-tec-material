import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  MenuItem,
  Stack,
  Typography
} from "@mui/material";
// @mui
import { alpha } from "@mui/material/styles";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "src/app/features/auth/authSlice";
import { ActionPopover } from "src/common";
// mocks_
import account from "../../../_mock/account";

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: "Profile",
    icon: "eva:person-fill",
  },
  {
    label: "Settings",
    icon: "eva:settings-2-fill",
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const [open, setOpen] = useState(null);
  const loggedUserDetails = JSON.parse(localStorage.user || null) || {};
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const onLogOut = () => {
    localStorage.clear();
    dispatch(logout());
    navigate("/login");
  };

  return (
    <>
      <Stack direction="row" justifyContent={"center"}>
        <IconButton
          sx={{
            p: 0,
            // ...(open && {
            //   "&:before": {
            //     zIndex: 1,
            //     content: "''",
            //     width: "100%",
            //     height: "100%",
            //     borderRadius: "50%",
            //     position: "absolute",
            //     bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            //   },
            // }),
          }}
        >
          <Avatar src={account.photoURL} />
        </IconButton>
      </Stack>
      <Stack
        direction="row"
        justifyContent={"center"}
        marginTop={2}
        sx={{ cursor: "pointer" }}
        onClick={handleOpen}
      >
        <Typography variant="subtitle1" noWrap style={{ color: "#000" }}>
          {`${loggedUserDetails.firstName} ${loggedUserDetails.lastName}`}
        </Typography>
        <ChevronRightOutlinedIcon />
      </Stack>
      <ActionPopover open={open} onClose={handleClose}>
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {`${loggedUserDetails.firstName} ${loggedUserDetails.lastName}`}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            {loggedUserDetails.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: "dashed" }} />

        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <MenuItem key={option.label} onClick={handleClose}>
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: "dashed" }} />

        <MenuItem onClick={onLogOut} sx={{ m: 1 }}>
          Logout
        </MenuItem>
      </ActionPopover>
    </>
  );
}
