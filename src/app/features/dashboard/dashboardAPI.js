import axios from "axios";
import { API_END_POINT } from "src/utils/constants";
import { getReportsDataDone, getSummaryDone } from "./dashboardSlice";

// const DASHBOARD_API = `${API_END_POINT}/api/v1/paper`;
const DASHBOARD_API = `${API_END_POINT}/api/v1/turmeric`;
export const getSummaryData = () => async (dispatch) => {
  axios.get(`${DASHBOARD_API}/counts`).then((response) => {
    dispatch(getSummaryDone(response.data));
  });
};

export const getReportsData = (payload) => async (dispatch) => {
  axios.post(`${DASHBOARD_API}/reports`, payload).then((response) => {
    dispatch(getReportsDataDone(response.data));
  });
};
