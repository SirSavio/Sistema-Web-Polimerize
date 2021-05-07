const connection = require('../database/connection');
const jwt = require('jsonwebtoken');

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
        bcrypt.compare(password,res.password , (err, result) => {
                if(result){
                    const myEmail = res.email;
                    const myName = res.name;
                    const myHash = res.password;
                    const myId = res.id;
                    
                    const carga = ({"id": myId, "email": myEmail});
                    const token = jwt.sign(carga, myHash);

                    const data = ({"name": myName, "email": myEmail ,"token": token});
                    
                    return response.json(data);
                }
                else{
                    return response.status(406).json({
                    error: 'Checar se não cometeu algum erro ao digitar seus dados'
                });
            }
        })
    },

    async check(request, response){
        const {token, email} = request.body;

        
        const [res] = await connection('admin')
        .where("email", email)
        .select('email','password', 'id')
        ;
        
        // o Que é verificado?
        // se o email existe no banco
        // se esse email existe -> hash -> descriptograva o tokin 
        // email.tokin == email && id.token == id se sim 202 else 401
        
        if(res == undefined) return response.status(401).json();
        jwt.verify(token, res.password, (error, decode) => {
            if(error){
                return response.status(401).json(); 
            } 
            else if(res.email === decode.email && res.id === decode.id){
                return response.status(202).json();
            }
            else{
                return response.status(401).json();
            }
        });

        return response.status(401).json();
    }
}