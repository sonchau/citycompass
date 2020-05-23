import styled from "styled-components";

const StyledSidebar = styled.nav`
  flex: 0 0 18%;
  border-radius: 1.5rem 0rem 0rem 1.5rem;
  border: 1px solid;
  background-color: ${(props) => props.theme.sidebarBg};
  color: ${(props) => props.theme.sidebarClr};
  padding: 2rem 0rem 0rem 2rem;

  .selected {
    background-color: ${(props) => props.theme.sidebarActiveBg};
    color: ${(props) => props.theme.sidebarActiveClr};
  }

  & a,
  button {
    text-decoration: none;
    color: ${(props) => props.theme.sidebarLinkClr};
    font-size: 2rem;
    display: block;
    border: none;
    background: none;
    text-align: left;
    cursor: pointer;
    outline: none;
    padding: 0.25rem 0rem;
  }
  /* On mouse-over */
  & a:hover,
  button:hover {
    background-color: ${(props) => props.theme.sidebarActiveBg};
    color: ${(props) => props.theme.sidebarActiveClr};
  }
`;

export default StyledSidebar;
