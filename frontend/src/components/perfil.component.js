import React, {useContext} from 'react';
import {UsuarioContext} from "./auth/UsuarioContext";

export default function Perfil() {    
    const [usuario, setUsuario] = useContext(UsuarioContext);   

    return (
        <div>
            <h1>{usuario.nombre}</h1>
            <h1>{usuario.email}</h1>
            <h1>{usuario._id}</h1>           
        </div>
    );
    
}