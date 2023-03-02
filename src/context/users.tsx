import { ReactNode, createContext, useState } from 'react'

interface UsersContextType {
    auth: string,
    setAuth: React.Dispatch<React.SetStateAction<string>>
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

    return (
        <UsersContext.Provider value={{
            auth,
            setAuth
        }}
        >
            {children}
        </UsersContext.Provider>
    )
}