import React from 'react';
import NavBarCursos from './navBarCursos.component';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import ListarCursos from './listarCursos.component';
import AgregarCurso from './registrarCurso.component';
import {UsuarioProvider} from '../auth/UsuarioContext'

export default function Cursos () {
    return (
        <div>
            <Router>
                <NavBarCursos/>
                <br/>
                <UsuarioProvider>
                <Route path="/cursos/listar" exact component={ListarCursos}/>    
                <Route path="/cursos/agregar" exact component={AgregarCurso}/>  
                </UsuarioProvider>
            </Router>
        </div>
    );    
}