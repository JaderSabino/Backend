'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('atualiza_produto', { 
      id_atualiza: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      operacao: {
        type: Sequelize.STRING(1),
        allowNull: false
      },
      preco_custo: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      quantidade: {
        type: Sequelize.DOUBLE,
        allowNull: false
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
    return queryInterface.dropTable('atualiza_produto');
  }
};
