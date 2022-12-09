import axios from "axios";
import { toast } from "react-toastify";
import { API_END_POINT } from "src/utils/constants";
import { getOrdersDone } from "./ordersSlice";

export const getOrders = (searchInput) => async (dispatch) => {
  axios
    .get(
      `${API_END_POINT}/api/v1/orders/getorders?searchInput=${
        searchInput || ""
      }`
    )
    .then((response) => {
      dispatch(getOrdersDone(response.data));
    });
};

export const createOrder = (orderPayload) => async (dispatch) => {
  axios
    .post(`${API_END_POINT}/api/v1/orders/createorder`, orderPayload)
    .then((response) => {
      toast.success("Order has been created successfully.");
    })
    .catch((err) => {
      toast.error("Error while creating the order");
    });
};

export const updateOrder = (orderPayload) => async (dispatch) => {
  axios
    .put(`${API_END_POINT}/api/v1/orders/updateorder`, orderPayload)
    .then((response) => {
      toast.success("Order has been updated successfully.");
      dispatch(getOrders());
    })
    .catch((err) => {
      toast.error("Error while updating the order");
    });
};

export const deleteOrder = (orderId) => async (dispatch) => {
  axios
    .delete(`${API_END_POINT}/api/v1/orders/deleteorder?orderId=${orderId}`)
    .then((response) => {
      toast.success("Order has been deleted successfully.");
      dispatch(getOrders());
    })
    .catch((err) => {
      toast.error("Error while deleting the order");
    });
};
