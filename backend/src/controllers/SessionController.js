const connection = require('../database/connection');

const bcrypt = require('bcrypt');

module.exports = {
    //F4 
    async create(request, response){
        const {email, password} = request.body;

        //testar se o email passado esta cadastrado e obter o hash code da senha
        const [res] = await connection('admin')
            .select('*')
            .where('email',email)

        //caso o usuário entre com um email não cadastrado
        if(!res){
            return response.status(406).json({
                error: 'Checar se não cometeu algum erro ao digitar seus dados'
            });
        }

        //recuperar a se senha do hash e testar
        bcrypt.compare(password,res.password, (err, result) => {
            if(result){
                return response.json({
                    id: res.id,
                    name: res.name
                });
            }
            else{
                return response.status(406).json({
                error: 'Checar se não cometeu algum erro ao digitar seus dados'
            });
            }
        })
    }
}