const AtualizaProduto = require('../models/AtualizaProduto');

module.exports = {
    async index(req, res) {
        const atualizaProdutos = await AtualizaProduto.findAll();

        if(atualizaProdutos == "" || atualizaProdutos == null) {
            return res.status(200).send({message: "Tabela vazia"});
        }
            
        return res.status(200).send({ atualizaProdutos });
    },

    async store(req, res) {
        const { operacao, preco_custo, quantidade, id_produto } = req.body;

        const atualizaProduto = await AtualizaProduto.create({ operacao, preco_custo, quantidade, id_produto });

        return res.status(200).send({ 
            status: 1,
            message: 'Atualização de produto cadastrada com sucesso!',
            atualizaProduto
         });
    },

    async update(req, res) {
        const { operacao, preco_custo, quantidade, id_produto } = req.body;

        const { id_atualiza_produto } = req.params;

        await AtualizaProduto.update({
            operacao, preco_custo, quantidade, id_produto
        },{
            where: {
                id_atualiza: id_atualiza_produto
            }
        });

        return res.status(200).send({
            status: 1,
            message: ' Atualiza produto atualizada com sucesso!'
        });Item
    },

    async delete(req, res) {
        const { id_atualiza_produto } = req.params;

        await AtualizaProduto.destroy({
            where: {
                id_atualiza: id_atualiza_produto
            }
        });

        return res.status(200).send({
            status: 1,
            message: 'Atualiza produto excluída com sucesso!'
        });
    }
}