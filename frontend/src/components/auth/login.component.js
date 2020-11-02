import React, { Component } from "react";

export default class Login extends Component {
    constructor(props) {
        super(props);
      }
    
      render() {
        return (
          <div className="base-container" ref={this.props.containerRef}>
            <div className="header">Iniciar sesión</div>
            <div className="content">
              <div className="form">
                <div className="form-group">
                  <label htmlFor="username">Correo</label>
                  <input type="text" name="email" placeholder="Correo" />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Contraseña</label>
                  <input type="password" name="password" placeholder="Contraseña" />
                </div>
              </div>
            </div>
            <div className="footer">
              <button type="button" className="btn">
                Ingresar
              </button>
            </div>
          </div>
        );
      }
}
