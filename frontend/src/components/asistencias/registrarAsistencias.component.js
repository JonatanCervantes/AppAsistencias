import React, { useState, useContext, useEffect, useRef } from 'react';
import Form from 'react-bootstrap/Form'
import { UsuarioContext } from "../../contexts/UsuarioContext";
import { CursosContext } from "../../contexts/CursosContext";
import { AsistenciasContext } from "../../contexts/AsistenciasContext";

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
    const [cursos, obtenerCursos] = useContext(CursosContext);
    const [asistencias, obtenerAsistencias] = useContext(AsistenciasContext);
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

    const prepararArregloCorreos = (datos) => {
        var registro = [];
        if (cursos != undefined && cursos.length > 0) {
            const cursoLocalSeleccionado = cursos.find((curso) => curso._id == cursoSeleccionado);
            const alumnosRegistrados = cursoLocalSeleccionado.alumnos;
            const nombresAlumnosRegistrados = [];
            alumnosRegistrados.forEach(element => {
                nombresAlumnosRegistrados.push(element.nombre);
            });
            datos.forEach(element => {
                if (!nombresAlumnosRegistrados.includes(element.nombre)) {
                    registro.push({ nombre: element.nombre, email: 'correodefault@gmail.com' });
                }
            });
        }
        return registro;
    }

    const verificarDatos = (cur, alu) => {
        if (alu.length == 0) return false;
        if (cur.length == 0) return false;
        return true;
    }

    const onSubmit = async (data) => {
        var cursoSeleccionadoLocal = '';
        if (cursoSeleccionado.length == 0) {
            if (cursos.length > 0) {
                cursoSeleccionadoLocal = cursos[0]._id;
            }
        } else {
            cursoSeleccionadoLocal = cursoSeleccionado;
        }
        const realizarVerificacion = (cur, alus) => {
            if (!verificarDatos(cur, alus)) {
                console.log("Datos invalidos");
                mostrarMensajeError();
                return false;
            }
            return true;
        }

        if (realizarVerificacion(cursoSeleccionadoLocal, alumnos)) {
            const registro = prepararArreglo(alumnos);
            const asistencia = {
                "idCurso": cursoSeleccionadoLocal,
                "fecha": fechaSeleccionada,
                "registro": registro,
            }
            console.log(asistencia);

            const regisrtarAlumnoEnCurso = async (idCurso, arregloAlumnos) => {
                axios.put('http://localhost:5000/cursos/agregaAlumnos', { "curso": idCurso, "alumnos": JSON.stringify(arregloAlumnos) })
                    .then(res => {
                        console.log(res);
                        obtenerCursos();
                    })
                    .catch(e => {
                        console.log(e);
                        console.log("Error en registrar alumno en curso");
                        mostrarMensajeError();
                    });
            }

            const registrarAsistencia = () => {
                axios.post('http://localhost:5000/asistencias/add', asistencia)
                    .then(res => {
                        setShow(true);
                        obtenerAsistencias();
                        const registroAlumnosCorreo = prepararArregloCorreos(alumnos);
                        regisrtarAlumnoEnCurso(cursoSeleccionadoLocal, registroAlumnosCorreo);
                        console.log(res);
                    })
                    .catch(e => {
                        mostrarMensajeError();
                        console.log(e);
                    });
            }
            registrarAsistencia();
        }
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
        const copiaAlumnos = [...alumnos];
        const copiaAlumnosNombre = [];

        copiaAlumnos.forEach(alumno => {
            copiaAlumnosNombre.push(alumno.nombre);
        });

        arregloAlumnosImportados.forEach(alumnoImportado => {
            if (!copiaAlumnosNombre.includes(alumnoImportado.nombre)) {
                copiaAlumnos.push(alumnoImportado);
            } else {
                copiaAlumnos.forEach(element => {
                    if (element.nombre == alumnoImportado.nombre) {
                        element.asistencia = alumnoImportado.asistencia;
                    }
                });
            }
        });

        setAlumnos(copiaAlumnos);
    }

    const formatearAlumnos = (arregloAlumnos) => {
        const arregloAlumnosFormateados = [];
        arregloAlumnos.forEach(element => {
            arregloAlumnosFormateados.push({ nombre: element.nombre, asistencia: false })
        });
        return arregloAlumnosFormateados;
    }

    const establecerAlumnosCursos = () => {
        if (cursoSeleccionado != '') {
            const idCursoSeleccionado = cursoSeleccionado;
            const cursoEncontrado = cursos.find(curso => curso._id == idCursoSeleccionado);
            const arregloAlumnosFormateados = formatearAlumnos(cursoEncontrado.alumnos);
            const clonAlumnos = [...arregloAlumnosFormateados];
            setAlumnos(clonAlumnos);
        } else {
            if (cursos.length > 0) {
                const cursoEncontrado = cursos[0];
                const arregloAlumnosFormateados = formatearAlumnos(cursoEncontrado.alumnos);
                const clonAlumnos = [...arregloAlumnosFormateados];
                setAlumnos(clonAlumnos);
            }

        }
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

    useEffect(establecerAlumnosCursos, [cursoSeleccionado]);
    useEffect(RegistroAlumnos, [alumnos]);

    return (

        <div className=" container formulario table-dark">
            <h1>Registro de asistencias</h1>
            <Form onSubmit={handleSubmit(onSubmit)} id="forma-asistencias" ref={refForm}>
                <Form.Group id="seleccionar-curso">
                    <Form.Label>Curso</Form.Label>
                    <Form.Control as="select" value={cursoSeleccionado} onChange={handleChange}>
                        {cursos.map((curso, idx) => (
                            <option key={curso._id} value={curso._id}>{curso.nombre}</option>
                        ))}
                    </Form.Control>
                    {/* <select value={cursoSeleccionado} onChange={handleChange} >
                        {cursos.map((curso, idx) => (
                            <option key={curso._id} value={curso._id}>{curso.nombre}</option>
                        ))}
                    </select> */}
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



