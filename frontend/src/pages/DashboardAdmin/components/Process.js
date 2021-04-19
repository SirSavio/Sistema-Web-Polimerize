import React,{useState, useEffect} from 'react';
import api from '../../../services/api';
export default function Process({id}){
    const [process, setProcess] = useState([]);
    var D = new Date();

    useEffect(()=>{
        api.get(`/sample/process/${id}`)
            .then(responce => {
                setProcess(responce.data);
            })
        ;
    },[id])

    return (
        <div>
            {process.map((pro) => (
                <div key={pro.id}>
                    <label htmlFor="">Processo: </label>
                    <span>{pro.name}</span>
                    <br/>

                    <label htmlFor="">Descrição: </label>
                    <span>{pro.describe}</span>
                    <br/>

                    <label htmlFor="">Data: </label>
                    <span>{ D.toISOString(pro.date) }</span>
                    <br/>
                </div>
            ))}
        </div>
    )
}