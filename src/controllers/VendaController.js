const Venda = require('../models/Venda');
const ItemVenda = require('../models/ItemVenda');
const Produto = require('../models/Produto');
const Cliente = require('../models/Cliente');

module.exports = {
    async index(req, res) {
        const vendas = await Venda.findAll();

        if(vendas == "" || vendas == null) {
            return res.status(200).send({message: "Nenhum Venda Cadastrada"});
        }
            
        return res.status(200).send({ vendas });
    },

    async getVendas(req, res) {

        let { cpf_cliente, data } = req.params;

        if(cpf_cliente == 0){
            cpf_cliente = '';
        }

        if(data == 0){
            data = '';
        }

        if(cpf_cliente == '' && data == ''){
            return res.status(200).send({ 
                status: 2,
                message: 'Nenhum parâmetro passado para realização da busca'
            });
        }

        let vendas = await Venda.findAll();

        if(!vendas){
            return res.status(200).send({ 
                status: 2,
                message: 'Venda não encontrada'
            });
        }

        let itens = await ItemVenda.findAll();

        const todasVendas = [];

        let splitData = data.split('-');
        let splitDia = splitData[2];
        let splitMes = splitData[1];
        let splitAno = splitData[0];

        let dataConsulta;

        if(data == ''){
            dataConsulta = new Date(2001, 01-1, 01);
        }else{
            dataConsulta = new Date(splitAno, splitMes-1, splitDia);
        }

        const meses = {
            "Jan": 0,
            "Feb": 1, 
            "Mar": 2, 
            "Apr": 3, 
            "May": 4, 
            "Jun": 5, 
            "Jul": 6, 
            "Aug": 7,
            "Sep": 8,
            "Oct": 9,
            "Nov": 10,
            "Dec": 11
        }
        if(cpf_cliente == ''){
            for (let index = 0; index < vendas.length; index++) {
                let dataVenda = String(vendas[index]['createdAt']).split(' ');
                let dia = dataVenda[2];
                let mes = dataVenda[1];
                mes = mes.toString();
                let ano = dataVenda[3];
                dataVenda = new Date(Number(ano), Number(meses[`${mes}`]), Number(dia));
                if(dataVenda.getTime() === dataConsulta.getTime()){
                    let vendaCompleta = {
                        'venda': '',
                        'itens': []
                    } 
                    vendaCompleta['venda'] = vendas[index];
                    for (let index2 = 0; index2 < itens.length; index2++) {
                        if(itens[index2]['id_venda'] == vendas[index]['id_venda']){
                            vendaCompleta['itens'].push(itens[index2]);
                        }                    
                    }
                    todasVendas.push(vendaCompleta);
                }
            }
        }else{
            if(data == ''){
                for (let index = 0; index < vendas.length; index++) {
                    if(vendas[index]['cpf_cliente'] == cpf_cliente){
                        let vendaCompleta = {
                            'venda': '',
                            'itens': []
                        } 
                        vendaCompleta['venda'] = vendas[index];
                        for (let index2 = 0; index2 < itens.length; index2++) {
                            if(itens[index2]['id_venda'] == vendas[index]['id_venda']){
                                vendaCompleta['itens'].push(itens[index2]);
                            }                    
                        }
                        todasVendas.push(vendaCompleta);
                    }
                }
            }else{
                for (let index = 0; index < vendas.length; index++) {
                    let dataVenda = String(vendas[index]['createdAt']).split(' ');
                    let dia = dataVenda[2];
                    let mes = dataVenda[1];
                    mes = mes.toString();
                    let ano = dataVenda[3];
                    dataVenda = new Date(Number(ano), Number(meses[`${mes}`]), Number(dia));
                    if(dataVenda.getTime() === dataConsulta.getTime() && vendas[index]['cpf_cliente'] == cpf_cliente){
                        let vendaCompleta = {
                            'venda': '',
                            'itens': []
                        } 
                        vendaCompleta['venda'] = vendas[index];
                        for (let index2 = 0; index2 < itens.length; index2++) {
                            if(itens[index2]['id_venda'] == vendas[index]['id_venda']){
                                vendaCompleta['itens'].push(itens[index2]);
                            }                    
                        }
                        todasVendas.push(vendaCompleta);
                    }
                }
            }
           
        }

        const listaResposta = [];

        for (let index = 0; index < todasVendas.length; index++) {
            const listaVenda = {
                'id_venda': '',
                'nome_cliente': '',
                'valor_total': '',
                'venda_ativa': '',
                'data_venda': '',
                'itens': []
            }
            listaVenda['id_venda'] = todasVendas[index]['venda']['id_venda'];
            let nome = await Cliente.findOne({where: {cpf_cliente: todasVendas[index]['venda']['cpf_cliente']}});
            listaVenda['nome_cliente'] = nome['nome_cliente']; 
            listaVenda['valor_total'] = todasVendas[index]['venda']['valor_total'];
            listaVenda['venda_ativa'] = todasVendas[index]['venda']['venda_ativa'];
            listaVenda['data_venda'] = todasVendas[index]['venda']['createdAt'];
            for (let index2 = 0; index2 < todasVendas[index]['itens'].length; index2++) {
                const listaItens = {
                    'id_produto': '',
                    'nome_produto': '',
                    'quantidade': '',
                    'valor_item': ''
                }
                listaItens['id_produto'] = todasVendas[index]['itens'][index2]['id_produto'];
                let nomeProd = await Produto.findOne({where: {id_produto: listaItens['id_produto']}});
                listaItens['nome_produto'] = nomeProd['nome_produto'];
                listaItens['quantidade'] = todasVendas[index]['itens'][index2]['quantidade'];
                listaItens['valor_item'] = todasVendas[index]['itens'][index2]['valor_item'];
                listaVenda['itens'].push(listaItens);
            }
            listaResposta.push(listaVenda);
        }

        return res.status(200).send({ 
            status: 1,
            message: 'Venda encontrada',
            listaResposta
        });
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

    async cancelaVenda(req, res) {

        const { id_venda } = req.params;

        await Venda.update({
            venda_ativa: 'N'
        },{
            where: {
                id_venda: id_venda
            }
        });

        return res.status(200).send({
            status: 1,
            message: 'Venda Cancelada com Sucesso!'
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