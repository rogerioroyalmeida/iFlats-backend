import {Router, Request, Response, NextFunction} from 'express';
import * as mysql from 'mysql';

export class EquipamentosRouter {
  router: Router

  /**
   * Initialize the EquipamentosRouter
   */
  constructor() {
    this.router = Router();
    this.init();
  }

  /**
   * GET all equipamentos.
   */
  public getAll(req: Request, res: Response, next: NextFunction) {
    execSQLQuery('SELECT cd_equipamento, ds_equipamento, dt_movimentacao, observacao, valor, campo01, campo02, campo03, campo04, dt_cadastro, cd_usuario_cadastro FROM equipamentos ORDER BY ds_equipamento', res);
  }

  /**
   * GET one equipamentos by id
   */
  public getOne(req: Request, res: Response, next: NextFunction) {
    let filter = '';
    if(req.params.cd_equipamento) filter = ` AND cd_equipamento='` + req.params.cd_equipamento + `'`;
    filter = filter + ' ORDER BY ds_equipamento ';
    execSQLQuery(`SELECT cd_equipamento, ds_equipamento, dt_movimentacao, observacao, valor, campo01, campo02, campo03, campo04, dt_cadastro, cd_usuario_cadastro FROM equipamentos WHERE 1 = 1` + filter, res);
  }

  /**
   * GET one equipamentos by usuario
   */
  public getByUsuario(req: Request, res: Response, next: NextFunction) {
    let filter = '';
    if(req.params.cd_usuario_cadastro) filter = ' AND cd_usuario_cadastro=' + req.params.cd_usuario_cadastro;
    filter = filter + ' ORDER BY ds_equipamento ';
    execSQLQuery(`SELECT cd_equipamento, ds_equipamento, dt_movimentacao, observacao, valor, campo01, campo02, campo03, campo04, dt_cadastro, cd_usuario_cadastro FROM equipamentos WHERE 1 = 1 ` + filter, res);
  }

  public postEquipamento(req: Request, res: Response, next: NextFunction) {
    if(req.body.ds_equipamento) var ds_equipamento = req.body.ds_equipamento;
    if(req.body.observacao) var observacao = req.body.observacao;
    if(req.body.valor) var valor = req.body.valor;
    if(req.body.campo01) var campo01 = req.body.campo01;
    if(req.body.campo02) var campo02 = req.body.campo02;
    if(req.body.campo03) var campo03 = req.body.campo03;
    if(req.body.campo04) var campo04 = req.body.campo04;
    if(req.params.cd_usuario_cadastro) var cd_usuario_cadastro = req.params.cd_usuario_cadastro;

    execSQLQuery(`INSERT INTO equipamentos(ds_equipamento, observacao, valor, campo01, campo02, campo03, campo04, dt_cadastro, cd_usuario_cadastro) 
                    VALUES('${ds_equipamento}', '${observacao}', ${valor}, '${campo01}', '${campo02}', '${campo03}', '${campo04}', SYSDATE(), ${cd_usuario_cadastro})`, res);
  }

  public patchEquipamento(req: Request, res: Response, next: NextFunction) {
    const cd_equipamento = parseInt(req.params.cd_equipamento);

    //req.body.dsTituloAnuncio ? u.setDsTituloAnuncio(req.body.dsTituloAnuncio) : f.setDsTituloAnuncio("");

    if(req.body.ds_equipamento) var ds_equipamento = req.body.ds_equipamento;
    if(req.body.observacao) var observacao = req.body.observacao;
    if(req.body.valor) var valor = req.body.valor;
    if(req.body.campo01) var campo01 = req.body.campo01;
    if(req.body.campo02) var campo02 = req.body.campo02;
    if(req.body.campo03) var campo03 = req.body.campo03;
    if(req.body.campo04) var campo04 = req.body.campo04;

    execSQLQuery(`UPDATE equipamentos SET ds_equipamento='${ds_equipamento}', observacao='${observacao}', valor='${valor}', campo01='${campo01}', campo02='${campo02}', campo03='${campo03}', campo04='${campo04}' WHERE cd_equipamento=${cd_equipamento}`, res);
  }

  public deleteEquipamento(req: Request, res: Response, next: NextFunction) {
    execSQLQuery('DELETE FROM equipamentos WHERE cd_equipamento=' + parseInt(req.params.cd_equipamento), res);
  }

  /**
   * Take each handler, and attach to one of the Express.Router's
   * endpoints.
   */
  init() {
    this.router.get('', this.getAll);
    this.router.get('/:cd_equipamento', this.getOne);
    this.router.get('/usuario/:cd_usuario_cadastro', this.getByUsuario);
    this.router.post('/:cd_usuario_cadastro', this.postEquipamento);
    this.router.patch('/:cd_equipamento', this.patchEquipamento);
    this.router.delete('/:cd_equipamento', this.deleteEquipamento);
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
        console.log('Executou query equipamentos! Deu ERRO: \n' + error);
      }
      else {
        res.json(results);
        console.log('Executou query equipamentos! Deu CERTO query= \n' + sqlQry);
      }
      connection.end();
      
  });
}

export default new EquipamentosRouter().router;