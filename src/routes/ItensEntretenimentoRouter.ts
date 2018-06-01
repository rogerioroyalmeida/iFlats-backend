import {Router, Request, Response, NextFunction} from 'express';
import * as mysql from 'mysql';

export class ItensEntretenimentoRouter {
  router: Router

  /**
   * Initialize the ItensEntretenimentoRouter
   */
  constructor() {
    this.router = Router();
    this.init();
  }

  /**
   * GET all itens_entretenimento.
   */
  public getAll(req: Request, res: Response, next: NextFunction) {
    execSQLQuery('SELECT cd_itentretenimento, ds_itentretenimento, dt_movimentacao, observacao, valor, campo01, campo02, campo03, campo04, dt_cadastro, cd_usuario_cadastro FROM itens_entretenimento ORDER BY ds_itentretenimento', res);
  }

  /**
   * GET one itens_entretenimento by id
   */
  public getOne(req: Request, res: Response, next: NextFunction) {
    let filter = '';
    if(req.params.cd_itentretenimento) filter = ` AND cd_itentretenimento='` + req.params.cd_itentretenimento + `'`;
    filter = filter + ' ORDER BY ds_itentretenimento ';
    execSQLQuery(`SELECT cd_itentretenimento, ds_itentretenimento, dt_movimentacao, observacao, valor, campo01, campo02, campo03, campo04, dt_cadastro, cd_usuario_cadastro FROM itens_entretenimento WHERE 1 = 1` + filter, res);
  }

  /**
   * GET one itens_entretenimento by usuario
   */
  public getByUsuario(req: Request, res: Response, next: NextFunction) {
    let filter = '';
    if(req.params.cd_usuario_cadastro) filter = ' AND cd_usuario_cadastro=' + req.params.cd_usuario_cadastro;
    filter = filter + ' ORDER BY ds_itentretenimento ';
    execSQLQuery(`SELECT cd_itentretenimento, ds_itentretenimento, dt_movimentacao, observacao, valor, campo01, campo02, campo03, campo04, dt_cadastro, cd_usuario_cadastro FROM itens_entretenimento WHERE 1 = 1 ` + filter, res);
  }

  public postItensEntretenimento(req: Request, res: Response, next: NextFunction) {
    if(req.body.ds_itentretenimento) var ds_itentretenimento = req.body.ds_itentretenimento;
    if(req.body.observacao) var observacao = req.body.observacao;
    if(req.body.valor) var valor = req.body.valor;
    if(req.body.campo01) var campo01 = req.body.campo01;
    if(req.body.campo02) var campo02 = req.body.campo02;
    if(req.body.campo03) var campo03 = req.body.campo03;
    if(req.body.campo04) var campo04 = req.body.campo04;
    if(req.params.cd_usuario_cadastro) var cd_usuario_cadastro = req.params.cd_usuario_cadastro;

    execSQLQuery(`INSERT INTO itens_entretenimento(ds_itentretenimento, observacao, valor, campo01, campo02, campo03, campo04, dt_cadastro, cd_usuario_cadastro) 
                    VALUES('${ds_itentretenimento}', '${observacao}', ${valor}, '${campo01}', '${campo02}', '${campo03}', '${campo04}', SYSDATE(), ${cd_usuario_cadastro})`, res);
  }

  public patchItensEntretenimento(req: Request, res: Response, next: NextFunction) {
    const cd_itentretenimento = parseInt(req.params.cd_itentretenimento);

    if(req.body.ds_itentretenimento) var ds_itentretenimento = req.body.ds_itentretenimento;
    if(req.body.observacao) var observacao = req.body.observacao;
    if(req.body.valor) var valor = req.body.valor;
    if(req.body.campo01) var campo01 = req.body.campo01;
    if(req.body.campo02) var campo02 = req.body.campo02;
    if(req.body.campo03) var campo03 = req.body.campo03;
    if(req.body.campo04) var campo04 = req.body.campo04;

    execSQLQuery(`UPDATE itens_entretenimento SET ds_itentretenimento='${ds_itentretenimento}', observacao='${observacao}', valor='${valor}', campo01='${campo01}', campo02='${campo02}', campo03='${campo03}', campo04='${campo04}' WHERE cd_itentretenimento=${cd_itentretenimento}`, res);
  }

  public deleteItensEntretenimento(req: Request, res: Response, next: NextFunction) {
    execSQLQuery('DELETE FROM itens_entretenimento WHERE cd_itentretenimento=' + parseInt(req.params.cd_itentretenimento), res);
  }

  /**
   * Take each handler, and attach to one of the Express.Router's
   * endpoints.
   */
  init() {
    this.router.get('', this.getAll);
    this.router.get('/:cd_itentretenimento', this.getOne);
    this.router.get('/usuario/:cd_usuario_cadastro', this.getByUsuario);
    this.router.post('/:cd_usuario_cadastro', this.postItensEntretenimento);
    this.router.patch('/:cd_itentretenimento', this.patchItensEntretenimento);
    this.router.delete('/:cd_itentretenimento', this.deleteItensEntretenimento);
  }

}

// Create the ItensEntretenimentoRouter, and export its configured Express.Router
// let ItensEntretenimentoRouter = new ItensEntretenimentoRouter();
// ItensEntretenimentoRouter.init();

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
        console.log('Executou query itens_entretenimento! Deu ERRO: \n' + error);
      }
      else {
        res.json(results);
        console.log('Executou query itens_entretenimento! Deu CERTO query= \n' + sqlQry);
      }
      connection.end();
      
  });
}

export default new ItensEntretenimentoRouter().router;