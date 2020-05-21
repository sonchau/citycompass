import styled from "styled-components";

const StyledSidebarDropdown = styled.div`
  display: ${(props) => (props.display ? "block" : "none")};
  background-color: ${(props) => props.theme.sidebarDropdownBg};
  margin-left: 1rem;
`;

export default StyledSidebarDropdown;
