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

geraUsuario();

async function geraUsuario(){
    
    
    let cpf = '11122233344';
    let nome_usuario = 'Jader Sabino Borges';
    let senha = '12345';

    const usuario = await Usuario.findOne({where:{ cpf: cpf}});;

    if(usuario){
        console.log('[INICIALIZAÇÂO] - Usuario Padrão já Criado');
    }else{
        await Usuario.create({ cpf, nome_usuario, senha });
        console.log('[INICIALIZAÇÂO] - Usuario Não encontrado');
        console.log('[INICIALIZAÇÂO] - Usuario Padrão Criado');
    }
}

module.exports = connection;