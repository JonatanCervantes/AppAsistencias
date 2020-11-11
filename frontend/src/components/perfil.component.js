import React, {useContext} from 'react';
import ReactDOM from 'react-dom';
import {UsuarioContext} from "./auth/UsuarioContext";

import edit from '../assets/edit.png';
import add from '../assets/add.png';
import save from '../assets/save.png';

export default function Perfil() {    
    const [usuario, setUsuario] = useContext(UsuarioContext);   

    const nombreEdit = ()=>{
        const editor = <input className="editData" placeholder={usuario.nombre}></input>;
        const guardar = <div id="btnNombre"><img src={save} alt="Save"/></div>;

        ReactDOM.render(editor, document.getElementById('nombre'));
        ReactDOM.render(guardar, document.getElementById('btnNombre'));
    }

    const idEdit = ()=>{
        const editor = <input className="editData" placeholder={usuario._id}></input>;
        const guardar = <div id="btnID"><img src={save} alt="Save"/></div>;

        ReactDOM.render(editor, document.getElementById('id'));
        ReactDOM.render(guardar, document.getElementById('btnID'));
    }

    const institucionEdit = ()=>{
        const editor = <input className="editData" placeholder=""></input>;
        const guardar = <div id="btnInstitucion"><img src={save} alt="Save"/></div>;
        

        ReactDOM.render(editor, document.getElementById('institucion'));
        ReactDOM.render(guardar, document.getElementById('btnInstitucion'));
    }

    const departamentoEdit = ()=>{
        const editor = <input className="editData" placeholder=""></input>;
        const guardar = <div id="btnDepartamento"><img src={save} alt="Save"/></div>;

        ReactDOM.render(editor, document.getElementById('departamento'));
        ReactDOM.render(guardar, document.getElementById('btnDepartamento'));
    }

    const cubiculoEdit = ()=>{
        const editor = <input className="editData" placeholder=""></input>;
        const guardar = <div id="btnCubiculo"><img src={save} alt="Save"/></div>;

        ReactDOM.render(editor, document.getElementById('cubiculo'));
        ReactDOM.render(guardar, document.getElementById('btnCubiculo'));
    }

    const telefonoEdit = ()=>{
        const editor = <input className="editData" placeholder=""></input>;
        const guardar = <div id="btnTelefono"><img src={save} alt="Save"/></div>;

        ReactDOM.render(editor, document.getElementById('telefono'));
        ReactDOM.render(guardar, document.getElementById('btnTelefono'));
    }

    return (
        <div className="wrap">
            <div className="container profile">
                <h1>Perfil</h1>

                <div className="element">
                    <div className="label">Nombre:</div>
                    <div className="data" id="nombre">{usuario.nombre}</div>
                    <div className="button" onClick={nombreEdit} id="btnNombre"><img src={edit} alt="Edit"/></div>
                </div>

                <div className="element">
                    <div className="label">ID:</div>
                    <div className="data" id="id">{usuario._id}</div>
                    <div className="button" onClick={idEdit} id="btnID"><img src={edit} alt="Edit"/></div>
                </div>  

                <div className="element">
                    <div className="label">Institución:</div>
                    <div className="data" id="institucion"></div>
                    <div className="button" onClick={institucionEdit} id="btnInstitucion"><img src={edit} alt="Edit"/></div>
                </div>  

                <div className="element">
                    <div className="label">Departamento:</div>
                    <div className="data" id="departamento"></div>
                    <div className="button" onClick={departamentoEdit} id="btnDepartamento"><img src={edit} alt="Edit"/></div>
                </div>  

                <div className="element">
                    <div className="label">Cursos:</div>
                    <div className="data"></div>
                    <a href="/cursos"><div className="button"><img src={add} alt="Add"/></div></a>  
                </div>  

                <div className="element">
                    <div className="label">Cubículo:</div>
                    <div className="data" id="cubiculo"></div>
                    <div className="button" onClick={cubiculoEdit} id="btnCubiculo"><img src={edit} alt="Edit"/></div>
                </div>  

                <div className="element">
                    <div className="label">Teléfono:</div>
                    <div className="data" id="telefono"></div>
                    <div className="button" onClick={telefonoEdit} id="btnTelefono"><img src={edit} alt="Edit"/></div>
                </div>  
            </div>       
        </div>
    );
    
}