import { Helmet } from "react-helmet-async";
// @mui
import { styled } from "@mui/material/styles";
import {
  Link,
  Container,
  Typography,
} from "@mui/material";

import useResponsive from "../hooks/useResponsive";

import { RegistrationForm } from "src/sections/auth/register";
import { useNavigate } from "react-router-dom";

// ----------------------------------------------------------------------

const StyledRoot = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const StyledSection = styled("div")(({ theme }) => ({
  width: "100%",
  maxWidth: 480,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled("div")(({ theme }) => ({
  maxWidth: 780,
  margin: "auto",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function RegistrationPage() {
  const mdUp = useResponsive("up", "md");

  const navigate = useNavigate();

  const onNavigateToRegisterPage = () => {
    navigate("/login");
  };

  const onRegister = (data) => {
    console.log(data);
  };

  return (
    <>
      <Helmet>
        <title> Registration | Paper Tech </title>
      </Helmet>

      <StyledRoot>
        {mdUp && (
          <StyledSection>
            <img src="/assets/images/suchi_it_full_logo.png" alt="login" />
          </StyledSection>
        )}

        <Container maxWidth="md">
          <StyledContent>
            <Typography variant="h4" gutterBottom>
              Sign up to Paper Tech
            </Typography>
            <Typography variant="body2">
              Already have an account? {""}
              <Link
                variant="subtitle2"
                sx={{ cursor: "pointer" }}
                onClick={onNavigateToRegisterPage}
              >
                Login
              </Link>
            </Typography>

            <RegistrationForm onRegister={onRegister} />
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
