import React, { useState, createContext, useEffect, useContext } from 'react';
import { UsuarioContext } from './UsuarioContext'
import axios from 'axios';

export const CursosContext = createContext();

export const CursosProvider = (props) => {
    const [usuario, setUsuario] = useContext(UsuarioContext);
    const [cursos, setCursos] = useState([]);

    const obtenerCursos = () => {
        if (usuario != undefined && usuario != null) {
            const idUsuario = usuario._id;
            axios.get('http://localhost:5000/cursos/obtenerCursos/', { headers: { authorization: idUsuario } })
                .then(res => {
                    console.log(res);
                    establecerCursos(res.data)
                })
                .catch(e => {
                    console.log(e);
                })
        }
    }

    function establecerCursos(cursos) {
        setCursos(cursos);
    }

    useEffect(obtenerCursos, [usuario]);

    return (
        <CursosContext.Provider value={[cursos, setCursos]}>
            {props.children}
        </CursosContext.Provider>
    );

}