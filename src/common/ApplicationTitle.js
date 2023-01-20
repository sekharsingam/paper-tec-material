import PropTypes from "prop-types";
import { Helmet } from "react-helmet-async";
import { COMPANY_NAME } from "src/utils/constants";

ApplicationTitle.propTypes = {
  title: PropTypes.string,
};

export default function ApplicationTitle({ title }) {
  return (
    <Helmet>
      <title>
        {" "}
        {title} | {COMPANY_NAME}{" "}
      </title>
    </Helmet>
  );
}
