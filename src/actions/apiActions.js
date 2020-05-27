import buildQueryUrl from "../utils/buildQueryUrl";

const fetchData = (query, action_type, transformer = (d) => d) => {
  return (dispatch, getState) => {
    fetch(buildQueryUrl(query))
      .then((response) => response.json())
      .then((result) =>
        dispatch({ type: action_type, payload: transformer(result).log() })
      );
  };
};

export default fetchData;