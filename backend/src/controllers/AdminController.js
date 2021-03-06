// plugin utilizado para criar senhas hashcode no banco. Segurança
const bcrypt = require('bcrypt');

const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        const id = request.headers.authorization;

        const [res] = await connection('admin')
            .select('name', 'email')
            .where('id', id)
        ;

        if(res){
            return response.json({
                "name": res.name,
                "email": res.email
            });
        }
        else{
            return response.status(401).json({
                "error": 'Operation not permitted'
            });
        }
        
    },

    async indexAllAdmin(request, response){
        const res = await connection('admin')
            .select('id','name','email')
        ;

        if(res){
            return response.json(res);
        }
        else{
            return response.status(401).json({
                "error": "Operation not permitted"
            })
        }
    },

    //F2
    async create(request, response){
        const {name, email} = request.body;

        /*  O método Assíncrono é melhor, pois não bloqueia o loop para realizar o processo.
            Mas, como conhecemos a regra de negócio, sabemos que não será criado inúmeros 
            administradores simultaneamente. Portanto vamos usar o método síncrono.         */
        const password = bcrypt.hashSync(request.body.password, 10);

        //verificar se há somente um email
        const existEmail = await connection('admin')
            .where("email", email)
            .select("email")
            .first()
        ;

        if(!existEmail){
            await connection('admin').insert({
                name,
                email,
                password
            });
        }
        else{
            return response.status(401).json({
                error: 'Operation not permitted'
            });
        }

        return response.status(201).json({ "status": "Usuário Cadastrado"});
    },

    //F3
    async change(request, response){
        /* 
            espera receber um json
            {
                "name": "<novo_name",
                "email": "<novo_email>",
                "password": "<nova_senha>",
                "passwordConfirmation": "<senha_atual>"
            }

            Com a atual implementação é necessário passar todos os parâmetros,
            mesmo que não tenham sido modificados, pois, se não forem preenchidos 
            serão barrados no celebrate.

            Se a senha não tiver sido modificada, a senha de confirmação será enviada no lugar.
            para preencher o campo de senha. Pois a senha não será retornada pelo index

            Caso a senha de confirmação esteja errada, não irá alterar a senha que salva no 
            banco. Uma vez que ela é validada com a senha hash do banco antes de fazer qualquer alteração 

            
        */
        //celebrate esta garantindo que, se chegou até aqui, essas variáveis existem e são válidas
        const {id, name, email, passwordConfirmation} = request.body;
        var {password} = request.body;

        // recuperar o hash do id logado
        const res = await connection('admin')
            .select('password')
            .where('id', id)
            .first()
        ;

        //se não existe uma senha para o id fornecido 
        if(!res){
            return response.status(401).json({
                error: 'Operation not permitted'
            });
        }

        //verificar se a senha de confirmação fornecida está correta
        if(bcrypt.compareSync(passwordConfirmation,res.password)){
            password = bcrypt.hashSync(password,10);
            await connection('admin')
                .where('id', id)
                .update({
                    name: name,
                    email: email,
                    password: password
                })
            ;

            return response.status(202).json({
                resultado: "Mudança aceita"
            });
        }
        else{
            return response.status(401).json({
                error: "Operation not permitted, verify your password"
            });
        }
    },

    async erase(request, response){
        const {id} = request.body;
        //validar que não serão excluidos todos os admins 
        const [count] = await connection('admin').count();
        
        if(count['count(*)'] > 1 ){
            const res = await connection('admin')
                .where('id', id)
                .delete()
            ;

            if(res){
                return response.status(201).json({"status" :"Usuário excluido"});
            }
        }

        return response.status(401).json({ststus:"Operation not permitted"});
    }
}