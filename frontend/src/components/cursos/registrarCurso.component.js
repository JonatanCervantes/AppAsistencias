import React, {useContext, useState} from 'react';
import {UsuarioContext} from "../../contexts/UsuarioContext";
import axios from 'axios';
import {useForm} from 'react-hook-form';
import Alert from 'react-bootstrap/Alert';



export default function Cursos () {
    const [usuario, setUsuario] = useContext(UsuarioContext);
    const {register, handleSubmit, errors} = useForm();  
    const [mensajeError, setMensajeError] = useState("");

    const mostrarMensajeError = ()=>{
        setMensajeError("Error al agregar curso");
    }

    const onSubmit = (data) => {        
        const curso = {
            "semestre":data.semestre,
            "nombre":data.nombre,
            "clave":data.clave,
            "unidades":data.unidades,
        }        
        const registarCurso = ()=>{
            axios.post('http://localhost:5000/cursos/add', curso)
            .then(res => {                
                console.log(res);
                asignarCursoAUsuario(usuario._id, res);          
            })
            .catch(e => {
                console.log(e);
                mostrarMensajeError();
            });
        }       

        const asignarCursoAUsuario = async (idUsuario,res)=>{
            axios.post('http://localhost:5000/usuarios/relCurso', {"usuario":idUsuario, "curso":res})
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
            document.getElementById("forma-cursos").reset();
        }
        
        registarCurso(); 
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
                <h1>Registro de nuevo curso</h1>
                <form id="forma-cursos" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group d-flex flex-column justify-content-center">
                        <input 
                            type="text" 
                            placeholder="Semestre: Ago-Dic 2020" 
                            className="form-control box" 
                            name="semestre"
                            ref={register({required:"*Semestre requerido", minLength:{value:6, message:"Min 6 caracteres"}, maxLength:{value:20, message:"Max 20 caracteres"}})}
                        ></input>
                        {errors.semestre && <p className="error">{errors.semestre.message}</p>}
                        <input 
                            type="text" 
                            placeholder="Nombre: Programacion I" 
                            className="form-control box" 
                            name="nombre"
                            ref={register({required:"*Nombre requerido", minLength:{value:4, message:"Min 4 caracteres"}, maxLength:{value:20, message:"Max 20 caracteres"}})}
                        ></input>
                        {errors.nombre && <p className="error">{errors.nombre.message}</p>}
                        <input 
                            type="text" 
                            placeholder="Clave: PRO-1234" 
                            className="form-control box" 
                            name="clave"
                            ref={register({required:"*Clave requerida", minLength:{value:4, message:"Min 4 caracteres"}, maxLength:{value:15, message:"Max 15 caracteres"}})}
                        ></input>
                        {errors.clave && <p className="error">{errors.clave.message}</p>}
                        <input 
                            type="number" 
                            placeholder="Unidades: 3" 
                            className="form-control box" 
                            name="unidades"
                            ref={register({required:"*Unidades requeridas", maxLength:{value:1, message:"Unidades no mayor a 10"}})}
                        ></input>
                        {errors.unidades && <p className="error">{errors.unidades.message}</p>}
                    </div>
                    <div className="form-group d-flex flex-column justify-content-center">
                        <input type="submit" value="Registrar curso" className="btn btn-dark"></input>
                    </div>
                </form>
                <p className="error">{mensajeError}</p>
                <AlertaExito />
            </div>            
        </div>
    );
    
}