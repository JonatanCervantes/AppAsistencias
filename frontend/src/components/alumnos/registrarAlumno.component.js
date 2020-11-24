import React, {useContext, useState} from 'react';
import {UsuarioContext} from "../auth/UsuarioContext";
import axios from 'axios';
import {useForm} from 'react-hook-form';
import Alert from 'react-bootstrap/Alert';

export default function Alumnos () {
    const [usuario, setUsuario] = useContext(UsuarioContext);
    const {register, handleSubmit, errors} = useForm();  
    const [mensajeError, setMensajeError] = useState("");

    const mostrarMensajeError = ()=>{
        setMensajeError("Error al agregar alumno");
    }

    const onSubmit = (data) => {        
        const alumno = {
            "nombre":data.nombre,
            "email":data.email,
        }     

        const registarAlumno = ()=>{
            axios.post('http://localhost:5000/alumnos/add', alumno)
            .then(res => {                
                console.log(res);
                asignarAlumnoAUsuario(usuario._id, res);          
            })
            .catch(e => {
                console.log(e);
                mostrarMensajeError();
            });
        }   
        
        const asignarAlumnoAUsuario = async (idUsuario,res)=>{
            axios.post('http://localhost:5000/usuarios/relAlumno', {"usuario":idUsuario, "alumno":res})
            .then(res => {                
                console.log(res);
                borrarCampos();
                setShow(true);
            })
            .catch(e => {
                console.log(e);
                mostrarMensajeError();
            });
        }   

        const borrarCampos = () => { 
            document.getElementById("forma-alumnos").reset();
        }

        registarAlumno();
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
        return(<div></div>);
    }

    return (
        <div className="wrap">
            <div className="formulario">
                <h1 className="alumno">Registro de nuevo alumno</h1>
                <form id="forma-alumnos" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group d-flex flex-column justify-content-center">
                        <input 
                            type="text" 
                            placeholder="Pedro Picapiedra" 
                            className="form-control box" 
                            name="nombre"
                            ref={register({required:"*Nombre requerido", minLength:{value:6, message:"Mínimo 6 caracteres."}})}
                        ></input>
                        {errors.nombre && <p className="error">{errors.nombre.message}</p>}
                        <input 
                            type="text" 
                            placeholder="alumno@itson.edu.mx" 
                            className="form-control box" 
                            name="email"
                            ref={register({required:"*Correo requerido", pattern: {value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, message:"Correo invalido"}})}    
                        ></input>
                        {errors.email && <p className="error">{errors.email.message}</p>}
                    </div>
                    <div className="form-group d-flex flex-column justify-content-center s-alumno">
                        <input type="submit" value="Registrar alumno" className="btn btn-dark"></input>
                    </div>
                </form>
                <p className="error">{mensajeError}</p>
                <AlertaExito />
            </div>            
        </div>
    );
    
}