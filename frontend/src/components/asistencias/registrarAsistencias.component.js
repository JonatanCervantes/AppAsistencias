import React, { useState, useContext, useEffect, useRef } from 'react';
import Form from 'react-bootstrap/Form'
import { UsuarioContext } from "../../contexts/UsuarioContext";
import { CursosContext } from "../../contexts/CursosContext";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from 'date-fns/locale/es';
import Button from 'react-bootstrap/Button';

import { useForm } from 'react-hook-form';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';

const Calendar = (props) => {
    const [fechaSeleccionada, setFechaSeleccionada] = useState(props.value);
    const handleChange = (date, event) => {
        setFechaSeleccionada(date);
        props.onChange(date);
    }

    return (
        <DatePicker
            selected={fechaSeleccionada}
            onChange={(date, e) => handleChange(date, e)}
            locale={es}
            showTimeSelect
            timeFormat='p'
            timeCaption="Hora"
            dateFormat="dd/MM/yyyy h:mm aa"
            name="fecha"
        />
    );
};

export default function Asistencias() {
    const [usuario, setUsuario] = useContext(UsuarioContext);
    const [cursos, setCursos] = useContext(CursosContext);
    const [alumnos, setAlumnos] = useState([]);
    const { register, handleSubmit, errors } = useForm();
    const [cursoSeleccionado, setCursoSeleccionado] = useState('');
    const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date());
    const refForm = useRef(null);

    const prepararArreglo = (datos) => {
        var registro = [];
        datos.map(alumno => registro.push([alumno.nombre, alumno.asistencia]));
        return registro;
    }

    const verificarDatos = (cur, alu) => {
        if (alu.length == 0) return false;
        if (cur.length == 0) return false;

        return true;
    }

    const seleccionarCurso = new Promise((resolve, reject) => {
        if (cursos.length > 0 && cursoSeleccionado == '') {
            setCursoSeleccionado(cursos[0]._id);
            console.log(cursos[0]._id);
            resolve(true);
        } else {
            resolve(false);
        }
    })

    const onSubmit = (data) => {
        const realizarVerificacion = () => {
            if (!verificarDatos(cursoSeleccionado, alumnos)) {
                console.log("Datos invalidos");
                mostrarMensajeError();
                return;
            }
        }

        seleccionarCurso.then(realizarVerificacion);

        const registro = prepararArreglo(alumnos);
        const asistencia = {
            "curso": cursoSeleccionado,
            "fecha": fechaSeleccionada,
            "registro": registro,
        }
        console.log(asistencia);

        const registrarAsistencia = () => {
            axios.post('http://localhost:5000/asistencias/add', asistencia)
                .then(res => {
                    setShow(true);
                    console.log(res);
                })
                .catch(e => {
                    mostrarMensajeError();
                    console.log(e);
                });
        }
        registrarAsistencia();
    }

    const [show, setShow] = useState(false);
    function AlertaExito() {
        if (show) {
            return (
                <Alert variant="success" onClose={() => setShow(false)} dismissible>
                    <Alert.Heading>Registro exitoso</Alert.Heading>
                </Alert>
            );
        }
        return (<div></div>);
    }
    const [mensajeError, setMensajeError] = useState("");
    const mostrarMensajeError = () => {
        setMensajeError("Error al agregar curso");
    }

    const agregarAlumno = () => {
        if (alumnos.length < 40) {
            establecerAlumnos({
                nombre: '',
                asistencia: false
            });
        } else {
            console.log("Demasiados alumnos");
        }
    }

    const establecerAlumnos = (alum) => {
        const copia = [...alumnos, alum];
        setAlumnos(copia);
        console.log(alumnos);
    }

    const handleBlur = (tags, tipo) => (event) => {
        const copia = alumnos;
        if (tipo == 0) {
            const nombre = event.target.value;
            copia[tags].nombre = nombre;
        } else {
            var asistencia = false;
            if (event.target.checked) {
                asistencia = true;
            }
            copia[tags].asistencia = asistencia;
        }
        setAlumnos(copia);
    }

    const handleChange = (event) => {
        console.log(event.target.value);
        setCursoSeleccionado(cursos[event.target.value]._id);
    }

    const handleChangeFecha = (nuevoValor) => {
        setFechaSeleccionada(nuevoValor);
    }

    const RegistroAlumnos = () => {
        return (
            <tbody>{
                alumnos.map((alumno, idx) =>
                    <tr key={idx} >
                        <td>
                            <Form.Control
                                type="text"
                                className="form-control box"
                                onBlur={handleBlur(idx, 0)}
                                id={`text-${idx}`}
                                defaultValue={alumno.nombre}
                            />
                        </td>
                        <td>
                            <Form.Check
                                custom
                                id={`checkbox-${idx}`}
                                onBlur={handleBlur(idx, 1)}
                                defaultChecked={alumno.asistencia}
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
            <Form onSubmit={handleSubmit(onSubmit)} id="forma-asistencias" ref={refForm}>
                <Form.Group id="seleccionar-curso">
                    <Form.Label>Curso</Form.Label>
                    <Form.Control onChange={handleChange} as="select" custom>
                        {cursos.map((curso, idx) =>
                            <option key={curso._id} value={idx}>{curso.nombre}</option>
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
                <Calendar value={fechaSeleccionada} onChange={handleChangeFecha} />
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

                <br />
                <br />

                <div className="mb-3">
                    <Form.File id="formcheck-api-regular">
                        <Form.File.Label>Generar asistencia con CSV</Form.File.Label>
                        <Form.File.Input />
                    </Form.File>
                </div>

                <div className="form-group d-flex flex-column justify-content-center">
                    <input type="submit" value="Registrar asistencia" className="btn btn-dark"></input>
                </div>

                <p className="error">{mensajeError}</p>
                <AlertaExito />
            </Form>
        </div>
    )

}



