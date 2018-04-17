"use strict";
exports.__esModule = true;
var Usuario = /** @class */ (function () {
    function Usuario() {
    }
    Usuario.prototype.setCodigo = function (codigo) {
        this.codigo = codigo;
    };
    Usuario.prototype.getCodigo = function () {
        return this.codigo;
    };
    Usuario.prototype.setEmail = function (email) {
        this.email = email;
    };
    Usuario.prototype.getEmail = function () {
        return this.email;
    };
    Usuario.prototype.setSenha = function (senha) {
        this.senha = senha;
    };
    Usuario.prototype.getSenha = function () {
        return this.senha;
    };
    return Usuario;
}());
exports.Usuario = Usuario;
