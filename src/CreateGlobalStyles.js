import { createGlobalStyle } from "styled-components";

const CreateGlobalStyle = createGlobalStyle`
*::before,
*::after,
* {
    box-sizing: border-box;
}
html,
body {
    height: 100%;
}
body {
    background: ${(props) => props.theme.primaryBg};
    margin: 0;
    padding: 0;
    font-family: "Roboto", sans-serif;
}
#root {
    min-height: 100vh;
}
`;

export default CreateGlobalStyle;
