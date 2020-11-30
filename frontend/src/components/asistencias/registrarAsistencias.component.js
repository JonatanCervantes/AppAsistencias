import React, { useState, useContext, useEffect, useRef } from 'react';
import Form from 'react-bootstrap/Form'
import { UsuarioContext } from "../../contexts/UsuarioContext";
import { CursosContext } from "../../contexts/CursosContext";

import Button from 'react-bootstrap/Button';

import { useForm } from 'react-hook-form';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';

import { cargarCsv } from './csvParser';
import { filtrarDatos } from './filtrarDatosAsistencia';

import { Calendar } from './calendar.component';
import "react-datepicker/dist/react-datepicker.css";

export default function Asistencias() {
    const [usuario, setUsuario] = useContext(UsuarioContext);
    const [cursos, setCursos] = useContext(CursosContext);
    const [alumnos, setAlumnos] = useState([]);
    const { register, handleSubmit, errors } = useForm();
    const [cursoSeleccionado, setCursoSeleccionado] = useState('');
    const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date());
    const [nuevaFechaCsv, setNuevaFechaCsv] = useState(new Date());
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

    // const seleccionarCurso = new Promise((resolve, reject) => {
    //     if (cursos.length > 0) {
    //         setCursoSeleccionado(cursos[0]._id);
    //         resolve(true);
    //     } else {
    //         resolve(false);
    //     }
    // })

    const onSubmit = (data) => {
        const realizarVerificacion = () => {
            if (!verificarDatos(cursoSeleccionado, alumnos)) {
                console.log("Datos invalidos");
                mostrarMensajeError();
                return false;
            }
            return true;
        }

        if (!realizarVerificacion()) return;

        const registro = prepararArreglo(alumnos);
        const asistencia = {
            "idCurso": cursoSeleccionado,
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
            establecerAlumnos({ nombre: '', asistencia: false });
        } else {
            console.log("Demasiados alumnos");
        }
    }

    const establecerAlumnos = (alum) => {
        const copia = [...alumnos, alum];
        setAlumnos(copia);
    }

    const establecerAlumnosArreglo = (arregloAlumnosImportados) => {
        var copia = alumnos;
        copia = copia.concat(arregloAlumnosImportados);
        setAlumnos(copia);
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
        const cursoId = event.target.value;
        if (cursoId != cursoSeleccionado) {
            setCursoSeleccionado(cursoId);
        }
    }

    const handleChangeFecha = (nuevoValor) => {
        setFechaSeleccionada(nuevoValor);
    }

    const handleFileUpload = async (e) => {
        const reader = new FileReader();
        reader.onload = async (e) => {
            const text = (e.target.result);
            cargarCsv(text)
                .then((data) => {
                    filtrarDatos(data).then((respuesta) => {
                        encontrarCursoCoincidencia(respuesta.curso);
                        setFechaSeleccionada(respuesta.fecha);
                        establecerAlumnosArreglo(respuesta.alumnos);
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        };
        reader.readAsText(e.target.files[0]);
    }

    const encontrarCursoCoincidencia = (nombreCurso) => {
        for (var i = 0; i < cursos.length; i++) {
            if (cursos[i].nombre.trim() == nombreCurso) {
                setCursoSeleccionado(cursos[i]._id);
            }
        }
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
        
        <div className=" formulario  col-sm-112 my-14 table-dark">
            <h1>Registro de asistencias</h1>
            <Form onSubmit={handleSubmit(onSubmit)} id="forma-asistencias" ref={refForm}>
                <Form.Group id="seleccionar-curso">
                    <Form.Label>Curso</Form.Label>
                    <select value={cursoSeleccionado} onChange={handleChange} >
                        {cursos.map((curso, idx) => (
                            <option key={curso._id} value={curso._id}>{curso.nombre}</option>
                        ))}
                    </select>
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
                <Calendar value={fechaSeleccionada} onChange={handleChangeFecha} nuevaFechaCsv={nuevaFechaCsv} />
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
                        <Form.File.Input type="file" accept=".csv" onChange={handleFileUpload} />
                    </Form.File>
                </div>

                <div className="form-group d-flex flex-column justify-content-center">
                    <input type="submit" value="Registrar asistencia" className="btn btn-secondary"></input>
                </div>

                <p className="error">{mensajeError}</p>
                <AlertaExito />
            </Form>
        </div>
        
    )

}



