import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import { UsuarioContext } from "./auth/UsuarioContext";
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import edit from '../assets/edit.png';
import add from '../assets/add.png';
import save from '../assets/save.png';

export default function Perfil() {
    const [usuario, setUsuario] = useContext(UsuarioContext);

    const history = useHistory();

    const modificarUsuario = ()=> {
        history.push({
            pathname: '/perfil/editar',
            state: {
              usuario : usuario._id,
              id : usuario.id,
              nombre : usuario.nombre,
              nomInstitucion:usuario.nomInstitucion,
              nomDepartamento:usuario.nomDepartamento,
              numCubiculo: usuario.numCubiculo,
              telefono: usuario.telefono,
            }
          });           
    }

    // const nombreEdit = () => {
    //     const editor = <input className="editData" placeholder={usuario.nombre} id="nombre"></input>;
    //     const guardar = <div id="btnNombre"><img src={save} alt="Save" onClick={saveNombre()}/></div>;

    //     ReactDOM.render(editor, document.getElementById('nombre'));
    //     ReactDOM.render(guardar, document.getElementById('btnNombre'));
    // }

    // const saveNombre = () => {
    //     usuario.nombre = "Pedro";

    //     axios.put('http://localhost:5000/usuarios/modificar', {
    //         data: {
    //             usuario: usuario._id,
    //             nombre: 'Pedro',
    //             nomInstitucion: usuario.nomInstitucion,
    //             nomDepartamento: usuario.nomDepartamento,
    //             numCubiculo: usuario.numCubiculo,
    //         }
    //     })
    //         .then(res => {
    //             console.log(res);
    //         })
    //         .catch(e => {
    //             console.log(e);
    //         });
    // }

    // const idEdit = () => {
    //     const editor = <input className="editData" placeholder="Utilizar 11 dígitos. Ej: 00000123456"></input>;
    //     const guardar = <div id="btnID"><img src={save} alt="Save" /></div>;

    //     ReactDOM.render(editor, document.getElementById('id'));
    //     ReactDOM.render(guardar, document.getElementById('btnID'));
    // }

    // const institucionEdit = () => {
    //     const editor = <input className="editData" placeholder="Ej: Instituto Tecnológico de Sonora"></input>;
    //     const guardar = <div id="btnInstitucion"><img src={save} alt="Save" /></div>;


    //     ReactDOM.render(editor, document.getElementById('institucion'));
    //     ReactDOM.render(guardar, document.getElementById('btnInstitucion'));
    // }

    // const departamentoEdit = () => {
    //     const editor = <input className="editData" placeholder="Ej: Computación y Diseño"></input>;
    //     const guardar = <div id="btnDepartamento"><img src={save} alt="Save" /></div>;

    //     ReactDOM.render(editor, document.getElementById('departamento'));
    //     ReactDOM.render(guardar, document.getElementById('btnDepartamento'));
    // }

    // const cubiculoEdit = () => {
    //     const editor = <input className="editData" placeholder="Ej: 24"></input>;
    //     const guardar = <div id="btnCubiculo"><img src={save} alt="Save" /></div>;

    //     ReactDOM.render(editor, document.getElementById('cubiculo'));
    //     ReactDOM.render(guardar, document.getElementById('btnCubiculo'));
    // }

    // const telefonoEdit = () => {
    //     const editor = <input className="editData" placeholder="Ej: 111-222-3344"></input>;
    //     const guardar = <div id="btnTelefono"><img src={save} alt="Save" /></div>;

    //     ReactDOM.render(editor, document.getElementById('telefono'));
    //     ReactDOM.render(guardar, document.getElementById('btnTelefono'));
    // }

    return (
        <div className="wrap">
            <div className="container profile">
                <h1>Perfil</h1>

                <div className="element">
                    <div className="label">Nombre:</div>
                    <div className="data" id="nombre">{usuario.nombre}</div>
                    <div className="button"  id="btnNombre"><img src={edit} alt="Edit" /></div>
                </div>

                <div className="element">
                    <div className="label">ID:</div>
                    <div className="data" id="id">{usuario.id}</div>
                    <div className="button" id="btnID"><img src={edit} alt="Edit" /></div>
                </div>

                <div className="element">
                    <div className="label">Institución:</div>
                    <div className="data" id="institucion">{usuario.nomInstitucion}</div>
                    <div className="button"  id="btnInstitucion"><img src={edit} alt="Edit" /></div>
                </div>

                <div className="element">
                    <div className="label">Departamento:</div>
                    <div className="data" id="departamento">{usuario.nomDepartamento}</div>
                    <div className="button"  id="btnDepartamento"><img src={edit} alt="Edit" /></div>
                </div>

                {/* <div className="element">
                    <div className="label">Cursos:</div>
                    <div className="data"></div>
                    <a href="/cursos"><div className="button"><img src={add} alt="Add" /></div></a>
                </div> */}

                <div className="element">
                    <div className="label">Cubículo:</div>
                    <div className="data" id="cubiculo">{usuario.numCubiculo}</div>
                    <div className="button" id="btnCubiculo"><img src={edit} alt="Edit" /></div>
                </div>

                <div className="element">
                    <div className="label">Teléfono:</div>
                    <div className="data" id="telefono">{usuario.telefono}</div>
                    <div className="button" id="btnTelefono"><img src={edit} alt="Edit" /></div>
                </div>

                <br/>

                <div className="form-group">
                    <input type="submit" onClick={()=>modificarUsuario()} value="Editar" className="btn btn-dark"></input>
                </div>
            </div>
            
        </div>
    );

}