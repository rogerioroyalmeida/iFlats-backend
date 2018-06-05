import {Router, Request, Response, NextFunction} from 'express';
import * as mysql from 'mysql';

export class ServicoRouter {
  router: Router

  /**
   * Initialize the ServicoRouter
   */
  constructor() {
    this.router = Router();
    this.init();
  }

  /**
   * GET all Servico.
   */
  public getAll(req: Request, res: Response, next: NextFunction) {
    execSQLQuery('SELECT cd_servico, ds_servico, dt_movimentacao, observacao, valor, campo01, campo02, campo03, campo04, dt_cadastro, cd_usuario_cadastro FROM Servico ORDER BY ds_servico', res);
  }

  /**
   * GET one Servico by id
   */
  public getOne(req: Request, res: Response, next: NextFunction) {
    let filter = '';
    if(req.params.cd_servico) filter = ` AND cd_servico='` + req.params.cd_servico + `'`;
    filter = filter + ' ORDER BY ds_servico ';
    execSQLQuery(`SELECT cd_servico, ds_servico, dt_movimentacao, observacao, valor, campo01, campo02, campo03, campo04, dt_cadastro, cd_usuario_cadastro FROM Servico WHERE 1 = 1` + filter, res);
  }

  /**
   * GET one Servico by usuario
   */
  public getByUsuario(req: Request, res: Response, next: NextFunction) {
    let filter = '';
    if(req.params.cd_usuario_cadastro) filter = ' AND cd_usuario_cadastro=' + req.params.cd_usuario_cadastro;
    filter = filter + ' ORDER BY ds_servico ';
    execSQLQuery(`SELECT cd_servico, ds_servico, dt_movimentacao, observacao, valor, campo01, campo02, campo03, campo04, dt_cadastro, cd_usuario_cadastro FROM Servico WHERE 1 = 1 ` + filter, res);
  }

  public postServico(req: Request, res: Response, next: NextFunction) {
    if(req.body.ds_servico) var ds_servico = req.body.ds_servico;
    if(req.body.observacao) var observacao = req.body.observacao;
    if(req.body.valor) var valor = req.body.valor;
    if(req.body.campo01) var campo01 = req.body.campo01;
    if(req.body.campo02) var campo02 = req.body.campo02;
    if(req.body.campo03) var campo03 = req.body.campo03;
    if(req.body.campo04) var campo04 = req.body.campo04;

    execSQLQuery(`INSERT INTO Servico(ds_servico, observacao, valor, campo01, campo02, campo03, campo04, dt_cadastro, cd_usuario_cadastro) 
                    VALUES('${ds_servico}', '${observacao}', ${valor}, '${campo01}', '${campo02}', '${campo03}', '${campo04}', SYSDATE(), 1)`, res);
  }

  public patchServico(req: Request, res: Response, next: NextFunction) {
    const cd_servico = parseInt(req.params.cd_servico);

    //req.body.dsTituloAnuncio ? u.setDsTituloAnuncio(req.body.dsTituloAnuncio) : f.setDsTituloAnuncio("");

    if(req.body.ds_servico) var ds_servico = req.body.ds_servico;
    if(req.body.observacao) var observacao = req.body.observacao;
    if(req.body.valor) var valor = req.body.valor;
    if(req.body.campo01) var campo01 = req.body.campo01;
    if(req.body.campo02) var campo02 = req.body.campo02;
    if(req.body.campo03) var campo03 = req.body.campo03;
    if(req.body.campo04) var campo04 = req.body.campo04;

    execSQLQuery(`UPDATE Servico SET ds_servico='${ds_servico}', observacao='${observacao}', valor='${valor}', campo01='${campo01}', campo02='${campo02}', campo03='${campo03}', campo04='${campo04}' WHERE cd_servico=${cd_servico}`, res);
  }

  public deleteServico(req: Request, res: Response, next: NextFunction) {
    execSQLQuery('DELETE FROM Servico WHERE cd_servico=' + parseInt(req.params.cd_servico), res);
  }

  /**
   * Take each handler, and attach to one of the Express.Router's
   * endpoints.
   */
  init() {
    this.router.get('', this.getAll);
    this.router.get('/:cd_servico', this.getOne);
    this.router.get('/usuario/:cd_usuario_cadastro', this.getByUsuario);
    this.router.post('', this.postServico);
    this.router.patch('/:cd_servico', this.patchServico);
    this.router.delete('/:cd_servico', this.deleteServico);
  }

}

// Create the ItensGeralRouter, and export its configured Express.Router
// let ItensGeralRouter = new ItensGeralRouter();
// ItensGeralRouter.init();

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
        console.log('Executou query Servico! Deu ERRO: \n' + error);
      }
      else {
        res.json(results);
        console.log('Executou query Servico! Deu CERTO query= \n' + sqlQry);
      }
      connection.end();
      
  });
}

export default new ServicoRouter().router;