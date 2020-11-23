import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { authenticationService } from './services/authentication.service';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

export default class Navegacion extends Component {

    logout() {
        authenticationService.logout();
    }
    
    render() {
        return (
            // <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
            //     <Link to="/" className="navbar-brand">Pasalista</Link>
            //     <div className="collapse navbar-collapse" id="navbarSupportedContent">
            //         <ul className="navbar-nav mr-auto" >
            //             <li className="navbar-item"><Link to="/login" className="nav-link">Login</Link></li>    
            //             {/* <li className="navbar-item"><Link to="/registro" className="nav-link">Registro</Link></li> */}
            //             <li className="navbar-item"><Link to="/perfil" className="nav-link">Perfil</Link></li>
            //             <li className="navbar-item"><Link to="/cursos" className="nav-link">Cursos</Link></li>    
            //             {/* <li className="nav-item dropdown">
            //                 <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            //                 Cursos
            //                 </a>
            //                 <div className="dropdown-menu" aria-labelledby="navbarDropdown">
            //                 <a className="dropdown-item" href="/cursos/listar">listar</a>
            //                 <a className="dropdown-item" href="#">Another action</a>
            //                 </div>
            //             </li> */}
            //             {/* <li className="navbar-item"><Link to="/asistencias" className="nav-link">Asistencias</Link></li> */}
            //             <li className="navbar-item"><Link to="/login" onClick={this.logout} className="nav-link">Cerrar Sesión</Link></li>
            //         </ul>
            //     </div>
            // </nav>
            <div>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand href="/">Pasalista</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                    <Nav.Link><Link to="/login">Login</Link></Nav.Link>
                    <Nav.Link ><Link to="/perfil">Perfil</Link></Nav.Link>
                    <NavDropdown title="Cursos" id="collasible-nav-dropdown">
                        <NavDropdown.Item><Link to="/cursos/listar">Ver cursos</Link></NavDropdown.Item>
                        <NavDropdown.Item><Link to="/cursos/registrar">Registrar cursos</Link></NavDropdown.Item>
                        
                        {/* {/* <NavDropdown.Divider />} */}
                    </NavDropdown>
                    <Nav.Link ><Link to="/alumnos/registrar">Alumnos</Link></Nav.Link>
                    </Nav>
                    <Nav>
                    <Nav.Link ><Link to="/login" onClick={this.logout}>Cerrar Sesión</Link></Nav.Link>  
                    </Nav>
                </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
}