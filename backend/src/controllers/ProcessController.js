const connection = require('../database/connection');

const data = new Date();

module.exports = {
    async index(request, response){
        const {id_sample} = request.params; 

        const res = await connection('process')
            .select('id','name','describe', 'admin_name', "date" ,"id_sample")
            .orderBy('date')
            .where('id_sample',id_sample)
        ;

        return response.json(res);
    },
    async create(request, response){
        const date = new Date();
        const {name, describe,admin_name, id_sample} = request.body;

        const res = await connection('process')
            .insert({
                name: name,
                describe: describe,
                admin_name: admin_name,
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
        const date = new Date();
        const {id, name, admin_name, describe} = request.body;

        const a = await connection('process')
            .where('id',id)
            .update({
                name,
                describe,
                admin_name,
                date
            })
        ;

        return response.json({});
    }
}