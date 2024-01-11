import { RegisterContainer } from "./styles"
import Logo from '../../../../assets/logo.svg'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from "react-hook-form"
import { z } from "zod"
import { addDoc, collection } from "@firebase/firestore"
import { firestore } from "../../../../firebase/config"
import { SelectedContainer } from "./styles"

const registerFormSchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string()
        .regex(/^([a-z\\-]+)$/i, { message: 'Insira uma senha com hifens e letras' }),
    typeUser: z.string()
})

type RegisterFormData = z.infer<typeof registerFormSchema>

export function RegisterForm() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { isDirty }
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerFormSchema)
    })

    const allUsers = collection(firestore, "users")
    async function handleUserRegister(data: RegisterFormData) {
        let datas = {
            name: data.name,
            email: data.email,
            password: data.password,
            typeUser: data.typeUser
        }
        try {
            addDoc(allUsers, datas)
            reset()
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <RegisterContainer>
            <form onSubmit={handleSubmit(handleUserRegister)}>
                <div>
                    <img src={Logo} />
                    <h1>users<span>Login</span>.</h1>
                </div>
                <section>
                    <div>
                        <label htmlFor="nome">Nome</label>
                        <input id="nome" type="string" {...register('name')} />
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input id="email" type="email" {...register('email')} />
                    </div>
                    <div>
                        <label htmlFor="password">Senha</label>
                        <input
                            id="password"
                            type="password"
                            {...register('password')}
                        />
                    </div>
                    <div>
                        <label htmlFor="user">Tipo de Usuário</label>
                        <SelectedContainer {...register('typeUser')}>
                            <option value="supervisor">supervisor</option>
                            <option value="administrador">administrador</option>
                        </SelectedContainer>
                        {/* <input id="user" type="string" {...register('typeUser')}/> */}
                    </div>
                </section>

                <footer style={{display: 'flex', width:'100%', justifyContent: 'flex-end'}}>
                    <button disabled={!isDirty}>Cadastrar Usuário</button>
                </footer>
            </form>
        </RegisterContainer>
    )
}