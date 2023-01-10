import axios from "axios";
import { API_END_POINT } from "src/utils/constants";
import { getReportsDataDone, getSummaryDone } from "./dashboardSlice";

export const getSummaryData = () => async (dispatch) => {
  axios.get(`${API_END_POINT}/api/v1/paper/counts`).then((response) => {
    dispatch(getSummaryDone(response.data));
  });
};

export const getReportsData = (payload) => async (dispatch) => {
  axios
    .post(`${API_END_POINT}/api/v1/paper/reports`, payload)
    .then((response) => {
      dispatch(getReportsDataDone(response.data));
    });
};
