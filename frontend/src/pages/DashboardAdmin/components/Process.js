import React,{useState, useEffect} from 'react';
import api from '../../../services/api';
export default function Process({id}){
    const [process, setProcess] = useState([]);
    const [processChange, setProcessChange] = useState(false);
    var D = new Date();

    useEffect(()=>{
        api.get(`/sample/process/${id}`)
            .then(responce => {
                setProcess(responce.data);
            })
        ;
    },[id,setProcess])

    async function change(e){
        e.preventDefault();

        const id = e.target.id.value;
        const name = e.target.name.value;
        const describe = e.target.describe.value;

        const dat = {name,describe,id};

        try{
            await api.put('/sample/process', dat);
            (processChange)? setProcessChange(false): setProcessChange(true);
            alert("Dados do processo atualizado");
        }
        catch(error){
            (processChange)? setProcessChange(false): setProcessChange(true);
            alert("Erro ao atulizar os dados do processo")
        }
    }

    return (
        <div>
            {process.map((pro) => (
                <div key={pro.id}>
                    <form onSubmit={change}>
                        <input 
                            type="hidden"
                            name={"id"}
                            required
                            defaultValue={pro.id}
                        />
                        <br/>
                        <input 
                            type="text"
                            name={"name"}
                            placeholder={pro.name}
                            required
                            defaultValue={pro.name}
                        />
                        <br/>
                        <textarea
                            type="text"
                            name={"describe"}
                            placeholder={pro.describe}
                            required
                            defaultValue={pro.describe}
                        />
                        <br/>
                        <span>{ D.toISOString(pro.date) }</span>
                        <br/>
                        <button type={'submit'}>Salvar</button>
                    </form>
                </div>
            ))}
        </div>
    )
}