import React from "react";
import { connect } from "react-redux";
import { SET_THEME } from "../constants/actionTypes";
import styled from "styled-components";

// antd component
import { Switch } from "antd";

const GeografiaLogo = styled.img`
  width: 16rem;
  height: 6rem;
  padding: 1rem;
`;

const CaseyLogo = styled.img`
  width: 12rem;
  height: 8rem;
  padding: 1rem;
`;

const ThemeSelection = styled.div`
  margin-left: auto;
`

const HeaderContainer = ({ isThemeLight, toggleTheme }) => {
  return (
    <>
      <a target="_blank" href="/">
        <GeografiaLogo src={process.env.PUBLIC_URL + '/images/geografia-logo.svg'} />
      </a>
      <a target="_blank" href="https://www.casey.vic.gov.au/">
      <CaseyLogo src={process.env.PUBLIC_URL + '/images/casey-logo.png'} />
    </a>
    <ThemeSelection>
      <Switch
        style={{ backgroundColor: isThemeLight ? "blue" : "gray" }}
        defaultChecked
        onChange={() => toggleTheme(!isThemeLight)}
      />
    </ThemeSelection>

    </>  
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
