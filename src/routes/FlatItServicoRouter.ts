import {Router, Request, Response, NextFunction} from 'express';
import * as mysql from 'mysql';

export class FlatItServicoRouter {
  router: Router

  /**
   * Initialize the FlatItServicoRouter
   */
  constructor() {
    this.router = Router();
    this.init();
  }

  /**
   * GET all flats_servico.
   */
  public getAll(req: Request, res: Response, next: NextFunction) {
    execSQLQuery('SELECT cd_flat, cd_servico FROM flats_servico', res);
  }

  /**
   * GET all flats_servico by cd_flat
   */
  public getByFlat(req: Request, res: Response, next: NextFunction) {
    let filter = '';
    if(req.params.cd_flat) filter = ' AND cd_flat=' + req.params.cd_flat;
    execSQLQuery(`SELECT cd_flat, cd_servico FROM flats_servico WHERE 1 = 1` + filter, res);
  }

  public postFlatItServico(req: Request, res: Response, next: NextFunction) {
    if(req.body.cd_flat) var cd_flat = req.body.cd_flat;
    if(req.body.cd_servico) var cd_servico = req.body.cd_servico;

    execSQLQuery(`INSERT INTO flats_servico(cd_flat, cd_servico) 
                    VALUES(${cd_flat}, ${cd_servico})`, res);

  }

  public deleteFlatItServico(req: Request, res: Response, next: NextFunction) {
    execSQLQuery('DELETE FROM flats_servico WHERE cd_flat=' + parseInt(req.params.cd_flat), res);
  }

  /**
   * Take each handler, and attach to one of the Express.Router's
   * endpoints.
   */
  init() {
    this.router.get('', this.getAll);
    this.router.get('/:cd_flat', this.getByFlat);
    this.router.post('', this.postFlatItServico);
    this.router.delete('/:cd_flat', this.deleteFlatItServico);
  }

}

// Create the FlatItServicoRouter, and export its configured Express.Router
// let FlatItServicoRouter = new FlatItServicoRouter();
// FlatItServicoRouter.init();

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
        console.log('Executou query flats_servico! Deu ERRO: \n' + error);
      }
      else {
        res.json(results);
        console.log('Executou query flats_servico! Deu CERTO query= \n' + sqlQry);
      }
      connection.end();
      
  });
}

export default new FlatItServicoRouter().router;