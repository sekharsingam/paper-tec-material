import axios from "axios";
import { toast } from "react-toastify";
import { API_END_POINT } from "src/utils/constants";
import { createDeliveryDone, getDeliveriesDone } from "./deliverySlice";

export const getDeliveries = (searchInput) => async (dispatch) => {
  axios
    .get(
      `${API_END_POINT}/api/v1/delivery/getdeliveries?searchInput=${
        searchInput || ""
      }`
    )
    .then((response) => {
      dispatch(getDeliveriesDone(response.data));
    });
};

export const createDelivery = (payload) => async (dispatch) => {
  axios
    .post(`${API_END_POINT}/api/v1/delivery/createdelivery`, payload)
    .then((response) => {
      dispatch(createDeliveryDone(response.data));
      toast.success("Delivery has been created successfully.");
    })
    .catch((err) => {
      toast.error("Error while creating the delivery");
    });
};
