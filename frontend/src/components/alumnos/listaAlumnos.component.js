import React, { useContext, useState, useEffect } from 'react';
import { UsuarioContext } from "../../contexts/UsuarioContext";
import { CursosContext } from "../../contexts/CursosContext";

export default function Alumnos() {
    const [usuario, setUsuario] = useContext(UsuarioContext);
    const [cursos, obtenerCursos] = useContext(CursosContext);
    const [cursoSeleccionado, setCursoSeleccionado] = useState(0);

    const handleChange = (event) => {
        const cursoId = event.target.value;
        if (cursoId != cursoSeleccionado) {
            setCursoSeleccionado(cursoId);
        }
    }


    function MostrarAlumnos() {
        if (cursos != undefined && cursos.length > 0) {
            return (
                <tbody>{
                    cursos[cursoSeleccionado].alumnos.map((alumno, idx) =>
                        <tr key={idx}>
                            <td>{alumno.nombre}</td>
                            <td>{alumno.email}</td>
                        </tr>
                    )}</tbody>
            )
        } else {
            return null;
        }


    }
    useEffect(MostrarAlumnos, [cursos]);

    return (
        <div className="mx-auto table-dark container table" >
            <div className="form-group d-flex flex-column justify-content-center">
                <select value={cursoSeleccionado} onChange={handleChange} className="form-control box">
                    {cursos.map((curso, idx) => (
                        <option key={curso._id} value={idx}>{curso.nombre}</option>
                    ))}
                </select>
            </div>

            <h1>Alumnos registrados: </h1>

            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Correo</th>
                    </tr>
                </thead>

                <MostrarAlumnos />
            </table>

        </div>
    );

}