import React, { useState } from "react";
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import '../style/style.css';
import {useForm} from 'react-hook-form'

export default function Registro() {      
    const {register, handleSubmit, errors} = useForm();  
    const [mensajeError, setMensajeError] = useState("");
    const history = useHistory();

    const mostrarMensajeError = ()=>{
        setMensajeError("Ya existe un usuario con ese nombre o correo electronico");
    }

    const onSubmit  = (data) => {        
        const usuario = {
            "nombre":data.name,
            "email":data.email,
            "password":data.password,
            "role":"MAESTRO"
        }        

        axios.post('http://localhost:5000/register/', usuario)
            .then(res => {
                history.push("/login");
            })
            .catch(e => {
                console.log(e);
                mostrarMensajeError();
            });  
    }

    
    return (
        <div className="wrap">
            <div className="container formulario">
                <h1>PasaLista</h1>
                <h3><small class="text-muted">Registro de un nuevo usuario</small></h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group d-flex flex-column justify-content-center">
                        <input 
                            type="text" 
                            placeholder="Nombre" 
                            className="form-control box" 
                            name="name"
                            ref={register({required:"*Nombre requerido",  pattern:{value: /^[a-zA-Z\s]+$/, message:"Solo letras"}, minLength:{value:4, message:"Min 4 caracteres"}})}
                        ></input>
                        {errors.name && <p className="error">{errors.name.message}</p>}
                        <input 
                            type="text" 
                            placeholder="maestro@itson.edu.mx" 
                            className="form-control box" 
                            name="email"
                            ref={register({required:"*Correo requerido", pattern: {value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, message:"Correo invalido"}})}    
                        ></input>
                        {errors.email && <p className="error">{errors.email.message}</p>}
                        <input 
                            type="password" 
                            placeholder="Contraseña" 
                            className="form-control box" 
                            name="password"
                            ref={register({required:"*Contraseña requerida", minLength:{value:6, message:"Mínimo 6 caracteres"}, maxLength:{value:12, message:"Máximo 12 caracteres"}})}
                        ></input>
                        {errors.password && <p className="error">{errors.password.message}</p>}
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Registrarse" className="btn btn-dark"></input>
                    </div>
                </form>
                <p className="error">{mensajeError}</p>

                <a href="/login">¿Ya tiene una cuenta? Iniciar sesión</a>
            </div>
        </div>
    );
    
}

// export default class Registro extends Component {        
    
//     constructor(props) {
//         super(props);

//         this.onChangeUsername = this.onChangeUsername.bind(this);
//         this.onChangeEmail = this.onChangeEmail.bind(this);
//         this.onChangePassword = this.onChangePassword.bind(this);
//         this.onSubmit = this.onSubmit.bind(this);

//         this.state = {
//             "nombre":'',
//             "email":'',
//             "password":'',
//             "role":"MAESTRO"
//         }
//     }   

//     onChangeUsername (e){
//         this.setState({
//             nombre: e.target.value
//         });
//     }

//     onChangeEmail (e){
//         this.setState({
//             email: e.target.value
//         });
//     }

//     onChangePassword (e){
//         this.setState({
//             password: e.target.value
//         });
//     }

//     onSubmit (e){
//         e.preventDefault();

//         const usuario = {
//             "nombre":this.state.nombre,
//             "email":this.state.email,
//             "password":this.state.password,
//             "role":"MAESTRO"
//         }

//         axios.post('http://localhost:5000/register', usuario)
//         .then(res => console.log(res.data));

//         this.props.history.push('/login');
//     }

//     render() {
//         return (
//             <div className="wrap">
//                 <div className="formulario">
//                     <h1>PasaLista</h1>
//                     <h3>¡Extensión para el manejo de asistencias por medio de plataformas
//                         educativas virtuales como Google Meet!</h3>
//                     <form onSubmit={this.onSubmit}>
//                         <div className="form-group d-flex flex-column justify-content-center">
//                             <input type="text" placeholder="Domitsu Kono" className="form-control box" value={this.state.nombre} onChange={this.onChangeUsername} required></input>
//                             <input type="text" placeholder="maestro@itson.edu.mx" className="form-control box" value={this.state.email} onChange={this.onChangeEmail} required></input>
//                             <input type="password" placeholder="Contraseña" className="form-control box" value={this.state.password} onChange={this.onChangePassword} required></input>
//                         </div>
//                         <div className="form-group">
//                             <input type="submit" value="Registrarse" className="btn btn-primary"></input>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         );
//     }
// }