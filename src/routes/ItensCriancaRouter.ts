import {Router, Request, Response, NextFunction} from 'express';
import * as mysql from 'mysql';

export class ItensCriancaRouter {
  router: Router

  /**
   * Initialize the ItensCriancaRouter
   */
  constructor() {
    this.router = Router();
    this.init();
  }

  /**
   * GET all itens_crianca.
   */
  public getAll(req: Request, res: Response, next: NextFunction) {
    execSQLQuery('SELECT cd_itcrianca, ds_itcrianca, dt_movimentacao,observacao, valor, campo01, campo02, campo03, campo04, dt_cadastro, cd_usuario_cadastro FROM itens_crianca ORDER BY ds_itcrianca', res);
  }

  /**
   * GET one itens_crianca by id
   */
  public getOne(req: Request, res: Response, next: NextFunction) {
    let filter = '';
    if(req.params.cd_itcrianca) filter = ` AND cd_itcrianca='` + req.params.cd_itcrianca + `'`;
    filter = filter + ' ORDER BY ds_itcrianca ';
    execSQLQuery(`SELECTcd_itcrianca, ds_itcrianca, dt_movimentacao,observacao, valor, campo01, campo02, campo03, campo04, dt_cadastro, cd_usuario_cadastro FROM itens_crianca WHERE 1 = 1` + filter, res);
  }

  /**
   * GET one itens_crianca by usuario
   */
  public getByUsuario(req: Request, res: Response, next: NextFunction) {
    let filter = '';
    if(req.params.cd_usuario_cadastro) filter = ' AND cd_usuario_cadastro=' + req.params.cd_usuario_cadastro;
    filter = filter + ' ORDER BY ds_itcrianca ';
    execSQLQuery(`SELECT cd_itcrianca, ds_itcrianca, dt_movimentacao,observacao, valor, campo01, campo02, campo03, campo04, dt_cadastro, cd_usuario_cadastro FROM itens_crianca WHERE 1 = 1 ` + filter, res);
  }

  public postItensCrianca(req: Request, res: Response, next: NextFunction) {
    if(req.body.ds_itcrianca) var ds_itcrianca = req.body.ds_itcrianca;
    if(req.body.observacao) var observacao = req.body.observacao;
    if(req.body.valor) var valor = req.body.valor;
    if(req.body.campo01) var campo01 = req.body.campo01;
    if(req.body.campo02) var campo02 = req.body.campo02;
    if(req.body.campo03) var campo03 = req.body.campo03;
    if(req.body.campo04) var campo04 = req.body.campo04;
    if(req.params.cd_usuario_cadastro) var cd_usuario_cadastro = req.params.cd_usuario_cadastro;

    execSQLQuery(`INSERT INTO itens_crianca(ds_itcrianca, observacao, valor, campo01, campo02, campo03, campo04, dt_cadastro, cd_usuario_cadastro) 
                    VALUES('${ds_itcrianca}', '${observacao}', ${valor}, '${campo01}', '${campo02}', '${campo03}', '${campo04}', SYSDATE(), ${cd_usuario_cadastro})`, res);
  }

  public patchItensCrianca(req: Request, res: Response, next: NextFunction) {
    const cd_itcrianca = parseInt(req.params.cd_itcrianca);

    //req.body.dsTituloAnuncio ? u.setDsTituloAnuncio(req.body.dsTituloAnuncio) : f.setDsTituloAnuncio("");

    if(req.body.ds_itcrianca) var ds_itcrianca = req.body.ds_itcrianca;
    if(req.body.observacao) var observacao = req.body.observacao;
    if(req.body.valor) var valor = req.body.valor;
    if(req.body.campo01) var campo01 = req.body.campo01;
    if(req.body.campo02) var campo02 = req.body.campo02;
    if(req.body.campo03) var campo03 = req.body.campo03;
    if(req.body.campo04) var campo04 = req.body.campo04;

    execSQLQuery(`UPDATE itens_crianca SET ds_itcrianca='${ds_itcrianca}', observacao='${observacao}', valor='${valor}', campo01='${campo01}', campo02='${campo02}', campo03='${campo03}', campo04='${campo04}' WHERE cd_itcrianca=${cd_itcrianca}`, res);
  }

  public deleteItensCrianca(req: Request, res: Response, next: NextFunction) {
    execSQLQuery('DELETE FROM itens_crianca WHERE cd_itcrianca=' + parseInt(req.params.cd_itcrianca), res);
  }

  /**
   * Take each handler, and attach to one of the Express.Router's
   * endpoints.
   */
  init() {
    this.router.get('', this.getAll);
    this.router.get('/:cd_itcrianca', this.getOne);
    this.router.get('/usuario/:cd_usuario_cadastro', this.getByUsuario);
    this.router.post('/:cd_usuario_cadastro', this.postItensCrianca);
    this.router.patch('/:cd_itcrianca', this.patchItensCrianca);
    this.router.delete('/:cd_itcrianca', this.deleteItensCrianca);
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
        console.log('Executou query itens_crianca! Deu ERRO: \n' + error);
      }
      else {
        res.json(results);
        console.log('Executou query itens_crianca! Deu CERTO query= \n' + sqlQry);
      }
      connection.end();
      
  });
}

export default new ItensCriancaRouter().router;