import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as mysql from 'mysql';
import { Flat } from './model/flat';

// const express = require('express');
const app = express();         
// const bodyParser = require('body-parser');
const port = 3000; //porta padrão
// const mysql = require('mysql');

//configurando o body parser para pegar POSTS mais tarde
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

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

router.get('/flats/usuarios/:cd_usuario?', (req, res) =>{
  let filter = '';
  if(req.params.cd_usuario) filter = ' WHERE cd_usuario_cadastro=' + parseInt(req.params.cd_usuario);
  execSQLQuery('SELECT * FROM flat' + filter, res);
})

router.delete('/flats/:cd_flat', (req, res) =>{
    execSQLQuery('DELETE FROM flat WHERE cd_flat=' + parseInt(req.params.cd_flat), res);
})

router.post('/flats', (req, res) =>{
  const ds_titulo_anuncio = req.body.dsTituloAnuncio;
  const ds_endereco = req.body.endereco;
  const nr_endereco = req.body.numero;
  const ds_complemento = req.body.complemento;
  const ds_pais = req.body.pais;
  const ds_estado = req.body.estado;
  const ds_cidade = req.body.cidade;
  const ds_bairro = req.body.bairro;
  const nr_cep = req.body.cep;
  const sn_condominio = req.body.snCondominio;
  const nr_quartos = req.body.nrQuartos;
  const nr_banheiros = req.body.nrBanheiros;
  const nr_max_pessoas = req.body.nrMaxPessoas;
  const vl_basico_diaria = req.body.vlBasicoDiaria;
  const nr_area_flat = req.body.nrAreaFlat;
  const ds_flat = req.body.dsFlat;
  const ds_regras = req.body.dsRegras;
  const sn_internet = req.body.snInternet;
  const sn_criancas = req.body.snCriancas;
  const sn_mobilidade_reduzida = req.body.snMobilidadeReduzida;
  const sn_fumantes = req.body.snFumantes;
  const sn_animais = req.body.snAnimais;
  const sn_festas = req.body.snFestas;
  const sn_longo_prazo = req.body.snLongoPrazo;

  execSQLQuery(`INSERT INTO flat(ds_titulo_anuncio, ds_endereco, nr_endereco, ds_complemento, ds_pais,
                                 ds_estado, ds_cidade, ds_bairro, nr_cep, sn_condominio, nr_quartos,
                                 nr_banheiros, nr_max_pessoas, vl_basico_diaria, nr_area_flat, ds_flat,
                                 ds_regras, sn_internet, sn_criancas, sn_mobilidade_reduzida, sn_fumantes,
                                 sn_animais, sn_festas, sn_longo_prazo, dt_cadastro, cd_usuario_cadastro, sn_ativo) 
                         VALUES('${ds_titulo_anuncio}', '${ds_endereco}', ${nr_endereco}, '${ds_complemento}', '${ds_pais}',
                                '${ds_estado}', '${ds_cidade}', '${ds_bairro}', ${nr_cep}, '${sn_condominio}', ${nr_quartos},
                                ${nr_banheiros}, ${nr_max_pessoas}, ${vl_basico_diaria}, ${nr_area_flat}, '${ds_flat}',
                                '${ds_regras}', '${sn_internet}', '${sn_criancas}', '${sn_mobilidade_reduzida}', '${sn_fumantes}',
                                '${sn_animais}', '${sn_festas}', '${sn_longo_prazo}', SYSDATE, 1, 'S')`, res);
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

function toFlat(req): Flat {

  return new Flat(  req.body.ds_titulo_anuncio,
                    req.body.ds_endereco,
                    req.body.nr_endereco,
                    req.body.ds_complemento,
                    req.body.ds_pais,
                    req.body.ds_estado,
                    req.body.ds_cidade,
                    req.body.ds_bairro,
                    req.body.nr_cep,
                    req.body.sn_condominio,
                    req.body.nr_quartos,
                    req.body.nr_banheiros,
                    req.body.nr_max_pessoas,
                    req.body.vl_basico_diaria,
                    req.body.nr_area_flat,
                    req.body.ds_flat,
                    req.body.ds_regras,
                    req.body.sn_internet,
                    req.body.sn_criancas,
                    req.body.sn_mobilidade_reduzida,
                    req.body.sn_fumantes,
                    req.body.sn_animais,
                    req.body.sn_festas,
                    req.body.sn_longo_prazo,
                    req.body.dt_cadastro,
                    req.body.cd_usuario_cadastro,
                    req.body.dt_alteracao,
                    req.body.cd_usuario_alteracao,
                    req.body.sn_ativo);
}


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