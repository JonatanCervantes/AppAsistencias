import React, { useContext, useState, useEffect } from 'react';
import { UsuarioContext } from "../../contexts/UsuarioContext";
import { CursosContext } from "../../contexts/CursosContext";
import axios from 'axios';
import { useHistory } from 'react-router-dom';

export default function Asistencias() {
    const [usuario, setUsuario] = useContext(UsuarioContext);
    const [cursos, setCursos] = useContext(CursosContext);
    const [asistencias, setAsistencias] = useState([{}]);

    const history = useHistory();


    const obtenerAsistencias = () => {
        const idUsuario = usuario._id;
        axios.get('http://localhost:5000/asistencias/obtenerAsistencias/', { headers: { authorization: usuario.cursos[0] } })
            .then(res => {
                console.log(res.data);
                establecerAsistencias(res.data);
            })
            .catch(e => {
                console.log(e);
            })
    }

    function establecerAsistencias(asistencias) {
        setAsistencias(asistencias);
    }

    //HACER CONTEXT DE CURSOS
    useEffect(obtenerAsistencias, []);

    return (
        <div className="mx-auto" >
            <h1>Asistencias: </h1>
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Curso</th>
                        <th scope="col">Fecha</th>
                        <th scope="col">Alumno</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        asistencias.map((asistencia, idx) => {
                            return (
                                <tr key={idx}>
                                    <td>{cursos[0].nombre}</td>
                                    <td>{asistencia.fecha}</td>
                                    <td>{asistencia.registro}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    );

}