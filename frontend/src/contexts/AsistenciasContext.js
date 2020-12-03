import React, { useState, createContext, useEffect, useContext } from 'react';
import { UsuarioContext } from './UsuarioContext';
import { CursosContext } from './CursosContext';
import axios from 'axios';

export const AsistenciasContext = createContext();

export const AsistenciasProvider = (props) => {
    const [usuario, setUsuario] = useContext(UsuarioContext);
    const [cursos, setCursos] = useContext(CursosContext);
    const [asistencias, setAsistencias] = useState([]);

    const obtenerAsistencias = () => {
        console.log('asistenciascontext');
        console.log(cursos);

        if (cursos != undefined && cursos != null && cursos.length > 0) {
            const idsCursos = [];
            cursos.forEach(element => {
                idsCursos.push(element._id);
            });
            console.log('ids');
            console.log(idsCursos);



            axios.get('http://localhost:5000/asistencias/obtenerAsistencias/', { headers: { authorization: JSON.stringify(idsCursos) } })
                .then(res => {
                    console.log(res.data);
                    establecerAsistencias(res.data);
                })
                .catch(e => {
                    console.log(e);
                })
        }
        // if (usuario != undefined && usuario != null) {
        //     axios.get('http://localhost:5000/asistencias/obtenerAsistencias/', { headers: { authorization: JSON.stringify(usuario.cursos) } })
        //         .then(res => {
        //             console.log(res.data);
        //             establecerAsistencias(res.data);
        //         })
        //         .catch(e => {
        //             console.log(e);
        //         })
        // }
    }

    function establecerAsistencias(asistencias) {
        setAsistencias(asistencias);
    }

    useEffect(obtenerAsistencias, [cursos]);

    //useEffect(obtenerAsistencias, [usuario]);

    return (
        <AsistenciasContext.Provider value={[asistencias, obtenerAsistencias]}>
            {props.children}
        </AsistenciasContext.Provider>
    );

}