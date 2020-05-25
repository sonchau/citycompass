import buildQueryUrl from "../utils/buildQueryUrl";
import { SET_DATA } from "../constants/actionTypes";

const fetchData = (query) => {
  return (dispatch, getState) => {
    fetch(buildQueryUrl(query))
      .then((response) => response.json())
      .then((result) => dispatch({ type: SET_DATA, payload: result }));
  };
};

export default fetchData;
