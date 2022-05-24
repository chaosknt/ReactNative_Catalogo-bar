import { useContext, useMemo } from "react";
import { useState } from "react";
import React from "react";
import { roles } from "../utils/rols";

const UsuarioContext = React.createContext();

export function UserProvider(props) {

    const [user, setUser] = useState({
        email:'', 
        isLogged:false,
        role: roles.Invitado
    });
    const [isLogged, setIsLogged] = useState(false)
    const [loading, setLoading] = useState(true)

    const value = useMemo(() => {
        return ({
            user, 
            setUser,
            isLogged,
            setIsLogged,
            loading,
            setLoading
        })
    }, [user, loading] )
    
    return <UsuarioContext.Provider value={value} {...props} />

}

export function useUsuario(){
    const context = useContext(UsuarioContext);
    
    if(!context){
        throw new Error("useUsuario debe estar dentro del proveedor UsuarioContext")
    }
    return context;
}