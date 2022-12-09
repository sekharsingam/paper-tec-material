import axios from "axios";
import { API_END_POINT } from "src/utils/constants";
import { getCustomersDone } from "./customerSlice";

export const getCustomers = (searchInput) => async (dispatch) => {
  axios
    .get(
      `${API_END_POINT}/api/v1/customers/getcustomers?searchInput=${
        searchInput || ""
      }`
    )
    .then((response) => {
      dispatch(getCustomersDone(response.data));
    });
};
