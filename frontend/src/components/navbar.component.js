import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <Link to="/" className="navbar-brand">Pasalista 5000</Link>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto" >
                        <li className="navbar-item"><Link to="/perfil" className="nav-link">Perfil</Link></li>
                        <li className="navbar-item"><Link to="/cursos" className="nav-link">Cursos</Link></li>    
                        <li className="navbar-item"><Link to="/asistencias" className="nav-link">Asistencias</Link></li>
                    </ul>
                </div>
            </nav>
        );
    }
}