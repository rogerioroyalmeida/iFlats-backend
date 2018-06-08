import {Router, Request, Response, NextFunction} from 'express';
import * as mysql from 'mysql';

export class FlatItCriancaRouter {
  router: Router

  /**
   * Initialize the FlatItCriancaRouter
   */
  constructor() {
    this.router = Router();
    this.init();
  }

  /**
   * GET all flat_itcriancas.
   */
  public getAll(req: Request, res: Response, next: NextFunction) {
    execSQLQuery('SELECT cd_flat, cd_itcrianca FROM flat_itcriancas', res);
  }

  /**
   * GET all flat_itcriancas by cd_flat
   */
  public getByFlat(req: Request, res: Response, next: NextFunction) {
    let filter = '';
    if(req.params.cd_flat) filter = ' AND cd_flat=' + req.params.cd_flat;
    execSQLQuery(`SELECT cd_flat, cd_itcrianca FROM flat_itcriancas WHERE 1 = 1` + filter, res);
  }

  public postFlatItCrianca(req: Request, res: Response, next: NextFunction) {
    if(req.body.cd_flat) var cd_flat = req.body.cd_flat;
    if(req.body.cd_itcrianca) var cd_itcrianca = req.body.cd_itcrianca;

    execSQLQuery(`INSERT INTO flat_itcriancas(cd_flat, cd_itcrianca) 
                    VALUES(${cd_flat}, ${cd_itcrianca})`, res);

  }

  public deleteFlatItCrianca(req: Request, res: Response, next: NextFunction) {
    execSQLQuery('DELETE FROM flat_itcriancas WHERE cd_flat=' + parseInt(req.params.cd_flat), res);
  }

  /**
   * Take each handler, and attach to one of the Express.Router's
   * endpoints.
   */
  init() {
    this.router.get('', this.getAll);
    this.router.get('/:cd_flat', this.getByFlat);
    this.router.post('', this.postFlatItCrianca);
    this.router.delete('/:cd_flat', this.deleteFlatItCrianca);
  }

}

// Create the FlatItCriancaRouter, and export its configured Express.Router
// let FlatItCriancaRouter = new FlatItCriancaRouter();
// FlatItCriancaRouter.init();

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
        console.log('Executou query flat_itcriancas! Deu ERRO: \n' + error);
      }
      else {
        res.json(results);
        console.log('Executou query flat_itcriancas! Deu CERTO query= \n' + sqlQry);
      }
      connection.end();
      
  });
}

export default new FlatItCriancaRouter().router;