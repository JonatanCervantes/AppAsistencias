import React, {useState} from 'react';

export default function Perfil() {
    const [token, setToken] = useState(localStorage.getItem("token"));

    const establecerToken = ()=>{
        setToken(localStorage.getItem("token"));
    }    
    return (
        <div>
            <p>Estas en el componente para el perfil</p>
            <p>Token: {token}</p>
            
        </div>
    );
    
}