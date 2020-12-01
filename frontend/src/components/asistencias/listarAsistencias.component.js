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
        //const idUsuario = usuario._id;
        axios.get('http://localhost:5000/asistencias/obtenerAsistencias/', { headers: { authorization: usuario.cursos[1] } })
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
        <div className="mx-auto table-dark" >
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
                            var cursoBuscado = cursos.find(function (asis) { return asis._id == asistencia.idCurso });
                            if (cursoBuscado) {
                                return (
                                    <tr key={idx}>
                                        <td>{cursoBuscado.nombre}</td>
                                        <td>{asistencia.fecha}</td>
                                        {
                                            asistencia.registro.map((reg, idx) => {
                                                return (
                                                    <tr key={idx}>{reg}</tr>
                                                )
                                            })
                                        }
                                    </tr>
                                )
                            }
                        })
                    }
                </tbody>
            </table>
        </div>

    );

}