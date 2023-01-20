import { Container, Link, Typography } from "@mui/material";
// @mui
import { styled } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registration } from "src/app/features/auth/authAPI";
import { RegistrationForm } from "src/sections/auth/register";
import { ApplicationTitle } from "src/common";
import { COMPANY_NAME } from "src/utils/constants";
import useResponsive from "../hooks/useResponsive";



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

  const dispatch = useDispatch();

  const onNavigateToRegisterPage = () => {
    navigate("/login");
  };

  const onRegister = (data) => {
    console.log(data);
    dispatch(registration(data));
  };

  return (
    <>
      <ApplicationTitle title={"Registration"} />
      
      <StyledRoot>
        {mdUp && (
          <StyledSection>
            <img src="/assets/images/suchi_it_full_logo.png" alt="login" />
          </StyledSection>
        )}

        <Container maxWidth="md">
          <StyledContent>
            <Typography variant="h4" gutterBottom>
              Sign up to {COMPANY_NAME}
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
