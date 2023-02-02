import { Box, Grid, Paper, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getReportsData,
  getSummaryData,
} from "src/app/features/dashboard/dashboardAPI";
import { PageContainer } from "src/common";
import { numberFormat, ROLE_ADMIN } from "src/utils/constants";

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
  const { loggedInUser } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getSummaryData());
    const payload = {
      requestType: "orders",
      startDate: "2023-01-01T18:30:00Z",
      endDate: "2023-01-31T18:30:00Z",
    };
    if (loggedInUser.role !== ROLE_ADMIN) {
      payload.customerId = loggedInUser.customerId;
    }
    dispatch(getReportsData(payload));
  }, [dispatch]);

  const OrderInfoColumns = [
    { id: "orderId", label: "Order Id" },
    {
      id: "orderDate",
      label: "Order Date",
      dataFormat: (cell, row) => {
        const stillUtc = moment.utc(cell).toDate();
        return (
          <span>
            {" "}
            {new Intl.DateTimeFormat("en-IN").format(
              moment(stillUtc).local().toDate()
            )}
          </span>
        );
      },
    },
    // { id: "rollWeight", label: "Roll Weight" },
    // { id: "remainingRollWeight", label: "Remaing Roll Weight" },
    { id: "quantity", label: "Quantity" },
    { id: "deliveredQuantity", label: "Delivered Quantity" },
    {
      id: "totalAmount",
      label: "Total Amount",
      dataFormat: (cell, row) => <span>₹ {numberFormat(cell)}</span>,
    },
    {
      id: "amountPaid",
      label: "Paid Amount",
      dataFormat: (cell, row) => (
        <span style={{ color: "#00AB55" }}>₹ {numberFormat(cell)}</span>
      ),
    },
    {
      id: "paymentPending",
      label: "Due Amount",
      dataFormat: (cell, row) => (
        <span style={{ color: "#e74c3c" }}>₹ {numberFormat(cell)}</span>
      ),
    },
  ];

  return (
    <>
      <PageContainer title={"Dashboard"}>
        <Grid container spacing={3}>
          {reports.map((row, ind) => {
            return (
              <Grid key={row.id} item md={4}>
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
                      gridTemplateColumns: "2fr 1fr",
                      gap: "5px",
                    }}
                  >
                    {OrderInfoColumns.map((col, ind) => {
                      const cellValue = col.dataFormat
                        ? col.dataFormat(row[col.id], row)
                        : row[col.id];
                      return ind === 0 ? (
                        <React.Fragment key={ind}>
                          <Typography variant="h4">{cellValue}</Typography>
                          <Typography />
                        </React.Fragment>
                      ) : (
                        <React.Fragment key={ind}>
                          <Typography variant="body2">{col.label}</Typography>
                          <Typography variant="subtitle1">
                            {cellValue}
                          </Typography>
                        </React.Fragment>
                      );
                    })}
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
      </PageContainer>
    </>
  );
}
