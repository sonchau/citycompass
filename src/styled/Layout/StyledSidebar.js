import styled from "styled-components";

const StyledSidebar = styled.nav`
  flex: 0 0 18%;
  border-radius: 1.5rem 0rem 0rem 1.5rem;
  border: 0.5px solid lightgray;
  background-color: ${(props) => props.theme.sidebarBg};
  color: ${(props) => props.theme.sidebarClr};
  padding: 2rem 0rem 0rem 0rem;
  font-size: 1.4rem;

  /* height: 100vh; */

  .selected {
    background-color: ${(props) => props.theme.sidebarActiveBg};
    color: ${(props) => props.theme.sidebarActiveClr};
     border-right: 3px solid ${(props) => props.theme.sidebarActiveBorderClr};
    


  }


  .selected:after{
    transform: scaleY(1);
    opacity: 1;
    transition: transform .15s cubic-bezier(.645,.045,.355,1),opacity .15s cubic-bezier(.645,.045,.355,1),-webkit-transform .15s cubic-bezier(.645,.045,.355,1);
  }

  & a,
  button {
    height: 4rem;
    line-height: 4rem;
    margin-bottom: 0.8rem;
    margin-top: 0.4rem;
    padding: 0rem 1.6rem 0rem 3.6rem;



    text-decoration: none;
    color: ${(props) => props.theme.sidebarLinkClr};
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
    /* background-color: ${(props) => props.theme.sidebarActiveBg}; */
    color: ${(props) => props.theme.sidebarActiveClr};
  }
`;

export default StyledSidebar;
