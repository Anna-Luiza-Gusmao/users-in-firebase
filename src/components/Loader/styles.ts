import styled, { keyframes } from "styled-components"

export const rotate = keyframes`
    100% {
        transform: rotate(360deg);
    }
`

export const dash = keyframes`
    0% {
     stroke-dasharray: 1, 200;
     stroke-dashoffset: 0;
    }
   
    50% {
     stroke-dasharray: 90, 200;
     stroke-dashoffset: -35px;
    }
   
    100% {
     stroke-dashoffset: -125px;
    }
`

export const LoaderContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;

    svg {
        width: 3.25em;
        transform-origin: center;
        animation: ${rotate} 2s linear infinite;
    }
    circle {
        fill: none;
        stroke: hsl(24, 97%, 59%);
        stroke-width: 2;
        stroke-dasharray: 1, 200;
        stroke-dashoffset: 0;
        stroke-linecap: round;
        animation: ${dash} 1.5s ease-in-out infinite;
    }
`