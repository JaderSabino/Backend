const Usuario = require('../models/Usuario');

module.exports = {
    async index(req, res) {
        const usuarios = await Usuario.findAll();

        if(usuarios == "" || usuarios == null) {
            return res.status(200).send({message: "Nenhum Usuário Cadastrado"});
        }
            
        return res.status(200).send({ usuarios });
    },

    async store(req, res) {
        const { cpf, nome_usuario, senha } = req.body;

        const usuario = await Usuario.create({ cpf, nome_usuario, senha });

        return res.status(200).send({ 
            status: 1,
            message: 'Usuário cadastrado com sucesso!',
            usuario
         });
    },

    async update(req, res) {
        const { cpf, nome_usuario, senha } = req.body;

        const { cpf_usuario } = req.params;

        await Usuario.update({
            cpf, nome_usuario, senha
        },{
            where: {
                cpf: cpf_usuario
            }
        });

        return res.status(200).send({
            status: 1,
            message: 'Usuário atualizado com sucesso!'
        });
    },

    async delete(req, res) {
        const { cpf_usuario } = req.params;

        await Usuario.destroy({
            where: {
                cpf: cpf_usuario
            }
        });

        return res.status(200).send({
            status: 1,
            message: 'Usuário excluído com sucesso!'
        });
    }
}