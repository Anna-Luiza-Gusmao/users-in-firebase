import styled from "styled-components"

export const DeleteModalContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    width: 100%;

    p {
        margin: 2rem 0;
        font-size: 1.25rem;
    }
`

export const Button = styled.button`
    all: unset;
    cursor: pointer;
    background: ${props => props.theme["orange-200"]};
    color: ${props => props.theme["white"]};
    text-align: center;

    display: flex;
    justify-content: center;
    padding: 0.75rem;
    border-radius: 8px;

    transition: 0.2s background;

    &:not(:disabled):hover {
        background: ${props => props.theme["orange-400"]};
    }
`