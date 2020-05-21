import styled from "styled-components";

const StyledSidebar = styled.nav`
  flex: 0 0 18%;
  border-radius: 1.5rem 0rem 0rem 1.5rem;
  border: 1px solid;
  background-color: #111;
  color: white;
  padding: 2rem 0rem 0rem 2rem;

  .selected {
    background-color: green;
    color: white;
  }

  & a,
  button {
    text-decoration: none;
    font-size: 2rem;
    color: #818181;
    display: block;
    border: none;
    background: none;
    text-align: left;
    cursor: pointer;
    outline: none;
  }
  /* On mouse-over */
  & a:hover,
  button:hover {
    color: #f1f1f1;
  }
`;

export default StyledSidebar;
