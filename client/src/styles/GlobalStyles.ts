import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    html, body, #root {
        height: 100%;
    }

    *, button, input {
        border: 0;
        outline: 0;
        font-family: 'Roboto', sans-serif;
    }

    button {
        cursor: pointer;
    }

    ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        overflow-y: auto; 
    }

    #root {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: stretch;
    }
`;
