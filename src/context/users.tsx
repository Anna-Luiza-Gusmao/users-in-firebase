import { ReactNode, createContext, useEffect, useState } from 'react'

interface UsersContextType {
    auth: string,
    setAuth: React.Dispatch<React.SetStateAction<string>>,
    adminPermission: string
}

export const UsersContext = createContext({} as UsersContextType)

interface UsersContextProviderProps {
    children: ReactNode
}

export function UsersContextProvider({ children }: UsersContextProviderProps) {
    const userPermission = localStorage.getItem('user-permission')
    let emptyPermission = ''
    if(userPermission != null) emptyPermission = userPermission
    const [auth, setAuth] = useState(emptyPermission)
    const [adminPermission, setAdminPermission] = useState('none')

    useEffect(() => {
        function verifyAdminPermission() {
            if(auth === 'administrador') {
                setAdminPermission('flex')
            }else{
                setAdminPermission('none')
            }
        }
        verifyAdminPermission()
    }, [auth])

    return (
        <UsersContext.Provider value={{
            auth,
            setAuth,
            adminPermission
        }}
        >
            {children}
        </UsersContext.Provider>
    )
}