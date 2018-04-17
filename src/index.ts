import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as mysql from 'mysql';
import { Flat } from './model/flat';
import { Usuario } from './model/usuario';

// const express = require('express');
const app = express();         
// const bodyParser = require('body-parser');
const port = 3000; //porta padrão
const usuario = new Usuario();
// const mysql = require('mysql');

//configurando o body parser para pegar POSTS mais tarde
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  next();
});

//definindo as rotas
const router = express.Router();
router.get('/', (req, res) => res.json({ message: 'Funcionando!' }));
app.use('/iflats', router);


// FLAT
router.get('/flats', (req, res) =>{
  execSQLQuery(`SELECT * FROM flat WHERE sn_ativo = 'S'`, res);
})

router.get('/flats/:cd_flat?', (req, res) =>{
  let filter = '';
  if(req.params.cd_flat) filter = ' AND cd_flat=' + parseInt(req.params.cd_flat);
  execSQLQuery(`SELECT * FROM flat WHERE sn_ativo = 'S'` + filter, res);
})

router.get('/flats/usuarios/:cd_usuario?', (req, res) =>{
  let filter = '';
  if(req.params.cd_usuario) filter = ' AND cd_usuario_cadastro=' + parseInt(req.params.cd_usuario);
  execSQLQuery(`SELECT * FROM flat WHERE sn_ativo = 'S'` + filter, res);
})

router.delete('/flats/:cd_flat', (req, res) =>{
    execSQLQuery('DELETE FROM flat WHERE cd_flat=' + parseInt(req.params.cd_flat), res);
})

router.post('/flats', (req, res) =>{

  let ds_titulo_anuncio = null;
  let ds_endereco = null;
  let nr_endereco = 0;
  let ds_complemento = null;
  let ds_pais = null;
  let ds_estado = null;
  let ds_cidade = null;
  let ds_bairro = null;
  let nr_cep = 0;
  let sn_condominio = null;
  let nr_quartos = 0;
  let nr_banheiros = 0;
  let nr_max_pessoas = 0;
  let vl_basico_diaria = 0;
  let nr_area_flat = 0;
  let ds_flat = null;
  let ds_regras = null;
  let sn_internet = null;
  let sn_criancas = null;
  let sn_mobilidade_reduzida = null;
  let sn_fumantes = null;
  let sn_animais = null;
  let sn_festas = null;
  let sn_longo_prazo = null;

  if(req.body.dsTituloAnuncio)
    ds_titulo_anuncio = req.body.dsTituloAnuncio;
  if(req.body.endereco)
    ds_endereco = req.body.endereco;
  if(req.body.numero)
    nr_endereco = req.body.numero;
  if(req.body.complemento)
    ds_complemento = req.body.complemento;
  if(req.body.pais)
    ds_pais = req.body.pais;
  if(req.body.estado)
    ds_estado = req.body.estado;
  if(req.body.cidade)
    ds_cidade = req.body.cidade;
  if(req.body.bairro)
    ds_bairro = req.body.bairro;
  if(req.body.cep)
    nr_cep = req.body.cep;
  if(req.body.snCondominio)
    sn_condominio = req.body.snCondominio;
  if(req.body.nrQuartos)
    nr_quartos = req.body.nrQuartos;
  if(req.body.nrBanheiros)
    nr_banheiros = req.body.nrBanheiros;
  if(req.body.nrMaxPessoas)
    nr_max_pessoas = req.body.nrMaxPessoas;
  if(req.body.vlBasicoDiaria)
    vl_basico_diaria = req.body.vlBasicoDiaria;
  if(req.body.nrAreaFlat)
    nr_area_flat = req.body.nrAreaFlat;
  if(req.body.dsFlat)
    ds_flat = req.body.dsFlat;
  if(req.body.dsRegras)
    ds_regras = req.body.dsRegras;
  if(req.body.snInternet)
    sn_internet = req.body.snInternet;
  if(req.body.snCriancas)
    sn_criancas = req.body.snCriancas;
  if(req.body.snMobilidadeReduzida)
    sn_mobilidade_reduzida = req.body.snMobilidadeReduzida;
  if(req.body.snFumantes)
    sn_fumantes = req.body.snFumantes;
  if(req.body.snAnimais)
    sn_animais = req.body.snAnimais;
  if(req.body.snFestas)
    sn_festas = req.body.snFestas;
  if(req.body.snLongoPrazo)
    sn_longo_prazo = req.body.snLongoPrazo;

  execSQLQuery(`INSERT INTO flat(ds_titulo_anuncio, ds_endereco, nr_endereco, ds_complemento, ds_pais,
                                 ds_estado, ds_cidade, ds_bairro, nr_cep, sn_condominio, nr_quartos,
                                 nr_banheiros, nr_max_pessoas, vl_basico_diaria, nr_area_flat, ds_flat,
                                 ds_regras, sn_internet, sn_criancas, sn_mobilidade_reduzida, sn_fumantes,
                                 sn_animais, sn_festas, sn_longo_prazo, dt_cadastro, cd_usuario_cadastro, sn_ativo) 
                         VALUES('${ds_titulo_anuncio}', '${ds_endereco}', ${nr_endereco}, '${ds_complemento}', '${ds_pais}',
                                '${ds_estado}', '${ds_cidade}', '${ds_bairro}', ${nr_cep}, '${sn_condominio}', ${nr_quartos},
                                ${nr_banheiros}, ${nr_max_pessoas}, ${vl_basico_diaria}, ${nr_area_flat}, '${ds_flat}',
                                '${ds_regras}', '${sn_internet}', '${sn_criancas}', '${sn_mobilidade_reduzida}', '${sn_fumantes}',
                                '${sn_animais}', '${sn_festas}', '${sn_longo_prazo}', SYSDATE(), ${usuario.getCodigo()}, 'S')`, res);
});

