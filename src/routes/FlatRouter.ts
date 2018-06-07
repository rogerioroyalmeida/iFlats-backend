import {Router, Request, Response, NextFunction} from 'express';
import { Flat } from '../model/flat'
import * as mysql from 'mysql';
import * as fs from 'fs';

var multer = require('multer');
var path = require('path');

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

  /**
   * GET all flats.
   */
  public getAllByUserMensagens(req: Request, res: Response, next: NextFunction) {
    let filter = '';
    execSQLQuery(`SELECT DISTINCT flat.cd_flat, flat.ds_titulo_anuncio, flat.ds_endereco, flat.nr_endereco, flat.ds_complemento, flat.ds_pais, flat.ds_estado, flat.ds_cidade, flat.ds_bairro, flat.nr_cep, flat.sn_condominio, flat.nr_quartos, flat.nr_banheiros, flat.nr_max_pessoas, flat.vl_basico_diaria, flat.nr_area_flat, flat.ds_flat, flat.ds_regras, flat.sn_internet, flat.sn_criancas, flat.sn_mobilidade_reduzida, flat.sn_fumantes, flat.sn_animais, flat.sn_festas, flat.sn_longo_prazo, flat.dt_cadastro, flat.cd_usuario_cadastro, flat.dt_alteracao, flat.cd_usuario_alteracao, flat.sn_ativo, flat.cd_usuario_geren_responsavel, flat.observacao, flat.status FROM flat, central_mensagem WHERE flat.sn_ativo = 'S' AND flat.cd_flat IN (SELECT cd_flat FROM central_mensagem WHERE cd_usuario_emissario=` + parseInt(req.params.cd_usuario) + ')', res);
  }

  /**
   * GET all from filters.
   */
  public getAllFromFilters(req: Request, res: Response, next: NextFunction) {
    let filter = '';
    if(req.params.destino) {
      filter = ` AND (UPPER(flat.ds_endereco) LIKE '%UPPER('` + req.params.destino + `')%'`;
      filter = filter + ` OR UPPER(flat.ds_pais) like '%UPPER('` + req.params.destino + `')%'`;
      filter = filter + ` OR UPPER(flat.ds_estado) like '%UPPER('` + req.params.destino + `')%'`;
      filter = filter + ` OR UPPER(flat.ds_cidade) like '%UPPER('` + req.params.destino + `')%'`;
      filter = filter + ` OR UPPER(flat.ds_bairro) like '%UPPER('` + req.params.destino + `')%'`;
      filter = filter + ` OR UPPER(flat.ds_titulo_anuncio) like '%UPPER('` + req.params.destino + `')%' ) `;
    }

    let filterPeriodo = '';
    if (req.params.dt_inicial && req.params.dt_final && req.params.dt_inicial != 'undefined' && req.params.dt_final != 'undefined') {
      filterPeriodo = filterPeriodo + ` AND STR_TO_DATE('` + req.params.dt_inicial + `', '%d-%m-%Y') BETWEEN solicitacao_reserva.dt_inicial AND solicitacao_reserva.dt_final `;
      filterPeriodo = filterPeriodo + `  OR STR_TO_DATE('` + req.params.dt_final + `', '%d-%m-%Y') BETWEEN solicitacao_reserva.dt_inicial AND solicitacao_reserva.dt_final `;
    }

    execSQLQuery(`SELECT flat.* ` + 
                 `  FROM flat ` +
                 ` WHERE flat.sn_ativo = 'S' ` +
                 `   AND flat.cd_flat not in( ` +
                 `                           Select solicitacao_reserva.cd_flat ` +
                 `                             from solicitacao_reserva ` +
                 `                            where solicitacao_reserva.status = 'R' ` + filterPeriodo + ` )` + filter, res);
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

    if(req.params.cd_usuario_cadastro) var cd_usuario_cadastro = req.params.cd_usuario_cadastro;

    execSQLQuery(`INSERT INTO flat(ds_titulo_anuncio, ds_endereco, nr_endereco, ds_complemento, ds_pais,
                        ds_estado, ds_cidade, ds_bairro, nr_cep, sn_condominio, nr_quartos,
                        nr_banheiros, nr_max_pessoas, vl_basico_diaria, nr_area_flat, ds_flat,
                        ds_regras, sn_internet, sn_criancas, sn_mobilidade_reduzida, sn_fumantes,
                        sn_animais, sn_festas, sn_longo_prazo, dt_cadastro, cd_usuario_cadastro, sn_ativo) 
                  VALUES('${f.getDsTituloAnuncio()}', '${f.getEndereco()}', ${f.getNumero()}, '${f.getComplemento()}', '${f.getPais()}',
                        '${f.getEstado()}', '${f.getCidade()}', '${f.getBairro()}', ${f.getCep()}, '${f.getSnCondominio()}', ${f.getNrQuartos()},
                        ${f.getNrBanheiros()}, ${f.getNrMaxPessoas()}, ${f.getVlBasicoDiaria()}, ${f.getNrAreaFlat()}, '${f.getDsFlat()}',
                        '${f.getDsRegras()}', '${f.getSnInternet()}', '${f.getSnCriancas()}', '${f.getSnMobilidadeReduzida()}', '${f.getSnFumantes()}',
                        '${f.getSnAnimais()}', '${f.getSnFestas()}', '${f.getSnLongoPrazo()}', SYSDATE(), ${cd_usuario_cadastro}, 'S')`, res);
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

    if(req.params.cd_usuario_alteracao) var cd_usuario_alteracao = req.params.cd_usuario_alteracao;

    execSQLQuery(`UPDATE flat SET ds_titulo_anuncio='${f.getDsTituloAnuncio()}', ds_endereco='${f.getEndereco()}', nr_endereco='${f.getNumero()}', ds_complemento='${f.getComplemento()}', ds_pais='${f.getPais()}',
                                ds_estado='${f.getEstado()}', ds_cidade='${f.getCidade()}', ds_bairro='${f.getBairro()}', nr_cep='${f.getCep()}', sn_condominio='${f.getSnCondominio()}', nr_quartos='${f.getNrQuartos()}',
                                nr_banheiros='${f.getNrBanheiros()}', nr_max_pessoas='${f.getNrMaxPessoas()}', vl_basico_diaria='${f.getVlBasicoDiaria()}', nr_area_flat='${f.getNrAreaFlat()}', ds_flat='${f.getDsFlat()}',
                                ds_regras='${f.getDsRegras()}', sn_internet='${f.getSnInternet()}', sn_criancas='${f.getSnCriancas()}', sn_mobilidade_reduzida='${f.getSnMobilidadeReduzida()}', sn_fumantes='${f.getSnFumantes()}',
                                sn_animais='${f.getSnAnimais()}', sn_festas='${f.getSnFestas()}', sn_longo_prazo='${f.getSnLongoPrazo()}', dt_alteracao = SYSDATE(), cd_usuario_alteracao = ${cd_usuario_alteracao} WHERE cd_flat=${cd_flat}`, res);
  }

  public deleteFlat(req: Request, res: Response, next: NextFunction) {
    execSQLQuery('DELETE FROM flat WHERE cd_flat=' + parseInt(req.params.cd_flat), res);
  }

  public postFlatFoto(req, res, next) {

    var storage = multer.diskStorage({
      destination: function (req, file, callback) {
        fs.mkdir('./uploads', function(err) {
            if(err) {
                console.log(err.stack)
            } else {
                callback(null, './uploads');
            }
        })
      },
      filename: function (req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now());
      }
    });

    var upload = multer({ 
      storage : storage,
      fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname);
        if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            return callback(new Error('Only images are allowed'))
        }
        callback(null, true)
      }}).single('flat_foto');

    upload(req, res,function(err) {
        if(err) {
            return res.end("Error uploading file.");
        }
        res.end("File is uploaded: " + req.file);
    });

  }

  /**
   * Take each handler, and attach to one of the Express.Router's
   * endpoints.
   */
  init() {
    this.router.get('/', this.getAll);
    this.router.get('/:cd_flat?', this.getOne);
    this.router.get('/usuario/:cd_usuario?', this.getAllFromUser);
    this.router.get('/mensagens/:cd_usuario', this.getAllByUserMensagens);
    this.router.get('/filtros/destino/:destino/dtinicial/:dt_inicial/dtfinal/:dt_final', this.getAllFromFilters);
    this.router.post('/:cd_usuario_cadastro', this.postFlat);

    this.router.post('/flat_foto', this.postFlatFoto);

    this.router.patch('/usuario/:cd_usuario_alteracao/flat/:cd_flat', this.patchFlat);
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