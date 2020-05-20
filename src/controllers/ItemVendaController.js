const ItemVenda = require('../models/ItemVenda');
const AtualizaProduto = require('../models/AtualizaProduto');
const Produto = require('../models/Produto');

module.exports = {
    async index(req, res) {
        const itemVendas = await ItemVenda.findAll();

        if(itemVendas == "" || itemVendas == null) {
            return res.status(200).send({message: "Nenhum Item Venda Cadastrada"});
        }
        
        return res.status(200).send({ itemVendas });
    },

    async store(req, res) {
        const itens = req.body;

        const listItens = []
        const listAtualiza = []

        for (let index = 0; index < itens.length; index++) {
            const { quantidade, valor_item, id_venda, id_produto } = itens[index];
            const itemVenda = await ItemVenda.create({ quantidade, valor_item, id_venda, id_produto });
            listItens.push(itemVenda);
            const atualizaProduto = await AtualizaProduto.create({ 'operacao': 'S', 'preco_custo': valor_item, quantidade, id_produto });
            listAtualiza.push(atualizaProduto);
            const produto = await Produto.findOne({where: {id_produto: id_produto}});
            //quantidade = Number(produto['quantidade']) - Number(quantidade);
            await Produto.update({
                'quantidade': Number(produto['quantidade']) - Number(quantidade)
            },{
                where: {
                    id_produto: id_produto
                }
            });
        }

        return res.status(200).send({ 
            status: 1,
            message: 'Item Venda cadastrada com sucesso!',
            listItens
         });
    },

    async update(req, res) {
        const { quantidade, valor_item, id_venda, id_produto } = req.body;

        const { id_item_venda } = req.params;

        await ItemVenda.update({
            quantidade, valor_item, id_venda, id_produto
        },{
            where: {
                id_item_venda: id_item_venda
            }
        });

        return res.status(200).send({
            status: 1,
            message: 'Item Venda atualizado com sucesso!'
        });
    },

    async delete(req, res) {
        const { id_item_venda } = req.params;

        await ItemVenda.destroy({
            where: {
                id_item_venda: id_item_venda
            }
        });

        return res.status(200).send({
            status: 1,
            message: 'Item Venda excluída com sucesso!'
        });
    }
}