import axios from "axios";
import { toast } from "react-toastify";
import { API_END_POINT, ROLE_ADMIN } from "src/utils/constants";
import { showLoader } from "../loader/loaderSlice";
import {
  addPaymentDone,
  addPaymentProcessing,
  createOrder,
  createOrderDone,
  getAllPaymentDetailsDone,
  getOrderDone,
  getOrdersDone,
  getRequestOrdersDone,
} from "./ordersSlice";

// const ORDERS_ENDPOINT = `${API_END_POINT}/api/v1/orders`;
const ORDERS_ENDPOINT = `${API_END_POINT}/api/v1/turmeric/orders`;

export const getOrders = (searchInput) => async (dispatch) => {
  dispatch(showLoader(true));
  axios
    .get(`${ORDERS_ENDPOINT}/getorders?searchInput=${searchInput || ""}`)
    .then((response) => {
      dispatch(getOrdersDone(response.data));
    })
    .finally(() => dispatch(showLoader(false)));
};

export const getOrder = (orderId) => async (dispatch) => {
  dispatch(showLoader(true));
  axios
    .get(`${ORDERS_ENDPOINT}/getorder?orderId=${orderId || ""}`)
    .then((response) => {
      dispatch(getOrderDone(response.data));
    })
    .finally(() => dispatch(showLoader(false)));
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
      })
      .finally(() => dispatch(showLoader(false)));
  };

export const createOrderRequest = (orderPayload) => async (dispatch) => {
  dispatch(showLoader(true));
  dispatch(createOrder());
  axios
    .post(`${ORDERS_ENDPOINT}/createorderrequest`, orderPayload)
    .then((response) => {
      dispatch(createOrderDone({ response, success: true }));
      toast.success("Order request has been created successfully.");
    })
    .catch((err) => {
      dispatch(createOrderDone({ error: err, success: false }));
      toast.error("Error while creating the order");
    })
    .finally(() => dispatch(showLoader(false)));
};

export const updateOrder = (orderPayload) => async (dispatch) => {
  dispatch(showLoader(true));
  axios
    .put(`${ORDERS_ENDPOINT}/updateorder`, orderPayload)
    .then((response) => {
      toast.success("Order has been updated successfully.");
      dispatch(getOrders());
    })
    .catch((err) => {
      toast.error("Error while updating the order");
    })
    .finally(() => dispatch(showLoader(false)));
};

export const deleteOrder = (orderId) => async (dispatch, state) => {
  dispatch(showLoader(true));
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
    })
    .finally(() => dispatch(showLoader(false)));
};

export const getRequestedOrders = (searchInput) => async (dispatch) => {
  dispatch(showLoader(true));
  axios
    .get(
      `${ORDERS_ENDPOINT}/getrequestedorders?searchInput=${searchInput || ""}`
    )
    .then((response) => {
      dispatch(getRequestOrdersDone(response.data));
    })
    .finally(() => dispatch(showLoader(false)));
};

export const orderApproval = (data) => async (dispatch) => {
  dispatch(showLoader(true));
  axios
    .post(`${ORDERS_ENDPOINT}/orderapproval`, data)
    .then((response) => {
      toast.success(`Order has been ${data.status} successfully.`);
      dispatch(getRequestedOrders());
    })
    .finally(() => dispatch(showLoader(false)));
};

export const getAllPaymentsDetails = (orderId) => async (dispatch) => {
  dispatch(showLoader(true));
  axios
    .get(`${ORDERS_ENDPOINT}/getpaymentsbyorder?orderId=${orderId}`)
    .then((response) => {
      dispatch(getAllPaymentDetailsDone(response.data));
    })
    .finally(() => dispatch(showLoader(false)));
};

export const addPayment = (data) => async (dispatch, state) => {
  dispatch(showLoader(true));
  dispatch(addPaymentProcessing({ success: false }));
  axios
    .post(`${ORDERS_ENDPOINT}/addpayment`, data)
    .then((response) => {
      dispatch(addPaymentDone({ success: true }));
      toast.success(`payment added successfully.`);
      dispatch(getAllPaymentsDetails(data.orderId));
      dispatch(getOrder(data.orderId));
    })
    .catch((err) => dispatch(addPaymentDone({ success: false })))
    .finally(() => dispatch(showLoader(false)));
};
