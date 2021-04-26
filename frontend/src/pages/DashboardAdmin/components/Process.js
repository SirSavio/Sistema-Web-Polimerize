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
    },[id,setProcess,processChange])

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

    async function postProcess(e){
    	e.preventDefault();

    	const name = e.target.name.value;
    	const describe = e.target.describe.value;
    	const id_sample = id;

    	e.target.name.value = '';
    	e.target.describe.value = '';

    	const dat = {name,describe,id_sample};

    	try{
    		await api.post('sample/process', dat);
    		(processChange)? setProcessChange(false): setProcessChange(true);
            alert("Processo adicionado");
    	}
    	catch(error){
            (processChange)? setProcessChange(false): setProcessChange(true);
            alert("Erro ao adicionar processo");
        }
    }

    return (
        <div>
            <h5 className="card-title">Processos Realizados : </h5>
            {process.map((pro) => (
                <div className="card mb-2 bg-light" key={pro.id}>
                    <form onSubmit={change}>
                        <input
                            type="hidden"
                            name={"id"}
                            required
                            defaultValue={pro.id}
                        />
                        <input
                            className="form-control"
                            type="text"
                            name={"name"}
                            placeholder={pro.name}
                            required
                            defaultValue={pro.name}
                        />
                        <textarea
                            className="form-control"
                            type="text"
                            name={"describe"}
                            placeholder={pro.describe}
                            required
                            defaultValue={pro.describe}
                        />
                        <span className="card-text" >{ D.toISOString(pro.date) }</span>
                        <button className="btn border-secondary mb-2" type={'submit'}>Salvar</button>
                    </form>
                </div>
            ))}

            <div>
                <h5 className="card-title mt-4">Adicionar novo processo </h5>
                <form onSubmit={postProcess}>
                    <input
                        className="form-control"
                        type="text"
                        name={"name"}
                        required
                        placeholder={"Nome do processo"}
                    />
                    <textarea
                        className="form-control"
                        type="text"
                        name={"describe"}
                        required
                        placeholder={"Descrição do processo"}
                    />
                    <button className="btn" type={'submit'}>Adicionar</button>
                </form>
            </div>
        </div>
    )
}
