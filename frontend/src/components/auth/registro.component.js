import React, { Component } from "react";

export default class Registro extends Component {
    constructor(props) {
        super(props);
      }
    
      render() {
        return (
            <div>
                <h1>PasaLista</h1>
                <h3>¡Extensión para el manejo de asistencias por medio de plataformas 
                    educativas virtuales como Google Meet!</h3>
                <input type="text" placeholder="maestro@itson.edu.mx"></input> <br></br>
                <input type="password" placeholder="Contraseña"></input><br></br>
                <input type="password" placeholder="Confirmar contraseña"></input><br></br>
            </div>
        );
      }
}