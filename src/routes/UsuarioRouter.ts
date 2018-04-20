import {Router, Request, Response, NextFunction} from 'express';
import * as mysql from 'mysql';

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
    execSQLQuery('SELECT * FROM usuario', res);
  }

  /**
   * GET one usuario by id
   */
  public getOne(req: Request, res: Response, next: NextFunction) {
    let filter = '';
    if(req.params.cd_usuario) filter = ' AND cd_usuario=' + parseInt(req.params.cd_usuario);
    execSQLQuery(`SELECT * FROM usuario WHERE sn_ativo = 'S'` + filter, res);
  }

  public postUsuario(req: Request, res: Response, next: NextFunction) {
    if(req.body.nome) var nome = req.body.nome;
    if(req.body.email) var email = req.body.email;
    if(req.body.senha) var senha = req.body.senha;

    execSQLQuery(`INSERT INTO flat(nome, email, senha, sn_ativo) 
                    VALUES('${nome}', '${email}', ${senha}, 'S')`, res);
  }

  public patchUsuario(req: Request, res: Response, next: NextFunction) {
    const cd_usuario = parseInt(req.params.cd_usuario);

    if(req.body.nome) var nome = req.body.nome;
    if(req.body.email) var email = req.body.email;
    if(req.body.senha) var senha = req.body.senha;

    execSQLQuery(`UPDATE usuario SET nome='${nome}', email='${email}', senha='${senha}', sn_ativo='S') WHERE cd_usuario=${cd_usuario}`, res);
  }

  public deleteUsuario(req: Request, res: Response, next: NextFunction) {
    execSQLQuery('DELETE FROM usuario WHERE cd_usuario=' + parseInt(req.params.cd_usuario), res);
  }

  /**
   * Take each handler, and attach to one of the Express.Router's
   * endpoints.
   */
  init() {
    this.router.get('', this.getAll);
    this.router.get('/:cd_usuario', this.getOne);
    this.router.post('', this.postUsuario);
    this.router.patch('/:cd_usuario', this.patchUsuario);
    this.router.delete('/:cd_usuario', this.deleteUsuario);
  }

}

// Create the UsuarioRouter, and export its configured Express.Router
// let usuarioRouter = new UsuarioRouter();
// usuarioRouter.init();

function execSQLQuery(sqlQry, res){
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
      }
      connection.end();
      
  });
}

export default new UsuarioRouter().router;