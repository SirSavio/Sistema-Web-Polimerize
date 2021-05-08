import React, {useEffect, useState} from 'react';
import {Route, Redirect} from 'react-router-dom';
import {authenticate} from './services/authenticate';

export default function PrivateRouter({component: Component, ...res}){

    const [log, setLog] = useState(null);

    async function getAuth(){
        const res = await authenticate();
        setLog(res);
        return res;
    }

    useEffect( () => {
        getAuth();
    },[]);
    
    return(
        <Route
            {...res}
            render = {
                props => log == null
                    ? null
                    : log === true
                    ?   (<Component {...props}/>) 
                    :   (   alert("Faça login para acessar esse conteudo"), 
                            <Redirect to={{pathname: "/", state:{from: props.location}}}/>)
            }
        />
    );
}