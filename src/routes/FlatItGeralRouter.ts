import {Router, Request, Response, NextFunction} from 'express';
import * as mysql from 'mysql';

export class FlatItGeralRouter {
  router: Router

  /**
   * Initialize the FlatItGeralRouter
   */
  constructor() {
    this.router = Router();
    this.init();
  }

  /**
   * GET all flats_itgeral.
   */
  public getAll(req: Request, res: Response, next: NextFunction) {
    execSQLQuery('SELECT cd_flat, cd_itgeral FROM flats_itgeral', res);
  }

  /**
   * GET all flats_itgeral by cd_flat
   */
  public getByFlat(req: Request, res: Response, next: NextFunction) {
    let filter = '';
    if(req.params.cd_flat) filter = ' AND cd_flat=' + req.params.cd_flat;
    execSQLQuery(`SELECT cd_flat, cd_itgeral FROM flats_itgeral WHERE 1 = 1` + filter, res);
  }

  public postFlatItGeral(req: Request, res: Response, next: NextFunction) {
    if(req.body.cd_flat) var cd_flat = req.body.cd_flat;
    if(req.body.cd_itgeral) var cd_itgeral = req.body.cd_itgeral;

    execSQLQuery(`INSERT INTO flats_itgeral(cd_flat, cd_itgeral) 
                    VALUES(${cd_flat}, ${cd_itgeral})`, res);

  }

  public deleteFlatItGeral(req: Request, res: Response, next: NextFunction) {
    execSQLQuery('DELETE FROM flats_itgeral WHERE cd_flat=' + parseInt(req.params.cd_flat), res);
  }

  /**
   * Take each handler, and attach to one of the Express.Router's
   * endpoints.
   */
  init() {
    this.router.get('', this.getAll);
    this.router.get('/:cd_flat', this.getByFlat);
    this.router.post('', this.postFlatItGeral);
    this.router.delete('/:cd_flat', this.deleteFlatItGeral);
  }

}

// Create the FlatItGeralRouter, and export its configured Express.Router
// let FlatItGeralRouter = new FlatItGeralRouter();
// FlatItGeralRouter.init();

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
        console.log('Executou query flats_itgeral! Deu ERRO: \n' + error);
      }
      else {
        res.json(results);
        console.log('Executou query flats_itgeral! Deu CERTO query= \n' + sqlQry);
      }
      connection.end();
      
  });
}

export default new FlatItGeralRouter().router;