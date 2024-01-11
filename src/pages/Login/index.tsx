import { LoginContainer } from "./styles"
import Logo from '../../assets/logo.svg'
import { useContext, useEffect } from "react"
import { UsersContext } from "../../context/users"
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from "react-hook-form"
import { z } from "zod"
import { collection, onSnapshot } from "@firebase/firestore"
import { firestore } from "../../firebase/config"
import { useNavigate } from "react-router-dom"
import { getDocs } from "firebase/firestore"

const loginFormSchema = z.object({
    email: z.string(),
    password: z.string()
        .regex(/^([a-z\\-]+)$/i, { message: 'Insira uma senha com hifens e letras' })
})

type LoginFormData = z.infer<typeof loginFormSchema>

export function LoginPage() {
    const { auth, setAuth } = useContext(UsersContext)

    const {
        register,
        handleSubmit,
        formState: { isDirty }
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginFormSchema)
    })

    const navigate = useNavigate()

    const allUsers = collection(firestore, "users")
    async function validateTypeofUser(email: string) {
        const querySnapshot = await getDocs(allUsers)
        querySnapshot.forEach((doc) => {
            if (doc.data().email === email) {
                localStorage.setItem('user-permission', doc.data().typeUser)
                setAuth(doc.data().typeUser)
            }
        })
    }

    function handleUserLogin(data: LoginFormData) {
        validateTypeofUser(data.email)
        new Promise(() => {
            setTimeout(() => {
                navigate('/user', { replace: true })
            }, 2000)
        })
    }

    useEffect(() => {
        new Promise(() => {
            setTimeout(() => {
                localStorage.removeItem('user-permission')
            }, 1000)
        })
    }, [auth])

    return (
        <LoginContainer>
            <form onSubmit={handleSubmit(handleUserLogin)}>
                <div>
                    <img src={Logo} />
                    <h1>users<span>Login</span>.</h1>
                </div>

                <label htmlFor="email">Email</label>
                <input id="email" type="email" {...register('email')} />

                <label htmlFor="password">Senha</label>
                <input
                    id="password"
                    type="password"
                    maxLength={8}
                    {...register('password')}
                />

                <button disabled={!isDirty}>LOGIN</button>
            </form>
        </LoginContainer>
    )
}