module.exports = {
    //F4 
    create(request, response){
        const {name, password} = request.body;

        return response.json({});
    }
}