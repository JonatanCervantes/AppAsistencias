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
                    <NavDropdown title="Alumnos" id="collasible-nav-dropdown">
                        <NavDropdown.Item><Link to="/alumnos/listar">Ver alumnos</Link></NavDropdown.Item>
                        <NavDropdown.Item><Link to="/alumnos/registrar">Registrar alumnos</Link></NavDropdown.Item>  
                    </NavDropdown>
                    {/* <Nav.Link ><Link to="/alumnos/registrar">Alumnos</Link></Nav.Link> */}
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