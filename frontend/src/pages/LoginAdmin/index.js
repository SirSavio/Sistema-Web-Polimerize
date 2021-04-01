import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import api from '../../services/api';

export default function LoginAdmin(){
    /*-----------------------------------------------------*/
    //variáveis
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const history = useHistory();
    const nameAdmin = localStorage.getItem('adminPolimerizeName');
    
    
    /*-----------------------------------------------------*/
    //controle
    if(nameAdmin ){
        return(
            <div>
                <strong>
                Você já está logado como:   {nameAdmin} <br/> 
                Caso queira queira entrar com outra conta, use o botão abaixo para sair desta
                </strong>
                <button type={'submit'} onClick={Logout} >Logout</button>
                <button type={'submit'} onClick={() => { history.push('/')} } >Voltar</button>
            </div>
        );
    }

    /*-----------------------------------------------------*/
    //funções
    async function Logout(){
        localStorage.removeItem('adminPolimerizeId');
        localStorage.removeItem('adminPolimerizeName');
        history.push('/login')
    }

    async function Login(e){
        e.preventDefault();

        const data = {email,password};

            try{
                const res = await api.post('session', data)
                localStorage.setItem('adminPolimerizeId', res.data.id);
                localStorage.setItem('adminPolimerizeName', res.data.name);

                history.push('/')
            }
            catch(err){
                alert('Checar se não cometeu algum erro ao digitar seus dados');
            }
    }

    /*-----------------------------------------------------*/
    return(
        <div>
            <form onSubmit={Login} >
                <input 
                    type="email" 
                    placeholder="E-mail"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <input 
                    type="password" 
                    placeholder="senha"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <button type="submit">Entrar</button>
            </form>
        </div>
    );
}