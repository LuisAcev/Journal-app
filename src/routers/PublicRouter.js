import React  from 'react'

import { Navigate } from "react-router-dom"


export const PublicRouter = ({ children, isAuthenticated}) => {


    return (isAuthenticated ? 
        <Navigate to="/" /> // "/" me redirecciona a las rutas privadas osea el journal 
        :  children ) // el hijo de esta seccion me mantiene en <AuthRouter /> que es el componente de login y register 
}
