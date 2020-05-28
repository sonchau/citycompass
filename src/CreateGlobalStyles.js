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
`;

export default CreateGlobalStyle;
