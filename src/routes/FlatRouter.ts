import {Router, Request, Response, NextFunction} from 'express';
import { Flat } from '../model/flat'
import * as mysql from 'mysql';

export class FlatRouter {
  router: Router;
  flat: Flat;

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

  /**
   * GET all flats.
   */
  public getAllFromUser(req: Request, res: Response, next: NextFunction) {
    let filter = '';
    if(req.params.cd_usuario) filter = ' AND cd_usuario_cadastro=' + parseInt(req.params.cd_usuario);
    execSQLQuery(`SELECT * FROM flat WHERE sn_ativo = 'S'` + filter, res);
  }

  public postFlat(req: Request, res: Response, next: NextFunction) {

    let f: Flat = new Flat();

    req.body.dsTituloAnuncio ? f.setDsTituloAnuncio(req.body.dsTituloAnuncio) : f.setDsTituloAnuncio("");
    req.body.endereco ? f.setEndereco(req.body.endereco) : f.setEndereco("");
    req.body.numero ? f.setNumero(req.body.numero) : f.setNumero(0);
    req.body.complemento ? f.setComplemento(req.body.complemento) : f.setComplemento("");
    req.body.pais ? f.setPais(req.body.pais) : f.setPais("");
    req.body.estado ? f.setEstado(req.body.estado) : f.setEstado("");
    req.body.cidade ? f.setCidade(req.body.cidade) : f.setCidade("");
    req.body.bairro ? f.setBairro(req.body.bairro) : f.setBairro("");
    req.body.cep ? f.setCep(req.body.cep) : f.setCep("0");
    req.body.snCondominio ? f.setSnCondominio(req.body.snCondominio) : f.setSnCondominio("");
    req.body.nrQuartos ? f.setNrQuartos(req.body.nrQuartos) : f.setNrQuartos(0);
    req.body.nrBanheiros ? f.setNrBanheiros(req.body.nrBanheiros) : f.setNrBanheiros(0);
    req.body.nrMaxPessoas ? f.setNrMaxPessoas(req.body.nrMaxPessoas) : f.setNrMaxPessoas(0);
    req.body.vlBasicoDiaria ? f.setVlBasicoDiaria(req.body.vlBasicoDiaria) : f.setVlBasicoDiaria(0);
    req.body.nrAreaFlat ? f.setNrAreaFlat(req.body.nrAreaFlat) : f.setNrAreaFlat(0);
    req.body.dsFlat ? f.setDsFlat(req.body.dsFlat) : f.setDsFlat("");
    req.body.dsRegras ? f.setDsRegras(req.body.dsRegras) : f.setDsRegras("");
    req.body.snInternet ? f.setSnInternet(req.body.snInternet) : f.setSnInternet("");
    req.body.snCriancas ? f.setSnCriancas( req.body.snCriancas) : f.setSnCriancas("");
    req.body.snMobilidadeReduzida ? f.setSnMobilidadeReduzida(req.body.snMobilidadeReduzida) : f.setSnMobilidadeReduzida("");
    req.body.snFumantes ? f.setSnFumantes(req.body.snFumantes) : f.setSnFumantes("");
    req.body.snAnimais ? f.setSnAnimais(req.body.snAnimais) : f.setSnAnimais("");
    req.body.snFestas ? f.setSnFestas(req.body.snFestas) : f.setSnFestas("");
    req.body.snLongoPrazo ? f.setSnFLongoPrazo(req.body.snLongoPrazo) : f.setSnFLongoPrazo("");

    execSQLQuery(`INSERT INTO flat(ds_titulo_anuncio, ds_endereco, nr_endereco, ds_complemento, ds_pais,
                        ds_estado, ds_cidade, ds_bairro, nr_cep, sn_condominio, nr_quartos,
                        nr_banheiros, nr_max_pessoas, vl_basico_diaria, nr_area_flat, ds_flat,
                        ds_regras, sn_internet, sn_criancas, sn_mobilidade_reduzida, sn_fumantes,
                        sn_animais, sn_festas, sn_longo_prazo, dt_cadastro, cd_usuario_cadastro, sn_ativo) 
                  VALUES('${f.getDsTituloAnuncio()}', '${f.getEndereco()}', ${f.getNumero()}, '${f.getComplemento()}', '${f.getPais()}',
                        '${f.getEstado()}', '${f.getCidade()}', '${f.getBairro()}', ${f.getCep()}, '${f.getSnCondominio()}', ${f.getNrQuartos()},
                        ${f.getNrBanheiros()}, ${f.getNrMaxPessoas()}, ${f.getVlBasicoDiaria()}, ${f.getNrAreaFlat()}, '${f.getDsFlat()}',
                        '${f.getDsRegras()}', '${f.getSnInternet()}', '${f.getSnCriancas()}', '${f.getSnMobilidadeReduzida()}', '${f.getSnFumantes()}',
                        '${f.getSnAnimais()}', '${f.getSnFestas()}', '${f.getSnLongoPrazo()}', SYSDATE(), 1, 'S')`, res);
  }

