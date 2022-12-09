import axios from "axios";
import { API_END_POINT } from "src/utils/constants";
import { getMasterDataDone } from "./masterDataSlice";

export const getMasterData = () => async (dispatch) => {
  axios.get(`${API_END_POINT}/api/v1/paper/unique`).then((response) => {
    dispatch(getMasterDataDone(response.data.values));
  });
};
