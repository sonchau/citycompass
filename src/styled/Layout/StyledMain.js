import styled from "styled-components";

const StyledMain = styled.main`
  width: 100%;
  background-color: ${(props) => props.theme.mainBg};
  border-radius: 1rem;
  border-top-left-radius: 0;

  -webkit-box-shadow: 2px 2px 2px 0px rgba(255,255,255,1);
  -moz-box-shadow: 2px 2px 2px 0px rgba(255,255,255,1);
  box-shadow: 2px 2px 2px 0px rgba(255,255,255,1);
`;

export default StyledMain;
