const ItemVenda = require('../models/ItemVenda');

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

        for (let index = 0; index < itens.length; index++) {
            const { quantidade, valor_item, id_venda, id_produto } = itens[index];
            const itemVenda = await ItemVenda.create({ quantidade, valor_item, id_venda, id_produto });
            listItens.push(itemVenda);
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