import styled from "styled-components";

const StyledSidebarDropdown = styled.div`
  display: ${(props) => (props.display ? "block" : "none")};
  background-color: #262626;
  padding-left: 0.8px;
`;

export default StyledSidebarDropdown;
