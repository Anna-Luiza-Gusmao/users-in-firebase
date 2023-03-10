import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import { X } from 'phosphor-react'
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
}

export function DeleteModal({open}: DeleteModalProps) {
    const handleClose = () => console.log('fechar')

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <DeleteModalContainer>
                    <X size={24} />
                    <p>Deseja realmente excluir o usuário fulano?</p>
                    <Button>
                        Excluir usuário
                    </Button>
                </DeleteModalContainer>
            </Box>
        </Modal>
    )
}