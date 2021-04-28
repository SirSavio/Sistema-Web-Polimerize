import React,{useState,useEffect} from 'react';
import api from '../../../services/api';
import Process from './Process';

export default function ManageSample(){
    const [sample, setSample] = useState([]);
    const [page, setPage] = useState(1);
    const [numPages, setNumPages] = useState(1)
    const [change, setChange] = useState(false);

    useEffect(() => {
        api.get('sample/count')
            .then(response => {
                setNumPages(Math.ceil(response.data / 5));
            })
            .catch(error => {
                alert(error);
            })
        ;
    },[]);
    
    useEffect(() => {
        api.get(`sample/?page=${page}`)
            .then(response => {
                setSample(response.data);
            })
            .catch(erro => {
                alert(erro);
            })
        ;
    },[page,change]);

    async function putState(e){
        e.preventDefault();

        const id = e.target.id.value;
        const state = e.target.state.value;
        const data = {id, state};

        try{
            await api.put('sample',data)
                .catch(error => {
                    throw(error);
                })
            ;
            (change)? setChange(false): setChange(true);
            alert("Estado Alterado");
        }
        catch(error){
            (change)? setChange(false): setChange(true);
            alert("Erro ao alterar o estado da amostra");
        }
    }

    return(
        <div>
            <div className="card-group ">
                {sample.map((sam) => (
                    <div align="center" className="card" key={sam.id}>
                        <div className="card-body">
                            <h5 className="card-title" htmlFor="">Codigo: {sam.code}</h5>

                            <p className="card-text"> {sam.patientName} </p>

                            <p className="card-text"> {sam.description} </p>
                            
                            <form onSubmit={putState}>
                                <h5 className="card-title">Estado: </h5>                   
                                <input 
                                    type="hidden"
                                    name={"id"}
                                    required
                                    defaultValue={sam.id}
                                />
                                <input
                                    className="form-control" 
                                    type="text"
                                    name="state"
                                    required
                                    defaultValue={sam.state}
                                />
                                <button className="btn btn-primary mb-2 mt-2" type={'submit'}>Atualizar</button>
                            </form>
                            
                            {/* método dos processos */}
                            <Process id={sam.id}></Process>
                            <br/>

                        </div>
                    </div>
                ))}
            </div>
            <dir>
                <button
                    className="btn btn-primary mr-4"
                    type={'button'}
                    onClick={() => {
                        if(page > 1){
                            setPage(page-1);
                        }
                    }}
                > Anterior</button>
                <label htmlFor="">Página {page}/{numPages} </label>
                <button 
                    className="btn btn-primary ml-4"
                    type={'button'}
                    onClick={() => {
                        if(page < numPages){
                            setPage(page+1);
                        }
                    }}
                >Próxima</button>
            </dir>/
        </div>
    )
}