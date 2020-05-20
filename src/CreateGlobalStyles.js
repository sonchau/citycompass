import { createGlobalStyle } from "styled-components";

const CreateGlobalStyle = createGlobalStyle`
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
    font-family: "Roboto", sans-serif;
    box-sizing: border-box;
}
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
