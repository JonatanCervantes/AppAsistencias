import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

import {UsuarioProvider} from "./components/auth/UsuarioContext";

import Navbar from "./components/navbar.component";
import Perfil from "./components/perfil.component";
import Cursos from "./components/cursos/listarCursos.component";
import Asistencias from "./components/asistencias.component";
import Index from './components/index.component';
import Registro from './components/auth/registro.component';
import Login from './components/auth/login.component';
import PrivateRoute from './components/auth/privateRoute';


function App() {
  
  return (
    <Router>
      <Navbar/>
      <br/>
      
      <UsuarioProvider>
      <Route path="/" exact component={Index}/>
      <Route path="/registro" exact component={Registro}/>
      <Route path="/login" exact component={Login}/>      
      <PrivateRoute path="/perfil" exact component={Perfil}/>
      <PrivateRoute path="/cursos" exact component={Cursos}/>
      <PrivateRoute path="/asistencias" exact component={Asistencias}/>
      </UsuarioProvider>
    </Router>
  );
}

export default App;
