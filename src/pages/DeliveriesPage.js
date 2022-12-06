import { Card, Container, Stack, Typography } from "@mui/material";
import { Helmet } from "react-helmet-async";

export default function DeliveriesPage() {
  return (
    <>
      <Helmet>
        <title> Deliveries | Paper Tech </title>
      </Helmet>

      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={2}
        >
          <Typography variant="h4" gutterBottom>
            Deliveries
          </Typography>
        </Stack>

        <Card></Card>
      </Container>
    </>
  );
}
