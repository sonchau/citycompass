import React from "react";
import { connect } from "react-redux";
import { SET_THEME } from "../constants/actionTypes";

const HeaderContainer = ({ isThemeLight, toggleTheme }) => {
  return (
    <button onClick={() => toggleTheme(!isThemeLight)}>Toggle Theme</button>
  );
};

const mapStateToProps = (state) => {
  return {
    isThemeLight: state.isThemeLight,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleTheme: (isThemeLight) =>
      dispatch({ type: SET_THEME, payload: isThemeLight }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);
