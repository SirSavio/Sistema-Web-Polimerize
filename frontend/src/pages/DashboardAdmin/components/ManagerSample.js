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

    async function putDocumentation(e){
        e.preventDefault();
        const id = e.target.id.value;
        var documentation = e.target.documentation.value;
        if(documentation === undefined) documentation = '';
        const data = {id,documentation};

        try{
            await api.put('sample/documentation',data)
                .catch( error => {
                    throw(error);
                })
            ;
            (change)? setChange(false): setChange(true);
            alert("Documentação Alterada");
        }
        catch(error){
            (change)? setChange(false): setChange(true);
            alert("Erro ao Alterar a documentação");
        }
    }

    return(
        <div>
            <div>
                {sample.map((sam) => (
                    <div align="center" key={sam.id}>
                        <div>
                            <h5 htmlFor="">Codigo: {sam.code}</h5>

                            <p> {sam.patientName} </p>

                            <p> {sam.description} </p>
                            
                            <form onSubmit={putState}>
                                <h5>Estado: </h5>                   
                                <input 
                                    type="hidden"
                                    name={"id"}
                                    required
                                    defaultValue={sam.id}
                                />
                                <select name={"state"} required>
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
                                <button type={'submit'}>Atualizar</button>
                            </form>
                            <form onSubmit={putDocumentation}>
                                <h5>Documentação: </h5>
                                <input 
                                    type="hidden"
                                    name={"id"}
                                    required
                                    defaultValue={sam.id}
                                />
                                <input
                                    type="text"
                                    name="documentation"
                                    defaultValue={sam.documentation}
                                />
                                <button type={'submit'}>Salvar</button>
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
                    type={'button'}
                    onClick={() => {
                        if(page > 1){
                            setPage(page-1);
                        }
                    }}
                > Anterior</button>
                <label htmlFor="">Página {page}/{numPages} </label>
                <button
                    type={'button'}
                    onClick={() => {
                        if(page < numPages){
                            setPage(page+1);
                        }
                    }}
                >Próxima</button>
            </dir>
        </div>
    )
}