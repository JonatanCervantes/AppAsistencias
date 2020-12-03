import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import { UsuarioContext } from "../../contexts/UsuarioContext";
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import edit from '../../assets/edit.png';
import add from '../../assets/add.png';
import save from '../../assets/save.png';

export default function Perfil() {
    const [usuario, setUsuario] = useContext(UsuarioContext);

    const history = useHistory();

    const modificarUsuario = () => {
        history.push({
            pathname: '/perfil/editar',
            state: {
                usuario: usuario._id,
                id: usuario.id,
                nombre: usuario.nombre,
                nomInstitucion: usuario.nomInstitucion,
                nomDepartamento: usuario.nomDepartamento,
                numCubiculo: usuario.numCubiculo,
                telefono: usuario.telefono,
            }
        });
    }
    return (
        <div className="wrap">
            <div className="container profile col-sm-12 my-14 table table-dark">
                <h1>Perfil</h1>

                <div className="element">
                    <div className="label">Nombre:</div>
                    <div className="data" id="nombre">{usuario.nombre}</div>
                </div>

                <div className="element">
                    <div className="label">ID:</div>
                    <div className="data" id="id">{usuario.id}</div>
                </div>

                <div className="element">
                    <div className="label">Institución:</div>
                    <div className="data" id="institucion">{usuario.nomInstitucion}</div>
                </div>

                <div className="element">
                    <div className="label">Departamento:</div>
                    <div className="data" id="departamento">{usuario.nomDepartamento}</div>
                </div>

                <div className="element">
                    <div className="label">Cubículo:</div>
                    <div className="data" id="cubiculo">{usuario.numCubiculo}</div>
                </div>

                <div className="element">
                    <div className="label">Teléfono:</div>
                    <div className="data" id="telefono">{usuario.telefono}</div>
                </div>

                <br />

                <div className="form-group">
                    <input type="submit" onClick={() => modificarUsuario()} value="Editar" className="btn btn-dark"></input>
                </div>
            </div>

        </div>
    );

}