const {Model, DataTypes} = require('sequelize');

class Venda extends Model {
    static init(sequelize){
        super.init({
            id_venda: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            valor_total: DataTypes.DOUBLE,
            venda_ativa: DataTypes.STRING,
            cpf_usuario: {
                type: DataTypes.INTEGER,
                references: {         
                    model: 'usuario',
                    key: 'cpf'
                  }
            },
            cpf_cliente: {
                type: DataTypes.INTEGER,
                references: {         
                    model: 'cliente',
                    key: 'cpf_cliente'
                  }
            }
        }, { sequelize, freezeTableName: true  });
    }
}

module.exports = Venda;