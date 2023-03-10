import styled from "styled-components"

export const UserContainer = styled.div`
    position: relative;
    left: 20%;
    max-width: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`

export const TableContainer = styled.section`
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 2rem;
    padding: 3rem;
    border-radius: 8px;
    width: 80%;
    height: 38.5rem;
    background: ${props => props.theme["orange-100"]};
`

export const TableUsers = styled.table`
    width: 100%;
    border-collapse: separate;
    border-spacing: 0 0.5rem;
    margin-top:1.5rem;
    text-align: left;

    background: ${props => props.theme["orange-100"]};

    th {
        padding: 1.25rem 2rem;
        border-bottom: 2px solid ${props => props.theme["orange-400"]};
        color: ${props => props.theme["orange-400"]};
        font-size: 1rem;
        font-weight: bold;
    }
    td {
        padding: 1.25rem 2rem;
        background: rgb(255,151,79, 0.2);

        &:nth-child(4) {
            padding: 1.25rem 0;
        }

        &:first-child {
            width: 25%;
            border-top-left-radius: 6px;
            border-bottom-left-radius: 6px;
        }

        &:last-child {
            padding: 1.25rem 0;
            border-top-right-radius: 6px;
            border-bottom-right-radius: 6px;
        }
    }
`