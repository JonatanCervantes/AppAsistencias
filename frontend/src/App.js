import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import "bootstrap/dist/css/bootstrap.min.css";

import { UsuarioProvider } from "./contexts/UsuarioContext";
import { CursosProvider } from "./contexts/CursosContext";

import Navbar from "./components/navbar.component";
import Perfil from "./components/perfil/perfil.component";
import ModificarPerfil from "./components/perfil/modificarPerfil.component";
import ListarCursos from "./components/cursos/listarCursos.component";
import ListarAsistencias from "./components/asistencias/listarAsistencias.component";
import RegistrarAsistencias from "./components/asistencias/registrarAsistencias.component";
import Registro from './components/auth/registro.component';
import Login from './components/auth/login.component';
import PrivateRoute from './components/auth/privateRoute';
import AgregarCurso from './components/cursos/registrarCurso.component';
import ModificarCurso from './components/cursos/modificarCurso.component';
import AgregarAlumno from './components/alumnos/registrarAlumno.component';
import ListarAlumnos from "./components/alumnos/listaAlumnos.component";


function App() {

  return (
    <Router>
      <Navbar />
      <br />

      <UsuarioProvider>
        <CursosProvider>
          <Route path="/" exact component={Login} />
          <Route path="/registro" exact component={Registro} />
          <Route path="/login" exact component={Login} />
          <PrivateRoute path="/perfil" exact component={Perfil} />
          <PrivateRoute path="/perfil/editar" exact component={ModificarPerfil} />
          <PrivateRoute path="/asistencias/listar" exact component={ListarAsistencias} />
          <PrivateRoute path="/asistencias/registrar" exact component={RegistrarAsistencias} />
          <PrivateRoute path="/cursos/listar" exact component={ListarCursos} />
          <PrivateRoute path="/cursos/registrar" exact component={AgregarCurso} />
          <PrivateRoute path="/alumnos/registrar" exact component={AgregarAlumno} />
          <PrivateRoute path="/alumnos/listar" exact component={ListarAlumnos} />
        </CursosProvider>
      </UsuarioProvider>
      <PrivateRoute path="/cursos/modificar" exact component={ModificarCurso} />
    </Router>
  );
}

export default App;
