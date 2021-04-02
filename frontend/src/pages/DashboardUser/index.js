import React, {useState, useEffect} from 'react';
import api from '../../services/api';
import {useHistory} from 'react-router-dom';

export default function DashboardUser(){
    /*-----------------------------------------------------*/
    //variáveis
    const history = useHistory();
    const [sample, setAmostra] = useState([]);
    const [process, setProcess] = useState([]);
    const code = localStorage.getItem('codeSample');

    
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
                <h1>Rastreamento</h1>
                <span>A amostra se encontra em: {sample.state}</span>
            </div>
            <div>
                <h1>Dados da amostra</h1>
                <span>Nome do Paciente: {sample.patientName}</span>
                <br/>
                <span>Descrição: {sample.description}</span>
                <br/>
                <span>Data da Amostra: {sample.date}</span>
            </div>
            <div>
                <h1>Dados dos processos</h1>
                {process.map(process => (
                    <li key={process.id}>
                        <strong>Processo realizado: {process.name}</strong>
                        <br/>
                        <p>Descrição: {process.describe}</p>
                    </li>
                ))}
            </div>
        </div>
    );
}