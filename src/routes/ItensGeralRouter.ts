import {Router, Request, Response, NextFunction} from 'express';
import * as mysql from 'mysql';

export class ItensGeralRouter {
  router: Router

  /**
   * Initialize the ItensGeralRouter
   */
  constructor() {
    this.router = Router();
    this.init();
  }

  /**
   * GET all itens_geral.
   */
  public getAll(req: Request, res: Response, next: NextFunction) {
    execSQLQuery('SELECT cd_itgeral, ds_itgeral, observacao, valor, campo01, campo02, campo03, campo04, dt_cadastro FROM itens_geral', res);
  }

  /**
   * GET one itens_geral by id
   */
  public getOne(req: Request, res: Response, next: NextFunction) {
    let filter = '';
    if(req.params.cd_itgeral) filter = ` AND cd_itgeral='` + req.params.cd_itgeral + `'`;
    execSQLQuery(`SELECT cd_itgeral, ds_itgeral, observacao, valor, campo01, campo02, campo03, campo04, dt_cadastro FROM itens_geral WHERE 1 = 1` + filter, res);
  }

  public postItensGeral(req: Request, res: Response, next: NextFunction) {
    if(req.body.ds_itgeral) var ds_itgeral = req.body.ds_itgeral;
    if(req.body.observacao) var observacao = req.body.observacao;
    if(req.body.valor) var valor = req.body.valor;
    if(req.body.campo01) var campo01 = req.body.campo01;
    if(req.body.campo02) var campo02 = req.body.campo02;
    if(req.body.campo03) var campo03 = req.body.campo03;
    if(req.body.campo04) var campo04 = req.body.campo04;

    execSQLQuery(`INSERT INTO itens_geral(ds_itgeral, observacao, valor, campo01, campo02, campo03, campo04, dt_cadastro) 
                    VALUES('${ds_itgeral}', '${observacao}', ${valor}, '${campo01}', '${campo02}', '${campo03}', '${campo04}', SYSDATE())`, res);
  }

  public patchItensGeral(req: Request, res: Response, next: NextFunction) {
    const cd_itgeral = parseInt(req.params.cd_itgeral);

    //req.body.dsTituloAnuncio ? u.setDsTituloAnuncio(req.body.dsTituloAnuncio) : f.setDsTituloAnuncio("");

    if(req.body.ds_itgeral) var ds_itgeral = req.body.ds_itgeral;
    if(req.body.observacao) var observacao = req.body.observacao;
    if(req.body.valor) var valor = req.body.valor;
    if(req.body.campo01) var campo01 = req.body.campo01;
    if(req.body.campo02) var campo02 = req.body.campo02;
    if(req.body.campo03) var campo03 = req.body.campo03;
    if(req.body.campo04) var campo04 = req.body.campo04;

    execSQLQuery(`UPDATE itens_geral SET ds_itgeral='${ds_itgeral}', observacao='${observacao}', valor='${valor}', campo01='${campo01}', campo02='${campo02}', campo03='${campo03}', campo04='${campo04}' WHERE cd_itgeral=${cd_itgeral}`, res);
  }

  public deleteItensGeral(req: Request, res: Response, next: NextFunction) {
    execSQLQuery('DELETE FROM itens_geral WHERE cd_itgeral=' + parseInt(req.params.cd_itgeral), res);
  }

  /**
   * Take each handler, and attach to one of the Express.Router's
   * endpoints.
   */
  init() {
    this.router.get('', this.getAll);
    this.router.get('/:cd_itgeral', this.getOne);
    this.router.post('', this.postItensGeral);
    this.router.patch('/:cd_itgeral', this.patchItensGeral);
    this.router.delete('/:cd_itgeral', this.deleteItensGeral);
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
        console.log('Executou query itens_geral! Deu ERRO: \n' + error);
      }
      else {
        res.json(results);
        console.log('Executou query itens_geral! Deu CERTO query= \n' + sqlQry);
      }
      connection.end();
      
  });
}

export default new ItensGeralRouter().router;