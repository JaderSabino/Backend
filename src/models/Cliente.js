const {Model, DataTypes} = require('sequelize');

class Cliente extends Model {
    static init(sequelize){
        super.init({
            cpf_cliente: {
                type: DataTypes.INTEGER,
                primaryKey: true
            },
            nome_cliente: DataTypes.STRING,
            telefone: DataTypes.STRING,
            endereco: DataTypes.STRING
        }, { sequelize, freezeTableName: true  });
    }
}

module.exports = Cliente;