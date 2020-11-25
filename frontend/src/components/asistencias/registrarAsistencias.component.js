import React, { useState, useContext, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Form from 'react-bootstrap/Form'
import { UsuarioContext } from "../../contexts/UsuarioContext";
import { CursosContext } from "../../contexts/CursosContext";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from 'date-fns/locale/es';
import Button from 'react-bootstrap/Button';
import { useForm } from 'react-hook-form'

const Calendar = () => {
    const [startDate, setStartDate] = useState(new Date());
    return (
        <DatePicker
            selected={startDate}
            onChange={date => setStartDate(date)}
            locale={es}
            showTimeSelect
            timeFormat='p'
            timeCaption="Hora"
            dateFormat="dd/MM/yyyy h:mm aa"
        />
    );
};

export default function Asistencias() {
    const [usuario, setUsuario] = useContext(UsuarioContext);
    const [cursos, setCursos] = useContext(CursosContext);
    const [alumnos, setAlumnos] = useState([{
        nombre: 'Pepe',
        asistencia: true
    }]);

    const agregarAlumno = () => {
        establecerAlumnos({
            nombre: `NuevoAlumno${alumnos.length}`,
            asistencia: false
        });
    }

    const establecerAlumnos = (alum) => {
        const copia = [...alumnos, alum];

        setAlumnos(copia);
        console.log(alumnos);
    }

    const handleChange = (e) => {
        const nombre = e.target.value;
        console.log(nombre);

    }

    const RegistroAlumnos = () => {
        return (
            <tbody>{
                alumnos.map((alumno, idx) =>
                    <tr key={idx}>
                        <td>
                            <Form.Control
                                type="text"
                                className="form-control box"
                            />
                        </td>
                        <td>
                            <Form.Check
                                custom
                                id={`checkbox-${alumno.nombre}`}

                            />
                        </td>
                    </tr>
                )}</tbody>
        );
    }

    useEffect(RegistroAlumnos, [alumnos]);

    return (
        <div>
            <h1>Registro de asistencias</h1>
            <Form>
                <Form.Group id="seleccionar-curso">
                    <Form.Label>Curso</Form.Label>
                    <Form.Control as="select" custom>
                        <option>Seleccione un curso...</option>
                        {cursos.map((curso, idx) =>
                            <option key={curso._id}>{curso.nombre}</option>
                        )}
                    </Form.Control>
                </Form.Group>



                <Form.Group id="seleccionar-grupo">
                    <Form.Label>Grupo</Form.Label>
                    <Form.Control as="select" custom>
                        <option>Seleccione un grupo...</option>
                    </Form.Control>
                </Form.Group>



                <Form.Group id="seleccionar-unidad">
                    <Form.Label>Unidad</Form.Label>
                    <Form.Control as="select" custom>
                        <option>Seleccione una unidad...</option>
                    </Form.Control>
                </Form.Group>


                <Form.Label>Fecha</Form.Label>
                <br />
                <Calendar />
                <br />
                <br />

                <h3>Registro</h3>

                <table className="table" id="tablaRegistro">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Alumno</th>
                            <th scope="col">Asistencia</th>
                        </tr>
                    </thead>
                    <RegistroAlumnos />
                </table>
                <Button onClick={agregarAlumno} variant="dark">Aniadir alumno</Button>

                <div className="mb-3">
                    <Form.File id="formcheck-api-regular">
                        <Form.File.Label>Generar asistencia con CSV</Form.File.Label>
                        <Form.File.Input />
                    </Form.File>
                </div>
            </Form>
        </div>
    )

}



