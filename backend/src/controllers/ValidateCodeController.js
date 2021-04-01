const connection = require('../database/connection');
module.exports ={ 
    //F8
    async index(request, response){
        const {code} = request.params;

        const resultCode = await connection('sample')
            .select('code')
            .where('code',code)
            .first()
        ;
        if(resultCode){
            return response.status(200).json(resultCode);
        }
        else{
            return response.status(400).json({});
        }
    }
}