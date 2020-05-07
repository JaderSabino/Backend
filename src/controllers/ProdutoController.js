const Produto = require('../models/Produto');

module.exports = {
    async index(req, res) {
        const produtos = await Produto.findAll();

        if(produtos == "" || produtos == null) {
            return res.status(200).send({message: "Nenhum Produto Cadastrado"});
        }
            
        return res.status(200).send({ produtos });
    },

    async store(req, res) {
        const { nome_produto, preco, quantidade, unidade_medida, produto_ativo } = req.body;

        const produto = await Produto.create({ nome_produto, preco, quantidade, unidade_medida, produto_ativo });

        return res.status(200).send({ 
            status: 1,
            message: 'Produto cadastrado com sucesso!',
            produto
         });
    },

    async update(req, res) {
        const { nome_produto, preco, quantidade, unidade_medida, produto_ativo } = req.body;

        const { id_produto } = req.params;

        await Produto.update({
            nome_produto, preco, quantidade, unidade_medida, produto_ativo
        },{
            where: {
                id_produto: id_produto
            }
        });

        return res.status(200).send({
            status: 1,
            message: 'Produto atualizado com sucesso!'
        });
    },

    async delete(req, res) {
        const { id_produto } = req.params;

        await Produto.destroy({
            where: {
                id_produto: id_produto
            }
        });

        return res.status(200).send({
            status: 1,
            message: 'Produto excluído com sucesso!'
        });
    }
}