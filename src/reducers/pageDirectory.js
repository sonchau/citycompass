import sqlQueryTransforms from "./../sqlQueryTransforms";

export default (state = [], action) => {
  switch (action.type) {
    case "SET_PAGE_DIRECTORY":
      const transformedData = sqlQueryTransforms['PAGE_DIRECTORY_QUERY'](action.payload)
      return transformedData;

    default:
      return state;
  }
};
