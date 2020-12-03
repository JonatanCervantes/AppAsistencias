import React, { useContext, useState, useEffect } from 'react';
import { UsuarioContext } from "../../contexts/UsuarioContext";
import { CursosContext } from "../../contexts/CursosContext";
import { AsistenciasContext } from "../../contexts/AsistenciasContext";
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useFieldArray } from 'react-hook-form';
var moment = require('moment-timezone');

export default function Asistencias() {
    const [usuario, setUsuario] = useContext(UsuarioContext);
    const [cursos, setCursos] = useContext(CursosContext);
    const [asistencias, obtenerAsistencias] = useContext(AsistenciasContext);

    const history = useHistory();

    function encontrarCurso(idCurso) {
        const curso = cursos.find(curso => curso._id == idCurso);
        if (curso == undefined) {
            return '';
        } else {
            return curso.nombre;
        }
        /*return curso.nombre;*/
    }

    function transformarFecha(fecha) {
        var fechaActualizada = moment.tz(fecha, "America/Hermosillo").format();
        return fechaActualizada;
    }

    function transformarBoolean(asistencia) {
        if (asistencia) return 'ASISTIO';
        return 'FALTO';
    }

    return (
        <div className="mx-auto table-dark container table" >
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
                                    <td>{encontrarCurso(asistencia.idCurso)}</td>
                                    <td>{transformarFecha(asistencia.fecha)}</td>
                                    {

                                        asistencia.registro.map((reg, idx) => {
                                            return (
                                                <tr key={idx}>
                                                    <td>{reg[0]}</td>
                                                    <td>{transformarBoolean(reg[1])}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>

    );

}