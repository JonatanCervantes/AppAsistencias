import React, { Component } from "react";
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import './style.css';

export default class Registro extends Component {
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            "nombre":'',
            "email":'',
            "password":'',
            "role":"MAESTRO"
        }

    }

    onChangeUsername (e){
        this.setState({
            nombre: e.target.value
        });
    }

    onChangeEmail (e){
        this.setState({
            email: e.target.value
        });
    }

    onChangePassword (e){
        this.setState({
            password: e.target.value
        });
    }

    onSubmit (e){
        e.preventDefault();

        const usuario = {
            "nombre":this.state.nombre,
            "email":this.state.email,
            "password":this.state.password,
            "role":"MAESTRO"
        }

        axios.post('http://localhost:5000/register', usuario)
        .then(res => console.log(res.data));

        this.props.history.push('/login');
    }

    render() {
        return (
            <div className="wrap">
                <div className="formulario">
                    <h1>PasaLista</h1>
                    <h3>¡Extensión para el manejo de asistencias por medio de plataformas
                        educativas virtuales como Google Meet!</h3>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group d-flex flex-column justify-content-center">
                            <input type="text" placeholder="Domitsu Kono" className="form-control box" value={this.state.nombre} onChange={this.onChangeUsername} required></input>
                            <input type="text" placeholder="maestro@itson.edu.mx" className="form-control box" value={this.state.email} onChange={this.onChangeEmail} required></input>
                            <input type="password" placeholder="Contraseña" className="form-control box" value={this.state.password} onChange={this.onChangePassword} required></input>
                        </div>
                        <div className="form-group">
                            <input type="submit" value="Registrarse" className="btn btn-primary"></input>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}