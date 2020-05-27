import sqlQueryTransforms from "./../sqlQueryTransforms";

export default (state = [], action) => {
  switch (action.type) {
    case "SET_ROUTES":
      const transformedData = sqlQueryTransforms['PAGE_DATA_QUERY'](action.payload)
      return transformedData;

    default:
      return state;
  }
};
