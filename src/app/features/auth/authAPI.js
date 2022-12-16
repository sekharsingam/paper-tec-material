import axios from "axios";
import { toast } from "react-toastify";
import { API_END_POINT } from "src/utils/constants";

export const login = (searchInput) => async (dispatch) => {
  axios
    .get(
      `${API_END_POINT}/api/v1/customers/getcustomers?searchInput=${
        searchInput || ""
      }`
    )
    .then((response) => {
    //   dispatch(getCustomersDone(response.data));
    });
};

export const registration = (payload) => async (dispatch) => {
  axios
    .post(`${API_END_POINT}/api/v1/customers/getcustomers`, payload)
    .then((response) => {
      toast.success("Register successfully.");
    })
    .catch((err) => {
      toast.error("Error while registering");
    });
};
