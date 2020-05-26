import styled from "styled-components";

const StyledSidebarDropdown = styled.div`
  position: absolute;
  z-index: 1000;
  left: 30rem;
  top: -0.4rem;
  width: 20rem;
  padding: 1rem;
  box-shadow: 1px 1px 10px gray;
  background-color: ${(props) => props.theme.sidebarBg};
  display: ${(props) => (props.display ? "block" : "none")};
`;

export default StyledSidebarDropdown;
