import axios from "axios";
import { toast } from "react-toastify";
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

export const approveCustomer = (data) => async (dispatch) => {
  axios
    .post(`${API_END_POINT}/api/v1/paper/accountapproval`, data)
    .then((response) => {
      toast.success(`Customer ${data.status} Successfully`);
      // dispatch(getCustomersDone(response.data));
    });
};

export const deleteCustomer = (customerId) => async (dispatch) => {
  axios
    .delete(
      `${API_END_POINT}/api/v1/customers/deletecustomer?customerId=${customerId}`
    )
    .then((response) => {
      dispatch(getCustomers());
      // dispatch(getCustomersDone(response.data));
    });
};
