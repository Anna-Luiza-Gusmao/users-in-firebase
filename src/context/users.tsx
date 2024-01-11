import { ReactNode, createContext, useEffect, useState } from 'react'

interface UsersContextType {
    auth: string,
    setAuth: React.Dispatch<React.SetStateAction<string>>,
    adminPermission: string,
    adminPermissionInComponents: boolean
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
    const [adminPermissionInComponents, setAdminPermissionInComponents] = useState(false)

    useEffect(() => {
        function verifyAdminPermission() {
            if(auth === 'administrador') {
                setAdminPermission('flex')
                setAdminPermissionInComponents(false)
            }else{
                setAdminPermission('none')
                setAdminPermissionInComponents(true)
            }
        }
        verifyAdminPermission()
    }, [auth])

    return (
        <UsersContext.Provider value={{
            auth,
            setAuth,
            adminPermission,
            adminPermissionInComponents
        }}
        >
            {children}
        </UsersContext.Provider>
    )
}