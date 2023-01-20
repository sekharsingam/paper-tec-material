import {
  Container, Link, Typography
} from "@mui/material";
// @mui
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { login } from "src/app/features/auth/authAPI";
import { ApplicationTitle } from "src/common";
import { COMPANY_NAME } from "src/utils/constants";
// hooks
import useResponsive from "../hooks/useResponsive";
// sections
import { LoginForm } from "../sections/auth/login";

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
  maxWidth: 480,
  margin: "auto",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function LoginPage() {
  const mdUp = useResponsive("up", "md");

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { isLoggedIn } = useSelector((state) => state.auth);

  const onLogin = (data) => {
    dispatch(login(data));
  };

  if (isLoggedIn) {
    return <Navigate to="/dashboard/all-orders" />;
  }

  const onNavigateToRegisterPage = () => {
    navigate("/register");
  };

  return (
    <>
      <ApplicationTitle title={"Login"} />

      <StyledRoot>
        {mdUp && (
          <StyledSection>
            <img src="/assets/images/suchi_it_full_logo.png" alt="login" />
          </StyledSection>
        )}

        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h4" gutterBottom>
              Sign in to {COMPANY_NAME}
            </Typography>

            <Typography variant="body2" sx={{ mb: 5 }}>
              Don’t have an account? {""}
              <Link
                variant="subtitle2"
                sx={{ cursor: "pointer" }}
                onClick={onNavigateToRegisterPage}
              >
                Get started
              </Link>
            </Typography>

            {/* <Stack direction="row" spacing={2}>
              <Button fullWidth size="large" color="inherit" variant="outlined">
                <Iconify icon="eva:google-fill" color="#DF3E30" width={22} height={22} />
              </Button>

              <Button fullWidth size="large" color="inherit" variant="outlined">
                <Iconify icon="eva:facebook-fill" color="#1877F2" width={22} height={22} />
              </Button>

              <Button fullWidth size="large" color="inherit" variant="outlined">
                <Iconify icon="eva:twitter-fill" color="#1C9CEA" width={22} height={22} />
              </Button>
            </Stack>

            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                OR
              </Typography>
            </Divider> */}

            <LoginForm onLogin={onLogin} />
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
