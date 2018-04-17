"use strict";
exports.__esModule = true;
var express = require("express");
var bodyParser = require("body-parser");
var mysql = require("mysql");
var usuario_1 = require("./model/usuario");
// const express = require('express');
var app = express();
// const bodyParser = require('body-parser');
var port = 3000; //porta padrão
var usuario = new usuario_1.Usuario();
// const mysql = require('mysql');
//configurando o body parser para pegar POSTS mais tarde
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    next();
});
//definindo as rotas
var router = express.Router();
router.get('/', function (req, res) { return res.json({ message: 'Funcionando!' }); });
app.use('/iflats', router);
// FLAT
router.get('/flats', function (req, res) {
    execSQLQuery("SELECT * FROM flat WHERE sn_ativo = 'S'", res);
});
router.get('/flats/:cd_flat?', function (req, res) {
    var filter = '';
    if (req.params.cd_flat)
        filter = ' AND cd_flat=' + parseInt(req.params.cd_flat);
    execSQLQuery("SELECT * FROM flat WHERE sn_ativo = 'S'" + filter, res);
});
router.get('/flats/usuarios/:cd_usuario?', function (req, res) {
    var filter = '';
    if (req.params.cd_usuario)
        filter = ' AND cd_usuario_cadastro=' + parseInt(req.params.cd_usuario);
    execSQLQuery("SELECT * FROM flat WHERE sn_ativo = 'S'" + filter, res);
});
router["delete"]('/flats/:cd_flat', function (req, res) {
    execSQLQuery('DELETE FROM flat WHERE cd_flat=' + parseInt(req.params.cd_flat), res);
});
router.post('/flats', function (req, res) {
    var ds_titulo_anuncio = null;
    var ds_endereco = null;
    var nr_endereco = 0;
    var ds_complemento = null;
    var ds_pais = null;
    var ds_estado = null;
    var ds_cidade = null;
    var ds_bairro = null;
    var nr_cep = 0;
    var sn_condominio = null;
    var nr_quartos = 0;
    var nr_banheiros = 0;
    var nr_max_pessoas = 0;
    var vl_basico_diaria = 0;
    var nr_area_flat = 0;
    var ds_flat = null;
    var ds_regras = null;
    var sn_internet = null;
    var sn_criancas = null;
    var sn_mobilidade_reduzida = null;
    var sn_fumantes = null;
    var sn_animais = null;
    var sn_festas = null;
    var sn_longo_prazo = null;
    if (req.body.dsTituloAnuncio)
        ds_titulo_anuncio = req.body.dsTituloAnuncio;
    if (req.body.endereco)
        ds_endereco = req.body.endereco;
    if (req.body.numero)
        nr_endereco = req.body.numero;
    if (req.body.complemento)
        ds_complemento = req.body.complemento;
    if (req.body.pais)
        ds_pais = req.body.pais;
    if (req.body.estado)
        ds_estado = req.body.estado;
    if (req.body.cidade)
        ds_cidade = req.body.cidade;
    if (req.body.bairro)
        ds_bairro = req.body.bairro;
    if (req.body.cep)
        nr_cep = req.body.cep;
    if (req.body.snCondominio)
        sn_condominio = req.body.snCondominio;
    if (req.body.nrQuartos)
        nr_quartos = req.body.nrQuartos;
    if (req.body.nrBanheiros)
        nr_banheiros = req.body.nrBanheiros;
    if (req.body.nrMaxPessoas)
        nr_max_pessoas = req.body.nrMaxPessoas;
    if (req.body.vlBasicoDiaria)
        vl_basico_diaria = req.body.vlBasicoDiaria;
    if (req.body.nrAreaFlat)
        nr_area_flat = req.body.nrAreaFlat;
    if (req.body.dsFlat)
        ds_flat = req.body.dsFlat;
    if (req.body.dsRegras)
        ds_regras = req.body.dsRegras;
    if (req.body.snInternet)
        sn_internet = req.body.snInternet;
    if (req.body.snCriancas)
        sn_criancas = req.body.snCriancas;
    if (req.body.snMobilidadeReduzida)
        sn_mobilidade_reduzida = req.body.snMobilidadeReduzida;
    if (req.body.snFumantes)
        sn_fumantes = req.body.snFumantes;
    if (req.body.snAnimais)
        sn_animais = req.body.snAnimais;
    if (req.body.snFestas)
        sn_festas = req.body.snFestas;
    if (req.body.snLongoPrazo)
        sn_longo_prazo = req.body.snLongoPrazo;
    execSQLQuery("INSERT INTO flat(ds_titulo_anuncio, ds_endereco, nr_endereco, ds_complemento, ds_pais,\n                                 ds_estado, ds_cidade, ds_bairro, nr_cep, sn_condominio, nr_quartos,\n                                 nr_banheiros, nr_max_pessoas, vl_basico_diaria, nr_area_flat, ds_flat,\n                                 ds_regras, sn_internet, sn_criancas, sn_mobilidade_reduzida, sn_fumantes,\n                                 sn_animais, sn_festas, sn_longo_prazo, dt_cadastro, cd_usuario_cadastro, sn_ativo) \n                         VALUES('" + ds_titulo_anuncio + "', '" + ds_endereco + "', " + nr_endereco + ", '" + ds_complemento + "', '" + ds_pais + "',\n                                '" + ds_estado + "', '" + ds_cidade + "', '" + ds_bairro + "', " + nr_cep + ", '" + sn_condominio + "', " + nr_quartos + ",\n                                " + nr_banheiros + ", " + nr_max_pessoas + ", " + vl_basico_diaria + ", " + nr_area_flat + ", '" + ds_flat + "',\n                                '" + ds_regras + "', '" + sn_internet + "', '" + sn_criancas + "', '" + sn_mobilidade_reduzida + "', '" + sn_fumantes + "',\n                                '" + sn_animais + "', '" + sn_festas + "', '" + sn_longo_prazo + "', SYSDATE(), " + usuario.getCodigo() + ", 'S')", res);
});
router.patch('/flats/:cd_flat', function (req, res) {
    var cd_flat = parseInt(req.params.cd_flat);
    var ds_titulo_anuncio = null;
    var ds_endereco = null;
    var nr_endereco = 0;
    var ds_complemento = null;
    var ds_pais = null;
    var ds_estado = null;
    var ds_cidade = null;
    var ds_bairro = null;
    var nr_cep = 0;
    var sn_condominio = null;
    var nr_quartos = 0;
    var nr_banheiros = 0;
    var nr_max_pessoas = 0;
    var vl_basico_diaria = 0;
    var nr_area_flat = 0;
    var ds_flat = null;
    var ds_regras = null;
    var sn_internet = null;
    var sn_criancas = null;
    var sn_mobilidade_reduzida = null;
    var sn_fumantes = null;
    var sn_animais = null;
    var sn_festas = null;
    var sn_longo_prazo = null;
    if (req.body.dsTituloAnuncio)
        ds_titulo_anuncio = req.body.dsTituloAnuncio;
    if (req.body.endereco)
        ds_endereco = req.body.endereco;
    if (req.body.numero)
        nr_endereco = req.body.numero;
    if (req.body.complemento)
        ds_complemento = req.body.complemento;
    if (req.body.pais)
        ds_pais = req.body.pais;
    if (req.body.estado)
        ds_estado = req.body.estado;
    if (req.body.cidade)
        ds_cidade = req.body.cidade;
    if (req.body.bairro)
        ds_bairro = req.body.bairro;
    if (req.body.cep)
        nr_cep = req.body.cep;
    if (req.body.snCondominio)
        sn_condominio = req.body.snCondominio;
    if (req.body.nrQuartos)
        nr_quartos = req.body.nrQuartos;
    if (req.body.nrBanheiros)
        nr_banheiros = req.body.nrBanheiros;
    if (req.body.nrMaxPessoas)
        nr_max_pessoas = req.body.nrMaxPessoas;
    if (req.body.vlBasicoDiaria)
        vl_basico_diaria = req.body.vlBasicoDiaria;
    if (req.body.nrAreaFlat)
        nr_area_flat = req.body.nrAreaFlat;
    if (req.body.dsFlat)
        ds_flat = req.body.dsFlat;
    if (req.body.dsRegras)
        ds_regras = req.body.dsRegras;
    if (req.body.snInternet)
        sn_internet = req.body.snInternet;
    if (req.body.snCriancas)
        sn_criancas = req.body.snCriancas;
    if (req.body.snMobilidadeReduzida)
        sn_mobilidade_reduzida = req.body.snMobilidadeReduzida;
    if (req.body.snFumantes)
        sn_fumantes = req.body.snFumantes;
    if (req.body.snAnimais)
        sn_animais = req.body.snAnimais;
    if (req.body.snFestas)
        sn_festas = req.body.snFestas;
    if (req.body.snLongoPrazo)
        sn_longo_prazo = req.body.snLongoPrazo;
    execSQLQuery("UPDATE flat SET ds_titulo_anuncio='" + ds_titulo_anuncio + "', ds_endereco='" + ds_endereco + "', nr_endereco='" + nr_endereco + "', ds_complemento='" + ds_complemento + "', ds_pais='" + ds_pais + "',\n                                ds_estado='" + ds_estado + "', ds_cidade='" + ds_cidade + "', ds_bairro='" + ds_bairro + "', nr_cep='" + nr_cep + "', sn_condominio='" + sn_condominio + "', nr_quartos='" + nr_quartos + "',\n                                nr_banheiros='" + nr_banheiros + "', nr_max_pessoas='" + nr_max_pessoas + "', vl_basico_diaria='" + vl_basico_diaria + "', nr_area_flat='" + nr_area_flat + "', ds_flat='" + ds_flat + "',\n                                ds_regras='" + ds_regras + "', sn_internet='" + sn_internet + "', sn_criancas='" + sn_criancas + "', sn_mobilidade_reduzida='" + sn_mobilidade_reduzida + "', sn_fumantes='" + sn_fumantes + "',\n                                sn_animais='" + sn_animais + "', sn_festas='" + sn_festas + "', sn_longo_prazo='" + sn_longo_prazo + "', dt_alteracao = SYSDATE(), cd_usuario_alteracao = " + usuario.getCodigo() + " WHERE cd_flat=" + cd_flat, res);
});
/****/
// USUARIO
router.get('/usuarios', function (req, res) {
    execSQLQuery('SELECT * FROM usuario', res);
});
router.post('/usuarios/login', function (req, res) {
    execSQLQuery("SELECT codigo FROM usuario WHERE email='" + req.body.email + "' AND senha='" + req.body.senha + "'", res);
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
});
//inicia o servidor
app.listen(port);
console.log('API funcionando!');
function execSQLQuery(sqlQry, res) {
    var connection = mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '',
        database: 'iflats'
    });
    connection.query(sqlQry, function (error, results, fields) {
        if (error)
            res.json(error);
        else
            res.json(results);
        connection.end();
        console.log('executou!');
    });
}
