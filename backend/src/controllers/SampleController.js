const crypto = require('crypto');
const connection = require('../database/connection');

const data = new Date();

module.exports = {
    //F9
    async index(request, response){
        const {code} = request.params;

        const [res] = await connection('sample')
            .select('*')
            .where('code',code)
        ;

        return response.json(res);

    },

    //F5
    async create(request, response){
        //variávei verificadas com o celebrate
        const {patientName, description, state} = request.body;
        console.log(patientName, description, state);
        const date = data.getFullYear() + '-' + (data.getMonth()+1) + '-' + (data.getDate()+1);
        var code = crypto.randomBytes(4).toString('HEX')

        const id_sample = await connection('sample')
            .insert({
                code,
                patientName,
                description,
                state,
                date
            })
        ;
        
        //garantir que só haverá um código de amostra
        code =   code + '-' + id_sample;
        await connection('sample')
            .where('id', id_sample)
            .update({
                code: code
            })
        ;
        
        return response.status(201).json({ 
            "status": "Amostra Cadastrada",
            "code": code
        });
    },

    // F6
    async change(request, response){
        const {id, state} = request.body;

        await connection('sample')
            .where('id', id)
            .update({
                'state': state
            })
        ;

        return response.status(200).json({
            'status': "Rastreaménto Atualizado" 
        });
    }
}