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

* {
  margin: 0;
  padding: 0;
}

*,
*::before,
*::after {
  box-sizing: inherit;
}
html 
{
    font-size: 62.5%;
    box-sizing: border-box;
 }

body {
    background: ${(props) => props.theme.primaryBg};
    color: ${(props) => props.theme.color};
    font-family: "Gotham Pro", sans-serif;
    min-height: 100vh;
}

.ant-layout {
  background-color: inherit;
}

h1.ant-typography, .ant-typography{
  color: ${(props) => props.theme.color};
}

.ant-breadcrumb {
  .ant-breadcrumb-link {
      color: ${(props) => props.theme.color};
  }
  .ant-breadcrumb-separator{
      color: ${(props) => props.theme.color};
  }
}

// Menu
.ant-menu-vertical {
  background-color: ${(props) => props.theme.sidebarBg};
  padding: 1rem 0 1rem 2rem;
  border-top-left-radius: 1rem;
  border-bottom-left-radius: 1rem;
  &.ant-menu-root.ant-menu-vertical {
    box-shadow: inset -10px 0 10px -10px rgba(0,0,0,0.4);
    -moz-box-shadow: inset -10px 0 10px -10px rgba(0,0,0,0.4);
    -webkit-box-shadow: inset -10px 0 10px -10px rgba(0,0,0,0.4);
  }
  .ant-menu-item.ant-menu-item-only-child {
    font-weight: bolder;
    font-size: 1.4rem;
  }

  .ant-menu-item-group {
    .ant-menu-item-group-title {
      color: ${(props) => props.theme.sidebarHeadingClr};
      font-weight: bolder;
      font-size: 1.4rem;
      border-bottom: 1px solid ${(props) => props.theme.sidebarHeadingClr};
      padding: 0;
      height: 4rem;
      line-height: 5rem;
    }
    .ant-menu-item-group-title:empty {
      display: none;
    }
  }

  .ant-menu-item-group-list {
    .ant-menu-item {
      color: ${(props) => props.theme.sidebarLinkClr};
    }
    .ant-menu-item-active {
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
      background-color: ${(props) => props.theme.sidebarSelectedBg};
      color: ${(props) => props.theme.sidebarSelectedClr};
      font-weight: bolder;
    }
  }

  &.ant-menu-sub {
    padding: 0 0.5rem;
  }
}


//Menu and submenu hover
ul.ant-menu-vertical li[role="menuitem"] .ant-menu-submenu-title,
ul.ant-menu-item-group-list .ant-menu-item.ant-menu-item-only-child
{
  padding: 0 0 0 1rem;
  margin: 0;
  position: relative;

  &:hover {
    color: ${(props) => props.theme.sidebarHeadingClr};
  }
   
  ::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 3px;
    background-color: ${(props) => props.theme.sidebarSelectedBg};
    transform: scaleY(0);
    transition: transform .2s,
                width .4s cubic-bezier(1,0,0,1) .2s,
                background-color .1s;
  }
  &:hover::before {
    transform: scaleY(1);
    width: 100%;
  }
}

//Menu selected
.ant-menu-submenu-selected {
  .ant-menu-submenu-title {
    .ant-menu-submenu-arrow::before, .ant-menu-submenu-arrow::after {
          background: ${(props) => props.theme.sidebarSelectedClr} !important;
      }
      &:hover{
      .ant-menu-submenu-arrow::before, .ant-menu-submenu-arrow::after {
          background: ${(props) => props.theme.sidebarSelectedClr} !important;
      }
    }
  }
}


//Menu arrow
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

//Selected menu
.ant-menu-submenu-selected {
  .ant-menu-submenu-title {
    .ant-menu-submenu-arrow::before, .ant-menu-submenu-arrow::after {
          background: ${(props) => props.theme.sidebarSelectedClr} !important;
      }
      &:hover{
      .ant-menu-submenu-arrow::before, .ant-menu-submenu-arrow::after {
          background: ${(props) => props.theme.sidebarSelectedClr} !important;
      }
    }
  }
}


//Horizontal Menu
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
    border-bottom: 2px solid ${(props) => props.theme.sidebarActiveClr};
      &:hover {
      background-color: ${(props) => props.theme.sidebarSelectedBg};
      color: ${(props) => props.theme.sidebarSelectedClr};
      border-bottom: 2px solid ${(props) => props.theme.sidebarActiveClr}
    }
  }
}
`;

export default CreateGlobalStyle;
