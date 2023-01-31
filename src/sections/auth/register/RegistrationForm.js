import { useEffect, useState } from "react";

import {
  Stack,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

import Iconify from "../../../components/iconify";
import {
  EMAIL_VALIDATION_REGEX,
  PASSWORD_VALIDATION_REGEX,
  PHONE_NUMBER_VALIDATION_REGEX,
} from "src/utils/constants";
import { useSelector } from "react-redux";

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

  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPhoneNum, setIsValidPhoneNum] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [passwordMatch, setPasswordMatch] = useState(true);

  const { registrationSuccess } = useSelector((state) => state.auth);

  useEffect(() => {
    if (registrationSuccess) {
      clearRegistrationForm();
    }
  }, [registrationSuccess]);

  const handleOnEmailBlur = () => {
    setIsValidEmail(new RegExp(EMAIL_VALIDATION_REGEX).test(email));
  };

  const handleOnPhoneNumBlur = () => {
    setIsValidPhoneNum(new RegExp(PHONE_NUMBER_VALIDATION_REGEX).test(phone));
  };

  const handleOnPasswordBlur = (e) => {
    setIsValidPassword(new RegExp(PASSWORD_VALIDATION_REGEX).test(password));
  };

  const handleOnResetPasswordBlur = (e) => {
    setPasswordMatch(e.target.value === password);
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
      address: { lane, street, city, state, country, zipCode },
    };

    onRegister(payload);
  };

  const clearRegistrationForm = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setPassword("");
    setConfirmPassword("");
    setLane("");
    setStreet("");
    setCity("");
    setState("");
    setCountry("");
    setZipCode("");
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
          onBlur={handleOnEmailBlur}
          error={email && !isValidEmail}
          helperText={email && !isValidEmail ? "Please enter valid email" : ""}
        />
        <TextField
          name="phone"
          label="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          onBlur={handleOnPhoneNumBlur}
          error={phone && !isValidPhoneNum}
          helperText={
            phone && !isValidPhoneNum ? "Please enter valid phone number" : ""
          }
        />
        <TextField
          name="password"
          label="New Password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={handleOnPasswordBlur}
          error={password && !isValidPassword}
          helperText={
            password && !isValidPassword
              ? "Password must be minimum of eight characters, at least one letter and one number"
              : ""
          }
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
          onBlur={handleOnResetPasswordBlur}
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
          label="Pincode"
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
