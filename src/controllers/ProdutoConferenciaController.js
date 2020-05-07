const ProdutoConferencia = require('../models/ProdutoConferencia');

module.exports = {
    async index(req, res) {
        const produtoConferencias = await ProdutoConferencia.findAll();

        if(produtoConferencias == "" || produtoConferencias == null) {
            return res.status(200).send({message: "Tabela vazia"});
        }
            
        return res.status(200).send({ produtoConferencias });
    },

    async store(req, res) {
        const { valor, quantidade, status, id_produto } = req.body;

        const produtoConferencia = await ProdutoConferencia.create({ valor, quantidade, status, id_produto });

        return res.status(200).send({ 
            status: 1,
            message: 'Conferência de produto cadastrada com sucesso!',
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