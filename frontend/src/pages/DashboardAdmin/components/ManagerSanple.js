import React,{useState,useEffect} from 'react';
import api from '../../../services/api';

export default function ManageSample(){
    const [sample, setSample] = useState([]);
    const [page, setPage] = useState(1);
    const [nPage, setNumPages] = useState(1)
    const [change, setChange] = useState(false);

    useEffect(() => {
        api.get(`sample/?page=${page}`)
            .then(response => {
                setSample(response.data);
                setNumPages(response.headers["X-Total-Count"]);
                console.log(localStorage.headers);
            })
            .catch(erro => {
                alert(erro);
            })
        ;
        // console.log(nPage);
    },[page,change]);

    async function putState(e){
        e.preventDefault();

        const id = e.target.id.value;
        const state = e.target.state.value;
        const data = {id, state};

        try{
            await api.put('sample',data);
            (change)? setChange(false): setChange(true);
            alert("Estado Alterado");
        }
        catch(erro){
            (change)? setChange(false): setChange(true);
            alert("Erro ao alterar o estado da amostra");
        }
    }

    return(
        <div>
            <div>
                {sample.map((sam) => (
                    <div key={sam.id}>
                        <label htmlFor="">Codigo: </label>
                        <span> {sam.code} </span>
                        <br/>
                        <label htmlFor="">Nome do Paciênte: </label>
                        <span> {sam.patientName} </span>
                        <br/>
                        <label htmlFor="">Descrição: </label>
                        <span> {sam.description} </span>
                        <br/>
                        <form onSubmit={putState}>
                            <label htmlFor="">Estado: </label>
                            <input 
                                type="hidden"
                                name={"id"}
                                required
                                defaultValue={sam.id}
                            />
                            <input 
                                type="text"
                                name="state"
                                required
                                defaultValue={sam.state}
                            />
                            <button type={'submit'}>Atualizar</button>
                        </form>
                        <br/>

                        {/* método dos processos */}


                    </div>
                ))}
                <dir>
                    <label htmlFor="">Páginas: </label>
                    <button>Anterior</button>
                    <button>Próxima</button>
                </dir>
            </div> 
        </div>
    )
}