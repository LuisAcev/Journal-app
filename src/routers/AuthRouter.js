import React from 'react'
import { Route,  Routes, Navigate } from 'react-router-dom'
import LoginScreen from '../components/auth/LoginScreen'
import {RegisterScreen} from '../components/auth/RegisterScreen'


const AuthRouter = () => {
  return (
         <div className='auth__main'>

            <div className="auth__box-container"> 

    
                <Routes>

                  <Route path= "login" element={<LoginScreen />} />

                  <Route path='register' element={<RegisterScreen />} />

                  <Route path='*' element={<Navigate to="/auth/register" />} /> 

                </Routes>


            </div>

        </div>

  )
}

export default AuthRouter