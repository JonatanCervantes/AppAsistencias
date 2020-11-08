import React, {useState, useEffect} from 'react';
import axios from 'axios';

export default function Perfil() {    
    const [usuario, setUsuario] = useState({});    

    function establecerUsuario(usuario) {
        setUsuario(usuario);
    }

    const obtenerUsuario = ()=> {
        axios.get('http://localhost:5000/usuarios/', {headers:{authorization:localStorage.getItem('token')}})
        .then(res => {
          console.log(res);
          establecerUsuario(res.data)
        })
        .catch(e => {        
              console.log(e);
        })
    }
    
    useEffect(obtenerUsuario,[]);    

    return (
        <div>
            <h1>{usuario.nombre}</h1>
            <h1>{usuario.email}</h1>
            <h1>{usuario._id}</h1>           
        </div>
    );
    
}