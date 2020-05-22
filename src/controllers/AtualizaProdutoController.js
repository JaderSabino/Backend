const AtualizaProduto = require('../models/AtualizaProduto');
const Produto = require('../models/Produto');

module.exports = {
    async index(req, res) {
        const atualizaProdutos = await AtualizaProduto.findAll();

        if(atualizaProdutos == "" || atualizaProdutos == null) {
            return res.status(200).send({message: "Tabela vazia"});
        }
            
        return res.status(200).send({ atualizaProdutos });
    },

    async store(req, res) {

        let retorno = [];
        let mensagem;

        let dadosEntrada = req.body;
        console.log(dadosEntrada.length);

        for (let index = 0; index < dadosEntrada.length; index++) {
            const { operacao, quantidade_acao, id_produto } = dadosEntrada[index];

            const produto = await Produto.findOne({where: {id_produto: id_produto}});
    
            if(!produto){
                return res.status(200).send({ 
                    status: 2,
                    message: 'Produto não cadastrado!',
                    id_produto: id_produto
                 });
            }
    
            let quantidade;
            let preco_custo = produto['preco'];

    
            if(operacao == 'E'){
                quantidade = Number(produto['quantidade']) + Number(quantidade_acao);
                mensagem = 'Produto recebido com sucesso';
            }else{
                quantidade = Number(produto['quantidade']) - Number(quantidade_acao);
                mensagem = 'Produto retirado com sucesso'; 
            }
    
            await Produto.update({
                quantidade
            },{
                where: {
                    id_produto: id_produto
                }
            });
    
            const atualizaProduto = await AtualizaProduto.create({ operacao, preco_custo, quantidade, id_produto });
            retorno.push(atualizaProduto);
        }

        return res.status(200).send({ 
            status: 1,
            message: mensagem,
            retorno
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