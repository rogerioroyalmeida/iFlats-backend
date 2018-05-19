import {Router, Request, Response, NextFunction} from 'express';
import * as mysql from 'mysql';

export class FlatItEntretenimentoRouter {
  router: Router

  /**
   * Initialize the FlatItEntretenimentoRouter
   */
  constructor() {
    this.router = Router();
    this.init();
  }

  /**
   * GET all flat_itentretenimento.
   */
  public getAll(req: Request, res: Response, next: NextFunction) {
    execSQLQuery('SELECT cd_flat, cd_itentretenimento FROM flat_itentretenimento', res);
  }

  /**
   * GET all flat_itentretenimento by cd_flat
   */
  public getByFlat(req: Request, res: Response, next: NextFunction) {
    let filter = '';
    if(req.params.cd_flat) filter = ' AND cd_flat=' + req.params.cd_flat;
    execSQLQuery(`SELECT cd_flat, cd_itentretenimento FROM flat_itentretenimento WHERE 1 = 1` + filter, res);
  }

  public postFlatItEntretenimento(req: Request, res: Response, next: NextFunction) {
    if(req.body.cd_flat) var cd_flat = req.body.cd_flat;
    if(req.body.cd_itentretenimento) var cd_itentretenimento = req.body.cd_itentretenimento;

    execSQLQuery(`INSERT INTO flat_itentretenimento(cd_flat, cd_itentretenimento) 
                    VALUES(${cd_flat}, ${cd_itentretenimento})`, res);

  }

  public deleteFlatItEntretenimento(req: Request, res: Response, next: NextFunction) {
    execSQLQuery('DELETE FROM flat_itentretenimento WHERE cd_flat=' + parseInt(req.params.cd_flat), res);
  }

  /**
   * Take each handler, and attach to one of the Express.Router's
   * endpoints.
   */
  init() {
    this.router.get('', this.getAll);
    this.router.get('/:cd_flat', this.getByFlat);
    this.router.post('', this.postFlatItEntretenimento);
    this.router.delete('/:cd_flat', this.deleteFlatItEntretenimento);
  }

}

// Create the FlatItEntretenimentoRouter, and export its configured Express.Router
// let FlatItEntretenimentoRouter = new FlatItEntretenimentoRouter();
// FlatItEntretenimentoRouter.init();

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
        console.log('Executou query flat_itentretenimento! Deu ERRO: \n' + error);
      }
      else {
        res.json(results);
        console.log('Executou query flat_itentretenimento! Deu CERTO query= \n' + sqlQry);
      }
      connection.end();
      
  });
}

export default new FlatItEntretenimentoRouter().router;