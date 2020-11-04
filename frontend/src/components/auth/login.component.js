import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import './style.css';
import {useForm} from 'react-hook-form';

export default function Login() {
  const {register, handleSubmit, errors} = useForm(); 
  const [mensajeError, setMensajeError] = useState("");
  const history = useHistory();

  const mostrarMensajeError = ()=>{
    setMensajeError("Usuario o contrasenia invalidos");
  }

  const onSubmit = (data) => {    
    const usuario = {
      "email": data.email,
      "password": data.password
    }

    axios.post('http://localhost:5000/login', usuario)
      .then(res => {
        console.log(res);
        history.push("perfil")
      })
      .catch(e => {        
        console.log(e);
        mostrarMensajeError();
      });    
  }

  return (
    <div className="wrap">
      <div className="formulario">
        <h1>PasaLista</h1>
        <h3>¡Extensión para el manejo de asistencias por medio de plataformas
                      educativas virtuales como Google Meet!</h3>        
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group d-flex flex-column justify-content-center">
            <input 
              type="text" 
              placeholder="maestro@itson.edu.mx" 
              className="form-control box" 
              name="email"
              ref={register({required:"Correo requerido", pattern: {value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, message:"Correo invalido"}})}  
            ></input>
            {errors.email && <p>{errors.email.message}</p>}
            <input type="password" 
              placeholder="Contraseña" 
              className="form-control box" 
              name="password"
              ref={register({required:"Contrasenia requerida", minLength:{value:4, message:"Min 4 caracteres"}, maxLength:{value:10, message:"Max 14 caracteres"}})}
            ></input>
            {errors.password && <p>{errors.password.message}</p>}
          </div>
          <div className="form-group">
            <input type="submit" value="Ingresar" className="btn btn-primary"></input>
          </div>
        </form>
        <p>{mensajeError}</p>

      </div>
    </div>
  );
  
}

// export default class Login extends Component {
//   constructor(props) {
//     super(props);

//     this.onChangeEmail = this.onChangeEmail.bind(this);
//     this.onChangePassword = this.onChangePassword.bind(this);
//     this.onSubmit = this.onSubmit.bind(this);

//     this.state = {
//       "email": '',
//       "password": ''
//     }
//   }

//   onChangeEmail(e) {
//     this.setState({
//       email: e.target.value
//     });
//   }

//   onChangePassword(e) {
//     this.setState({
//       password: e.target.value
//     });
//   }

//   onSubmit(e) {
//     e.preventDefault();

//     const usuario = {
//       "email": this.state.email,
//       "password": this.state.password
//     }

//     axios.post('http://localhost:5000/login', usuario)
//       .then(res => {
//         console.log(res);
//         this.props.history.push('/perfil');
//       }).catch(e => {
//         console.log(e);
//       });
    
//   }

//   render() {
//     return (
//       <div className="wrap">
//         <div className="formulario">
//           <h1>PasaLista</h1>
//           <h3>¡Extensión para el manejo de asistencias por medio de plataformas
//                         educativas virtuales como Google Meet!</h3>
//           <form onSubmit={this.onSubmit}>
//             <div className="form-group d-flex flex-column justify-content-center">
//               <input type="text" placeholder="maestro@itson.edu.mx" className="form-control box" value={this.state.email} onChange={this.onChangeEmail} required></input>
//               <input type="password" placeholder="Contraseña" className="form-control box" value={this.state.password} onChange={this.onChangePassword} required></input>
//             </div>
//             <div className="form-group">
//               <input type="submit" value="Ingresar" className="btn btn-primary"></input>
//             </div>
//           </form>
//         </div>
//       </div>
//     );
//   }
// }
