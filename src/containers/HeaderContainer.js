import React from "react";
import { connect } from "react-redux";
import { SET_THEME } from "../constants/actionTypes";

// antd component
import { Switch } from "antd";

const HeaderContainer = ({ isThemeLight, toggleTheme }) => {
  return (
    <Switch
      style={{ backgroundColor: isThemeLight ? "blue" : "gray" }}
      defaultChecked
      onChange={() => toggleTheme(!isThemeLight)}
    />
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
