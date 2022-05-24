import React, { useState } from 'react'
import LoginScreen from './LoginScreen'
import RegisterScreen from './RegisterScreen'

export const RegisterOrLoginScreen = ( { handleShowLogin } ) => {

    const [register, setRegister] = useState(false)    

    const handleShowRegister = () => {
        setRegister(!register)
    }

    return (
    <>
        {   register && 
            <RegisterScreen  
                handleShowRegister = { handleShowRegister }
                handleShowLogin = { handleShowLogin }
            /> 
        }

        {   !register && 
            <LoginScreen 
                handleShowRegister = { handleShowRegister }
                handleShowLogin = { handleShowLogin } 
            /> 
        }
            
    </>
    )
}
