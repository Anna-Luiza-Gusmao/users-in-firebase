import styled from "styled-components"

export const NavBarContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;

    position: absolute;
    left: 0;
    width: 20%;
    padding: 0 1rem;

    background: ${props => props.theme["orange-100"]};
    border-right: 2px solid ${props => props.theme["orange-200"]};
`

export const LogoContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    
    padding-bottom: 1.5rem;
    border-bottom: 2px solid ${props => props.theme["orange-400"]};
    margin: 1.5rem 0 1rem 0;

    img {
        width: 32px;
        margin-top: 0.75rem;
    }
    h1 {
        font-size: 1.5em;
        text-align: center;
        margin-left: 0.75rem;
        span {
            color: ${props => props.theme["orange-400"]};
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
    gap: 0.5rem;
    margin: 0.5rem;
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
`

export const BaseNavBar = styled.section`
    display: flex;
    align-items: center;
    padding: 0.75rem 1.5rem;
    gap: 1.5rem;

    a {
        text-decoration: none;
    }
`

export const NavBarElement = styled(BaseNavBar)`
    
`

export const LogoutElement = styled(BaseNavBar)`
    position: absolute;
    bottom: 5%;
`