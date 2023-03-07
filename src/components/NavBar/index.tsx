import { Link, useLocation, useNavigate } from "react-router-dom"
import { 
    Button, 
    LogoContainer, 
    LogoutElement, 
    NavBarContainer, 
    NavBarElement 
} from "./styles"
import Logo from '../../assets/logo.svg'
import { ChartLine, Plus, SignOut, Users } from "phosphor-react"
import { useContext, useEffect, useState } from "react"
import { UsersContext } from "../../context/users"

export function NavBar() {
    const navigate = useNavigate()
    const location = useLocation()
    const [colorSelectedUser, setColorSelectedUser] = useState('#f5883c')
    const [colorSelectedDashboard, setColorSelectedDashboard] = useState('#404040')
    const { auth } = useContext(UsersContext)
    const [adminPermission, setAdminPermission] = useState(false)

    function verifyAdminPermission() {
        if(auth === 'administrador') {
            setAdminPermission(true)
        }else{
            setAdminPermission(false)
        }
    }

    useEffect(() => {
        function detectPathname() {
            if(location.pathname === '/user') {
                setColorSelectedUser('#f5883c')
                setColorSelectedDashboard('#404040')
            }else if(location.pathname === '/user/dashboard'){
                setColorSelectedUser('#404040')
                setColorSelectedDashboard('#f5883c')
            }else{
                setColorSelectedUser('#404040')
                setColorSelectedDashboard('#404040')
            }
        }
        detectPathname()
        verifyAdminPermission()
    }, [location])

    return (
        <NavBarContainer>
            <LogoContainer>
                <img src={Logo} />
                <h1>users<span>Login</span>.</h1>
                <div />
            </LogoContainer>
            <Button onClick={() => navigate('/user/register')} disabled={!adminPermission}>
                {
                    adminPermission && <Plus size={20} color="#f2f2f2" /> 
                }
                Adicionar Usuário
            </Button>
            <NavBarElement>
                <Users size={32} color="#f5883c"/>
                <Link to='/user' style={{color: `${colorSelectedUser}`}}>
                    <p>Usuários</p>
                </Link>
            </NavBarElement>
            <NavBarElement>
                <ChartLine size={32} color="#f5883c"/>
                <Link to='/user/dashboard' style={{color: `${colorSelectedDashboard}`}}>
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