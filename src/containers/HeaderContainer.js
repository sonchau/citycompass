import React from "react";
import { connect } from "react-redux";

const HeaderContainer = ({ theme, toggleTheme }) => {
  return <button onClick={toggleTheme}>{theme}</button>;
};

const mapStateToProps = (state) => {
  console.log("state", state);
  return {
    theme: state.theme,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleTheme: () => dispatch({ type: "SET_THEME" }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);
