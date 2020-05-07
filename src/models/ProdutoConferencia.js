const {Model, DataTypes} = require('sequelize');

class Produto_Conferencia extends Model {
    static init(sequelize){
        super.init({
            id_conferencia: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            valor: DataTypes.DOUBLE,
            quantidade: DataTypes.DOUBLE,
            status: DataTypes.STRING,
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

module.exports = Produto_Conferencia;