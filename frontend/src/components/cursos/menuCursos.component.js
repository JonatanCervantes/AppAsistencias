// import React from 'react';
// import NavBarCursos from './navBarCursos.component';
// import {BrowserRouter as Router, Route} from 'react-router-dom';
// import ListarCursos from './listarCursos.component';
// import AgregarCurso from './registrarCurso.component';
// import {UsuarioProvider} from '../../contexts/UsuarioContext'
// import ModificarCurso from './modificarCurso.component';
// import PrivateRoute from '../auth/privateRoute';

// export default function Cursos () {
//     return (
//         <div>
//             <Router>
//                 <NavBarCursos/>
//                 <br/>
//                 <UsuarioProvider>
//                 <PrivateRoute path="/cursos/listar" exact component={ListarCursos}/>    
//                 <PrivateRoute path="/cursos/agregar" exact component={AgregarCurso}/>  
//                 </UsuarioProvider>
//                 <PrivateRoute path="/cursos/modificar" exact component={ModificarCurso}/>  
//             </Router>
//         </div>
//     );    
// }