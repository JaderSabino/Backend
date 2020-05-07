const Venda = require('../models/Venda');

module.exports = {
    async index(req, res) {
        const vendas = await Venda.findAll();

        if(vendas == "" || vendas == null) {
            return res.status(200).send({message: "Nenhum Venda Cadastrada"});
        }
            
        return res.status(200).send({ vendas });
    },

    async store(req, res) {
        const { valor_total, venda_ativa, cpf_usuario, cpf_cliente } = req.body;

        const venda = await Venda.create({ valor_total, venda_ativa, cpf_usuario, cpf_cliente });

        return res.status(200).send({ 
            status: 1,
            message: 'Venda cadastrada com sucesso!',
            venda
         });
    },

    async update(req, res) {
        const { valor_total, venda_ativa, cpf_usuario, cpf_cliente } = req.body;

        const { id_venda } = req.params;

        await Venda.update({
            valor_total, venda_ativa, cpf_usuario, cpf_cliente
        },{
            where: {
                id_venda: id_venda
            }
        });

        return res.status(200).send({
            status: 1,
            message: 'Venda atualizado com sucesso!'
        });
    },

    async delete(req, res) {
        const { id_venda } = req.params;

        await Venda.destroy({
            where: {
                id_venda: id_venda
            }
        });

        return res.status(200).send({
            status: 1,
            message: 'Venda excluída com sucesso!'
        });
    }
}