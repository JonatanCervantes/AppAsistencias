import React, { useContext, useState, useEffect } from 'react';
import { UsuarioContext } from "../../contexts/UsuarioContext";
import { CursosContext } from "../../contexts/CursosContext";
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import eliminar from '../../assets/delete.png';
import ver from '../../assets/lookup.png';
import editar from '../../assets/edit.png';

export default function Cursos(props) {
    const [usuario, setUsuario] = useContext(UsuarioContext);
    const [cursos, obtenerCursos] = useContext(CursosContext);

    const history = useHistory();

    const eliminarCurso = (idCurso) => {
        console.log('eliminar');
        axios.delete('http://localhost:5000/cursos/eliminar/', {
            data: {
                usuario: usuario._id,
                curso: idCurso
            }
        })
            .then(res => {
                console.log(res);
                obtenerCursos();
            })
            .catch(e => {
                console.log(e);
            })
    }

    const modificarCurso = (_id, _semestre, _nombre, _clave, _unidades) => {
        history.push({
            pathname: '/cursos/modificar',
            state: {
                curso: _id,
                semestre: _semestre,
                nombre: _nombre,
                clave: _clave,
                unidades: _unidades,
            }
        });
    }

    const verCurso = () => {
        console.log('Ver curso');
    }

    return (
        <div table className=" container formulario table table-dark" >
            <h1>Cursos registrados: </h1>

            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Período</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Clave</th>
                        <th scope="col">Unidades</th>
                        <th scope="col" colSpan="3">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        cursos.map((curso, idx) => {
                            return (
                                <tr key={idx}>
                                    <th scope="row">{curso.semestre}</th>
                                    <td>{curso.nombre}</td>
                                    <td>{curso.clave}</td>
                                    <td>{curso.unidades}</td>
                                    <td className="button" id="btnDelete"><img src={eliminar} width="25px" alt="Eliminar" onClick={() => eliminarCurso(curso._id)} /></td>
                                    <td className="button" id="btnLookup"><button><img src={ver} width="25px" alt="Ver" onClick={() => verCurso()} /></button></td>
                                    <td className="button" id="btnEdit"><img src={editar} width="25px" alt="Editar" onClick={() => modificarCurso(curso._id, curso.semestre, curso.nombre, curso.clave, curso.unidades)} /></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>

        </div>
    );

}