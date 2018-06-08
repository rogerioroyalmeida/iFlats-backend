import {Router, Request, Response, NextFunction} from 'express';
import * as mysql from 'mysql';

export class FlatItEquipamentoRouter {
  router: Router

  /**
   * Initialize the FlatItEquipamentoRouter
   */
  constructor() {
    this.router = Router();
    this.init();
  }

  /**
   * GET all flat_equipamento.
   */
  public getAll(req: Request, res: Response, next: NextFunction) {
    execSQLQuery('SELECT cd_flat, cd_equipamento FROM flat_equipamento', res);
  }

  /**
   * GET all flat_equipamento by cd_flat
   */
  public getByFlat(req: Request, res: Response, next: NextFunction) {
    let filter = '';
    if(req.params.cd_flat) filter = ' AND cd_flat=' + req.params.cd_flat;
    execSQLQuery(`SELECT cd_flat, cd_equipamento FROM flat_equipamento WHERE 1 = 1` + filter, res);
  }

  public postFlatItEquipamento(req: Request, res: Response, next: NextFunction) {
    if(req.body.cd_flat) var cd_flat = req.body.cd_flat;
    if(req.body.cd_equipamento) var cd_equipamento = req.body.cd_equipamento;

    execSQLQuery(`INSERT INTO flat_equipamento(cd_flat, cd_equipamento) 
                    VALUES(${cd_flat}, ${cd_equipamento})`, res);

  }

  public deleteFlatItEquipamento(req: Request, res: Response, next: NextFunction) {
    execSQLQuery('DELETE FROM flat_equipamento WHERE cd_flat=' + parseInt(req.params.cd_flat), res);
  }

  /**
   * Take each handler, and attach to one of the Express.Router's
   * endpoints.
   */
  init() {
    this.router.get('', this.getAll);
    this.router.get('/:cd_flat', this.getByFlat);
    this.router.post('', this.postFlatItEquipamento);
    this.router.delete('/:cd_flat', this.deleteFlatItEquipamento);
  }

}

// Create the FlatItEquipamentoRouter, and export its configured Express.Router
// let FlatItEquipamentoRouter = new FlatItEquipamentoRouter();
// FlatItEquipamentoRouter.init();

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
        console.log('Executou query flat_equipamento! Deu ERRO: \n' + error);
      }
      else {
        res.json(results);
        console.log('Executou query flat_equipamento! Deu CERTO query= \n' + sqlQry);
      }
      connection.end();
      
  });
}

export default new FlatItEquipamentoRouter().router;