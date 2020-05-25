import { SET_THEME } from "../constants/actionTypes";

export default (state = true, action) => {
  switch (action.type) {
    case SET_THEME:
      return action.payload;

    default:
      return state;
  }
};
