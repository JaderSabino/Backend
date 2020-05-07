const Usuario = require('../models/Usuario');

module.exports = {

    async logar(req, res) {
        const { cpf, senha } = req.body;

        const usuario = await Usuario.findOne({where: {cpf: cpf}});

        if(usuario){
            if(usuario.senha != senha){
                return res.status(200).send({codigo: "3"});
            }else{
                return res.status(200).send({codigo: "1"});
            }
        }else{
            return res.status(200).send({codigo: "2"});
        }
    }
    
}