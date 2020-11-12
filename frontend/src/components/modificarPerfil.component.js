import React, { useContext, useState } from 'react';
import { UsuarioContext } from "./auth/UsuarioContext";
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import {useForm} from 'react-hook-form'

export default function Perfil() {
    const [usuario, setUsuario] = useContext(UsuarioContext);
    const {register, handleSubmit, errors} = useForm();  
    const [mensajeError, setMensajeError] = useState("");
    const history = useHistory();

    const mostrarMensajeError = ()=>{
        setMensajeError("Ya existe un usuario con ese nombre o correo electronico");
    }

    const onSubmit  = (data) => {        
        axios.put('http://localhost:5000/usuarios/modificar', {
            data: {
                id: data.id,
                nombre: data.nombre,
                nomInstitucion: data.nomInstitucion,
                nomDepartamento: data.nomDepartamento,
                numCubiculo: data.numCubiculo,
                telefono: data.telefono,
            }
        }).then(res => {                
            history.push("/perfil");                      
        })     
    }

    return (
        <div className="wrap">
            <div className="container formulario">
                <h1>Perfil</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group d-flex flex-column justify-content-center">
                        <div>ID:</div>
                        <input 
                            type="text" 
                            placeholder={usuario.id} 
                            className="form-control box" 
                            name="id"
                        ></input>
                        {errors.id && <p className="error">{errors.id.message}</p>}
                        <div>Nombre:</div>
                        <input 
                            type="text" 
                            placeholder={usuario.nombre} 
                            className="form-control box" 
                            name="name"
                            ref={register({required:"*Nombre requerido",  pattern:{value: /^[a-zA-Z\s]+$/, message:"Solo letras"}, minLength:{value:4, message:"Min 4 caracteres"}})}
                        ></input>
                        {errors.name && <p className="error">{errors.name.message}</p>}
                        <div>Nombre Institución:</div>
                        <input 
                            type="text" 
                            placeholder={usuario.nomInstitucion} 
                            className="form-control box" 
                            name="nomInstitucion"
                        ></input>
                        {errors.nomInstitucion && <p className="error">{errors.nomInstitucion.message}</p>}
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Guardar" className="btn btn-primary"></input>
                    </div>
                </form>
                <p className="error">{mensajeError}</p>
            </div>
        </div>
    );
}