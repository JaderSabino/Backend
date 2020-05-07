'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('item_venda', { 
      id_item_venda: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      quantidade: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      valor_item: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      id_venda: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {         
          model: 'venda',
          key: 'id_venda'
        }
      },
      id_produto: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {         
          model: 'produto',
          key: 'id_produto'
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
    return queryInterface.dropTable('item_venda');
  }
};
