import {Router, Request, Response, NextFunction} from 'express';
import * as mysql from 'mysql';

export class ItensInstalacaoRouter {
  router: Router

  /**
   * Initialize the ItensInstalacaoRouter
   */
  constructor() {
    this.router = Router();
    this.init();
  }

  /**
   * GET all Itens_Instalacao.
   */
  public getAll(req: Request, res: Response, next: NextFunction) {
    execSQLQuery('SELECT cd_itinstalacao, ds_itinstalacao, dt_movimentacao, observacao, valor, campo01, campo02, campo03, campo04, dt_cadastro, cd_usuario_cadastro FROM Itens_Instalacao ORDER BY ds_itinstalacao', res);
  }

  /**
   * GET one Itens_Instalacao by id
   */
  public getOne(req: Request, res: Response, next: NextFunction) {
    let filter = '';
    if(req.params.cd_itinstalacao) filter = ` AND cd_itinstalacao='` + req.params.cd_itinstalacao + `'`;
    filter = filter + ' ORDER BY ds_itinstalacao ';
    execSQLQuery(`SELECT cd_itinstalacao, ds_itinstalacao, dt_movimentacao, observacao, valor, campo01, campo02, campo03, campo04, dt_cadastro, cd_usuario_cadastro FROM Itens_Instalacao WHERE 1 = 1` + filter, res);
  }

  /**
   * GET one Itens_Instalacao by usuario
   */
  public getByUsuario(req: Request, res: Response, next: NextFunction) {
    let filter = '';
    if(req.params.cd_usuario_cadastro) filter = ' AND cd_usuario_cadastro=' + req.params.cd_usuario_cadastro;
    filter = filter + ' ORDER BY ds_itinstalacao ';
    execSQLQuery(`SELECT cd_itinstalacao, ds_itinstalacao, dt_movimentacao, observacao, valor, campo01, campo02, campo03, campo04, dt_cadastro, cd_usuario_cadastro FROM Itens_Instalacao WHERE 1 = 1 ` + filter, res);
  }

  public postItensInstalacao(req: Request, res: Response, next: NextFunction) {
    if(req.body.ds_itinstalacao) var ds_itinstalacao = req.body.ds_itinstalacao;
    if(req.body.observacao) var observacao = req.body.observacao;
    if(req.body.valor) var valor = req.body.valor;
    if(req.body.campo01) var campo01 = req.body.campo01;
    if(req.body.campo02) var campo02 = req.body.campo02;
    if(req.body.campo03) var campo03 = req.body.campo03;
    if(req.body.campo04) var campo04 = req.body.campo04;
    if(req.params.cd_usuario_cadastro) var cd_usuario_cadastro = req.params.cd_usuario_cadastro;

    execSQLQuery(`INSERT INTO Itens_Instalacao(ds_itinstalacao, observacao, valor, campo01, campo02, campo03, campo04, dt_cadastro, cd_usuario_cadastro) 
                    VALUES('${ds_itinstalacao}', '${observacao}', ${valor}, '${campo01}', '${campo02}', '${campo03}', '${campo04}', SYSDATE(), ${cd_usuario_cadastro})`, res);
  }

  public patchItensInstalacao(req: Request, res: Response, next: NextFunction) {
    const cd_itinstalacao = parseInt(req.params.cd_itinstalacao);

    //req.body.dsTituloAnuncio ? u.setDsTituloAnuncio(req.body.dsTituloAnuncio) : f.setDsTituloAnuncio("");

    if(req.body.ds_itinstalacao) var ds_itinstalacao = req.body.ds_itinstalacao;
    if(req.body.observacao) var observacao = req.body.observacao;
    if(req.body.valor) var valor = req.body.valor;
    if(req.body.campo01) var campo01 = req.body.campo01;
    if(req.body.campo02) var campo02 = req.body.campo02;
    if(req.body.campo03) var campo03 = req.body.campo03;
    if(req.body.campo04) var campo04 = req.body.campo04;

    execSQLQuery(`UPDATE Itens_Instalacao SET ds_itinstalacao='${ds_itinstalacao}', observacao='${observacao}', valor='${valor}', campo01='${campo01}', campo02='${campo02}', campo03='${campo03}', campo04='${campo04}' WHERE cd_itinstalacao=${cd_itinstalacao}`, res);
  }

  public deleteItensInstalacao(req: Request, res: Response, next: NextFunction) {
    execSQLQuery('DELETE FROM Itens_Instalacao WHERE cd_itinstalacao=' + parseInt(req.params.cd_itinstalacao), res);
  }

  /**
   * Take each handler, and attach to one of the Express.Router's
   * endpoints.
   */
  init() {
    this.router.get('', this.getAll);
    this.router.get('/:cd_itinstalacao', this.getOne);
    this.router.get('/usuario/:cd_usuario_cadastro', this.getByUsuario);
    this.router.post('/:cd_usuario_cadastro', this.postItensInstalacao);
    this.router.patch('/:cd_itinstalacao', this.patchItensInstalacao);
    this.router.delete('/:cd_itinstalacao', this.deleteItensInstalacao);
  }

}

// Create the ItensGeralRouter, and export its configured Express.Router
// let ItensGeralRouter = new ItensGeralRouter();
// ItensGeralRouter.init();

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
        console.log('Executou query Itens_Instalacao! Deu ERRO: \n' + error);
      }
      else {
        res.json(results);
        console.log('Executou query Itens_Instalacao! Deu CERTO query= \n' + sqlQry);
      }
      connection.end();
      
  });
}

export default new ItensInstalacaoRouter().router;