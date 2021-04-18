import React,{useState} from 'react';

import RegisterSample from './components/RegisterSample';
import ManageSample from './components/ManagerSanple';
import RegisterAdmin from './components/RegisterAdmin';
import ChangeAdmin from './components/ChangeAdmin';


export default function DashboardAdmin(){

    const [registerSample, setRegisterSample] = useState(true);
    const [manageSample, setManageSample] = useState(false);
    const [registerAdmin, setRegisterAdmin] = useState(false);
    const [changeAdmin, setChangeAdmin] = useState(false);
    
    return(
        <div>
            <button type={'button'} onClick={()=>{(registerSample)?setRegisterSample(false):setRegisterSample(true)}}> 
                Registrar Amostras 
            </button>
            <br/>
            {registerSample && (<RegisterSample/>)}
            <br/>

            <button type={'button'} onClick={()=>{(manageSample)?setManageSample(false):setManageSample(true)}}>
                Gerenciar amostras
            </button >
            <br/>
            {manageSample && (<ManageSample/>)}
            <br/>

            <button type={'button'} onClick={()=>{(registerAdmin)?setRegisterAdmin(false):setRegisterAdmin(true)}}>
                Cadastro de Administrador
            </button>
            <br/>
            {registerAdmin && (<RegisterAdmin/>)}
            <br/>

            <button type={'button'} onClick={()=>{(changeAdmin)?setChangeAdmin(false):setChangeAdmin(true)}}>
                Atualizar administrador
            </button>
            <br/>
            {changeAdmin && (<ChangeAdmin/>)}
            <br/>
        </div>  
    );
}