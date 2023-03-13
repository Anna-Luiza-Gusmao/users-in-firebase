import styled from "styled-components"

export const AlterModalContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    width: 100%;

    form {
        margin-top: 1rem;
        display: flex;
        flex-direction: column;
        width: 100%;
        border-radius: 8px;

        section {
            display: grid;
            row-gap: 0.5rem;
        }

        div {
            display: flex;
            align-items: center;
            justify-content: center;
            flex: 1;
        }

        label {
            margin: 0 1rem;
        }

        input {
            caret-color: ${props => props.theme["orange-200"]};
            border: none;
            border-radius: 8px;
            padding: 0.5rem;
            margin: 0.5rem 0;

            background: ${props => props.theme["orange-150"]};

            flex: 1;
        }
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
    margin-top: 2rem;
    border-radius: 8px;

    transition: 0.2s background;

    &:not(:disabled):hover {
        background: ${props => props.theme["orange-400"]};
    }
`