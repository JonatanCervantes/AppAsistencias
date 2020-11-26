import React, { useContext, useState, useEffect } from 'react';
import { UsuarioContext } from "../../contexts/UsuarioContext";
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import eliminar from '../../assets/delete.png';
import ver from '../../assets/lookup.png';
import editar from '../../assets/edit.png';



export default function Alumnos() {
    const [usuario, setUsuario] = useContext(UsuarioContext);
    const [alumnos, setAlumnos] = useState([{}]);

    const history = useHistory();


    const obtenerAlumnos = () => {
        const idUsuario = usuario._id;
        axios.get('http://localhost:5000/alumnos/obtenerAlumnos/', { headers: { authorization: idUsuario } })
            .then(res => {
                console.log(res);
                establecerAlumnos(res.data)
            })
            .catch(e => {
                console.log(e);
            })
    }

    const eliminarAlumno = (idAlumno) => {
        console.log('eliminar');
        axios.delete('http://localhost:5000/alumnos/eliminar/', {
            data: {
                usuario: usuario._id,
                alumno: idAlumno
            }
        })
            .then(res => {
                console.log(res);
                obtenerAlumnos();
            })
            .catch(e => {
                console.log(e);
            })
    }

    const modificarAlumno = (_id, _nombre, _email) => {
        history.push({
            pathname: '/alumnos/modificar',
            state: {
                alumno: _id,
                nombre: _nombre
            }
        });
    }

    const verAlumno = () => {
        console.log('Ver alumno');
    }

    function establecerAlumnos(alumnos) {
        setAlumnos(alumnos);
    }

    //HACER CONTEXT DE CURSOS
    useEffect(obtenerAlumnos, []);

    return (
        <div className="mx-auto" >
            <h1>Alumnos registrados: </h1>

            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Correo</th>
                        <th scope="col" colSpan="3">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        alumnos.map((alumno, idx) => {
                            return (
                                <tr key={idx}>
                                    <th scope="row">{alumno.nombre}</th>
                                    <td>{alumno.email}</td>
                                    <td className="button" id="btnDelete"><img src={eliminar} width="25px" alt="Eliminar" onClick={() => eliminarAlumno(alumno._id)} /></td>
                                    <td className="button" id="btnLookup"><button><img src={ver} width="25px" alt="Ver" onClick={() => verAlumno()} /></button></td>
                                    <td className="button" id="btnEdit"><img src={editar} width="25px" alt="Editar" onClick={() => modificarAlumno(alumno._id, alumno.nombre, alumno.email)} /></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>

        </div>
    );

}