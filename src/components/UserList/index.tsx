import { firestore } from "../../firebase/config"
import { TableContainer, TableUsers, UserContainer } from "./styles"
import { Loader } from "../../components/Loader"
import { collection } from "@firebase/firestore"
import { getDocs } from "firebase/firestore"
import { useEffect, useState } from "react"
import { Pagination, ThemeProvider, createTheme } from "@mui/material"

interface DataUser {
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
        if(value === page) {
            return
        }else{
            if (value < page) {
                setNextPage(nextPage - 5)
            }else{
                setNextPage(value * 5)
            } 

            setPage(value)
    
            if(value === 1) {
                setCurrentPage(0)
            }else{
                setCurrentPage(page * 5)
            }
        }
    }
    const totalPages = Math.ceil(userList.length / 5)
    const newUserList = userList.slice(currentPage, nextPage)

    console.log(currentPage, '-', nextPage)

    useEffect(() => {
    }, [page])
     
    useEffect(() => {
        async function loadUsers() {
            let arrayUserList: DataUser[] = []
            const querySnapshot = await getDocs(allUsers)
            querySnapshot.forEach((doc) => {
                arrayUserList.push({
                    name: doc.data().name,
                    email: doc.data().email,
                    typeUser: doc.data().typeUser
                })
            })
            setUserList(arrayUserList)
        }

        loadUsers()
    }, [])

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
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        newUserList.map((user) => (
                                            <tr key={user.email}>
                                                <td>{user.name}</td>
                                                <td>{user.email}</td>
                                                <td>{user.typeUser}</td>
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
                    />
                </ThemeProvider>
            </TableContainer>
        </UserContainer>
    )
}