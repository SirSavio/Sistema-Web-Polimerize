import React, {useState} from 'react';
import api from '../../../services/api';

export default function RegisterSample(){
    /*-----------------------------------------------------*/
    //variáveis
    const [patientName, setPatientName] = useState('');
    const [description, setDescription] = useState('');
    const [state, setState] = useState('análise');


    /*-----------------------------------------------------*/
    //funções
    async function registerSample(e){
        e.preventDefault();
        
        const data = {patientName, description, state};
        
        try{
            const res = await api.post('sample', data);
            setPatientName('');
            setDescription('');
            setState('análise');
            alert('Amostra de código: [' + res.data.code + '] foi cadastrada');
        }
        catch(erro){
            alert('Não foi possível cadastrar uma amostra, erro:' + erro);
            setPatientName('');
            setDescription('');
            setState('análise');
        }
    }

    return(
        <div>
            <h1>Cadastrar Amostra</h1>
            <form onSubmit={registerSample}>
                <input 
                    type="text" 
                    placeholder={'Nome do paciente'}
                    required
                    value={patientName}
                    onChange={e => setPatientName(e.target.value)}
                    />
                <input 
                    type="text"
                    placeholder={'Descrição da Amostra'}
                    required
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                
                />
                <input 
                    type="text"
                    placeholder={'Estado para o rastreamento'}
                    required
                    value={state}
                    onChange={e => setState(e.target.value)}
                />
                <button type={'submit'} >Cadastrar</button>
            </form> 
        </div>
    )
}