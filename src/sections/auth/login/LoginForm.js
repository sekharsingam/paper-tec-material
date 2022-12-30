import { useState } from "react";
import { useNavigate } from "react-router-dom";
// @mui
import {
  Link,
  Stack,
  IconButton,
  InputAdornment,
  TextField,
  Checkbox,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
// components
import Iconify from "../../../components/iconify";
import { useSelector } from "react-redux";

// ----------------------------------------------------------------------

const testEmail = "admin@suchiit.com";
const testPassword = "admin";

export default function LoginForm({ onLogin }) {
  const [email, setEmail] = useState(testEmail);
  const [password, setPassword] = useState(testPassword);

  const { loginCalling, loginError } = useSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);

  const handleClick = () => {
    if (email !== testEmail || password !== testPassword) {
      return;
    }
    onLogin({ username: email, password });
  };

  return (
    <>
      <Stack spacing={3}>
        <TextField
          name="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  <Iconify
                    icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      {/* <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ my: 2 }}
      >
        <Checkbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack> */}

      {loginError && (
        <Stack sx={{ mt: 2 }}>
          <Typography
            variant="body2"
            sx={{ mb: 2, color: "red" }}
          >{loginError || `Incorrect Email or Password`}</Typography>
        </Stack>
      )}

      <LoadingButton
        sx={{ my: 2 }}
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={loginCalling}
        onClick={handleClick}
      >
        Login
      </LoadingButton>
    </>
  );
}
