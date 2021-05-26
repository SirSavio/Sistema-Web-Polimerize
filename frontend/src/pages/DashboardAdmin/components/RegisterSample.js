import React, {useState} from 'react';
import api from '../../../services/api';

export default function RegisterSample(){
    /*-----------------------------------------------------*/
    //variáveis
    const [patientName, setPatientName] = useState('');
    const [description, setDescription] = useState('');
    const [state, setState] = useState('Kit para coleta da amostra enviado');
    const [originSample, setOriginSample] = useState("1");
    /*-----------------------------------------------------*/
    //funções
    async function registerSample(e){
        e.preventDefault();
        const orgSam = originSample.split(":");
        const data = {patientName, description, state, "originSample" : orgSam[0]};
                
        try{
            const res = await api.post('sample', data)
                .catch(error => {
                    throw(error);
                })
            ;
            setPatientName('');
            setDescription('');
            setState('Kit para coleta da amostra enviado');
            setOriginSample('1');
            alert('Amostra de código: [' + res.data.code + '] foi cadastrada');
        }
        catch(error){
            alert('Não foi possível cadastrar uma amostra, erro:' + error);
            setPatientName('');
            setDescription('');
            setState('Kit para coleta da amostra enviado');
            setOriginSample('1');
        }
    }

    return(
        <div>
            <h1>Cadastrar Amostra</h1>
            <form onSubmit={registerSample}>
                <input 
                    type="text" 
                    placeholder={'Nome do cliente'}
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
                <select required value={state} onChange={e =>setState(e.target.value)}>
                    <option>Kit para coleta da amostra enviado</option>
                    <option>Amostra em transporte</option>
                    <option>Amostra recebida na sede da Polimerize</option>
                    <option>Processamento da amostra</option>
                    <option>Material enviado para sequenciamento</option>
                    <option>Sequenciamento</option>
                    <option>Análise dos dados de sequenciamento</option>
                    <option>Amostra em análise</option>
                    <option>Concluído</option>
                </select>
                <select value={originSample} onChange={e => setOriginSample(e.target.value)}>
                    <option>1: Amostra vegetal</option>
                    <option>2: Amostra de solo</option>
                    <option>3: Amostra de água</option>
                    <option>4: Amostra de alimentos</option>
                    <option>5: Outros</option>
                </select>
                <button type={'submit'} >Cadastrar</button>
            </form> 
        </div>
    )
}