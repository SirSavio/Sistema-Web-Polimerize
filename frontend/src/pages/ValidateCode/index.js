import React,{useState} from 'react';
import {useHistory} from 'react-router-dom';
import api from '../../services/api';
import './style.css';

export default function ValidateCode(){
    /*-----------------------------------------------------*/
    //variáveis
    const [code, setCode] = useState('');
    const history = useHistory();

    /*-----------------------------------------------------*/
    //funções
    async function Validate(e){
        e.preventDefault();
        
        try{
            await api.get(`validate/${code}`)
                .catch(error => {
                    throw(error);
                })
            ;
            sessionStorage.removeItem('codeSample',);
            sessionStorage.setItem('codeSample',code);

            history.push('/user/dashboard');
        }
        catch(error){
            alert('Não existe uma amostra com esse código');
        }
        
    }

    /*-----------------------------------------------------*/
    return(
        <div>
            <form onSubmit={Validate}>
                <input 
                    type="text" 
                    required
                    placeholder={'Digite o código da amostra'}
                    value={code}
                    onChange={e => setCode(e.target.value)}
                />
                <button type='submit'>Verificar</button>
            </form>
        </div>
    );
}