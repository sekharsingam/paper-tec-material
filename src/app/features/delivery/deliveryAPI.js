import axios from "axios";
import { toast } from "react-toastify";
import { API_END_POINT } from "src/utils/constants";
import { createDeliveryDone, getDeliveriesDone } from "./deliverySlice";

const DELIVERY_API_END_POINT = `${API_END_POINT}/api/v1/turmeric/delivery`
export const getDeliveries = (searchInput) => async (dispatch) => {
  axios
    .get(
      `${DELIVERY_API_END_POINT}/getdeliveries?searchInput=${
        searchInput || ""
      }`
    )
    .then((response) => {
      dispatch(getDeliveriesDone(response.data));
    });
};

export const createDelivery = (payload) => async (dispatch) => {
  axios
    .post(`${DELIVERY_API_END_POINT}/createdelivery`, payload)
    .then((response) => {
      dispatch(createDeliveryDone(response.data));
      toast.success("Delivery has been created successfully.");
    })
    .catch((err) => {
      toast.error("Error while creating the delivery");
    });
};

export const updateDelivery = (payload) => async (dispatch) => {
  axios
    .put(`${DELIVERY_API_END_POINT}/updatedelivery`, payload)
    .then((response) => {
      dispatch(getDeliveries());
      toast.success("Delivery has been updated successfully.");
    })
    .catch((err) => {
      toast.error("Error while updating the delivery");
    });
};
