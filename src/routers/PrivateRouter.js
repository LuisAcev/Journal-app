import React from 'react'
import { Navigate } from "react-router-dom"





const PrivateRouter = ( { children, isAuthenticated } ) => {
  

return (isAuthenticated ? 
        children 
        :  <Navigate to="/auth/login" />)
}

export default PrivateRouter