import { SET_THEME } from "../constants/actionTypes";

export default function theme(state = null, action) {
  switch (action.type) {
    case SET_THEME:
      const theme = state === "light" ? "dark" : "light";
      return theme;

    default:
      return state;
  }
}
