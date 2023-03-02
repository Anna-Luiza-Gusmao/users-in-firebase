import styled from "styled-components"

export const LoginContainer = styled.main`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;

    form {
        display: flex;
        flex-direction: column;
        padding: 2rem;
        border-radius: 8px;
        width: 380px;

        background: ${props => props.theme["orange-100"]};

        div {
            display: flex;
            align-items: center;
            justify-content: center;
            flex: 1;
            
            margin-bottom: 1.5rem;

            img {
                width: 36px;
                margin-top: 0.75rem;
            }
            h1 {
                font-size: 2.25em;
                text-align: center;
                margin-left: 0.75rem;
                span {
                    color: ${props => props.theme["orange-400"]};
                }
            }
        }

        label {
            font-size: 1.25rem;
        }

        input {
            caret-color: ${props => props.theme["orange-200"]};
            border: none;
            border-radius: 8px;
            padding: 0.5rem;
            margin: 0.5rem 0;

            background: ${props => props.theme["orange-150"]};
        }

        button {
            all: unset;
            cursor: pointer;
            background: ${props => props.theme["orange-200"]};
            color: ${props => props.theme["white"]};
            text-align: center;

            margin-top: 2rem;
            padding: 1rem;
            border-radius: 8px;

            transition: 0.2s background;

            &:not(:disabled):hover {
                background: ${props => props.theme["orange-400"]};
            }

            &:disabled {
                cursor: not-allowed;
                background: ${props => props.theme["orange-150"]};
                color: ${props => props.theme["gray-100"]};
            }
        }
    }
`
