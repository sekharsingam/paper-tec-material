import axios from "axios";
import { toast } from "react-toastify";
import { API_END_POINT, ROLE_ADMIN } from "src/utils/constants";
import {
  getAllPaymentDetailsDone,
  getOrderDone,
  getOrdersDone, getRequestOrdersDone
} from "./ordersSlice";

// const ORDERS_ENDPOINT = `${API_END_POINT}/api/v1/orders`;
const ORDERS_ENDPOINT = `${API_END_POINT}/api/v1/turmeric/orders`;

export const getOrders = (searchInput) => async (dispatch) => {
  axios
    .get(`${ORDERS_ENDPOINT}/getorders?searchInput=${searchInput || ""}`)
    .then((response) => {
      dispatch(getOrdersDone(response.data));
    });
};

export const getOrder = (orderId) => async (dispatch) => {
  axios
    .get(`${ORDERS_ENDPOINT}/getorder?orderId=${orderId || ""}`)
    .then((response) => {
      dispatch(getOrderDone(response.data));
    });
};

export const getOrdersByCustomer =
  (customerId, searchInput) => async (dispatch) => {
    axios
      .get(
        `${ORDERS_ENDPOINT}/getordersbycustomer?customerId=${customerId}&searchInput=${
          searchInput || ""
        }`
      )
      .then((response) => {
        dispatch(getOrdersDone(response.data));
      });
  };

export const createOrderRequest = (orderPayload) => async (dispatch) => {
  axios
    .post(`${ORDERS_ENDPOINT}/createorderrequest`, orderPayload)
    .then((response) => {
      toast.success("Order request has been created successfully.");
    })
    .catch((err) => {
      toast.error("Error while creating the order");
    });
};

export const updateOrder = (orderPayload) => async (dispatch) => {
  axios
    .put(`${ORDERS_ENDPOINT}/updateorder`, orderPayload)
    .then((response) => {
      toast.success("Order has been updated successfully.");
      dispatch(getOrders());
    })
    .catch((err) => {
      toast.error("Error while updating the order");
    });
};

export const deleteOrder = (orderId) => async (dispatch, state) => {
  axios
    .delete(`${ORDERS_ENDPOINT}/deleteorder?orderId=${orderId}`)
    .then((response) => {
      toast.success("Order has been deleted successfully.");
      const { loggedInUser } = state().auth;
      if (loggedInUser.role === ROLE_ADMIN) {
        dispatch(getOrders());
      } else {
        dispatch(getOrdersByCustomer(loggedInUser.customerId));
      }
    })
    .catch((err) => {
      toast.error("Error while deleting the order");
    });
};

export const getRequestedOrders = (searchInput) => async (dispatch) => {
  axios
    .get(
      `${ORDERS_ENDPOINT}/getrequestedorders?searchInput=${searchInput || ""}`
    )
    .then((response) => {
      dispatch(getRequestOrdersDone(response.data));
    });
};

export const orderApproval = (data) => async (dispatch) => {
  axios.post(`${ORDERS_ENDPOINT}/orderapproval`, data).then((response) => {
    toast.success(`Order has been ${data.status} successfully.`);
    dispatch(getRequestedOrders());
  });
};

export const getAllPaymentsDetails = (orderId) => async (dispatch) => {
  axios
    .get(`${ORDERS_ENDPOINT}/getpaymentsbyorder?orderId=${orderId}`)
    .then((response) => {
      dispatch(getAllPaymentDetailsDone(response.data));
    });
};

export const addPayment = (data) => async (dispatch, state) => {
  axios.post(`${ORDERS_ENDPOINT}/addpayment`, data).then((response) => {
    toast.success(`payment added successfully.`);
    dispatch(getAllPaymentsDetails(data.orderId));
    dispatch(getOrder(data.orderId));
  });
};
