import { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Auth } from '../auth/Auth'
import { UsersContext } from '../context/users'
import { AdminPage } from '../pages/Admin'
import { LoginPage } from '../pages/Login'
import { UsersPage } from '../pages/Users'
import { AddUsers } from '../pages/AddUsers'
import { Dashboard } from '../pages/Dashboard'
import { NotAuthorized } from '../pages/NotAuthorized'

export function Routers () {
    const { auth } = useContext(UsersContext)

    return (
        <Routes>
            <Route path='/' element={<LoginPage />}/>
            <Route element={<Auth />}>
                <Route path='/user' element={
                    (auth === 'administrador') ? <AdminPage /> 
                        : <UsersPage />
                }/>
                <Route path='/user/register' element={
                    (auth === 'administrador') ? <AddUsers /> 
                        : <NotAuthorized />
                }/>
                <Route path='/user/dashboard' element={<Dashboard />}/>
            </Route>
        </Routes>
    )
}