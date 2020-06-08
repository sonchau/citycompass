import { createGlobalStyle } from "styled-components";

import GothamPropTtf from "./fonts/GothamPro/GothamPro.ttf";
import GothamPropWoff2 from "./fonts/GothamPro/GothamPro.woff2";

const CreateGlobalStyle = createGlobalStyle`

@font-face {
        font-family: 'Gotham Pro';
        src: local('Gotham Pro'), local('GothamPro'),
        url(${GothamPropTtf}) format('ttf'),
        url(${GothamPropWoff2}) format('woff2');
        font-weight: 300;
        font-style: normal;
    }


*::before,
*::after,
* {
    box-sizing: border-box;
}
html 
{
    font-size: 62.5%;
 }

body {
    background: ${(props) => props.theme.primaryBg};
    color: ${(props) => props.theme.color};
    font-family: "Gotham Pro", sans-serif;
    box-sizing: border-box;
}
input, textarea, button {font-family: inherit}

*,
 *::before,
 *::after {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
}
#root {
    min-height: 100vh;
}

.ant-menu {
    background-color: ${(props) => props.theme.sidebarBg};



    .ant-menu-item-group {
      .ant-menu-item-group-title {
        color: ${(props) => props.theme.sidebarHeadingClr};
        font-weight: bolder;
      }

      .ant-menu-item-group-list {
        .ant-menu-item {
          color: ${(props) => props.theme.sidebarLinkClr};
        }
        .ant-menu-item:hover {
          color: ${(props) => props.theme.sidebarActiveClr};
        }
        
        .ant-menu-item-selected {
          background-color: ${(props) => props.theme.sidebarSelectedBg};
          color: ${(props) => props.theme.sidebarSelectedClr};
        font-weight: bolder;

        }

        .ant-menu-submenu {
          color: ${(props) => props.theme.sidebarLinkClr};
        }


        
        
        .ant-menu-submenu-active {
          color: ${(props) => props.theme.sidebarActiveClr};


          .ant-menu-submenu-title {
            color: ${(props) => props.theme.sidebarActiveClr};
          }
          

        }
        .ant-menu-submenu-selected {
          color: ${(props) => props.theme.sidebarActiveClr};
        font-weight: bolder;

        }
      }
    }
  }


  .ant-menu-sub.ant-menu-vertical{
    background-color: ${(props) => props.theme.sidebarBg};

  }

h1.ant-typography, .ant-typography{
    color: ${(props) => props.theme.color};
}

.ant-breadcrumb{
    .ant-breadcrumb-link{
        color: ${(props) => props.theme.color};

    }
    .ant-breadcrumb-separator{
        color: ${(props) => props.theme.color};

    }
}

.ant-menu-horizontal{
    .ant-menu-item {
          color: ${(props) => props.theme.sidebarLinkClr};
        }
        .ant-menu-item:hover {
          color: ${(props) => props.theme.sidebarActiveClr};
          border-bottom: 2px solid ${(props) => props.theme.sidebarActiveClr}
        }

        .ant-menu-item-selected {
          background-color: ${(props) => props.theme.sidebarSelectedBg};
          color: ${(props) => props.theme.sidebarSelectedClr};
          border-bottom: 2px solid ${(props) => props.theme.sidebarActiveClr}

        }
}

.ant-menu-submenu-title {

  .ant-menu-submenu-arrow::before, .ant-menu-submenu-arrow::after {
        background: ${(props) => props.theme.sidebarLinkClr} !important;
    }

  &:hover{
    .ant-menu-submenu-arrow::before, .ant-menu-submenu-arrow::after {
        background: ${(props) => props.theme.sidebarActiveClr} !important;
    }
  }
}
        

`;

export default CreateGlobalStyle;
