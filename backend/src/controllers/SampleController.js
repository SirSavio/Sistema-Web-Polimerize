const crypto = require('crypto');
const { request } = require('http');
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
        //patientName, no ínico o cliente era tratado como passiente, por isso o nome da variável
        const {patientName, description, state, originSample} = request.body;

        var code;
        var padaoPolimerize = "0508" + originSample;
        var randCode = crypto.randomBytes(4).toString('HEX');
        var testCode = padaoPolimerize + randCode;
        

        //enquanto o código gerado não for único no banco vai gerar um novo;
        while(await connection('sample').select('code').where('code',testCode).first()){
            randCode = crypto.randomBytes(4).toString('HEX');
            testCode = padaoPolimerize + randCode;
        }

        code = testCode;

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
        
        return response.status(201).json({ 
            "status": "Amostra Cadastrada",
            "code": code
        });
    },
    
    async createDocumentation(request, response){
        const {documentation , id} = request.body;
        console.log(id,documentation);


        const res = await connection('sample')
            .where('id', id)
            .update({"documentation": documentation})
        ;

        if(res){
            return response.status(201).json();
        }

        return response.status(401).json();

    },

    // F6
    async change(request, response){
        const {id, state} = request.body;

        await connection('sample')
            .where('id', id)
            .update({'state': state})
        ;
            
            return response.status(200).json({
                'status': "Rastreaménto Atualizado" 
            });
        }
    }