  public patchFlat(req: Request, res: Response, next: NextFunction) {
    const cd_flat = parseInt(req.params.cd_flat);

    let f: Flat = new Flat();

    req.body.dsTituloAnuncio ? f.setDsTituloAnuncio(req.body.dsTituloAnuncio) : f.setDsTituloAnuncio("");
    req.body.endereco ? f.setEndereco(req.body.endereco) : f.setEndereco("");
    req.body.numero ? f.setNumero(req.body.numero) : f.setNumero(0);
    req.body.complemento ? f.setComplemento(req.body.complemento) : f.setComplemento("");
    req.body.pais ? f.setPais(req.body.pais) : f.setPais("");
    req.body.estado ? f.setEstado(req.body.estado) : f.setEstado("");
    req.body.cidade ? f.setCidade(req.body.cidade) : f.setCidade("");
    req.body.bairro ? f.setBairro(req.body.bairro) : f.setBairro("");
    req.body.cep ? f.setCep(req.body.cep) : f.setCep("");
    req.body.snCondominio ? f.setSnCondominio(req.body.snCondominio) : f.setSnCondominio("");
    req.body.nrQuartos ? f.setNrQuartos(req.body.nrQuartos) : f.setNrQuartos(0);
    req.body.nrBanheiros ? f.setNrBanheiros(req.body.nrBanheiros) : f.setNrBanheiros(0);
    req.body.nrMaxPessoas ? f.setNrMaxPessoas(req.body.nrMaxPessoas) : f.setNrMaxPessoas(0);
    req.body.vlBasicoDiaria ? f.setVlBasicoDiaria(req.body.vlBasicoDiaria) : f.setVlBasicoDiaria(0);
    req.body.nrAreaFlat ? f.setNrAreaFlat(req.body.nrAreaFlat) : f.setNrAreaFlat(0);
    req.body.dsFlat ? f.setDsFlat(req.body.dsFlat) : f.setDsFlat("");
    req.body.dsRegras ? f.setDsRegras(req.body.dsRegras) : f.setDsRegras("");
    req.body.snInternet ? f.setSnInternet(req.body.snInternet) : f.setSnInternet("");
    req.body.snCriancas ? f.setSnCriancas( req.body.snCriancas) : f.setSnCriancas("");
    req.body.snMobilidadeReduzida ? f.setSnMobilidadeReduzida(req.body.snMobilidadeReduzida) : f.setSnMobilidadeReduzida("");
    req.body.snFumantes ? f.setSnFumantes(req.body.snFumantes) : f.setSnFumantes("");
    req.body.snAnimais ? f.setSnAnimais(req.body.snAnimais) : f.setSnAnimais("");
    req.body.snFestas ? f.setSnFestas(req.body.snFestas) : f.setSnFestas("");
    req.body.snLongoPrazo ? f.setSnFLongoPrazo(req.body.snLongoPrazo) : f.setSnFLongoPrazo("");

    execSQLQuery(`UPDATE flat SET ds_titulo_anuncio='${f.getDsTituloAnuncio()}', ds_endereco='${f.getEndereco()}', nr_endereco='${f.getNumero()}', ds_complemento='${f.getComplemento()}', ds_pais='${f.getPais()}',
                                ds_estado='${f.getEstado()}', ds_cidade='${f.getCidade()}', ds_bairro='${f.getBairro()}', nr_cep='${f.getCep()}', sn_condominio='${f.getSnCondominio()}', nr_quartos='${f.getNrQuartos()}',
                                nr_banheiros='${f.getNrBanheiros()}', nr_max_pessoas='${f.getNrMaxPessoas()}', vl_basico_diaria='${f.getVlBasicoDiaria()}', nr_area_flat='${f.getNrAreaFlat()}', ds_flat='${f.getDsFlat()}',
                                ds_regras='${f.getDsRegras()}', sn_internet='${f.getSnInternet()}', sn_criancas='${f.getSnCriancas()}', sn_mobilidade_reduzida='${f.getSnMobilidadeReduzida()}', sn_fumantes='${f.getSnFumantes()}',
                                sn_animais='${f.getSnAnimais()}', sn_festas='${f.getSnFestas()}', sn_longo_prazo='${f.getSnLongoPrazo()}', dt_alteracao = SYSDATE(), cd_usuario_alteracao = 1 WHERE cd_flat=${cd_flat}`, res);
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
    this.router.get('/:cd_flat?', this.getOne);
    this.router.get('/usuarios/:cd_usuario?', this.getAllFromUser);
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
      if(error) {
        res.json(error);
        console.log('Executou query Flat! Deu ERRO: \n' + error);
      }
      else {
        res.json(results);
        console.log('Executou query Flat! Deu CERTO query= \n' + sqlQry);
      }
      connection.end();
  });
}

