const {Model, DataTypes} = require('sequelize');

class Atualiza_Produto extends Model {
    static init(sequelize){
        super.init({
            id_atualiza: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            operacao: DataTypes.STRING(1),
            preco_custo: DataTypes.DOUBLE,
            quantidade: DataTypes.DOUBLE,
            id_produto: {
                type: DataTypes.INTEGER,
                references: {         
                    model: 'produto',
                    key: 'id_produto'
                  }
            }
        }, { sequelize, freezeTableName: true  });
    }
}

module.exports = Atualiza_Produto;