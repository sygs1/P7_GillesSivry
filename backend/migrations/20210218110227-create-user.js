const { Sequelize } = require('sequelize'); 

'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      idusers: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        allowNull: false,
        type: Sequelize.STRING
      },
      pseudo: {
        allowNull: true,
        type: Sequelize.STRING
      },

      email: {
        allowNull: false,
        type: Sequelize.STRING
      },
          password: {
        allowNull: false,
        type: Sequelize.STRING
      },
     
      isAdmin: {
        allowNull: false,
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('Users');
  }
};