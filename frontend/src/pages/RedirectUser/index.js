import React from 'react';
import {useHistory} from 'react-router-dom';
import './style.css';

export default function RedirectUser(){
    const history = useHistory();
    
    return(
        <div>
            TimeBuner
            <div>
                <div>
                    <button type={'submit'} onClick={() => history.push('/sample/validate')}>Consultar Amostra</button>
                    <button type={'submit'} onClick={() => history.push('/admin/dashboard')}>Administração</button>
                    <button type={'submit'} onClick={() => history.push('/login')}>Login</button>
                </div>
            </div>
        </div>
    );
}