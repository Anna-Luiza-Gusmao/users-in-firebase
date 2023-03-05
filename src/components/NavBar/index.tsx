import { Link } from "react-router-dom"
import { 
    Button, 
    LogoContainer, 
    LogoutElement, 
    NavBarContainer, 
    NavBarElement 
} from "./styles"
import Logo from '../../assets/logo.svg'
import { ChartLine, Plus, SignOut, Users } from "phosphor-react"

export function NavBar() {
    return (
        <NavBarContainer>
            <LogoContainer>
                <img src={Logo} />
                <h1>users<span>Login</span>.</h1>
                <div />
            </LogoContainer>
            <Button>
                <Plus size={20} color="#f2f2f2" />
                Adicionar Usuário
            </Button>
            <NavBarElement>
                <Users size={32} color="#f5883c"/>
                <Link to='/user'>
                    <p>Usuários</p>
                </Link>
            </NavBarElement>
            <NavBarElement>
                <ChartLine size={32} color="#f5883c"/>
                <Link to='/user/dashboard'>
                    <p>Dashboard</p>
                </Link>
            </NavBarElement>
            <LogoutElement>
                <SignOut size={32} color="#f5883c" />
                <Link to='/'>
                    <p>Sair</p>
                </Link>
            </LogoutElement>
        </NavBarContainer>
    )
}