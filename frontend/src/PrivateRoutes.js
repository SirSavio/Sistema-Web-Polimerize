import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {authenticate} from './services/authenticate';

export default function PrivateRouter({component: Component, ...res}){
    return(
        <Route
            {...res}
            render = {
                props => authenticate() 
                    ? (<Component {...props}/>) 
                    :   (alert("Faça login para acessar esse conteudo"), 
                         <Redirect to={{pathname: "/", state:{from: props.location}}}/>
                        )
            }
        />
    );
}