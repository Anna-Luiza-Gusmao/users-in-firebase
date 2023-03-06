import { LoaderContainer } from "./styles"

export function Loader() {
    return (
        <LoaderContainer>
            <svg viewBox="25 25 50 50">
                <circle r="20" cy="50" cx="50"></circle>
            </svg>
        </LoaderContainer>
    )
}