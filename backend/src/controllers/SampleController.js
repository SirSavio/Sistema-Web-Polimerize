const crypto = require('crypto');
const connection = require('../database/connection');

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

    async indexCount(request, response){
        const [count] = await connection('sample').count();
        return response.json(count['count(*)']);
    },

    //F6
    async indexPages(request, response){
        const {page = 1} = request.query;
        const [count] = await connection('sample').count();
        // const formattedDate = fns.format(date,"dd/MM/yyyy HH:mm:SS");

        const res = await connection('sample')
            .limit(5)
            .offset((page-1)*5)
            .select('*')
        ;

        return response.json(res);
    },

    //F5
    async create(request, response){
        const date = new Date();
        const {patientName, description, state} = request.body;
        var code = crypto.randomBytes(4).toString('HEX');

        const id_sample = await connection('sample')
            .insert({
                code,
                patientName,
                description,
                'documentation': '',
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