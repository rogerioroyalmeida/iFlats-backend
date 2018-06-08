import * as path from 'path';
import * as express from 'express';
import * as bodyParser from 'body-parser';

import UsuarioRouter from './routes/UsuarioRouter';
import FlatRouter from './routes/FlatRouter';

import ItensCriancaRouter from './routes/ItensCriancaRouter';
import EquipamentosRouter from './routes/EquipamentosRouter';
import ServicoRouter from './routes/ServicoRouter';

import ItensInstalacaoRouter from './routes/ItensInstalacaoRouter';
import FlatItInstalacaoRouter from './routes/FlatItInstalacaoRouter';
import ItensGeralRouter from './routes/ItensGeralRouter';
import FlatItGeralRouter from './routes/FlatItGeralRouter';
import ItensCozinhaRouter from './routes/ItensCozinhaRouter';
import FlatItCozinhaRouter from './routes/FlatItCozinhaRouter';
import FavoritosRouter from './routes/FavoritosRouter';
import MensagensRouter from './routes/MensagensRouter';
import ItensEntretenimentoRouter from './routes/ItensEntretenimentoRouter';
import FlatItEntretenimentoRouter from './routes/FlatItEntretenimentoRouter';
import SolicitacaoReservaRouter from './routes/SolicitacaoReservaRouter';
import ReservaRouter from './routes/ReservaRouter';

// Creates and configures an ExpressJS web server.
class App {

  // ref to Express instance
  public express: express.Application;

  //Run configuration methods on the Express instance.
  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
  }

  // Configure Express middleware.
  private middleware(): void {
    this.express.use(bodyParser.urlencoded({ extended: true }));
    this.express.use(bodyParser.json());
    this.express.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
        next();
    });
  }

  // Configure API endpoints.
  private routes(): void {
    /* This is just to get up and running, and to make sure what we've got is
     * working so far. This function will change when we start to add more
     * API endpoints */
    let router = express.Router();
    // placeholder route handler
    router.get('/', (req, res, next) => res.json({ message: 'Funcionando!' }));
    this.express.use('/iflats', router);
    this.express.use('/iflats/usuarios', UsuarioRouter);
    this.express.use('/iflats/flats', FlatRouter);
    
    this.express.use('/iflats/itens_crianca', ItensCriancaRouter);    
    this.express.use('/iflats/equipamento', EquipamentosRouter );
    this.express.use('/iflats/servico', ServicoRouter );

    this.express.use('/iflats/itens_instalacao', ItensInstalacaoRouter );
    this.express.use('/iflats/flats_itinstalacao', FlatItInstalacaoRouter);
    
    this.express.use('/iflats/itens_geral', ItensGeralRouter);    
    this.express.use('/iflats/flats_itgeral', FlatItGeralRouter);

    this.express.use('/iflats/itens_cozinha', ItensCozinhaRouter);
    this.express.use('/iflats/flats_itcozinha', FlatItCozinhaRouter);

    this.express.use('/iflats/itens_entretenimento', ItensEntretenimentoRouter);
    this.express.use('/iflats/flats_itentretenimento', FlatItEntretenimentoRouter);
    this.express.use('/iflats/favoritos', FavoritosRouter);
    this.express.use('/iflats/mensagens', MensagensRouter);
    this.express.use('/iflats/solicitacao_reserva', SolicitacaoReservaRouter);
    this.express.use('/iflats/reserva', ReservaRouter);
  }

}

export default new App().express;