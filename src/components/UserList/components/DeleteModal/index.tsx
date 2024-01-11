import { deleteDoc, getDocs, collection, doc } from '@firebase/firestore'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import { X } from 'phosphor-react'
import { firestore } from '../../../../firebase/config'
import { Button, DeleteModalContainer } from './styles'

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

interface DeleteModalProps {
    open: boolean
    setOpenDeleteModal: React.Dispatch<React.SetStateAction<boolean>>,
    user: Array<string>
}

export function DeleteModal({open, setOpenDeleteModal, user}: DeleteModalProps) {
    const allUsers = collection(firestore, "users")

    async function handleDeleteUser(id: string){
        const querySnapshot = await getDocs(allUsers)
        querySnapshot.forEach((document) => {
            if(document.id === id) {
                deleteDoc(doc(firestore, "users", id))
            }
        })
        setOpenDeleteModal(false)
    }

    return (
        <Modal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <DeleteModalContainer>
                    <X 
                        size={24} 
                        style={{cursor: 'pointer'}}
                        onClick={() => setOpenDeleteModal(false)}
                    />
                    <p>Deseja realmente excluir o usuário {user[1]}?</p>
                    <Button onClick={() => handleDeleteUser(user[0])}>
                        Excluir usuário
                    </Button>
                </DeleteModalContainer>
            </Box>
        </Modal>
    )
}