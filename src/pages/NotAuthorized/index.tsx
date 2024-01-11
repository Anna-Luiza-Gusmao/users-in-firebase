import { Prohibit } from "phosphor-react"
import { NavBar } from "../../components/NavBar"
import { NotAuthorizedContainer } from "./styles"

export function NotAuthorized() {
    return (
        <>
            <NavBar />
            <NotAuthorizedContainer>
                <Prohibit size={128} />
                <h1>Acesso não autorizado a essa página!</h1>
                <p>Retorne para as páginas de navegação padrão da sua barra de navegação lateral</p>
            </NotAuthorizedContainer>
        </>
    )
}