import { Container, Stack, Typography } from "@mui/material";
import PropTypes from "prop-types";
import ApplicationTitle from "./ApplicationTitle";

PageContainer.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
};

export default function PageContainer({ title, children }) {
  return (
    <>
      <ApplicationTitle title={title} />

      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={2}
        >
          <Typography variant="h4" gutterBottom>
            {title}
          </Typography>
        </Stack>

        {children}
      </Container>
    </>
  );
}
