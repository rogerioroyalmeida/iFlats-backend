import {Router, Request, Response, NextFunction} from 'express';
import * as mysql from 'mysql';

export class ItensCozinhaRouter {
  router: Router

  /**
   * Initialize the ItensCozinhaRouter
   */
  constructor() {
    this.router = Router();
    this.init();
  }

  /**
   * GET all it_cozinha.
   */
  public getAll(req: Request, res: Response, next: NextFunction) {
    execSQLQuery('SELECT cd_itemcozinha, ds_itemcozinha, dt_mov, observacao, valor, campo01, campo02, campo03, campo04, dt_cadastro, cd_usuario_cadastro FROM it_cozinha ORDER BY ds_itemcozinha', res);
  }

  /**
   * GET one it_cozinha by id
   */
  public getOne(req: Request, res: Response, next: NextFunction) {
    let filter = '';
    if(req.params.cd_itemcozinha) filter = ` AND cd_itemcozinha='` + req.params.cd_itemcozinha + `'`;
    filter = filter + ' ORDER BY ds_itemcozinha ';
    execSQLQuery(`SELECT cd_itemcozinha, ds_itemcozinha, dt_mov, observacao, valor, campo01, campo02, campo03, campo04, dt_cadastro, cd_usuario_cadastro FROM it_cozinha WHERE 1 = 1` + filter, res);
  }

  /**
   * GET one it_cozinha by usuario
   */
  public getByUsuario(req: Request, res: Response, next: NextFunction) {
    let filter = '';
    if(req.params.cd_usuario_cadastro) filter = ' AND cd_usuario_cadastro=' + req.params.cd_usuario_cadastro;
    filter = filter + ' ORDER BY ds_itemcozinha ';
    execSQLQuery(`SELECT cd_itemcozinha, ds_itemcozinha, dt_mov, observacao, valor, campo01, campo02, campo03, campo04, dt_cadastro, cd_usuario_cadastro FROM it_cozinha WHERE 1 = 1 ` + filter, res);
  }

  public postItensCozinha(req: Request, res: Response, next: NextFunction) {
    if(req.body.ds_itemcozinha) var ds_itemcozinha = req.body.ds_itemcozinha;
    if(req.body.observacao) var observacao = req.body.observacao;
    if(req.body.valor) var valor = req.body.valor;
    if(req.body.campo01) var campo01 = req.body.campo01;
    if(req.body.campo02) var campo02 = req.body.campo02;
    if(req.body.campo03) var campo03 = req.body.campo03;
    if(req.body.campo04) var campo04 = req.body.campo04;
    if(req.params.cd_usuario_cadastro) var cd_usuario_cadastro = req.params.cd_usuario_cadastro;

    execSQLQuery(`INSERT INTO it_cozinha(ds_itemcozinha, observacao, valor, campo01, campo02, campo03, campo04, dt_cadastro, cd_usuario_cadastro) 
                    VALUES('${ds_itemcozinha}', '${observacao}', ${valor}, '${campo01}', '${campo02}', '${campo03}', '${campo04}', SYSDATE(), ${cd_usuario_cadastro})`, res);
  }

  public patchItensCozinha(req: Request, res: Response, next: NextFunction) {
    const cd_itemcozinha = parseInt(req.params.cd_itemcozinha);

    //req.body.dsTituloAnuncio ? u.setDsTituloAnuncio(req.body.dsTituloAnuncio) : f.setDsTituloAnuncio("");

    if(req.body.ds_itemcozinha) var ds_itemcozinha = req.body.ds_itemcozinha;
    if(req.body.observacao) var observacao = req.body.observacao;
    if(req.body.valor) var valor = req.body.valor;
    if(req.body.campo01) var campo01 = req.body.campo01;
    if(req.body.campo02) var campo02 = req.body.campo02;
    if(req.body.campo03) var campo03 = req.body.campo03;
    if(req.body.campo04) var campo04 = req.body.campo04;

    execSQLQuery(`UPDATE it_cozinha SET ds_itemcozinha='${ds_itemcozinha}', observacao='${observacao}', valor='${valor}', campo01='${campo01}', campo02='${campo02}', campo03='${campo03}', campo04='${campo04}' WHERE cd_itemcozinha=${cd_itemcozinha}`, res);
  }

  public deleteItensCozinha(req: Request, res: Response, next: NextFunction) {
    execSQLQuery('DELETE FROM it_cozinha WHERE cd_itemcozinha=' + parseInt(req.params.cd_itemcozinha), res);
  }

  /**
   * Take each handler, and attach to one of the Express.Router's
   * endpoints.
   */
  init() {
    this.router.get('', this.getAll);
    this.router.get('/:cd_itemcozinha', this.getOne);
    this.router.get('/usuario/:cd_usuario_cadastro', this.getByUsuario);
    this.router.post('/:cd_usuario_cadastro', this.postItensCozinha);
    this.router.patch('/:cd_itemcozinha', this.patchItensCozinha);
    this.router.delete('/:cd_itemcozinha', this.deleteItensCozinha);
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
        console.log('Executou query it_cozinha! Deu ERRO: \n' + error);
      }
      else {
        res.json(results);
        console.log('Executou query it_cozinha! Deu CERTO query= \n' + sqlQry);
      }
      connection.end();
      
  });
}

export default new ItensCozinhaRouter().router;