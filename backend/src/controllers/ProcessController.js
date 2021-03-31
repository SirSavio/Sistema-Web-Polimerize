const connection = require('../database/connection');

const data = new Date();

module.exports = {
    index(request, response){
        return response.json({});
    },
    async create(request, response){
        const {name, describe, id_sample} = request.body;

        await connection('process')
            .insert({
                name: name,
                describe: describe,
                id_sample: id_sample
            })
        ;

        return response.status(200).json({});
    },
    async change(request, response){
        const {id, name, describe} = request.body;

        const a = await connection('process')
            .where('id',id)
            .update({
                name,
                describe
            })
        ;

        return response.json({});
    }
}