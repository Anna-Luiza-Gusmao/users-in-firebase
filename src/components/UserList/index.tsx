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
});

export function UserList() {
    const [userList, setUserList] = useState<DataUser[]>([])
    const allUsers = collection(firestore, "users")

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

    useEffect(() => {
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
                                        userList.map((user) => (
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
                    <Pagination count={5} shape="rounded" color="primary"/>
                </ThemeProvider>
            </TableContainer>
        </UserContainer>
    )
}