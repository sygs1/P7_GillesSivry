'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ommentaires', {
      idmessages: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idcommentaires: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      commentaire: {
        allowNull: true,
        type: Sequelize.STRING
      },

      likescommentaire_idlikescommetaire: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      
      messages_idmessages: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
     
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('messages');
  }
};