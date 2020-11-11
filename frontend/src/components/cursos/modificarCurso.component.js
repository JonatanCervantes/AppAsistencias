import React, {useState} from 'react';
import axios from 'axios';
import {useForm} from 'react-hook-form'
import Alert from 'react-bootstrap/Alert';

export default function Cursos (props) {
    const {register, handleSubmit, errors} = useForm();  
    const [mensajeError, setMensajeError] = useState("");

    const curso = props.location.state.curso;
    const semestre = props.location.state.semestre;
    const nombre = props.location.state.nombre;
    const clave = props.location.state.clave;
    const unidades = props.location.state.unidades;

    const mostrarMensajeError = ()=>{
        setMensajeError("Error al modificar curso");
    }

    const onSubmit  = (datos) => {         
        
        const modificarCurso = ()=>{
            axios.put('http://localhost:5000/cursos/modificar', {
                data:{
                    curso:curso,
                    semestre: datos.semestre,
                    nombre: datos.nombre,
                    clave: datos.clave,
                    unidades: datos.unidades,
                }
            })
            .then(res => {                
                console.log(res);  
                setShow(true);                       
            })
            .catch(e => {
                console.log(e);
                mostrarMensajeError();
            });
        }       
        
        modificarCurso(); 
    }

    const [show, setShow] = useState(false);
    function AlertaExito() {      
        if (show) {
          return (
            <Alert variant="success" onClose={() => setShow(false)} dismissible>
              <Alert.Heading>Modificación exitosa</Alert.Heading>
            </Alert>
          );
        }
        return(<div></div>);
    }

    return (
        <div className="wrap">
            <div className="formulario">
                <h1>Modificación de curso</h1>
                <form id="forma-cursos" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group d-flex flex-column justify-content-center">
                        <input 
                            type="text" 
                            defaultValue={semestre}
                            className="form-control box" 
                            name="semestre"
                            ref={register({required:"*Semestre requerido", minLength:{value:6, message:"Min 6 caracteres"}, maxLength:{value:20, message:"Max 20 caracteres"}})}
                        ></input>
                        {errors.semestre && <p className="error">{errors.semestre.message}</p>}
                        <input 
                            type="text" 
                            defaultValue={nombre}
                            className="form-control box" 
                            name="nombre"
                            ref={register({required:"*Nombre requerido", minLength:{value:4, message:"Min 4 caracteres"}, maxLength:{value:20, message:"Max 20 caracteres"}})}
                        ></input>
                        {errors.nombre && <p className="error">{errors.nombre.message}</p>}
                        <input 
                            type="text" 
                            defaultValue={clave}
                            className="form-control box" 
                            name="clave"
                            ref={register({required:"*Clave requerida", minLength:{value:4, message:"Min 4 caracteres"}, maxLength:{value:15, message:"Max 15 caracteres"}})}
                        ></input>
                        {errors.clave && <p className="error">{errors.clave.message}</p>}
                        <input 
                            type="number" 
                            defaultValue={unidades} 
                            className="form-control box" 
                            name="unidades"
                            ref={register({required:"*Unidades requeridas", maxLength:{value:1, message:"Unidades no mayor a 10"}})}
                        ></input>
                        {errors.unidades && <p className="error">{errors.unidades.message}</p>}
                    </div>
                    <div className="form-group d-flex flex-column justify-content-center">
                        <input type="submit" value="Modificar curso" className="btn btn-primary"></input>
                    </div>
                </form>
                <p className="error">{mensajeError}</p>
                <AlertaExito/>
            </div>

            
        </div>
    );
    
}