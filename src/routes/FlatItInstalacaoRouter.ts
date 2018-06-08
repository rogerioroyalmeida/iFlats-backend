import {Router, Request, Response, NextFunction} from 'express';
import * as mysql from 'mysql';

export class FlatItInstalacaoRouter {
  router: Router

  /**
   * Initialize the FlatItInstalacaoRouter
   */
  constructor() {
    this.router = Router();
    this.init();
  }

  /**
   * GET all flats_itinstalacao.
   */
  public getAll(req: Request, res: Response, next: NextFunction) {
    execSQLQuery('SELECT cd_flat, cd_itinstalacao FROM flats_itinstalacao', res);
  }

  /**
   * GET all flats_itinstalacao by cd_flat
   */
  public getByFlat(req: Request, res: Response, next: NextFunction) {
    let filter = '';
    if(req.params.cd_flat) filter = ' AND cd_flat=' + req.params.cd_flat;
    execSQLQuery(`SELECT cd_flat, cd_itinstalacao FROM flats_itinstalacao WHERE 1 = 1` + filter, res);
  }

  public postFlatItInstalacao(req: Request, res: Response, next: NextFunction) {
    if(req.body.cd_flat) var cd_flat = req.body.cd_flat;
    if(req.body.cd_itinstalacao) var cd_itinstalacao = req.body.cd_itinstalacao;

    execSQLQuery(`INSERT INTO flats_itinstalacao(cd_flat, cd_itinstalacao) 
                    VALUES(${cd_flat}, ${cd_itinstalacao})`, res);

  }

  public deleteFlatItInstalacao(req: Request, res: Response, next: NextFunction) {
    execSQLQuery('DELETE FROM flats_itinstalacao WHERE cd_flat=' + parseInt(req.params.cd_flat), res);
  }

  /**
   * Take each handler, and attach to one of the Express.Router's
   * endpoints.
   */
  init() {
    this.router.get('', this.getAll);
    this.router.get('/:cd_flat', this.getByFlat);
    this.router.post('', this.postFlatItInstalacao);
    this.router.delete('/:cd_flat', this.deleteFlatItInstalacao);
  }

}

// Create the FlatItInstalacaoRouter, and export its configured Express.Router
// let FlatItInstalacaoRouter = new FlatItInstalacaoRouter();
// FlatItInstalacaoRouter.init();

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
        console.log('Executou query flats_itinstalacao! Deu ERRO: \n' + error);
      }
      else {
        res.json(results);
        console.log('Executou query flats_itinstalacao! Deu CERTO query= \n' + sqlQry);
      }
      connection.end();
      
  });
}

export default new FlatItInstalacaoRouter().router;