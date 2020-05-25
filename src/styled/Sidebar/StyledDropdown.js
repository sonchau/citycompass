import styled from "styled-components";

const StyledSidebarDropdown = styled.div`
  display: ${(props) => (props.display ? "block" : "none")};
  padding-left: 1rem;
`;

export default StyledSidebarDropdown;
