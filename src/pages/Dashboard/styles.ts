import styled from "styled-components"

export const DashboardContainer = styled.main`
    position: relative;
    left: 20%;
    max-width: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    padding: 0 16rem;

    section {
        display: flex;
        padding: 2rem;
        border-radius: 8px;

        background: ${props => props.theme["orange-100"]};
    }
`