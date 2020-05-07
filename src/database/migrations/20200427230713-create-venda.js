'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('venda', { 
      id_venda: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      valor_total: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      venda_ativa: {
        type: Sequelize.STRING(1),
        allowNull: false
      },
      cpf_usuario: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {         
          model: 'usuario',
          key: 'cpf'
        }
      },
      cpf_cliente: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {         
          model: 'cliente',
          key: 'cpf_cliente'
        }
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('venda');
  }
};
