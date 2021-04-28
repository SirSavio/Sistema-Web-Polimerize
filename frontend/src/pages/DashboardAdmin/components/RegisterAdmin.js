import React, {useState} from 'react';
import api from '../../../services/api';

export default function RegisterAdmin(){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function regAdmin(e){
        e.preventDefault();

        const data = {name, email, password}

        try{
            await api.post('admin',data)
            .catch(erro => {
                throw(erro);
            });
            setName('');
            setEmail('');
            setPassword('');
            alert('Administrador Cadastrado');
        }
        catch(erro){
            setName('');
            setEmail('');
            setPassword('');
            alert(  'Não foi possível cadastrar o Adminstrador.\n' + 
                    'Checar se a senha tem tem no mínimo 8 digitos com uma letra e um número '+
                    'ou o email é válido');
        }
    }

    return(
        <div>
            <h1>Cadastrar Administrador</h1>
            <form onSubmit={regAdmin}>
                <input 
                    type="text"
                    placeholder={'Nome do Administrador'}
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                />

                <input
                    type="email"
                    placeholder={'Email do Administrador'}
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />

                <input 
                    type="text"
                    placeholder="senha do Administrador"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />

                <button type='submit'>Cadastrar</button>
            </form> 
        </div>
    )
}