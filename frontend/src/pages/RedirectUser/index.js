import React from 'react';
import {useHistory} from 'react-router-dom';

export default function RedirectUser(){
    const history = useHistory();
    
    return(
        <div>
            <button type={'submit'} onClick={() => history.push('/sample/validate')}>Consultar Amostra</button>
            <button type={'submit'} onClick={() => history.push('/admin/dashboard')}>Administração</button>
            <button type={'submit'} onClick={() => history.push('/login')}>Login</button>
        </div>
    );
}