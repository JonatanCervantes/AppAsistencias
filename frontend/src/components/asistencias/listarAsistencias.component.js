import React, { useContext, useState, useEffect } from 'react';
import { UsuarioContext } from "../../contexts/UsuarioContext";
import axios from 'axios';
import { useHistory } from 'react-router-dom';

export default function Asistencias() {
    const [usuario, setUsuario] = useContext(UsuarioContext);
    const [asistencias, setAsistencias] = useState([{}]);

    const history = useHistory();


    const obtenerAsistencias = () => {
        const idUsuario = usuario._id;
        axios.get('http://localhost:5000/asistencias/obtenerAsistencias/', { headers: { authorization: idUsuario } })
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
                        <th scope="col">Asistencias</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        asistencias.map((asistencia, idx) => {
                            return (
                                <tr key={idx}>
                                    <th scope="row">{asistencia.curso}</th>
                                    <td>{asistencia.fecha}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    );

}