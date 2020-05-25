import styled from "styled-components";

const StyledSideNav = styled.p`
  font-weight: ${(props) => props.fontWeight};
  padding: ${(props) => props.padding};
  border-bottom: 1px solid gray;
  font-size: 1.7rem;
`;

export default StyledSideNav;
