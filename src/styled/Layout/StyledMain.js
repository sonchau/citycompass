import styled from "styled-components";

const StyledMain = styled.main`
  width: 100%;
  background-color: ${(props) => props.theme.mainBg};
  border-radius: 1rem;
  border-top-left-radius: 0;
`;

export default StyledMain;
