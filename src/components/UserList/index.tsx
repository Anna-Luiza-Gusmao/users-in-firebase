import { firestore } from "../../firebase/config"
import { TableContainer, TableUsers, UserContainer } from "./styles"
import { Loader } from "../../components/Loader"
import { collection } from "@firebase/firestore"
import { getDocs } from "firebase/firestore"
import { useEffect, useState } from "react"
import { Pagination, ThemeProvider, createTheme } from "@mui/material"
import { Pencil, Trash } from "phosphor-react"
import { DeleteModal } from "./components/DeleteModal"

interface DataUser {
    id: string,
    name: string,
    email: string,
    typeUser: string
}

const themePagination = createTheme({
    palette: {
        primary: {
            main: 'rgb(255,151,79, 0.2)'
        },
    },
})

export function UserList() {
    const [userList, setUserList] = useState<DataUser[]>([])
    const allUsers = collection(firestore, "users")
    const [page, setPage] = useState(1)
    const [nextPage, setNextPage] = useState(page * 5)
    const [currentPage, setCurrentPage] = useState(0)
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        if (value === page) {
            return
        } else {
            const differenceOfPages = page - value
            if (value < page) {
                setCurrentPage(currentPage - (5 * differenceOfPages))
                setNextPage(nextPage - (differenceOfPages * 5))
            } else {
                if (currentPage === 0) {
                    setCurrentPage((differenceOfPages * -1) * 5)
                } else if (differenceOfPages * -1 === 1) {
                    setCurrentPage(page * 5)
                } else {
                    setCurrentPage(currentPage + (differenceOfPages * -1 * 5))
                }
                setNextPage(value * 5)
            }

            setPage(value)

            if (value === 1) setCurrentPage(0)
        }
    }
    const totalPages = Math.ceil(userList.length / 5)
    const newUserList = userList.slice(currentPage, nextPage)

    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [dataUser, setDataUser] = useState<string[]>([])
    function getDeleteUser(id: string, user: string){
        setOpenDeleteModal(true)
        setDataUser([id, user])
    }

    useEffect(() => {
    }, [page])

    useEffect(() => {
        async function loadUsers() {
            let arrayUserList: DataUser[] = []
            const querySnapshot = await getDocs(allUsers)
            querySnapshot.forEach((doc) => {
                arrayUserList.push({
                    id: doc.id,
                    name: doc.data().name,
                    email: doc.data().email,
                    typeUser: doc.data().typeUser
                })
            })
            setUserList(arrayUserList)
        }

        loadUsers()
    }, [userList])

    return (
            <UserContainer>
                <TableContainer>
                    <TableUsers>
                        {
                            userList.length === 0 ? <Loader /> : (
                                <>
                                    <thead>
                                        <tr>
                                            <th>Usuário</th>
                                            <th>E-mail</th>
                                            <th>Tipo de Acesso</th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            newUserList.map((user) => (
                                                <tr key={user.email}>
                                                    <td>{user.name}</td>
                                                    <td>{user.email}</td>
                                                    <td>{user.typeUser}</td>
                                                    <td style={{ cursor: 'pointer' }}><Pencil size={24} /></td>
                                                    <td
                                                        onClick={() => getDeleteUser(user.id, user.email)}
                                                        style={{ cursor: 'pointer' }}
                                                    >
                                                        <Trash size={24} />
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </>
                            )
                        }
                    </TableUsers>
                    <ThemeProvider theme={themePagination}>
                        <Pagination
                            count={totalPages}
                            defaultPage={1}
                            shape="rounded"
                            color="primary"
                            page={page}
                            onChange={handleChange}
                            style={{
                                position: 'absolute',
                                bottom: '2rem'
                            }}
                        />
                    </ThemeProvider>
                </TableContainer>
                <DeleteModal 
                    open={openDeleteModal} 
                    setOpenDeleteModal={setOpenDeleteModal}
                    user={dataUser}
                />
            </UserContainer>
    )
}