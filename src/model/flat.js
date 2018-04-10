"use strict";
exports.__esModule = true;
var Flat = /** @class */ (function () {
    function Flat(dsTituloAnuncio, endereco, numero, complemento, pais, estado, cidade, bairro, cep, snCondominio, nrQuartos, nrBanheiros, nrMaxPessoas, vlBasicoDiaria, nrAreaFlat, dsFlat, dsRegras, snInternet, snCriancas, snMobilidadeReduzida, snFumantes, snAnimais, snFestas, snLongoPrazo, dtCadastro, cdUsuarioCadastro, dtAlteracao, cdUsuarioAlteracao, snAtivo) {
        this.dsTituloAnuncio = dsTituloAnuncio;
        this.endereco = endereco;
        this.numero = numero;
        this.complemento = complemento;
        this.pais = pais;
        this.estado = estado;
        this.cidade = cidade;
        this.bairro = bairro;
        this.cep = cep;
        this.snCondominio = snCondominio;
        this.nrQuartos = nrQuartos;
        this.nrBanheiros = nrBanheiros;
        this.nrMaxPessoas = nrMaxPessoas;
        this.vlBasicoDiaria = vlBasicoDiaria;
        this.nrAreaFlat = nrAreaFlat;
        this.dsFlat = dsFlat;
        this.dsRegras = dsRegras;
        this.snInternet = snInternet;
        this.snCriancas = snCriancas;
        this.snMobilidadeReduzida = snMobilidadeReduzida;
        this.snFumantes = snFumantes;
        this.snAnimais = snAnimais;
        this.snFestas = snFestas;
        this.snLongoPrazo = snLongoPrazo;
        this.dtCadastro = dtCadastro;
        this.cdUsuarioCadastro = cdUsuarioCadastro;
        this.dtAlteracao = dtAlteracao;
        this.cdUsuarioAlteracao = cdUsuarioAlteracao;
        this.snAtivo = snAtivo;
    }
    Flat.prototype.setCodigo = function (codigo) {
        this.codigo = codigo;
    };
    Flat.prototype.getCodigoFlat = function () {
        return this.codigo;
    };
    Flat.prototype.setDsTituloAnuncio = function (dsTituloAnuncio) {
        this.dsTituloAnuncio = dsTituloAnuncio;
    };
    Flat.prototype.getDsTituloAnuncio = function () {
        return this.dsTituloAnuncio;
    };
    Flat.prototype.setEndereco = function (endereco) {
        this.endereco = endereco;
    };
    Flat.prototype.getEndereco = function () {
        return this.endereco;
    };
    Flat.prototype.setNumero = function (numero) {
        this.numero = numero;
    };
    Flat.prototype.getNumero = function () {
        return this.numero;
    };
    Flat.prototype.setComplemento = function (complemento) {
        this.complemento = complemento;
    };
    Flat.prototype.getComplemento = function () {
        return this.complemento;
    };
    Flat.prototype.setPais = function (pais) {
        this.pais = pais;
    };
    Flat.prototype.getPais = function () {
        return this.pais;
    };
    Flat.prototype.setEstado = function (estado) {
        this.estado = estado;
    };
    Flat.prototype.getEstado = function () {
        return this.estado;
    };
    Flat.prototype.setCidade = function (cidade) {
        this.cidade = cidade;
    };
    Flat.prototype.getCidade = function () {
        return this.cidade;
    };
    Flat.prototype.setBairro = function (bairro) {
        this.bairro = bairro;
    };
    Flat.prototype.getBairro = function () {
        return this.bairro;
    };
    Flat.prototype.setCep = function (cep) {
        this.cep = cep;
    };
    Flat.prototype.getCep = function () {
        return this.cep;
    };
    Flat.prototype.setSnCondominio = function (snCondominio) {
        this.snCondominio = snCondominio;
    };
    Flat.prototype.getSnCondominio = function () {
        return this.snCondominio;
    };
    Flat.prototype.setNrQuartos = function (nrQuartos) {
        this.nrQuartos = nrQuartos;
    };
    Flat.prototype.getNrQuartos = function () {
        return this.nrQuartos;
    };
    Flat.prototype.setNrBanheiros = function (nrBanheiros) {
        this.nrBanheiros = nrBanheiros;
    };
    Flat.prototype.getNrBanheiros = function () {
        return this.nrBanheiros;
    };
    Flat.prototype.setNrMaxPessoas = function (nrMaxPessoas) {
        this.nrMaxPessoas = nrMaxPessoas;
    };
    Flat.prototype.getNrMaxPessoas = function () {
        return this.nrMaxPessoas;
    };
    Flat.prototype.setVlBasicoDiaria = function (vlBasicoDiaria) {
        this.vlBasicoDiaria = vlBasicoDiaria;
    };
    Flat.prototype.getVlBasicoDiaria = function () {
        return this.vlBasicoDiaria;
    };
    Flat.prototype.setNrAreaFlat = function (nrAreaFlat) {
        this.nrAreaFlat = nrAreaFlat;
    };
    Flat.prototype.getNrAreaFlat = function () {
        return this.nrAreaFlat;
    };
    Flat.prototype.setDsFlat = function (dsFlat) {
        this.dsFlat = dsFlat;
    };
    Flat.prototype.getDsFlat = function () {
        return this.dsFlat;
    };
    Flat.prototype.setDsRegras = function (dsRegras) {
        this.dsRegras = dsRegras;
    };
    Flat.prototype.getDsRegras = function () {
        return this.dsRegras;
    };
    Flat.prototype.setSnInternet = function (snInternet) {
        this.snInternet = snInternet;
    };
    Flat.prototype.getSnInternet = function () {
        return this.snInternet;
    };
    Flat.prototype.setSnCriancas = function (snCriancas) {
        this.snCriancas = snCriancas;
    };
    Flat.prototype.getSnCriancas = function () {
        return this.snCriancas;
    };
    Flat.prototype.setSnMobilidadeReduzida = function (snMobilidadeReduzida) {
        this.snMobilidadeReduzida = snMobilidadeReduzida;
    };
    Flat.prototype.getSnMobilidadeReduzida = function () {
        return this.snMobilidadeReduzida;
    };
    Flat.prototype.setSnFumantes = function (snFumantes) {
        this.snFumantes = snFumantes;
    };
    Flat.prototype.getSnFumantes = function () {
        return this.snFumantes;
    };
    Flat.prototype.setSnAnimais = function (snAnimais) {
        this.snAnimais = snAnimais;
    };
    Flat.prototype.getSnAnimais = function () {
        return this.snAnimais;
    };
    Flat.prototype.setSnFestas = function (snFestas) {
        this.snFestas = snFestas;
    };
    Flat.prototype.getSnFestas = function () {
        return this.snFestas;
    };
    Flat.prototype.setSnFLongoPrazo = function (snLongoPrazo) {
        this.snLongoPrazo = snLongoPrazo;
    };
    Flat.prototype.getSnLongoPrazo = function () {
        return this.snLongoPrazo;
    };
    Flat.prototype.setDtCadastro = function (dtCadastro) {
        this.dtCadastro = dtCadastro;
    };
    Flat.prototype.getDtCadastro = function () {
        return this.dtCadastro;
    };
    Flat.prototype.setCdUsuarioCadastro = function (cdUsuarioCadastro) {
        this.cdUsuarioCadastro = cdUsuarioCadastro;
    };
    Flat.prototype.getCdUsuarioCadastro = function () {
        return this.cdUsuarioCadastro;
    };
    Flat.prototype.setDtAlteracao = function (dtAlteracao) {
        this.dtAlteracao = dtAlteracao;
    };
    Flat.prototype.getDtAlteracao = function () {
        return this.dtAlteracao;
    };
    Flat.prototype.setCdUsuarioAlteracao = function (cdUsuarioAlteracao) {
        this.cdUsuarioAlteracao = cdUsuarioAlteracao;
    };
    Flat.prototype.getCdUsuarioAlteracao = function () {
        return this.cdUsuarioAlteracao;
    };
    return Flat;
}());
exports.Flat = Flat;
