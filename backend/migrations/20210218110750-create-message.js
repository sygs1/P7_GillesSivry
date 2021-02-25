const { Sequelize } = require('sequelize'); 

'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('messages', {
      idmessages: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      users_idusers: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      likes_idlikes: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      
      titremessage: {
        allowNull: false,
        type: Sequelize.STRING
      },
      message: {
        allowNull: true,
        type: Sequelize.STRING
      },
      urlimage: {
        type: Sequelize.STRING
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