import { Container, Typography } from "@mui/material";
// @mui
import { styled } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { createOrderRequest } from "src/app/features/orders/ordersAPI";
import NewOrderFormTumeric from "src/sections/@dashboard/new-order/NewOrderFormTumeric";
import { ApplicationTitle } from "src/common";

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
      <ApplicationTitle title={"New Order Request"} />

      <Typography variant="h4" gutterBottom>
        New Order Request
      </Typography>
      <StyledRoot>
        <Container maxWidth="md">
          <StyledContent>
            {/* <NewOrderForm onSubmit={handleSubmitForm} /> */}
            <NewOrderFormTumeric onSubmit={handleSubmitForm} />
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