router.patch('/flats/:cd_flat', (req, res) =>{
  const cd_flat = parseInt(req.params.cd_flat);
  
  let ds_titulo_anuncio = null;
  let ds_endereco = null;
  let nr_endereco = 0;
  let ds_complemento = null;
  let ds_pais = null;
  let ds_estado = null;
  let ds_cidade = null;
  let ds_bairro = null;
  let nr_cep = 0;
  let sn_condominio = null;
  let nr_quartos = 0;
  let nr_banheiros = 0;
  let nr_max_pessoas = 0;
  let vl_basico_diaria = 0;
  let nr_area_flat = 0;
  let ds_flat = null;
  let ds_regras = null;
  let sn_internet = null;
  let sn_criancas = null;
  let sn_mobilidade_reduzida = null;
  let sn_fumantes = null;
  let sn_animais = null;
  let sn_festas = null;
  let sn_longo_prazo = null;

  if(req.body.dsTituloAnuncio)
    ds_titulo_anuncio = req.body.dsTituloAnuncio;
  if(req.body.endereco)
    ds_endereco = req.body.endereco;
  if(req.body.numero)
    nr_endereco = req.body.numero;
  if(req.body.complemento)
    ds_complemento = req.body.complemento;
  if(req.body.pais)
    ds_pais = req.body.pais;
  if(req.body.estado)
    ds_estado = req.body.estado;
  if(req.body.cidade)
    ds_cidade = req.body.cidade;
  if(req.body.bairro)
    ds_bairro = req.body.bairro;
  if(req.body.cep)
    nr_cep = req.body.cep;
  if(req.body.snCondominio)
    sn_condominio = req.body.snCondominio;
  if(req.body.nrQuartos)
    nr_quartos = req.body.nrQuartos;
  if(req.body.nrBanheiros)
    nr_banheiros = req.body.nrBanheiros;
  if(req.body.nrMaxPessoas)
    nr_max_pessoas = req.body.nrMaxPessoas;
  if(req.body.vlBasicoDiaria)
    vl_basico_diaria = req.body.vlBasicoDiaria;
  if(req.body.nrAreaFlat)
    nr_area_flat = req.body.nrAreaFlat;
  if(req.body.dsFlat)
    ds_flat = req.body.dsFlat;
  if(req.body.dsRegras)
    ds_regras = req.body.dsRegras;
  if(req.body.snInternet)
    sn_internet = req.body.snInternet;
  if(req.body.snCriancas)
    sn_criancas = req.body.snCriancas;
  if(req.body.snMobilidadeReduzida)
    sn_mobilidade_reduzida = req.body.snMobilidadeReduzida;
  if(req.body.snFumantes)
    sn_fumantes = req.body.snFumantes;
  if(req.body.snAnimais)
    sn_animais = req.body.snAnimais;
  if(req.body.snFestas)
    sn_festas = req.body.snFestas;
  if(req.body.snLongoPrazo)
    sn_longo_prazo = req.body.snLongoPrazo;
  
  execSQLQuery(`UPDATE flat SET ds_titulo_anuncio='${ds_titulo_anuncio}', ds_endereco='${ds_endereco}', nr_endereco='${nr_endereco}', ds_complemento='${ds_complemento}', ds_pais='${ds_pais}',
                                ds_estado='${ds_estado}', ds_cidade='${ds_cidade}', ds_bairro='${ds_bairro}', nr_cep='${nr_cep}', sn_condominio='${sn_condominio}', nr_quartos='${nr_quartos}',
                                nr_banheiros='${nr_banheiros}', nr_max_pessoas='${nr_max_pessoas}', vl_basico_diaria='${vl_basico_diaria}', nr_area_flat='${nr_area_flat}', ds_flat='${ds_flat}',
                                ds_regras='${ds_regras}', sn_internet='${sn_internet}', sn_criancas='${sn_criancas}', sn_mobilidade_reduzida='${sn_mobilidade_reduzida}', sn_fumantes='${sn_fumantes}',
                                sn_animais='${sn_animais}', sn_festas='${sn_festas}', sn_longo_prazo='${sn_longo_prazo}', dt_alteracao = SYSDATE(), cd_usuario_alteracao = ${usuario.getCodigo()} WHERE cd_flat=${cd_flat}`, res);
})

/****/


// USUARIO

router.get('/usuarios', (req, res) =>{
  execSQLQuery('SELECT * FROM usuario', res);
})

router.post('/usuarios/login', (req, res) =>{

    execSQLQuery(`SELECT codigo FROM usuario WHERE email='${req.body.email}' AND senha='${req.body.senha}'`, res);

    //var rows = JSON.parse(res.toString());
    console.log(res.get('body'));
    //usuario.setCodigo(rows.codigo);
    usuario.setEmail(req.body.email);
    usuario.setSenha(req.body.senha);  
    
    console.log('logou!');
  
  //   const connection = mysql.createConnection({
  //   host     : 'localhost',
  //   port     : 3306,
  //   user     : 'root',
  //   password : '',
  //   database : 'iflats'
  // });

  // connection.query(`SELECT codigo FROM usuario WHERE email='${req.body.email}' AND senha='${req.body.senha}'`, 
  //   function(error, results, fields){
  //     if(error) {
  //       console.log(error);
  //     }
  //     else {
  //       var rows = JSON.parse(JSON.stringify(results[0]));
        
  //       usuario.setCodigo(rows.codigo);
  //       usuario.setEmail(req.body.email);
  //       usuario.setSenha(req.body.senha);      

  //       console.log('logou!');
  //     }
  //     connection.end();

  //     return;
  // });
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