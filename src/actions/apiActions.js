import buildQueryUrl from "../utils/buildQueryUrl";

const fetchData = (query, action_type) => {
  return (dispatch, getState) => {
    fetch(buildQueryUrl(query))
      .then((response) => response.json())
      .then((result) => dispatch({ type: action_type, payload: result }));
  };
};

export default fetchData;
