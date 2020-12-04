import React, { useContext, useState, useEffect } from 'react';
import { UsuarioContext } from "../../contexts/UsuarioContext";
import { CursosContext } from "../../contexts/CursosContext";
import axios from 'axios';
import { useForm } from 'react-hook-form';
import Alert from 'react-bootstrap/Alert';

export default function Alumnos() {
    const [usuario, setUsuario] = useContext(UsuarioContext);
    const { register, handleSubmit, errors } = useForm();
    const [mensajeError, setMensajeError] = useState("");
    const [alumnos, setAlumnos] = useState([{ nombre: "", email: "" }]);
    const [cursoSeleccionado, setCursoSeleccionado] = useState('');
    //const [idCursoSeleccionado, idCursoSeleccionado] = useState(0);
    const [cursos, obtenerCursos] = useContext(CursosContext);

    const mostrarMensajeError = () => {
        setMensajeError("Error al agregar alumno");
    }

    const prepararAlumnosFiltrados = (datos) => {
        var cursoSeleccionadoLocal = '';
        if (cursoSeleccionado.length == 0) {
            if (cursos.length > 0) {
                cursoSeleccionadoLocal = cursos[0]._id;
            }
        } else {
            cursoSeleccionadoLocal = cursoSeleccionado;
        }
        var registro = [];
        if (cursos != undefined && cursos.length > 0) {
            const cursoLocalSeleccionado = cursos.find((curso) => curso._id == cursoSeleccionadoLocal);
            const alumnosRegistrados = cursoLocalSeleccionado.alumnos;
            const nombresAlumnosRegistrados = [];
            alumnosRegistrados.forEach(element => {
                nombresAlumnosRegistrados.push(element.nombre);
            });
            datos.forEach(element => {
                if (!nombresAlumnosRegistrados.includes(element.nombre)) {
                    registro.push({ nombre: element.nombre, email: element.email });
                }
            });
        }
        return registro;
    }

    const establecerAlumnosCursos = () => {
        if (cursoSeleccionado != '') {
            const idCursoSeleccionado = cursoSeleccionado;
            const cursoEncontrado = cursos.find(curso => curso._id == idCursoSeleccionado);
            const arregloAlumnosFormateados = (cursoEncontrado.alumnos);
            const clonAlumnos = [...arregloAlumnosFormateados];
            setAlumnos(clonAlumnos);
        } else {
            if (cursos.length > 0) {
                const cursoEncontrado = cursos[0];
                const arregloAlumnosFormateados = (cursoEncontrado.alumnos);
                const clonAlumnos = [...arregloAlumnosFormateados];
                setAlumnos(clonAlumnos);
            }

        }
    }

    const verificarDatos = (cur, alu) => {
        if (alu.length == 0) return false;
        if (cur.length == 0) return false;
        return true;
    }

    const onSubmit = (data) => {
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
            console.log(alumnos);
        }

        const registarAlumnoEnCurso = async (idCurso, arregloAlumnos) => {
            axios.put('http://localhost:5000/cursos/agregaAlumnos', { "curso": idCurso, "alumnos": JSON.stringify(arregloAlumnos) })
                .then(res => {
                    console.log(res);
                    obtenerCursos();
                    setShow(true);
                })
                .catch(e => {
                    console.log(e);
                    console.log("Error en registrar alumno en curso");
                    mostrarMensajeError();
                });
        }

        registarAlumnoEnCurso(cursoSeleccionadoLocal, prepararAlumnosFiltrados(alumnos));

        console.log(alumnos);

        const borrarCampos = () => {
            document.getElementById("forma-alumnos").reset();
        }
    }

    const agregarAlumno = () => {
        if (alumnos.length < 40) {
            establecerAlumnos({ nombre: '', email: '' });
        } else {
            console.log("Demasiados alumnos");
        }
    }

    const establecerAlumnos = (alum) => {
        const copia = [...alumnos, alum];
        setAlumnos(copia);
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

    const handleBlur = (tags, tipo) => (event) => {
        const copia = alumnos;
        if (tipo == 0) {
            const nombre = event.target.value;
            copia[tags].nombre = nombre;
        } else {
            const email = event.target.value;
            copia[tags].email = email;
        }
        setAlumnos(copia);
    }

    const handleChange = (event) => {
        const cursoId = event.target.value;
        if (cursoId != cursoSeleccionado) {
            setCursoSeleccionado(cursoId);
        }
    }

    const RegistroAlumnos = () => {
        return (
            <div>{
                alumnos.map((alumno, idx) =>
                    <div key={idx} className="form-group d-flex flex-row justify-content-between">
                        <input
                            type="text"
                            placeholder="Nombre Alumno"
                            className="form-control box"
                            onBlur={handleBlur(idx, 0)}
                            id={`nombre-${idx}`}
                            defaultValue={alumno.nombre}
                            name="nombre"
                            ref={register({ required: "*Nombre requerido", minLength: { value: 1, message: "Mínimo 1 caracteres." } })}
                        ></input>
                        {errors.nombre && <p className="error">{errors.nombre.message}</p>}
                        <input
                            type="text"
                            placeholder="alumno@itson.edu.mx"
                            className="form-control box"
                            onBlur={handleBlur(idx, 1)}
                            id={`email-${idx}`}
                            defaultValue={alumno.email}
                            name="email"
                            ref={register({ required: "*Correo requerido", pattern: { value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, message: "Correo invalido" } })}
                        ></input>
                        {errors.email && <p className="error">{errors.email.message}</p>}
                    </div>
                )}</div>
        );
    }

    useEffect(RegistroAlumnos, [alumnos]);
    useEffect(establecerAlumnosCursos, [cursoSeleccionado]);

    return (
        <div className="wrap">
            <div className="formulario">
                <h1 className="alumno">Registro de alumnos en curso</h1>
                <form id="forma-alumnos" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group d-flex flex-column justify-content-center">
                        <select value={cursoSeleccionado} onChange={handleChange} className="form-control box">
                            {cursos.map((curso, idx) => (
                                <option key={curso._id} value={curso._id}>{curso.nombre}</option>
                            ))}
                        </select>
                    </div>

                    <RegistroAlumnos />

                    <div className="form-group d-flex flex-column justify-content-center s-alumno">
                        {/* <input type="submit" value="Registrar alumno" className="btn btn-secondary"></input> */}
                        <button type="button" onClick={agregarAlumno} className="btn btn-light">Añadir alumno</button>
                    </div>

                    <div className="form-group d-flex flex-column justify-content-center s-alumno">
                        <input type="submit" value="Registrar alumnos" className="btn btn-dark"></input>
                    </div>
                </form>
                <p className="error">{mensajeError}</p>
                <AlertaExito />
            </div>
        </div>
    );

}