import {Router, Request, Response, NextFunction} from 'express';
import * as mysql from 'mysql';

export class FlatRouter {
  router: Router

  /**
   * Initialize the UsuarioRouter
   */
  constructor() {
    this.router = Router();
    this.init();
  }

  /**
   * GET all flats.
   */
  public getAll(req: Request, res: Response, next: NextFunction) {
    execSQLQuery(`SELECT * FROM flat WHERE sn_ativo = 'S'`, res);
  }

  /**
   * GET one flat by id
   */
  public getOne(req: Request, res: Response, next: NextFunction) {
    let filter = '';
    if(req.params.cd_flat) filter = ' AND cd_flat=' + parseInt(req.params.cd_flat);
    execSQLQuery(`SELECT * FROM flat WHERE sn_ativo = 'S'` + filter, res);
  }

  public postFlat(req: Request, res: Response, next: NextFunction) {
    if(req.body.dsTituloAnuncio) var ds_titulo_anuncio = req.body.dsTituloAnuncio;
    if(req.body.endereco) var ds_endereco = req.body.endereco;
    if(req.body.numero) var nr_endereco = req.body.numero;
    if(req.body.complemento) var ds_complemento = req.body.complemento;
    if(req.body.pais) var ds_pais = req.body.pais;
    if(req.body.estado) var ds_estado = req.body.estado;
    if(req.body.cidade) var ds_cidade = req.body.cidade;
    if(req.body.bairro) var ds_bairro = req.body.bairro;
    if(req.body.cep) var nr_cep = req.body.cep;
    if(req.body.snCondominio) var sn_condominio = req.body.snCondominio;
    if(req.body.nrQuartos) var nr_quartos = req.body.nrQuartos;
    if(req.body.nrBanheiros) var nr_banheiros = req.body.nrBanheiros;
    if(req.body.nrMaxPessoas) var nr_max_pessoas = req.body.nrMaxPessoas;
    if(req.body.vlBasicoDiaria) var vl_basico_diaria = req.body.vlBasicoDiaria;
    if(req.body.nrAreaFlat) var nr_area_flat = req.body.nrAreaFlat;
    if(req.body.dsFlat) var ds_flat = req.body.dsFlat;
    if(req.body.dsRegras) var ds_regras = req.body.dsRegras;
    if(req.body.snInternet) var sn_internet = req.body.snInternet;
    if(req.body.snCriancas) var sn_criancas = req.body.snCriancas;
    if(req.body.snMobilidadeReduzida) var sn_mobilidade_reduzida = req.body.snMobilidadeReduzida;
    if(req.body.snFumantes) var sn_fumantes = req.body.snFumantes;
    if(req.body.snAnimais) var sn_animais = req.body.snAnimais;
    if(req.body.snFestas) var sn_festas = req.body.snFestas;
    if(req.body.snLongoPrazo) var sn_longo_prazo = req.body.snLongoPrazo;

    execSQLQuery(`INSERT INTO flat(ds_titulo_anuncio, ds_endereco, nr_endereco, ds_complemento, ds_pais,
                                    ds_estado, ds_cidade, ds_bairro, nr_cep, sn_condominio, nr_quartos,
                                    nr_banheiros, nr_max_pessoas, vl_basico_diaria, nr_area_flat, ds_flat,
                                    ds_regras, sn_internet, sn_criancas, sn_mobilidade_reduzida, sn_fumantes,
                                    sn_animais, sn_festas, sn_longo_prazo, dt_cadastro, cd_usuario_cadastro, sn_ativo) 
                            VALUES('${ds_titulo_anuncio}', '${ds_endereco}', ${nr_endereco}, '${ds_complemento}', '${ds_pais}',
                                    '${ds_estado}', '${ds_cidade}', '${ds_bairro}', ${nr_cep}, '${sn_condominio}', ${nr_quartos},
                                    ${nr_banheiros}, ${nr_max_pessoas}, ${vl_basico_diaria}, ${nr_area_flat}, '${ds_flat}',
                                    '${ds_regras}', '${sn_internet}', '${sn_criancas}', '${sn_mobilidade_reduzida}', '${sn_fumantes}',
                                    '${sn_animais}', '${sn_festas}', '${sn_longo_prazo}', SYSDATE(), 1}, 'S')`, res);
  }

