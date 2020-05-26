const express = require('express');

const UsuarioController = require('./controllers/UsuarioController');
const ClienteController = require('./controllers/ClienteController');
const ProdutoController = require('./controllers/ProdutoController');
const VendaController = require('./controllers/VendaController');
const ItemVendaController = require('./controllers/ItemVendaController');
const ProdutoConferenciaController = require('./controllers/ProdutoConferenciaController');
const AtualizaProdutoController = require('./controllers/AtualizaProdutoController');

const LoginController = require('./controllers/LoginController');

const routes = express.Router();

routes.get('/usuarios', UsuarioController.index);
routes.post('/usuario', UsuarioController.store);
routes.put('/usuario/:cpf_usuario', UsuarioController.update);
routes.delete('/usuario/:cpf_usuario', UsuarioController.delete);

routes.get('/clientes', ClienteController.index);
routes.post('/cliente', ClienteController.store);
routes.put('/cliente/:cpf', ClienteController.update);
routes.delete('/cliente/:cpf_cliente', ClienteController.delete);

routes.get('/produtos', ProdutoController.index);
routes.post('/produto', ProdutoController.store);
routes.put('/produto/:id_produto', ProdutoController.update);
routes.delete('/produto/:id_produto', ProdutoController.delete);

routes.get('/vendas', VendaController.index);
routes.get('/getVendas/:cpf_cliente/:data', VendaController.getVendas);
routes.post('/venda', VendaController.store);
routes.put('/venda/:id_venda', VendaController.update);
routes.put('/cancelaVenda/:id_venda', VendaController.cancelaVenda);
routes.delete('/venda/:id_venda', VendaController.delete);

routes.get('/itemVendas', ItemVendaController.index);
routes.post('/itemVenda', ItemVendaController.store);
routes.put('/itemVenda/:id_item_venda', ItemVendaController.update);
routes.delete('/itemVenda/:id_item_venda', ItemVendaController.delete);

routes.get('/produtoConferencias', ProdutoConferenciaController.index);
routes.post('/produtoConferencia', ProdutoConferenciaController.store);
routes.put('/produtoConferencia/:id_conferencia', ProdutoConferenciaController.update);
routes.delete('/produtoConferencia/:id_conferencia', ProdutoConferenciaController.delete);

routes.get('/atualizaProdutos', AtualizaProdutoController.index);
routes.post('/atualizaProduto', AtualizaProdutoController.store);
routes.put('/atualizaProduto/:id_atualiza_produto', AtualizaProdutoController.update);
routes.delete('/atualizaProduto/:id_atualiza_produto', AtualizaProdutoController.delete);

routes.get('/Login/:cpf/:senha', LoginController.logar);

module.exports = routes;