import styled from "styled-components";

const StyledSidebar = styled.nav`
  flex: 0 0 ${(props) => props.theme.sidebarWidth};
  border-radius: 1.5rem 0rem 0rem 1.5rem;
  border: 0.5px solid lightgray;
  background-color: ${(props) => props.theme.sidebarBg};
  color: ${(props) => props.theme.sidebarClr};
  padding: 2rem 0rem 0rem 0rem;
  font-size: 1.4rem;


  .selected {
    background-color: ${(props) => props.theme.sidebarActiveBg};
    color: ${(props) => props.theme.sidebarActiveClr};
     border-right: 3px solid ${(props) => props.theme.sidebarActiveBorderClr};
  }

  & a {
    height: 3rem;
    line-height: 3rem;
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
  & a:hover
 {
    /* background-color: ${(props) => props.theme.sidebarActiveBg}; */
    color: ${(props) => props.theme.sidebarActiveClr};
  }


  ul, li {
	margin: 0;
	padding: 0;
}

.mainMenu li {
	position:relative;
	display:block;
}

.mainMenu li ul {
	position:absolute;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

	width:30rem;
	left: ${(props) => props.theme.sidebarWidth};
	top:5px;
	display:none;
}

.mainMenu li:hover ul {
	display:block;
}

`;

export default StyledSidebar;
