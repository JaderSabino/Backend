const {Model, DataTypes} = require('sequelize');

class Usuario extends Model {
    static init(sequelize){
        super.init({
            cpf: {
                type: DataTypes.INTEGER,
                primaryKey: true
            },
            nome_usuario: DataTypes.STRING,
            senha: DataTypes.STRING
        }, { sequelize, freezeTableName: true });
    }
}

module.exports = Usuario;