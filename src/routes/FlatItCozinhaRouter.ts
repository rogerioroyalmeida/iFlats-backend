import {Router, Request, Response, NextFunction} from 'express';
import * as mysql from 'mysql';

export class FlatItCozinhaRouter {
  router: Router

  /**
   * Initialize the FlatItCozinhaRouter
   */
  constructor() {
    this.router = Router();
    this.init();
  }

  /**
   * GET all flats_itcozinha.
   */
  public getAll(req: Request, res: Response, next: NextFunction) {
    execSQLQuery('SELECT cd_flat, cd_itemcozinha FROM flats_itcozinha', res);
  }

  /**
   * GET all flats_itcozinha by cd_flat
   */
  public getByFlat(req: Request, res: Response, next: NextFunction) {
    let filter = '';
    if(req.params.cd_flat) filter = ' AND cd_flat=' + req.params.cd_flat;
    execSQLQuery(`SELECT cd_flat, cd_itemcozinha FROM flats_itcozinha WHERE 1 = 1` + filter, res);
  }

  public postFlatItCozinha(req: Request, res: Response, next: NextFunction) {
    if(req.body.cd_flat) var cd_flat = req.body.cd_flat;
    if(req.body.cd_itemcozinha) var cd_itemcozinha = req.body.cd_itemcozinha;

    execSQLQuery(`INSERT INTO flats_itcozinha(cd_flat, cd_itemcozinha) 
                    VALUES(${cd_flat}, ${cd_itemcozinha})`, res);

  }

  public deleteFlatItGeral(req: Request, res: Response, next: NextFunction) {
    execSQLQuery('DELETE FROM flats_itcozinha WHERE cd_flat=' + parseInt(req.params.cd_flat), res);
  }

  /**
   * Take each handler, and attach to one of the Express.Router's
   * endpoints.
   */
  init() {
    this.router.get('', this.getAll);
    this.router.get('/:cd_flat', this.getByFlat);
    this.router.post('', this.postFlatItCozinha);
    this.router.delete('/:cd_flat', this.deleteFlatItGeral);
  }

}

// Create the FlatItCozinhaRouter, and export its configured Express.Router
// let FlatItCozinhaRouter = new FlatItCozinhaRouter();
// FlatItCozinhaRouter.init();

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
        console.log('Executou query flats_itcozinha! Deu ERRO: \n' + error);
      }
      else {
        res.json(results);
        console.log('Executou query flats_itcozinha! Deu CERTO query= \n' + sqlQry);
      }
      connection.end();
      
  });
}

export default new FlatItCozinhaRouter().router;