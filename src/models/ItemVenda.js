const {Model, DataTypes} = require('sequelize');

class Item_Venda extends Model {
    static init(sequelize){
        super.init({
            id_item_venda: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            quantidade: DataTypes.DOUBLE,
            valor_item: DataTypes.DOUBLE,
            id_venda: {
                type: DataTypes.INTEGER,
                references: {         
                    model: 'venda',
                    key: 'id_venda'
                  }
            },
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

module.exports = Item_Venda;