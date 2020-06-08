import styled from "styled-components";

const StyledHeader = styled.header`
  .ant-layout-header {
    background-color: ${(props) => props.theme.primaryBg};
  }
`;

export default StyledHeader;
