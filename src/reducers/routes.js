export default (state = {}, action) => {
  switch (action.type) {
    case "SET_ROUTES":
      return action.payload;

    default:
      return state;
  }
};
