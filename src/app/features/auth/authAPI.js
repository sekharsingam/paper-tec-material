import axios from "axios";
import { toast } from "react-toastify";
import { API_END_POINT } from "src/utils/constants";
import { loginCalling, loginDone, loginDoneWithError, registrationCalling, registrationDone } from "./authSlice";

export const login = (payload) => async (dispatch) => {
  dispatch(loginCalling());
  axios
    .post(`${API_END_POINT}/api/v1/turmeric/login`, payload)
    .then((response) => {
      localStorage.setItem("user", JSON.stringify(response.data));
      dispatch(loginDone(response.data));
    })
    .catch((error) => dispatch(loginDoneWithError(error.response.data)));
};

export const registration = (payload) => async (dispatch) => {
  dispatch(registrationCalling());
  axios
    .post(`${API_END_POINT}/api/v1/turmeric/customers/createcustomer`, payload)
    .then(() => {
      toast.success("Register successfully.");
      dispatch(registrationDone());
    })
    .catch((err) => {
      toast.error("Error while registering");
      dispatch(registrationDone('error while registering'));
    });
};
