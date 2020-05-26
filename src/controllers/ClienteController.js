const Cliente = require('../models/Cliente');

module.exports = {
    async index(req, res) {
        const clientes = await Cliente.findAll();

        if(clientes == "" || clientes == null) {
            return res.status(200).send({message: "Nenhum Cliente Cadastrado"});
        }
            
        return res.status(200).json({ clientes });
    },

    async store(req, res) {
        const { cpf_cliente, nome_cliente, telefone, endereco } = req.body;

        const Consultacliente = await Cliente.findOne({where: {cpf_cliente: cpf_cliente}});

        if(Consultacliente){
            return res.status(200).json({ 
                status: 2,
                message: 'Cliente já cadastrado',
                Consultacliente
             });
        }

        const cliente = await Cliente.create({ cpf_cliente, nome_cliente, telefone, endereco });


        return res.status(200).json({ 
            status: 1,
            message: 'Cliente cadastrado com sucesso!',
            cliente
         });
    },

    async update(req, res) {
        const { cpf_cliente, nome_cliente, telefone, endereco } = req.body;

        const { cpf } = req.params;
        
        const Consultacliente = await Cliente.findOne({where: {cpf_cliente: cpf}});

        if(!Consultacliente){
            return res.status(200).json({ 
                status: 2,
                message: 'Cliente não cadastrado!',
             });
        }

        console.log(cpf_cliente, nome_cliente, telefone, endereco);

        await Cliente.update({
            cpf_cliente, nome_cliente, telefone, endereco
        },{
            where: {
                cpf_cliente: cpf
            }
        });

        return res.status(200).json({
            status: 1,
            message: 'Cliente atualizado com sucesso!'
        });
    },

    async delete(req, res) {
        const { cpf_cliente } = req.params;

        await Cliente.destroy({
            where: {
                cpf_cliente: cpf_cliente
            }
        });

        return res.status(200).json({
            status: 1,
            message: 'Cliente excluído com sucesso!'
        });
    }
}