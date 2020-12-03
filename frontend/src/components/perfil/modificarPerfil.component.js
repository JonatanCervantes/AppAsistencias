import React, { useContext, useState } from 'react';
import { UsuarioContext } from "../../contexts/UsuarioContext";
import axios from 'axios';
import {useForm} from 'react-hook-form';
import Alert from 'react-bootstrap/Alert';

export default function Perfil() {
    const [usuario, setUsuario] = useContext(UsuarioContext);
    const {register, handleSubmit, errors} = useForm();  
    const [mensajeError, setMensajeError] = useState("");
    const mostrarMensajeError = ()=>{
        setMensajeError("Error al modificar perfil");
    }

    const onSubmit  = (datos) => { 
        const modificarUsuario = ()=> {            
            axios.put('http://localhost:5000/usuarios/modificar', {
                data: {
                    usuario: usuario._id,
                    nombre: datos.nombre,
                    id:datos.id,       
                    nomInstitucion: datos.nomInstitucion,
                    nomDepartamento: datos.nomDepartamento,
                    numCubiculo: datos.cubiculo,
                    telefono: datos.telefono,

                }
            })
            .then(res => {
                console.log(res);
                setUsuario(res.data);
                setShow(true);
            })
            .catch(e => {
                console.log(e);
                mostrarMensajeError();
            }); 
        }  

        modificarUsuario();
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
            <div className="container formulario ">
                <h1>Perfil</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group d-flex flex-column justify-content-center">                        
                        <input 
                            type="text" 
                            placeholder="ID: 00000123456"
                            defaultValue={usuario.id} 
                            className="form-control box" 
                            name="id"
                            ref={register({minLength:{value:4, message:"Min 4 caracteres"}, maxLength:{value:20, message:"Max 20 caracteres"}})}
                        ></input>
                        {errors.id && <p className="error">{errors.id.message}</p>}                        
                        <input 
                            type="text" 
                            placeholder="Nombre: Pepito"
                            defaultValue={usuario.nombre} 
                            className="form-control box" 
                            name="nombre"
                            ref={register({required:"*Nombre requerido",  pattern:{value: /^[a-zA-Z\s]+$/, message:"Solo letras"}, minLength:{value:4, message:"Min 4 caracteres"}})}
                        ></input>
                        {errors.nombre && <p className="error">{errors.nombre.message}</p>}                        
                        <input 
                            type="text" 
                            placeholder="Institucion: ITSON"
                            defaultValue={usuario.nomInstitucion} 
                            className="form-control box" 
                            name="nomInstitucion"
                            ref={register({minLength:{value:4, message:"Min 4 caracteres"}, maxLength:{value:20, message:"Max 20 caracteres"}})}
                        ></input>
                        {errors.nomInstitucion && <p className="error">{errors.nomInstitucion.message}</p>}

                        <input 
                            type="text" 
                            placeholder="Departamento: DTSI"
                            defaultValue={usuario.nomDepartamento} 
                            className="form-control box" 
                            name="nomDepartamento"
                            ref={register({minLength:{value:4, message:"Min 4 caracteres"}, maxLength:{value:20, message:"Max 20 caracteres"}})}
                        ></input>
                        {errors.nomDepartamento && <p className="error">{errors.nomDepartamento.message}</p>}

                        <input 
                            type="number"                             
                            placeholder="Cubiculo: 5"
                            defaultValue={usuario.numCubiculo} 
                            className="form-control box" 
                            name="cubiculo"
                            ref={register({max:{value:30, message:"Valor maximo 30"}, min:{value:0, message:"Valor minimo 0"}})}
                        ></input>
                        {errors.cubiculo && <p className="error">{errors.cubiculo.message}</p>}

                        <input 
                            type="text" 
                            placeholder="Telefono: 644 123456"
                            defaultValue={usuario.telefono} 
                            className="form-control box" 
                            name="telefono"
                            ref={register({pattern:{value: /^[0-9\s]+$/, message:"Solo numeros"}, minLength:{value:4, message:"Min 4 caracteres"}, maxLength:{value:15, message:"Max 15 caracteres"}})}
                        ></input>
                        {errors.telefono && <p className="error">{errors.telefono.message}</p>}
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Guardar" className="btn-secondary"></input>
                    </div>
                </form>
                <AlertaExito/>
                <p className="error">{mensajeError}</p>
            </div>
        </div>
    );
}