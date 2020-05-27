import styled from "styled-components";

const StyledMain = styled.main`
  flex: 1;
  background-color: ${(props) => props.theme.primaryBg};
  border-radius: 0rem 1.5rem 1.5rem 0rem;
  border: 0.5px solid lightgray;
  padding: 5rem 5rem 5rem 10rem;
`;

export default StyledMain;
