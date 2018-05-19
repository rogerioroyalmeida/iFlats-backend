import {Router, Request, Response, NextFunction} from 'express';
import { Usuario } from '../model/usuario';
import * as mysql from 'mysql';

var usuarioLogado: Usuario = new Usuario();

export class UsuarioRouter {
  router: Router

  /**
   * Initialize the UsuarioRouter
   */
  constructor() {
    this.router = Router();
    this.init();
  }

  /**
   * GET all usuarios.
   */
  public getAll(req: Request, res: Response, next: NextFunction) {
    execSQLQuery('SELECT cd_usuario, email, ds_nome, ds_sobrenome, campo01, dt_cadastro, campo02, campo_real, dt_movimentacao, observacao, sn_adm FROM usuario', res);
  }

  /**
   * GET one usuario by email
   */
  public getOne(req: Request, res: Response, next: NextFunction) {
    let filter = '';
    if(req.params.email) filter = ` AND email='` + req.params.email + `'`;
    execSQLQuery(`SELECT cd_usuario, email, ds_nome, ds_sobrenome, campo01, dt_cadastro, campo02, campo_real, dt_movimentacao, observacao, sn_adm FROM usuario WHERE 1 = 1` + filter, res);
  }

  /**
   * GET one usuario by codigo
   */
  public getOneByCodigo(req: Request, res: Response, next: NextFunction) {
    let filter = '';
    if(req.params.cd_usuario) filter = ` AND cd_usuario=` + req.params.cd_usuario;
    execSQLQuery(`SELECT cd_usuario, email, ds_nome, ds_sobrenome, campo01, dt_cadastro, campo02, campo_real, dt_movimentacao, observacao, sn_adm FROM usuario WHERE 1 = 1` + filter, res);
  }

  public postUsuario(req: Request, res: Response, next: NextFunction) {
    if(req.body.nome) var nome = req.body.nome;
    if(req.body.email) var email = req.body.email;
    if(req.body.senha) var senha = req.body.senha;
    if(req.body.ds_sobrenome) var ds_sobrenome = req.body.ds_sobrenome;

    execSQLQuery(`INSERT INTO usuario(ds_nome, email, ds_sobrenome, dt_cadastro, sn_adm) 
                    VALUES('${nome}', '${email}', ${ds_sobrenome}, SYSDATE(), 'N')`, res);
  }

  public patchUsuario(req: Request, res: Response, next: NextFunction) {
    const cd_usuario = parseInt(req.params.cd_usuario);

    let u: Usuario = new Usuario();

    //req.body.dsTituloAnuncio ? u.setDsTituloAnuncio(req.body.dsTituloAnuncio) : f.setDsTituloAnuncio("");

    if(req.body.ds_nome) var ds_nome = req.body.ds_nome;
    if(req.body.email) var email = req.body.email;
    if(req.body.ds_sobrenome) var ds_sobrenome = req.body.ds_sobrenome;
    if(req.body.campo01) var campo01 = req.body.campo01;
    if(req.body.campo02) var campo02 = req.body.campo02;
    if(req.body.campo_real) var campo_real = req.body.campo_real;
    if(req.body.observacao) var observacao = req.body.observacao;

    execSQLQuery(`UPDATE usuario SET ds_nome='${ds_nome}', email='${email}', ds_sobrenome='${ds_sobrenome}', campo01='${campo01}', campo02='${campo02}', campo_real='${campo_real}', observacao='${observacao}' WHERE cd_usuario=${cd_usuario}`, res);
  }

  public deleteUsuario(req: Request, res: Response, next: NextFunction) {
    execSQLQuery('DELETE FROM usuario WHERE cd_usuario=' + parseInt(req.params.cd_usuario), res);
  }

  public login(req: Request, res: Response, next: NextFunction) {

    execSQLQuery(`SELECT cd_usuario FROM usuario WHERE email='${req.body.email}'`, res, true);

  }

  /**
   * Take each handler, and attach to one of the Express.Router's
   * endpoints.
   */
  init() {
    this.router.get('', this.getAll);
    this.router.get('/:email', this.getOne);
    this.router.get('/codigo/:cd_usuario', this.getOneByCodigo);
    this.router.post('', this.postUsuario);
    this.router.post('/login', this.login);
    this.router.patch('/:cd_usuario', this.patchUsuario);
    this.router.delete('/:cd_usuario', this.deleteUsuario);
  }

}

// Create the UsuarioRouter, and export its configured Express.Router
// let usuarioRouter = new UsuarioRouter();
// usuarioRouter.init();

function execSQLQuery(sqlQry, res, login?){
  const connection = mysql.createConnection({
      host     : 'localhost',
      port     : 3306,
      user     : 'root',
      password : '',
      database : 'iflats'
  });

  connection.query(sqlQry, function(error, results, fields){
      if(error) {
        res.json(error);
        console.log('Executou query Usuario! Deu ERRO: \n' + error);
      }
      else {
        res.json(results);
        console.log('Executou query Usuario! Deu CERTO query= \n' + sqlQry);

        // if(login) {
        //   this.usuarioLogado.codigo = results[0].codigo;
        // }

        //usuarioLogado.setCodigo(results[0].codigo);
      }
      connection.end();
      
  });
}

export default new UsuarioRouter().router;