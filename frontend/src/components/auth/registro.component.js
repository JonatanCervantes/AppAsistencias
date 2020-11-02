import React, { Component } from "react";
import "./style.scss";

export default class Registro extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="base-container" ref={this.props.containerRef}>
                <h1>PasaLista</h1>
                <h3>¡Extensión para el manejo de asistencias por medio de plataformas
                    educativas virtuales como Google Meet!</h3>
                <input type="text" placeholder="maestro@itson.edu.mx"></input> <br></br>
                <input type="password" placeholder="Contraseña"></input><br></br>
                <input type="password" placeholder="Confirmar contraseña"></input><br></br>

                <div className="header">Register</div>
                <div className="content">
                    <div className="image">
                    </div>
                    <div className="form">
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input type="text" name="username" placeholder="username" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="text" name="email" placeholder="email" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="text" name="password" placeholder="password" />
                        </div>
                    </div>
                </div>
                <div className="footer">
                    <button type="button" className="btn">
                        Register
          </button>
                </div>

            </div>


        );
    }
}