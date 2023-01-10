import { Helmet } from "react-helmet-async";
// @mui
import { styled } from "@mui/material/styles";
import { Container, Typography } from "@mui/material";
import NewOrderForm from "src/sections/@dashboard/new-order/NewOrderForm";
import { useDispatch } from "react-redux";
import { createOrderRequest } from "src/app/features/orders/ordersAPI";

// ----------------------------------------------------------------------

const StyledRoot = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const StyledContent = styled("div")(({ theme }) => ({
  // maxWidth: 680,
  margin: "auto",
  //   minHeight: '100vh',
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  padding: theme.spacing(3, 0),
}));

// ----------------------------------------------------------------------

export default function NewOrderPage() {
  const dispatch = useDispatch();

  const handleSubmitForm = (values) => {
    dispatch(createOrderRequest(values));
  };

  return (
    <>
      <Helmet>
        <title> New Order Request | Paper Tech</title>
      </Helmet>

      <Typography variant="h4" gutterBottom>
        New Order Request
      </Typography>
      <StyledRoot>
        <Container maxWidth="md">
          <StyledContent>
            <NewOrderForm onSubmit={handleSubmitForm} />
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