// function queryFlat(f: Flat, tpOperacao: string): string {

//   let qry: string = '';

//   if (tpOperacao == 'I') {

//     qry = `INSERT INTO flat( `;

//     let columns = '';
//     let params = '';

//     f.getDsTituloAnuncio() ? columns = columns + 'ds_titulo_anuncio' : '';
//     columns ? columns = columns + ' , ' : '';
//     f.getEndereco() ? qry = qry + 'ds_endereco' : '';
//     columns ? columns = columns + ' , ' : '';
//     f.getNumero() ? columns = columns + 'nr_endereco' : '';
//     columns ? columns = columns + ' , ' : '';
//     f.getComplemento() ? columns = columns + 'ds_complemento' : '';
//     columns ? columns = columns + ' , ' : '';
//     f.getPais() ? columns = columns + 'ds_pais' : '';
//     columns ? columns = columns + ' , ' : '';
//     f.getEstado() ? columns = columns + 'ds_estado' : '';
//     columns ? columns = columns + ' , ' : '';
//     f.getCidade() ? columns = columns + 'ds_cidade' : '';
//     columns ? columns = columns + ' , ' : '';
//     f.getBairro() ? columns = columns + 'ds_bairro' : '';
//     columns ? columns = columns + ' , ' : '';
//     f.getCep() ? columns = columns + 'nr_cep' : '';
//     columns ? columns = columns + ' , ' : '';
//     f.getSnCondominio() ? columns = columns + 'sn_condominio' : '';
//     columns ? columns = columns + ' , ' : '';
//     f.getNrQuartos() ? columns = columns + 'nr_quartos' : '';
//     columns ? columns = columns + ' , ' : '';
//     f.getNrBanheiros() ? columns = columns + 'nr_banheiros' : '';
//     columns ? columns = columns + ' , ' : '';
//     f.getNrMaxPessoas() ? columns = columns + 'nr_max_pessoas' : '';
//     columns ? columns = columns + ' , ' : '';
//     f.getVlBasicoDiaria() ? columns = columns + 'vl_basico_diaria' : '';
//     columns ? columns = columns + ' , ' : '';
//     f.getNrAreaFlat() ? columns = columns + 'nr_area_flat' : '';
//     columns ? columns = columns + ' , ' : '';
//     f.getDsFlat() ? columns = columns + 'ds_flat' : '';
//     columns ? columns = columns + ' , ' : '';
//     f.getDsRegras() ? columns = columns + 'ds_regras' : '';
//     columns ? columns = columns + ' , ' : '';
//     f.getSnInternet() ? columns = columns + 'sn_internet' : '';
//     columns ? columns = columns + ' , ' : '';
//     f.getSnCriancas() ? columns = columns + 'sn_criancas' : '';
//     columns ? columns = columns + ' , ' : '';
//     f.getSnMobilidadeReduzida() ? columns = columns + 'sn_mobilidade_reduzida' : '';
//     columns ? columns = columns + ' , ' : '';
//     f.getSnFumantes() ? columns = columns + 'sn_fumantes' : '';
//     columns ? columns = columns + ' , ' : '';
//     f.getSnAnimais() ? columns = columns + 'sn_animais' : '';
//     columns ? columns = columns + ' , ' : '';
//     f.getSnFestas() ? columns = columns + 'sn_festas' : '';
//     columns ? columns = columns + ' , ' : '';
//     f.getSnLongoPrazo() ? columns = columns + 'sn_longo_prazo' : '';
//     columns ? columns = columns + ' , ' : '';
//     columns = columns + 'dt_cadastro, cd_usuario_cadastro, sn_ativo) ';

//     columns ? qry = qry + columns : '';

