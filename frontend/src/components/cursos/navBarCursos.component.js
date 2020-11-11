import React from 'react';
import {Link} from 'react-router-dom';

export default function NavBarCursos () {
    return (
        <nav className="navbar navbar-dark bg-secondary navbar-expand-lg">            
            <div className="collapse navbar-collapse">
                <ul className="navbar-nav mr-auto" >
                    <li className="navbar-brand">Menu Cursos</li>
                    <li className="navbar-item"><Link to="/cursos/listar" className="nav-link">Listar</Link></li>    
                    <li className="navbar-item"><Link to="/cursos/agregar" className="nav-link">Agregar</Link></li>   
                </ul>
            </div>
        </nav>
    );    
}