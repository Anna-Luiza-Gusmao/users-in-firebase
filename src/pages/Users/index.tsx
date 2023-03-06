import { collection } from "@firebase/firestore"
import { getDocs } from "firebase/firestore"
import { useEffect, useState } from "react"
import { NavBar } from "../../components/NavBar"
import { firestore } from "../../firebase/config"
import { TableUsers, UserContainer } from "./styles"
import { Loader } from "../../components/Loader"

interface DataUser {
    name: string,
    email: string,
    typeUser: string
}

export function UsersPage() {
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
        <>
            <NavBar />
            <UserContainer>
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
            </UserContainer>
        </>
    )
}