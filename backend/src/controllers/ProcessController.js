const connection = require('../database/connection');

const data = new Date();

module.exports = {
    async index(request, response){
        const {id_sample} = request.params; 

        const res = await connection('process')
            .select('id','name','describe', "id_sample")
            .where('id_sample',id_sample)
        ;

        return response.json(res);
    },
    async create(request, response){
        const {name, describe, id_sample} = request.body;
        const date = data.getFullYear() + '-' + (data.getMonth()+1) + '-' + (data.getDate()+1);

        const res = await connection('process')
            .insert({
                name: name,
                describe: describe,
                date: date,
                id_sample: id_sample
            })
        ;

        if(res){
            return response.status(200).json({});
        }
        else{
            return response.status(500).json({});
        }
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