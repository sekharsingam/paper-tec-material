import axios from "axios";
import { toast } from "react-toastify";
import { API_END_POINT } from "src/utils/constants";
import { showLoader } from "../loader/loaderSlice";
import {
  loginCalling,
  loginDone,
  loginDoneWithError,
  registrationCalling,
  registrationDone,
} from "./authSlice";

export const login = (payload) => async (dispatch) => {
  dispatch(loginCalling());
  dispatch(showLoader(true));
  axios
    .post(`${API_END_POINT}/api/v1/turmeric/login`, payload)
    .then((response) => {
      localStorage.setItem("user", JSON.stringify(response.data));
      dispatch(loginDone(response.data));
    })
    .catch((error) => dispatch(loginDoneWithError(error.response.data)))
    .finally(() => dispatch(showLoader(false)));
};

export const registration = (payload) => async (dispatch) => {
  dispatch(registrationCalling({ success: false }));
  dispatch(showLoader(true));
  axios
    .post(`${API_END_POINT}/api/v1/turmeric/customers/createcustomer`, payload)
    .then(() => {
      toast.success("Register successfully.");
      dispatch(registrationDone({ success: true }));
    })
    .catch((err) => {
      toast.error("Error while registering");
      dispatch(
        registrationDone({ error: "error while registering", success: false })
      );
    })
    .finally(() => dispatch(showLoader(false)));
};
