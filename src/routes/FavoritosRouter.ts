import {Router, Request, Response, NextFunction} from 'express';
import * as mysql from 'mysql';

export class FavoritosRouter {
  router: Router

  /**
   * Initialize the FavoritosRouter
   */
  constructor() {
    this.router = Router();
    this.init();
  }

  /**
   * GET all favoritos.
   */
  public getAll(req: Request, res: Response, next: NextFunction) {
    execSQLQuery('SELECT cd_flat, cd_usuario FROM favoritos ORDER BY cd_flat', res);
  }

  /**
   * GET one favoritos by id
   */
  public getOne(req: Request, res: Response, next: NextFunction) {
    let filter = '';
    if(req.params.cd_flat) filter = ` AND cd_flat='` + req.params.cd_flat + `'`;
    if(req.params.cd_usuario) filter = ` AND cd_usuario='` + req.params.cd_usuario + `'`;
    filter = filter + ' ORDER BY cd_flat ';
    execSQLQuery(`SELECT cd_flat, cd_usuario FROM favoritos WHERE 1 = 1` + filter, res);
  }

  /**
   * GET one favoritos by usuario
   */
  public getByUsuario(req: Request, res: Response, next: NextFunction) {
    let filter = '';
    if(req.params.cd_usuario) filter = ' AND cd_usuario=' + req.params.cd_usuario;
    filter = filter + ' ORDER BY cd_flat ';
    execSQLQuery(`SELECT cd_flat, cd_usuario FROM favoritos WHERE 1 = 1 ` + filter, res);
  }

  /**
   * GET flats favoritos by usuario
   */
  public getFlatsByUsuario(req: Request, res: Response, next: NextFunction) {
    let filter = '';
    if(req.params.cd_usuario) filter = ' AND favoritos.cd_usuario=' + req.params.cd_usuario;
    filter = filter + ' ORDER BY flat.cd_flat ';
    execSQLQuery(`SELECT flat.* FROM flat, favoritos WHERE flat.cd_flat = favoritos.cd_flat ` + filter, res);
  }

  public postFavoritos(req: Request, res: Response, next: NextFunction) {
    if(req.body.cd_flat) var cd_flat = req.body.cd_flat;
    if(req.body.cd_usuario) var cd_usuario = req.body.cd_usuario;

    execSQLQuery(`INSERT INTO favoritos(cd_flat, cd_usuario) 
                    VALUES(${cd_flat}, ${cd_usuario})`, res);
  }

  public deleteFavoritos(req: Request, res: Response, next: NextFunction) {
    execSQLQuery('DELETE FROM favoritos WHERE cd_flat=' + parseInt(req.params.cd_flat) + ' AND cd_usuario=' + parseInt(req.params.cd_usuario), res);
  }

  /**
   * Take each handler, and attach to one of the Express.Router's
   * endpoints.
   */
  init() {
    this.router.get('', this.getAll);
    this.router.get('/:cd_flat/:cd_usuario', this.getOne);
    this.router.get('/usuario/:cd_usuario', this.getByUsuario);
    this.router.get('/usuario/flats/:cd_usuario', this.getFlatsByUsuario);
    this.router.post('', this.postFavoritos);
    this.router.delete('/:cd_flat/:cd_usuario', this.deleteFavoritos);
  }

}

// Create the FavoritosRouter, and export its configured Express.Router
// let FavoritosRouter = new FavoritosRouter();
// FavoritosRouter.init();

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
        console.log('Executou query favoritos! Deu ERRO: \n' + error);
      }
      else {
        res.json(results);
        console.log('Executou query favoritos! Deu CERTO query= \n' + sqlQry);
      }
      connection.end();
      
  });
}

export default new FavoritosRouter().router;