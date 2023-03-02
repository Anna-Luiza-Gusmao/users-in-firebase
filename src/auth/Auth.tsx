import { useLocation, Navigate, Outlet } from "react-router-dom"
import { useContext } from "react"
import { UsersContext } from "../context/users"

export const Auth = () => {
  const { auth } = useContext(UsersContext)
  const location = useLocation()

  return (auth === 'administrador' || auth === 'supervisor') ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  )
}