  public patchFlat(req: Request, res: Response, next: NextFunction) {
    const cd_flat = parseInt(req.params.cd_flat);

    if(req.body.dsTituloAnuncio) var ds_titulo_anuncio = req.body.dsTituloAnuncio;
    if(req.body.endereco) var ds_endereco = req.body.endereco;
    if(req.body.numero) var nr_endereco = req.body.numero;
    if(req.body.complemento) var ds_complemento = req.body.complemento;
    if(req.body.pais) var ds_pais = req.body.pais;
    if(req.body.estado) var ds_estado = req.body.estado;
    if(req.body.cidade) var ds_cidade = req.body.cidade;
    if(req.body.bairro) var ds_bairro = req.body.bairro;
    if(req.body.cep) var nr_cep = req.body.cep;
    if(req.body.snCondominio) var sn_condominio = req.body.snCondominio;
    if(req.body.nrQuartos) var nr_quartos = req.body.nrQuartos;
    if(req.body.nrBanheiros) var nr_banheiros = req.body.nrBanheiros;
    if(req.body.nrMaxPessoas) var nr_max_pessoas = req.body.nrMaxPessoas;
    if(req.body.vlBasicoDiaria) var vl_basico_diaria = req.body.vlBasicoDiaria;
    if(req.body.nrAreaFlat) var nr_area_flat = req.body.nrAreaFlat;
    if(req.body.dsFlat) var ds_flat = req.body.dsFlat;
    if(req.body.dsRegras) var ds_regras = req.body.dsRegras;
    if(req.body.snInternet) var sn_internet = req.body.snInternet;
    if(req.body.snCriancas) var sn_criancas = req.body.snCriancas;
    if(req.body.snMobilidadeReduzida) var sn_mobilidade_reduzida = req.body.snMobilidadeReduzida;
    if(req.body.snFumantes) var sn_fumantes = req.body.snFumantes;
    if(req.body.snAnimais) var sn_animais = req.body.snAnimais;
    if(req.body.snFestas) var sn_festas = req.body.snFestas;
    if(req.body.snLongoPrazo) var sn_longo_prazo = req.body.snLongoPrazo;
  
    execSQLQuery(`UPDATE flat SET ds_titulo_anuncio='${ds_titulo_anuncio}', ds_endereco='${ds_endereco}', nr_endereco='${nr_endereco}', ds_complemento='${ds_complemento}', ds_pais='${ds_pais}',
                                ds_estado='${ds_estado}', ds_cidade='${ds_cidade}', ds_bairro='${ds_bairro}', nr_cep='${nr_cep}', sn_condominio='${sn_condominio}', nr_quartos='${nr_quartos}',
                                nr_banheiros='${nr_banheiros}', nr_max_pessoas='${nr_max_pessoas}', vl_basico_diaria='${vl_basico_diaria}', nr_area_flat='${nr_area_flat}', ds_flat='${ds_flat}',
                                ds_regras='${ds_regras}', sn_internet='${sn_internet}', sn_criancas='${sn_criancas}', sn_mobilidade_reduzida='${sn_mobilidade_reduzida}', sn_fumantes='${sn_fumantes}',
                                sn_animais='${sn_animais}', sn_festas='${sn_festas}', sn_longo_prazo='${sn_longo_prazo}', dt_alteracao = SYSDATE(), cd_usuario_alteracao = 1} WHERE cd_flat=${cd_flat}`, res);
  }

  public deleteFlat(req: Request, res: Response, next: NextFunction) {
    execSQLQuery('DELETE FROM flat WHERE cd_flat=' + parseInt(req.params.cd_flat), res);
  }

  /**
   * Take each handler, and attach to one of the Express.Router's
   * endpoints.
   */
  init() {
    this.router.get('/', this.getAll);
    this.router.get('/:cd_flat', this.getOne);
    this.router.post('/', this.postFlat);
    this.router.patch('/:cd_flat', this.patchFlat);
    this.router.delete('/:cd_flat', this.deleteFlat);
  }

}

// Create the FlatRouter, and export its configured Express.Router
// let flatRouter = new FlatRouter();
// flatRouter.init();

function execSQLQuery(sqlQry, res){
  const connection = mysql.createConnection({
      host     : 'localhost',
      port     : 3306,
      user     : 'root',
      password : '',
      database : 'iflats'
  });

  connection.query(sqlQry, function(error, results, fields){
      if(error) 
          res.json(error);
      else
          res.json(results);
      connection.end();
      console.log('Executou query Flat!');
  });
}

export default new FlatRouter().router;