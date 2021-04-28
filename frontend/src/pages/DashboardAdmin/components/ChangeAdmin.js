import React,{useEffect, useState} from 'react';
import api from '../../../services/api';

export default function ChangeAdmin(){
    const [data, setData] = useState([]);
    const [adimChange,setAdimChange] = useState(false);

    async function change(e){
        e.preventDefault();

        const id = e.target.id.value;
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.newPassword.value;
        const passwordConfirmation = e.target.passwordConfirmation.value 

        e.target.passwordConfirmation.value = "";
        e.target.newPassword.value = "";
;        
        const dat = {id, name, email, password, passwordConfirmation}
        
        try{
            await api.put('admin', dat)
                .catch(error => {
                    throw(error)
                })
            ;
            (adimChange)? setAdimChange(false):setAdimChange(true);
            alert('Dados do administrador Alterado');
        }
        catch(error){
            (adimChange)? setAdimChange(false):setAdimChange(true);
            alert('Não foi possível Alterar os Dados do administrador, confira sua senha');
        }
    }
            
    useEffect( () => {
        api.get('/admin/allAdmin')
        .then(response => {
            setData(response.data);
        })
        .catch(error => {
            alert(error);
        })
    },[adimChange]);

    return(
        <div>
            {data.map((data) => (
                <div key={data.id} >
                    <br/>
                    <form onSubmit={change}>
                        <input 
                            type="hidden"
                            name={"id"}
                            required
                            defaultValue={data.id}
                        />
                        <input 
                            type="text"
                            name={'name'}
                            placeholder={data.name}
                            required
                            defaultValue={data.name}
                            
                        />
                        <input 
                            type="email"
                            name={'email'}
                            placeholder={data.email}
                            required
                            defaultValue={data.email}
                        />
                        <input 
                            type="text"
                            name={'newPassword'}
                            placeholder={"NovaSenha"}
                            required
                        />
                        <input 
                            type="text"
                            name={'passwordConfirmation'}
                            placeholder={"Senha Antiga"}
                            required
                        />
                        <button type={'submit'}>Alterar</button>
                    </form>
                </div>
            ))}
        </div>
    )
}