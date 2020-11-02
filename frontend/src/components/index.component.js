import React, { Component } from "react";

export default class Index extends Component {
  render() {
    return (
      <div>
        <h1>PasaLista</h1>
        <h3>¡Extensión para el manejo de asistencias por medio de plataformas 
            educativas virtuales como Google Meet!</h3>
        <form>
            <input type="text" placeholder="maestro@itson.edu.mx"></input> <br></br>
            <input type="password" placeholder="Contraseña"></input><br></br>
            <a href="/registro">Registrarse</a><br></br>
        </form>
      </div>
    );
  }
}