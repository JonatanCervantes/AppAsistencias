import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component";
import Perfil from "./components/perfil.component";
import Cursos from "./components/cursos.component";
import Asistencias from "./components/asistencias.component";


function App() {
  return (
    <Router>
      <Navbar/>
      <br/>
      <Route path="/" exact component={Perfil}/>
      <Route path="/cursos" exact component={Cursos}/>
      <Route path="/asistencias" exact component={Asistencias}/>

    </Router>
  );
}

export default App;
