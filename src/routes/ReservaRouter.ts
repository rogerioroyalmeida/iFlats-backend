import {Router, Request, Response, NextFunction} from 'express';
import * as mysql from 'mysql';

export class ReservaRouter {
  router: Router

  /**
   * Initialize the ReservaRouter
   */
  constructor() {
    this.router = Router();
    this.init();
  }

  /**
   * GET all reserva.
   */
  public getAll(req: Request, res: Response, next: NextFunction) {
    execSQLQuery('SELECT cd_reserva, cd_solicitacao_reserva, vl_restante, observacao FROM reserva ORDER BY cd_reserva', res);
  }

  /**
   * GET one reserva by id
   */
  public getOne(req: Request, res: Response, next: NextFunction) {
    let filter = '';
    if(req.params.cd_reserva) filter = ` AND cd_reserva='` + req.params.cd_reserva + `'`;
    filter = filter + ' ORDER BY cd_reserva ';
    execSQLQuery(`SELECT cd_reserva, cd_solicitacao_reserva, vl_restante, observacao FROM reserva WHERE 1 = 1` + filter, res);
  }

  /**
   * GET one reserva by id
   */
  public getByUser(req: Request, res: Response, next: NextFunction) {
    let filter = '';
    if(req.params.cd_usuario) filter = ` AND solicitacao_reserva.cd_usuario_responsavel=` + req.params.cd_usuario;
    filter = filter + ' ORDER BY reserva.cd_reserva ';
    execSQLQuery(`SELECT reserva.cd_reserva, reserva.cd_solicitacao_reserva, reserva.vl_restante, reserva.observacao FROM reserva, solicitacao_reserva WHERE reserva.cd_solicitacao_reserva = solicitacao_reserva.cd_solic_reserva` + filter, res);
  }

  public postReserva(req: Request, res: Response, next: NextFunction) {
    if(req.body.cd_solicitacao_reserva) var cd_solicitacao_reserva = req.body.cd_solicitacao_reserva;
    if(req.body.vl_restante) var vl_restante = req.body.vl_restante;
    if(req.body.observacao) var observacao = req.body.observacao;

    execSQLQuery(`INSERT INTO reserva(cd_solicitacao_reserva, vl_restante, observacao) 
                    VALUES(${cd_solicitacao_reserva}, ${vl_restante}, '${observacao}')`, res);
  }

  public patchReserva(req: Request, res: Response, next: NextFunction) {
    const cd_reserva = parseInt(req.params.cd_reserva);

    if(req.body.cd_solicitacao_reserva) var cd_solicitacao_reserva = req.body.cd_solicitacao_reserva;
    if(req.body.vl_restante) var vl_restante = req.body.vl_restante;
    if(req.body.observacao) var observacao = req.body.observacao;

    execSQLQuery(`UPDATE reserva SET cd_solicitacao_reserva=${cd_solicitacao_reserva}, vl_restante=${vl_restante}, observacao=${observacao} WHERE cd_reserva=${cd_reserva}`, res);
  }

  public deleteReserva(req: Request, res: Response, next: NextFunction) {
    execSQLQuery('DELETE FROM reserva WHERE cd_reserva=' + parseInt(req.params.cd_reserva), res);
  }

  /**
   * Take each handler, and attach to one of the Express.Router's
   * endpoints.
   */
  init() {
    this.router.get('', this.getAll);
    this.router.get('/:cd_reserva', this.getOne);
    this.router.get('/usuario/:cd_usuario', this.getByUser);
    this.router.post('', this.postReserva);
    this.router.patch('/:cd_reserva', this.patchReserva);
    this.router.delete('/:cd_reserva', this.deleteReserva);
  }

}

// Create the ReservaRouter, and export its configured Express.Router
// let ReservaRouter = new ReservaRouter();
// ReservaRouter.init();

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
        console.log('Executou query reserva! Deu ERRO: \n' + error);
      }
      else {
        res.json(results);
        console.log('Executou query reserva! Deu CERTO query= \n' + sqlQry);
      }
      connection.end();
      
  });
}

export default new ReservaRouter().router;