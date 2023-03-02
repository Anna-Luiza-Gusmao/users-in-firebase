import { createGlobalStyle } from "styled-components"

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    :focus {
        outline: 0;
        box-shadow: 0 0 0 2px ${(props) => props.theme['orange-200']};
    }

    body {
        background-color: ${(props) => props.theme['orange-400']};
        -webkit-font-smoothing: antialiased;
    }
    
    body, input, textarea, button {
        font-family: 'Lato', sans-serif;
        font-weight: 400;   
        font-size: 1rem;
        color: ${(props) => props.theme['gray-300']};
    }
`