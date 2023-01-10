import { Helmet } from "react-helmet-async";
import { faker } from "@faker-js/faker";
import { useTheme } from "@mui/material/styles";
import { Grid, Container, Typography, Box, Paper, Stack } from "@mui/material";
import { AppNewsUpdate, AppWidgetSummary } from "../sections/@dashboard/app";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  LocalShipping,
  PeopleAltOutlined,
  ShoppingCart,
} from "@mui/icons-material";
import {
  getReportsData,
  getSummaryData,
} from "src/app/features/dashboard/dashboardAPI";
import { numberFormat } from "src/utils/constants";
import moment from "moment";

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();

  const dispatch = useDispatch();
  const {
    orderCount,
    customerCount,
    deliveryCount,
    reports = [],
  } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(getSummaryData());
    dispatch(
      getReportsData({
        requestType: "orders",
        startDate: "2023-01-01T18:30:00Z",
        endDate: "2023-01-31T18:30:00Z",
        customerId: JSON.parse(localStorage.user).customerId,
      })
    );
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <title> Dashboard | Paper Tech </title>
      </Helmet>

      <Container maxWidth="xl">
        {/* <Typography variant="h4" sx={{ mb: 2 }}>
          Hi, Welcome back
        </Typography> */}

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={2}
        >
          <Typography variant="h4" gutterBottom>
            Dashboard
          </Typography>
        </Stack>

        <Grid container spacing={3}>
          {reports.map((order) => {
            const {
              orderId,
              orderDate,
              rollWeight,
              remainingRollWeight,
              totalAmount,
              amountPaid,
              paymentPending,
            } = order;

            const stillUtc = moment.utc(orderDate).toDate();
            return (
              <Grid key={orderId} item md={4}>
                <Box
                  sx={{
                    "& > :not(style)": {
                      p: 2,
                      boxShadow:
                        "rgb(145 158 171 / 20%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px",
                      borderRadius: 1,
                      border: "1px solid",
                      // borderColor: "#919EAB",
                      borderColor: "rgba(145, 158, 171, 0.24)",
                    },
                  }}
                >
                  <Paper
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "repeat(2, 2fr)",
                    }}
                  >
                    {/* <Typography variant="subtitle1">Order Id</Typography> */}
                    <Typography variant="h4">{orderId}</Typography>
                    <Typography />
                    <Typography variant="body2">Order Date</Typography>
                    <Typography variant="body2">
                      {moment(stillUtc).local().format("YYYY-MM-DD")}
                    </Typography>
                    <Typography variant="body2">Roll Weight</Typography>
                    <Typography variant="body2">{rollWeight}</Typography>
                    <Typography variant="body2">Remaining Roll Weight</Typography>
                    <Typography variant="body2">
                      {remainingRollWeight}
                    </Typography>
                    <Typography variant="body2">Total Amount</Typography>{" "}
                    <Typography variant="body2">
                      ₹ {numberFormat(totalAmount)}
                    </Typography>
                    <Typography variant="body2">Paid Amount</Typography>
                    <Typography variant="body2" color={"#00AB55"}>
                      ₹ {numberFormat(amountPaid)}
                    </Typography>
                    <Typography variant="body2">Due Amount</Typography>
                    <Typography variant="body2" color={"#e74c3c"}>
                      ₹ {numberFormat(paymentPending)}
                    </Typography>
                  </Paper>
                </Box>
              </Grid>
            );
          })}
          {/*  <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Total Orders"
              total={orderCount}
              icon={ShoppingCart}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Total Customers"
              total={customerCount}
              color="info"
              icon={PeopleAltOutlined}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Total Deliveries"
              total={deliveryCount}
              color="warning"
              icon={LocalShipping}
            />
          </Grid> */}

          {/* <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Bug Reports"
              total={1}
              color="error"
              icon={ShoppingCart}
            />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate
              title="News Update"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: faker.name.jobTitle(),
                description: faker.name.jobTitle(),
                // image: `/assets/images/covers/cover_${index + 1}.jpg`,
                postedAt: faker.date.recent(),
              }))}
            />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline
              title="Order Timeline"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: [
                  '1983, orders, $4220',
                  '12 Invoices have been paid',
                  'Order #37745 from September',
                  'New order placed #XF-2356',
                  'New order placed #XF-2346',
                ][index],
                type: `order${index + 1}`,
                time: faker.date.past(),
              }))}
            />
          </Grid> */}
        </Grid>
      </Container>
    </>
  );
}
