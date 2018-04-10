const express = require('express');
const app = express();         
const bodyParser = require('body-parser');
const port = 3000; //porta padrão
const mysql = require('mysql');

//configurando o body parser para pegar POSTS mais tarde
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//definindo as rotas
const router = express.Router();
router.get('/', (req, res) => res.json({ message: 'Funcionando!' }));
app.use('/iflats', router);


// FLAT
router.get('/flats', (req, res) =>{
  execSQLQuery('SELECT * FROM flat', res);
})

router.get('/flats/:cd_flat?', (req, res) =>{
  let filter = '';
  if(req.params.cd_flat) filter = ' WHERE cd_flat=' + parseInt(req.params.cd_flat);
  execSQLQuery('SELECT * FROM flat' + filter, res);
})

router.delete('/flats/:cd_flat', (req, res) =>{
    execSQLQuery('DELETE FROM flat WHERE cd_flat=' + parseInt(req.params.cd_flat), res);
})

router.post('/flats', (req, res) =>{
  const ds_flat = req.body.ds_flat;
  execSQLQuery(`INSERT INTO flat(ds_flat) VALUES('${ds_flat}')`, res);
});

router.patch('/flats/:cd_flat', (req, res) =>{
  const cd_flat = parseInt(req.params.cd_flat);
  const ds_flat = req.body.ds_flat;
  execSQLQuery(`UPDATE flat SET ds_flat='${ds_flat}' WHERE cd_flat=${cd_flat}`, res);
})

/****/


// USUARIO

router.get('/usuarios', (req, res) =>{
  execSQLQuery('SELECT * FROM usuario', res);
})


//inicia o servidor
app.listen(port);
console.log('API funcionando!');

function execSQLQuery(sqlQry, res){
    const connection = mysql.createConnection({
      host     : 'localhost',
      port     : 3306,
      user     : 'root',
      password : '',
      database : 'iflats'
    });
  
    connection.query(sqlQry, function(error, results, fields){
        if(error) 
          res.json(error);
        else
          res.json(results);
        connection.end();
        console.log('executou!');
    });
}