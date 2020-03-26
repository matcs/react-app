const connection = require('../database/connection');

module.exports = {
    async index (request,response){

        const [count] = await connection('incidentes').count();

        console.log(count);

        const { page = 1} = request.query;
        const incidentes = await connection('incidentes')
        .join('ongs','ong_id','=','incidentes.ong_id')
        .limit(5)
        .offset((page - 1)*5)
        .select('*');

        response.header('X-total-count',count['count(*)']);

        return response.json(incidentes);
    },

    async create(request,response){
        const { title,description,value} = request.body;
        request.headers;
        const ong_id = request.headers.authorization;

        const [id] = await connection ('incidentes').insert({
            title,
            description,
            value,
            ong_id
        });
    
        return response.json({id});
    },

    async delete(request,response){
        const {id} = request.params;
        const ong_id = request.headers.authorization;

        const incidents = await connection('incidentes')
        .where('id',id).select('ong_id').first();

        if(incidents.ong_id !== ong_id){
            //HTTP STATS
            return response.status(401).json({error:'Operation not permited'});
            }
            
            await connection('incidentes').where('id',id).delete();
            
            return response.status(204).send();
    }
}