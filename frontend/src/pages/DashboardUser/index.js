import React, {useState, useEffect} from 'react';
import {useHistory, Link} from 'react-router-dom';
import api from '../../services/api';
import moment from 'moment';

export default function DashboardUser(){
    /*-----------------------------------------------------*/
    //variáveis
    const [sample, setAmostra] = useState([]);
    const [process, setProcess] = useState([]);
    const code = localStorage.getItem('codeSample');
    const history = useHistory();
    
    /*-----------------------------------------------------*/
    //funções
    useEffect(() => {
        api.get(`sample/${code}`)
            .then(responce => {
                setAmostra(responce.data);
            })
    },[code]);

    useEffect(()=>{
        api.get(`sample/process/${sample.id}`)
            .then(responce => {
                setProcess(responce.data);
            })
    },[sample]);

    /*-----------------------------------------------------*/
    return(
        <div>
            <div>
                <button type={'button'} onClick={() => {history.push('/sample/validate');}} > Nova consulta </button>
            </div>
            <div>
                <h1>Status da Amostra</h1>
                <span>A amostra se encontra em: {sample.state}</span>
            </div>
            {sample.documentation && (<a href={sample.documentation} > Relatório </a>)}
            <div>
                <h1>Dados da amostra</h1>
                <span>Nome do Cliente: {sample.patientName}</span>
                <br/>
                <span>Descrição: {sample.description}</span>
                <br/>
                <span>Data da Amostra: {moment(sample.date).format('DD/MM/YYYY HH:mm:ss')}</span>
            </div>
            <div>
                <h1>Dados dos processos</h1>
                {process.map(process => (
                    <li key={process.id}>
                        <div>
                            <strong>Processo realizado: {process.name}</strong>
                            <br/>
                            <p>Descrição: {process.describe}</p>
                            <p>Data: { moment(process.date).format('DD/MM/YYYY HH:mm:ss')}</p>
                        </div>
                    </li>
                ))}
            </div>
        </div>
    );
}