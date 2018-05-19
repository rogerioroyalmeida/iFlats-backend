import {Router, Request, Response, NextFunction} from 'express';
import * as mysql from 'mysql';

export class MensagensRouter {
  router: Router

  /**
   * Initialize the MensagensRouter
   */
  constructor() {
    this.router = Router();
    this.init();
  }

  /**
   * GET all central_mensagem.
   */
  public getAll(req: Request, res: Response, next: NextFunction) {
    execSQLQuery('SELECT cd_mensagem, cd_flat, ds_mensagem, anexo_01, cd_usuario_emissario, cd_usuario_destinatario, dt_mensagem, anexo_02, status, time FROM central_mensagem', res);
  }

  /**
   * GET one central_mensagem by cd_mensagem
   */
  public getOne(req: Request, res: Response, next: NextFunction) {
    let filter = '';
    if(req.params.cd_mensagem) filter = ` AND cd_mensagem=` + req.params.cd_mensagem;
    execSQLQuery(`SELECT cd_mensagem, cd_flat, ds_mensagem, anexo_01, cd_usuario_emissario, cd_usuario_destinatario, dt_mensagem, anexo_02, status, time FROM central_mensagem WHERE 1 = 1` + filter, res);
  }

  /**
   * GET all central_mensagem by flat
   */
  public getAllByFlat(req: Request, res: Response, next: NextFunction) {
    let filter = '';
    if(req.params.cd_flat) filter = ` AND cd_flat=` + req.params.cd_flat;
    execSQLQuery(`SELECT cd_mensagem, cd_flat, ds_mensagem, anexo_01, cd_usuario_emissario, cd_usuario_destinatario, dt_mensagem, anexo_02, status, time FROM central_mensagem WHERE 1 = 1` + filter, res);
  }

  /**
   * GET all central_mensagem by flat e usuario
   */
  public getAllByFlatUsuario(req: Request, res: Response, next: NextFunction) {
    let filter = '';
    if(req.params.cd_flat) filter = ` AND cd_flat=` + req.params.cd_flat;
    if(req.params.cd_usuario_emissario) filter = filter + ` AND cd_usuario_emissario=` + req.params.cd_usuario_emissario;
    execSQLQuery(`SELECT cd_mensagem, cd_flat, ds_mensagem, anexo_01, cd_usuario_emissario, cd_usuario_destinatario, dt_mensagem, anexo_02, status, time FROM central_mensagem WHERE 1 = 1` + filter, res);
  }

  /**
   * GET all central_mensagem by cd_usuario_emissario
   */
  public getAllByUsuarios(req: Request, res: Response, next: NextFunction) {
    let filter = '';
    if(req.params.cd_usuario_emissario) filter = ` AND cd_usuario_emissario=` + req.params.cd_usuario_emissario;
    if(req.params.cd_usuario_destinatario) filter = filter + ` AND cd_usuario_destinatario=` + req.params.cd_usuario_destinatario;
    execSQLQuery(`SELECT cd_mensagem, cd_flat, ds_mensagem, anexo_01, cd_usuario_emissario, cd_usuario_destinatario, dt_mensagem, anexo_02, status, time FROM central_mensagem WHERE 1 = 1` + filter, res);
  }

  public postMensagem(req: Request, res: Response, next: NextFunction) {
    if(req.body.cd_flat) var cd_flat = req.body.cd_flat;
    if(req.body.ds_mensagem) var ds_mensagem = req.body.ds_mensagem;
    if(req.body.anexo_01) var anexo_01 = req.body.anexo_01;
    if(req.body.cd_usuario_emissario) var cd_usuario_emissario = req.body.cd_usuario_emissario;
    if(req.body.cd_usuario_destinatario) var cd_usuario_destinatario = req.body.cd_usuario_destinatario;
    if(req.body.anexo_02) var anexo_02 = req.body.anexo_02;
    if(req.body.status) var status = req.body.status;
    if(req.body.time) var time = req.body.time;

    execSQLQuery(`INSERT INTO central_mensagem(cd_flat, ds_mensagem, anexo_01, cd_usuario_emissario, cd_usuario_destinatario, dt_mensagem, anexo_02, status, time) 
                    VALUES(${cd_flat}, '${ds_mensagem}', '${anexo_01}', ${cd_usuario_emissario}, ${cd_usuario_destinatario}, SYSDATE(), '${anexo_02}', '${status}', ${time})`, res);
  }

  public patchMensagem(req: Request, res: Response, next: NextFunction) {
    const cd_mensagem = parseInt(req.params.cd_mensagem);

    if(req.body.cd_flat) var cd_flat = req.body.cd_flat;
    if(req.body.ds_mensagem) var ds_mensagem = req.body.ds_mensagem;
    if(req.body.anexo_01) var anexo_01 = req.body.anexo_01;
    if(req.body.cd_usuario_emissario) var cd_usuario_emissario = req.body.cd_usuario_emissario;
    if(req.body.cd_usuario_destinatario) var cd_usuario_destinatario = req.body.cd_usuario_destinatario;
    if(req.body.dt_mensagem) var dt_mensagem = req.body.dt_mensagem;
    if(req.body.anexo_02) var anexo_02 = req.body.anexo_02;
    if(req.body.status) var status = req.body.status;
    if(req.body.time) var time = req.body.time;

    execSQLQuery(`UPDATE central_mensagem SET cd_flat=${cd_flat}, ds_mensagem='${ds_mensagem}', anexo_01='${anexo_01}', cd_usuario_emissario=${cd_usuario_emissario}, cd_usuario_destinatario=${cd_usuario_destinatario}, dt_mensagem=${dt_mensagem}, anexo_02='${anexo_02}', status='${status}', time=${time} WHERE cd_mensagem=${cd_mensagem}`, res);
  }

  public deleteMensagem(req: Request, res: Response, next: NextFunction) {
    execSQLQuery('DELETE FROM central_mensagem WHERE cd_mensagem=' + parseInt(req.params.cd_mensagem), res);
  }

  /**
   * Take each handler, and attach to one of the Express.Router's
   * endpoints.
   */
  init() {
    this.router.get('', this.getAll);
    this.router.get('/:cd_mensagem', this.getOne);
    this.router.get('/flat/:cd_flat', this.getAllByFlat);
    this.router.get('/flat/usuario/:cd_flat/:cd_usuario_emissario', this.getAllByFlatUsuario);
    this.router.get('/usuarios/emissario/:cd_usuario_emissario/destinatario/:cd_usuario_destinatario', this.getAllByUsuarios);
    this.router.post('', this.postMensagem);
    this.router.patch('/:cd_mensagem', this.patchMensagem);
    this.router.delete('/:cd_mensagem', this.deleteMensagem);
  }

}

// Create the MensagensRouter, and export its configured Express.Router
// let MensagensRouter = new MensagensRouter();
// MensagensRouter.init();

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
        console.log('Executou query central_mensagem! Deu ERRO: \n' + error);
      }
      else {
        res.json(results);
        console.log('Executou query central_mensagem! Deu CERTO query= \n' + sqlQry);
      }
      connection.end();
      
  });
}

export default new MensagensRouter().router;