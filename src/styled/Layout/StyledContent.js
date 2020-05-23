import styled from "styled-components";

const StyledContent = styled.div`
  display: flex;
  background-color: ${(props) => props.theme.contentBg};
  height: 100vh;
  padding: 2rem;
`;

export default StyledContent;
