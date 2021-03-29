// plugin utilizado para criar senhas hashcode no banco. Segurança
const bcrypt = require('bcrypt');

const connection = require('../database/connection');

module.exports = {
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

        return response.json({ "status": "Usuário Cadastrado"});
    },
    //F3
    change(request, response){
        return response.json({});
    }
}