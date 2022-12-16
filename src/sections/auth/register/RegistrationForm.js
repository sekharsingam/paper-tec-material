import { useState } from "react";

import {
  Stack,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

import Iconify from "../../../components/iconify";

export default function RegistrationForm({ onRegister }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmShowPassword] = useState(false);
  const [lane, setLane] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [zipCode, setZipCode] = useState("");

  const [passwordMatch, setPasswordMatch] = useState(true);

  const handleOnBlur = (e) => {
    setPasswordMatch(e.target.value !== password);
  };

  const handleRegister = () => {
    if (password !== confirmPassword) {
      setPasswordMatch(false);
      return;
    }

    const payload = {
      firstName,
      lastName,
      email,
      phone,
      password,
      lane,
      street,
      city,
      state,
      country,
      zipCode,
    };

    onRegister(payload);
  };

  return (
    <>
      <Stack
        direction="row"
        display={"grid"}
        gridTemplateColumns={"repeat(2, 1fr)"}
        gap={3}
        sx={{ my: 3 }}
      >
        <TextField
          name="firstName"
          label="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <TextField
          name="lastName"
          label="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <TextField
          name="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          name="phone"
          label="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <TextField
          name="password"
          label="New Password"
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
        <TextField
          name="confirmPassword"
          label="Confirm Password"
          type={showConfirmPassword ? "text" : "password"}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          onBlur={handleOnBlur}
          error={!passwordMatch}
          helperText={
            !passwordMatch
              ? "Confirm password is not matched with new password"
              : ""
          }
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() =>
                    setShowConfirmShowPassword(!showConfirmPassword)
                  }
                  edge="end"
                >
                  <Iconify
                    icon={
                      showConfirmPassword ? "eva:eye-fill" : "eva:eye-off-fill"
                    }
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Typography
          gridColumn={"1/3"}
          variant="label"
          sx={{ fontSize: 18, fontWeight: 600 }}
          gutterBottom
        >
          Address
        </Typography>
        <TextField
          name="lane"
          label="Lane"
          value={lane}
          onChange={(e) => setLane(e.target.value)}
        />
        <TextField
          name="street"
          label="Street"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
        />
        <TextField
          name="city"
          label="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <TextField
          name="state"
          label="State"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
        <TextField
          name="Country"
          label="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        <TextField
          name="zipCode"
          label="Zip Code"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
        />
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        onClick={handleRegister}
      >
        Register
      </LoadingButton>
    </>
  );
}
