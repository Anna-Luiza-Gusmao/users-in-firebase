import { getDocs, collection, doc } from '@firebase/firestore'
import { zodResolver } from '@hookform/resolvers/zod'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import { X } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { firestore } from '../../../../firebase/config'
import { SelectedContainer } from '../../../../pages/AddUsers/components/RegisterForm/styles'
import { Button, AlterModalContainer } from './styles'

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 4
}

interface AlterModalProps {
    open: boolean
    setOpenAlterModal: React.Dispatch<React.SetStateAction<boolean>>
}

const registerFormSchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string()
        .regex(/^([a-z\\-]+)$/i, { message: 'Insira uma senha com hifens e letras' }),
    typeUser: z.string()
})

type RegisterFormData = z.infer<typeof registerFormSchema>

export function AlterModal({ open, setOpenAlterModal }: AlterModalProps) {
    const allUsers = collection(firestore, "users")
    const {
        register,
        handleSubmit,
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerFormSchema)
    })

    async function handleAlterUserRegister(data: RegisterFormData) {
        let datas = {
            name: data.name,
            email: data.email,
            password: data.password,
            typeUser: data.typeUser
        }
        try {
            setOpenAlterModal(false)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <Modal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <AlterModalContainer>
                    <X
                        size={24}
                        style={{ cursor: 'pointer' }}
                        onClick={() => setOpenAlterModal(false)}
                    />
                    <form onSubmit={handleSubmit(handleAlterUserRegister)}>
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
                            </div>
                        </section>

                        <Button type='submit'>
                            Alterar usuário
                        </Button>
                    </form>
                </AlterModalContainer>
            </Box>
        </Modal>
    )
}