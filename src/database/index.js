const sequelize = require('sequelize');

const configDB = require('../config/database.js');

const Usuario = require('../models/Usuario');
const Cliente = require('../models/Cliente');
const Produto = require('../models/Produto');
const Venda = require('../models/Venda');
const ItemVenda = require('../models/ItemVenda');
const AtualizaProduto = require('../models/AtualizaProduto');
const ProdutoConferencia = require('../models/ProdutoConferencia');

const connection = new sequelize(configDB);

Usuario.init(connection);
Cliente.init(connection);
Produto.init(connection);
Venda.init(connection);
ItemVenda.init(connection);
AtualizaProduto.init(connection);
ProdutoConferencia.init(connection);

module.exports = connection;