import React,{useState, useEffect} from 'react';
import api from '../../services/api';

export default function DashboardAdmin(){
    /*-----------------------------------------------------*/
    //variáveis

    const [patientName, setPatientName] = useState('');
    const [description, setDescription] = useState('');
    const [state, setState] = useState('análise');

    const [currentPageSaple, setCurrentPageSaple] = useState(1);
    const [samplesPage, setSamplesPage] = useState([]);
    const [totalPages, settotalPages] = useState('');
    const [processSample, SetProcessSample] = useState([]);

    /*-----------------------------------------------------*/
    //funções
    //função de cadatrar uma amostra

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

    useEffect(() => {
    //função de exibir amostras
        api.get('/sample',{params:{page: currentPageSaple}})
            .then(responce => {
                setSamplesPage(responce.data);
            })
        ;

        api.get('sample/count')
            .then(responce => {
                settotalPages(responce.data);
            })
        ;
        
    },[currentPageSaple]);

    useEffect(() =>{
        samplesPage.map(samp => {
            api.get(`/sample/process/${samp.id}`)
                .then(responce =>{
                    SetProcessSample(responce.data)
                })
        });
    },[samplesPage]);
    
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
            <h1>Atualizar rastreamento e Adicionar comentários dos processos</h1>
                <div>
                    {samplesPage.map(samp => (
                        <li key={samp.id}>
                            <ul>
                                <h2>Amostra:</h2>
                                <div>
                                    {/* <p>Codigo: {samp.code}</p>
                                    <p>Nome do Paciente: {samp.patientName}</p>
                                    <p>Descrição: {samp.description}</p>
                                    <p>Rastreamento de processo: {samp.state}</p> */}
                                </div>
                                <div>
                                    <h2>processos realizados com a amostra:</h2>
                                    {processSample.map(proc => (
                                        <li key={proc.id}>
                                            {console.log(proc.name), '\n -----------------------------------------------'}
                                        </li>
                                    ))}
                                </div>
                            </ul>
                        </li>
                    ))}
                </div>
                <div>
                    <button onClick={() => { if(currentPageSaple < Math.ceil( totalPages / 5)) setCurrentPageSaple(currentPageSaple + 1)}}>Proxima página</button>
                    <div>
                        <p>Pagina: {currentPageSaple} de {Math.ceil( totalPages / 5 )} </p>
                    </div>
                    <button onClick={() => {    if(currentPageSaple > 1) setCurrentPageSaple(currentPageSaple - 1)} } >Página Anterior</button>
                </div>
            <h1>Cadastrar Administrador</h1>
            <h1>Atualizar Administrador</h1>
        </div>
    );
}