//     params = ' VALUES( ';
//     f.getDsTituloAnuncio() ? params = params + `'${f.getDsTituloAnuncio()}'` : '';
//     params ? params = params + ' , ' : '';
//     f.getEndereco() ? qry = qry + `'${f.getEndereco()}'` : '';
//     params ? params = params + ' , ' : '';
//     f.getNumero() ? params = params + `${f.getNumero()}`: '';
//     params ? params = params + ' , ' : '';
//     f.getComplemento() ? params = params + `'${f.getComplemento()}'` : '';
//     params ? params = params + ' , ' : '';
//     f.getPais() ? params = params + `'${f.getPais()}'` : '';
//     params ? params = params + ' , ' : '';
//     f.getEstado() ? params = params + `'${f.getEstado()}'` : '';
//     params ? params = params + ' , ' : '';
//     f.getCidade() ? params = params + `'${f.getCidade()}'` : '';
//     params ? params = params + ' , ' : '';
//     f.getBairro() ? params = params + `'${f.getBairro()}'` : '';
//     params ? params = params + ' , ' : '';
//     f.getCep() ? params = params + `${f.getCep()}` : '';
//     params ? params = params + ' , ' : '';
//     f.getSnCondominio() ? params = params + `'${f.getSnCondominio()}'` : '';
//     params ? params = params + ' , ' : '';
//     f.getNrQuartos() ? params = params + `${f.getNrQuartos()}` : '';
//     params ? params = params + ' , ' : '';
//     f.getNrBanheiros() ? params = params + `${f.getNrBanheiros()}` : '';
//     params ? params = params + ' , ' : '';
//     f.getNrMaxPessoas() ? params = params + `${f.getNrMaxPessoas()}` : '';
//     params ? params = params + ' , ' : '';
//     f.getVlBasicoDiaria() ? params = params + `${f.getVlBasicoDiaria()}` : '';
//     params ? params = params + ' , ' : '';
//     f.getNrAreaFlat() ? params = params + `${f.getNrAreaFlat()}` : '';
//     params ? params = params + ' , ' : '';
//     f.getDsFlat() ? params = params + `'${f.getDsFlat()}'` : '';
//     params ? params = params + ' , ' : '';
//     f.getDsRegras() ? params = params + `'${f.getDsRegras()}'` : '';
//     params ? params = params + ' , ' : '';
//     f.getSnInternet() ? params = params + `'${f.getSnInternet()}'` : '';
//     params ? params = params + ' , ' : '';
//     f.getSnCriancas() ? params = params + `'${f.getSnCriancas()}'` : '';
//     params ? params = params + ' , ' : '';
//     f.getSnMobilidadeReduzida() ? params = params + `'${f.getSnMobilidadeReduzida()}'` : '';
//     params ? params = params + ' , ' : '';
//     f.getSnFumantes() ? params = params + `'${f.getSnFumantes()}'` : '';
//     params ? params = params + ' , ' : '';
//     f.getSnAnimais() ? params = params + `'${f.getSnAnimais()}'` : '';
//     params ? params = params + ' , ' : '';
//     f.getSnFestas() ? params = params + `'${f.getSnFestas()}'` : '';
//     params ? params = params + ' , ' : '';
//     f.getSnLongoPrazo() ? params = params + `'${f.getSnLongoPrazo()}'` : '';
//     params ? params = params + ' , ' : '';
//     params = params + ` SYSDATE(), 1, 'S') `;

//     params ? qry = qry + params : '';

//     qry = `INSERT INTO flat(ds_titulo_anuncio, ds_endereco, nr_endereco, ds_complemento, ds_pais,
//                             ds_estado, ds_cidade, ds_bairro, nr_cep, sn_condominio, nr_quartos,
//                             nr_banheiros, nr_max_pessoas, vl_basico_diaria, nr_area_flat, ds_flat,
//                             ds_regras, sn_internet, sn_criancas, sn_mobilidade_reduzida, sn_fumantes,
//                             sn_animais, sn_festas, sn_longo_prazo, dt_cadastro, cd_usuario_cadastro, sn_ativo) 
//                   VALUES('${f.getDsTituloAnuncio()}', '${f.getEndereco()}', ${f.getNumero()}, '${f.getComplemento()}', '${f.getPais()}',
//                         '${f.getEstado()}', '${f.getCidade()}', '${f.getBairro()}', ${f.getCep()}, '${f.getSnCondominio()}', ${f.getNrQuartos()},
//                         ${f.getNrBanheiros()}, ${f.getNrMaxPessoas()}, ${f.getVlBasicoDiaria()}, ${f.getNrAreaFlat()}, '${f.getDsFlat()}',
//                         '${f.getDsRegras()}', '${f.getSnInternet()}', '${f.getSnCriancas()}', '${f.getSnMobilidadeReduzida()}', '${f.getSnFumantes()}',
//                         '${f.getSnAnimais()}', '${f.getSnFestas()}', '${f.getSnLongoPrazo()}', SYSDATE(), 1, 'S')`;

//   } else if (tpOperacao == 'U') {

//   }

//   return qry;
// }

export default new FlatRouter().router;