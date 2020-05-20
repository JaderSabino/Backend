const ProdutoConferencia = require('../models/ProdutoConferencia');
const Produto = require('../models/Produto');

module.exports = {
    async index(req, res) {
        const produtoConferencias = await ProdutoConferencia.findAll();

        if(produtoConferencias == "" || produtoConferencias == null) {
            return res.status(200).send({message: "Tabela vazia"});
        }
            
        return res.status(200).send({ produtoConferencias });
    },

    async store(req, res) {
        const {quantidade, id_produto } = req.body;

        const produto = await Produto.findOne({where: {id_produto: id_produto}});

        if(!produto){
            return res.status(200).send({ 
                status: 2,
                message: 'Produto não existente'
            });
        }

        let status;
        let valor = produto['preco'];
        const mensagem = {
            message: ''
        }

        if (quantidade == produto['quantidade']){
            mensagem['message'] = 'Estoque correto';
            return res.status(200).send({ 
                status: 3,
                mensagem
            });
        }

        if(quantidade > produto['quantidade']){
            status = 'E';
            mensagem['message'] = 'Entrada de produto';
        }else{
            status = 'S';
            mensagem['message'] = 'Saida de produto';
        }

        await Produto.update({
            quantidade
        },{
            where: {
                id_produto: id_produto
            }
        });

        const produtoConferencia = await ProdutoConferencia.create({ valor, quantidade, status, id_produto });

        return res.status(200).send({ 
            status: 1,
            mensagem,
            produtoConferencia
         });
    },

    async update(req, res) {
        const { valor, quantidade, status, id_produto } = req.body;

        const { id_conferencia } = req.params;

        await ProdutoConferencia.update({
            valor, quantidade, status, id_produto
        },{
            where: {
                id_conferencia: id_conferencia
            }
        });

        return res.status(200).send({
            status: 1,
            message: ' Conferencia produto atualizada com sucesso!'
        });Item
    },

    async delete(req, res) {
        const { id_conferencia } = req.params;

        await ProdutoConferencia.destroy({
            where: {
                id_conferencia: id_conferencia
            }
        });

        return res.status(200).send({
            status: 1,
            message: 'Conferencia produto excluída com sucesso!'
        });
    }
}