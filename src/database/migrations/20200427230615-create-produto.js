'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('produto', { 
      id_produto: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      nome_produto: {
        type: Sequelize.STRING,
        allowNull: false
      },
      preco: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      quantidade: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      unidade_medida: {
        type: Sequelize.STRING(2),
        allowNull: false
      },
      produto_ativo: {
        type: Sequelize.STRING(1),
        allowNull: false
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
    return queryInterface.dropTable('produto');
  }
};
