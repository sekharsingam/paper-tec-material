import { Helmet } from "react-helmet-async";
import { faker } from "@faker-js/faker";
import { useTheme } from "@mui/material/styles";
import { Grid, Container, Typography } from "@mui/material";
import { AppNewsUpdate, AppWidgetSummary } from "../sections/@dashboard/app";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  LocalShipping,
  PeopleAltOutlined,
  ShoppingCart,
} from "@mui/icons-material";
import { getSummaryData } from "src/app/features/dashboard/dashboardAPI";

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();

  const dispatch = useDispatch();
  const { orderCount, customerCount, deliveryCount } = useSelector(
    (state) => state.dashboard
  );

  useEffect(() => {
    dispatch(getSummaryData());
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <title> Dashboard | Paper Tech </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 2 }}>
          Hi, Welcome back
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
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
          </Grid>

          {/* <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Bug Reports"
              total={1}
              color="error"
              icon={ShoppingCart}
            />
          </Grid> */}

          <Grid item xs={12} md={6} lg={8}>
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
          </Grid>

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
