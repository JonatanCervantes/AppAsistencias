import React, {useContext} from 'react';
import {UsuarioContext} from "../auth/UsuarioContext";

export default function Cursos () {
    const [usuario, setUsuario] = useContext(UsuarioContext);
    
    return (
        <div>
            <h1>Cursos registrados: </h1>
            <h1>{usuario.nombre}</h1>

        </div>
    );
    
}