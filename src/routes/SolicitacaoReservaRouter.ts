import {Router, Request, Response, NextFunction} from 'express';
import * as mysql from 'mysql';

export class SolicitacaoReservaRouter {
  router: Router

  /**
   * Initialize the SolicitacaoReservaRouter
   */
  constructor() {
    this.router = Router();
    this.init();
  }

  /**
   * GET all solicitacao_reserva.
   */
  public getAll(req: Request, res: Response, next: NextFunction) {
    execSQLQuery('SELECT cd_solic_reserva, cd_flat, cd_usuario, cd_usuario_responsavel, dt_inicial, dt_final, nr_dias, nr_pessoas, vl_diaria, vl_entrada, vl_total FROM solicitacao_reserva ORDER BY cd_flat', res);
  }

  /**
   * GET one solicitacao_reserva by id
   */
  public getOne(req: Request, res: Response, next: NextFunction) {
    let filter = '';
    if(req.params.cd_solic_reserva) filter = ` AND cd_solic_reserva='` + req.params.cd_solic_reserva + `'`;
    filter = filter + ' ORDER BY cd_flat ';
    execSQLQuery(`SELECT cd_solic_reserva, cd_flat, cd_usuario, cd_usuario_responsavel, dt_inicial, dt_final, nr_dias, nr_pessoas, vl_diaria, vl_entrada, vl_total FROM solicitacao_reserva WHERE 1 = 1` + filter, res);
  }

  /**
   * GET one solicitacao_reserva by usuario
   */
  public getByUsuario(req: Request, res: Response, next: NextFunction) {
    let filter = '';
    if(req.params.cd_usuario) filter = ' AND cd_usuario=' + req.params.cd_usuario;
    filter = filter + ' ORDER BY cd_flat ';
    execSQLQuery(`SELECT cd_solic_reserva, cd_flat, cd_usuario, cd_usuario_responsavel, dt_inicial, dt_final, nr_dias, nr_pessoas, vl_diaria, vl_entrada, vl_total FROM solicitacao_reserva WHERE 1 = 1 ` + filter, res);
  }

  /**
   * GET one solicitacao_reserva by cd_usuario_responsavel
   */
  public getByUsuarioResp(req: Request, res: Response, next: NextFunction) {
    let filter = '';
    if(req.params.cd_usuario_responsavel) filter = ' AND cd_usuario_responsavel=' + req.params.cd_usuario_responsavel;
    filter = filter + ' ORDER BY cd_flat ';
    execSQLQuery(`SELECT cd_solic_reserva, cd_flat, cd_usuario, cd_usuario_responsavel, dt_inicial, dt_final, nr_dias, nr_pessoas, vl_diaria, vl_entrada, vl_total FROM solicitacao_reserva WHERE 1 = 1 ` + filter, res);
  }

  public postSolicitacaoReserva(req: Request, res: Response, next: NextFunction) {
    if(req.body.cd_flat) var cd_flat = req.body.cd_flat;
    if(req.body.cd_usuario) var cd_usuario = req.body.cd_usuario;
    if(req.body.cd_usuario_responsavel) var cd_usuario_responsavel = req.body.cd_usuario_responsavel;
    if(req.body.dt_inicial) var dt_inicial = req.body.dt_inicial;
    if(req.body.dt_final) var dt_final = req.body.dt_final;
    if(req.body.nr_dias) var nr_dias = req.body.nr_dias;
    if(req.body.nr_pessoas) var nr_pessoas = req.body.nr_pessoas;
    if(req.body.vl_diaria) var vl_diaria = req.body.vl_diaria;
    if(req.body.vl_entrada) var vl_entrada = req.body.vl_entrada;
    if(req.body.vl_total) var vl_total = req.body.vl_total;

    execSQLQuery(`INSERT INTO solicitacao_reserva(cd_flat, cd_usuario, cd_usuario_responsavel, dt_inicial, dt_final, nr_dias, nr_pessoas, vl_diaria, vl_entrada, vl_total) 
                    VALUES(${cd_flat}, ${cd_usuario}, ${cd_usuario_responsavel}, ${dt_inicial}, ${dt_final}, ${nr_dias}, ${nr_pessoas}, ${vl_diaria}, ${vl_entrada}, ${vl_total})`, res);
  }

  public patchSolicitacaoReserva(req: Request, res: Response, next: NextFunction) {
    const cd_solic_reserva = parseInt(req.params.cd_solic_reserva);

    if(req.body.cd_flat) var cd_flat = req.body.cd_flat;
    if(req.body.cd_usuario) var cd_usuario = req.body.cd_usuario;
    if(req.body.cd_usuario_responsavel) var cd_usuario_responsavel = req.body.cd_usuario_responsavel;
    if(req.body.dt_inicial) var dt_inicial = req.body.dt_inicial;
    if(req.body.dt_final) var dt_final = req.body.dt_final;
    if(req.body.nr_dias) var nr_dias = req.body.nr_dias;
    if(req.body.nr_pessoas) var nr_pessoas = req.body.nr_pessoas;
    if(req.body.vl_diaria) var vl_diaria = req.body.vl_diaria;
    if(req.body.vl_entrada) var vl_entrada = req.body.vl_entrada;
    if(req.body.vl_total) var vl_total = req.body.vl_total;

    execSQLQuery(`UPDATE solicitacao_reserva SET cd_flat=${cd_flat}, cd_usuario=${cd_usuario}, cd_usuario_responsavel=${cd_usuario_responsavel}, dt_inicial=${dt_inicial}, dt_final=${dt_final}, nr_dias=${nr_dias}, nr_pessoas=${nr_pessoas}, vl_diaria=${vl_diaria}, vl_entrada=${vl_entrada}, vl_total=${vl_total} WHERE cd_solic_reserva=${cd_solic_reserva}`, res);
  }

  public deleteSolicitacaoReserva(req: Request, res: Response, next: NextFunction) {
    execSQLQuery('DELETE FROM solicitacao_reserva WHERE cd_solic_reserva=' + parseInt(req.params.cd_solic_reserva), res);
  }

  /**
   * Take each handler, and attach to one of the Express.Router's
   * endpoints.
   */
  init() {
    this.router.get('', this.getAll);
    this.router.get('/:cd_solic_reserva', this.getOne);
    this.router.get('/usuario/:cd_usuario', this.getByUsuario);
    this.router.get('/usuario_resp/:cd_usuario', this.getByUsuarioResp);
    this.router.post('', this.postSolicitacaoReserva);
    this.router.patch('/:cd_solic_reserva', this.patchSolicitacaoReserva);
    this.router.delete('/:cd_solic_reserva', this.deleteSolicitacaoReserva);
  }

}

// Create the SolicitacaoReservaRouter, and export its configured Express.Router
// let SolicitacaoReservaRouter = new SolicitacaoReservaRouter();
// SolicitacaoReservaRouter.init();

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
        console.log('Executou query solicitacao_reserva! Deu ERRO: \n' + error);
      }
      else {
        res.json(results);
        console.log('Executou query solicitacao_reserva! Deu CERTO query= \n' + sqlQry);
      }
      connection.end();
      
  });
}

export default new SolicitacaoReservaRouter().router;