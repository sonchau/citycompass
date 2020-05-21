import styled from "styled-components";

const StyledSidebarDropdown = styled.div`
  display: ${(props) => (props.display ? "block" : "none")};
  background-color: ${(props) => props.theme.sidebarDropdownBg};
  padding-left: 1.5rem;
`;

export default StyledSidebarDropdown;
