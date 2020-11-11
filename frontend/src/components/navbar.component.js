import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { authenticationService } from './services/authentication.service';

export default class Navbar extends Component {

    logout() {
        authenticationService.logout();
    }
    
    render() {
        return (
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <Link to="/" className="navbar-brand">Pasalista</Link>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto" >
                        <li className="navbar-item"><Link to="/login" className="nav-link">Login</Link></li>    
                        <li className="navbar-item"><Link to="/registro" className="nav-link">Registro</Link></li>
                        <li className="navbar-item"><Link to="/perfil" className="nav-link">Perfil</Link></li>
                        <li className="navbar-item"><Link to="/cursos" className="nav-link">Cursos</Link></li>    
                        {/* <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Cursos
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a className="dropdown-item" href="/cursos/listar">listar</a>
                            <a className="dropdown-item" href="#">Another action</a>
                            </div>
                        </li> */}
                        <li className="navbar-item"><Link to="/asistencias" className="nav-link">Asistencias</Link></li>
                        <li className="navbar-item"><Link to="/login" onClick={this.logout} className="nav-link">Cerrar Sesión</Link></li>
                    </ul>
                </div>
            </nav>
        );
    }
}