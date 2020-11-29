import React, { Component, useRef } from 'react';
import { Link } from 'react-router-dom';
import { authenticationService } from './services/authentication.service';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

export default function NavegacionPrincipal() {
    const refContainer = useRef(null);

    const logout = () => {
        authenticationService.logout();
    }

    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand href="/">Pasalista</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav" ref={refContainer}>
                    <Nav className="mr-auto">
                        <Nav.Link as={Link} to="/login">Login</Nav.Link>
                        <Nav.Link as={Link} to="/perfil">Perfil</Nav.Link>
                        <NavDropdown title="Cursos" id="collasible-nav-dropdown">
                            <NavDropdown.Item as={Link} to="/cursos/listar">Ver cursos</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/cursos/registrar">Registrar cursos</NavDropdown.Item>

                        </NavDropdown>
                        <NavDropdown title="Alumnos" id="collasible-nav-dropdown">
                            <NavDropdown.Item as={Link} to="/alumnos/listar">Ver alumnos</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/alumnos/registrar">Registrar alumnos</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Asistencias" id="collasible-nav-dropdown" >
                            <NavDropdown.Item as={Link} to="/asistencias/listar">Ver asistencias</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/asistencias/registrar">Registrar asistencias</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav>
                        <Nav.Link as={Link} to="/login" onClick={logout}>Cerrar Sesión</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );

}