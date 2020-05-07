const {Model, DataTypes} = require('sequelize');

class Produto extends Model {
    static init(sequelize){
        super.init({
            id_produto: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            nome_produto: DataTypes.STRING,
            preco: DataTypes.DOUBLE,
            quantidade: DataTypes.DOUBLE,
            unidade_medida: DataTypes.STRING,
            produto_ativo: DataTypes.STRING
        }, { sequelize, freezeTableName: true  });
    }
}

module.exports = Produto;