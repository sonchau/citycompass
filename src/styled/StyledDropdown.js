import styled from "styled-components";

const StyledDropdown = styled.div`
  display: ${(props) => (props.display ? "block" : "none")};
  background-color: #262626;
  padding-left: 8px;
`;

export default StyledDropdown;
