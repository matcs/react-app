const express = require ('express');
const routes = require('./routes');
const cors = require('cors');
const { errors } = require('celebrate')
const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors());

/**
 * Rotas e Recursos
 */

 /**
  * Métodos HTTP
  * 
  * GET: Buscar uma informação do back-end
  * POST: Criar um informação no back-end
  * PUT: Alterar um informação no back-end
  * DELETE: Deletar uma informação no back-end
  */

  /**
   * Tipos de parâmetros:
   * 
   * Query Params: Parâmetros nomeados enviados na rota após "?" (filtros,paginação)
   * Route Params: Parâmetros utilizado para identificar recursos
   * Request Body: Corpo da reposição, utilizado para criar ou alterar recursos
   * 
   */

   /**
    * Driver: SELECT * FROM users
    * Query Builder: table('users').select('*').where()
    */

app.listen(3333);