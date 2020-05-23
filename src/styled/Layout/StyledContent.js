import styled from "styled-components";

const StyledContent = styled.div`
  display: flex;
  background-color: ${(props) => props.theme.contentBg};
  padding: 2rem;
`;

export default StyledContent;
