import React, {useContext, useState, useEffect} from 'react';
import {UsuarioContext} from "../auth/UsuarioContext";
import axios from 'axios';


export default function Cursos (props) {
    const [usuario, setUsuario] = useContext(UsuarioContext);
    const [cursos, setCursos] = useState([{}]);

    const obtenerCursos = ()=> {
        const idUsuario = usuario._id;
        console.log('Usuario' + idUsuario);
        axios.get('http://localhost:5000/cursos/obtenerCursos/',{headers:{authorization:idUsuario}})
        .then(res => { 
            console.log(res);
            establecerCursos(res.data)
        })
        .catch(e => {        
            console.log(e);
        })  
             
    }

    function establecerCursos(cursos) {
        setCursos(cursos);
    }

    //HACER CONTEXT DE CURSOS
    useEffect(obtenerCursos, []); 

    if(cursos == undefined || cursos.length <= 0) {
        return (
            <div>
                <h1>Aun no tiene cursos registrados</h1>
            </div>
        );
    }
    
    return (      
        <div>
            <h1>Cursos registrados: </h1>
            {cursos.map(item => {
                return <p>{item.nombre}</p>;
            })}

        </div>
    );
    
}